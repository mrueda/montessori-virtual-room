export const shapes = ["circle", "square", "triangle"] as const;
export type PuzzleShape = (typeof shapes)[number];
export interface PuzzleState {
  seated: PuzzleShape[];
  lifted: PuzzleShape[];
  selected: PuzzleShape | null;
  attempted: PuzzleShape | null;
}
export type PuzzleAction =
  | { type: "lift"; shape: PuzzleShape }
  | { type: "select"; shape: PuzzleShape }
  | { type: "fit"; shape: PuzzleShape };
export const initialState = (): PuzzleState => ({
  seated: [...shapes],
  lifted: [],
  selected: null,
  attempted: null,
});
export function reduce(s: PuzzleState, a: PuzzleAction): PuzzleState {
  if (!shapes.includes(a.shape)) return s;
  if (a.type === "lift")
    return s.seated.includes(a.shape)
      ? {
          ...s,
          seated: s.seated.filter((v) => v !== a.shape),
          lifted: [...new Set([...s.lifted, a.shape])],
          selected: null,
          attempted: null,
        }
      : s;
  if (a.type === "select")
    return !s.seated.includes(a.shape)
      ? { ...s, selected: a.shape, attempted: null }
      : s;
  if (s.selected === null || s.seated.includes(a.shape)) return s;
  return s.selected === a.shape
    ? { ...s, seated: [...s.seated, a.shape], selected: null, attempted: null }
    : { ...s, attempted: a.shape };
}
export const isComplete = (s: PuzzleState) =>
  s.seated.length === 3 && s.lifted.length === 3;
