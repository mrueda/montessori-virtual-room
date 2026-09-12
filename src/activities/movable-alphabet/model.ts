import { alphabetCopy as copy, wordPrompts } from "../../content/en/expansion";
export const letters = "abcdefghijklmnopqrstuvwxyz".split("");
export const capacity = (letter: string) => ("aeiou".includes(letter) ? 10 : 5);
export interface State {
  slots: (string | null)[];
  selected: string | null;
  from: number | null;
  prompt: number;
  used: boolean;
}
export type Action =
  | { type: "choose"; letter: string }
  | { type: "slot"; index: number }
  | { type: "return" }
  | { type: "prompt"; index: number };
export const initialState = (): State => ({
  slots: Array(36).fill(null),
  selected: null,
  from: null,
  prompt: -1,
  used: false,
});
export const remaining = (s: State, letter: string) =>
  capacity(letter) - s.slots.filter((v) => v === letter).length;
export function reduce(s: State, a: Action): State {
  if (a.type === "prompt")
    return Number.isInteger(a.index) &&
      a.index >= -1 &&
      a.index < wordPrompts.length
      ? { ...s, prompt: a.index }
      : s;
  if (a.type === "choose")
    return letters.includes(a.letter) && remaining(s, a.letter) > 0
      ? { ...s, selected: a.letter, from: null }
      : s;
  if (a.type === "return") {
    if (s.from === null) return { ...s, selected: null };
    const slots = [...s.slots];
    slots[s.from] = null;
    return { ...s, slots, selected: null, from: null };
  }
  if (!Number.isInteger(a.index) || a.index < 0 || a.index >= s.slots.length)
    return s;
  if (!s.selected)
    return s.slots[a.index]
      ? { ...s, selected: s.slots[a.index], from: a.index }
      : s;
  if (s.slots[a.index])
    return { ...s, selected: s.slots[a.index], from: a.index };
  const slots = [...s.slots];
  if (s.from !== null) slots[s.from] = null;
  slots[a.index] = s.selected;
  return { ...s, slots, selected: null, from: null, used: true };
}
export const isComplete = (s: State) =>
  s.used && s.slots.every((v) => v === null) && s.selected === null;
export function checkWork(s: State) {
  if (isComplete(s)) return copy.restored;
  if (!s.slots.some(Boolean)) return copy.empty;
  if (s.prompt < 0) return copy.freeCheck;
  const words = Array.from({ length: 3 }, (_, row) =>
    s.slots
      .slice(row * 12, row * 12 + 12)
      .map((v) => v ?? " ")
      .join(""),
  )
    .join(" ")
    .trim()
    .split(/ +/);
  return words.includes(wordPrompts[s.prompt].word)
    ? copy.corresponds
    : copy.compare;
}
