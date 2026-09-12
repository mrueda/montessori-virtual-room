export type Triple = [number, number, number];
export interface DemoPose {
  position: Triple;
  rotation: Triple;
  scale: Triple;
}
export type DemoModel =
  | "box"
  | "ball"
  | "cylinder"
  | "tablet"
  | "bowl"
  | "jug"
  | "cup"
  | "water"
  | "button"
  | "circle"
  | "square"
  | "triangle"
  | "letter-m"
  | "letter-a"
  | "letter-s";
export interface DemoObject {
  id: string;
  model: DemoModel;
  color: string;
  size: Triple;
  pose: DemoPose;
}
export interface DemoStep {
  caption: string;
  duration: number;
  changes: { id: string; to: DemoPose; lift?: number }[];
}
export interface Demonstration {
  objects: DemoObject[];
  steps: DemoStep[];
  camera?: Triple;
  target?: Triple;
}
