import { feedbackCopy as c } from "../../content/en/feedback";
export const targets = [
  [1, 2],
  [1, 3],
  [3, 4],
] as const;
export interface State {
  target: number;
  pieces: number[];
  selected: number | null;
}
export type Action =
  | { type: "select"; denominator: number }
  | { type: "place" }
  | { type: "remove"; index: number }
  | { type: "target"; index: number };
export const initialState = (): State => ({
  target: 0,
  pieces: [],
  selected: null,
});
// All available denominators divide 2520, avoiding floating-point completion errors.
export const units = (pieces: number[]) =>
  pieces.reduce((n, d) => n + 2520 / d, 0);
export function reduce(s: State, a: Action): State {
  if (a.type === "target")
    return Number.isInteger(a.index) && targets[a.index]
      ? { ...initialState(), target: a.index }
      : s;
  if (a.type === "select")
    return Number.isInteger(a.denominator) &&
      a.denominator >= 1 &&
      a.denominator <= 10
      ? { ...s, selected: a.denominator }
      : s;
  if (a.type === "remove")
    return Number.isInteger(a.index) &&
      a.index >= 0 &&
      a.index < s.pieces.length
      ? { ...s, pieces: s.pieces.filter((_, i) => i !== a.index) }
      : s;
  if (
    !s.selected ||
    s.pieces.filter((d) => d === s.selected).length >= s.selected ||
    units(s.pieces) + 2520 / s.selected > 2520
  )
    return s;
  return { ...s, pieces: [...s.pieces, s.selected] };
}
export const isComplete = (s: State) =>
  s.pieces.length > 1 &&
  s.pieces.every((d) => d === s.pieces[0]) &&
  s.pieces[0] !== targets[s.target][1] &&
  units(s.pieces) === (2520 * targets[s.target][0]) / targets[s.target][1];
export function sector(fraction: number, start = 0, r = 100) {
  const point = (a: number) => [
    r * Math.sin(a * 2 * Math.PI),
    -r * Math.cos(a * 2 * Math.PI),
  ];
  if (fraction === 1)
    return `M0,${-r}A${r},${r} 0 1,1 0,${r}A${r},${r} 0 1,1 0,${-r}Z`;
  const a = point(start),
    b = point(start + fraction);
  return `M0,0L${a[0]},${a[1]}A${r},${r} 0 ${fraction > 0.5 ? 1 : 0},1 ${b[0]},${b[1]}Z`;
}

export function checkWork(s: State) {
  if (!s.pieces.length) return c.fractionStart;
  const reference = (2520 * targets[s.target][0]) / targets[s.target][1];
  return units(s.pieces) < reference
    ? c.fractionGap
    : units(s.pieces) > reference
      ? c.fractionOver
      : c.fractionEqualParts;
}
