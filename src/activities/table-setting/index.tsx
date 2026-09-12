import { lazy } from "react";
import type {
  ActivityDefinition,
  ActivityViewProps,
} from "../../domain/activity";
import {
  tableCopy as c,
  drawingTableActivityContent,
} from "../../content/en/drawing-table";
import {
  initialState,
  reduce,
  isComplete,
  checkWork,
  items,
  activeItems,
  targets,
} from "./model";
import type { State, Action } from "./model";
import { useSvgMove } from "../shared/useSvgMove";
import { ObjectArt } from "./Objects";
import Controls from "./Controls";
function View(props: ActivityViewProps<State, Action>) {
  const { state, dispatch } = props,
    move = useSvgMove((index, x, y, settle) =>
      dispatch({ type: "move", index, x, y, settle }),
    );
  return (
    <section className="elementary-work setting-work">
      <Controls {...props} />
      <svg
        ref={move.ref}
        viewBox="0 0 1000 550"
        className={`setting-surface ${move.dragging ? "dragging" : ""}`}
        aria-label={c.surface}
        onClick={(e) => {
          if (
            state.selected === null ||
            (e.target as Element).closest('[role="button"]')
          )
            return;
          const matrix = move.ref.current?.getScreenCTM();
          if (!matrix) return;
          const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(
            matrix.inverse(),
          );
          dispatch({
            type: "move",
            index: state.selected,
            x: p.x,
            y: p.y,
            settle: true,
          });
        }}
      >
        <rect width="1000" height="550" rx="14" fill="#decaab" />
        <rect x="45" y="55" width="585" height="440" rx="8" fill="#e4e8d5" />
        <rect
          x="60"
          y="70"
          width="555"
          height="410"
          rx="5"
          fill="none"
          stroke="#b7c2a2"
          strokeDasharray="4 5"
        />
        <rect
          x="650"
          y="35"
          width="325"
          height="495"
          rx="20"
          fill="#b8996a"
          stroke="#aa895e"
          strokeWidth="8"
        />
        {state.outlines &&
          activeItems(state).map((i) => (
            <g
              key={i}
              transform={`translate(${targets[i].x} ${targets[i].y})`}
              opacity=".6"
            >
              <ObjectArt item={items[i]} folded outline />
            </g>
          ))}
        {activeItems(state).map((i) => {
          const pose = state.poses[i];
          return (
            <g
              key={i}
              className="setting-object"
              transform={`translate(${pose.x} ${pose.y}) rotate(${pose.angle})`}
              role="button"
              tabIndex={0}
              aria-label={`${c.select} ${c.names[items[i]]}`}
              aria-pressed={state.selected === i}
              {...move.bind(i, pose.x, pose.y, () =>
                dispatch({ type: "select", index: i }),
              )}
              onKeyDown={(e) => {
                const step = 15;
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  dispatch({ type: "select", index: i });
                } else if (e.key.startsWith("Arrow")) {
                  e.preventDefault();
                  dispatch({
                    type: "move",
                    index: i,
                    x:
                      pose.x +
                      (e.key === "ArrowLeft"
                        ? -step
                        : e.key === "ArrowRight"
                          ? step
                          : 0),
                    y:
                      pose.y +
                      (e.key === "ArrowUp"
                        ? -step
                        : e.key === "ArrowDown"
                          ? step
                          : 0),
                  });
                }
              }}
            >
              <rect
                x="-45"
                y="-80"
                width="90"
                height="160"
                fill="transparent"
              />
              <ObjectArt item={items[i]} folded={state.folded} />
              {state.selected === i && (
                <circle
                  r={i === 0 ? 105 : i === 3 ? 42 : 85}
                  fill="none"
                  stroke="#5c7659"
                  strokeWidth="2"
                  strokeDasharray="4 6"
                />
              )}
            </g>
          );
        })}
      </svg>
      <p className="work-caption">{c.restore}</p>
    </section>
  );
}
const definition: ActivityDefinition<State, Action> = {
  id: "table-setting",
  version: 2,
  requiredAssets: [],
  initialState,
  reduce,
  isComplete,
  checkWork,
  guidance: drawingTableActivityContent["table-setting"].guidance,
  View,
  View3D: lazy(() => import("./View3D")),
  example: () => {
    let state = initialState();
    const steps = [{ caption: c.example[0], state }];
    state = reduce(state, { type: "fold" });
    steps.push({ caption: c.fold, state });
    for (const index of activeItems(state)) {
      state = reduce(state, { type: "select", index });
      steps.push({ caption: `${c.select} ${c.names[items[index]]}`, state });
      const start = state.poses[index],
        end = targets[index];
      for (let part = 1; part <= 4; part++) {
        const t = part / 4;
        state = reduce(state, {
          type: "move",
          index,
          x: start.x + (end.x - start.x) * t,
          y: start.y + (end.y - start.y) * t,
          settle: part === 4,
        });
        steps.push({ caption: c.example[1], state });
      }
    }
    steps.push({ caption: c.checkComplete, state });
    return steps;
  },
};
export default definition;
