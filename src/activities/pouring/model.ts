export interface PourState {
  source: number;
  receiver: number;
  spilled: number;
  wiped: number;
  held: boolean;
  overCup: boolean;
  tilt: number;
  poured: boolean;
}
export type PourAction =
  | { type: "pick-up" }
  | { type: "position"; overCup: boolean }
  | { type: "tilt"; angle: number }
  | { type: "tick"; seconds: number }
  | { type: "return" }
  | { type: "wipe" };
export const initialState = (): PourState => ({
  source: 100,
  receiver: 0,
  spilled: 0,
  wiped: 0,
  held: false,
  overCup: false,
  tilt: 0,
  poured: false,
});
export function reduce(s: PourState, a: PourAction): PourState {
  if (a.type === "pick-up") return { ...s, held: true };
  if (a.type === "position")
    return s.held && s.tilt === 0 ? { ...s, overCup: a.overCup } : s;
  if (a.type === "tilt")
    return s.held && Number.isFinite(a.angle)
      ? { ...s, tilt: Math.max(0, Math.min(80, a.angle)) }
      : s;
  if (a.type === "return")
    return s.held && s.tilt === 0 ? { ...s, held: false, overCup: false } : s;
  if (a.type === "wipe")
    return !s.held ? { ...s, wiped: s.wiped + s.spilled, spilled: 0 } : s;
  if (
    !s.held ||
    s.tilt <= 25 ||
    s.source <= 0 ||
    !Number.isFinite(a.seconds) ||
    a.seconds <= 0
  )
    return s;
  const amount = Math.min(
    s.source,
    (s.tilt - 25) * 0.6 * Math.min(a.seconds, 0.25),
  );
  const received = s.overCup ? Math.min(amount, 100 - s.receiver) : 0;
  // Capacity subtraction can leave a sub-nanolitre floating-point residue.
  const overflow = Math.max(0, amount - received);
  return {
    ...s,
    source: Math.max(0, s.source - amount),
    receiver: s.receiver + received,
    spilled: s.spilled + (overflow < 1e-9 ? 0 : overflow),
    poured: true,
  };
}
export const isComplete = (s: PourState) =>
  s.poured &&
  s.source === 0 &&
  s.receiver > 0 &&
  s.spilled === 0 &&
  !s.held &&
  s.tilt === 0;
