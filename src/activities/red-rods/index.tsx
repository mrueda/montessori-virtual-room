import { sequenceCheck } from "../shared/checkWork";
import { lazy } from "react";
import type {
  ActivityDefinition,
  ActivityViewProps,
} from "../../domain/activity";
import { activityContent } from "../../content/en/activities";
import OrderedSequenceView from "../ordered-sequence/OrderedSequenceView";
import { initialState, isComplete, reduce } from "../ordered-sequence/model";
import type {
  OrderedSequenceAction,
  OrderedSequenceState,
} from "../ordered-sequence/model";

const copy = activityContent["red-rods"];

function View(
  props: ActivityViewProps<OrderedSequenceState, OrderedSequenceAction>,
) {
  return (
    <OrderedSequenceView
      {...props}
      variant="red-rods"
      instruction={copy.instruction}
      guidanceText={copy.guidance}
    />
  );
}

const definition: ActivityDefinition<
  OrderedSequenceState,
  OrderedSequenceAction
> = {
  id: "red-rods",
  version: 1,
  requiredAssets: [],
  demonstration: () =>
    import("../../content/demonstrations").then(
      (module) => module.demonstrations["red-rods"],
    ),
  initialState,
  reduce,
  isComplete,
  checkWork: sequenceCheck,
  guidance: copy.guidance,
  View,
  View3D: lazy(() => import("./View3D")),
};

export default definition;
