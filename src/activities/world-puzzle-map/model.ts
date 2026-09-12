import { feedbackCopy as c } from "../../content/en/feedback";
import continents from "../../content/geography/continents.json";
export { continents };
export interface Piece {
  x: number;
  y: number;
  home: boolean;
  lifted: boolean;
}
export interface State {
  pieces: Piece[];
  selected: number | null;
}
export type Action =
  | { type: "lift"; index: number }
  | { type: "select"; index: number }
  | { type: "move"; index: number; x: number; y: number; settle?: boolean }
  | { type: "try"; socket: number };
export const initialState = (): State => ({
  pieces: continents.map(() => ({ x: 0, y: 0, home: true, lifted: false })),
  selected: null,
});
export function reduce(s: State, a: Action): State {
  if (a.type === "try") {
    if (
      s.selected === null ||
      !Number.isInteger(a.socket) ||
      !continents[a.socket]
    )
      return s;
    const target = continents[a.socket].knob,
      own = continents[s.selected].knob;
    return reduce(s, {
      type: "move",
      index: s.selected,
      x: target[0] - own[0],
      y: target[1] - own[1],
      settle: true,
    });
  }
  if (!Number.isInteger(a.index) || !s.pieces[a.index]) return s;
  if (a.type === "select") return { ...s, selected: a.index };
  const old = s.pieces[a.index];
  let piece: Piece;
  if (a.type === "lift")
    piece = {
      x: ((a.index % 3) - 1) * 16,
      y: 310 + (a.index % 2) * 15,
      home: false,
      lifted: true,
    };
  else {
    if (!Number.isFinite(a.x) || !Number.isFinite(a.y)) return s;
    const [kx, ky] = continents[a.index].knob;
    const x = Math.max(25 - kx, Math.min(775 - kx, a.x)),
      y = Math.max(25 - ky, Math.min(735 - ky, a.y));
    piece = { ...old, x, y, home: false, lifted: true };
    if (a.settle && Math.hypot(x, y) < 18)
      piece = { ...piece, x: 0, y: 0, home: true };
  }
  return {
    ...s,
    selected: a.index,
    pieces: s.pieces.map((p, i) => (i === a.index ? piece : p)),
  };
}
export const isComplete = (s: State) =>
  s.pieces.every((p) => p.home && p.lifted);

export const checkWork = (s: State) =>
  s.pieces.some((p) => !p.home)
    ? c.mapLoose(s.pieces.filter((p) => !p.home).length)
    : c.mapLift(s.pieces.filter((p) => !p.lifted).length);
