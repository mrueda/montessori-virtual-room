import { tableCopy as c } from "../../content/en/drawing-table";
export const items = ["plate", "fork", "spoon", "glass", "napkin"] as const;
export type Item = (typeof items)[number];
export interface Pose {
  x: number;
  y: number;
  angle: number;
}
export const homes: Pose[] = [
  { x: 805, y: 155, angle: 0 },
  { x: 710, y: 380, angle: 0 },
  { x: 780, y: 380, angle: 0 },
  { x: 900, y: 315, angle: 0 },
  { x: 885, y: 455, angle: 0 },
];
export const targets: Pose[] = [
  { x: 350, y: 285, angle: 0 },
  { x: 215, y: 300, angle: 0 },
  { x: 505, y: 300, angle: 0 },
  { x: 490, y: 140, angle: 0 },
  { x: 125, y: 300, angle: 0 },
];
export interface State {
  poses: Pose[];
  selected: number | null;
  folded: boolean;
  setting: "snack" | "meal";
  outlines: boolean;
}
export type Action =
  | { type: "select"; index: number }
  | { type: "move"; index: number; x: number; y: number; settle?: boolean }
  | { type: "rotate"; degrees: number }
  | { type: "fold" }
  | { type: "return" }
  | { type: "outlines" }
  | { type: "setting"; setting: "snack" | "meal" };
export const initialState = (): State => ({
  poses: homes.map((p) => ({ ...p })),
  selected: null,
  folded: false,
  setting: "snack",
  outlines: true,
});
export const activeItems = (s: State) =>
  items.map((_, i) => i).filter((i) => s.setting === "meal" || i !== 1);
export const angleDifference = (a: number, b: number) =>
  Math.abs(((a - b + 540) % 360) - 180);
export const inPlace = (s: State, i: number) =>
  Math.hypot(s.poses[i].x - targets[i].x, s.poses[i].y - targets[i].y) < 26 &&
  (i === 0 ||
    i === 3 ||
    angleDifference(s.poses[i].angle, 0) < 16 ||
    (i === 4 && angleDifference(s.poses[i].angle, 180) < 16));
export function reduce(s: State, a: Action): State {
  if (a.type === "setting")
    return ["snack", "meal"].includes(a.setting)
      ? { ...initialState(), setting: a.setting }
      : s;
  if (a.type === "outlines") return { ...s, outlines: !s.outlines };
  if (a.type === "fold") return { ...s, folded: !s.folded };
  if (a.type === "select")
    return activeItems(s).includes(a.index) ? { ...s, selected: a.index } : s;
  if (a.type === "rotate") {
    if (s.selected === null || !Number.isFinite(a.degrees)) return s;
    return {
      ...s,
      poses: s.poses.map((p, i) =>
        i === s.selected
          ? { ...p, angle: (p.angle + a.degrees + 360) % 360 }
          : p,
      ),
    };
  }
  if (a.type === "return")
    return s.selected === null
      ? s
      : {
          ...s,
          poses: s.poses.map((p, i) =>
            i === s.selected ? { ...homes[i] } : p,
          ),
          selected: null,
        };
  if (!activeItems(s).includes(a.index) || ![a.x, a.y].every(Number.isFinite))
    return s;
  let pose = {
    ...s.poses[a.index],
    x: Math.min(950, Math.max(50, a.x)),
    y: Math.min(495, Math.max(55, a.y)),
  };
  const t = targets[a.index];
  if (
    a.settle &&
    Math.hypot(pose.x - t.x, pose.y - t.y) < 20 &&
    angleDifference(pose.angle, 0) < 12
  )
    pose = { ...t };
  return {
    ...s,
    selected: a.index,
    poses: s.poses.map((p, i) => (i === a.index ? pose : p)),
  };
}
export const isComplete = (s: State) =>
  s.folded && activeItems(s).every((i) => inPlace(s, i));
export function checkWork(s: State) {
  const missing = activeItems(s).find((i) => !inPlace(s, i));
  return missing !== undefined
    ? c.checkObject(items[missing])
    : !s.folded
      ? c.checkFold
      : c.checkComplete;
}
