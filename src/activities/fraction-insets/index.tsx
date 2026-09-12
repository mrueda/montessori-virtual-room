import { checkWork } from "./model";
import type {
  ActivityDefinition,
  ActivityViewProps,
} from "../../domain/activity";
import { activityContent } from "../../content/en/activities";
import { initialState, reduce, isComplete, sector, targets } from "./model";
import type { State, Action } from "./model";
const copy = activityContent["fraction-insets"];
function View({ state, dispatch, guidance }: ActivityViewProps<State, Action>) {
  const [num, den] = targets[state.target];
  let angle = 0;
  return (
    <section className="elementary-work">
      <p className="work-instruction">{copy.instruction}</p>
      {guidance && <p className="guidance-note">{copy.guidance}</p>}
      <label className="work-select">
        Compare with{" "}
        <select
          value={state.target}
          onChange={(e) =>
            dispatch({ type: "target", index: Number(e.target.value) })
          }
        >
          {targets.map(([n, d], i) => (
            <option key={i} value={i}>
              {n}/{d}
            </option>
          ))}
        </select>
      </label>
      <div className="fraction-comparison">
        <div>
          <h3>
            Reference · {num}/{den}
          </h3>
          <svg
            viewBox="-120 -120 240 240"
            aria-label={`Reference: ${num} out of ${den} equal parts`}
            role="img"
          >
            <rect
              x="-118"
              y="-118"
              width="236"
              height="236"
              rx="7"
              fill="#498166"
            />
            <circle r="102" fill="#eee8d8" />
            {Array.from({ length: num }, (_, i) => (
              <path
                key={i}
                d={sector(1 / den, i / den)}
                fill="#be5049"
                stroke="#f0d8bd"
                strokeWidth="1.5"
              />
            ))}
          </svg>
        </div>
        <div>
          <h3>Your comparison</h3>
          <svg
            viewBox="-120 -120 240 240"
            aria-label="Comparison inset"
            role="img"
          >
            <rect
              x="-118"
              y="-118"
              width="236"
              height="236"
              rx="7"
              fill="#498166"
            />
            <circle r="102" fill="#eee8d8" />
            <path d={sector(num / den)} fill="#cfc6ae" />
            {state.pieces.map((d, i) => {
              const start = angle;
              angle += 1 / d;
              return (
                <g key={i} className="fraction-piece">
                  <path
                    d={sector(1 / d, start)}
                    fill="#be5049"
                    stroke="#f0d8bd"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx={58 * Math.sin((start + 0.5 / d) * Math.PI * 2)}
                    cy={-58 * Math.cos((start + 0.5 / d) * Math.PI * 2)}
                    r="5"
                    fill="#e2c69c"
                  />
                </g>
              );
            })}
          </svg>
        </div>
      </div>
      <div className="fraction-bank" aria-label="Ten fraction insets">
        {Array.from({ length: 10 }, (_, i) => i + 1).map((d) => (
          <button
            key={d}
            aria-label={`Choose ${d === 1 ? "whole" : `1/${d}`} inset`}
            aria-pressed={state.selected === d}
            onClick={() => dispatch({ type: "select", denominator: d })}
          >
            <svg viewBox="-105 -105 210 210" aria-hidden="true">
              <circle r="102" fill="#3f765b" />
              {Array.from({ length: d }, (_, j) => (
                <path
                  key={j}
                  d={sector(1 / d, j / d, 95)}
                  fill={
                    j < state.pieces.filter((x) => x === d).length
                      ? "#e2dac5"
                      : "#be5049"
                  }
                  stroke="#e2dac5"
                  strokeWidth="2"
                />
              ))}
            </svg>
            <span>{d === 1 ? "Whole" : `1/${d}`}</span>
          </button>
        ))}
      </div>
      <div className="work-controls">
        <button
          className="secondary-button"
          disabled={!state.selected}
          onClick={() => dispatch({ type: "place" })}
        >
          {state.selected
            ? `Move one ${state.selected === 1 ? "whole" : `1/${state.selected}`} to comparison`
            : "Choose an inset first"}
        </button>
        {state.pieces.map((d, i) => (
          <button
            key={i}
            className="secondary-button"
            aria-label={`Return piece ${i + 1}, 1/${d}`}
            onClick={() => dispatch({ type: "remove", index: i })}
          >
            Return 1/{d}
          </button>
        ))}
      </div>
      <p className="work-caption">
        {state.pieces.length
          ? `${state.pieces.map((d) => `1/${d}`).join(" + ")} — compare the covered areas.`
          : "The pale area marks the reference. Explore which equal pieces cover it."}
      </p>
    </section>
  );
}
const definition: ActivityDefinition<State, Action> = {
  id: "fraction-insets",
  version: 1,
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
      { caption: "Compare one half with smaller equal sectors.", state },
    ];
    state = reduce(state, { type: "select", denominator: 4 });
    steps.push({ caption: "Choose the fourths inset.", state });
    for (let i = 0; i < 2; i++) {
      state = reduce(state, { type: "place" });
      steps.push({
        caption:
          i === 0
            ? "Move one fourth into the comparison frame."
            : "Two fourths cover exactly the same area as one half.",
        state,
      });
    }
    return steps;
  },
};
export default definition;
