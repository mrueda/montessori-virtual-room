import { environmentRooms } from "./en/environments";
import { isAvailableMaterial } from "./authenticity";
import type { Material, MaterialId, RoomDefinition } from "../domain/material";
import { studyConfigs } from "../activities/studies/config";
const catalogMaterials: Material[] = [
  {
    id: "metal-insets",
    area: "Language",
    ageMonths: [36, 72],
    activityId: "metal-insets",
    interaction: "tracing",
    assets: { kind: "procedural", modelKey: "metal-insets" },
  },
  {
    id: "table-setting",
    area: "Practical Life",
    ageMonths: [24, 72],
    activityId: "table-setting",
    interaction: "transferring",
    assets: { kind: "procedural", modelKey: "table-setting" },
  },
  {
    id: "land-water-forms",
    area: "Culture",
    ageMonths: [36, 72],
    activityId: "land-water-forms",
    interaction: "pouring",
    assets: { kind: "procedural", modelKey: "land-water-forms" },
  },
  {
    id: "movable-alphabet",
    area: "Language",
    ageMonths: [42, 72],
    activityId: "movable-alphabet",
    interaction: "transferring",
    assets: { kind: "procedural", modelKey: "movable-alphabet" },
  },
  {
    id: "checkerboard",
    area: "Mathematics",
    ageMonths: [72, 144],
    activityId: "checkerboard",
    interaction: "transferring",
    assets: { kind: "procedural", modelKey: "checkerboard" },
  },
  {
    id: "cards-counters",
    area: "Mathematics",
    ageMonths: [42, 108],
    activityId: "cards-counters",
    interaction: "transferring",
    assets: { kind: "procedural", modelKey: "cards-counters" },
  },
  {
    id: "stamp-game",
    area: "Mathematics",
    ageMonths: [60, 108],
    activityId: "stamp-game",
    interaction: "transferring",
    assets: { kind: "procedural", modelKey: "stamp-game" },
  },
  {
    id: "fraction-insets",
    area: "Mathematics",
    ageMonths: [72, 144],
    activityId: "fraction-insets",
    interaction: "fitting",
    assets: { kind: "procedural", modelKey: "fraction-insets" },
  },
  {
    id: "constructive-triangles",
    area: "Mathematics",
    ageMonths: [48, 144],
    activityId: "constructive-triangles",
    interaction: "fitting",
    assets: { kind: "procedural", modelKey: "constructive-triangles" },
  },
  {
    id: "pink-tower",
    area: "Sensorial",
    ageMonths: [30, 72],
    activityId: "pink-tower",
    interaction: "stacking",
    assets: { kind: "procedural", modelKey: "pink-tower" },
  },
  {
    id: "cylinder-blocks",
    area: "Sensorial",
    ageMonths: [36, 72],
    activityId: "cylinder-blocks",
    interaction: "fitting",
    assets: { kind: "procedural", modelKey: "cylinder-blocks" },
  },
  {
    id: "pouring",
    area: "Practical Life",
    ageMonths: [24, 72],
    activityId: "pouring",
    interaction: "pouring",
    assets: { kind: "procedural", modelKey: "pouring" },
  },
  {
    id: "dressing-frame",
    area: "Practical Life",
    ageMonths: [36, 72],
    activityId: "dressing-frame",
    interaction: "fastening",
    assets: { kind: "procedural", modelKey: "dressing-frame" },
  },
  {
    id: "color-tablets",
    area: "Sensorial",
    ageMonths: [36, 72],
    activityId: "color-tablets",
    interaction: "matching",
    assets: { kind: "procedural", modelKey: "color-tablets" },
  },
  {
    id: "red-rods",
    area: "Sensorial",
    ageMonths: [30, 72],
    activityId: "red-rods",
    interaction: "ordering",
    assets: { kind: "procedural", modelKey: "red-rods" },
  },
  {
    id: "broad-stair",
    area: "Sensorial",
    ageMonths: [30, 72],
    activityId: "broad-stair",
    interaction: "ordering",
    assets: { kind: "procedural", modelKey: "broad-stair" },
  },
  {
    id: "number-rods",
    area: "Mathematics",
    ageMonths: [36, 72],
    activityId: "number-rods",
    interaction: "ordering",
    assets: { kind: "procedural", modelKey: "number-rods" },
  },
  {
    id: "sandpaper-letters",
    area: "Language",
    ageMonths: [36, 72],
    activityId: "sandpaper-letters",
    interaction: "tracing",
    assets: { kind: "procedural", modelKey: "sandpaper-letters" },
  },
  {
    id: "transferring",
    area: "Practical Life",
    ageMonths: [18, 36],
    activityId: "transferring",
    interaction: "transferring",
    assets: { kind: "procedural", modelKey: "transferring" },
  },
  {
    id: "shape-puzzle",
    area: "Sensorial",
    ageMonths: [18, 36],
    activityId: "shape-puzzle",
    interaction: "fitting",
    assets: { kind: "procedural", modelKey: "shape-puzzle" },
  },
  ...studyConfigs
    .filter(
      (config) =>
        config.id !== "land-water-forms" && config.id !== "table-setting",
    )
    .map((config) => ({
      id: config.id,
      area: config.area,
      ageMonths: config.ageMonths,
      activityId: config.id,
      interaction: config.mode,
      assets: { kind: "procedural" as const, modelKey: config.id },
    })),
];
export const materials = catalogMaterials.filter((material) =>
  isAvailableMaterial(material.id),
);
export const primaryRoom: RoomDefinition = {
  id: "childrens-house",
  name: "The Children’s House",
  ageLabel: "3–6 years",
  introduction: "Come in. Look around. Let your interest lead the way.",
  ageGroup: "3-6y",
  defaultSceneId: "overview",
  scenes: [
    {
      id: "overview",
      name: "The Children’s House",
      shortName: "Whole room",
      description: "A space prepared for discovery",
      renderer: "childrens-house-overview",
      placements: [
        {
          materialId: "pink-tower",
          position: [-3.0, 1.43, -2.6],
          shelf: "Sensorial",
          labelHeight: 1.5,
        },
        {
          materialId: "cylinder-blocks",
          position: [-1.7, 0.78, -2.6],
          shelf: "Sensorial",
        },
        {
          materialId: "color-tablets",
          position: [-3.1, 0.78, -2.6],
          shelf: "Sensorial",
        },
        {
          materialId: "pouring",
          position: [0.5, 1.43, -2.6],
          shelf: "Practical Life",
        },
        {
          materialId: "dressing-frame",
          position: [1.8, 0.78, -2.6],
          shelf: "Practical Life",
        },
      ],
    },
    {
      id: "practical-life",
      name: "The Practical Life Corner",
      shortName: "Practical Life",
      description: "Everyday movements, prepared with care",
      renderer: "practical-life-corner",
      placements: [
        {
          materialId: "table-setting",
          position: [1.9, 0.74, -2.4],
          shelf: "Practical Life",
        },
        {
          materialId: "pouring",
          position: [-1.55, 0.78, -2.4],
          shelf: "Practical Life",
          labelHeight: 0.75,
        },
        {
          materialId: "dressing-frame",
          position: [0.15, 0.73, -2.4],
          shelf: "Practical Life",
          rotation: -0.06,
          labelHeight: 0.75,
        },
      ],
    },
    {
      id: "sensorial",
      name: "The Sensorial Corner",
      shortName: "Sensorial",
      description: "Dimensions, color, and form invite close observation",
      renderer: "sensorial-corner",
      placements: [
        {
          materialId: "pink-tower",
          position: [-2.65, 1.42, -2.45],
          shelf: "Sensorial",
          labelHeight: 1.5,
        },
        {
          materialId: "cylinder-blocks",
          position: [-1.65, 0.75, -2.45],
          shelf: "Sensorial",
          labelHeight: 0.72,
        },
        {
          materialId: "color-tablets",
          position: [-0.35, 0.75, -2.45],
          shelf: "Sensorial",
          rotation: -0.04,
          labelHeight: 0.72,
        },
        {
          materialId: "red-rods",
          position: [2.1, 1.42, -2.45],
          shelf: "Sensorial",
          labelHeight: 0.72,
        },
        {
          materialId: "broad-stair",
          position: [0.95, 0.75, -2.45],
          shelf: "Sensorial",
          labelHeight: 0.72,
        },
      ],
    },
    {
      id: "language",
      name: "The Language Corner",
      shortName: "Language",
      description: "Spoken sounds, written forms, and stories meet here",
      renderer: "language-corner",
      placements: [
        {
          materialId: "metal-insets",
          position: [0.7, 0.74, -2.42],
          shelf: "Language",
        },
        {
          materialId: "movable-alphabet",
          position: [-1.25, 0.74, -2.42],
          shelf: "Language",
          labelHeight: 0.75,
        },
      ],
    },
    {
      id: "mathematics",
      name: "The Mathematics Corner",
      shortName: "Mathematics",
      description: "Quantity becomes visible through ordered materials",
      renderer: "mathematics-corner",
      placements: [
        {
          materialId: "cards-counters",
          position: [0.5, 0.74, -2.42],
          shelf: "Mathematics",
        },
        {
          materialId: "number-rods",
          position: [-1.25, 0.74, -2.42],
          shelf: "Mathematics",
          labelHeight: 0.75,
        },
      ],
    },
    {
      id: "culture",
      name: "The Culture Corner",
      shortName: "Culture",
      description: "The living world, geography, and time invite exploration",
      renderer: "culture-corner",
      placements: [
        ["continent-globe", -2.2, 1.38],
        ["world-puzzle-map", -0.75, 0.72],
        ["land-water-forms", 0.7, 0.72],
        ["botany-cabinet", 2.15, 1.38],
        ["animal-classification", -0.65, 1.38],
        ["life-cycle-sequencing", 2.1, 0.72],
      ].map(([materialId, x, y]) => ({
        materialId: materialId as MaterialId,
        position: [x as number, y as number, -2.42] as [number, number, number],
        shelf: "Culture" as const,
        labelHeight: 0.75,
      })),
    },
    {
      id: "art",
      name: "The Art Studio",
      shortName: "Art",
      description:
        "A prepared place for materials, observation, and expression",
      renderer: "art-studio",
      placements: [
        {
          materialId: "metal-insets",
          position: [-1.1, 0.74, -2.42],
          shelf: "Language",
        },
        {
          materialId: "color-mixing",
          position: [-1.1, 0.74, -2.42],
          shelf: "Art",
          labelHeight: 0.75,
        },
        {
          materialId: "line-design",
          position: [0.55, 0.74, -2.42],
          shelf: "Art",
          labelHeight: 0.75,
        },
      ],
    },
    {
      id: "grace-courtesy",
      name: "Grace and Courtesy",
      shortName: "Courtesy",
      description: "Small social movements help a community work in peace",
      renderer: "grace-courtesy-space",
      placements: [
        {
          materialId: "greeting-practice",
          position: [-1.8, 0.74, -2.42],
          shelf: "Grace and Courtesy",
          labelHeight: 0.75,
        },
        {
          materialId: "table-setting",
          position: [0, 0.74, -2.42],
          shelf: "Practical Life",
          labelHeight: 0.75,
        },
        {
          materialId: "walking-around-mat",
          position: [1.8, 0.74, -2.42],
          shelf: "Grace and Courtesy",
          labelHeight: 0.75,
        },
      ],
    },
  ],
};

