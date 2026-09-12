import { useRef } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import type {
  ActivityDefinition,
  ActivityViewProps,
} from "../../domain/activity";
import {
  metalCopy as c,
  drawingTableActivityContent,
} from "../../content/en/drawing-table";
import { center, shapePath, figures, perimeter, paper } from "./geometry";
import type { Point } from "./geometry";
import {
  initialState,
  reduce,
  isComplete,
  checkWork,
  pencils,
  linePath,
} from "./model";
import type { State, Action } from "./model";
const copy = drawingTableActivityContent["metal-insets"];
function View({ state, dispatch, guidance }: ActivityViewProps<State, Action>) {
  const svg = useRef<SVGSVGElement>(null),
    drawing = useRef(false);
  const point = (e: ReactPointerEvent): Point | null => {
    const matrix = svg.current?.getScreenCTM();
    if (!matrix) return null;
    const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(
      matrix.inverse(),
    );
    return [p.x, p.y];
  };
  const start = (e: ReactPointerEvent<SVGSVGElement>) => {
    if (e.button !== 0) return;
    const p = point(e);
    if (
      !p ||
      p[0] < paper.left ||
      p[0] > paper.right ||
      p[1] < paper.top ||
      p[1] > paper.bottom
    )
      return;
    e.preventDefault();
    e.currentTarget.focus({ preventScroll: true });
    e.currentTarget.setPointerCapture(e.pointerId);
    drawing.current = true;
    dispatch({ type: "begin", point: p });
  };
  const exportDrawing = () => {
    const paths = state.strokes
      .map(
        (line) =>
          `<path d="${linePath(line.points)}" stroke="${line.color}" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
      )
      .join("");
    const blob = new Blob(
      [
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="55 55 450 450"><rect x="55" y="55" width="450" height="450" fill="#fffdf7"/>${paths}</svg>`,
      ],
      { type: "image/svg+xml" },
    );
    const url = URL.createObjectURL(blob),
      a = document.createElement("a");
    a.href = url;
    a.download = "my-metal-inset-drawing.svg";
    a.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  return (
    <section className="elementary-work inset-work">
      <p className="work-instruction">{copy.instruction}</p>
      {guidance && <p className="guidance-note">{copy.guidance}</p>}
      <div className="work-controls">
        <label>
          {c.figure}{" "}
          <select
            aria-label={c.figure}
            value={state.figure}
            onChange={(e) =>
              dispatch({ type: "figure", index: Number(e.target.value) })
            }
          >
            {figures.map((f, i) => (
              <option key={f.id} value={i}>
                {f.name}
              </option>
            ))}
          </select>
        </label>
        {(["frame", "inset", "away"] as const).map((tool) => (
          <button
            className="secondary-button"
            key={tool}
            aria-pressed={state.tool === tool}
            onClick={() => dispatch({ type: "tool", tool })}
          >
            {c.tools[tool]}
          </button>
        ))}
      </div>
      <div className="inset-pencil-box" role="group" aria-label={c.pencils}>
        {pencils.map((color, index) => (
          <button
            key={color}
            aria-label={`${c.choosePencil} ${c.colors[index]}`}
            aria-pressed={state.color === index}
            onClick={() => dispatch({ type: "color", index })}
          >
            <svg viewBox="0 0 130 25" aria-hidden="true">
              <path d="M5 12 23 2H123V22H23Z" fill={color} />
              <path d="M5 12 23 2V22Z" fill="#d8bc89" />
              <path d="M5 12 11 9V15Z" fill="#4c4a3f" />
            </svg>
            <span>{c.colors[index]}</span>
          </button>
        ))}
      </div>
      <p className="work-caption" id="inset-keyboard-help">
        {c.keyboard}
      </p>
      <svg
        ref={svg}
        viewBox="0 0 820 560"
        className="inset-drawing-surface"
        tabIndex={0}
        role="application"
        aria-label={c.surface}
        aria-describedby="inset-keyboard-help"
        onPointerDown={start}
        onPointerMove={(e) => {
          if (!drawing.current) return;
          const p = point(e);
          if (p) dispatch({ type: "point", point: p });
        }}
        onPointerUp={() => {
          drawing.current = false;
          dispatch({ type: "end" });
        }}
        onPointerCancel={() => {
          drawing.current = false;
          dispatch({ type: "end" });
        }}
        onBlur={() => {
          drawing.current = false;
          dispatch({ type: "end" });
        }}
        onKeyDown={(e) => {
          const direction: Record<string, Point> = {
            ArrowLeft: [-5, 0],
            ArrowRight: [5, 0],
            ArrowUp: [0, -5],
            ArrowDown: [0, 5],
          };
          if (direction[e.key]) {
            e.preventDefault();
            const p: Point = [
              state.cursor[0] + direction[e.key][0],
              state.cursor[1] + direction[e.key][1],
            ];
            dispatch({ type: state.active ? "point" : "cursor", point: p });
          } else if (e.key === " ") {
            e.preventDefault();
            dispatch(
              state.active
                ? { type: "end" }
                : { type: "begin", point: state.cursor },
            );
          } else if (e.key === "Escape") {
            dispatch({ type: "end" });
          }
        }}
      >
        <rect width="820" height="560" rx="14" fill="#e4d4b8" />
        <rect x="40" y="40" width="480" height="480" rx="4" fill="#b8c4a5" />
        <rect x="55" y="55" width="450" height="450" fill="#fffdf7" />
        {state.strokes.map((line, i) => (
          <path
            key={i}
            d={linePath(line.points)}
            stroke={line.color}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        ))}
        <rect x="558" y="40" width="235" height="480" rx="12" fill="#c2a477" />
        <text x="675" y="75" textAnchor="middle" className="inset-svg-label">
          {c.restingTray}
        </text>
        <g
          className="inset-material"
          transform={
            state.tool === "frame"
              ? `translate(${center.join(" ")})`
              : "translate(675 193) scale(.5)"
          }
        >
          <path
            d={`M-175-175H175V175H-175Z ${shapePath(state.figure)}`}
            fill="#cd8e9c"
            fillRule="evenodd"
            stroke="#a9687b"
            strokeWidth="2"
          />
        </g>
        <g
          className="inset-material"
          transform={
            state.tool === "inset"
              ? `translate(${center.join(" ")})`
              : "translate(675 395) scale(.5)"
          }
        >
          <path
            d={shapePath(state.figure)}
            fill="#547d9e"
            stroke="#356486"
            strokeWidth="2"
          />
          <circle r="10" fill="#b2c3cf" stroke="#35566c" />
        </g>
        <g
          className="inset-pencil-cursor"
          transform={`translate(${state.cursor.join(" ")})`}
          pointerEvents="none"
        >
          <circle
            r="5"
            fill="none"
            stroke={pencils[state.color]}
            strokeWidth="2"
          />
          <path d="M2-2l16-23 5 4L6 2Z" fill={pencils[state.color]} />
        </g>
      </svg>
      <div className="work-controls">
        <button
          className="secondary-button"
          disabled={!state.strokes.length}
          onClick={() => dispatch({ type: "undo" })}
        >
          {c.undo}
        </button>
        <button
          className="secondary-button"
          disabled={!state.strokes.length}
          onClick={exportDrawing}
        >
          {c.keep}
        </button>
        <button
          className="secondary-button"
          disabled={
            !state.strokes.some(
              (line) => line.points.filter(Boolean).length > 1,
            )
          }
          onClick={() => dispatch({ type: "finish" })}
        >
          {c.finish}
        </button>
      </div>
      <p className="work-caption">{c.limitation}</p>
      {state.strokes.length >= 80 && <p role="status">{c.full}</p>}
    </section>
  );
}
const definition: ActivityDefinition<State, Action> = {
  id: "metal-insets",
  version: 1,
  requiredAssets: [],
  initialState,
  reduce,
  isComplete,
  checkWork,
  guidance: copy.guidance,
  completionHeading: c.completionHeading,
  View,
  example: () => {
    let state = initialState();
    const steps = [{ caption: c.example[0], state }];
    for (const [color, tool] of ["frame", "inset"].entries()) {
      state = reduce(state, { type: "tool", tool: tool as "frame" | "inset" });
      state = reduce(state, { type: "color", index: color });
      steps.push({ caption: c.example[color + 1], state });
      const points = perimeter(0);
      state = reduce(state, { type: "begin", point: points[0] });
      for (let i = 1; i <= points.length; i++) {
        state = reduce(state, {
          type: "point",
          point: points[i % points.length],
        });
        if (i % 20 === 0) steps.push({ caption: c.follow, state });
      }
      state = reduce(state, { type: "end" });
    }
    state = reduce(state, { type: "tool", tool: "away" });
    state = reduce(state, { type: "color", index: 2 });
    steps.push({ caption: c.example[3], state });
    for (let x = 175; x <= 385; x += 18) {
      const dy = Math.sqrt(130 ** 2 - (x - 280) ** 2);
      state = reduce(state, { type: "begin", point: [x, 280 - dy + 4] });
      for (let y = 280 - dy + 8; y < 280 + dy - 3; y += 8)
        state = reduce(state, { type: "point", point: [x, y] });
      state = reduce(state, { type: "end" });
      steps.push({ caption: c.example[4], state });
    }
    state = reduce(state, { type: "finish" });
    steps.push({ caption: c.example[5], state });
    return steps;
  },
};
export default definition;
