import { waterPoint } from "./geometry";
import { useMemo } from "react";
import { Vector2 } from "three";
import type { ActivityViewProps } from "../../domain/activity";
import type { State, Action } from "./model";
import { formsCopy as c, formPairs } from "../../content/en/expansion";
import ActivityStage from "../shared/ActivityStage";
import Controls from "./Controls";
import TrayModel from "./TrayModel";
function Pitcher({ state }: { state: State }) {
  const profile = useMemo(
    () => [
      new Vector2(0, 0),
      new Vector2(0.17, 0),
      new Vector2(0.22, 0.55),
      new Vector2(0.195, 0.55),
      new Vector2(0.15, 0.04),
      new Vector2(0, 0.04),
    ],
    [],
  );
  const trayX = state.target === null ? 0 : (state.target - 0.5) * 2.6;
  const [waterX, waterY] =
    state.target === null ? [0, 0] : waterPoint(state.pair, state.target);
  const waterZ = -waterY;
  const x = state.held ? trayX + waterX : 0,
    y = state.held ? 1.55 : 0.6,
    z = state.held ? waterZ : 1.8;
  const flowing = state.held && state.tilt > 25 && state.source > 0;
  return (
    <>
      {/* Pivot around the spout: the stream stays connected while the vessel tilts. */}
      <group
        position={[x, y, z]}
        rotation={[0, 0, (-state.tilt * Math.PI) / 180]}
      >
        <group position={[-0.25, -0.55, 0]}>
          <mesh castShadow>
            <latheGeometry args={[profile, 32]} />
            <meshStandardMaterial color="#f1eddb" roughness={0.5} />
          </mesh>
          <mesh position={[-0.26, 0.29, 0]}>
            <torusGeometry args={[0.17, 0.035, 8, 20]} />
            <meshStandardMaterial color="#ded8bf" />
          </mesh>
          <mesh position={[0.21, 0.52, 0]} rotation={[0, 0, -0.7]}>
            <coneGeometry args={[0.09, 0.16, 3, 1, true]} />
            <meshStandardMaterial color="#f1eddb" side={2} />
          </mesh>
          {state.source > 0 && (
            <mesh
              position={[0, 0.06 + state.source * 0.004, 0]}
              rotation={[-Math.PI / 2, 0, 0]}
            >
              <circleGeometry args={[0.16, 24]} />
              <meshStandardMaterial color="#6babbc" side={2} />
            </mesh>
          )}
        </group>
      </group>
      {flowing && (
        <mesh position={[x, 0.87, z]}>
          <cylinderGeometry args={[0.018, 0.035, 1.36, 12]} />
          <meshStandardMaterial color="#76b9cc" />
        </mesh>
      )}
    </>
  );
}
export default function View3D(props: ActivityViewProps<State, Action>) {
  const { state, dispatch } = props;
  return (
    <section className="elementary-work forms-work">
      <Controls {...props} />
      <ActivityStage label="Land and Water Forms in 3D" camera={[0, 3.8, 4.8]}>
        {[0, 1].map((side) => (
          <group
            key={side}
            position={[(side - 0.5) * 2.6, 0, 0]}
            onClick={(e) => {
              if (e.delta > 5) return;
              e.stopPropagation();
              dispatch({ type: "target", side: side as 0 | 1 });
            }}
          >
            <TrayModel
              pair={state.pair}
              side={side}
              level={state.levels[side]}
            />
          </group>
        ))}
        <Pitcher state={state} />
      </ActivityStage>
      <div className="form-labels">
        {formPairs[state.pair].names.map((name) => (
          <h2 key={name}>{name}</h2>
        ))}
      </div>
      <p className="form-observation">{formPairs[state.pair].observation}</p>
      <p className="work-caption">{c.limitation}</p>
    </section>
  );
}