export const toddlerRoom: RoomDefinition = {
  id: "toddler-community",
  name: "The Toddler Community",
  ageLabel: "18 months–3 years",
  ageGroup: "18m-3y",
  introduction:
    "Little movements. Growing independence. Explore together with an adult.",
  defaultSceneId: "overview",
  scenes: [
    {
      id: "overview",
      name: "The Toddler Community",
      shortName: "Whole classroom",
      description: "A space prepared for movement and independence",
      renderer: "toddler-community-overview",
      placements: [
        {
          materialId: "table-setting",
          position: [2.3, 0.73, 1.8],
          shelf: "Practical Life",
        },
        {
          materialId: "transferring",
          position: [-2.55, 0.74, -2.7],
          shelf: "Practical Life",
        },
        {
          materialId: "pouring",
          position: [-1.2, 0.73, 1.6],
          shelf: "Practical Life",
        },
        {
          materialId: "shape-puzzle",
          position: [-3.85, 0.74, -0.25],
          shelf: "Sensorial",
          rotation: Math.PI / 2,
        },
      ],
    },
  ],
};
// Withdraw inaccurate representations from room hotspots as well as the collection.
for (const room of [primaryRoom, toddlerRoom]) {
  room.scenes = room.scenes
    .map((scene) => ({
      ...scene,
      placements: scene.placements.filter((placement) =>
        isAvailableMaterial(placement.materialId),
      ),
    }))
    .filter(
      (scene) =>
        scene.id === room.defaultSceneId || scene.placements.length > 0,
    );
}
export const rooms = {
  "0-18m": environmentRooms["0-18m"] as RoomDefinition,
  "18m-3y": toddlerRoom,
  "3-6y": primaryRoom,
  "6-9y": environmentRooms["6-9y"] as RoomDefinition,
  "9-12y": environmentRooms["9-12y"] as RoomDefinition,
  "12-18y": environmentRooms["12-18y"] as RoomDefinition,
};
export type AvailableAgeGroup = keyof typeof rooms;
export const materialsForRoom = (room: RoomDefinition) => {
  const materialsById = new Map(
    materials.map((material) => [material.id, material]),
  );
  const seen = new Set<MaterialId>();
  return room.scenes
    .flatMap((scene) => scene.placements)
    .flatMap((placement) => {
      if (seen.has(placement.materialId)) return [];
      seen.add(placement.materialId);
      const material = materialsById.get(placement.materialId);
      return material ? [material] : [];
    });
};
