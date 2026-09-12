import WorkedExample from "./shared/WorkedExample";
import {
  Suspense,
  lazy,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import {
  ArrowLeft,
  RotateCcw,
  Lightbulb,
  Play,
  ClipboardCheck,
} from "lucide-react";
import { content } from "../content/en/materials";
import { activityContent } from "../content/en/activities";
import { materials } from "../content/materials";
import type { MaterialId } from "../domain/material";
import type { ActivityDefinition, ProgressEvent } from "../domain/activity";
const GuidedDemonstration = lazy(
  () => import("./demonstration/GuidedDemonstration"),
);
export default function ActivityHost<S, A>({
  definition,
  materialId,
  onExit,
  onProgress,
}: {
  definition: ActivityDefinition<S, A>;
  materialId: MaterialId;
  onExit: () => void;
  onProgress: (event: ProgressEvent) => void;
}) {
  const [state, dispatch] = useReducer(
    (s: S, a: { type: "reset" } | { type: "action"; action: A }) =>
      a.type === "reset"
        ? definition.initialState()
        : definition.reduce(s, a.action),
    undefined,
    definition.initialState,
  );
  const [checked, setChecked] = useState<{ state: S; message: string } | null>(
    null,
  );
  const [dimension, setDimension] = useState<"2d" | "3d">("2d");
  const [demonstrating, setDemonstrating] = useState(false);
  const [guidance, setGuidance] = useState(false);
  const complete = definition.isComplete(state),
    wasComplete = useRef(false),
    started = useRef(false);
  useEffect(() => {
    if (!started.current) {
      onProgress({
        type: "started",
        activityId: definition.id,
        version: definition.version,
        timestamp: new Date().toISOString(),
      });
      started.current = true;
    }
  }, [definition, onProgress]);
  useEffect(() => {
    if (complete && !wasComplete.current)
      onProgress({
        type: "completed",
        activityId: definition.id,
        version: definition.version,
        timestamp: new Date().toISOString(),
      });
    wasComplete.current = complete;
  }, [complete, definition, onProgress]);
  const sendAction = useCallback(
    (action: A) => dispatch({ type: "action", action }),
    [],
  );
  const View =
    dimension === "3d" && definition.View3D
      ? definition.View3D
      : definition.View;
  return (
    <main className="activity-page">
      <button className="text-button" onClick={onExit}>
        <ArrowLeft size={16} /> Back to the classroom
      </button>
      <div className="activity-heading">
        <div>
          <p className="eyebrow">
            {materials.find((m) => m.id === materialId)?.area} · A MOMENT TO
            CONCENTRATE
          </p>
          <h1>{content[materialId].name}</h1>
        </div>
        <div className="activity-actions">
          {definition.View3D && (
            <div
              className="dimension-switch"
              role="group"
              aria-label="Activity view"
            >
              <button
                aria-pressed={dimension === "2d"}
                onClick={() => setDimension("2d")}
              >
                2D
              </button>
              <button
                aria-pressed={dimension === "3d"}
                onClick={() => setDimension("3d")}
              >
                3D
              </button>
            </div>
          )}
          <button
            className="secondary-button"
            aria-controls="activity-feedback"
            disabled={demonstrating}
            onClick={() =>
              setChecked({
                state,
                message:
                  definition.checkWork?.(state) ??
                  activityContent[materialId].guidance,
              })
            }
          >
            <ClipboardCheck size={17} /> Check my work
          </button>
          <button
            className="secondary-button"
            aria-pressed={guidance}
            onClick={() => setGuidance(!guidance)}
          >
            <Lightbulb size={17} /> Guidance
          </button>
          <button
            className="secondary-button"
            onClick={() => {
              dispatch({ type: "reset" });
              setDemonstrating(false);
              setChecked(null);
              onProgress({
                type: "reset",
                activityId: definition.id,
                version: definition.version,
                timestamp: new Date().toISOString(),
              });
            }}
          >
            <RotateCcw size={16} /> Start again
          </button>
        </div>
      </div>
      <div
        id="activity-feedback"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {!demonstrating && (complete || checked) && (
          <div
            className={`activity-feedback ${complete ? "work-complete" : ""}`}
          >
            <h2>
              {complete
                ? (definition.completionHeading ?? "Activity complete")
                : checked?.state === state
                  ? "A closer look at your work"
                  : "Ready for another look?"}
            </h2>
            <p>
              {complete
                ? activityContent[materialId].completion
                : checked?.state === state
                  ? checked.message
                  : "You’ve continued exploring. Check again when you’re ready to review your work."}
            </p>
            {complete && (
              <span>
                You can explore further, repeat, or return to the classroom.
              </span>
            )}
          </div>
        )}
      </div>
      {guidance && (definition.demonstration || definition.example) && (
        <div className="guidance-demo-invitation">
          <div>
            <h3>See the movement, one step at a time.</h3>
            <p>Watch a separate example, then continue your own work.</p>
          </div>
          <button
            className="secondary-button"
            onClick={() => setDemonstrating(true)}
          >
            <Play size={17} /> Watch a demonstration
          </button>
        </div>
      )}
      <Suspense
        fallback={<p className="loading">Preparing your 3D work mat…</p>}
      >
        {demonstrating && definition.example ? (
          <WorkedExample
            definition={definition}
            View={View}
            onClose={() => setDemonstrating(false)}
          />
        ) : demonstrating && definition.demonstration ? (
          <GuidedDemonstration
            load={definition.demonstration}
            title={content[materialId].name}
            onClose={() => setDemonstrating(false)}
          />
        ) : (
          <View state={state} dispatch={sendAction} guidance={guidance} />
        )}
      </Suspense>
      <p className="completion-note" aria-hidden={complete || undefined}>
        {complete
          ? activityContent[materialId].completion
          : "Take your time. This space is yours."}
      </p>
    </main>
  );
}
