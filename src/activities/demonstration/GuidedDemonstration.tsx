import { useEffect, useMemo, useRef, useState } from "react";
import { Pause, Play, RotateCcw, SkipBack, SkipForward, X } from "lucide-react";
import type { Demonstration } from "../../domain/demonstration";
import ActivityStage from "../shared/ActivityStage";
import DemoObjectMesh from "./DemoScene";
import { durationOf, sample } from "./timeline";
export default function GuidedDemonstration({
  load,
  title,
  onClose,
}: {
  load: () => Promise<Demonstration>;
  title: string;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null),
    [demo, setDemo] = useState<Demonstration | null>(null),
    [failed, setFailed] = useState(false);
  const [reduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [playing, setPlaying] = useState(!reduced),
    [time, setTime] = useState(0),
    [speed, setSpeed] = useState(1);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    dialog.current?.showModal();
    return () => {
      dialog.current?.close();
      previous?.focus();
    };
  }, []);
  useEffect(() => {
    let active = true;
    load()
      .then((d) => {
        if (active) setDemo(d);
      })
      .catch(() => {
        if (active) setFailed(true);
      });
    return () => {
      active = false;
    };
  }, [load]);
  const total = demo ? durationOf(demo) : 0;
  useEffect(() => {
    if (!demo || !playing) return;
    let previous = performance.now();
    const timer = window.setInterval(() => {
      const now = performance.now();
      if (!document.hidden)
        setTime((t) =>
          Math.min(total, t + Math.min(100, now - previous) * speed),
        );
      previous = now;
    }, 33);
    return () => window.clearInterval(timer);
  }, [demo, playing, total, speed]);
  useEffect(() => {
    if (total && time >= total) setPlaying(false);
  }, [time, total]);
  const snapshot = useMemo(
    () => (demo ? sample(demo, time, reduced) : null),
    [demo, time, reduced],
  );
  const stepStarts = useMemo(() => {
    let elapsed = 0;
    return (
      demo?.steps.map((step) => {
        const start = elapsed;
        elapsed += step.duration;
        return start;
      }) ?? []
    );
  }, [demo]);
  function goToStep(index: number) {
    setPlaying(false);
    setTime(stepStarts[index] ?? 0);
  }
  return (
    <dialog
      ref={dialog}
      className="demonstration-dialog"
      aria-labelledby="demo-title"
      onCancel={onClose}
    >
      <div className="demo-header">
        <div>
          <p className="eyebrow">WATCH THE MOVEMENT</p>
          <h2 id="demo-title">{title} · a demonstration</h2>
        </div>
        <button
          className="icon-button"
          aria-label="Close demonstration"
          onClick={onClose}
        >
          <X size={19} />
        </button>
      </div>
      <p className="demo-context">
        A separate example of the virtual exercise. Your own work is waiting
        exactly as you left it.
      </p>
      {demo && snapshot ? (
        <>
          <ActivityStage
            label={`${title} animated demonstration`}
            camera={demo.camera ?? [4, 6, 8]}
            target={demo.target ?? [0, 0.45, 0]}
            fallbackMessage="The 3D demonstration is unavailable on this device. You can read the steps below or return to your work."
          >
            {demo.objects.map((object) => {
              const pose = snapshot.poses[object.id];
              return (
                <group
                  key={object.id}
                  position={pose.position}
                  rotation={pose.rotation}
                  scale={pose.scale}
                >
                  <DemoObjectMesh object={object} />
                </group>
              );
            })}
          </ActivityStage>
          <p className="demo-caption" role="status">
            {snapshot.complete
              ? "The example is complete. Return to your work whenever you are ready."
              : demo.steps[snapshot.index].caption}
          </p>
          <div className="demo-playback-settings">
            <span>
              Step {snapshot.index + 1} of {demo.steps.length}
            </span>
            {!reduced && (
              <label>
                Movement speed
                <select
                  value={speed}
                  onChange={(event) => setSpeed(Number(event.target.value))}
                >
                  <option value={0.5}>Slow</option>
                  <option value={1}>Gentle</option>
                </select>
              </label>
            )}
          </div>
          <div className="demo-controls">
            <button
              className="secondary-button"
              disabled={time === 0}
              onClick={() =>
                goToStep(
                  snapshot.complete
                    ? snapshot.index
                    : Math.max(0, snapshot.index - 1),
                )
              }
            >
              <SkipBack size={16} /> Previous step
            </button>
            <button
              className="secondary-button"
              disabled={snapshot.complete}
              onClick={() => setPlaying((p) => !p)}
            >
              {playing ? <Pause size={16} /> : <Play size={16} />}{" "}
              {playing ? "Pause demonstration" : "Play demonstration"}
            </button>
            <button
              className="secondary-button"
              disabled={snapshot.complete}
              onClick={() => {
                setPlaying(false);
                setTime(
                  demo.steps
                    .slice(0, snapshot.index + 1)
                    .reduce((t, s) => t + s.duration, 0),
                );
              }}
            >
              <SkipForward size={16} /> Next step
            </button>
            <button
              className="text-button"
              onClick={() => {
                setTime(0);
                setPlaying(!reduced);
              }}
            >
              <RotateCcw size={15} /> Replay
            </button>
            <button className="primary-button" onClick={onClose}>
              Return to my work
            </button>
          </div>
          {reduced && (
            <p className="demo-footnote">
              Reduced motion is enabled. Steps change without animated travel;
              use Next step at your own pace.
            </p>
          )}
          <details className="demo-transcript">
            <summary>Explore the demonstration steps</summary>
            <ol>
              {demo.steps.map((s, i) => (
                <li key={i}>
                  <button
                    aria-current={snapshot.index === i ? "step" : undefined}
                    onClick={() => goToStep(i)}
                  >
                    <span className="demo-step-number" aria-hidden="true">
                      {i + 1}
                    </span>
                    <span>{s.caption}</span>
                  </button>
                </li>
              ))}
            </ol>
          </details>
        </>
      ) : (
        <p className="loading">
          {failed
            ? "This demonstration could not load. Close it to continue your work."
            : "Preparing the demonstration…"}
        </p>
      )}
      <p className="demo-footnote">
        Virtual solution draft · a full real-world Montessori presentation also
        includes preparation, handling, and restoring the environment.
      </p>
    </dialog>
  );
}
