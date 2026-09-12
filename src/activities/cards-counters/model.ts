import { feedbackCopy as c } from "../../content/en/feedback";
export interface State {
  cards: (number | null)[];
  selected: number | null;
  counters: boolean[][];
}
export type Action =
  | { type: "select"; value: number }
  | { type: "card"; column: number }
  | { type: "counter"; column: number; slot: number };
export const initialState = (): State => ({
  cards: Array(10).fill(null),
  selected: null,
  counters: Array.from({ length: 10 }, () => Array(15).fill(false)),
});
export const remaining = (s: State) =>
  55 - s.counters.flat().filter(Boolean).length;
export function reduce(s: State, a: Action): State {
  if (a.type === "select")
    return Number.isInteger(a.value) &&
      a.value >= 1 &&
      a.value <= 10 &&
      !s.cards.includes(a.value)
      ? { ...s, selected: a.value }
      : s;
  if (!Number.isInteger(a.column) || a.column < 0 || a.column >= 10) return s;
  if (a.type === "card") {
    const cards = [...s.cards];
    cards[a.column] = s.selected;
    return { ...s, cards, selected: s.cards[a.column] };
  }
  if (
    !s.cards[a.column] ||
    !Number.isInteger(a.slot) ||
    a.slot < 0 ||
    a.slot >= 15
  )
    return s;
  const used = s.counters[a.column][a.slot];
  if (!used && remaining(s) === 0) return s;
  return {
    ...s,
    counters: s.counters.map((row, i) =>
      i === a.column ? row.map((x, j) => (j === a.slot ? !x : x)) : row,
    ),
  };
}
export const expectedSlots = (n: number) =>
  Array.from({ length: Math.floor(n / 2) }, (_, i) => [i * 3, i * 3 + 2])
    .flat()
    .concat(n % 2 ? [Math.floor(n / 2) * 3 + 1] : []);
export const isComplete = (s: State) =>
  s.cards.every(
    (n, i) =>
      n === i + 1 &&
      s.counters[i].every((v, j) => v === expectedSlots(n).includes(j)),
  );

export function checkWork(s: State) {
  if (s.cards.some((n, i) => n !== i + 1)) return c.countersCards;
  for (let i = 0; i < 10; i++) {
    const count = s.counters[i].filter(Boolean).length;
    if (count !== i + 1) return c.countersQuantity(i + 1, count);
  }
  const i = s.counters.findIndex((row, i) =>
    row.some((v, j) => v !== expectedSlots(i + 1).includes(j)),
  );
  return c.countersPairs(i + 1);
}
