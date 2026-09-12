import { feedbackCopy as c } from "../../content/en/feedback";
export type Point = [number, number];
export const pairs = [
  {
    name: "Green square",
    color: "#5a9267",
    points: [
      [-50, -50],
      [100, -50],
      [-50, 100],
    ] as Point[],
    edge: [1, 2],
    offset: [50, 50] as Point,
  },
  {
    name: "Gray rectangle",
    color: "#9b9f9b",
    points: [
      [-70, -40],
      [140, -40],
      [-70, 80],
    ] as Point[],
    edge: [1, 2],
    offset: [70, 40] as Point,
  },
  {
    name: "Yellow rhombus",
    color: "#dec253",
    points: [
      [-70, 40.4145],
      [70, 40.4145],
      [0, -80.829],
    ] as Point[],
    edge: [0, 1],
    offset: [0, 80.829] as Point,
  },
];
export interface Piece {
  x: number;
  y: number;
  angle: number;
}
export interface State {
  pieces: Piece[];
  selected: number | null;
}
export type Action =
  | { type: "select"; index: number }
  | { type: "move"; index: number; x: number; y: number; settle?: boolean }
  | { type: "rotate"; degrees: number };
export const initialState = (): State => ({
  pieces: [
    { x: 130, y: 150, angle: 0 },
    { x: 440, y: 130, angle: 90 },
    { x: 180, y: 420, angle: 0 },
    { x: 480, y: 400, angle: 270 },
    { x: 745, y: 150, angle: 0 },
    { x: 760, y: 440, angle: 60 },
  ],
  selected: null,
});
export const rotate = (p: Point, a: number): Point => [
  p[0] * Math.cos((a * Math.PI) / 180) - p[1] * Math.sin((a * Math.PI) / 180),
  p[0] * Math.sin((a * Math.PI) / 180) + p[1] * Math.cos((a * Math.PI) / 180),
];
export const normalized = (a: number) => ((a % 360) + 360) % 360;
export function targetFor(s: State, index: number): Piece {
  const other = s.pieces[index % 2 === 0 ? index + 1 : index - 1];
  const delta = rotate(pairs[Math.floor(index / 2)].offset, other.angle);
  return {
    x: other.x + delta[0],
    y: other.y + delta[1],
    angle: normalized(other.angle + 180),
  };
}
export const joined = (s: State, index: number) => {
  const p = s.pieces[index],
    t = targetFor(s, index);
  return (
    Math.hypot(p.x - t.x, p.y - t.y) < 1 && normalized(p.angle) === t.angle
  );
};
export function reduce(s: State, a: Action): State {
  if (a.type === "select")
    return Number.isInteger(a.index) && a.index >= 0 && a.index < 6
      ? { ...s, selected: a.index }
      : s;
  const index = a.type === "rotate" ? s.selected : a.index;
  if (index === null || !Number.isInteger(index) || index < 0 || index >= 6)
    return s;
  let piece = { ...s.pieces[index] };
  if (a.type === "rotate") {
    if (!Number.isFinite(a.degrees)) return s;
    piece.angle = normalized(piece.angle + a.degrees);
  } else {
    if (!Number.isFinite(a.x) || !Number.isFinite(a.y)) return s;
    piece.x = Math.max(100, Math.min(800, a.x));
    piece.y = Math.max(100, Math.min(500, a.y));
  }
  const next = {
    ...s,
    selected: index,
    pieces: s.pieces.map((p, i) => (i === index ? piece : p)),
  };
  if (a.type === "rotate" || a.settle) {
    const target = targetFor(next, index);
    if (
      Math.hypot(piece.x - target.x, piece.y - target.y) <= 14 &&
      piece.angle === target.angle
    )
      next.pieces[index] = target;
  }
  return next;
}
export const isComplete = (s: State) => [0, 2, 4].every((i) => joined(s, i));

export const checkWork = (s: State) =>
  c.triangles([0, 2, 4].filter((i) => joined(s, i)).length);
