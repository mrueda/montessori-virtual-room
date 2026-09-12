import { checkWork } from "./model";
import type {
  ActivityDefinition,
  ActivityViewProps,
} from "../../domain/activity";
import { activityContent } from "../../content/en/activities";
import { initialState, reduce, isComplete, values, problems } from "./model";
import type { State, Action, Counts } from "./model";
const copy = activityContent["stamp-game"];
const names = ["Thousands", "Hundreds", "Tens", "Units"];
function View({ state, dispatch, guidance }: ActivityViewProps<State, Action>) {
  const tiles = (counts: Counts, row: 0 | 1, merged = false) => (
    <div className="stamp-row">
      {counts.map((n, column) => (
        <div className="stamp-column" key={column}>
          <div className="stamp-pile">
            {Array.from({ length: n }, (_, i) => (
              <button
                key={i}
                className={`stamp stamp-${column}`}
                disabled={merged}
                aria-label={`Return ${values[column]} stamp from addend ${row + 1}`}
                onClick={() => dispatch({ type: "remove", row, column })}
              >
                {values[column]}
              </button>
            ))}
          </div>
          {!merged && (
            <button
              className="stamp-add"
              aria-label={`Add ${values[column]} stamp to addend ${row + 1}`}
              disabled={n === 9}
              onClick={() => dispatch({ type: "add", row, column })}
            >
              + {values[column]}
            </button>
          )}
          {merged && column > 0 && (
            <button
              className="stamp-exchange"
              disabled={n < 10}
              onClick={() => dispatch({ type: "exchange", column })}
            >
              Exchange ten {values[column]}s
            </button>
          )}
        </div>
      ))}
    </div>
  );
  return (
    <section className="elementary-work">
      <p className="work-instruction">{copy.instruction}</p>
      {guidance && <p className="guidance-note">{copy.guidance}</p>}
      <label className="work-select">
        Choose an addition{" "}
        <select
          value={state.problem}
          onChange={(e) =>
            dispatch({ type: "problem", index: Number(e.target.value) })
          }
        >
          {problems.map(([a, b], i) => (
            <option key={i} value={i}>
              {a} + {b}
              {i === 0 ? " · without exchange" : " · with exchange"}
            </option>
          ))}
        </select>
      </label>
      <div className="stamp-board">
        <div className="stamp-headings">
          {names.map((n, i) => (
            <div key={n} className={`stamp-heading stamp-${i}`}>
              {n}
              <strong>{values[i]}</strong>
            </div>
          ))}
        </div>
        {!state.merged ? (
          <>
            <h3>First addend · {problems[state.problem][0]}</h3>
            {tiles(state.rows[0], 0)}
            <div className="stamp-divider" />
            <h3>Second addend · {problems[state.problem][1]}</h3>
            {tiles(state.rows[1], 1)}
          </>
        ) : (
          <>
            <h3>The addends brought together</h3>
            {tiles(state.result, 0, true)}
          </>
        )}
      </div>
      <div className="work-controls">
        <button
          className="secondary-button"
          onClick={() =>
            dispatch({ type: state.merged ? "separate" : "merge" })
          }
        >
          {state.merged ? "Separate the addends" : "Remove divider & combine"}
        </button>
        {state.merged && (
          <label>
            Record your sum{" "}
            <input
              aria-label="Record your sum"
              inputMode="numeric"
              value={state.answer}
              onChange={(e) =>
                dispatch({ type: "answer", value: e.target.value })
              }
            />
          </label>
        )}
      </div>
      {state.merged && (
        <p className="work-caption">
          Count from units toward thousands. You can separate the addends to
          check your quantities.
        </p>
      )}
    </section>
  );
}
const definition: ActivityDefinition<State, Action> = {
  id: "stamp-game",
  version: 1,
  requiredAssets: [],
  initialState,
  reduce,
  isComplete,
  checkWork,
  guidance: copy.guidance,
  View,
  example: () => {
    let state = reduce(initialState(), { type: "problem", index: 1 });
    const steps = [
      { caption: "Represent 1286 and 1457 with decimal stamps.", state },
    ];
    for (const row of [0, 1] as const)
      for (let column = 0; column < 4; column++)
        for (
          let n = 0;
          n < Math.floor(problems[1][row] / values[column]) % 10;
          n++
        ) {
          state = reduce(state, { type: "add", row, column });
          steps.push({
            caption: `Build addend ${row + 1} with ${values[column]} stamps.`,
            state,
          });
        }
    state = reduce(state, { type: "merge" });
    steps.push({
      caption: "Remove the divider and bring the quantities together.",
      state,
    });
    for (let column = 3; column > 0; column--)
      if (state.result[column] >= 10) {
        state = reduce(state, { type: "exchange", column });
        steps.push({
          caption: `Exchange ten ${values[column]} stamps for one ${values[column - 1]} stamp. The value stays the same.`,
          state,
        });
      }
    state = reduce(state, { type: "answer", value: "2743" });
    steps.push({
      caption: "Count the remaining stamps and record 2743.",
      state,
    });
    return steps;
  },
};
export default definition;
