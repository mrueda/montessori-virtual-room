export type Point = [number, number];
export interface Outline {
  outer: Point[];
  holes?: Point[][];
}
const square: Point[] = [
  [-1, -1],
  [1, -1],
  [1, 1],
  [-1, 1],
];
const island: Point[] = Array.from({ length: 64 }, (_, i) => {
  const a = (i * Math.PI) / 32;
  return [Math.cos(a) * 0.5, Math.sin(a) * 0.57];
});
const coast: Point[] = [
  [-1, -0.28],
  [-0.5, -0.28],
  [-0.2, -0.48],
  [0.22, -0.43],
  [0.55, -0.12],
  [0.56, 0.16],
  [0.26, 0.43],
  [-0.15, 0.4],
  [-0.5, 0.23],
  [-1, 0.23],
];
const upper: Point[] = [
  [-1, -0.3],
  [-0.55, -0.44],
  [0, -0.26],
  [0.55, -0.4],
  [1, -0.3],
];
const lower: Point[] = [
  [-1, 0.3],
  [-0.55, 0.16],
  [0, 0.34],
  [0.55, 0.2],
  [1, 0.3],
];
const ribbon: Point[] = [...upper, ...[...lower].reverse()];
const banks: Outline[] = [
  { outer: [[-1, -1], [1, -1], ...[...upper].reverse()] },
  { outer: [...lower, [1, 1], [-1, 1]] },
];
// Each pair exchanges the same land and water outlines; both renderers share them.
const pairs: [Outline[], Outline[]][] = [
  [[{ outer: island }], [{ outer: square, holes: [island] }]],
  [
    [{ outer: coast }],
    [{ outer: [[-1, -1], [1, -1], [1, 1], [-1, 1], ...[...coast].reverse()] }],
  ],
  [[{ outer: ribbon }], banks],
];
export const outlines = (
  pair: number,
  side: number,
  water = false,
): Outline[] => pairs[pair][water ? 1 - side : side];
export const svgPath = (shapes: Outline[]) =>
  shapes
    .flatMap((s) => [s.outer, ...(s.holes ?? [])])
    .map(
      (points) =>
        points.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join(" ") + "Z",
    )
    .join(" ");

/** A point inside each water recess, shared by the pouring indicators. */
export const waterPoint = (pair: number, side: number): Point =>
  side === 0 ? (pair === 2 ? [0, 0.7] : [0.75, 0]) : [0, 0];
