export interface CylinderState {
  seated: number[];
  lifted: number[];
  selected: number | null;
  attemptedSocket: number | null;
}
export type CylinderAction =
  | { type: "lift"; size: number }
  | { type: "select"; size: number }
  | { type: "fit"; socket: number };
export const sizes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
export const initialState = (): CylinderState => ({
  seated: [...sizes],
  lifted: [],
  selected: null,
  attemptedSocket: null,
});
export function reduce(
  state: CylinderState,
  action: CylinderAction,
): CylinderState {
  if (action.type === "lift") {
    if (!state.seated.includes(action.size)) return state;
    return {
      ...state,
      seated: state.seated.filter((n) => n !== action.size),
      lifted: [...new Set([...state.lifted, action.size])],
      selected: null,
      attemptedSocket: null,
    };
  }
  if (action.type === "select")
    return sizes.includes(action.size) && !state.seated.includes(action.size)
      ? { ...state, selected: action.size, attemptedSocket: null }
      : state;
  if (
    state.selected === null ||
    !sizes.includes(action.socket) ||
    state.seated.includes(action.socket)
  )
    return state;
  return state.selected === action.socket
    ? {
        ...state,
        seated: [...state.seated, action.socket],
        selected: null,
        attemptedSocket: null,
      }
    : { ...state, attemptedSocket: action.socket };
}
export const isComplete = (s: CylinderState) =>
  s.seated.length === 10 && s.lifted.length === 10;
