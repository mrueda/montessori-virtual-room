import { checkerCopy as c } from "../../content/en/expansion";
export const problems = [
  [23, 12],
  [36, 24],
  [124, 23],
] as const;
export interface Bar {
  id: number;
  value: number;
}
export interface State {
  problem: number;
  cells: Bar[][];
  original: Bar[][] | null;
  selected: number;
  bar: number;
  nextId: number;
  answer: string;
}
export type Action =
  | { type: "problem"; index: number }
  | { type: "select"; index: number }
  | { type: "bar"; value: number }
  | { type: "add" }
  | { type: "remove" }
  | { type: "gather" }
  | { type: "separate" }
  | { type: "exchange" }
  | { type: "answer"; value: string };
export const initialState = (): State => ({
  problem: 0,
  cells: Array.from({ length: 36 }, () => []),
  original: null,
  selected: 0,
  bar: 1,
  nextId: 0,
  answer: "",
});
export const sum = (bars: Bar[]) => bars.reduce((n, b) => n + b.value, 0);
export const power = (index: number) => (index % 9) + Math.floor(index / 9);
export const digit = (n: number, p: number) => Math.floor(n / 10 ** p) % 10;
export const expected = (s: State, index: number) =>
  digit(problems[s.problem][0], index % 9) *
  digit(problems[s.problem][1], Math.floor(index / 9));
export const total = (cells: Bar[][]) =>
  cells.reduce((n, b, i) => n + sum(b) * 10 ** power(i), 0);
export const correctPartials = (s: State, cells: Bar[][]) =>
  cells.every((bars, i) => sum(bars) === expected(s, i));
export function reduce(s: State, a: Action): State {
  if (a.type === "problem")
    return Number.isInteger(a.index) && problems[a.index]
      ? { ...initialState(), problem: a.index }
      : s;
  if (a.type === "select")
    return Number.isInteger(a.index) && a.index >= 0 && a.index < 36
      ? { ...s, selected: a.index }
      : s;
  if (a.type === "bar")
    return Number.isInteger(a.value) && a.value >= 1 && a.value <= 9
      ? { ...s, bar: a.value }
      : s;
  if (a.type === "answer")
    return /^\d{0,9}$/.test(a.value) ? { ...s, answer: a.value } : s;
  if (a.type === "separate")
    return s.original
      ? { ...s, cells: s.original, original: null, answer: "" }
      : s;
  if (a.type === "gather") {
    if (s.original) return s;
    const cells: Bar[][] = Array.from({ length: 36 }, () => []);
    for (let i = 0; i < 36; i++) {
      if (power(i) > 8 && s.cells[i].length) return s;
      cells[power(i)]?.push(...s.cells[i]);
    }
    return { ...s, cells, original: s.cells, selected: 0, answer: "" };
  }
  const cells = s.cells.map((b) => [...b]);
  if (a.type === "add") {
    if (s.original || cells[s.selected].length >= 9) return s;
    cells[s.selected].push({ id: s.nextId, value: s.bar });
    return { ...s, cells, nextId: s.nextId + 1 };
  }
  if (a.type === "remove") {
    if (s.original || !cells[s.selected].length) return s;
    cells[s.selected].pop();
    return { ...s, cells };
  }
  if (a.type === "exchange") {
    if (!s.original || s.selected >= 8 || sum(cells[s.selected]) < 10) return s;
    const quantity = sum(cells[s.selected]);
    let nextId = s.nextId;
    cells[s.selected] =
      quantity % 10 ? [{ id: nextId++, value: quantity % 10 }] : [];
    for (let i = 0; i < Math.floor(quantity / 10); i++)
      cells[s.selected + 1].push({ id: nextId++, value: 1 });
    return { ...s, cells, nextId, answer: "" };
  }
  return s;
}
export const isComplete = (s: State) =>
  !!s.original &&
  correctPartials(s, s.original) &&
  s.cells.slice(0, 9).every((b) => sum(b) < 10) &&
  s.answer !== "" &&
  Number(s.answer) === problems[s.problem][0] * problems[s.problem][1];
export function checkWork(s: State) {
  const source = s.original ?? s.cells;
  const mismatch = source.findIndex((b, i) => sum(b) !== expected(s, i));
  if (mismatch >= 0)
    return s.original
      ? c.separateCheck
      : c.partialCheck(
          sum(source[mismatch]),
          digit(problems[s.problem][0], mismatch % 9),
          digit(problems[s.problem][1], Math.floor(mismatch / 9)),
          10 ** power(mismatch),
        );
  if (!s.original) return c.gatherCheck;
  if (s.cells.some((b) => sum(b) >= 10)) return c.exchangeCheck;
  return isComplete(s) ? c.completeCheck : c.answerCheck;
}
