export interface DressingState {
  closed: boolean[];
  fabric: "joined" | "separated";
  openedFabric: boolean;
}
export type DressingAction =
  | { type: "toggle-button"; index: number }
  | { type: "separate" }
  | { type: "join" };
export const initialState = (): DressingState => ({
  closed: [true, true, true, true],
  fabric: "joined",
  openedFabric: false,
});
export function reduce(s: DressingState, a: DressingAction): DressingState {
  if (a.type === "toggle-button")
    return s.fabric === "joined" &&
      Number.isInteger(a.index) &&
      a.index >= 0 &&
      a.index < s.closed.length
      ? {
          ...s,
          closed: s.closed.map((closed, i) =>
            i === a.index ? !closed : closed,
          ),
        }
      : s;
  if (a.type === "separate")
    return !s.closed.some(Boolean) && s.fabric === "joined"
      ? { ...s, fabric: "separated", openedFabric: true }
      : s;
  return s.fabric === "separated" ? { ...s, fabric: "joined" } : s;
}
export const isComplete = (s: DressingState) =>
  s.openedFabric && s.fabric === "joined" && s.closed.every(Boolean);
