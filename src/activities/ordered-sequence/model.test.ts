import { describe, expect, it } from "vitest";
import { initialState, isComplete, reduce } from "./model";
import type { SequenceSize } from "./model";

function placeInOrder(order: number[]) {
  let state = initialState();
  for (const size of order) {
    state = reduce(state, { type: "select", size: size as SequenceSize });
    state = reduce(state, { type: "place" });
  }
  return state;
}

describe("Ordered dimensional materials", () => {
  it("keeps an irregular sequence visible for self-correction", () => {
    const state = placeInOrder([10, 8, 9]);
    expect(state.placed).toEqual([10, 8, 9]);
    expect(isComplete(state)).toBe(false);
  });

  it("completes only from largest to smallest", () => {
    expect(isComplete(placeInOrder([10, 9, 8, 7, 6, 5, 4, 3, 2, 1]))).toBe(
      true,
    );
    expect(isComplete(placeInOrder([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))).toBe(
      false,
    );
  });

  it("returns any placed piece for another comparison", () => {
    const placed = placeInOrder([10, 9, 8]);
    const state = reduce(placed, { type: "return", size: 9 });
    expect(state.placed).toEqual([10, 8]);
    expect(state.loose).toContain(9);
    expect(state.selected).toBe(9);
  });
});
