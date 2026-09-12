import { useMemo } from "react";
import { Vector2, Shape } from "three";
import type { Item } from "./model";
export default function ObjectModel({
  item,
  folded = false,
}: {
  item: Item;
  folded?: boolean;
}) {
  const profile = useMemo(
    () =>
      item === "plate"
        ? [
            new Vector2(0, 0.025),
            new Vector2(0.65, 0.025),
            new Vector2(0.9, 0.1),
            new Vector2(0.95, 0.15),
            new Vector2(0.95, 0.19),
            new Vector2(0.85, 0.16),
            new Vector2(0.62, 0.075),
            new Vector2(0, 0.075),
          ]
        : [
            new Vector2(0, 0),
            new Vector2(0.25, 0),
            new Vector2(0.34, 0.7),
            new Vector2(0.3, 0.7),
            new Vector2(0.21, 0.055),
            new Vector2(0, 0.055),
          ],
    [item],
  );
  const fork = useMemo(() => {
    const p = [
      [-0.06, -0.22],
      [-0.09, 0.64],
      [0, 0.72],
      [0.09, 0.64],
      [0.06, -0.22],
      [0.2, -0.3],
      [0.2, -0.72],
      [0.14, -0.72],
      [0.14, -0.43],
      [0.07, -0.43],
      [0.07, -0.72],
      [0.02, -0.72],
      [0.02, -0.43],
      [-0.04, -0.43],
      [-0.04, -0.72],
      [-0.1, -0.72],
      [-0.1, -0.43],
      [-0.15, -0.43],
      [-0.15, -0.72],
      [-0.21, -0.72],
      [-0.21, -0.3],
    ];
    const s = new Shape();
    p.forEach(([x, y], i) => (i ? s.lineTo(x, -y) : s.moveTo(x, -y)));
    s.closePath();
    return s;
  }, []);
  if (item === "plate" || item === "glass")
    return (
      <mesh castShadow receiveShadow>
        <latheGeometry args={[profile, 40]} />
        <meshStandardMaterial
          color={item === "plate" ? "#f1efdf" : "#bed4ce"}
          transparent={item === "glass"}
          opacity={item === "glass" ? 0.65 : 1}
          roughness={0.3}
          side={2}
        />
      </mesh>
    );
  if (item === "napkin")
    return (
      <group>
        <mesh position={[0, 0.025, 0]}>
          <boxGeometry args={[folded ? 0.54 : 1.08, 0.05, 1.14]} />
          <meshStandardMaterial color="#ce9b85" roughness={1} />
        </mesh>
        {folded && (
          <mesh position={[0.015, 0.055, 0]}>
            <boxGeometry args={[0.49, 0.025, 1.1]} />
            <meshStandardMaterial color="#d4a38d" roughness={1} />
          </mesh>
        )}
      </group>
    );
  if (item === "fork")
    return (
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.035, 0]} castShadow>
        <extrudeGeometry
          args={[
            fork,
            {
              depth: 0.035,
              bevelEnabled: true,
              bevelSize: 0.01,
              bevelThickness: 0.008,
              bevelSegments: 1,
              steps: 1,
            },
          ]}
        />
        <meshStandardMaterial
          color="#aebbb4"
          metalness={0.45}
          roughness={0.35}
        />
      </mesh>
    );
  return (
    <group>
      <mesh position={[0, 0.07, 0.24]} rotation={[Math.PI / 2, 0, 0]}>
        <capsuleGeometry args={[0.055, 0.85, 4, 12]} />
        <meshStandardMaterial
          color="#aebbb4"
          metalness={0.45}
          roughness={0.35}
        />
      </mesh>
      <mesh position={[0, 0.06, -0.44]} scale={[0.2, 0.08, 0.29]}>
        <sphereGeometry args={[1, 24, 16]} />
        <meshStandardMaterial
          color="#b9c7bf"
          metalness={0.4}
          roughness={0.35}
        />
      </mesh>
    </group>
  );
}
