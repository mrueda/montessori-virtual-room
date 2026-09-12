import { useRef, useState } from "react";
import type { CSSProperties, PointerEvent } from "react";
import type { ActivityViewProps } from "../../domain/activity";
import type { TowerAction, TowerState } from "./model";
import TowerAdjustments from "./TowerAdjustments";

const order = [4, 8, 2, 6, 10, 3, 7, 1, 9, 5];
type Drag = {
  size: number;
  source: "tray" | "tower";
  x: number;
  y: number;
  startX: number;
  startY: number;
  moved: boolean;
};
const cubeStyle = (size: number) => ({ "--cube-size": size }) as CSSProperties;
const contains = (element: HTMLElement | null, x: number, y: number) => {
  const r = element?.getBoundingClientRect();
  return !!r && x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
};

export default function View2D({
  state,
  dispatch,
  guidance,
}: ActivityViewProps<TowerState, TowerAction>) {
  const mat = useRef<HTMLDivElement>(null),
    tray = useRef<HTMLDivElement>(null);
  const active = useRef<Drag | null>(null),
    suppressClick = useRef(false);
  const [drag, setDrag] = useState<Drag | null>(null);
  const offsetAt = (x: number) => {
    const r = mat.current!.getBoundingClientRect();
    return x - (r.left + r.width / 2);
  };
  function start(
    event: PointerEvent<HTMLElement>,
    size: number,
    source: Drag["source"],
  ) {
    if (!event.isPrimary || event.button !== 0) return;
    event.stopPropagation();
    suppressClick.current = false;
    event.currentTarget.setPointerCapture(event.pointerId);
    active.current = {
      size,
      source,
      x: event.clientX,
      y: event.clientY,
      startX: event.clientX,
      startY: event.clientY,
      moved: false,
    };
  }
  function move(event: PointerEvent<HTMLElement>) {
    const previous = active.current;
    if (!previous) return;
    const next = {
      ...previous,
      x: event.clientX,
      y: event.clientY,
      moved:
        previous.moved ||
        Math.hypot(
          event.clientX - previous.startX,
          event.clientY - previous.startY,
        ) > 6,
    };
    active.current = next;
    if (next.moved) setDrag(next);
  }
  function end(event: PointerEvent<HTMLElement>) {
    const current = active.current;
    active.current = null;
    setDrag(null);
    if (!current?.moved) return;
    suppressClick.current = true;
    window.setTimeout(() => {
      suppressClick.current = false;
    }, 0);
    if (contains(mat.current, event.clientX, event.clientY)) {
      if (current.source === "tray") {
        dispatch({ type: "select", size: current.size });
        dispatch({ type: "place", offset: offsetAt(event.clientX) });
      } else dispatch({ type: "adjust", offset: offsetAt(event.clientX) });
    } else if (
      current.source === "tower" &&
      contains(tray.current, event.clientX, event.clientY)
    )
      dispatch({ type: "remove" });
  }
  function cancel() {
    active.current = null;
    setDrag(null);
    suppressClick.current = false;
  }
  const pointerHandlers = {
    onPointerMove: move,
    onPointerUp: end,
    onPointerCancel: cancel,
    onLostPointerCapture: () => {
      active.current = null;
      setDrag(null);
    },
  };
  const overMat = drag && contains(mat.current, drag.x, drag.y);
  return (
    <div className="tower-work">
      <p className="activity-instruction" id="tower-instructions">
        Carry a cube onto the mat by dragging it, or select it and tap to place.
        Move the top cube to adjust it, or carry it back to the tray.
      </p>
      <div className="tower-layout">
        <div
          ref={tray}
          className={`cube-tray ${drag?.source === "tower" && contains(tray.current, drag.x, drag.y) ? "drop-ready" : ""}`}
          aria-label="Available cubes"
        >
          {order.map((size) => {
            const placed = state.stack.some((cube) => cube.size === size);
            return (
              <div key={size} className="cube-slot">
                {!placed && (
                  <button
                    className={`cube-choice ${state.selected === size ? "selected" : ""} ${drag?.size === size ? "being-carried" : ""}`}
                    aria-label={`Select cube ${size}, ${size === 10 ? "largest" : size === 1 ? "smallest" : `size ${size} of 10`}`}
                    aria-pressed={state.selected === size}
                    onPointerDown={(event) => start(event, size, "tray")}
                    {...pointerHandlers}
                    onClick={() => {
                      if (suppressClick.current) {
                        suppressClick.current = false;
                        return;
                      }
                      dispatch({ type: "select", size });
                    }}
                  >
                    <span className="pink-cube" style={cubeStyle(size)} />
                  </button>
                )}
              </div>
            );
          })}
        </div>
        <div className="mat-wrap">
          <div
            ref={mat}
            className={`tower-mat ${overMat ? "drop-ready" : ""}`}
            role="button"
            tabIndex={0}
            aria-label="Place selected cube on the mat. Keyboard placement centers the cube."
            aria-describedby="tower-instructions"
            aria-disabled={state.selected === null}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                dispatch({ type: "place", offset: 0 });
              }
            }}
            onClick={(event) => {
              if (suppressClick.current) {
                suppressClick.current = false;
                return;
              }
              dispatch({
                type: "place",
                offset: event.detail === 0 ? 0 : offsetAt(event.clientX),
              });
            }}
          >
            <span className="tower-stack">
              {state.stack.map((cube, index) => (
                <span
                  key={cube.size}
                  className={`stack-cube ${index === state.stack.length - 1 ? "top-cube" : ""} ${drag?.source === "tower" && drag.size === cube.size ? "being-carried" : ""}`}
                  style={{
                    ...cubeStyle(cube.size),
                    transform: `translateX(${cube.offset}px)`,
                  }}
                  onPointerDown={
                    index === state.stack.length - 1
                      ? (event) => start(event, cube.size, "tower")
                      : undefined
                  }
                  {...pointerHandlers}
                />
              ))}
            </span>
            {!state.stack.length && (
              <span className="mat-caption">
                Your work mat
                <br />
                <small>
                  {state.selected
                    ? "Place your cube here"
                    : "Begin with any cube"}
                </small>
              </span>
            )}
          </div>
          <TowerAdjustments state={state} dispatch={dispatch} />
        </div>
      </div>
      {drag && (
        <span
          aria-hidden="true"
          className="pink-cube carried-cube"
          style={{ ...cubeStyle(drag.size), left: drag.x, top: drag.y }}
        />
      )}
      {guidance && (
        <p className="gentle-note">
          Look for the largest cube first. Compare the edges as you build. You
          can adjust the top cube or return cubes to the tray, one at a time.
        </p>
      )}
    </div>
  );
}
