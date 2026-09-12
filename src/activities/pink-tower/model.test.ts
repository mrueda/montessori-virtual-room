import { describe, expect, it } from "vitest";
import { initialState, reduce, isComplete } from "./model";
function tower(sizes: number[], offset = 0) {
  return sizes.reduce(
    (s, size) =>
      reduce(reduce(s, { type: "select", size }), { type: "place", offset }),
    initialState(),
  );
}
describe("Pink Tower self-correction", () => {
  it("adjusts only the top cube and preserves a carried selection", () => {
    const before = reduce(tower([10, 9], 20), { type: "select", size: 8 });
    const after = reduce(before, { type: "adjust", offset: 2 });
    expect(after.stack).toEqual([
      { size: 10, offset: 20 },
      { size: 9, offset: 2 },
    ]);
    expect(after.selected).toBe(8);
    expect(before.stack[1].offset).toBe(20);
    expect(reduce(before, { type: "adjust", offset: Infinity })).toBe(before);
    expect(reduce(initialState(), { type: "adjust", offset: 0 })).toEqual(
      initialState(),
    );
  });
  it("allows an off-center final cube to be corrected without rebuilding", () => {
    let state = tower([10, 9, 8, 7, 6, 5, 4, 3, 2, 1]);
    state = reduce(state, { type: "adjust", offset: 100 });
    expect(state.stack.at(-1)?.offset).toBe(45);
    expect(isComplete(state)).toBe(false);
    expect(isComplete(reduce(state, { type: "adjust", offset: 0 }))).toBe(true);
  });
  it("completes only with ten descending, centered cubes", () => {
    expect(isComplete(tower([10, 9, 8, 7, 6, 5, 4, 3, 2, 1]))).toBe(true);
    expect(isComplete(tower([10, 9]))).toBe(false);
  });
  it("keeps incorrect ordering and alignment visible without completing", () => {
    const wrong = tower([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(wrong.stack).toHaveLength(10);
    expect(isComplete(wrong)).toBe(false);
    expect(isComplete(tower([10, 9, 8, 7, 6, 5, 4, 3, 2, 1], 20))).toBe(false);
  });
  it("allows correction by lifting and replacing the top cube", () => {
    let s = tower([10, 8]);
    s = reduce(s, { type: "remove" });
    s = reduce(reduce(s, { type: "select", size: 9 }), {
      type: "place",
      offset: 0,
    });
    expect(s.stack.map((c) => c.size)).toEqual([10, 9]);
  });
  it("rejects duplicate and out-of-range selections and empty placement", () => {
    const s = tower([10]);
    expect(reduce(s, { type: "select", size: 10 })).toEqual(s);
    expect(reduce(s, { type: "select", size: 11 })).toEqual(s);
    expect(reduce(s, { type: "place", offset: 0 })).toEqual(s);
  });
  it("starts empty with independent state and rejects non-finite positions", () => {
    expect(initialState()).toEqual({ stack: [], selected: null });
    const s = reduce(initialState(), { type: "select", size: 10 });
    expect(reduce(s, { type: "place", offset: NaN })).toEqual(s);
    expect(initialState().stack).not.toBe(initialState().stack);
  });
});
