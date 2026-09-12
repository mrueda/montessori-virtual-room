import { checkWork } from "./model";
import type {
  ActivityDefinition,
  ActivityViewProps,
} from "../../domain/activity";
import { activityContent } from "../../content/en/activities";
import { useSvgMove } from "../shared/useSvgMove";
import { initialState, reduce, isComplete, continents } from "./model";
import type { State, Action } from "./model";
const copy = activityContent["world-puzzle-map"];
function View({ state, dispatch, guidance }: ActivityViewProps<State, Action>) {
  const move = useSvgMove((index, x, y, settle) =>
    dispatch({ type: "move", index, x, y, settle }),
  );
  const order = state.pieces
    .map((_, i) => i)
    .sort(
      (a, b) => Number(a === state.selected) - Number(b === state.selected),
    );
  return (
    <section className="elementary-work">
      <p className="work-instruction">{copy.instruction}</p>
      {guidance && <p className="guidance-note">{copy.guidance}</p>}
      <svg
        ref={move.ref}
        viewBox="0 0 800 760"
        className={`geography-mat ${move.dragging ? "dragging" : ""}`}
        aria-label="World puzzle map with two hemispheres and a work mat"
      >
        <rect width="800" height="760" rx="12" fill="#e1deca" />
        <rect x="12" y="8" width="776" height="390" rx="14" fill="#c3a476" />
        {[205, 595].map((cx) => (
          <circle
            key={cx}
            cx={cx}
            cy="200"
            r="170"
            fill="#86b9cb"
            stroke="#a18d68"
            strokeWidth="2"
          />
        ))}
        {continents.map((c, i) => (
          <path
            key={c.id}
            d={c.path}
            fill="#d3c5a4"
            stroke="#92876e"
            strokeWidth="0.8"
            onClick={() => dispatch({ type: "try", socket: i })}
          />
        ))}
        {continents.map(
          (c, i) =>
            !state.pieces[i].home && (
              <g
                key={`outline-${c.id}`}
                onClick={() => dispatch({ type: "try", socket: i })}
              >
                <circle
                  cx={c.knob[0]}
                  cy={c.knob[1]}
                  r="14"
                  fill="#f4efdd"
                  stroke="#897d61"
                />
                <text
                  x={c.knob[0]}
                  y={c.knob[1] + 5}
                  textAnchor="middle"
                  fontSize="16"
                  fill="#374b38"
                >
                  {i + 1}
                </text>
              </g>
            ),
        )}
        <text x="400" y="435" textAnchor="middle" fill="#59654f" fontSize="18">
          Work mat · lift, compare, and replace
        </text>
        {order.map((i) => {
          const c = continents[i],
            p = state.pieces[i];
          return (
            <g
              key={c.id}
              transform={`translate(${p.x} ${p.y})`}
              className="movable-piece"
              role="button"
              tabIndex={0}
              aria-label={`${c.name}, ${p.home ? "in the map" : "on the mat"}`}
              aria-pressed={state.selected === i}
              {...move.bind(i, p.x, p.y, () =>
                dispatch({ type: p.home ? "lift" : "select", index: i }),
              )}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  dispatch({ type: p.home ? "lift" : "select", index: i });
                } else if (e.key.startsWith("Arrow")) {
                  e.preventDefault();
                  dispatch({
                    type: "move",
                    index: i,
                    x:
                      p.x +
                      (e.key === "ArrowRight"
                        ? 10
                        : e.key === "ArrowLeft"
                          ? -10
                          : 0),
                    y:
                      p.y +
                      (e.key === "ArrowDown"
                        ? 10
                        : e.key === "ArrowUp"
                          ? -10
                          : 0),
                    settle: true,
                  });
                }
              }}
            >
              <path
                d={c.path}
                fill={c.color}
                stroke={state.selected === i ? "#354b38" : "#786e54"}
                strokeWidth={state.selected === i ? 1.8 : 0.8}
              />
              <circle cx={c.knob[0]} cy={c.knob[1]} r="30" fill="transparent" />
              <circle
                cx={c.knob[0]}
                cy={c.knob[1]}
                r="7"
                fill="#dfc496"
                stroke="#8d734e"
                strokeWidth="1.5"
              />
            </g>
          );
        })}
      </svg>
      <div className="map-piece-controls" aria-label="Continent pieces">
        {continents.map((c, i) => (
          <button
            key={c.id}
            className="secondary-button"
            aria-pressed={state.selected === i}
            onClick={() =>
              dispatch({
                type: state.pieces[i].home ? "lift" : "select",
                index: i,
              })
            }
          >
            <i style={{ background: c.color }} />
            {state.pieces[i].home ? "Lift" : "Select"} {c.name}
          </button>
        ))}
      </div>
      {state.selected !== null && !state.pieces[state.selected].home && (
        <div className="work-controls" aria-label="Try a map outline">
          {continents.map((_, i) => (
            <button
              key={i}
              className="secondary-button"
              onClick={() => dispatch({ type: "try", socket: i })}
            >
              Try outline {i + 1}
            </button>
          ))}
        </div>
      )}
      <p className="work-caption">
        Drag the knobs, or select a piece and try an outline. Arrow keys move a
        focused piece. Lift and replace all seven continents.{" "}
        <span>
          Made with Natural Earth. Hemisphere-edge fragments move together; this
          is a digital adaptation.
        </span>
      </p>
      {guidance && (
        <ol className="map-outline-key">
          {continents.map((c) => (
            <li key={c.id}>{c.name}</li>
          ))}
        </ol>
      )}
    </section>
  );
}
const definition: ActivityDefinition<State, Action> = {
  id: "world-puzzle-map",
  version: 2,
  requiredAssets: [],
  initialState,
  reduce,
  isComplete,
  checkWork,
  guidance: copy.guidance,
  View,
  example: () => {
    let state = initialState();
    const steps = [
      {
        caption:
          "The continent shapes sit in matching outlines across two hemispheres.",
        state,
      },
    ];
    for (let i = 0; i < continents.length; i++) {
      state = reduce(state, { type: "lift", index: i });
      steps.push({
        caption: `Lift ${continents[i].name} by its knob and notice its outline.`,
        state,
      });
    }
    for (let i = 0; i < continents.length; i++) {
      state = reduce(state, {
        type: "move",
        index: i,
        x: 0,
        y: 0,
        settle: true,
      });
      steps.push({
        caption: `Return ${continents[i].name} to its matching outline.`,
        state,
      });
    }
    return steps;
  },
};
export default definition;
