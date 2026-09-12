import { describe, it, expect } from "vitest";
import * as counters from "./cards-counters/model";
import * as stamps from "./stamp-game/model";
import * as fractions from "./fraction-insets/model";
import * as triangles from "./constructive-triangles/model";
import * as map from "./world-puzzle-map/model";
import { materialsForRoom, rooms } from "../content/materials";
import countersActivity from "./cards-counters";
import stampActivity from "./stamp-game";
import fractionActivity from "./fraction-insets";
import triangleActivity from "./constructive-triangles";
import mapActivity from "./world-puzzle-map";

describe("elementary material invariants", () => {
  it("uses all 55 counters and requires the paired arrangement, not just a total", () => {
    let s = counters.initialState();
    for (let n = 1; n <= 10; n++) {
      s = counters.reduce(counters.reduce(s, { type: "select", value: n }), {
        type: "card",
        column: n - 1,
      });
      for (const slot of counters.expectedSlots(n))
        s = counters.reduce(s, { type: "counter", column: n - 1, slot });
    }
    expect(counters.remaining(s)).toBe(0);
    expect(counters.isComplete(s)).toBe(true);
    const full = s;
    expect(counters.reduce(s, { type: "counter", column: 0, slot: 2 })).toBe(
      full,
    );
    s = counters.reduce(s, { type: "counter", column: 0, slot: 1 });
    s = counters.reduce(s, { type: "counter", column: 0, slot: 0 });
    expect(counters.remaining(s)).toBe(0);
    expect(counters.isComplete(s)).toBe(false);
  });
  it("preserves unique numeral cards when replacing and lifting", () => {
    let s = counters.initialState();
    s = counters.reduce(counters.reduce(s, { type: "select", value: 3 }), {
      type: "card",
      column: 0,
    });
    expect(counters.reduce(s, { type: "select", value: 3 })).toBe(s);
    s = counters.reduce(counters.reduce(s, { type: "select", value: 4 }), {
      type: "card",
      column: 0,
    });
    expect(s.selected).toBe(3);
    expect(s.cards[0]).toBe(4);
  });
  it("conserves decimal value through cascaded exchanges and allows correction", () => {
    let s = stamps.reduce(stamps.initialState(), { type: "problem", index: 2 });
    for (const row of [0, 1] as const)
      for (let c = 0; c < 4; c++)
        for (
          let n = 0;
          n < Math.floor(stamps.problems[2][row] / stamps.values[c]) % 10;
          n++
        )
          s = stamps.reduce(s, { type: "add", row, column: c });
    s = stamps.reduce(s, { type: "merge" });
    const value = stamps.total(s.result);
    expect(value).toBe(4024);
    for (let c = 3; c > 0; c--) {
      s = stamps.reduce(s, { type: "exchange", column: c });
      expect(stamps.total(s.result)).toBe(value);
    }
    s = stamps.reduce(s, { type: "answer", value: "4024" });
    expect(stamps.isComplete(s)).toBe(true);
    s = stamps.reduce(s, { type: "separate" });
    expect(stamps.isComplete(s)).toBe(false);
    expect(s.rows.map(stamps.total)).toEqual([1768, 2256]);
  });
  it("does not complete an incorrect problem even when its own sum is recorded", () => {
    let s = stamps.reduce(stamps.initialState(), {
      type: "add",
      row: 0,
      column: 3,
    });
    s = stamps.reduce(s, { type: "merge" });
    s = stamps.reduce(s, { type: "answer", value: "1" });
    expect(stamps.isComplete(s)).toBe(false);
    expect(stamps.reduce(s, { type: "exchange", column: 3 })).toBe(s);
  });
  it("compares exact sector areas and retains a visibly incorrect attempt", () => {
    let s = fractions.reduce(fractions.initialState(), {
      type: "select",
      denominator: 3,
    });
    s = fractions.reduce(s, { type: "place" });
    s = fractions.reduce(s, { type: "place" });
    expect(s.pieces).toEqual([3, 3]);
    expect(fractions.isComplete(s)).toBe(false);
    s = fractions.initialState();
    s = fractions.reduce(s, { type: "select", denominator: 4 });
    s = fractions.reduce(s, { type: "place" });
    s = fractions.reduce(s, { type: "place" });
    expect(fractions.isComplete(s)).toBe(true);
    expect(
      fractions.isComplete(fractions.reduce(s, { type: "remove", index: 0 })),
    ).toBe(false);
  });
  it("keeps fraction stock finite and accepts all intended equivalences", () => {
    for (const [target, denominator, count] of [
      [0, 6, 3],
      [1, 9, 3],
      [2, 8, 6],
    ]) {
      let s = fractions.reduce(fractions.initialState(), {
        type: "target",
        index: target,
      });
      s = fractions.reduce(s, { type: "select", denominator });
      for (let i = 0; i < count; i++)
        s = fractions.reduce(s, { type: "place" });
      expect(fractions.isComplete(s)).toBe(true);
    }
    let s = fractions.reduce(fractions.initialState(), {
      type: "select",
      denominator: 2,
    });
    for (let i = 0; i < 3; i++) s = fractions.reduce(s, { type: "place" });
    expect(s.pieces).toEqual([2, 2]);
  });
  it("requires both position and rotation for triangle joins", () => {
    let s = triangles.initialState();
    const target = triangles.targetFor(s, 1);
    s = triangles.reduce(s, {
      type: "move",
      index: 1,
      x: target.x,
      y: target.y,
      settle: true,
    });
    expect(triangles.joined(s, 1)).toBe(false);
    s = triangles.reduce(s, { type: "rotate", degrees: 90 });
    expect(triangles.joined(s, 1)).toBe(true);
    s = triangles.reduce(s, {
      type: "move",
      index: 1,
      x: target.x + 30,
      y: target.y,
      settle: true,
    });
    expect(triangles.joined(s, 1)).toBe(false);
  });
  it("retains Antarctica and requires every map piece to be lifted and restored", () => {
    expect(map.continents).toHaveLength(7);
    expect(map.continents.some((c) => c.id === "antarctica")).toBe(true);
    expect(map.continents.every((c) => c.path.length > 100)).toBe(true);
    let s = map.initialState();
    expect(map.isComplete(s)).toBe(false);
    s = map.reduce(s, { type: "lift", index: 0 });
    s = map.reduce(s, { type: "try", socket: 1 });
    expect(s.pieces[0].home).toBe(false);
    for (let i = 0; i < 7; i++) {
      s = map.reduce(s, { type: "lift", index: i });
      s = map.reduce(s, { type: "try", socket: i });
    }
    expect(map.isComplete(s)).toBe(true);
    expect(map.isComplete(map.reduce(s, { type: "lift", index: 0 }))).toBe(
      false,
    );
  });
  it("puts activities in both elementary environments without counting shared work twice", () => {
    expect(materialsForRoom(rooms["6-9y"]).map((m) => m.id)).toEqual([
      "checkerboard",
      "stamp-game",
      "cards-counters",
      "world-puzzle-map",
      "fraction-insets",
      "constructive-triangles",
    ]);
    expect(materialsForRoom(rooms["9-12y"]).map((m) => m.id)).toEqual([
      "checkerboard",
      "fraction-insets",
      "constructive-triangles",
    ]);
  });
  it("all moving examples finish with a valid material state, separate from a fresh exercise", () => {
    for (const d of [
      countersActivity,
      stampActivity,
      fractionActivity,
      triangleActivity,
      mapActivity,
    ]) {
      // Each definition has its own state type; test each through the same generic contract.
      function check<S, A>(
        def: import("../domain/activity").ActivityDefinition<S, A>,
      ) {
        const steps = def.example!();
        expect(steps.length).toBeGreaterThan(2);
        expect(def.isComplete(steps.at(-1)!.state)).toBe(true);
        expect(def.isComplete(def.initialState())).toBe(false);
      }
      check(
        d as import("../domain/activity").ActivityDefinition<unknown, unknown>,
      );
    }
  });
});
