import { metalCopy as c } from "../../content/en/drawing-table";
import {
  center,
  paper,
  figures,
  nearest,
  distance,
  perimeter,
  inside,
} from "./geometry";
import type { Point } from "./geometry";
export const pencils = ["#a94843", "#386d9e", "#66834e", "#a77738", "#8c618f"];
export type Tool = "frame" | "inset" | "away";
export interface Stroke {
  points: (Point | null)[];
  color: string;
  tool: Tool;
  figure: number;
}
export interface State {
  figure: number;
  tool: Tool;
  color: number;
  strokes: Stroke[];
  active: boolean;
  cursor: Point;
  finished: boolean;
}
export type Action =
  | { type: "figure"; index: number }
  | { type: "tool"; tool: Tool }
  | { type: "color"; index: number }
  | { type: "begin" | "point"; point: Point }
  | { type: "end" }
  | { type: "cursor"; point: Point }
  | { type: "undo" }
  | { type: "finish" };
export const initialState = (): State => ({
  figure: 0,
  tool: "away",
  color: 0,
  strokes: [],
  active: false,
  cursor: [410, 280],
  finished: false,
});
const bounded = (p: Point): Point | null =>
  p.every(Number.isFinite)
    ? [
        Math.max(paper.left, Math.min(paper.right, p[0])),
        Math.max(paper.top, Math.min(paper.bottom, p[1])),
      ]
    : null;
function inkPoint(s: State, p: Point): Point | null {
  if (s.tool === "away") return p;
  const local: Point = [p[0] - center[0], p[1] - center[1]],
    edge = nearest(local, s.figure);
  if (distance(local, edge) > 18) return null;
  // Edge assistance represents a rigid stencil, not a handwriting assessment.
  const length = Math.hypot(...edge) || 1,
    offset = s.tool === "frame" ? -2.5 : 2.5;
  return [
    center[0] + edge[0] + (edge[0] / length) * offset,
    center[1] + edge[1] + (edge[1] / length) * offset,
  ];
}
export function reduce(s: State, a: Action): State {
  if (a.type === "figure")
    return Number.isInteger(a.index) && figures[a.index]
      ? { ...s, figure: a.index, tool: "away", active: false, finished: false }
      : s;
  if (a.type === "tool")
    return ["frame", "inset", "away"].includes(a.tool)
      ? { ...s, tool: a.tool, active: false, finished: false }
      : s;
  if (a.type === "color")
    return Number.isInteger(a.index) && pencils[a.index]
      ? { ...s, color: a.index, active: false }
      : s;
  if (a.type === "end") return { ...s, active: false };
  if (a.type === "undo")
    return {
      ...s,
      strokes: s.strokes.slice(0, -1),
      active: false,
      finished: false,
    };
  if (a.type === "finish")
    return s.strokes.some((stroke) => stroke.points.filter(Boolean).length > 1)
      ? { ...s, tool: "away", active: false, finished: true }
      : s;
  const p = bounded(a.point);
  if (!p) return s;
  if (a.type === "cursor") return { ...s, cursor: p };
  if (a.type === "begin") {
    if (s.strokes.length >= 80) return s;
    return {
      ...s,
      active: true,
      cursor: p,
      finished: false,
      strokes: [
        ...s.strokes,
        {
          points: [inkPoint(s, p)],
          color: pencils[s.color],
          tool: s.tool,
          figure: s.figure,
        },
      ],
    };
  }
  if (!s.active || !s.strokes.length) return { ...s, cursor: p };
  const last = s.strokes[s.strokes.length - 1];
  if (last.points.length >= 600) return { ...s, active: false, cursor: p };
  const q = inkPoint(s, p),
    previous = last.points[last.points.length - 1];
  if ((!q && !previous) || (q && previous && distance(q, previous) < 1.5))
    return { ...s, cursor: p };
  return {
    ...s,
    cursor: p,
    strokes: [
      ...s.strokes.slice(0, -1),
      { ...last, points: [...last.points, q] },
    ],
  };
}
export const isComplete = (s: State) => s.finished;
export function coverage(s: State, tool: Tool) {
  const ink = s.strokes
    .filter((line) => line.figure === s.figure && line.tool === tool)
    .flatMap((line) => line.points.filter((p): p is Point => p !== null));
  const edge = perimeter(s.figure);
  return (
    edge.filter((p) => ink.some((q) => distance(p, q) < 12)).length /
    edge.length
  );
}
export function checkWork(s: State) {
  if (isComplete(s)) return c.checkFinished;
  if (!s.strokes.length) return c.checkStart;
  if (coverage(s, "frame") < 0.8) return c.checkFrame;
  if (coverage(s, "inset") < 0.8) return c.checkInset;
  const free = s.strokes
    .filter((line) => line.tool === "away")
    .flatMap((line) => line.points.filter((p): p is Point => p !== null));
  if (!free.length) return c.checkFill;
  if (free.some((p) => !inside([p[0] - center[0], p[1] - center[1]], s.figure)))
    return c.checkOutside;
  return c.checkDesign;
}
export function linePath(points: (Point | null)[]) {
  let down = false;
  return points
    .map((p) => {
      if (!p) {
        down = false;
        return "";
      }
      const segment = `${down ? "L" : "M"}${p[0]} ${p[1]}`;
      down = true;
      return segment;
    })
    .join(" ");
}
