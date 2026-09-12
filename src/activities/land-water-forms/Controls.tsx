import { useEffect } from "react";
import type { ActivityViewProps } from "../../domain/activity";
import {
  formsCopy as c,
  formPairs,
  expansionActivityContent,
} from "../../content/en/expansion";
import type { State, Action } from "./model";
export default function Controls({
  state,
  dispatch,
  guidance,
}: ActivityViewProps<State, Action>) {
  useEffect(() => {
    if (!state.held || state.tilt <= 25 || state.source === 0) return;
    const timer = window.setInterval(() => dispatch({ type: "tick" }), 140);
    return () => clearInterval(timer);
  }, [state.held, state.tilt, state.source, dispatch]);
  return (
    <>
      <p className="work-instruction">
        {expansionActivityContent["land-water-forms"].instruction}
      </p>
      {guidance && (
        <p className="guidance-note">
          {expansionActivityContent["land-water-forms"].guidance}
        </p>
      )}
      <div className="work-controls">
        <label>
          {c.pairLabel}{" "}
          <select
            value={state.pair}
            onChange={(e) =>
              dispatch({ type: "pair", index: Number(e.target.value) })
            }
          >
            {formPairs.map((p, i) => (
              <option value={i} key={p.names[0]}>
                {p.names.join(" / ")}
              </option>
            ))}
          </select>
        </label>
        <button
          className="secondary-button"
          disabled={state.held && state.tilt !== 0}
          onClick={() => dispatch({ type: state.held ? "return" : "pick" })}
        >
          {state.held ? c.putDown : c.pickUp}
        </button>
        {[0, 1].map((side) => (
          <button
            key={side}
            className="secondary-button"
            aria-pressed={state.target === side}
            disabled={!state.held || state.tilt !== 0}
            onClick={() => dispatch({ type: "target", side: side as 0 | 1 })}
          >
            {c.over} {formPairs[state.pair].names[side]}
          </button>
        ))}
      </div>
      <label className="form-tilt">
        {c.tilt}{" "}
        <input
          type="range"
          min="0"
          max="70"
          step="5"
          value={state.tilt}
          disabled={!state.held}
          onChange={(e) =>
            dispatch({ type: "tilt", value: Number(e.target.value) })
          }
        />
        <output>{state.tilt}°</output>
      </label>
      <p className="work-caption">{c.stop}</p>
      <div className="work-controls">
        {[0, 1].map((side) => (
          <button
            key={side}
            className="secondary-button"
            disabled={state.held || state.levels[side] === 0}
            onClick={() => dispatch({ type: "empty", side: side as 0 | 1 })}
          >
            {c.empty} {formPairs[state.pair].names[side]}
          </button>
        ))}
        <button
          className="secondary-button"
          disabled={state.held || state.spill === 0}
          onClick={() => dispatch({ type: "wipe" })}
        >
          {c.wipe}
        </button>
      </div>
      {state.spill > 0 && (
        <p role="status" className="guidance-note">
          {c.spill}
        </p>
      )}
    </>
  );
}
