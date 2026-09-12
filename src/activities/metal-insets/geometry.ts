export type Point = [number, number];
export const center: Point = [280, 280];
export const paper = { left: 55, top: 55, right: 505, bottom: 505 };
const regular = (n: number, r: number, offset = -Math.PI / 2): Point[] =>
  Array.from({ length: n }, (_, i) => [
    Math.cos(offset + (i * 2 * Math.PI) / n) * r,
    Math.sin(offset + (i * 2 * Math.PI) / n) * r,
  ]);
export const figures = [
  { id: "circle", name: "Circle", points: regular(96, 130, 0) },
  {
    id: "square",
    name: "Square",
    points: [
      [-120, -120],
      [120, -120],
      [120, 120],
      [-120, 120],
    ] as Point[],
  },
  { id: "triangle", name: "Triangle", points: regular(3, 145) },
  {
    id: "rectangle",
    name: "Rectangle",
    points: [
      [-135, -90],
      [135, -90],
      [135, 90],
      [-135, 90],
    ] as Point[],
  },
  {
    id: "ellipse",
    name: "Ellipse",
    points: regular(96, 1, 0).map(([x, y]): Point => [x * 135, y * 95]),
  },
];
export const shapePath = (index: number) =>
  figures[index].points
    .map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`)
    .join(" ") + "Z";
export const distance = (a: Point, b: Point) =>
  Math.hypot(a[0] - b[0], a[1] - b[1]);
export function nearest(point: Point, figure: number): Point {
  let result: Point = [0, 0],
    best = Infinity;
  const points = figures[figure].points;
  for (let i = 0; i < points.length; i++) {
    const a = points[i],
      b = points[(i + 1) % points.length],
      dx = b[0] - a[0],
      dy = b[1] - a[1];
    const t = Math.max(
      0,
      Math.min(
        1,
        ((point[0] - a[0]) * dx + (point[1] - a[1]) * dy) / (dx * dx + dy * dy),
      ),
    );
    const q: Point = [a[0] + t * dx, a[1] + t * dy],
      d = distance(point, q);
    if (d < best) {
      best = d;
      result = q;
    }
  }
  return result;
}
export function perimeter(figure: number, spacing = 7): Point[] {
  const points = figures[figure].points,
    result: Point[] = [];
  for (let i = 0; i < points.length; i++) {
    const a = points[i],
      b = points[(i + 1) % points.length],
      n = Math.ceil(distance(a, b) / spacing);
    for (let j = 0; j < n; j++)
      result.push([
        center[0] + a[0] + ((b[0] - a[0]) * j) / n,
        center[1] + a[1] + ((b[1] - a[1]) * j) / n,
      ]);
  }
  return result;
}
export const inside = (p: Point, figure: number) => {
  const points = figures[figure].points;
  let yes = false;
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    const [x, y] = points[i],
      [xj, yj] = points[j];
    if (y > p[1] !== yj > p[1] && p[0] < ((xj - x) * (p[1] - y)) / (yj - y) + x)
      yes = !yes;
  }
  return yes;
};
