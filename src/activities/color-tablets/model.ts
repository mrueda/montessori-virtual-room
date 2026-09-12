export const tablets = [
  { id: 0, color: "red", hex: "#bd6056" },
  { id: 1, color: "yellow", hex: "#d5b557" },
  { id: 2, color: "blue", hex: "#668ca5" },
  { id: 3, color: "red", hex: "#bd6056" },
  { id: 4, color: "yellow", hex: "#d5b557" },
  { id: 5, color: "blue", hex: "#668ca5" },
] as const;
export interface ColorState {
  pairs: [number, number][];
  selected: number | null;
}
export type ColorAction =
  { type: "choose"; id: number } | { type: "separate"; index: number };
export const initialState = (): ColorState => ({ pairs: [], selected: null });
export function reduce(s: ColorState, a: ColorAction): ColorState {
  if (a.type === "separate")
    return Number.isInteger(a.index) && a.index >= 0 && a.index < s.pairs.length
      ? { pairs: s.pairs.filter((_, i) => i !== a.index), selected: null }
      : s;
  if (!tablets.some((t) => t.id === a.id) || s.pairs.flat().includes(a.id))
    return s;
  if (s.selected === a.id) return { ...s, selected: null };
  if (s.selected === null) return { ...s, selected: a.id };
  return { pairs: [...s.pairs, [s.selected, a.id]], selected: null };
}
export const isComplete = (s: ColorState) =>
  s.pairs.length === 3 &&
  s.pairs.every(([a, b]) => tablets[a].color === tablets[b].color);
