import { describe, it, expect } from "vitest";
import * as alphabet from "./movable-alphabet/model";
import * as forms from "./land-water-forms/model";
import { outlines } from "./land-water-forms/geometry";
import * as checker from "./checkerboard/model";
import { rooms, materialsForRoom } from "../content/materials";

describe("Movable Alphabet", () => {
  it("supports composition, moving, finite stock, and restoration without marking spelling as mastery", () => {
    let s = alphabet.initialState();
    for (let i = 0; i < 5; i++) {
      s = alphabet.reduce(s, { type: "choose", letter: "s" });
      s = alphabet.reduce(s, { type: "slot", index: i });
    }
    expect(alphabet.remaining(s, "s")).toBe(0);
    expect(alphabet.reduce(s, { type: "choose", letter: "s" })).toEqual(s);
    s = alphabet.reduce(s, { type: "slot", index: 0 });
    s = alphabet.reduce(s, { type: "slot", index: 12 });
    expect(s.slots[0]).toBeNull();
    expect(s.slots[12]).toBe("s");
    expect(alphabet.isComplete(s)).toBe(false);
    for (const index of [1, 2, 3, 4, 12]) {
      s = alphabet.reduce(s, { type: "slot", index });
      s = alphabet.reduce(s, { type: "return" });
    }
    expect(alphabet.isComplete(s)).toBe(true);
    expect(alphabet.remaining(s, "s")).toBe(5);
  });
  it("only offers spelling comparison for an explicitly selected invitation", () => {
    let s = alphabet.initialState();
    for (const [index, letter] of [..."sun"].entries()) {
      s = alphabet.reduce(s, { type: "choose", letter });
      s = alphabet.reduce(s, { type: "slot", index });
    }
    expect(alphabet.checkWork(s)).toContain("no single expected answer");
    s = alphabet.reduce(s, { type: "prompt", index: 0 });
    expect(alphabet.checkWork(s)).toContain("conventional spelling");
    expect(alphabet.isComplete(s)).toBe(false);
    expect(alphabet.reduce(s, { type: "slot", index: -1 })).toEqual(s);
  });
});
describe("Land and Water Forms", () => {
  it("conserves water while pouring, overflowing and emptying; requires restoration", () => {
    let s = forms.initialState();
    s = forms.reduce(s, { type: "pick" });
    for (const side of [0, 1] as const) {
      s = forms.reduce(s, { type: "target", side });
      s = forms.reduce(s, { type: "tilt", value: 40 });
      for (let i = 0; i < 18; i++) s = forms.reduce(s, { type: "tick" });
      s = forms.reduce(s, { type: "tilt", value: 0 });
    }
    expect(s.source + s.spill + s.levels[0] + s.levels[1]).toBe(100);
    expect(s.spill).toBe(2);
    expect(forms.isComplete(s)).toBe(false);
    s = forms.reduce(s, { type: "return" });
    expect(forms.isComplete(s)).toBe(false);
    s = forms.reduce(s, { type: "wipe" });
    expect(forms.isComplete(s)).toBe(true);
    s = forms.reduce(s, { type: "empty", side: 0 });
    expect(forms.isComplete(s)).toBe(false);
    expect(s.levels[0]).toBe(0);
  });
  it("cannot move a tilted pitcher or pour a returned pitcher", () => {
    let s = forms.reduce(forms.initialState(), { type: "pick" });
    s = forms.reduce(s, { type: "tilt", value: 40 });
    expect(forms.reduce(s, { type: "target", side: 0 })).toEqual(s);
    expect(forms.reduce(s, { type: "return" })).toEqual(s);
    expect(forms.reduce(forms.initialState(), { type: "tick" })).toEqual(
      forms.initialState(),
    );
  });
  it("uses complementary contours covering each whole tray without inventing matching cards", () => {
    const area = (p: [number, number][]) =>
      Math.abs(
        p.reduce((s, [x, y], i) => {
          const next = p[(i + 1) % p.length];
          return s + x * next[1] - y * next[0];
        }, 0),
      ) / 2;
    for (let pair = 0; pair < 3; pair++) {
      const land = outlines(pair, 0),
        water = outlines(pair, 0, true);
      expect(water).toEqual(outlines(pair, 1));
      const size = (shapes: ReturnType<typeof outlines>) =>
        shapes.reduce(
          (s, o) =>
            s +
            area(o.outer) -
            (o.holes ?? []).reduce((n, h) => n + area(h), 0),
          0,
        );
      expect(size(land) + size(water)).toBeCloseTo(4, 8);
    }
  });
});
describe("Checkerboard multiplication", () => {
  const build = (problem: number) => {
    let s = checker.reduce(checker.initialState(), {
      type: "problem",
      index: problem,
    });
    const [a, b] = checker.problems[problem];
    for (let row = 0; row < 4; row++)
      for (let col = 0; col < 9; col++) {
        const value = checker.digit(a, col);
        if (!value) continue;
        s = checker.reduce(s, { type: "select", index: row * 9 + col });
        s = checker.reduce(s, { type: "bar", value });
        for (let n = 0; n < checker.digit(b, row); n++)
          s = checker.reduce(s, { type: "add" });
      }
    return s;
  };
  it.each([0, 1, 2])(
    "preserves the product through gathering and exchanges for problem %s",
    (problem) => {
      let s = build(problem);
      const [a, b] = checker.problems[problem];
      expect(checker.total(s.cells)).toBe(a * b);
      const original = s.cells;
      s = checker.reduce(s, { type: "gather" });
      expect(checker.total(s.cells)).toBe(a * b);
      for (let index = 0; index < 8; index++) {
        s = checker.reduce(s, { type: "select", index });
        s = checker.reduce(s, { type: "exchange" });
        expect(checker.total(s.cells)).toBe(a * b);
      }
      expect(checker.isComplete(s)).toBe(false);
      s = checker.reduce(s, { type: "answer", value: String(a * b) });
      expect(checker.isComplete(s)).toBe(true);
      s = checker.reduce(s, { type: "separate" });
      expect(s.cells).toEqual(original);
      expect(checker.isComplete(s)).toBe(false);
    },
  );
  it("does not accept a correct typed answer with missing or incorrect partial products", () => {
    let s = checker.initialState();
    s = checker.reduce(s, { type: "gather" });
    s = checker.reduce(s, { type: "answer", value: "276" });
    expect(checker.isComplete(s)).toBe(false);
    expect(checker.checkWork(s)).toContain("partial products");
  });
});
it("makes new work discoverable in the intended classrooms", () => {
  expect(materialsForRoom(rooms["3-6y"]).map((m) => m.id)).toEqual(
    expect.arrayContaining(["movable-alphabet", "land-water-forms"]),
  );
  for (const age of ["6-9y", "9-12y"] as const)
    expect(materialsForRoom(rooms[age]).map((m) => m.id)).toContain(
      "checkerboard",
    );
  expect(materialsForRoom(rooms["18m-3y"]).map((m) => m.id)).not.toContain(
    "checkerboard",
  );
});

// Examples use their module's real reducer and do not mutate the learner's state.
import alphabetDefinition from "./movable-alphabet";
import formsDefinition from "./land-water-forms";
import checkerDefinition from "./checkerboard";
it("ends each moving example with valid restored or completed work", () => {
  function verify<S, A>(
    definition: import("../domain/activity").ActivityDefinition<S, A>,
  ) {
    const fresh = definition.initialState();
    const before = JSON.stringify(fresh);
    const steps = definition.example!();
    expect(steps.length).toBeGreaterThan(3);
    expect(definition.isComplete(steps[steps.length - 1].state)).toBe(true);
    expect(JSON.stringify(fresh)).toBe(before);
    expect(definition.isComplete(fresh)).toBe(false);
  }
  verify(alphabetDefinition);
  verify(formsDefinition);
  verify(checkerDefinition);
});
