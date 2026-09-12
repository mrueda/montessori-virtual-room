import type { ActivityViewProps } from "../../domain/activity";
import type {
  OrderedSequenceAction,
  OrderedSequenceState,
  SequenceSize,
} from "./model";
import type { OrderedVariant } from "./OrderedSequenceView";
import {
  SequenceControls,
  SequenceKeyboardChoices,
} from "./OrderedSequenceView";
import ActivityStage, { SelectionRing } from "../shared/ActivityStage";

function dimensions(size: SequenceSize, variant: OrderedVariant) {
  return variant === "red-rods"
    ? ([size * 0.43, 0.14, 0.2] as const)
    : variant === "number-rods"
      ? ([size * 0.43, 0.14, 0.2] as const)
      : ([4.25, 0.1 + size * 0.045, 0.1 + size * 0.045] as const);
}

function Piece({
  size,
  variant,
}: {
  size: SequenceSize;
  variant: OrderedVariant;
}) {
  const [width, height, depth] = dimensions(size, variant);
  if (variant === "number-rods")
    return (
      <group>
        {Array.from({ length: size }, (_, index) => (
          <mesh
            key={index}
            castShadow
            receiveShadow
            position={[-width / 2 + 0.215 + index * 0.43, height / 2, 0]}
          >
            <boxGeometry args={[0.43, height, depth]} />
            <meshStandardMaterial
              color={index % 2 ? "#416f97" : "#b8493f"}
              roughness={0.82}
            />
          </mesh>
        ))}
      </group>
    );
  return (
    <mesh castShadow receiveShadow position={[0, height / 2, 0]}>
      <boxGeometry args={[width, height, depth]} />
      <meshStandardMaterial
        color={variant === "red-rods" ? "#b8493f" : "#927054"}
        roughness={0.82}
      />
    </mesh>
  );
}

export default function OrderedSequence3D({
  state,
  dispatch,
  guidance,
  variant,
  guidanceText,
}: ActivityViewProps<OrderedSequenceState, OrderedSequenceAction> & {
  variant: OrderedVariant;
  guidanceText: string;
}) {
  const noun = variant === "broad-stair" ? "prism" : "rod";
  return (
    <section>
      <p className="activity-instruction">
        Select a {noun} on the mat, then use the control below to place it in
        sequence. Touch a placed {noun} to return it.
      </p>
      <ActivityStage
        label={`${variant === "red-rods" ? "Red Rods" : variant === "number-rods" ? "Number Rods" : "Broad Stair"} in 3D`}
        camera={[6.8, 7.8, 9.4]}
        target={[0, 0.35, 0]}
      >
        <mesh position={[0, 0, 0]} receiveShadow>
          <boxGeometry args={[7.2, 0.07, 5.9]} />
          <meshStandardMaterial color="#dfd5bd" roughness={1} />
        </mesh>
        {state.placed.map((size, index) => {
          const [width] = dimensions(size, variant);
          return (
            <group
              key={`placed-${size}`}
              position={[
                variant === "red-rods" || variant === "number-rods"
                  ? -3 + width / 2
                  : -0.65,
                0.08,
                -2.25 + index * 0.43,
              ]}
              onClick={(event) => {
                if (event.delta > 5) return;
                event.stopPropagation();
                dispatch({ type: "return", size });
              }}
            >
              <Piece size={size} variant={variant} />
            </group>
          );
        })}
        {state.loose.map((size, index) => {
          const [width] = dimensions(size, variant);
          const column = index % 2;
          const row = Math.floor(index / 2);
          const x = column ? 2.15 : -2.15;
          return (
            <group
              key={`loose-${size}`}
              position={[
                variant === "red-rods" || variant === "number-rods"
                  ? x + (column ? -width / 2 : width / 2)
                  : x,
                0.08,
                0.72 + row * 0.47,
              ]}
              onClick={(event) => {
                if (event.delta > 5) return;
                event.stopPropagation();
                dispatch({ type: "select", size });
              }}
            >
              <Piece size={size} variant={variant} />
              {state.selected === size && (
                <SelectionRing
                  position={[0, 0.015, 0]}
                  radius={Math.min(0.48 + width * 0.08, 0.8)}
                />
              )}
            </group>
          );
        })}
      </ActivityStage>
      <SequenceKeyboardChoices
        state={state}
        dispatch={dispatch}
        variant={variant}
      />
      <SequenceControls state={state} dispatch={dispatch} variant={variant} />
      {guidance && <p className="gentle-note">{guidanceText}</p>}
    </section>
  );
}
