import { useEffect, useMemo, useState } from "react";
import type { ActivityDefinition } from "../../domain/activity";
export default function WorkedExample<S, A>({
  definition,
  onClose,
}: {
  definition: ActivityDefinition<S, A>;
  onClose: () => void;
}) {
  const steps = useMemo(() => definition.example!(), [definition]);
  const [index, setIndex] = useState(0),
    [playing, setPlaying] = useState(false);
  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(
      () => setIndex((i) => Math.min(i + 1, steps.length - 1)),
      1400,
    );
    return () => window.clearInterval(timer);
  }, [playing, steps.length]);
  useEffect(() => {
    if (index === steps.length - 1) setPlaying(false);
  }, [index, steps.length]);
  const View = definition.View;
  return (
    <section className="worked-example" aria-label="Moving example">
      <div className="work-controls">
        <button
          className="secondary-button"
          onClick={() => {
            if (index === steps.length - 1) setIndex(0);
            setPlaying(!playing);
          }}
        >
          {playing ? "Pause example" : "Play example"}
        </button>
        <button
          className="secondary-button"
          disabled={index === 0}
          onClick={() => {
            setPlaying(false);
            setIndex((i) => i - 1);
          }}
        >
          Previous step
        </button>
        <button
          className="secondary-button"
          disabled={index === steps.length - 1}
          onClick={() => {
            setPlaying(false);
            setIndex((i) => i + 1);
          }}
        >
          Next step
        </button>
        <button className="secondary-button" onClick={onClose}>
          Return to my work
        </button>
      </div>
      <p className="example-caption" role="status">
        {steps[index].caption}
      </p>
      <div inert className="example-surface">
        <View state={steps[index].state} dispatch={() => {}} guidance={false} />
      </div>
    </section>
  );
}
