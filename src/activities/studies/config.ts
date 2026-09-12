import type { Area, MaterialId } from "../../domain/material";

export interface StudyConfig {
  id: MaterialId;
  area: Area;
  ageMonths: readonly [number, number];
  mode: "matching" | "ordering";
  layout:
    | "globe"
    | "map"
    | "land-water"
    | "cabinet"
    | "classification"
    | "timeline"
    | "palette"
    | "canvas"
    | "social"
    | "place-setting"
    | "path";
  pieces: readonly {
    id: string;
    target: string;
    color: string;
    shape?: "box" | "circle" | "triangle";
  }[];
  targets: readonly string[];
}

export const studyConfigs = [
  {
    id: "continent-globe",
    area: "Culture",
    ageMonths: [36, 72],
    mode: "matching",
    layout: "globe",
    targets: ["africa", "europe", "asia", "americas", "oceania", "antarctica"],
    pieces: [
      { id: "africa-piece", target: "africa", color: "#a98a55" },
      { id: "europe-piece", target: "europe", color: "#b45d55" },
      { id: "asia-piece", target: "asia", color: "#d3ae54" },
      { id: "americas-piece", target: "americas", color: "#83a164" },
      { id: "oceania-piece", target: "oceania", color: "#9674a0" },
      { id: "antarctica-piece", target: "antarctica", color: "#e7ddd0" },
    ],
  },
  {
    id: "world-puzzle-map",
    area: "Culture",
    ageMonths: [42, 72],
    mode: "matching",
    layout: "map",
    targets: ["north", "south", "europe", "africa", "asia", "australia"],
    pieces: [
      { id: "north-piece", target: "north", color: "#d59d54" },
      { id: "south-piece", target: "south", color: "#d27c62" },
      { id: "europe-piece", target: "europe", color: "#b45d55" },
      { id: "africa-piece", target: "africa", color: "#a98a55" },
      { id: "asia-piece", target: "asia", color: "#d3ae54" },
      { id: "australia-piece", target: "australia", color: "#9674a0" },
    ],
  },
  {
    id: "land-water-forms",
    area: "Culture",
    ageMonths: [36, 72],
    mode: "matching",
    layout: "land-water",
    targets: ["island", "lake", "peninsula", "gulf", "isthmus", "strait"],
    pieces: [
      {
        id: "land-island",
        target: "island",
        color: "#b99a62",
        shape: "circle",
      },
      { id: "water-lake", target: "lake", color: "#668fa8", shape: "circle" },
      { id: "land-peninsula", target: "peninsula", color: "#b99a62" },
      { id: "water-gulf", target: "gulf", color: "#668fa8" },
      { id: "land-isthmus", target: "isthmus", color: "#b99a62" },
      { id: "water-strait", target: "strait", color: "#668fa8" },
    ],
  },
  {
    id: "botany-cabinet",
    area: "Culture",
    ageMonths: [42, 72],
    mode: "matching",
    layout: "cabinet",
    targets: ["cordate", "ovate", "lanceolate", "palmate"],
    pieces: [
      { id: "heart-leaf", target: "cordate", color: "#799568" },
      { id: "egg-leaf", target: "ovate", color: "#8aa06c" },
      { id: "spear-leaf", target: "lanceolate", color: "#6f8e63" },
      { id: "hand-leaf", target: "palmate", color: "#91a66e" },
    ],
  },
  {
    id: "animal-classification",
    area: "Culture",
    ageMonths: [42, 72],
    mode: "matching",
    layout: "classification",
    targets: ["mammal", "bird", "fish", "amphibian", "insect"],
    pieces: [
      { id: "horse", target: "mammal", color: "#a9825d" },
      { id: "robin", target: "bird", color: "#bb6e58" },
      { id: "salmon", target: "fish", color: "#668fa8" },
      { id: "frog", target: "amphibian", color: "#7e9b69" },
      { id: "butterfly", target: "insect", color: "#d3ad59" },
    ],
  },
  {
    id: "life-cycle-sequencing",
    area: "Culture",
    ageMonths: [42, 72],
    mode: "ordering",
    layout: "timeline",
    targets: ["first", "second", "third", "fourth"],
    pieces: [
      { id: "egg", target: "first", color: "#e7ddd0", shape: "circle" },
      { id: "caterpillar", target: "second", color: "#7c9a65" },
      { id: "chrysalis", target: "third", color: "#9a805f" },
      { id: "butterfly", target: "fourth", color: "#d3a24f" },
    ],
  },
  {
    id: "color-mixing",
    area: "Art",
    ageMonths: [42, 72],
    mode: "matching",
    layout: "palette",
    targets: ["orange", "green", "violet"],
    pieces: [
      { id: "red-yellow", target: "orange", color: "#dc7d43", shape: "circle" },
      { id: "yellow-blue", target: "green", color: "#729164", shape: "circle" },
      { id: "blue-red", target: "violet", color: "#8a6b91", shape: "circle" },
    ],
  },
  {
    id: "line-design",
    area: "Art",
    ageMonths: [42, 72],
    mode: "ordering",
    layout: "canvas",
    targets: ["one", "two", "three", "four", "five"],
    pieces: [
      { id: "horizontal", target: "one", color: "#9f6d58" },
      { id: "rising", target: "two", color: "#c0a053" },
      { id: "vertical", target: "three", color: "#668ca1" },
      { id: "falling", target: "four", color: "#82936c" },
      { id: "closing", target: "five", color: "#9f6d58" },
    ],
  },
  {
    id: "greeting-practice",
    area: "Grace and Courtesy",
    ageMonths: [36, 72],
    mode: "ordering",
    layout: "social",
    targets: ["one", "two", "three", "four"],
    pieces: [
      { id: "approach", target: "one", color: "#9a8064" },
      { id: "pause", target: "two", color: "#b59a70" },
      { id: "greet", target: "three", color: "#7c9471" },
      { id: "listen", target: "four", color: "#69899c" },
    ],
  },
  {
    id: "table-setting",
    area: "Grace and Courtesy",
    ageMonths: [36, 72],
    mode: "matching",
    layout: "place-setting",
    targets: ["center", "left", "right", "upper-right", "napkin-place"],
    pieces: [
      { id: "plate", target: "center", color: "#e5dfd1", shape: "circle" },
      { id: "fork", target: "left", color: "#8f948f" },
      { id: "spoon", target: "right", color: "#a2a49d" },
      { id: "glass", target: "upper-right", color: "#89a6ad", shape: "circle" },
      { id: "napkin", target: "napkin-place", color: "#c29a7a" },
    ],
  },
  {
    id: "walking-around-mat",
    area: "Grace and Courtesy",
    ageMonths: [36, 72],
    mode: "ordering",
    layout: "path",
    targets: ["notice", "slow", "space", "continue"],
    pieces: [
      { id: "see-work", target: "notice", color: "#9a8064" },
      { id: "slow-down", target: "slow", color: "#7f9473" },
      { id: "walk-around", target: "space", color: "#69899c" },
      { id: "continue-path", target: "continue", color: "#b69a70" },
    ],
  },
] as const satisfies readonly StudyConfig[];

export type StudyMaterialId = (typeof studyConfigs)[number]["id"];

export const studyConfigById = Object.fromEntries(
  studyConfigs.map((config) => [config.id, config]),
) as Record<StudyMaterialId, (typeof studyConfigs)[number]>;
