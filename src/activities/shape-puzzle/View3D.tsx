import { useMemo } from "react";
import { Path, Shape } from "three";
import type { ActivityViewProps } from "../../domain/activity";
import type { PuzzleState, PuzzleAction, PuzzleShape } from "./model";
import { shapes } from "./model";
import { PuzzleControls } from "./index";
import ActivityStage, { SelectionRing } from "../shared/ActivityStage";
import { activityContent } from "../../content/en/activities";
function outline(path: Path, shape: PuzzleShape, x = 0) {
  if (shape === "circle") path.absarc(x, 0, 0.5, 0, Math.PI * 2);
  else if (shape === "square") {
    path.moveTo(x - 0.46, -0.46);
    path.lineTo(x + 0.46, -0.46);
    path.lineTo(x + 0.46, 0.46);
    path.lineTo(x - 0.46, 0.46);
    path.closePath();
  } else {
    path.moveTo(x, 0.56);
    path.lineTo(x + 0.54, -0.46);
    path.lineTo(x - 0.54, -0.46);
    path.closePath();
  }
}
export default function View3D({
  state,
  dispatch,
  guidance,
}: ActivityViewProps<PuzzleState, PuzzleAction>) {
  const geometries = useMemo(
    () =>
      shapes.map((s) => {
        const shape = new Shape();
        outline(shape, s);
        return shape;
      }),
    [],
  );
  const board = useMemo(() => {
    const shape = new Shape();
    shape.moveTo(-2.65, -0.85);
    shape.lineTo(2.65, -0.85);
    shape.lineTo(2.65, 0.85);
    shape.lineTo(-2.65, 0.85);
    shape.closePath();
    shapes.forEach((s, i) => {
      const hole = new Path();
      outline(hole, s, (i - 1) * 1.65);
      shape.holes.push(hole);
    });
    return shape;
  }, []);
  const piece = (shape: PuzzleShape) => (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} castShadow>
        <extrudeGeometry
          args={[
            geometries[shapes.indexOf(shape)],
            { depth: 0.14, bevelEnabled: false },
          ]}
        />
        <meshStandardMaterial color="#d8b67c" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.22, 0]} castShadow>
        <sphereGeometry args={[0.075, 16, 12]} />
        <meshStandardMaterial color="#b78f58" />
      </mesh>
    </>
  );
  return (
    <section>
      <p className="activity-instruction">
        Touch a knob to lift a shape. Choose a loose piece, then touch an
        opening to try the fit.
      </p>
      <ActivityStage label="Three-Shape Puzzle in 3D" camera={[3.5, 5.8, 6]}>
        <mesh
          position={[0, 0.03, -0.65]}
          rotation={[-Math.PI / 2, 0, 0]}
          castShadow
          receiveShadow
        >
          <extrudeGeometry
            args={[board, { depth: 0.19, bevelEnabled: false }]}
          />
          <meshStandardMaterial color="#cbae7e" roughness={0.8} />
        </mesh>
        {shapes.map((shape, i) => (
          <group
            key={shape}
            position={[(i - 1) * 1.65, 0, -0.65]}
            onClick={(e) => {
              if (e.delta > 5) return;
              e.stopPropagation();
              dispatch({
                type: state.seated.includes(shape) ? "lift" : "fit",
                shape,
              });
            }}
          >
            <mesh position={[0, 0.025, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <shapeGeometry args={[geometries[i]]} />
              <meshStandardMaterial color="#92734b" />
            </mesh>
            <mesh position={[0, 0.23, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[1.3, 1.3]} />
              <meshBasicMaterial transparent opacity={0} depthWrite={false} />
            </mesh>
            {state.seated.includes(shape) ? (
              <group position={[0, 0.08, 0]}>{piece(shape)}</group>
            ) : state.attempted === shape && state.selected ? (
              <group position={[0, 0.45, 0]}>{piece(state.selected)}</group>
            ) : null}
          </group>
        ))}
        {shapes
          .filter((s) => !state.seated.includes(s))
          .map((shape) => (
            <group
              key={shape}
              position={[(shapes.indexOf(shape) - 1) * 1.65, 0.02, 1.3]}
              onClick={(e) => {
                if (e.delta > 5) return;
                e.stopPropagation();
                dispatch({ type: "select", shape });
              }}
            >
              {piece(shape)}
              {state.selected === shape && (
                <SelectionRing position={[0, 0.005, 0]} radius={0.7} />
              )}
            </group>
          ))}
      </ActivityStage>
      <p className="fit-observation" aria-live="polite">
        {state.attempted
          ? "The outlines are different. Compare another opening."
          : "Look at the shapes and the spaces they leave."}
      </p>
      <PuzzleControls state={state} dispatch={dispatch} />
      {guidance && (
        <p className="gentle-note">
          {activityContent["shape-puzzle"].guidance}
        </p>
      )}
    </section>
  );
}
