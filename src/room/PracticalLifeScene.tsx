import type { MaterialId, RoomSceneDefinition } from "../domain/material";
import { Box, MaterialHotspot, Plant, PreparedRoomShell } from "./RoomObjects";
import RoomStage from "./RoomStage";

function PracticalShelf() {
  return (
    <group position={[-0.7, 0, -2.65]}>
      <Box at={[0, 0.74, -0.28]} size={[4.4, 1.42, 0.07]} color="#c9aa7c" />
      {[0.12, 0.69, 1.35].map((y) => (
        <Box key={y} at={[0, y, 0]} size={[4.5, 0.09, 0.72]} color="#d2b383" />
      ))}
      {[-2.15, 0, 2.15].map((x) => (
        <Box
          key={x}
          at={[x, 0.72, 0]}
          size={[0.08, 1.4, 0.72]}
          color="#c29f70"
        />
      ))}
      {[-1.1, 1.08].map((x) => (
        <Box
          key={x}
          at={[x, 0.4, 0]}
          size={[0.055, 0.5, 0.68]}
          color="#caa879"
        />
      ))}
    </group>
  );
}

function Basket({ at }: { at: [number, number, number] }) {
  return (
    <group position={at}>
      <Box at={[0, 0.08, 0]} size={[0.55, 0.16, 0.4]} color="#b89b70" />
      <Box at={[0, 0.17, 0]} size={[0.47, 0.025, 0.32]} color="#8e7959" />
    </group>
  );
}

export default function PracticalLifeScene({
  scene,
  onSelect,
  resetKey,
}: {
  scene: RoomSceneDefinition;
  onSelect: (id: MaterialId) => void;
  resetKey: number;
}) {
  return (
    <RoomStage
      sceneKey={scene.id}
      resetKey={resetKey}
      camera={[7.4, 5.7, 8.8]}
      target={[0, 0.8, -0.45]}
      background="#e9e8dc"
      ambient={1.45}
      lightPosition={[-2, 7, 5]}
      lightIntensity={2.25}
      minDistance={6.4}
      maxDistance={15}
      minAzimuthAngle={-0.8}
      maxAzimuthAngle={1.15}
      fallback="Explore the Practical Life materials using the collection below."
    >
      <PreparedRoomShell
        width={8.5}
        depth={6.4}
        height={3.7}
        floorColors={["#dfcaa7", "#d8bd95", "#ddc5a0"]}
        backWallColor="#eeece1"
        sideWallColor="#e3e6d8"
      >
        <PracticalShelf />
        {scene.placements.map((placement) => (
          <MaterialHotspot
            key={placement.materialId}
            placement={placement}
            onSelect={onSelect}
          />
        ))}

        {/* Window and linen curtain give the focused corner a soft daylight source. */}
        <group position={[-4.13, 2.2, 0.5]}>
          <Box at={[0, 0, 0]} size={[0.08, 1.75, 2.45]} color="#faf7eb" />
          <Box at={[0.055, 0, 0]} size={[0.02, 1.55, 2.22]} color="#c4d5d0" />
          <Box at={[0.075, 0, 0]} size={[0.025, 1.56, 0.045]} color="#faf7ed" />
          <Box at={[0.075, 0, 0]} size={[0.025, 0.045, 2.22]} color="#faf7ed" />
          <Box
            at={[0.17, -0.04, -1.22]}
            size={[0.12, 1.88, 0.38]}
            color="#d7c5aa"
          />
          <Box
            at={[0.17, -0.04, 1.22]}
            size={[0.12, 1.88, 0.38]}
            color="#d7c5aa"
          />
        </group>

        {/* A clear work mat provides an inviting destination for trays from the shelf. */}
        <Box
          at={[-0.85, 0.045, 0.55]}
          size={[3.5, 0.035, 2.15]}
          color="#e8dfc6"
        />
        {[-0.52, -0.46, 0.46, 0.52].map((z) => (
          <Box
            key={z}
            at={[-0.85, 0.068, 0.55 + z * 2]}
            size={[3.4, 0.006, 0.012]}
            color="#c6b997"
          />
        ))}

        {/* Water and hand-care station. */}
        <group position={[3.05, 0, -1.72]}>
          <Box at={[0, 0.52, 0]} size={[1.28, 0.95, 0.74]} color="#cfb28b" />
          <Box at={[0, 1.02, 0]} size={[1.42, 0.09, 0.88]} color="#e5d8bc" />
          <mesh position={[0, 1.13, 0]}>
            <cylinderGeometry args={[0.34, 0.25, 0.16, 32]} />
            <meshStandardMaterial color="#eeeade" roughness={0.8} />
          </mesh>
          <mesh position={[0, 1.215, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.28, 32]} />
            <meshStandardMaterial color="#adc5c5" />
          </mesh>
          <Box
            at={[0.8, 0.72, 0.08]}
            size={[0.025, 0.55, 0.42]}
            color="#b9c8b3"
          />
          <Box
            at={[0, 0.38, 0.39]}
            size={[0.58, 0.34, 0.025]}
            color="#b89d78"
          />
        </group>

        {/* Child-sized table set for flower arranging. */}
        <group position={[2.65, 0, 1.55]}>
          <Box at={[0, 0.83, 0]} size={[1.55, 0.1, 1]} color="#d5b887" />
          {[-0.61, 0.61].flatMap((x) =>
            [-0.34, 0.34].map((z) => (
              <Box
                key={`${x}-${z}`}
                at={[x, 0.4, z]}
                size={[0.08, 0.8, 0.08]}
                color="#bd9d6f"
              />
            )),
          )}
          <mesh position={[0.1, 1.04, 0]}>
            <cylinderGeometry args={[0.12, 0.16, 0.35, 20]} />
            <meshStandardMaterial color="#c9d7cb" />
          </mesh>
          <Plant at={[0.1, 1.18, 0]} scale={0.3} />
          <Box at={[-0.4, 0.91, 0]} size={[0.35, 0.05, 0.46]} color="#bd9b70" />
        </group>

        <Basket at={[-0.8, 1.48, -2.62]} />
        <Basket at={[1.15, 1.48, -2.62]} />
        <Plant at={[-3.45, 0, -2.5]} scale={1.05} />
        <Plant at={[3.75, 0, 2.4]} scale={0.8} />

        {/* Cleaning tools are orderly, visible, and reachable. */}
        <group position={[3.87, 0.45, 0]} rotation={[0, 0, -0.1]}>
          <Box at={[0, 0.35, 0]} size={[0.04, 1.4, 0.04]} color="#af9066" />
          <Box at={[0, -0.38, 0]} size={[0.38, 0.17, 0.08]} color="#9a9673" />
        </group>
        <group position={[3.62, 0.48, 0.35]} rotation={[0, 0, 0.09]}>
          <Box at={[0, 0.35, 0]} size={[0.04, 1.35, 0.04]} color="#b5966b" />
          <mesh position={[0, -0.38, 0]}>
            <cylinderGeometry args={[0.12, 0.18, 0.34, 20]} />
            <meshStandardMaterial color="#b7ad8e" />
          </mesh>
        </group>
      </PreparedRoomShell>
    </RoomStage>
  );
}
