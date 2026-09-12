import { describe, it, expect } from "vitest";
import * as metal from "./metal-insets/model";
import {
  center,
  perimeter,
  figures,
  distance,
  nearest,
} from "./metal-insets/geometry";
import type { Point } from "./metal-insets/geometry";
import * as table from "./table-setting/model";
import metalDefinition from "./metal-insets";
import tableDefinition from "./table-setting";
import type { ActivityDefinition } from "../domain/activity";
import {
  materialsForRoom,
  primaryRoom,
  toddlerRoom,
} from "../content/materials";
function trace(s: metal.State, points: Point[]) {
  s = metal.reduce(s, { type: "begin", point: points[0] });
  for (const point of points.slice(1))
    s = metal.reduce(s, { type: "point", point });
  return metal.reduce(s, { type: "end" });
}
describe("Metal Insets", () => {
  it.each(figures.map((_, i) => i))(
    "recognizes deliberate edge movement for figure %s",
    (figure) => {
      let s = metal.reduce(metal.initialState(), {
        type: "figure",
        index: figure,
      });
      const points = perimeter(figure);
      for (const tool of ["frame", "inset"] as const) {
        s = metal.reduce(s, { type: "tool", tool });
        s = trace(s, [...points, points[0]]);
        expect(metal.coverage(s, tool)).toBeGreaterThan(0.9);
      }
      expect(metal.isComplete(s)).toBe(false);
      expect(metal.checkWork(s)).toContain("Both outlines");
      s = metal.reduce(s, { type: "finish" });
      expect(metal.isComplete(s)).toBe(true);
      expect(s.tool).toBe("away");
    },
  );
  it("does not convert arbitrary scribbling through a stencil into a trace", () => {
    let s = metal.reduce(metal.initialState(), { type: "tool", tool: "frame" });
    s = trace(s, [
      [275, 280],
      [300, 280],
      [295, 280],
    ]);
    expect(metal.coverage(s, "frame")).toBe(0);
    expect(metal.isComplete(metal.reduce(s, { type: "finish" }))).toBe(false);
  });
  it("preserves gaps when the pencil leaves the edge and keeps free strokes visible outside the figure", () => {
    let s = metal.reduce(metal.initialState(), { type: "tool", tool: "frame" });
    s = trace(s, [
      [410, 280],
      [280, 280],
      [150, 280],
    ]);
    expect(s.strokes[0].points[1]).toBeNull();
    expect(metal.linePath(s.strokes[0].points).match(/M/g)).toHaveLength(2);
    s = metal.reduce(s, { type: "tool", tool: "away" });
    s = trace(s, [
      [100, 100],
      [180, 180],
    ]);
    expect(s.strokes[1].points).toEqual([
      [100, 100],
      [180, 180],
    ]);
    const before = s.strokes.length;
    s = metal.reduce(s, { type: "undo" });
    expect(s.strokes).toHaveLength(before - 1);
  });
  it("limits ink to paper and rejects non-finite pointer input", () => {
    let s = trace(metal.initialState(), [
      [-200, -100],
      [700, 900],
    ]);
    expect(s.strokes[0].points).toEqual([
      [55, 55],
      [505, 505],
    ]);
    expect(metal.reduce(s, { type: "begin", point: [NaN, 12] })).toEqual(s);
  });
  it("keeps the figure geometry and edge assistance consistent", () => {
    for (const [index] of figures.entries())
      for (const point of perimeter(index)) {
        const local: Point = [point[0] - center[0], point[1] - center[1]];
        expect(distance(local, nearest(local, index))).toBeLessThan(0.00001);
      }
  });
});
describe("Table Setting", () => {
  const arranged = (setting: table.State["setting"]) => {
    let s = table.reduce(table.initialState(), { type: "setting", setting });
    for (const index of table.activeItems(s)) {
      const p = table.targets[index];
      s = table.reduce(s, {
        type: "move",
        index,
        x: p.x,
        y: p.y,
        settle: true,
      });
    }
    return s;
  };
  it.each(["snack", "meal"] as const)(
    "detects a prepared %s setting and permits clearing and repetition",
    (setting) => {
      let s = arranged(setting);
      expect(table.isComplete(s)).toBe(false);
      expect(table.checkWork(s)).toContain("Fold");
      s = table.reduce(s, { type: "fold" });
      expect(table.isComplete(s)).toBe(true);
      s = table.reduce(s, { type: "return" });
      expect(table.isComplete(s)).toBe(false);
    },
  );
  it("permits natural self-correction instead of rejecting an incorrect place", () => {
    let s = table.reduce(table.initialState(), {
      type: "move",
      index: 0,
      x: 120,
      y: 150,
      settle: true,
    });
    expect(s.poses[0].x).toBe(120);
    expect(table.isComplete(s)).toBe(false);
    expect(table.checkWork(s)).toContain("plate");
    s = table.reduce(s, {
      type: "move",
      index: 0,
      x: 350,
      y: 285,
      settle: true,
    });
    expect(table.inPlace(s, 0)).toBe(true);
  });
  it("does not invent orientation errors for round dishes", () => {
    let s = arranged("meal");
    s = table.reduce(s, { type: "fold" });
    for (const index of [0, 3]) {
      s = table.reduce(s, { type: "select", index });
      s = table.reduce(s, { type: "rotate", degrees: 90 });
      expect(table.isComplete(s)).toBe(true);
    }
    s = table.reduce(s, { type: "select", index: 1 });
    s = table.reduce(s, { type: "rotate", degrees: 90 });
    expect(table.isComplete(s)).toBe(false);
  });
  it("does not permit a hidden fork in the snack setting or invalid positions", () => {
    const s = table.initialState();
    expect(table.reduce(s, { type: "select", index: 1 })).toEqual(s);
    expect(
      table.reduce(s, { type: "move", index: 0, x: Infinity, y: 100 }),
    ).toEqual(s);
  });
});
it("provides independent demonstrations that end with valid material state", () => {
  function check<S, A>(d: ActivityDefinition<S, A>) {
    const fresh = d.initialState(),
      saved = JSON.stringify(fresh);
    const steps = d.example!();
    expect(d.isComplete(steps.at(-1)!.state)).toBe(true);
    expect(JSON.stringify(fresh)).toBe(saved);
    expect(d.isComplete(fresh)).toBe(false);
  }
  check(metalDefinition);
  check(tableDefinition);
});
it("restores access to Art and Courtesy while counting shared materials once", () => {
  expect(primaryRoom.scenes.map((s) => s.renderer)).toEqual(
    expect.arrayContaining(["art-studio", "grace-courtesy-space"]),
  );
  const primary = materialsForRoom(primaryRoom).map((m) => m.id);
  expect(primary.filter((id) => id === "metal-insets")).toHaveLength(1);
  expect(primary.filter((id) => id === "table-setting")).toHaveLength(1);
  expect(materialsForRoom(toddlerRoom).map((m) => m.id)).toContain(
    "table-setting",
  );
});
