import type { StudyConfig } from "./config";

export interface StudyState {
  selected: string | null;
  placements: Record<string, string>;
}

export type StudyAction =
  | { type: "select"; piece: string }
  | { type: "place"; target: string }
  | { type: "return"; piece: string };

export const initialState = (): StudyState => ({
  selected: null,
  placements: {},
});

export function reduce(
  config: StudyConfig,
  state: StudyState,
  action: StudyAction,
) {
  if (action.type === "select") {
    if (!config.pieces.some((piece) => piece.id === action.piece)) return state;
    return {
      ...state,
      selected: state.selected === action.piece ? null : action.piece,
    };
  }
  if (action.type === "return") {
    if (!(action.piece in state.placements)) return state;
    const placements = { ...state.placements };
    delete placements[action.piece];
    return { selected: action.piece, placements };
  }
  if (!state.selected || !config.targets.includes(action.target)) return state;
  const placements = { ...state.placements };
  for (const [piece, target] of Object.entries(placements)) {
    if (target === action.target) delete placements[piece];
  }
  placements[state.selected] = action.target;
  return { selected: null, placements };
}

export const isComplete = (config: StudyConfig, state: StudyState) =>
  config.pieces.every((piece) => state.placements[piece.id] === piece.target);
