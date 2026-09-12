import { formsCopy as c, formPairs } from "../../content/en/expansion";
export interface State {
  pair: number;
  levels: [number, number];
  source: number;
  held: boolean;
  target: 0 | 1 | null;
  tilt: number;
  spill: number;
}
export type Action =
  | { type: "pair"; index: number }
  | { type: "pick" }
  | { type: "target"; side: 0 | 1 }
  | { type: "tilt"; value: number }
  | { type: "tick" }
  | { type: "return" }
  | { type: "wipe" }
  | { type: "empty"; side: 0 | 1 };
export const initialState = (): State => ({
  pair: 0,
  levels: [0, 0],
  source: 100,
  held: false,
  target: null,
  tilt: 0,
  spill: 0,
});
export function reduce(s: State, a: Action): State {
  if (a.type === "pair")
    return Number.isInteger(a.index) && formPairs[a.index]
      ? { ...initialState(), pair: a.index }
      : s;
  if (a.type === "pick") return { ...s, held: true };
  if (a.type === "target")
    return s.held && s.tilt === 0 && (a.side === 0 || a.side === 1)
      ? { ...s, target: a.side }
      : s;
  if (a.type === "tilt")
    return s.held && Number.isFinite(a.value)
      ? { ...s, tilt: Math.max(0, Math.min(70, a.value)) }
      : s;
  if (a.type === "return")
    return s.tilt === 0 ? { ...s, held: false, target: null } : s;
  if (a.type === "wipe") return !s.held ? { ...s, spill: 0 } : s;
  if (a.type === "empty") {
    if (s.held || (a.side !== 0 && a.side !== 1)) return s;
    const levels = [...s.levels] as [number, number];
    const source = s.source + levels[a.side];
    levels[a.side] = 0;
    return { ...s, levels, source };
  }
  if (a.type !== "tick" || !s.held || s.tilt <= 25 || s.source === 0) return s;
  const amount = Math.min(s.source, 2),
    levels = [...s.levels] as [number, number];
  let spill = s.spill;
  if (s.target === null) spill += amount;
  else {
    const fits = Math.min(35 - levels[s.target], amount);
    levels[s.target] += fits;
    spill += amount - fits;
  }
  return { ...s, levels, source: s.source - amount, spill };
}
export const isComplete = (s: State) =>
  s.levels.every((n) => n >= 25) && !s.held && s.spill === 0;
export const checkWork = (s: State) =>
  s.levels.some((n) => n < 25)
    ? c.checkFill
    : s.held
      ? c.checkReturn
      : s.spill
        ? c.checkWipe
        : c.checkCompare;
