import type { ActivityViewProps } from "../../domain/activity";
import type { StudyCopy } from "../../content/en/studies";
import type { StudyConfig } from "./config";
import type { StudyAction, StudyState } from "./model";
import StudyControls from "./StudyControls";

export default function StudyView({
  config,
  copy,
  state,
  dispatch,
  guidance,
}: ActivityViewProps<StudyState, StudyAction> & {
  config: StudyConfig;
  copy: StudyCopy;
}) {
  return (
    <section>
      <p className="activity-instruction">{copy.activity.instruction}</p>
      <div className="study-work work-surface">
        <StudyControls
          config={config}
          copy={copy}
          state={state}
          dispatch={dispatch}
        />
      </div>
      {guidance && <p className="gentle-note">{copy.activity.guidance}</p>}
    </section>
  );
}
