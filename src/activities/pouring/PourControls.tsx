import type { PourState, PourAction } from "./model";
export default function PourControls({
  state,
  dispatch,
}: {
  state: PourState;
  dispatch: (action: PourAction) => void;
}) {
  return (
    <div className="pour-controls">
      <p className="surface-label">A STEADY, PURPOSEFUL MOVEMENT</p>
      <div className="pour-buttons">
        <button
          className="secondary-button"
          disabled={state.held && state.tilt !== 0}
          onClick={() => dispatch({ type: state.held ? "return" : "pick-up" })}
        >
          {state.held ? "Return pitcher to tray" : "Pick up the pitcher"}
        </button>
        <button
          className="secondary-button"
          disabled={!state.held || state.tilt !== 0}
          onClick={() =>
            dispatch({ type: "position", overCup: !state.overCup })
          }
        >
          {state.overCup ? "Move back over the tray" : "Move over the cup"}
        </button>
      </div>
      <label className="tilt-label" htmlFor="pitcher-tilt">
        Tilt the pitcher <span>{Math.round(state.tilt)}°</span>
      </label>
      <input
        id="pitcher-tilt"
        type="range"
        min="0"
        max="80"
        step="1"
        value={state.tilt}
        disabled={!state.held}
        onChange={(e) =>
          dispatch({ type: "tilt", angle: Number(e.target.value) })
        }
      />
      <div className="range-labels">
        <span>Upright</span>
        <span>Pour</span>
      </div>
      <button
        className="text-button"
        disabled={!state.held || state.tilt === 0}
        onClick={() => dispatch({ type: "tilt", angle: 0 })}
      >
        Bring the pitcher upright
      </button>
      <button
        className="cloth-button"
        disabled={state.held || state.spilled === 0}
        onClick={() => dispatch({ type: "wipe" })}
      >
        <span className="cloth-swatch" />
        Wipe the tray
      </button>
      <p className="fit-observation" aria-live="polite">
        {state.spilled > 0
          ? "There is water on the tray. Return the pitcher, then use the cloth."
          : state.source === 0 && !state.held
            ? "The pitcher is back on the tray. Start again whenever you like."
            : state.source === 0
              ? "The pitcher is empty. Bring it upright and return it to the tray."
              : !state.held
                ? "The tray is ready. Pick up the pitcher when you are ready."
                : state.overCup
                  ? "The spout is over the cup. Tilt slowly to begin."
                  : "The pitcher is above the tray. Bring it over the cup."}
      </p>
    </div>
  );
}
