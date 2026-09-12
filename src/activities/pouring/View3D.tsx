import { useMemo } from "react";
import { Vector2, Vector3, Quaternion } from "three";
import type { ActivityViewProps } from "../../domain/activity";
import type { PourState, PourAction } from "./model";
import ActivityStage, { Block } from "../shared/ActivityStage";
import { activityContent } from "../../content/en/activities";
import PourControls from "./PourControls";
import usePouring from "./usePouring";
function Vessel({
  level,
  color,
  pitcher = false,
}: {
  level: number;
  color: string;
  pitcher?: boolean;
}) {
  const profile = useMemo(
    () => [
      new Vector2(0, 0),
      new Vector2(0.34, 0),
      new Vector2(0.43, 1),
      new Vector2(0.38, 1),
      new Vector2(0.3, 0.08),
      new Vector2(0, 0.08),
    ],
    [],
  );
  return (
    <group>
      <mesh castShadow receiveShadow>
        <latheGeometry args={[profile, 40]} />
        <meshStandardMaterial color={color} roughness={0.45} />
      </mesh>
      <mesh position={[-0.47, 0.55, 0]}>
        <torusGeometry args={[0.27, 0.045, 10, 32]} />
        <meshStandardMaterial color={color} roughness={0.45} />
      </mesh>
      {level > 0 && (
        <mesh position={[0, 0.09 + level * 0.004, 0]}>
          <cylinderGeometry
            args={[
              0.3 + level * 0.00075,
              0.3,
              Math.max(0.01, level * 0.008),
              32,
            ]}
          />
          <meshStandardMaterial
            color="#8bb6bd"
            transparent
            opacity={0.85}
            roughness={0.2}
          />
        </mesh>
      )}
      {pitcher && (
        <mesh position={[0.4, 0.95, 0]} rotation={[0, 0, -0.5]} castShadow>
          <coneGeometry args={[0.13, 0.3, 3, 1, true]} />
          <meshStandardMaterial color={color} side={2} />
        </mesh>
      )}
    </group>
  );
}
function Stream({
  from,
  to,
  width,
}: {
  from: Vector3;
  to: Vector3;
  width: number;
}) {
  const direction = to.clone().sub(from),
    mid = from.clone().add(to).multiplyScalar(0.5),
    q = new Quaternion().setFromUnitVectors(
      new Vector3(0, 1, 0),
      direction.clone().normalize(),
    );
  return (
    <mesh position={mid} quaternion={q}>
      <cylinderGeometry args={[width, width * 0.7, direction.length(), 12]} />
      <meshStandardMaterial color="#8bb6bd" transparent opacity={0.8} />
    </mesh>
  );
}
export default function View3D({
  state,
  dispatch,
  guidance,
}: ActivityViewProps<PourState, PourAction>) {
  usePouring(dispatch);
  const angle = ((-state.tilt * Math.PI) / 180) * 0.8;
  // Rotate around the spout so the liquid stream remains physically connected.
  const spout = new Vector3(
    state.overCup ? 1.1 : -0.95,
    state.held ? 2.05 : 1.05,
    0,
  );
  const flowing = state.held && state.tilt > 25 && state.source > 0;
  return (
    <section>
      <p className="activity-instruction">
        Touch the pitcher to pick it up, then touch the cup to position it. Use
        the tilt control to pour slowly.
      </p>
      <ActivityStage
        label="Pouring Exercise in 3D"
        camera={[4.5, 4.8, 6.5]}
        target={[0, 0.7, 0]}
      >
        <Block
          position={[0, 0.045, 0]}
          size={[4.8, 0.09, 2.7]}
          color="#cfb181"
        />
        {[-1.32, 1.32].map((z) => (
          <Block
            key={z}
            position={[0, 0.13, z]}
            size={[4.8, 0.15, 0.06]}
            color="#bd9c6c"
          />
        ))}
        {[-2.37, 2.37].map((x) => (
          <Block
            key={x}
            position={[x, 0.13, 0]}
            size={[0.06, 0.15, 2.6]}
            color="#bd9c6c"
          />
        ))}
        <group
          position={[1.1, 0.1, 0]}
          onClick={(e) => {
            if (e.delta > 5) return;
            e.stopPropagation();
            dispatch({ type: "position", overCup: true });
          }}
        >
          <Vessel level={state.receiver} color="#a9b9a6" />
        </group>
        <group
          position={spout}
          rotation={[0, 0, angle]}
          onClick={(e) => {
            if (e.delta > 5) return;
            e.stopPropagation();
            dispatch({ type: state.held ? "return" : "pick-up" });
          }}
        >
          <group position={[-0.48, -0.95, 0]}>
            <Vessel level={state.source} color="#ebe5d4" pitcher />
          </group>
        </group>
        {flowing && (
          <Stream
            from={spout}
            to={
              new Vector3(
                state.overCup ? 1.1 : -0.65,
                state.overCup ? 1.05 : 0.12,
                0,
              )
            }
            width={0.018 + (state.tilt - 25) * 0.0007}
          />
        )}
        {state.spilled > 0 && (
          <mesh
            position={[-0.55, 0.1, 0.15]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[0.25 + state.spilled * 0.007, 0.25, 1]}
          >
            <circleGeometry args={[1, 32]} />
            <meshStandardMaterial color="#91b9c0" transparent opacity={0.7} />
          </mesh>
        )}
        <group
          position={[-2, 0.14, 0.8]}
          rotation={[0, 0.2, 0]}
          onClick={(e) => {
            if (e.delta > 5) return;
            e.stopPropagation();
            dispatch({ type: "wipe" });
          }}
        >
          <Block
            position={[0, 0, 0]}
            size={[0.5, 0.055, 0.55]}
            color="#e2e5d9"
          />
          {[-0.15, 0, 0.15].map((x) => (
            <Block
              key={x}
              position={[x, 0.03, 0]}
              size={[0.01, 0.006, 0.53]}
              color="#b9c4b4"
            />
          ))}
        </group>
      </ActivityStage>
      <div className="pour-3d-controls">
        <div className="water-levels" aria-label="Water levels">
          <span>
            Pitcher <strong>{Math.round(state.source)}%</strong>
          </span>
          <span>
            Cup <strong>{Math.round(state.receiver)}%</strong>
          </span>
        </div>
        <PourControls state={state} dispatch={dispatch} />
      </div>
      {guidance && (
        <p className="gentle-note">{activityContent.pouring.guidance}</p>
      )}
    </section>
  );
}
