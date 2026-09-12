import type {
  ActivityDefinition,
  ActivityViewProps,
} from "../../domain/activity";
import { activityContent } from "../../content/en/activities";
import {
  initialState,
  reduce,
  isComplete,
  checkWork,
  remaining,
  expectedSlots,
} from "./model";
import type { State, Action } from "./model";
const copy = activityContent["cards-counters"];
function View({ state, dispatch, guidance }: ActivityViewProps<State, Action>) {
  return (
    <section className="elementary-work counters-work">
      <p className="work-instruction">{copy.instruction}</p>
      {guidance && <p className="guidance-note">{copy.guidance}</p>}
      <div className="number-bank" aria-label="Numeral cards">
        {[6, 2, 9, 4, 1, 8, 3, 10, 5, 7].map((n) => (
          <button
            key={n}
            disabled={state.cards.includes(n)}
            aria-pressed={state.selected === n}
            aria-label={`Choose numeral ${n}`}
            onClick={() => dispatch({ type: "select", value: n })}
          >
            {n}
          </button>
        ))}
      </div>
      <p className="work-caption">
        {state.selected
          ? `Numeral ${state.selected} is selected. Choose a place along the mat.`
          : "Choose a numeral, then a place on the mat. Touch a placed numeral to lift it."}
      </p>
      <div
        className="counter-scroll"
        tabIndex={0}
        aria-label="Counting mat; scroll horizontally on smaller screens"
      >
        <div className="counter-mat">
          {state.cards.map((n, column) => (
            <div className="counter-column" key={column}>
              <button
                className="numeral-place"
                aria-label={`Numeral place ${column + 1}${n ? `, contains ${n}` : ""}`}
                onClick={() => dispatch({ type: "card", column })}
              >
                {n ?? "·"}
              </button>
              <div className="counter-grid">
                {state.counters[column].map((v, slot) => (
                  <button
                    key={slot}
                    className={v ? "counter occupied" : "counter"}
                    disabled={!n || (!v && remaining(state) === 0)}
                    aria-label={`${v ? "Return" : "Place"} counter at column ${column + 1}, row ${Math.floor(slot / 3) + 1}, ${["left", "center", "right"][slot % 3]}`}
                    aria-pressed={v}
                    onClick={() => dispatch({ type: "counter", column, slot })}
                  >
                    <span />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        className="counter-bowl"
        aria-label={`${remaining(state)} counters in the bowl`}
      >
        <span aria-hidden="true">
          {Array.from({ length: remaining(state) }, (_, i) => (
            <i key={i} />
          ))}
        </span>
        <p>{remaining(state)} counters in the bowl</p>
      </div>
    </section>
  );
}
const definition: ActivityDefinition<State, Action> = {
  id: "cards-counters",
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
      { caption: "Lay the numerals across the mat in order.", state },
    ];
    for (let n = 1; n <= 10; n++) {
      state = reduce(reduce(state, { type: "select", value: n }), {
        type: "card",
        column: n - 1,
      });
      steps.push({ caption: `Place numeral ${n}.`, state });
    }
    for (let n = 1; n <= 10; n++)
      for (const slot of expectedSlots(n)) {
        state = reduce(state, { type: "counter", column: n - 1, slot });
        steps.push({
          caption: `Count ${n} beneath its numeral: pairs, then a centered counter if one remains.`,
          state,
        });
      }
    return steps;
  },
};
export default definition;
