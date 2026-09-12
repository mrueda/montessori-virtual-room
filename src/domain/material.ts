export type AgeGroupId =
  "0-18m" | "18m-3y" | "3-6y" | "6-9y" | "9-12y" | "12-18y";
export type RoomSceneRendererId =
  | "childrens-house-overview"
  | "toddler-community-overview"
  | "practical-life-corner"
  | "sensorial-corner"
  | "language-corner"
  | "mathematics-corner"
  | "culture-corner"
  | "art-studio"
  | "grace-courtesy-space"
  | "nido"
  | "lower-elementary"
  | "upper-elementary"
  | "adolescent";
export type Area =
  | "Practical Life"
  | "Sensorial"
  | "Language"
  | "Mathematics"
  | "Culture"
  | "Art"
  | "Grace and Courtesy";
export type MaterialId =
  | "metal-insets"
  | "movable-alphabet"
  | "checkerboard"
  | "cards-counters"
  | "stamp-game"
  | "fraction-insets"
  | "constructive-triangles"
  | "pink-tower"
  | "cylinder-blocks"
  | "pouring"
  | "dressing-frame"
  | "color-tablets"
  | "red-rods"
  | "broad-stair"
  | "number-rods"
  | "sandpaper-letters"
  | "transferring"
  | "shape-puzzle"
  | "continent-globe"
  | "world-puzzle-map"
  | "land-water-forms"
  | "botany-cabinet"
  | "animal-classification"
  | "life-cycle-sequencing"
  | "color-mixing"
  | "line-design"
  | "greeting-practice"
  | "table-setting"
  | "walking-around-mat";
export type AssetReference =
  | { kind: "procedural"; modelKey: string }
  | { kind: "gltf"; url: string; thumbnail: string };
export interface Material {
  id: MaterialId;
  area: Area;
  ageMonths: readonly [number, number];
  activityId: string;
  interaction:
    | "stacking"
    | "fitting"
    | "pouring"
    | "fastening"
    | "matching"
    | "ordering"
    | "tracing"
    | "transferring";
  assets: AssetReference;
}
export interface MaterialContent {
  name: string;
  ageLabel: string;
  description: string;
  purpose: string;
  directAim: string;
  indirectAims: string[];
  skills: string[];
  presentation: string[];
  controlOfError: string;
  prerequisites: string;
  related: MaterialId[];
  next: string;
  adultNote: string;
  reviewStatus: "draft" | "educator-reviewed";
  sources: string[];
  narration?: { url: string; transcript: string };
}
export interface RoomDefinition {
  id: string;
  name: string;
  ageLabel: string;
  introduction: string;
  ageGroup: AgeGroupId;
  defaultSceneId: string;
  scenes: RoomSceneDefinition[];
  guide?: {
    introduction: string;
    audience: string;
    sources: { title: string; url: string }[];
    points: {
      id: string;
      title: string;
      description: string;
      position: [number, number, number];
    }[];
  };
}
export interface RoomSceneDefinition {
  id: string;
  name: string;
  shortName: string;
  description: string;
  renderer: RoomSceneRendererId;
  placements: {
    materialId: MaterialId;
    position: [number, number, number];
    shelf: Area;
    rotation?: number;
    labelHeight?: number;
  }[];
}
