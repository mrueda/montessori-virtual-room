import { pourCheck } from "../shared/checkWork";
import PourControls from "./PourControls";
import usePouring from "./usePouring";
import { lazy } from "react";
import { useId } from "react";
import type {
  ActivityDefinition,
  ActivityViewProps,
} from "../../domain/activity";
import { activityContent } from "../../content/en/activities";
import { initialState, reduce, isComplete } from "./model";
import type { PourState, PourAction } from "./model";
const copy = activityContent.pouring;
function View({
  state,
  dispatch,
  guidance,
}: ActivityViewProps<PourState, PourAction>) {
  const clip = useId().replaceAll(":", "");
  usePouring(dispatch);
  const flowing = state.held && state.tilt > 25 && state.source > 0;
  return (
    <section>
      <p className="activity-instruction">{copy.instruction}</p>
      <div className="pour-work work-surface">
        <div className="pour-illustration">
          <svg
            viewBox="0 0 650 330"
            role="img"
            aria-label={`Pitcher ${Math.round(state.source)} percent full. Cup ${Math.round(state.receiver)} percent full.${state.spilled > 0 ? " Water is on the tray." : ""}`}
          >
            <defs>
              <clipPath id={`${clip}-pitcher`}>
                <path d="M28 35H120L104 170Q70 186 44 170Z" />
              </clipPath>
              <clipPath id={`${clip}-cup`}>
                <path d="M425 177H517L507 280Q470 296 435 280Z" />
              </clipPath>
            </defs>
            <ellipse
              cx="325"
              cy="297"
              rx="275"
              ry="19"
              fill="#000"
              opacity=".035"
            />
            <path d="M67 262H569L598 304H39Z" fill="#cfb58b" />
            <path d="M39 304H598V314H39Z" fill="#baa079" />
            <path d="M69 270H565L582 297H55Z" fill="#e1cca9" />
            {state.spilled > 0 && (
              <ellipse
                cx="265"
                cy="289"
                rx={25 + state.spilled * 0.7}
                ry="8"
                fill="#9abdc2"
                opacity=".7"
              />
            )}
            <path
              d="M425 177H517L507 280Q470 296 435 280Z"
              fill="#e3e7df"
              stroke="#a3b0a2"
              strokeWidth="3"
            />
            <g clipPath={`url(#${clip}-cup)`}>
              <rect
                x="425"
                y={290 - state.receiver * 1.05}
                width="94"
                height="120"
                fill="#91b7bd"
                opacity=".8"
              />
            </g>
            <path
              d="M517 192C566 177 558 255 513 247"
              fill="none"
              stroke="#a3b0a2"
              strokeWidth="10"
            />
            <ellipse cx="471" cy="177" rx="46" ry="9" fill="#d1d9cc" />
            {flowing && (
              <path
                d={
                  state.overCup
                    ? "M456 123Q483 142 469 193"
                    : "M285 164Q316 213 299 287"
                }
                fill="none"
                stroke="#91b7bd"
                strokeWidth={3 + (state.tilt - 25) / 9}
                opacity=".8"
                strokeLinecap="round"
              />
            )}
            <g
              className="pour-pitcher"
              transform={`translate(${state.overCup ? 327 : 155} ${state.held ? 18 : 105})`}
            >
              <g transform={`rotate(${state.tilt * 0.7} 120 35)`}>
                <path
                  d="M28 35H120L104 170Q70 186 44 170Z"
                  fill="#f3efe2"
                  stroke="#b8b5a3"
                  strokeWidth="3"
                />
                <g clipPath={`url(#${clip}-pitcher)`}>
                  <rect
                    x="26"
                    y={182 - state.source * 1.32}
                    width="95"
                    height="160"
                    fill="#91b7bd"
                    opacity=".75"
                  />
                </g>
                <path
                  d="M30 55C-18 37 -15 136 39 126"
                  fill="none"
                  stroke="#c5c0ac"
                  strokeWidth="11"
                />
                <path
                  d="M27 35Q67 23 105 32L137 25L120 47"
                  fill="#eeeadd"
                  stroke="#b8b5a3"
                  strokeWidth="3"
                />
                <path
                  d="M37 38Q70 29 107 37"
                  fill="none"
                  stroke="#8ba9aa"
                  strokeWidth="6"
                />
              </g>
            </g>
          </svg>
          <div className="water-levels">
            <span>
              Pitcher <strong>{Math.round(state.source)}%</strong>
            </span>
            <span>
              Cup <strong>{Math.round(state.receiver)}%</strong>
            </span>
          </div>
        </div>
        <PourControls state={state} dispatch={dispatch} />
      </div>
      {guidance && <p className="gentle-note">{copy.guidance}</p>}
    </section>
  );
}
const definition: ActivityDefinition<PourState, PourAction> = {
  id: "pouring",
  version: 1,
  requiredAssets: [],
  demonstration: () =>
    import("../../content/demonstrations").then(
      (m) => m.demonstrations["pouring"],
    ),
  initialState,
  reduce,
  isComplete,
  checkWork: pourCheck,
  guidance: copy.guidance,
  View,
  View3D: lazy(() => import("./View3D")),
};
export default definition;
