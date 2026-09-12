import type { MaterialId, RoomSceneDefinition } from "../domain/material";
import { Box, MaterialHotspot, Plant, PreparedRoomShell } from "./RoomObjects";
import RoomStage from "./RoomStage";

function WideShelf() {
  return (
    <group position={[0, 0, -2.62]}>
      <Box at={[0, 0.74, -0.28]} size={[5.9, 1.45, 0.07]} color="#c6a574" />
      {[0.12, 0.72, 1.38].map((y) => (
        <Box key={y} at={[0, y, 0]} size={[6, 0.09, 0.72]} color="#d3b482" />
      ))}
      {[-2.9, -1.46, 0, 1.46, 2.9].map((x) => (
        <Box
          key={x}
          at={[x, 0.74, 0]}
          size={[0.08, 1.48, 0.72]}
          color="#bd9868"
        />
      ))}
    </group>
  );
}

function CultureDetails() {
  return (
    <>
      <group position={[2.75, 0.92, 1.35]}>
        <mesh>
          <sphereGeometry args={[0.55, 28, 20]} />
          <meshStandardMaterial color="#789ba8" roughness={0.9} />
        </mesh>
        <mesh rotation={[0, 0, 0.25]}>
          <torusGeometry args={[0.68, 0.035, 10, 32]} />
          <meshStandardMaterial color="#ac8c5d" />
        </mesh>
        <Box at={[0, -0.73, 0]} size={[0.75, 0.08, 0.5]} color="#b18c5e" />
      </group>
      <Box at={[-0.55, 0.045, 0.8]} size={[3.7, 0.035, 2.1]} color="#e7dfc8" />
    </>
  );
}

function ArtDetails() {
  return (
    <>
      <group position={[2.6, 0, 1.25]}>
        <Box at={[0, 1.25, 0]} size={[1.55, 1.5, 0.08]} color="#b68e61" />
        <Box at={[0, 1.25, 0.06]} size={[1.35, 1.3, 0.03]} color="#eee7d8" />
        <Box
          at={[-0.45, 1.45, 0.09]}
          size={[0.35, 0.08, 0.02]}
          color="#b76555"
        />
        <Box
          at={[0.05, 1.16, 0.09]}
          size={[0.48, 0.08, 0.02]}
          color="#708fa0"
        />
        <Box at={[0.32, 1.62, 0.09]} size={[0.3, 0.08, 0.02]} color="#83976d" />
      </group>
      <group position={[-0.45, 0, 1.3]}>
        <Box at={[0, 0.75, 0]} size={[2.1, 0.1, 1.1]} color="#d1b17d" />
        {[-0.82, 0.82].flatMap((x) =>
          [-0.4, 0.4].map((z) => (
            <Box
              key={`${x}-${z}`}
              at={[x, 0.36, z]}
              size={[0.08, 0.72, 0.08]}
              color="#b59061"
            />
          )),
        )}
      </group>
    </>
  );
}

function CourtesyDetails() {
  return (
    <>
      <Box at={[0, 0.045, 0.55]} size={[4.4, 0.035, 2.0]} color="#e3dac2" />
      {[-1.8, 1.8].map((x) => (
        <group key={x} position={[x, 0, 1.55]}>
          <Box at={[0, 0.5, 0]} size={[0.7, 0.08, 0.7]} color="#c9a775" />
          <Box at={[0, 0.85, 0.3]} size={[0.7, 0.72, 0.08]} color="#b88f60" />
        </group>
      ))}
      <group position={[0, 0, 1.5]}>
        <Box at={[0, 0.78, 0]} size={[1.4, 0.1, 1.0]} color="#d2b27f" />
        {[-0.52, 0.52].flatMap((x) =>
          [-0.35, 0.35].map((z) => (
            <Box
              key={`${x}-${z}`}
              at={[x, 0.38, z]}
              size={[0.08, 0.76, 0.08]}
              color="#b58d60"
            />
          )),
        )}
      </group>
    </>
  );
}

export default function CommunityAreaScene({
  scene,
  onSelect,
  resetKey,
}: {
  scene: RoomSceneDefinition;
  onSelect: (id: MaterialId) => void;
  resetKey: number;
}) {
  const kind = scene.renderer;
  const fallback = `Explore ${scene.name} using the collection below.`;
  return (
    <RoomStage
      sceneKey={scene.id}
      resetKey={resetKey}
      camera={[7.4, 5.8, 9.1]}
      target={[0, 0.8, -0.3]}
      background={kind === "art-studio" ? "#ece5dc" : "#e8e8dc"}
      ambient={1.45}
      lightPosition={[-2.8, 7.4, 4.8]}
      lightIntensity={2.2}
      minDistance={6.4}
      maxDistance={15.2}
      fallback={fallback}
    >
      <PreparedRoomShell
        width={8.6}
        depth={6.4}
        height={3.8}
        floorColors={["#dfc9a6", "#d7bc92", "#ddc39e"]}
        backWallColor="#eeece2"
        sideWallColor="#e2e6dc"
      >
        <WideShelf />
        {scene.placements.map((placement) => (
          <MaterialHotspot
            key={placement.materialId}
            placement={placement}
            onSelect={onSelect}
          />
        ))}
        {kind === "culture-corner" && <CultureDetails />}
        {kind === "art-studio" && <ArtDetails />}
        {kind === "grace-courtesy-space" && <CourtesyDetails />}
        <Plant at={[-3.65, 0, -2.35]} scale={0.95} />
        <Plant at={[3.7, 0, 2.35]} scale={0.75} />
      </PreparedRoomShell>
    </RoomStage>
  );
}
