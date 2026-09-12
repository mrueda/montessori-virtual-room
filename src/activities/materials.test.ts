import { describe, it, expect } from "vitest";
import * as cylinders from "./cylinder-blocks/model";
import * as colors from "./color-tablets/model";
import * as dressing from "./dressing-frame/model";
import * as pouring from "./pouring/model";
describe("Cylinder Blocks", () => {
  it("starts seated but does not complete before exploration", () =>
    expect(cylinders.isComplete(cylinders.initialState())).toBe(false));
  it("leaves an incorrect fit out of the block and permits correction", () => {
    let s = cylinders.initialState();
    s = cylinders.reduce(s, { type: "lift", size: 2 });
    s = cylinders.reduce(s, { type: "lift", size: 5 });
    s = cylinders.reduce(s, { type: "select", size: 5 });
    s = cylinders.reduce(s, { type: "fit", socket: 2 });
    expect(s.selected).toBe(5);
    expect(s.attemptedSocket).toBe(2);
    expect(s.seated).not.toContain(5);
    s = cylinders.reduce(s, { type: "fit", socket: 5 });
    expect(s.selected).toBeNull();
    expect(s.seated).toContain(5);
  });
  it("completes after all ten cylinders have been lifted and returned", () => {
    let s = cylinders.initialState();
    for (const size of cylinders.sizes)
      s = cylinders.reduce(s, { type: "lift", size });
    for (const size of cylinders.sizes) {
      s = cylinders.reduce(s, { type: "select", size });
      s = cylinders.reduce(s, { type: "fit", socket: size });
    }
    expect(cylinders.isComplete(s)).toBe(true);
  });
  it("rejects invalid and occupied socket actions", () => {
    const s = cylinders.initialState();
    expect(cylinders.reduce(s, { type: "select", size: 11 })).toBe(s);
    expect(cylinders.reduce(s, { type: "fit", socket: 1 })).toBe(s);
  });
});
describe("Color Tablets", () => {
  it("retains mismatched pairs for visual comparison and self-correction", () => {
    let s = colors.initialState();
    s = colors.reduce(s, { type: "choose", id: 0 });
    s = colors.reduce(s, { type: "choose", id: 1 });
    expect(s.pairs).toEqual([[0, 1]]);
    expect(colors.isComplete(s)).toBe(false);
    s = colors.reduce(s, { type: "separate", index: 0 });
    expect(s.pairs).toEqual([]);
  });
  it("completes only with three matching pairs and never duplicates a tablet", () => {
    let s = colors.initialState();
    for (const id of [0, 3, 1, 4, 2, 5])
      s = colors.reduce(s, { type: "choose", id });
    expect(colors.isComplete(s)).toBe(true);
    expect(colors.reduce(s, { type: "choose", id: 0 })).toBe(s);
  });
  it("allows a selected tablet to be put back without pairing itself", () => {
    let s = colors.reduce(colors.initialState(), { type: "choose", id: 0 });
    s = colors.reduce(s, { type: "choose", id: 0 });
    expect(s).toEqual(colors.initialState());
  });
});
describe("Dressing Frame", () => {
  it("cannot open fabric with fastened buttons and does not start complete", () => {
    const s = dressing.initialState();
    expect(dressing.isComplete(s)).toBe(false);
    expect(dressing.reduce(s, { type: "separate" })).toBe(s);
  });
  it("requires the full unbutton/open/join/button sequence", () => {
    let s = dressing.initialState();
    for (let index = 0; index < 4; index++)
      s = dressing.reduce(s, { type: "toggle-button", index });
    expect(dressing.isComplete(s)).toBe(false);
    s = dressing.reduce(s, { type: "separate" });
    expect(s.fabric).toBe("separated");
    expect(dressing.reduce(s, { type: "toggle-button", index: 0 })).toBe(s);
    s = dressing.reduce(s, { type: "join" });
    for (let index = 0; index < 4; index++)
      s = dressing.reduce(s, { type: "toggle-button", index });
    expect(dressing.isComplete(s)).toBe(true);
  });
});
function drain(s: pouring.PourState) {
  for (let i = 0; i < 200; i++)
    s = pouring.reduce(s, { type: "tick", seconds: 0.1 });
  return s;
}
describe("Pouring", () => {
  it("flows only when held and tilted, conserving water", () => {
    let s = pouring.initialState();
    expect(pouring.reduce(s, { type: "tick", seconds: 0.1 })).toBe(s);
    s = pouring.reduce(s, { type: "pick-up" });
    s = pouring.reduce(s, { type: "position", overCup: true });
    s = pouring.reduce(s, { type: "tilt", angle: 60 });
    s = pouring.reduce(s, { type: "tick", seconds: 0.1 });
    expect(s.receiver).toBeGreaterThan(0);
    expect(s.source + s.receiver + s.spilled + s.wiped).toBeCloseTo(100);
  });
  it("requires emptying, uprighting, and returning the pitcher", () => {
    let s = pouring.reduce(pouring.initialState(), { type: "pick-up" });
    s = pouring.reduce(s, { type: "position", overCup: true });
    s = pouring.reduce(s, { type: "tilt", angle: 80 });
    s = drain(s);
    expect(s.source).toBe(0);
    expect(pouring.isComplete(s)).toBe(false);
    expect(pouring.reduce(s, { type: "return" })).toBe(s);
    s = pouring.reduce(s, { type: "tilt", angle: 0 });
    s = pouring.reduce(s, { type: "return" });
    expect(pouring.isComplete(s)).toBe(true);
  });
  it("shows spills, requires cleanup, and never treats spilling everything as completion", () => {
    let s = pouring.reduce(pouring.initialState(), { type: "pick-up" });
    s = pouring.reduce(s, { type: "tilt", angle: 80 });
    s = drain(s);
    expect(s.spilled).toBeCloseTo(100);
    expect(pouring.reduce(s, { type: "wipe" })).toBe(s);
    s = pouring.reduce(s, { type: "tilt", angle: 0 });
    s = pouring.reduce(s, { type: "return" });
    s = pouring.reduce(s, { type: "wipe" });
    expect(s.spilled).toBe(0);
    expect(s.wiped).toBeCloseTo(100);
    expect(pouring.isComplete(s)).toBe(false);
  });
  it("allows cleaning a small spill after a successful pour", () => {
    let s = pouring.reduce(pouring.initialState(), { type: "pick-up" });
    s = pouring.reduce(s, { type: "tilt", angle: 80 });
    s = pouring.reduce(s, { type: "tick", seconds: 0.1 });
    s = pouring.reduce(s, { type: "tilt", angle: 0 });
    s = pouring.reduce(s, { type: "position", overCup: true });
    s = pouring.reduce(s, { type: "tilt", angle: 80 });
    s = drain(s);
    s = pouring.reduce(s, { type: "tilt", angle: 0 });
    s = pouring.reduce(s, { type: "return" });
    expect(pouring.isComplete(s)).toBe(false);
    s = pouring.reduce(s, { type: "wipe" });
    expect(pouring.isComplete(s)).toBe(true);
    expect(s.source + s.receiver + s.spilled + s.wiped).toBeCloseTo(100);
  });
  it("bounds elapsed time and rejects invalid angles", () => {
    let s = pouring.reduce(pouring.initialState(), { type: "pick-up" });
    expect(pouring.reduce(s, { type: "tilt", angle: NaN })).toBe(s);
    s = pouring.reduce(s, { type: "tilt", angle: 80 });
    const next = pouring.reduce(s, { type: "tick", seconds: 100 });
    expect(next.spilled).toBeLessThan(10);
  });
});

describe("Pouring numerical precision", () => {
  it("does not invent a spill when variable tilt steps fill the cup", () => {
    let s = pouring.reduce(pouring.initialState(), { type: "pick-up" });
    s = pouring.reduce(s, { type: "position", overCup: true });
    for (let i = 0; i < 200; i++) {
      s = pouring.reduce(s, { type: "tilt", angle: i < 8 ? 50 : 80 });
      s = pouring.reduce(s, {
        type: "tick",
        seconds: 0.10013 + (i % 7) * 0.00271,
      });
    }
    expect(s.source).toBe(0);
    expect(s.spilled).toBe(0);
    s = pouring.reduce(s, { type: "tilt", angle: 0 });
    s = pouring.reduce(s, { type: "return" });
    expect(pouring.isComplete(s)).toBe(true);
  });
});
