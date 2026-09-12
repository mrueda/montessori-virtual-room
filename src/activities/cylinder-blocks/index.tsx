import { cylinderCheck } from "../shared/checkWork";
import { lazy } from "react";
import type {
  ActivityDefinition,
  ActivityViewProps,
} from "../../domain/activity";
import { activityContent } from "../../content/en/activities";
import { initialState, reduce, isComplete, sizes } from "./model";
import type { CylinderState, CylinderAction } from "./model";
const copy = activityContent["cylinder-blocks"];
function Cylinder({ size }: { size: number }) {
  return (
    <span
      className="wood-cylinder"
      style={{ width: 22 + size * 4, height: 22 + size * 4 }}
    >
      <span className="cylinder-knob" />
    </span>
  );
}
function View({
  state,
  dispatch,
  guidance,
}: ActivityViewProps<CylinderState, CylinderAction>) {
  return (
    <section className="cylinder-work">
      <p className="activity-instruction">{copy.instruction}</p>
      <div className="work-surface">
        <p className="surface-label">
          THE CYLINDER BLOCK · LIFT A KNOB TO BEGIN
        </p>
        <div className="cylinder-block">
          {sizes.map((size) => {
            const seated = state.seated.includes(size),
              attempt = state.attemptedSocket === size;
            return (
              <button
                key={size}
                className={`cylinder-socket ${attempt ? "attempted" : ""}`}
                aria-label={
                  seated
                    ? `Lift cylinder ${size}`
                    : `Try socket ${size}, width ${size} of 10`
                }
                onClick={() =>
                  dispatch(
                    seated
                      ? { type: "lift", size }
                      : { type: "fit", socket: size },
                  )
                }
                disabled={!seated && state.selected === null}
              >
                <span
                  className="socket-hole"
                  style={{ width: 22 + size * 4, height: 22 + size * 4 }}
                />
                {seated ? (
                  <Cylinder size={size} />
                ) : attempt && state.selected !== null ? (
                  <span className="hovering-cylinder">
                    <Cylinder size={state.selected} />
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
        <p className="fit-observation" aria-live="polite">
          {state.attemptedSocket !== null && state.selected !== null
            ? state.selected > state.attemptedSocket
              ? "The cylinder rests above the opening. Compare the widths."
              : "There is space around the cylinder. Compare another opening."
            : "Look at the changing widths, from one end to the other."}
        </p>
        <p className="surface-label">YOUR TRAY · CHOOSE A CYLINDER TO RETURN</p>
        <div className="cylinder-tray">
          {[6, 2, 9, 4, 7, 1, 10, 5, 8, 3]
            .filter((n) => !state.seated.includes(n))
            .map((size) => (
              <button
                key={size}
                className={`loose-cylinder ${state.selected === size ? "selected" : ""}`}
                aria-label={`Select cylinder ${size}`}
                aria-pressed={state.selected === size}
                onClick={() => dispatch({ type: "select", size })}
              >
                <Cylinder size={size} />
              </button>
            ))}
          {state.seated.length === 10 && (
            <p className="tray-caption">The cylinders are in the block.</p>
          )}
        </div>
      </div>
      {guidance && <p className="gentle-note">{copy.guidance}</p>}
    </section>
  );
}
const definition: ActivityDefinition<CylinderState, CylinderAction> = {
  id: "cylinder-blocks",
  version: 1,
  requiredAssets: [],
  demonstration: () =>
    import("../../content/demonstrations").then(
      (m) => m.demonstrations["cylinder-blocks"],
    ),
  initialState,
  reduce,
  isComplete,
  checkWork: cylinderCheck,
  guidance: copy.guidance,
  View,
  View3D: lazy(() => import("./View3D")),
};
export default definition;
