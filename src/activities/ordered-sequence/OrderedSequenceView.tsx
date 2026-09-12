import type { ActivityViewProps } from "../../domain/activity";
import type { CSSProperties } from "react";
import type {
  OrderedSequenceAction,
  OrderedSequenceState,
  SequenceSize,
} from "./model";

export type OrderedVariant = "red-rods" | "broad-stair" | "number-rods";

const labels: Record<OrderedVariant, { singular: string; plural: string }> = {
  "red-rods": { singular: "rod", plural: "rods" },
  "broad-stair": { singular: "prism", plural: "prisms" },
  "number-rods": { singular: "rod", plural: "rods" },
};

function Piece({
  size,
  variant,
}: {
  size: SequenceSize;
  variant: OrderedVariant;
}) {
  return (
    <span
      className={`sequence-piece ${variant}`}
      style={{ "--sequence-size": size } as CSSProperties}
      aria-hidden="true"
    >
      {variant === "number-rods" &&
        Array.from({ length: size }, (_, index) => (
          <span key={index} className={index % 2 ? "blue" : "red"} />
        ))}
    </span>
  );
}

export function SequenceControls({
  state,
  dispatch,
  variant,
}: {
  state: OrderedSequenceState;
  dispatch: (action: OrderedSequenceAction) => void;
  variant: OrderedVariant;
}) {
  const noun = labels[variant].singular;
  return (
    <div className="sequence-keyboard-controls">
      <button
        className="primary-button"
        disabled={state.selected === null}
        onClick={() => dispatch({ type: "place" })}
      >
        {state.selected === null
          ? `Choose a ${noun}`
          : `Place ${noun} ${state.selected}`}
      </button>
      <span aria-live="polite">
        {state.placed.length} of 10 {labels[variant].plural} placed
      </span>
    </div>
  );
}

export function SequenceKeyboardChoices({
  state,
  dispatch,
  variant,
}: {
  state: OrderedSequenceState;
  dispatch: (action: OrderedSequenceAction) => void;
  variant: OrderedVariant;
}) {
  const noun = labels[variant].singular;
  return (
    <div
      className="sequence-spatial-choices"
      aria-label={`${labels[variant].plural} controls`}
    >
      {state.loose.map((size) => (
        <button
          key={`select-${size}`}
          className="material-choice"
          aria-pressed={state.selected === size}
          onClick={() => dispatch({ type: "select", size })}
        >
          Select {noun} {size}
        </button>
      ))}
      {state.placed.map((size) => (
        <button
          key={`return-${size}`}
          className="material-choice"
          onClick={() => dispatch({ type: "return", size })}
        >
          Return {noun} {size}
        </button>
      ))}
    </div>
  );
}

export default function OrderedSequenceView({
  state,
  dispatch,
  guidance,
  variant,
  instruction,
  guidanceText,
}: ActivityViewProps<OrderedSequenceState, OrderedSequenceAction> & {
  variant: OrderedVariant;
  instruction: string;
  guidanceText: string;
}) {
  const noun = labels[variant].singular;
  return (
    <section>
      <p className="activity-instruction">{instruction}</p>
      <div className={`ordered-sequence-work work-surface ${variant}`}>
        <div
          className="sequence-work-area"
          aria-label={`Placed ${labels[variant].plural}`}
        >
          {state.placed.length === 0 && (
            <p>Begin with the largest. Leave room for the full sequence.</p>
          )}
          {state.placed.map((size) => (
            <button
              key={size}
              className="sequence-placed-piece"
              aria-label={`Return ${noun} ${size} to the tray`}
              onClick={() => dispatch({ type: "return", size })}
            >
              <Piece size={size} variant={variant} />
            </button>
          ))}
        </div>
        <div
          className="sequence-tray"
          aria-label={`Loose ${labels[variant].plural}`}
        >
          {state.loose.map((size) => (
            <button
              key={size}
              aria-label={`Select ${noun} ${size}`}
              aria-pressed={state.selected === size}
              onClick={() => dispatch({ type: "select", size })}
            >
              <Piece size={size} variant={variant} />
            </button>
          ))}
        </div>
      </div>
      <SequenceControls state={state} dispatch={dispatch} variant={variant} />
      {guidance && <p className="gentle-note">{guidanceText}</p>}
    </section>
  );
}
