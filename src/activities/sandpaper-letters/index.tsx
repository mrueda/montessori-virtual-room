import { lazy } from "react";
import type {
  ActivityDefinition,
  ActivityViewProps,
} from "../../domain/activity";
import { activityContent } from "../../content/en/activities";
import LetterChooser from "./LetterChooser";
import TracePad from "./TracePad";
import { initialState, isComplete, reduce } from "./model";
import type { LetterAction, LetterState } from "./model";

const copy = activityContent["sandpaper-letters"];

function View({
  state,
  dispatch,
  guidance,
}: ActivityViewProps<LetterState, LetterAction>) {
  return (
    <section>
      <p className="activity-instruction">{copy.instruction}</p>
      <div className="sandpaper-letter-work work-surface">
        <LetterChooser state={state} dispatch={dispatch} />
        <TracePad state={state} dispatch={dispatch} />
      </div>
      {guidance && <p className="gentle-note">{copy.guidance}</p>}
    </section>
  );
}

const definition: ActivityDefinition<LetterState, LetterAction> = {
  id: "sandpaper-letters",
  version: 1,
  requiredAssets: [],
  demonstration: () =>
    import("../../content/demonstrations").then(
      (module) => module.demonstrations["sandpaper-letters"],
    ),
  initialState,
  reduce,
  isComplete,
  guidance: copy.guidance,
  View,
  View3D: lazy(() => import("./View3D")),
};

export default definition;
