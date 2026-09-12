import type { Dispatch } from "react";
import type { TowerAction, TowerState } from "./model";

export default function TowerAdjustments({
  state,
  dispatch,
}: {
  state: TowerState;
  dispatch: Dispatch<TowerAction>;
}) {
  const top = state.stack.at(-1);
  return (
    <div className="tower-adjustments">
      <div role="group" aria-label="Adjust the top cube">
        <button
          className="secondary-button"
          disabled={!top || top.offset <= -45}
          onClick={() =>
            top && dispatch({ type: "adjust", offset: top.offset - 3 })
          }
        >
          Move top cube left
        </button>
        <button
          className="secondary-button"
          disabled={!top || top.offset >= 45}
          onClick={() =>
            top && dispatch({ type: "adjust", offset: top.offset + 3 })
          }
        >
          Move top cube right
        </button>
      </div>
      <button
        className="text-button"
        disabled={!top}
        onClick={() => dispatch({ type: "remove" })}
      >
        Lift the top cube back to the tray
      </button>
    </div>
  );
}
