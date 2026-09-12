import { describe, expect, it } from "vitest";
import { authenticity } from "./authenticity";
import { materials, rooms } from "./materials";
import { hasActivity } from "../activities/registry";
import type { MaterialId } from "../domain/material";

describe("authenticity availability", () => {
  it("excludes every withdrawn interaction from launches, collection, and room hotspots", () => {
    for (const [id, review] of Object.entries(authenticity)) {
      if (review.status === "simplified-prototype") continue;
      expect(hasActivity(id), id).toBe(false);
      expect(
        materials.some((material) => material.id === id),
        id,
      ).toBe(false);
      for (const room of Object.values(rooms)) {
        expect(
          room.scenes.some((scene) =>
            scene.placements.some((p) => p.materialId === id),
          ),
          id,
        ).toBe(false);
      }
    }
  });
  it("requires references and an explicit limitation for accessible prototypes", () => {
    expect(materials).toHaveLength(15);
    for (const material of materials) {
      const review = authenticity[material.id as MaterialId];
      expect(review.sources.length).toBeGreaterThan(0);
      expect(review.reason.length).toBeGreaterThan(20);
      expect(hasActivity(material.activityId)).toBe(true);
    }
  });
});
