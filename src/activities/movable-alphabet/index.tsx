import type {
  ActivityDefinition,
  ActivityViewProps,
} from "../../domain/activity";
import {
  alphabetCopy as c,
  expansionActivityContent,
  wordPrompts,
} from "../../content/en/expansion";
import {
  initialState,
  reduce,
  isComplete,
  checkWork,
  letters,
  remaining,
} from "./model";
import type { State, Action } from "./model";
const copy = expansionActivityContent["movable-alphabet"];
function View({ state, dispatch, guidance }: ActivityViewProps<State, Action>) {
  const prompt = wordPrompts[state.prompt];
  return (
    <section className="elementary-work alphabet-work">
      <p className="work-instruction">{copy.instruction}</p>
      {guidance && <p className="guidance-note">{copy.guidance}</p>}
      <div className="work-controls">
        <label className="work-select">
          {c.promptLabel}{" "}
          <select
            value={state.prompt}
            onChange={(e) =>
              dispatch({ type: "prompt", index: Number(e.target.value) })
            }
          >
            <option value={-1}>{c.free}</option>
            {wordPrompts.map((p, i) => (
              <option key={p.word} value={i}>
                {p.label}
              </option>
            ))}
          </select>
        </label>
        <button
          className="secondary-button"
          disabled={!state.selected}
          onClick={() => dispatch({ type: "return" })}
        >
          {c.returnLetter}
        </button>
      </div>
      {prompt && (
        <div className="alphabet-object">
          <svg viewBox="0 0 160 110" role="img" aria-label={prompt.word}>
            <title>{prompt.word}</title>
            {prompt.word === "sun" ? (
              <g stroke="#c99236" strokeWidth="4">
                <circle cx="80" cy="55" r="23" fill="#e4b952" />
                {Array.from({ length: 8 }, (_, i) => (
                  <path
                    key={i}
                    d="M80 13v10"
                    transform={`rotate(${i * 45} 80 55)`}
                  />
                ))}
              </g>
            ) : prompt.word === "cat" ? (
              <g fill="#b3977b" stroke="#6e5b4b" strokeWidth="2">
                <path d="M49 48L43 18 67 35Q80 29 93 35L117 18 111 48Q123 88 80 92Q37 88 49 48Z" />
                <g fill="#394539">
                  <ellipse cx="65" cy="57" rx="3" ry="5" />
                  <ellipse cx="95" cy="57" rx="3" ry="5" />
                </g>
                <path
                  d="m75 70 5 5 5-5M80 75v7M53 74l-23-5m24 12-24 3m77-10 23-5m-24 12 24 3"
                  fill="none"
                />
              </g>
            ) : (
              <g stroke="#637b69" strokeWidth="2">
                <path
                  d="m25 25 36-9 38 12 36-10v68l-36 10-38-12-36 9z"
                  fill="#eee3bd"
                />
                <path d="m61 16v68m38-56v68M30 70q40-50 98-20" fill="none" />
                <circle cx="108" cy="47" r="5" fill="#c28173" />
              </g>
            )}
          </svg>
          <p>{prompt.label}</p>
          <small>{c.sayObject}</small>
        </div>
      )}
      <p className="alphabet-selection" role="status">
        {state.selected
          ? `${c.selected} ${state.selected}. ${c.place}`
          : c.select}
      </p>
      <div className="alphabet-mat" role="group" aria-label={c.mat}>
        {state.slots.map((letter, i) => (
          <button
            key={i}
            className={`alphabet-slot ${letter ? "has-letter" : ""} ${letter && "aeiou".includes(letter) ? "vowel" : "consonant"}`}
            aria-pressed={state.from === i}
            aria-label={
              letter
                ? `Select ${letter} at row ${Math.floor(i / 12) + 1}, place ${(i % 12) + 1}`
                : `Place letter at row ${Math.floor(i / 12) + 1}, place ${(i % 12) + 1}`
            }
            onClick={() => dispatch({ type: "slot", index: i })}
          >
            {letter || <span aria-hidden="true">·</span>}
          </button>
        ))}
      </div>
      <h2 className="work-subheading">{c.box}</h2>
      <div className="alphabet-box" role="group" aria-label={c.box}>
        {letters.map((letter) => (
          <button
            key={letter}
            className={`alphabet-letter ${"aeiou".includes(letter) ? "vowel" : "consonant"}`}
            disabled={remaining(state, letter) === 0}
            aria-pressed={state.selected === letter && state.from === null}
            aria-label={`Choose letter ${letter}, ${remaining(state, letter)} remaining`}
            onClick={() => dispatch({ type: "choose", letter })}
          >
            {letter}
            <small>{remaining(state, letter)}</small>
          </button>
        ))}
      </div>
      <p className="work-caption">{c.finish}</p>
    </section>
  );
}
const definition: ActivityDefinition<State, Action> = {
  id: "movable-alphabet",
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
    let state = reduce(initialState(), { type: "prompt", index: 0 });
    const steps = [{ caption: c.example[0], state }];
    for (const [index, letter] of [..."sun"].entries()) {
      state = reduce(state, { type: "choose", letter });
      steps.push({ caption: c.example[index + 1], state });
      state = reduce(state, { type: "slot", index });
      steps.push({ caption: c.place, state });
    }
    steps.push({ caption: c.example[4], state });
    for (let index = 0; index < 3; index++) {
      state = reduce(state, { type: "slot", index });
      state = reduce(state, { type: "return" });
      steps.push({ caption: c.finish, state });
    }
    return steps;
  },
};
export default definition;
