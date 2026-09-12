import type { ActivityDefinition } from "../../domain/activity";
import { studyCopy } from "../../content/en/studies";
import type { StudyConfig, StudyMaterialId } from "./config";
import { initialState, isComplete, reduce } from "./model";
import type { StudyAction, StudyState } from "./model";
import StudyView from "./StudyView";
import StudyView3D from "./StudyView3D";

export function createStudyDefinition(
  config: StudyConfig,
): ActivityDefinition<StudyState, StudyAction> {
  const copy = studyCopy[config.id as StudyMaterialId];
  return {
    id: config.id,
    version: 1,
    requiredAssets: [],
    demonstration: () =>
      import("./studyDemonstration").then((module) =>
        module.createStudyDemonstration(config, copy),
      ),
    initialState,
    reduce: (state, action) => reduce(config, state, action),
    isComplete: (state) => isComplete(config, state),
    guidance: copy.activity.guidance,
    View: (props) => <StudyView {...props} config={config} copy={copy} />,
    View3D: (props) => <StudyView3D {...props} config={config} copy={copy} />,
  };
}

export type { StudyAction, StudyState } from "./model";
