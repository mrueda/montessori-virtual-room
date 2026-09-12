import type { MaterialId, RoomSceneDefinition } from "../domain/material";
import { Box, MaterialHotspot, Plant, PreparedRoomShell } from "./RoomObjects";
import RoomStage from "./RoomStage";

function Shelf({ x, width = 2.8 }: { x: number; width?: number }) {
  return (
    <group position={[x, 0, -2.65]}>
      <Box at={[0, 0.77, -0.31]} size={[width, 1.5, 0.08]} color="#ceb386" />
      {[0.15, 0.76, 1.4].map((y) => (
        <Box key={y} at={[0, y, 0]} size={[width, 0.1, 0.78]} color="#cfaf7e" />
      ))}
      {[-width / 2, width / 2].map((xPosition) => (
        <Box
          key={xPosition}
          at={[xPosition, 0.79, 0]}
          size={[0.09, 1.65, 0.78]}
          color="#d8bb8b"
        />
      ))}
    </group>
  );
}

export interface RoomSceneRendererProps {
  scene: RoomSceneDefinition;
  onSelect: (id: MaterialId) => void;
  resetKey: number;
}

export default function RoomScene({
  scene,
  onSelect,
  resetKey,
}: RoomSceneRendererProps) {
  return (
    <RoomStage
      sceneKey={scene.id}
      resetKey={resetKey}
      camera={[8, 7.2, 10]}
      target={[0, 0.9, -0.3]}
      ambient={1.25}
      lightIntensity={2.4}
      maxDistance={17}
      fallback="Explore the classroom using the material cards below."
    >
      <PreparedRoomShell
        width={10}
        depth={7}
        height={4}
        floorColors={["#dcc6a2", "#d5b98e", "#d9bf98"]}
        backWallColor="#ecebdf"
        sideWallColor="#e3e4d5"
      >
        {[-1.9, 1.2].map((z) => (
          <group key={z}>
            <Box at={[-4.88, 2.5, z]} size={[0.1, 2, 1.85]} color="#faf7e9" />
            <Box
              at={[-4.81, 2.5, z]}
              size={[0.03, 1.8, 1.65]}
              color="#c5d6d0"
            />
            <Box
              at={[-4.77, 2.5, z]}
              size={[0.04, 1.8, 0.045]}
              color="#f7f4e8"
            />
            <Box
              at={[-4.77, 2.5, z]}
              size={[0.04, 0.045, 1.65]}
              color="#f7f4e8"
            />
            <Box at={[-4.7, 1.5, z]} size={[0.34, 0.09, 2]} color="#f7f4e8" />
          </group>
        ))}

        <Shelf x={-2.65} />
        <Shelf x={0.6} />
        <Shelf x={3.65} width={2.3} />
        {scene.placements.map((placement) => (
          <MaterialHotspot
            key={placement.materialId}
            placement={placement}
            onSelect={onSelect}
          />
        ))}

        <group>
          {[0, 1, 2, 3, 4, 5, 6].map((index) => (
            <Box
              key={index}
              at={[2.9 + index * 0.19, 0.98, -2.65]}
              size={[0.12, 0.35 + (index % 3) * 0.08, 0.3]}
              color={["#b5765d", "#a9b4a0", "#d6bd87"][index % 3]}
            />
          ))}
          <Box
            at={[3.5, 1.47, -2.6]}
            size={[1.45, 0.06, 0.4]}
            color="#c89e73"
          />
          {[0, 1, 2, 3, 4].map((index) => (
            <Box
              key={index}
              at={[3 + index * 0.23, 1.56, -2.6]}
              size={[0.15, 0.14, 0.3]}
              color={index % 2 ? "#9caeb3" : "#be6d5b"}
            />
          ))}
        </group>

        <Box at={[-0.6, 0.05, 0.5]} size={[3.9, 0.035, 2.5]} color="#e7dfc6" />
        {[-0.66, -0.57, -0.48, 0.48, 0.57, 0.66].map((z) => (
          <Box
            key={z}
            at={[-0.6, 0.075, 0.5 + z * 1.7]}
            size={[3.8, 0.005, 0.014]}
            color="#c8bd9e"
          />
        ))}

        <group position={[2.75, 0, 1.3]}>
          <Box at={[0, 0.95, 0]} size={[1.9, 0.12, 1.15]} color="#d7b989" />
          {[-0.75, 0.75].flatMap((x) =>
            [-0.4, 0.4].map((z) => (
              <Box
                key={`${x}${z}`}
                at={[x, 0.45, z]}
                size={[0.1, 0.9, 0.1]}
                color="#c5a477"
              />
            )),
          )}
          <Plant at={[0.45, 1.02, 0]} scale={0.4} />
        </group>
        <group position={[2.8, 0, 2.5]}>
          <Box at={[0, 0.55, 0]} size={[0.62, 0.08, 0.6]} color="#bca579" />
          <Box at={[0, 0.95, 0.25]} size={[0.62, 0.6, 0.07]} color="#cdb487" />
          {[-0.24, 0.24].flatMap((x) =>
            [-0.24, 0.24].map((z) => (
              <Box
                key={`${x}${z}`}
                at={[x, 0.27, z]}
                size={[0.06, 0.55, 0.06]}
                color="#bca579"
              />
            )),
          )}
        </group>
        <Plant at={[-4.2, 0, -2.6]} scale={1.3} />
        <Plant at={[4.4, 1.46, -2.7]} scale={0.65} />
        <group position={[-0.1, 2.8, -3.37]}>
          <Box at={[0, 0, 0]} size={[0.8, 0.95, 0.05]} color="#b69e76" />
          <Box at={[0, 0, 0.035]} size={[0.7, 0.85, 0.02]} color="#f6f2e6" />
          <mesh
            position={[0, 0, 0.055]}
            scale={[0.15, 0.28, 0.01]}
            rotation={[0, 0, -0.3]}
          >
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial color="#a4ac8c" />
          </mesh>
        </group>
      </PreparedRoomShell>
    </RoomStage>
  );
}
