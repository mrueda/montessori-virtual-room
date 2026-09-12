import { describe, expect, it } from "vitest";
import { studyConfigById, studyConfigs } from "./config";
import { initialState, isComplete, reduce } from "./model";

describe("data-driven placement studies", () => {
  it("keeps an incorrect placement visible for self-correction", () => {
    const config = studyConfigById["color-mixing"];
    let state = reduce(config, initialState(), {
      type: "select",
      piece: "red-yellow",
    });
    state = reduce(config, state, { type: "place", target: "green" });
    expect(state.placements["red-yellow"]).toBe("green");
    expect(isComplete(config, state)).toBe(false);
    state = reduce(config, state, { type: "return", piece: "red-yellow" });
    expect(state.placements["red-yellow"]).toBeUndefined();
    expect(state.selected).toBe("red-yellow");
  });

  it("completes every configured study only when all answers correspond", () => {
    for (const config of studyConfigs) {
      let state = initialState();
      for (const piece of config.pieces) {
        state = reduce(config, state, { type: "select", piece: piece.id });
        state = reduce(config, state, {
          type: "place",
          target: piece.target,
        });
      }
      expect(isComplete(config, state), config.id).toBe(true);
    }
  });

  it("rejects unknown pieces and targets without changing work", () => {
    const config = studyConfigById["table-setting"];
    const state = initialState();
    expect(reduce(config, state, { type: "select", piece: "unknown" })).toBe(
      state,
    );
    expect(reduce(config, state, { type: "place", target: "unknown" })).toBe(
      state,
    );
  });
});
