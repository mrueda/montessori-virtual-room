import { lazy } from "react";
import type {
  ActivityDefinition,
  ActivityViewProps,
} from "../../domain/activity";
import {
  formsCopy as c,
  formPairs,
  expansionActivityContent,
} from "../../content/en/expansion";
import { outlines, svgPath, waterPoint } from "./geometry";
import { initialState, reduce, isComplete, checkWork } from "./model";
import type { State, Action } from "./model";
import Controls from "./Controls";
function View(props: ActivityViewProps<State, Action>) {
  const { state, dispatch } = props;
  return (
    <section className="elementary-work forms-work">
      <Controls {...props} />
      <div className="form-trays">
        {[0, 1].map((side) => (
          <div key={side} className="form-tray">
            <h2>{formPairs[state.pair].names[side]}</h2>
            <button
              className="tray-surface"
              aria-label={`Position pitcher over ${formPairs[state.pair].names[side]}`}
              disabled={!state.held || state.tilt !== 0}
              onClick={() => dispatch({ type: "target", side: side as 0 | 1 })}
            >
              <svg viewBox="-1.16 -1.16 2.32 2.32" aria-hidden="true">
                <rect
                  x="-1.12"
                  y="-1.12"
                  width="2.24"
                  height="2.24"
                  rx=".08"
                  fill="#ac8763"
                />
                <rect x="-1" y="-1" width="2" height="2" fill="#ded5be" />
                <path
                  d={svgPath(outlines(state.pair, side, true))}
                  fill="#6babbc"
                  fillRule="evenodd"
                  opacity={state.levels[side] / 35}
                />
                <path
                  d={svgPath(outlines(state.pair, side))}
                  fill="#a57f51"
                  fillRule="evenodd"
                  stroke="#87663e"
                  strokeWidth=".012"
                />
                {state.target === side && (
                  <g
                    className="form-pitcher"
                    transform={`translate(${waterPoint(state.pair, side)[0]} ${waterPoint(state.pair, side)[1] - 0.5}) rotate(${state.tilt}) scale(.4)`}
                  >
                    <path
                      d="M-.3 0H.3L.23-.9H-.4Z"
                      fill="#f4f0df"
                      stroke="#5c7665"
                      strokeWidth=".05"
                    />
                    <path
                      d="M-.4-.7Q-.8-.7-.5-.15"
                      fill="none"
                      stroke="#5c7665"
                      strokeWidth=".07"
                    />
                  </g>
                )}
                {state.target === side &&
                  state.tilt > 25 &&
                  state.source > 0 && (
                    <path
                      className="water-stream"
                      d={`M${waterPoint(state.pair, side)[0]} ${waterPoint(state.pair, side)[1] - 0.5}v.5`}
                      stroke="#76b9cc"
                      strokeWidth=".035"
                      fill="none"
                    />
                  )}
              </svg>
            </button>
            <p>
              {state.levels[side] === 0
                ? c.dry
                : state.levels[side] < 25
                  ? c.filling
                  : c.filled}
            </p>
          </div>
        ))}
      </div>
      <p className="form-observation">{formPairs[state.pair].observation}</p>
      <p className="work-caption">{c.limitation}</p>
    </section>
  );
}
const definition: ActivityDefinition<State, Action> = {
  id: "land-water-forms",
  version: 2,
  requiredAssets: [],
  initialState,
  reduce,
  isComplete,
  checkWork,
  guidance: expansionActivityContent["land-water-forms"].guidance,
  View,
  View3D: lazy(() => import("./View3D")),
  example: () => {
    let state = initialState();
    const steps = [{ caption: c.example[0], state }];
    state = reduce(state, { type: "pick" });
    steps.push({ caption: c.pickUp, state });
    for (const side of [0, 1] as const) {
      state = reduce(state, { type: "target", side });
      steps.push({ caption: `${c.over} ${formPairs[0].names[side]}`, state });
      state = reduce(state, { type: "tilt", value: 40 });
      steps.push({ caption: c.example[1], state });
      for (let n = 0; n < 14; n++) {
        state = reduce(state, { type: "tick" });
        if (n % 4 === 1) steps.push({ caption: c.example[2], state });
      }
      state = reduce(state, { type: "tilt", value: 0 });
      steps.push({ caption: c.stop, state });
    }
    state = reduce(state, { type: "return" });
    steps.push({ caption: formPairs[0].observation, state });
    return steps;
  },
};
export default definition;
