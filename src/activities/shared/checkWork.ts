import { feedbackCopy as c } from "../../content/en/feedback";
import type { TowerState } from "../pink-tower/model";
import type { OrderedSequenceState } from "../ordered-sequence/model";
import type { ColorState } from "../color-tablets/model";
import { tablets } from "../color-tablets/model";
import type { CylinderState } from "../cylinder-blocks/model";
import type { PuzzleState } from "../shape-puzzle/model";
import type { DressingState } from "../dressing-frame/model";
import type { TransferState } from "../transferring/model";
import type { PourState } from "../pouring/model";
export const towerCheck = (s: TowerState) => {
  const mismatch = s.stack.findIndex((p, i) => p.size !== 10 - i);
  if (mismatch >= 0) return c.towerOrder(mismatch + 1);
  if (s.stack.some((p) => Math.abs(p.offset) > 8)) return c.towerAlignment;
  return s.stack.length ? c.towerContinue(s.stack.length) : c.towerStart;
};
export const sequenceCheck = (s: OrderedSequenceState) => {
  const mismatch = s.placed.findIndex((p, i) => p !== 10 - i);
  return mismatch >= 0
    ? c.sequenceOrder(mismatch + 1)
    : s.placed.length
      ? c.sequenceContinue(s.placed.length)
      : c.sequenceStart;
};
export const colorCheck = (s: ColorState) =>
  s.pairs.some(([a, b]) => tablets[a].color !== tablets[b].color)
    ? c.colorMismatch
    : c.colorContinue(s.pairs.length);
export const cylinderCheck = (s: CylinderState) =>
  s.attemptedSocket !== null
    ? c.fittingMismatch
    : s.seated.length < 10
      ? c.fittingReturn(10 - s.seated.length)
      : c.fittingLift(10 - s.lifted.length);
export const puzzleCheck = (s: PuzzleState) =>
  s.attempted !== null
    ? c.fittingMismatch
    : s.seated.length < 3
      ? c.fittingReturn(3 - s.seated.length)
      : c.fittingLift(3 - s.lifted.length);
export const dressingCheck = (s: DressingState) =>
  s.fabric === "separated"
    ? c.dressingJoin
    : !s.openedFabric
      ? s.closed.some(Boolean)
        ? c.dressingOpen
        : c.dressingSeparate
      : c.dressingClose(s.closed.filter((x) => !x).length);
export const transferCheck = (s: TransferState) =>
  c.transfer(s.bowls.filter((b) => b === "right").length);
export const pourCheck = (s: PourState) => {
  if (s.source === 0 && s.receiver === 0) return c.pourRetry;
  if (s.spilled > 0) return c.pourWipe;
  if (!s.poured && !s.held) return c.pourStart;
  if (s.tilt > 0 && !s.overCup) return c.pourPosition;
  if (s.source > 0) return c.pourContinue;
  if (s.tilt > 0) return c.pourUpright;
  return c.pourReturn;
};
