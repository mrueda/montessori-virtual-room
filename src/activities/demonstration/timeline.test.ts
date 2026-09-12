import { describe, it, expect } from "vitest";
import { demonstrations } from "../../content/demonstrations";
import { durationOf, sample } from "./timeline";
describe("Guided movement timeline", () => {
  it("moves a cube through the air without mutating the authored demonstration", () => {
    const d = demonstrations["pink-tower"],
      before = JSON.stringify(d),
      initial = d.objects.find((o) => o.id === "cube-10")!.pose;
    const half = sample(d, d.steps[0].duration / 2);
    expect(half.poses["cube-10"].position[0]).not.toBe(initial.position[0]);
    expect(half.poses["cube-10"].position[1]).toBeGreaterThan(
      initial.position[1],
    );
    expect(JSON.stringify(d)).toBe(before);
  });
  it("finishes every object at its last authored target", () => {
    for (const d of Object.values(demonstrations)) {
      const final = sample(d, durationOf(d));
      expect(final.complete).toBe(true);
      const targets = Object.fromEntries(
        d.steps.flatMap((s) => s.changes.map((c) => [c.id, c.to])),
      );
      for (const [id, pose] of Object.entries(targets))
        expect(final.poses[id]).toEqual(pose);
    }
  });
  it("has positive durations and only references existing objects", () => {
    for (const d of Object.values(demonstrations)) {
      const ids = new Set(d.objects.map((o) => o.id));
      expect(ids.size).toBe(d.objects.length);
      for (const s of d.steps) {
        expect(s.duration).toBeGreaterThan(0);
        for (const c of s.changes) expect(ids.has(c.id)).toBe(true);
      }
    }
  });
  it("shows fixed poses until a reduced-motion step is advanced", () => {
    const d = demonstrations.transferring,
      id = "ball-0",
      initial = d.objects.find((o) => o.id === id)!.pose;
    expect(sample(d, 500, true).poses[id]).toEqual(initial);
    expect(sample(d, d.steps[0].duration, true).poses[id]).toEqual(
      d.steps[0].changes[0].to,
    );
  });
});
