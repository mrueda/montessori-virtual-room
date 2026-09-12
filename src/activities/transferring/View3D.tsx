import { Vector2 } from "three";
import type { ActivityViewProps } from "../../domain/activity";
import type { TransferState, TransferAction } from "./model";
import { TransferControls } from "./index";
import ActivityStage, { Block, SelectionRing } from "../shared/ActivityStage";
import { activityContent } from "../../content/en/activities";
const profile = [
  new Vector2(0, 0),
  new Vector2(0.58, 0),
  new Vector2(0.95, 0.48),
  new Vector2(0.88, 0.49),
  new Vector2(0.52, 0.09),
  new Vector2(0, 0.09),
];
export default function View3D({
  state,
  dispatch,
  guidance,
}: ActivityViewProps<TransferState, TransferAction>) {
  return (
    <section>
      <p className="activity-instruction">
        Choose a wooden object, then touch the other bowl to move it.
      </p>
      <ActivityStage label="Bowl Transferring in 3D" camera={[3.5, 5.8, 6]}>
        <Block position={[0, 0.025, 0]} size={[5, 0.05, 2.8]} color="#d9c5a0" />
        {(["left", "right"] as const).map((bowl, i) => (
          <group
            key={bowl}
            position={[i === 0 ? -1.35 : 1.35, 0.07, 0]}
            onClick={(e) => {
              if (e.delta > 5) return;
              e.stopPropagation();
              dispatch({ type: "place", bowl });
            }}
          >
            <mesh castShadow receiveShadow>
              <latheGeometry args={[profile, 40]} />
              <meshStandardMaterial color="#d1ae76" roughness={0.75} />
            </mesh>
            {state.bowls.map((b, id) => {
              if (b !== bowl) return null;
              const x = ((id % 3) - 1) * 0.36,
                z = (Math.floor(id / 3) - 0.5) * 0.38;
              return (
                <group
                  key={id}
                  position={[x, state.selected === id ? 0.72 : 0.3, z]}
                  onClick={(e) => {
                    if (e.delta > 5) return;
                    e.stopPropagation();
                    dispatch({ type: "select", id });
                  }}
                >
                  <mesh castShadow>
                    <sphereGeometry args={[0.17, 24, 16]} />
                    <meshStandardMaterial color="#c99860" roughness={0.8} />
                  </mesh>
                  {state.selected === id && (
                    <SelectionRing position={[0, -0.18, 0]} radius={0.23} />
                  )}
                </group>
              );
            })}
          </group>
        ))}
      </ActivityStage>
      <TransferControls state={state} dispatch={dispatch} />
      {guidance && (
        <p className="gentle-note">{activityContent.transferring.guidance}</p>
      )}
    </section>
  );
}
