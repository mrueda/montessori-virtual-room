import type {
  ActivityDefinition,
  ActivityViewProps,
} from "../../domain/activity";
import {
  checkerCopy as c,
  expansionActivityContent,
} from "../../content/en/expansion";
import {
  initialState,
  reduce,
  isComplete,
  checkWork,
  problems,
  digit,
  sum,
  power,
} from "./model";
import type { State, Action } from "./model";
export const beadColors = [
  "",
  "#bb5045",
  "#5b9158",
  "#d58fa7",
  "#dbb845",
  "#79afd0",
  "#9374a8",
  "#efeee5",
  "#966b4a",
  "#3e597e",
];
function BeadBar({ value }: { value: number }) {
  return (
    <svg viewBox="0 0 112 16" className="checker-bead" aria-hidden="true">
      <path
        d={`M5 8H${5 + (value - 1) * 12}`}
        stroke="#998b75"
        strokeWidth="2"
      />
      {Array.from({ length: value }, (_, i) => (
        <circle
          key={i}
          cx={5 + i * 12}
          cy="8"
          r="4.5"
          fill={beadColors[value]}
          stroke="#665e4e"
          strokeWidth=".6"
        />
      ))}
    </svg>
  );
}
function View({ state, dispatch, guidance }: ActivityViewProps<State, Action>) {
  const [a, b] = problems[state.problem];
  const p = power(state.selected);
  return (
    <section className="elementary-work checker-work">
      <p className="work-instruction">
        {expansionActivityContent.checkerboard.instruction}
      </p>
      {guidance && (
        <p className="guidance-note">
          {expansionActivityContent.checkerboard.guidance}
        </p>
      )}
      <label className="work-select">
        {c.problem}{" "}
        <select
          value={state.problem}
          onChange={(e) =>
            dispatch({ type: "problem", index: Number(e.target.value) })
          }
        >
          {problems.map(([x, y], i) => (
            <option key={i} value={i}>
              {x} × {y}
            </option>
          ))}
        </select>
      </label>
      <p className="work-caption">{c.boardCaption}</p>
      <div
        className="checker-scroll"
        tabIndex={0}
        role="region"
        aria-label={c.board}
      >
        <div className="checker-board">
          {[3, 2, 1, 0].map((row) => (
            <div className="checker-row" key={row}>
              {[8, 7, 6, 5, 4, 3, 2, 1, 0].map((col) => {
                const index = row * 9 + col;
                return (
                  <button
                    key={col}
                    className={`checker-cell place-${(row + col) % 3}`}
                    aria-pressed={state.selected === index}
                    aria-label={`Select row ${row + 1}, column ${col + 1}, place value ${10 ** (row + col)}`}
                    onClick={() => dispatch({ type: "select", index })}
                  >
                    <span className="checker-power">
                      {row + col < 4 ? (
                        (10 ** (row + col)).toLocaleString("en-US")
                      ) : (
                        <>
                          10<sup>{row + col}</sup>
                        </>
                      )}
                    </span>
                    <span className="checker-bars">
                      {state.cells[index].map((bar) => (
                        <BeadBar key={bar.id} value={bar.value} />
                      ))}
                    </span>
                  </button>
                );
              })}
              <div className={`checker-number multiplier digit-${row % 3}`}>
                {digit(b, row)}
              </div>
            </div>
          ))}
          <div className="checker-row">
            {[8, 7, 6, 5, 4, 3, 2, 1, 0].map((col) => (
              <div key={col} className={`checker-number digit-${col % 3}`}>
                {digit(a, col) || (col === 0 ? "0" : "")}
              </div>
            ))}
            <div />
          </div>
        </div>
      </div>
      <p className="checker-selection" role="status">
        {c.selected} {(10 ** p).toLocaleString("en-US")} · {c.beadCount}{" "}
        {sum(state.cells[state.selected])}
      </p>
      {!state.original ? (
        <>
          <div className="checker-bank" role="group" aria-label={c.bank}>
            {Array.from({ length: 9 }, (_, i) => i + 1).map((value) => (
              <button
                key={value}
                aria-label={`Choose ${value}-bead bar`}
                aria-pressed={state.bar === value}
                onClick={() => dispatch({ type: "bar", value })}
              >
                <BeadBar value={value} />
                <span>{value}</span>
              </button>
            ))}
          </div>
          <div className="work-controls">
            <button
              className="secondary-button"
              disabled={state.cells[state.selected].length >= 9}
              onClick={() => dispatch({ type: "add" })}
            >
              {c.add}
            </button>
            <button
              className="secondary-button"
              disabled={!state.cells[state.selected].length}
              onClick={() => dispatch({ type: "remove" })}
            >
              {c.remove}
            </button>
            <button
              className="secondary-button"
              onClick={() => dispatch({ type: "gather" })}
            >
              {c.gather}
            </button>
          </div>
        </>
      ) : (
        <div className="work-controls">
          <button
            className="secondary-button"
            disabled={
              state.selected >= 8 || sum(state.cells[state.selected]) < 10
            }
            onClick={() => dispatch({ type: "exchange" })}
          >
            {c.exchange}
          </button>
          <button
            className="secondary-button"
            onClick={() => dispatch({ type: "separate" })}
          >
            {c.separate}
          </button>
          <label>
            {c.record}{" "}
            <input
              aria-label={c.record}
              inputMode="numeric"
              value={state.answer}
              onChange={(e) =>
                dispatch({ type: "answer", value: e.target.value })
              }
            />
          </label>
        </div>
      )}
      <p className="work-caption">{c.limitation}</p>
    </section>
  );
}
const definition: ActivityDefinition<State, Action> = {
  id: "checkerboard",
  version: 1,
  requiredAssets: [],
  initialState,
  reduce,
  isComplete,
  checkWork,
  guidance: expansionActivityContent.checkerboard.guidance,
  View,
  example: () => {
    let state = reduce(initialState(), { type: "problem", index: 1 });
    const steps = [{ caption: c.example[0], state }];
    for (let row = 0; row < 2; row++)
      for (let col = 0; col < 2; col++) {
        state = reduce(state, { type: "select", index: row * 9 + col });
        state = reduce(state, { type: "bar", value: digit(36, col) });
        for (let n = 0; n < digit(24, row); n++) {
          state = reduce(state, { type: "add" });
          steps.push({ caption: c.example[1], state });
        }
      }
    state = reduce(state, { type: "gather" });
    steps.push({ caption: c.gatherCheck, state });
    for (let index = 0; index < 2; index++) {
      state = reduce(state, { type: "select", index });
      steps.push({ caption: c.exchangeCheck, state });
      state = reduce(state, { type: "exchange" });
      steps.push({ caption: c.exchange, state });
    }
    state = reduce(state, { type: "answer", value: "864" });
    steps.push({ caption: c.example[2], state });
    return steps;
  },
};
export default definition;
