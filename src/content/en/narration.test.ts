import { statSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { materials } from "../materials";
import { content } from "./materials";

describe("material narration", () => {
  it("provides a transcript and generated audio for every material", () => {
    for (const material of materials) {
      const narration = content[material.id].narration;
      expect(narration?.transcript.length).toBeGreaterThan(40);
      const audio = resolve(process.cwd(), "public", narration?.url ?? "");
      expect(statSync(audio).size).toBeGreaterThan(1_000);
    }
  });
});
