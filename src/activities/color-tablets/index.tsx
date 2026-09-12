import { colorCheck } from "../shared/checkWork";
import { lazy } from "react";
import type {
  ActivityDefinition,
  ActivityViewProps,
} from "../../domain/activity";
import { activityContent } from "../../content/en/activities";
import { initialState, reduce, isComplete, tablets } from "./model";
import type { ColorState, ColorAction } from "./model";
const copy = activityContent["color-tablets"];
function Tablet({ id }: { id: number }) {
  return (
    <span className="color-tablet">
      <span style={{ background: tablets[id].hex }} />
    </span>
  );
}
function View({
  state,
  dispatch,
  guidance,
}: ActivityViewProps<ColorState, ColorAction>) {
  return (
    <section>
      <p className="activity-instruction">{copy.instruction}</p>
      <div className="color-work work-surface">
        <div>
          <p className="surface-label">THE TABLETS</p>
          <div className="tablets-tray">
            {[0, 5, 1, 3, 2, 4]
              .filter((id) => !state.pairs.flat().includes(id))
              .map((id) => (
                <button
                  key={id}
                  className={`tablet-choice ${state.selected === id ? "selected" : ""}`}
                  aria-label={`Choose ${tablets[id].color} tablet ${id < 3 ? "one" : "two"}`}
                  aria-pressed={state.selected === id}
                  onClick={() => dispatch({ type: "choose", id })}
                >
                  <Tablet id={id} />
                </button>
              ))}
            {state.pairs.length === 3 && (
              <p className="tray-caption">All the tablets are on your mat.</p>
            )}
          </div>
        </div>
        <div>
          <p className="surface-label">YOUR PAIRS</p>
          <div className="color-pairs">
            {state.pairs.map(([a, b], index) => (
              <button
                key={`${a}-${b}`}
                className="tablet-pair"
                aria-label={`Separate ${tablets[a].color} and ${tablets[b].color} pair`}
                onClick={() => dispatch({ type: "separate", index })}
              >
                <Tablet id={a} />
                <Tablet id={b} />
              </button>
            ))}
            {Array.from({ length: 3 - state.pairs.length }, (_, i) => (
              <div key={i} className="pair-space" aria-hidden="true">
                <span />
                <span />
              </div>
            ))}
          </div>
        </div>
      </div>
      {guidance && <p className="gentle-note">{copy.guidance}</p>}
    </section>
  );
}
const definition: ActivityDefinition<ColorState, ColorAction> = {
  id: "color-tablets",
  version: 1,
  requiredAssets: [],
  demonstration: () =>
    import("../../content/demonstrations").then(
      (m) => m.demonstrations["color-tablets"],
    ),
  initialState,
  reduce,
  isComplete,
  checkWork: colorCheck,
  guidance: copy.guidance,
  View,
  View3D: lazy(() => import("./View3D")),
};
export default definition;
