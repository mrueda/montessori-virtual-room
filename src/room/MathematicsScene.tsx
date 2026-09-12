import type { MaterialId, RoomSceneDefinition } from "../domain/material";
import { Box, MaterialHotspot, Plant, PreparedRoomShell } from "./RoomObjects";
import RoomStage from "./RoomStage";

function MathematicsShelf() {
  return (
    <group position={[-0.8, 0, -2.62]}>
      <Box at={[0, 0.72, -0.28]} size={[5.1, 1.4, 0.07]} color="#c9a878" />
      {[0.12, 0.7, 1.34].map((y) => (
        <Box key={y} at={[0, y, 0]} size={[5.2, 0.09, 0.72]} color="#d2b382" />
      ))}
      {[-2.5, -0.82, 0.84, 2.5].map((x) => (
        <Box
          key={x}
          at={[x, 0.72, 0]}
          size={[0.08, 1.42, 0.72]}
          color="#c19e6e"
        />
      ))}
    </group>
  );
}

export default function MathematicsScene({
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
      camera={[7.3, 5.7, 8.9]}
      target={[0, 0.78, -0.35]}
      background="#eae8dc"
      ambient={1.42}
      lightPosition={[-2.5, 7.5, 4.5]}
      lightIntensity={2.2}
      minDistance={6.4}
      maxDistance={15.2}
      fallback="Explore the Mathematics material using the collection below."
    >
      <PreparedRoomShell
        width={8.5}
        depth={6.3}
        height={3.75}
        floorColors={["#dec8a4", "#d7bb91", "#dcc29b"]}
        backWallColor="#ecebe0"
        sideWallColor="#e2e5d7"
      >
        <MathematicsShelf />
        {scene.placements.map((placement) => (
          <MaterialHotspot
            key={placement.materialId}
            placement={placement}
            onSelect={onSelect}
          />
        ))}

        <group position={[-4.13, 2.22, 0.3]}>
          <Box at={[0, 0, 0]} size={[0.08, 1.88, 2.45]} color="#faf7eb" />
          <Box at={[0.052, 0, 0]} size={[0.02, 1.68, 2.23]} color="#c3d6d1" />
          <Box at={[0.074, 0, 0]} size={[0.025, 1.69, 0.045]} color="#faf7ed" />
          <Box at={[0.074, 0, 0]} size={[0.025, 0.045, 2.23]} color="#faf7ed" />
        </group>

        <Box
          at={[-0.7, 0.045, 0.7]}
          size={[3.6, 0.035, 2.15]}
          color="#e8dfc7"
        />

        {/* A child-height table offers a small, countable set without visual noise. */}
        <group position={[2.65, 0, 1.35]}>
          <Box at={[0, 0.82, 0]} size={[1.62, 0.1, 1.0]} color="#d3b483" />
          {[-0.63, 0.63].flatMap((x) =>
            [-0.36, 0.36].map((z) => (
              <Box
                key={`${x}-${z}`}
                at={[x, 0.4, z]}
                size={[0.08, 0.8, 0.08]}
                color="#bb986a"
              />
            )),
          )}
          <Box at={[0, 0.9, 0]} size={[0.85, 0.04, 0.55]} color="#c4a272" />
          {[-0.28, -0.14, 0, 0.14, 0.28].map((x, index) => (
            <mesh key={x} position={[x, 0.97, 0]}>
              <sphereGeometry args={[0.065, 14, 10]} />
              <meshStandardMaterial color={index % 2 ? "#9b7755" : "#b9935b"} />
            </mesh>
          ))}
        </group>

        <group position={[2.95, 2.5, -3.04]}>
          <Box at={[0, 0, 0]} size={[1.05, 0.82, 0.05]} color="#b99b70" />
          <Box at={[0, 0, 0.032]} size={[0.95, 0.72, 0.018]} color="#f4efe1" />
          {[0, 1, 2].map((index) => (
            <mesh key={index} position={[-0.27 + index * 0.27, 0, 0.052]}>
              <circleGeometry args={[0.075 + index * 0.025, 24]} />
              <meshStandardMaterial
                color={["#b46154", "#c4a54f", "#698ba0"][index]}
              />
            </mesh>
          ))}
        </group>

        <Plant at={[-3.55, 0, -2.42]} scale={1.02} />
        <Plant at={[3.72, 0, 2.3]} scale={0.78} />
      </PreparedRoomShell>
    </RoomStage>
  );
}
