export interface TowerState {
  stack: { size: number; offset: number }[];
  selected: number | null;
}
export type TowerAction =
  | { type: "select"; size: number }
  | { type: "place"; offset: number }
  | { type: "adjust"; offset: number }
  | { type: "remove" };
export const initialState = (): TowerState => ({ stack: [], selected: null });
export function reduce(state: TowerState, action: TowerAction): TowerState {
  if (action.type === "adjust") {
    if (!state.stack.length || !Number.isFinite(action.offset)) return state;
    return {
      ...state,
      stack: state.stack.map((cube, index) =>
        index === state.stack.length - 1
          ? { ...cube, offset: Math.max(-45, Math.min(45, action.offset)) }
          : cube,
      ),
    };
  }
  if (action.type === "select")
    return Number.isInteger(action.size) &&
      action.size >= 1 &&
      action.size <= 10 &&
      !state.stack.some((c) => c.size === action.size)
      ? { ...state, selected: action.size }
      : state;
  if (action.type === "remove")
    return { stack: state.stack.slice(0, -1), selected: null };
  if (state.selected === null || !Number.isFinite(action.offset)) return state;
  return {
    stack: [
      ...state.stack,
      {
        size: state.selected,
        offset: Math.max(-45, Math.min(45, action.offset)),
      },
    ],
    selected: null,
  };
}
export const isComplete = (state: TowerState) =>
  state.stack.length === 10 &&
  state.stack.every(
    (cube, i) => cube.size === 10 - i && Math.abs(cube.offset) <= 8,
  );
