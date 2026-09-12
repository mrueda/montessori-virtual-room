export const letters = ["m", "a", "s"] as const;
export type Letter = (typeof letters)[number];

export interface LetterState {
  selected: Letter;
  traced: Letter[];
}

export type LetterAction =
  { type: "select"; letter: Letter } | { type: "trace"; letter: Letter };

export const initialState = (): LetterState => ({ selected: "m", traced: [] });

export function reduce(state: LetterState, action: LetterAction): LetterState {
  if (!letters.includes(action.letter)) return state;
  if (action.type === "select") return { ...state, selected: action.letter };
  if (state.traced.includes(action.letter)) return state;
  return { ...state, traced: [...state.traced, action.letter] };
}

export const isComplete = (state: LetterState) =>
  letters.every((letter) => state.traced.includes(letter));
