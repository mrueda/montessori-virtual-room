import { describe, it, expect } from "vitest";
import * as transfer from "./transferring/model";
import * as puzzle from "./shape-puzzle/model";
import {
  materialsForRoom,
  primaryRoom,
  toddlerRoom,
} from "../content/materials";
describe("Toddler materials", () => {
  it("keeps toddler and primary collections separate", () => {
    expect(materialsForRoom(toddlerRoom).map((m) => m.id)).toEqual([
      "transferring",
      "pouring",
      "shape-puzzle",
    ]);
    expect(materialsForRoom(primaryRoom)).toHaveLength(10);
  });
  it("defines valid default scenes and keeps room materials unique across views", () => {
    for (const room of [primaryRoom, toddlerRoom]) {
      expect(
        room.scenes.some((scene) => scene.id === room.defaultSceneId),
      ).toBe(true);
      expect(new Set(room.scenes.map((scene) => scene.id)).size).toBe(
        room.scenes.length,
      );
      const materialIds = materialsForRoom(room).map((material) => material.id);
      expect(new Set(materialIds).size).toBe(materialIds.length);
    }
    expect(primaryRoom.scenes.map((scene) => scene.renderer)).toEqual([
      "childrens-house-overview",
      "practical-life-corner",
      "sensorial-corner",
      "mathematics-corner",
      "culture-corner",
    ]);
    expect(
      materialsForRoom(primaryRoom).some(
        (material) => material.area === "Mathematics",
      ),
    ).toBe(true);
  });
  it("transfers one selected object at a time and can reverse completed work", () => {
    let s = transfer.initialState();
    expect(transfer.reduce(s, { type: "place", bowl: "right" })).toBe(s);
    for (let id = 0; id < 6; id++) {
      s = transfer.reduce(s, { type: "select", id });
      s = transfer.reduce(s, { type: "place", bowl: "right" });
    }
    expect(transfer.isComplete(s)).toBe(true);
    s = transfer.reduce(s, { type: "select", id: 0 });
    s = transfer.reduce(s, { type: "place", bowl: "left" });
    expect(transfer.isComplete(s)).toBe(false);
    expect(s.bowls.filter((b) => b === "right")).toHaveLength(5);
  });
  it("ignores invalid object IDs", () => {
    const s = transfer.initialState();
    expect(transfer.reduce(s, { type: "select", id: -1 })).toBe(s);
    expect(transfer.reduce(s, { type: "select", id: 6 })).toBe(s);
  });
  it("keeps a mismatched puzzle piece out, then allows a matching fit", () => {
    let s = puzzle.initialState();
    s = puzzle.reduce(s, { type: "lift", shape: "circle" });
    s = puzzle.reduce(s, { type: "lift", shape: "square" });
    s = puzzle.reduce(s, { type: "select", shape: "circle" });
    s = puzzle.reduce(s, { type: "fit", shape: "square" });
    expect(s.attempted).toBe("square");
    expect(s.seated).not.toContain("circle");
    s = puzzle.reduce(s, { type: "fit", shape: "circle" });
    expect(s.seated).toContain("circle");
    expect(s.selected).toBeNull();
  });
  it("requires lifting and replacing all three shapes before completion", () => {
    let s = puzzle.initialState();
    expect(puzzle.isComplete(s)).toBe(false);
    for (const shape of puzzle.shapes) {
      s = puzzle.reduce(s, { type: "lift", shape });
      s = puzzle.reduce(s, { type: "select", shape });
      s = puzzle.reduce(s, { type: "fit", shape });
    }
    expect(puzzle.isComplete(s)).toBe(true);
  });
});
