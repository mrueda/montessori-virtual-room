import { puzzleCheck } from "../shared/checkWork";
import { lazy } from "react";
import type {
  ActivityDefinition,
  ActivityViewProps,
} from "../../domain/activity";
import type { PuzzleState, PuzzleAction, PuzzleShape } from "./model";
import { initialState, reduce, isComplete, shapes } from "./model";
import { activityContent } from "../../content/en/activities";
const copy = activityContent["shape-puzzle"];
function Piece({
  shape,
  hole = false,
}: {
  shape: PuzzleShape;
  hole?: boolean;
}) {
  return (
    <svg viewBox="0 0 110 110" aria-hidden="true" className="puzzle-piece">
      <g
        fill={hole ? "#ad8a56" : "#d7b278"}
        stroke={hole ? "#9d7c49" : "#bc955d"}
        strokeWidth="2"
      >
        {shape === "circle" ? (
          <circle cx="55" cy="55" r="39" />
        ) : shape === "square" ? (
          <rect x="18" y="18" width="74" height="74" rx="2" />
        ) : (
          <path d="M55 10L100 93H10Z" />
        )}
      </g>
      {!hole && <circle cx="55" cy="58" r="7" fill="#aa7e45" />}
    </svg>
  );
}
export function PuzzleControls({
  state,
  dispatch,
}: {
  state: PuzzleState;
  dispatch: (a: PuzzleAction) => void;
}) {
  return (
    <div className="spatial-controls">
      <div className="compact-choices">
        {shapes.map((shape) => (
          <span key={shape} className="socket-control">
            {state.seated.includes(shape) ? (
              <button
                className="material-choice"
                onClick={() => dispatch({ type: "lift", shape })}
              >
                Lift {shape}
              </button>
            ) : (
              <>
                <button
                  className="material-choice"
                  aria-pressed={state.selected === shape}
                  onClick={() => dispatch({ type: "select", shape })}
                >
                  Select {shape}
                </button>
                <button
                  className="material-choice"
                  disabled={state.selected === null}
                  onClick={() => dispatch({ type: "fit", shape })}
                >
                  Try {shape} opening
                </button>
              </>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
function View({
  state,
  dispatch,
  guidance,
}: ActivityViewProps<PuzzleState, PuzzleAction>) {
  return (
    <section>
      <p className="activity-instruction">{copy.instruction}</p>
      <div className="puzzle-work work-surface">
        <div className="puzzle-board">
          {shapes.map((shape) => (
            <button
              key={shape}
              className="puzzle-slot"
              aria-label={
                state.seated.includes(shape)
                  ? `Lift ${shape}`
                  : `Try ${shape} opening`
              }
              disabled={
                !state.seated.includes(shape) && state.selected === null
              }
              onClick={() =>
                dispatch({
                  type: state.seated.includes(shape) ? "lift" : "fit",
                  shape,
                })
              }
            >
              <Piece shape={shape} hole={!state.seated.includes(shape)} />
              {state.attempted === shape && state.selected && (
                <span className="puzzle-attempt">
                  <Piece shape={state.selected} />
                </span>
              )}
            </button>
          ))}
        </div>
        <p className="fit-observation" aria-live="polite">
          {state.attempted
            ? "The outlines are different. Compare another opening."
            : "Look at the shapes and the spaces they leave."}
        </p>
        <div className="puzzle-tray">
          {shapes
            .filter((shape) => !state.seated.includes(shape))
            .map((shape) => (
              <button
                key={shape}
                className="puzzle-choice"
                aria-label={`Select ${shape}`}
                aria-pressed={state.selected === shape}
                onClick={() => dispatch({ type: "select", shape })}
              >
                <Piece shape={shape} />
              </button>
            ))}
        </div>
      </div>
      {guidance && <p className="gentle-note">{copy.guidance}</p>}
    </section>
  );
}
const definition: ActivityDefinition<PuzzleState, PuzzleAction> = {
  id: "shape-puzzle",
  version: 1,
  requiredAssets: [],
  demonstration: () =>
    import("../../content/demonstrations").then(
      (m) => m.demonstrations["shape-puzzle"],
    ),
  initialState,
  reduce,
  isComplete,
  checkWork: puzzleCheck,
  guidance: copy.guidance,
  View,
  View3D: lazy(() => import("./View3D")),
};
export default definition;
