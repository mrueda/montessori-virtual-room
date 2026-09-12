import type { MaterialId, RoomSceneDefinition } from "../domain/material";
import { Box, MaterialHotspot, Plant, PreparedRoomShell } from "./RoomObjects";
import RoomStage from "./RoomStage";

function SensorialShelf() {
  return (
    <group position={[-0.2, 0, -2.68]}>
      <Box at={[0, 0.76, -0.29]} size={[6.6, 1.48, 0.07]} color="#caaa78" />
      {[0.12, 0.71, 1.38].map((y) => (
        <Box key={y} at={[0, y, 0]} size={[6.7, 0.09, 0.74]} color="#d3b481" />
      ))}
      {[-3.25, -1.1, 1.1, 3.25].map((x) => (
        <Box
          key={x}
          at={[x, 0.75, 0]}
          size={[0.08, 1.5, 0.74]}
          color="#c49f6e"
        />
      ))}
    </group>
  );
}

function FloorMat({ at }: { at: [number, number, number] }) {
  return (
    <group position={at}>
      <Box at={[0, 0.045, 0]} size={[3.65, 0.035, 2.15]} color="#e8dfc8" />
      {[-0.5, -0.44, 0.44, 0.5].map((z) => (
        <Box
          key={z}
          at={[0, 0.069, z * 2.05]}
          size={[3.52, 0.006, 0.012]}
          color="#c6b999"
        />
      ))}
    </group>
  );
}

function LowTable() {
  return (
    <group position={[2.75, 0, 1.35]}>
      <Box at={[0, 0.78, 0]} size={[1.68, 0.1, 1.05]} color="#d4b681" />
      {[-0.66, 0.66].flatMap((x) =>
        [-0.38, 0.38].map((z) => (
          <Box
            key={`${x}-${z}`}
            at={[x, 0.38, z]}
            size={[0.08, 0.76, 0.08]}
            color="#bd9b69"
          />
        )),
      )}
      <Box at={[-0.22, 0.86, 0]} size={[0.72, 0.045, 0.48]} color="#c4a171" />
      {["#b9564c", "#d4ae4f", "#668ba2"].map((color, index) => (
        <Box
          key={color}
          at={[-0.43 + index * 0.21, 0.9, 0]}
          size={[0.15, 0.025, 0.3]}
          color={color}
        />
      ))}
    </group>
  );
}

export default function SensorialScene({
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
      camera={[7.7, 5.9, 9.2]}
      target={[-0.15, 0.86, -0.4]}
      background="#e9e8dc"
      ambient={1.38}
      lightPosition={[-3, 7.5, 4.5]}
      lightIntensity={2.3}
      minDistance={6.5}
      maxDistance={15.5}
      minAzimuthAngle={-0.78}
      maxAzimuthAngle={1.18}
      fallback="Explore the Sensorial materials using the collection below."
    >
      <PreparedRoomShell
        width={8.8}
        depth={6.5}
        height={3.8}
        floorColors={["#dfc9a5", "#d8bc92", "#dcc39d"]}
        backWallColor="#ecebe0"
        sideWallColor="#e1e5d8"
      >
        <SensorialShelf />
        {scene.placements.map((placement) => (
          <MaterialHotspot
            key={placement.materialId}
            placement={placement}
            onSelect={onSelect}
          />
        ))}

        {/* Natural light and uncluttered wall space keep attention on the materials. */}
        <group position={[-4.27, 2.25, 0.35]}>
          <Box at={[0, 0, 0]} size={[0.08, 1.9, 2.6]} color="#faf7eb" />
          <Box at={[0.052, 0, 0]} size={[0.02, 1.7, 2.38]} color="#c4d7d3" />
          <Box at={[0.074, 0, 0]} size={[0.025, 1.71, 0.05]} color="#faf7ec" />
          <Box at={[0.074, 0, 0]} size={[0.025, 0.05, 2.38]} color="#faf7ec" />
          <Box at={[0.13, -0.98, 0]} size={[0.3, 0.11, 2.78]} color="#dbc39d" />
        </group>

        <FloorMat at={[-0.75, 0, 0.62]} />
        <LowTable />

        {/* A small observation table for found natural objects. */}
        <group position={[3.45, 0, -1.72]}>
          <Box at={[0, 0.68, 0]} size={[1.05, 0.08, 0.72]} color="#cfaf7d" />
          {[-0.4, 0.4].flatMap((x) =>
            [-0.25, 0.25].map((z) => (
              <Box
                key={`${x}-${z}`}
                at={[x, 0.33, z]}
                size={[0.065, 0.65, 0.065]}
                color="#b99766"
              />
            )),
          )}
          <mesh position={[-0.2, 0.78, 0]}>
            <sphereGeometry args={[0.16, 18, 12]} />
            <meshStandardMaterial color="#b4a17c" roughness={1} />
          </mesh>
          <mesh position={[0.2, 0.77, 0]} rotation={[0.2, 0.4, 0]}>
            <coneGeometry args={[0.13, 0.26, 7]} />
            <meshStandardMaterial color="#9fa98d" roughness={1} />
          </mesh>
        </group>

        <Plant at={[-3.52, 0, -2.52]} scale={1.05} />
        <Plant at={[3.78, 0, 2.45]} scale={0.82} />

        {/* Simple botanical artwork hangs above the work rather than competing with it. */}
        <group position={[2.62, 2.65, -3.14]}>
          <Box at={[0, 0, 0]} size={[0.72, 0.92, 0.05]} color="#b99d72" />
          <Box at={[0, 0, 0.032]} size={[0.62, 0.82, 0.018]} color="#f5f0e3" />
          <mesh
            position={[0, -0.03, 0.052]}
            scale={[0.13, 0.3, 0.012]}
            rotation={[0, 0, -0.35]}
          >
            <sphereGeometry args={[1, 18, 12]} />
            <meshStandardMaterial color="#9dab83" />
          </mesh>
        </group>
      </PreparedRoomShell>
    </RoomStage>
  );
}
