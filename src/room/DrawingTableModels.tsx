import { useMemo } from "react";
import { Shape, Path } from "three";
import { figures } from "../activities/metal-insets/geometry";
import ObjectModel from "../activities/table-setting/ObjectModel";
function MiniInset({ figure }: { figure: number }) {
  const { frame, inset } = useMemo(() => {
    const inset = new Shape(),
      frame = new Shape(),
      hole = new Path();
    frame.moveTo(-0.17, -0.17);
    frame.lineTo(0.17, -0.17);
    frame.lineTo(0.17, 0.17);
    frame.lineTo(-0.17, 0.17);
    frame.closePath();
    for (const [i, [x, y]] of figures[figure].points.entries()) {
      if (i) {
        inset.lineTo(x * 0.001, y * 0.001);
        hole.lineTo(x * 0.001, y * 0.001);
      } else {
        inset.moveTo(x * 0.001, y * 0.001);
        hole.moveTo(x * 0.001, y * 0.001);
      }
    }
    inset.closePath();
    hole.closePath();
    frame.holes.push(hole);
    return { frame, inset };
  }, [figure]);
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <extrudeGeometry
          args={[frame, { depth: 0.014, bevelEnabled: false }]}
        />
        <meshStandardMaterial color="#cd8e9c" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <extrudeGeometry
          args={[inset, { depth: 0.017, bevelEnabled: false }]}
        />
        <meshStandardMaterial color="#547d9e" />
      </mesh>
      <mesh position={[0, 0.035, 0]}>
        <sphereGeometry args={[0.018, 12, 8]} />
        <meshStandardMaterial color="#bac7d0" />
      </mesh>
    </group>
  );
}
export function MetalInsetsModel() {
  return (
    <group>
      <mesh position={[0, 0.02, 0]}>
        <boxGeometry args={[1.17, 0.04, 0.44]} />
        <meshStandardMaterial color="#c8aa7b" />
      </mesh>
      {[0, 1, 2].map((i) => (
        <group key={i} position={[(i - 1) * 0.38, 0.042, 0]}>
          <MiniInset figure={i} />
        </group>
      ))}
    </group>
  );
}
export function TableSettingModel() {
  return (
    <group>
      <mesh position={[0, 0.025, 0]}>
        <boxGeometry args={[1.3, 0.05, 0.72]} />
        <meshStandardMaterial color="#c8aa7b" />
      </mesh>
      <mesh position={[0, 0.055, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.22, 0.65]} />
        <meshStandardMaterial color="#dfe5cf" />
      </mesh>
      <group position={[0.04, 0.065, 0.04]} scale={0.24}>
        <ObjectModel item="plate" />
      </group>
      <group position={[0.36, 0.065, -0.17]} scale={0.24}>
        <ObjectModel item="glass" />
      </group>
      <group position={[0.37, 0.065, 0.12]} scale={0.24}>
        <ObjectModel item="spoon" />
      </group>
      <group position={[-0.39, 0.065, 0.1]} scale={0.24}>
        <ObjectModel item="napkin" folded />
      </group>
    </group>
  );
}
