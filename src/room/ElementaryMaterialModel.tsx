import { useTexture } from "@react-three/drei";
import type { MaterialId } from "../domain/material";
export const elementaryModelIds = [
  "movable-alphabet",
  "checkerboard",
  "cards-counters",
  "stamp-game",
  "fraction-insets",
  "constructive-triangles",
  "world-puzzle-map",
];
export default function ElementaryMaterialModel({ id }: { id: MaterialId }) {
  const texture = useTexture(`${import.meta.env.BASE_URL}materials/${id}.svg`);
  const width = id === "world-puzzle-map" ? 1.5 : 1.05,
    depth = id === "world-puzzle-map" ? 0.75 : 0.66;
  return (
    <group>
      <mesh position={[0, 0.045, 0]}>
        <boxGeometry args={[width, 0.09, depth]} />
        <meshStandardMaterial color="#c3a476" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.092, 0]}>
        <planeGeometry args={[width, depth]} />
        <meshStandardMaterial map={texture} roughness={0.8} />
      </mesh>
    </group>
  );
}
