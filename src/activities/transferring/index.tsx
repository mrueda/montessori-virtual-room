import { transferCheck } from "../shared/checkWork";
import { lazy } from "react";
import type {
  ActivityDefinition,
  ActivityViewProps,
} from "../../domain/activity";
import type { TransferState, TransferAction } from "./model";
import { initialState, reduce, isComplete } from "./model";
import { activityContent } from "../../content/en/activities";
const copy = activityContent.transferring;
export function TransferControls({
  state,
  dispatch,
}: {
  state: TransferState;
  dispatch: (a: TransferAction) => void;
}) {
  return (
    <div className="spatial-controls">
      <div className="compact-choices">
        {state.bowls.map((b, id) => (
          <button
            key={id}
            className="material-choice"
            aria-pressed={state.selected === id}
            onClick={() => dispatch({ type: "select", id })}
          >
            Object {id + 1} · {b}
          </button>
        ))}
      </div>
      <div className="spatial-actions">
        {(["left", "right"] as const).map((bowl) => (
          <button
            key={bowl}
            className="secondary-button"
            disabled={state.selected === null}
            onClick={() => dispatch({ type: "place", bowl })}
          >
            Place in {bowl} bowl
          </button>
        ))}
      </div>
    </div>
  );
}
function View({
  state,
  dispatch,
  guidance,
}: ActivityViewProps<TransferState, TransferAction>) {
  return (
    <section>
      <p className="activity-instruction">{copy.instruction}</p>
      <div className="transfer-work work-surface">
        {(["left", "right"] as const).map((bowl) => (
          <div key={bowl} className="transfer-bowl-group">
            <div className="transfer-bowl">
              <button
                className="bowl-target"
                disabled={state.selected === null}
                aria-label={`Place in ${bowl} bowl`}
                onClick={() => dispatch({ type: "place", bowl })}
              />
              <div className="bowl-objects">
                {state.bowls.map((b, id) =>
                  b === bowl ? (
                    <button
                      key={id}
                      className="transfer-object"
                      aria-label={`Select object ${id + 1}`}
                      aria-pressed={state.selected === id}
                      onClick={() => dispatch({ type: "select", id })}
                    >
                      <span />
                    </button>
                  ) : null,
                )}
              </div>
            </div>
            <p className="surface-label">
              {bowl === "left" ? "THE FIRST BOWL" : "THE OTHER BOWL"}
            </p>
          </div>
        ))}
      </div>
      <p className="fit-observation" aria-live="polite">
        {state.selected === null
          ? "Choose one object to begin."
          : "An object is selected. Touch the open space in either bowl to release it."}
      </p>
      {guidance && <p className="gentle-note">{copy.guidance}</p>}
    </section>
  );
}
const definition: ActivityDefinition<TransferState, TransferAction> = {
  id: "transferring",
  version: 1,
  requiredAssets: [],
  demonstration: () =>
    import("../../content/demonstrations").then(
      (m) => m.demonstrations["transferring"],
    ),
  initialState,
  reduce,
  isComplete,
  checkWork: transferCheck,
  guidance: copy.guidance,
  View,
  View3D: lazy(() => import("./View3D")),
};
export default definition;
