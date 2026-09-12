import type { Demonstration } from "./demonstration";
import type { ComponentType } from "react";
export type ProgressEvent = {
  type: "started" | "reset" | "completed";
  activityId: string;
  version: number;
  timestamp: string;
};
export interface ActivityViewProps<S, A> {
  state: S;
  dispatch: (action: A) => void;
  guidance: boolean;
}
/** Each module owns its state and actions; the host owns lifecycle and progress. */
export interface ActivityDefinition<S, A> {
  id: string;
  version: number;
  requiredAssets: string[];
  /** Optional movement example, replayed separately from the learner state. */
  example?: () => { caption: string; state: S }[];
  demonstration?: () => Promise<Demonstration>;
  initialState: () => S;
  reduce: (state: S, action: A) => S;
  isComplete: (state: S) => boolean;
  guidance: string;
  /** Optional observation of unfinished work, requested by the learner. */
  checkWork?: (state: S) => string;
  View: ComponentType<ActivityViewProps<S, A>>;
  /** Optional lazy 3D renderer; shares exactly the same state and actions. */
  View3D?: ComponentType<ActivityViewProps<S, A>>;
}
