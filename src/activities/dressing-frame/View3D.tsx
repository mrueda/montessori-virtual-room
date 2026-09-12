import type { ActivityViewProps } from "../../domain/activity";
import type { DressingState, DressingAction } from "./model";
import ActivityStage, { Block } from "../shared/ActivityStage";
import { activityContent } from "../../content/en/activities";
function Button() {
  return (
    <group>
      <mesh rotation={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.14, 0.14, 0.055, 32]} />
        <meshStandardMaterial color="#e3d4b5" roughness={0.65} />
      </mesh>
      {[-0.035, 0.035].flatMap((x) =>
        [-0.035, 0.035].map((z) => (
          <mesh
            key={`${x}-${z}`}
            position={[x, 0.029, z]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <circleGeometry args={[0.017, 12]} />
            <meshStandardMaterial color="#968970" />
          </mesh>
        )),
      )}
    </group>
  );
}
export default function View3D({
  state,
  dispatch,
  guidance,
}: ActivityViewProps<DressingState, DressingAction>) {
  const open = state.fabric === "separated";
  return (
    <section>
      <p className="activity-instruction">
        Touch the buttons to open them. Separate the fabric, bring it together,
        then close the buttons again.
      </p>
      <ActivityStage label="Dressing Frame in 3D" camera={[3.5, 6, 5]}>
        {[-1.7, 1.7].map((x) => (
          <Block key={x} position={[x, 0.14, 0]} size={[0.2, 0.28, 3.9]} />
        ))}
        {[-1.85, 1.85].map((z) => (
          <Block key={z} position={[0, 0.14, z]} size={[3.4, 0.28, 0.2]} />
        ))}
        <Block
          position={[0, 0.02, 0]}
          size={[3.3, 0.04, 3.6]}
          color="#e3dac3"
        />
        {[-1, 1].map((side) => (
          <group key={side} position={[side * (open ? 1.36 : 0.82), 0.19, 0]}>
            <Block
              position={[0, 0, 0]}
              size={[open ? 0.52 : 1.64, 0.055, 3.53]}
              color={side === -1 ? "#9eb3bd" : "#a7bbc3"}
            />
            {Array.from({ length: 22 }, (_, i) => (
              <Block
                key={i}
                position={[
                  side * (open ? -0.18 : -0.74),
                  0.033,
                  -1.62 + i * 0.155,
                ]}
                size={[0.016, 0.006, 0.058]}
                color="#d5dfe1"
              />
            ))}
          </group>
        ))}
        {state.closed.map((closed, index) => {
          const z = -1.23 + index * 0.82,
            buttonX = open ? -1.25 : closed ? -0.035 : -0.42;
          return (
            <group
              key={index}
              onClick={(e) => {
                if (e.delta > 5) return;
                e.stopPropagation();
                dispatch({ type: "toggle-button", index });
              }}
            >
              <group position={[buttonX, 0.28, z]}>
                <Button />
              </group>
              <mesh
                position={[open ? 1.25 : 0.065, 0.224, z]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={[0.028, 0.16, 1]}
              >
                <circleGeometry args={[1, 24]} />
                <meshStandardMaterial color="#667f8a" />
              </mesh>
              <mesh position={[buttonX, 0.29, z]}>
                <sphereGeometry args={[0.25, 8, 8]} />
                <meshBasicMaterial transparent opacity={0} depthWrite={false} />
              </mesh>
            </group>
          );
        })}
      </ActivityStage>
      <div className="spatial-controls">
        <div
          className="compact-choices"
          role="group"
          aria-label="Frame buttons"
        >
          {state.closed.map((closed, index) => (
            <button
              key={index}
              className="material-choice"
              aria-pressed={closed}
              disabled={open}
              onClick={() => dispatch({ type: "toggle-button", index })}
            >
              {closed ? "Open" : "Close"} button {index + 1}
            </button>
          ))}
        </div>
        <button
          className="secondary-button"
          disabled={!open && state.closed.some(Boolean)}
          onClick={() => dispatch({ type: open ? "join" : "separate" })}
        >
          {open ? "Bring the fabric together" : "Separate the fabric"}
        </button>
      </div>
      {guidance && (
        <p className="gentle-note">
          {activityContent["dressing-frame"].guidance}
        </p>
      )}
    </section>
  );
}
