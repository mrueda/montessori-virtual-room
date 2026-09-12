import { useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import type { LetterAction, LetterState } from "./model";

interface Point {
  x: number;
  y: number;
}

function pointFromEvent(event: ReactPointerEvent<HTMLDivElement>): Point {
  const bounds = event.currentTarget.getBoundingClientRect();
  return {
    x: ((event.clientX - bounds.left) / bounds.width) * 320,
    y: ((event.clientY - bounds.top) / bounds.height) * 240,
  };
}

export default function TracePad({
  state,
  dispatch,
}: {
  state: LetterState;
  dispatch: (action: LetterAction) => void;
}) {
  const [points, setPoints] = useState<Point[]>([]);
  const activePointer = useRef<number | null>(null);
  const distance = useRef(0);
  const completed = state.traced.includes(state.selected);

  useEffect(() => {
    setPoints([]);
    activePointer.current = null;
    distance.current = 0;
  }, [state.selected]);

  const begin = (event: ReactPointerEvent<HTMLDivElement>) => {
    activePointer.current = event.pointerId;
    event.currentTarget.setPointerCapture(event.pointerId);
    distance.current = 0;
    setPoints([pointFromEvent(event)]);
  };

  const move = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (activePointer.current !== event.pointerId) return;
    const next = pointFromEvent(event);
    setPoints((current) => {
      const previous = current.at(-1);
      if (previous)
        distance.current += Math.hypot(
          next.x - previous.x,
          next.y - previous.y,
        );
      return [...current.slice(-139), next];
    });
    if (distance.current >= 170 && !completed)
      dispatch({ type: "trace", letter: state.selected });
  };

  const end = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (activePointer.current !== event.pointerId) return;
    activePointer.current = null;
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  return (
    <div className="letter-trace-area">
      <div
        className={completed ? "letter-trace-pad traced" : "letter-trace-pad"}
        role="img"
        aria-label={`Tracing surface for ${state.selected}`}
        onPointerDown={begin}
        onPointerMove={move}
        onPointerUp={end}
        onPointerCancel={end}
      >
        <span aria-hidden="true">{state.selected}</span>
        <svg viewBox="0 0 320 240" aria-hidden="true">
          <polyline
            points={points.map((point) => `${point.x},${point.y}`).join(" ")}
          />
        </svg>
      </div>
      <button
        className="secondary-button letter-keyboard-action"
        disabled={completed}
        onClick={() => dispatch({ type: "trace", letter: state.selected })}
      >
        {completed
          ? `${state.selected} explored`
          : `Complete ${state.selected} with keyboard`}
      </button>
    </div>
  );
}
