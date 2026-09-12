import { Html } from "@react-three/drei";
import type { ActivityViewProps } from "../../domain/activity";
import { activityContent } from "../../content/en/activities";
import ActivityStage, { SelectionRing } from "../shared/ActivityStage";
import LetterChooser from "./LetterChooser";
import TracePad from "./TracePad";
import { letters } from "./model";
import type { LetterAction, LetterState } from "./model";

export default function View3D({
  state,
  dispatch,
  guidance,
}: ActivityViewProps<LetterState, LetterAction>) {
  return (
    <section>
      <p className="activity-instruction">
        Choose a card to inspect it, then trace the large letter below.
      </p>
      <ActivityStage
        label="Sandpaper Letters in 3D"
        camera={[4.6, 5.6, 7.2]}
        target={[0, 0.25, 0]}
      >
        <mesh position={[0, 0, 0]} receiveShadow>
          <boxGeometry args={[6.8, 0.07, 4.4]} />
          <meshStandardMaterial color="#dfd5bd" roughness={1} />
        </mesh>
        {letters.map((letter, index) => {
          const x = (index - 1) * 1.75;
          return (
            <group
              key={letter}
              position={[x, 0.14, 0]}
              rotation={[-0.08, 0, 0]}
              onClick={(event) => {
                if (event.delta > 5) return;
                event.stopPropagation();
                dispatch({ type: "select", letter });
              }}
            >
              <mesh castShadow receiveShadow>
                <boxGeometry args={[1.35, 0.12, 1.8]} />
                <meshStandardMaterial color="#49769a" roughness={0.9} />
              </mesh>
              <Html
                center
                position={[0, 0.08, 0]}
                transform
                distanceFactor={5.5}
              >
                <span className="sandpaper-letter-3d">{letter}</span>
              </Html>
              {state.selected === letter && (
                <SelectionRing position={[0, -0.07, 0]} radius={0.85} />
              )}
            </group>
          );
        })}
      </ActivityStage>
      <LetterChooser state={state} dispatch={dispatch} />
      <TracePad state={state} dispatch={dispatch} />
      {guidance && (
        <p className="gentle-note">
          {activityContent["sandpaper-letters"].guidance}
        </p>
      )}
    </section>
  );
}
