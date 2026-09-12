import { feedbackCopy as c } from "../../content/en/feedback";
export const values = [1000, 100, 10, 1] as const;
export const problems = [
  [1234, 2123],
  [1286, 1457],
  [1768, 2256],
] as const;
export type Counts = [number, number, number, number];
export interface State {
  problem: number;
  rows: [Counts, Counts];
  merged: boolean;
  result: Counts;
  answer: string;
}
export type Action =
  | { type: "add" | "remove"; row: 0 | 1; column: number }
  | { type: "merge" }
  | { type: "separate" }
  | { type: "exchange"; column: number }
  | { type: "answer"; value: string }
  | { type: "problem"; index: number };
export const initialState = (): State => ({
  problem: 0,
  rows: [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  merged: false,
  result: [0, 0, 0, 0],
  answer: "",
});
export const total = (row: Counts) =>
  row.reduce((sum, n, i) => sum + n * values[i], 0);
export function reduce(s: State, a: Action): State {
  if (a.type === "problem")
    return Number.isInteger(a.index) && problems[a.index]
      ? { ...initialState(), problem: a.index }
      : s;
  if (a.type === "answer")
    return /^\d{0,4}$/.test(a.value) ? { ...s, answer: a.value } : s;
  if (a.type === "separate")
    return { ...s, merged: false, result: [0, 0, 0, 0], answer: "" };
  if (a.type === "merge")
    return s.merged
      ? s
      : {
          ...s,
          merged: true,
          result: values.map((_, i) => s.rows[0][i] + s.rows[1][i]) as Counts,
          answer: "",
        };
  if (!Number.isInteger(a.column) || a.column < 0 || a.column > 3) return s;
  if (a.type === "exchange") {
    if (!s.merged || a.column === 0 || s.result[a.column] < 10) return s;
    const result = [...s.result] as Counts;
    result[a.column] -= 10;
    result[a.column - 1]++;
    return { ...s, result, answer: "" };
  }
  if (s.merged || (a.row !== 0 && a.row !== 1)) return s;
  const count = s.rows[a.row][a.column] + (a.type === "add" ? 1 : -1);
  if (count < 0 || count > 9) return s;
  const rows = s.rows.map((r, i) =>
    i === a.row ? r.map((n, j) => (j === a.column ? count : n)) : r,
  ) as [Counts, Counts];
  return { ...s, rows };
}
export const isComplete = (s: State) =>
  s.merged &&
  s.rows.every((r, i) => total(r) === problems[s.problem][i]) &&
  s.result.every((n) => n < 10) &&
  s.answer !== "" &&
  Number(s.answer) === total(s.result);

export function checkWork(s: State) {
  for (let row = 0; row < 2; row++)
    if (total(s.rows[row]) !== problems[s.problem][row])
      return c.stampAddend(
        row + 1,
        total(s.rows[row]),
        problems[s.problem][row],
      );
  if (!s.merged) return c.stampCombine;
  if (s.result.some((n) => n >= 10)) return c.stampExchange;
  return s.answer === "" ? c.stampRecord : c.stampAnswer;
}
