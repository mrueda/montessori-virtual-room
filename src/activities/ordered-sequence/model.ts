export const sequenceSizes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;
export type SequenceSize = (typeof sequenceSizes)[number];

export interface OrderedSequenceState {
  loose: SequenceSize[];
  placed: SequenceSize[];
  selected: SequenceSize | null;
}

export type OrderedSequenceAction =
  | { type: "select"; size: SequenceSize }
  | { type: "place" }
  | { type: "return"; size: SequenceSize };

const initialOrder: SequenceSize[] = [4, 9, 2, 7, 1, 10, 5, 8, 3, 6];
const targetOrder: SequenceSize[] = [...sequenceSizes].reverse();

export const initialState = (): OrderedSequenceState => ({
  loose: [...initialOrder],
  placed: [],
  selected: null,
});

export function reduce(
  state: OrderedSequenceState,
  action: OrderedSequenceAction,
): OrderedSequenceState {
  if (action.type === "select") {
    if (!state.loose.includes(action.size)) return state;
    return {
      ...state,
      selected: state.selected === action.size ? null : action.size,
    };
  }

  if (action.type === "place") {
    if (state.selected === null) return state;
    return {
      loose: state.loose.filter((size) => size !== state.selected),
      placed: [...state.placed, state.selected],
      selected: null,
    };
  }

  if (!state.placed.includes(action.size)) return state;
  return {
    loose: [...state.loose, action.size],
    placed: state.placed.filter((size) => size !== action.size),
    selected: action.size,
  };
}

export const isComplete = (state: OrderedSequenceState) =>
  state.placed.length === targetOrder.length &&
  state.placed.every((size, index) => size === targetOrder[index]);
