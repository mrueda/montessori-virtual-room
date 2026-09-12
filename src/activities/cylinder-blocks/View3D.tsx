import { useMemo } from "react";
import { Shape, Path } from "three";
import type { ActivityViewProps } from "../../domain/activity";
import type { CylinderState, CylinderAction } from "./model";
import { sizes } from "./model";
import ActivityStage, { SelectionRing } from "../shared/ActivityStage";
import { activityContent } from "../../content/en/activities";
const radius = (size: number) => 0.075 + size * 0.023;
function Cylinder({ size }: { size: number }) {
  return (
    <>
      <mesh position={[0, 0.175, 0]} castShadow>
        <cylinderGeometry args={[radius(size), radius(size), 0.35, 32]} />
        <meshStandardMaterial color="#dbba83" roughness={0.75} />
      </mesh>
      <mesh position={[0, 0.405, 0]} castShadow>
        <sphereGeometry args={[0.064, 16, 12]} />
        <meshStandardMaterial color="#c9a16a" />
      </mesh>
      <mesh position={[0, 0.36, 0]}>
        <cylinderGeometry args={[0.03, 0.035, 0.065, 12]} />
        <meshStandardMaterial color="#bb915c" />
      </mesh>
    </>
  );
}
export default function View3D({
  state,
  dispatch,
  guidance,
}: ActivityViewProps<CylinderState, CylinderAction>) {
  const shape = useMemo(() => {
    const shape = new Shape();
    shape.moveTo(-3.5, -0.55);
    shape.lineTo(3.5, -0.55);
    shape.lineTo(3.5, 0.55);
    shape.lineTo(-3.5, 0.55);
    shape.closePath();
    sizes.forEach((size, i) => {
      const hole = new Path();
      hole.absarc(
        -2.925 + i * 0.65,
        0,
        radius(size) + 0.018,
        0,
        Math.PI * 2,
        true,
      );
      shape.holes.push(hole);
    });
    return shape;
  }, []);
  const available = [6, 2, 9, 4, 7, 1, 10, 5, 8, 3].filter(
    (n) => !state.seated.includes(n),
  );
  return (
    <section>
      <p className="activity-instruction">
        Touch a knob to lift a cylinder. Choose a cylinder on the mat, then
        touch a socket to try the fit.
      </p>
      <ActivityStage label="Cylinder Blocks in 3D" camera={[4, 6, 8]}>
        <mesh
          position={[0, 0.1, -0.9]}
          rotation={[-Math.PI / 2, 0, 0]}
          castShadow
          receiveShadow
        >
          <extrudeGeometry
            args={[
              shape,
              { depth: 0.4, bevelEnabled: false, curveSegments: 24 },
            ]}
          />
          <meshStandardMaterial color="#d2b080" roughness={0.9} />
        </mesh>
        {sizes.map((size, i) => {
          const seated = state.seated.includes(size),
            attempt = state.attemptedSocket === size;
          return (
            <group
              key={size}
              position={[-2.925 + i * 0.65, 0, -0.9]}
              onClick={(e) => {
                if (e.delta > 5) return;
                e.stopPropagation();
                dispatch(
                  seated
                    ? { type: "lift", size }
                    : { type: "fit", socket: size },
                );
              }}
            >
              <mesh position={[0, 0.105, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <circleGeometry args={[radius(size) + 0.015, 32]} />
                <meshStandardMaterial color="#866b43" />
              </mesh>
              <mesh position={[0, 0.515, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <circleGeometry args={[Math.max(0.28, radius(size)), 24]} />
                <meshBasicMaterial transparent opacity={0} depthWrite={false} />
              </mesh>
              {seated ? (
                <group position={[0, 0.15, 0]}>
                  <Cylinder size={size} />
                </group>
              ) : attempt && state.selected !== null ? (
                <group position={[0, 0.55, 0]}>
                  <Cylinder size={state.selected} />
                </group>
              ) : null}
            </group>
          );
        })}
        {available.map((size, i) => (
          <group
            key={size}
            position={[
              -2.9 + (i % 5) * 1.4,
              0.02,
              0.65 + Math.floor(i / 5) * 1.1,
            ]}
            onClick={(e) => {
              if (e.delta > 5) return;
              e.stopPropagation();
              dispatch({ type: "select", size });
            }}
          >
            <Cylinder size={size} />
            {state.selected === size && (
              <SelectionRing
                position={[0, 0.012, 0]}
                radius={radius(size) + 0.13}
              />
            )}
          </group>
        ))}
      </ActivityStage>
      <p className="fit-observation" aria-live="polite">
        {state.attemptedSocket !== null && state.selected !== null
          ? state.selected > state.attemptedSocket
            ? "The cylinder rests above the opening. Compare the widths."
            : "There is space around the cylinder. Compare another opening."
          : "Compare the widths and notice where each cylinder sits flush."}
      </p>
      <details className="spatial-keyboard">
        <summary>Controls for each cylinder and socket</summary>
        <div className="compact-choices">
          {sizes.map((size) =>
            state.seated.includes(size) ? (
              <button
                key={size}
                className="material-choice"
                onClick={() => dispatch({ type: "lift", size })}
              >
                Lift cylinder {size}
              </button>
            ) : (
              <span key={size} className="socket-control">
                <button
                  className="material-choice"
                  aria-pressed={state.selected === size}
                  onClick={() => dispatch({ type: "select", size })}
                >
                  Select cylinder {size}
                </button>
                <button
                  className="material-choice"
                  disabled={state.selected === null}
                  onClick={() => dispatch({ type: "fit", socket: size })}
                >
                  Try socket {size}
                </button>
              </span>
            ),
          )}
        </div>
      </details>
      {guidance && (
        <p className="gentle-note">
          {activityContent["cylinder-blocks"].guidance}
        </p>
      )}
    </section>
  );
}
