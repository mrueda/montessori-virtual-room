import type { ActivityViewProps } from "../../domain/activity";
import type { State, Action } from "./model";
import { items, activeItems } from "./model";
import {
  tableCopy as c,
  drawingTableActivityContent,
} from "../../content/en/drawing-table";
export default function Controls({
  state,
  dispatch,
  guidance,
}: ActivityViewProps<State, Action>) {
  const selected = state.selected === null ? null : state.poses[state.selected];
  return (
    <>
      <p className="work-instruction">
        {drawingTableActivityContent["table-setting"].instruction}
      </p>
      {guidance && (
        <p className="guidance-note">
          {drawingTableActivityContent["table-setting"].guidance}
        </p>
      )}
      <div className="work-controls">
        <label>
          {c.setting}{" "}
          <select
            aria-label={c.setting}
            value={state.setting}
            onChange={(e) =>
              dispatch({
                type: "setting",
                setting: e.target.value as State["setting"],
              })
            }
          >
            <option value="snack">{c.snack}</option>
            <option value="meal">{c.meal}</option>
          </select>
        </label>
        <button
          className="secondary-button"
          aria-pressed={state.outlines}
          onClick={() => dispatch({ type: "outlines" })}
        >
          {c.outlines}
        </button>
        <button
          className="secondary-button"
          aria-pressed={state.folded}
          onClick={() => dispatch({ type: "fold" })}
        >
          {state.folded ? c.unfold : c.fold}
        </button>
      </div>
      <div className="work-controls">
        <label>
          {c.selected}{" "}
          <select
            aria-label={c.selected}
            value={state.selected ?? ""}
            onChange={(e) =>
              dispatch({ type: "select", index: Number(e.target.value) })
            }
          >
            <option value="" disabled>
              {c.choose}
            </option>
            {activeItems(state).map((i) => (
              <option key={i} value={i}>
                {c.names[items[i]]}
              </option>
            ))}
          </select>
        </label>
        <button
          className="secondary-button"
          disabled={!selected}
          onClick={() => dispatch({ type: "return" })}
        >
          {c.return}
        </button>
        {[-15, 15].map((degrees) => (
          <button
            key={degrees}
            className="secondary-button"
            disabled={!selected}
            onClick={() => dispatch({ type: "rotate", degrees })}
          >
            {degrees < 0 ? c.rotateLeft : c.rotateRight}
          </button>
        ))}
      </div>
      <div
        className="work-controls"
        role="group"
        aria-label={c.positionControls}
      >
        {(["left", "up", "down", "right"] as const).map((dir) => (
          <button
            key={dir}
            className="secondary-button"
            disabled={!selected}
            aria-label={`${c.move} ${c.directions[dir]}`}
            onClick={() => {
              if (selected && state.selected !== null)
                dispatch({
                  type: "move",
                  index: state.selected,
                  x:
                    selected.x +
                    (dir === "left" ? -15 : dir === "right" ? 15 : 0),
                  y:
                    selected.y + (dir === "up" ? -15 : dir === "down" ? 15 : 0),
                });
            }}
          >
            {c.directions[dir]}
          </button>
        ))}
        <button
          className="secondary-button"
          disabled={!selected}
          onClick={() => {
            if (state.selected !== null)
              dispatch({ type: "move", index: state.selected, x: 350, y: 285 });
          }}
        >
          {c.center}
        </button>
      </div>
      <p className="work-caption">{c.customs}</p>
    </>
  );
}
