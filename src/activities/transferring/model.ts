export interface TransferState {
  bowls: ("left" | "right")[];
  selected: number | null;
}
export type TransferAction =
  { type: "select"; id: number } | { type: "place"; bowl: "left" | "right" };
export const initialState = (): TransferState => ({
  bowls: ["left", "left", "left", "left", "left", "left"],
  selected: null,
});
export function reduce(s: TransferState, a: TransferAction): TransferState {
  if (a.type === "select")
    return Number.isInteger(a.id) && a.id >= 0 && a.id < 6
      ? { ...s, selected: s.selected === a.id ? null : a.id }
      : s;
  return s.selected !== null
    ? {
        bowls: s.bowls.map((b, i) => (i === s.selected ? a.bowl : b)),
        selected: null,
      }
    : s;
}
export const isComplete = (s: TransferState) =>
  s.bowls.every((b) => b === "right");
