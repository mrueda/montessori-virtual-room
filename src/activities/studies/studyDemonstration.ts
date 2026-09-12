import type { Demonstration, DemoPose } from "../../domain/demonstration";
import type { StudyCopy } from "../../content/en/studies";
import type { StudyConfig } from "./config";

const pose = (position: [number, number, number]): DemoPose => ({
  position,
  rotation: [0, 0, 0],
  scale: [1, 1, 1],
});

export function createStudyDemonstration(
  config: StudyConfig,
  copy: StudyCopy,
): Demonstration {
  return {
    camera: [5.7, 6.5, 8.2],
    target: [0, 0.25, 0],
    objects: config.pieces.map((piece, index) => ({
      id: piece.id,
      model: "box",
      color: piece.color,
      size: [0.7, 0.12, 0.48],
      pose: pose([-2.7 + index * 1.05, 0.18, 1.65]),
    })),
    steps: config.pieces.map((piece, index) => ({
      caption: `Move ${copy.pieces[piece.id]} to ${copy.targets[piece.target]}.`,
      duration: 1700,
      changes: [
        {
          id: piece.id,
          to: pose([
            -2.55 + (index % 3) * 2.55,
            0.2,
            -1.25 + Math.floor(index / 3) * 1.4,
          ]),
          lift: 0.7,
        },
      ],
    })),
  };
}
