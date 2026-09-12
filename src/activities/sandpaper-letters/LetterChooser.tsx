import { letters } from "./model";
import type { LetterAction, LetterState } from "./model";

export default function LetterChooser({
  state,
  dispatch,
}: {
  state: LetterState;
  dispatch: (action: LetterAction) => void;
}) {
  return (
    <div className="letter-chooser" aria-label="Sandpaper letter cards">
      {letters.map((letter) => (
        <button
          key={letter}
          aria-label={`Choose letter ${letter}`}
          aria-pressed={state.selected === letter}
          onClick={() => dispatch({ type: "select", letter })}
        >
          <span>{letter}</span>
          <small>{state.traced.includes(letter) ? "explored" : "choose"}</small>
        </button>
      ))}
    </div>
  );
}
