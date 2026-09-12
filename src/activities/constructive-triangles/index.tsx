import { checkWork } from "./model";
import type {
  ActivityDefinition,
  ActivityViewProps,
} from "../../domain/activity";
import { activityContent } from "../../content/en/activities";
import { useSvgMove } from "../shared/useSvgMove";
import { initialState, reduce, isComplete, pairs, targetFor } from "./model";
import type { State, Action } from "./model";
const copy = activityContent["constructive-triangles"];
function View({ state, dispatch, guidance }: ActivityViewProps<State, Action>) {
  const move = useSvgMove((index, x, y, settle) =>
    dispatch({ type: "move", index, x, y, settle }),
  );
  return (
    <section className="elementary-work">
      <p className="work-instruction">{copy.instruction}</p>
      {guidance && <p className="guidance-note">{copy.guidance}</p>}
      <svg
        ref={move.ref}
        viewBox="0 0 900 600"
        className={`geometry-mat ${move.dragging ? "dragging" : ""}`}
        aria-label="Constructive triangles work mat"
      >
        <rect width="900" height="600" rx="12" fill="#e5dfcc" />
        {state.pieces.map((p, i) => {
          const pair = pairs[Math.floor(i / 2)],
            a = pair.points[pair.edge[0]],
            b = pair.points[pair.edge[1]];
          return (
            <g
              key={i}
              transform={`translate(${p.x} ${p.y}) rotate(${p.angle})`}
              className="movable-piece"
              role="button"
              tabIndex={0}
              aria-label={`${pair.name} triangle ${(i % 2) + 1}, ${p.angle} degrees`}
              aria-pressed={state.selected === i}
              {...move.bind(i, p.x, p.y, () =>
                dispatch({ type: "select", index: i }),
              )}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  dispatch({ type: "select", index: i });
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
              <polygon
                points={pair.points.map((p) => p.join(",")).join(" ")}
                fill={pair.color}
                stroke={state.selected === i ? "#263f32" : "#f4edda"}
                strokeWidth={state.selected === i ? 4 : 2}
              />
              <line
                x1={a[0]}
                y1={a[1]}
                x2={b[0]}
                y2={b[1]}
                stroke="#343c33"
                strokeWidth="5"
              />
            </g>
          );
        })}
      </svg>
      <div className="work-controls">
        <label>
          Selected triangle{" "}
          <select
            aria-label="Selected triangle"
            value={state.selected ?? ""}
            onChange={(e) =>
              dispatch({ type: "select", index: Number(e.target.value) })
            }
          >
            <option value="" disabled>
              Choose a triangle
            </option>
            {state.pieces.map((_, i) => (
              <option key={i} value={i}>
                {pairs[Math.floor(i / 2)].name} · {(i % 2) + 1}
              </option>
            ))}
          </select>
        </label>
        <button
          className="secondary-button"
          disabled={state.selected === null}
          onClick={() => dispatch({ type: "rotate", degrees: -30 })}
        >
          Rotate left 30°
        </button>
        <button
          className="secondary-button"
          disabled={state.selected === null}
          onClick={() => dispatch({ type: "rotate", degrees: 30 })}
        >
          Rotate right 30°
        </button>
        {(["Left", "Up", "Down", "Right"] as const).map((dir) => (
          <button
            key={dir}
            className="secondary-button"
            disabled={state.selected === null}
            aria-label={`Move selected triangle ${dir.toLowerCase()}`}
            onClick={() => {
              const i = state.selected!;
              const p = state.pieces[i];
              dispatch({
                type: "move",
                index: i,
                x: p.x + (dir === "Right" ? 10 : dir === "Left" ? -10 : 0),
                y: p.y + (dir === "Down" ? 10 : dir === "Up" ? -10 : 0),
                settle: true,
              });
            }}
          >
            {dir}
          </button>
        ))}
      </div>
      <p className="work-caption">
        Three selected pairs from the rectangular box. Join matching black edges
        to form a square, rectangle, and rhombus. Arrow keys move a focused
        triangle.
      </p>
    </section>
  );
}
const definition: ActivityDefinition<State, Action> = {
  id: "constructive-triangles",
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
      { caption: "Notice the black joining edges on each pair.", state },
    ];
    for (const i of [1, 3, 5]) {
      state = reduce(state, { type: "select", index: i });
      const target = targetFor(state, i);
      state = reduce(state, {
        type: "rotate",
        degrees: target.angle - state.pieces[i].angle,
      });
      steps.push({
        caption:
          "Rotate the matching triangle to bring the black edges face to face.",
        state,
      });
      state = reduce(state, {
        type: "move",
        index: i,
        ...target,
        settle: true,
      });
      steps.push({
        caption: `Slide the edges together: ${pairs[Math.floor(i / 2)].name.toLowerCase()}.`,
        state,
      });
    }
    return steps;
  },
};
export default definition;
