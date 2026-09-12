import { describe, expect, it } from "vitest";
import { initialState, isComplete, reduce } from "./model";

describe("Sandpaper Letters", () => {
  it("records exploration without requiring a fixed letter order", () => {
    let state = initialState();
    state = reduce(state, { type: "select", letter: "s" });
    state = reduce(state, { type: "trace", letter: "s" });
    state = reduce(state, { type: "select", letter: "m" });
    state = reduce(state, { type: "trace", letter: "m" });
    expect(state.traced).toEqual(["s", "m"]);
    expect(isComplete(state)).toBe(false);
  });

  it("completes after all three letter forms have been explored", () => {
    let state = initialState();
    for (const letter of ["m", "a", "s"] as const)
      state = reduce(state, { type: "trace", letter });
    expect(isComplete(state)).toBe(true);
    expect(reduce(state, { type: "trace", letter: "m" })).toBe(state);
  });
});
