import { Html } from "@react-three/drei";
import type { ActivityViewProps } from "../../domain/activity";
import type { StudyCopy } from "../../content/en/studies";
import ActivityStage, { SelectionRing } from "../shared/ActivityStage";
import type { StudyConfig } from "./config";
import type { StudyAction, StudyState } from "./model";
import StudyControls from "./StudyControls";

function PieceMesh({
  piece,
  selected,
  position,
  onClick,
}: {
  piece: StudyConfig["pieces"][number];
  selected: boolean;
  position: [number, number, number];
  onClick: () => void;
}) {
  return (
    <group
      position={position}
      onClick={(event) => {
        if (event.delta > 5) return;
        event.stopPropagation();
        onClick();
      }}
    >
      <mesh castShadow>
        {piece.shape === "circle" ? (
          <cylinderGeometry args={[0.34, 0.34, 0.11, 28]} />
        ) : piece.shape === "triangle" ? (
          <cylinderGeometry args={[0.38, 0.38, 0.11, 3]} />
        ) : (
          <boxGeometry args={[0.68, 0.12, 0.48]} />
        )}
        <meshStandardMaterial color={piece.color} roughness={0.85} />
      </mesh>
      {selected && <SelectionRing position={[0, -0.08, 0]} radius={0.44} />}
    </group>
  );
}

export default function StudyView3D({
  config,
  copy,
  state,
  dispatch,
  guidance,
}: ActivityViewProps<StudyState, StudyAction> & {
  config: StudyConfig;
  copy: StudyCopy;
}) {
  const loose = config.pieces.filter(
    (piece) => !(piece.id in state.placements),
  );
  return (
    <section>
      <p className="activity-instruction">{copy.activity.instruction}</p>
      <ActivityStage
        label={`${copy.material.name} in 3D`}
        camera={[5.7, 6.5, 8.2]}
        target={[0, 0.25, 0]}
      >
        <mesh position={[0, 0, 0]} receiveShadow>
          <boxGeometry args={[7.6, 0.08, 5.4]} />
          <meshStandardMaterial color="#dfd3ba" roughness={1} />
        </mesh>
        {loose.map((piece, index) => (
          <PieceMesh
            key={piece.id}
            piece={piece}
            selected={state.selected === piece.id}
            position={[-2.7 + index * 1.05, 0.16, 1.65]}
            onClick={() => dispatch({ type: "select", piece: piece.id })}
          />
        ))}
        {config.targets.map((target, index) => {
          const x = -2.55 + (index % 3) * 2.55;
          const z = -1.25 + Math.floor(index / 3) * 1.4;
          const piece = config.pieces.find(
            (candidate) => state.placements[candidate.id] === target,
          );
          return (
            <group
              key={target}
              position={[x, 0.08, z]}
              onClick={(event) => {
                if (event.delta > 5) return;
                event.stopPropagation();
                dispatch(
                  piece
                    ? { type: "return", piece: piece.id }
                    : { type: "place", target },
                );
              }}
            >
              <mesh receiveShadow>
                <boxGeometry args={[1.7, 0.06, 0.9]} />
                <meshStandardMaterial color="#eee8d8" roughness={1} />
              </mesh>
              {piece && (
                <PieceMesh
                  piece={piece}
                  selected={false}
                  position={[0, 0.11, 0]}
                  onClick={() => dispatch({ type: "return", piece: piece.id })}
                />
              )}
              <Html center position={[0, 0.14, -0.3]}>
                <span className="study-label-3d">{copy.targets[target]}</span>
              </Html>
            </group>
          );
        })}
      </ActivityStage>
      <StudyControls
        compact
        config={config}
        copy={copy}
        state={state}
        dispatch={dispatch}
      />
      {guidance && <p className="gentle-note">{copy.activity.guidance}</p>}
    </section>
  );
}
