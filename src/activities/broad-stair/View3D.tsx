import type { ActivityViewProps } from "../../domain/activity";
import { activityContent } from "../../content/en/activities";
import OrderedSequence3D from "../ordered-sequence/OrderedSequence3D";
import type {
  OrderedSequenceAction,
  OrderedSequenceState,
} from "../ordered-sequence/model";

export default function View3D(
  props: ActivityViewProps<OrderedSequenceState, OrderedSequenceAction>,
) {
  return (
    <OrderedSequence3D
      {...props}
      variant="broad-stair"
      guidanceText={activityContent["broad-stair"].guidance}
    />
  );
}
