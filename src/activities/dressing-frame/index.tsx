import { dressingCheck } from "../shared/checkWork";
import { lazy } from "react";
import type {
  ActivityDefinition,
  ActivityViewProps,
} from "../../domain/activity";
import { activityContent } from "../../content/en/activities";
import { initialState, reduce, isComplete } from "./model";
import type { DressingState, DressingAction } from "./model";
const copy = activityContent["dressing-frame"];
function View({
  state,
  dispatch,
  guidance,
}: ActivityViewProps<DressingState, DressingAction>) {
  return (
    <section>
      <p className="activity-instruction">{copy.instruction}</p>
      <div className="dressing-work work-surface">
        <p className="surface-label">THE BUTTON FRAME</p>
        <div
          className={`button-frame ${state.fabric === "separated" ? "fabric-open" : ""}`}
        >
          <div className="fabric-half fabric-left" />
          <div className="fabric-half fabric-right" />
          <div className="frame-buttons">
            {state.closed.map((closed, index) => (
              <button
                key={index}
                className={`frame-button ${closed ? "fastened" : "unfastened"}`}
                aria-label={`${closed ? "Open" : "Close"} button ${index + 1}`}
                aria-pressed={closed}
                disabled={state.fabric === "separated"}
                onClick={() => dispatch({ type: "toggle-button", index })}
              >
                <span className="buttonhole" />
                <span className="sewing-button">
                  <i />
                  <i />
                  <i />
                  <i />
                </span>
                <span className="thread-line" />
              </button>
            ))}
          </div>
        </div>
        <button
          className="secondary-button fabric-action"
          disabled={state.fabric === "joined" && state.closed.some(Boolean)}
          onClick={() =>
            dispatch({ type: state.fabric === "joined" ? "separate" : "join" })
          }
        >
          {state.fabric === "joined"
            ? "Separate the fabric"
            : "Bring the fabric together"}
        </button>
        <p className="fit-observation" aria-live="polite">
          {state.fabric === "separated"
            ? "The frame is open. Bring the fabric together when you are ready."
            : state.closed.some(Boolean)
              ? "Touch a button to move it through the buttonhole."
              : "The buttons are open. You can now separate the fabric."}
        </p>
      </div>
      {guidance && <p className="gentle-note">{copy.guidance}</p>}
    </section>
  );
}
const definition: ActivityDefinition<DressingState, DressingAction> = {
  id: "dressing-frame",
  version: 1,
  requiredAssets: [],
  demonstration: () =>
    import("../../content/demonstrations").then(
      (m) => m.demonstrations["dressing-frame"],
    ),
  initialState,
  reduce,
  isComplete,
  checkWork: dressingCheck,
  guidance: copy.guidance,
  View,
  View3D: lazy(() => import("./View3D")),
};
export default definition;
