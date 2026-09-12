import type { MaterialId, RoomSceneDefinition } from "../domain/material";
import { Box, MaterialHotspot, Plant, PreparedRoomShell } from "./RoomObjects";
import RoomStage from "./RoomStage";

function LanguageShelf() {
  return (
    <group position={[-1.05, 0, -2.62]}>
      <Box at={[0, 0.72, -0.28]} size={[4.7, 1.4, 0.07]} color="#c9a979" />
      {[0.12, 0.7, 1.34].map((y) => (
        <Box key={y} at={[0, y, 0]} size={[4.8, 0.09, 0.72]} color="#d3b483" />
      ))}
      {[-2.32, -0.78, 0.78, 2.32].map((x) => (
        <Box
          key={x}
          at={[x, 0.72, 0]}
          size={[0.08, 1.42, 0.72]}
          color="#c29f70"
        />
      ))}
      {[0.25, 0.62, 0.99].map((x, index) => (
        <Box
          key={x}
          at={[x, 1.49, -0.05]}
          size={[0.28, 0.38 + index * 0.04, 0.05]}
          color={["#b88169", "#a7b39d", "#c8a975"][index]}
        />
      ))}
    </group>
  );
}

export default function LanguageScene({
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
      camera={[7.2, 5.5, 8.7]}
      target={[0, 0.78, -0.35]}
      background="#e9e8dd"
      ambient={1.48}
      lightPosition={[-3, 7, 4.5]}
      lightIntensity={2.15}
      minDistance={6.3}
      maxDistance={15}
      fallback="Explore the Language material using the collection below."
    >
      <PreparedRoomShell
        width={8.4}
        depth={6.2}
        height={3.7}
        floorColors={["#dfcba9", "#d8bf98", "#ddc6a2"]}
        backWallColor="#eeece2"
        sideWallColor="#e3e6db"
      >
        <LanguageShelf />
        {scene.placements.map((placement) => (
          <MaterialHotspot
            key={placement.materialId}
            placement={placement}
            onSelect={onSelect}
          />
        ))}

        <group position={[-4.08, 2.2, 0.35]}>
          <Box at={[0, 0, 0]} size={[0.08, 1.85, 2.4]} color="#faf7eb" />
          <Box at={[0.052, 0, 0]} size={[0.02, 1.65, 2.18]} color="#c6d8d2" />
          <Box at={[0.074, 0, 0]} size={[0.025, 1.66, 0.045]} color="#faf7ed" />
          <Box at={[0.074, 0, 0]} size={[0.025, 0.045, 2.18]} color="#faf7ed" />
        </group>

        {/* A writing table holds only a few clear invitations. */}
        <group position={[2.55, 0, 1.2]}>
          <Box at={[0, 0.84, 0]} size={[1.7, 0.1, 1.05]} color="#d4b685" />
          {[-0.66, 0.66].flatMap((x) =>
            [-0.38, 0.38].map((z) => (
              <Box
                key={`${x}-${z}`}
                at={[x, 0.41, z]}
                size={[0.08, 0.82, 0.08]}
                color="#bb996c"
              />
            )),
          )}
          <Box
            at={[-0.15, 0.91, 0]}
            size={[0.78, 0.018, 0.58]}
            color="#f0eadc"
          />
          {[0, 1, 2].map((index) => (
            <Box
              key={index}
              at={[0.38 + index * 0.055, 0.94, 0.02]}
              size={[0.035, 0.035, 0.58]}
              color={["#a8815d", "#7f9471", "#ac7765"][index]}
            />
          ))}
        </group>

        {/* Quiet book area with front-facing covers. */}
        <group position={[2.75, 0, -1.65]}>
          <Box at={[0, 0.08, 0]} size={[1.75, 0.1, 1.28]} color="#ddd1b8" />
          <mesh position={[0, 0.22, 0]} scale={[0.82, 0.17, 0.52]}>
            <sphereGeometry args={[1, 24, 16]} />
            <meshStandardMaterial color="#b9bba3" roughness={1} />
          </mesh>
          <Box
            at={[0, 1.15, -0.58]}
            size={[1.55, 0.06, 0.28]}
            color="#cfb187"
          />
          {[-0.48, 0, 0.48].map((x, index) => (
            <Box
              key={x}
              at={[x, 1.36, -0.55]}
              size={[0.35, 0.43, 0.045]}
              color={["#9fb19d", "#c69f72", "#9eafba"][index]}
            />
          ))}
        </group>

        <Box
          at={[-0.55, 0.045, 0.7]}
          size={[3.35, 0.035, 2.05]}
          color="#e8dfc7"
        />
        <Plant at={[-3.42, 0, -2.38]} scale={1.0} />
        <Plant at={[3.68, 0, 2.25]} scale={0.78} />
      </PreparedRoomShell>
    </RoomStage>
  );
}
