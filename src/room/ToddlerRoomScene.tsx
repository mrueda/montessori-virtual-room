import { Box, MaterialHotspot, Plant, PreparedRoomShell } from "./RoomObjects";
import RoomStage from "./RoomStage";
import type { MaterialId, RoomSceneDefinition } from "../domain/material";
function LowShelf({
  position,
  rotation = 0,
}: {
  position: [number, number, number];
  rotation?: number;
}) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <Box at={[0, 0.37, -0.3]} size={[2.3, 0.65, 0.065]} color="#d3b88b" />
      {[0.12, 0.69].map((y) => (
        <Box key={y} at={[0, y, 0]} size={[2.4, 0.085, 0.72]} color="#d5b988" />
      ))}
      {[-1.15, 0, 1.15].map((x) => (
        <Box
          key={x}
          at={[x, 0.4, 0]}
          size={[0.065, 0.67, 0.72]}
          color="#c7aa79"
        />
      ))}
    </group>
  );
}
function Cushion({
  at,
  color,
  scale = [1, 1, 1],
}: {
  at: [number, number, number];
  color: string;
  scale?: [number, number, number];
}) {
  return (
    <mesh position={at} scale={scale} castShadow receiveShadow>
      <sphereGeometry args={[1, 24, 16]} />
      <meshStandardMaterial color={color} roughness={1} />
    </mesh>
  );
}
function Chair({
  at,
  turn = 0,
}: {
  at: [number, number, number];
  turn?: number;
}) {
  return (
    <group position={at} rotation={[0, turn, 0]}>
      <Box at={[0, 0.35, 0]} size={[0.5, 0.07, 0.5]} color="#c8ab7e" />
      <Box at={[0, 0.6, 0.22]} size={[0.5, 0.4, 0.06]} color="#d3b78a" />
      {[-0.19, 0.19].flatMap((x) =>
        [-0.19, 0.19].map((z) => (
          <Box
            key={`${x}-${z}`}
            at={[x, 0.18, z]}
            size={[0.055, 0.35, 0.055]}
            color="#b9996b"
          />
        )),
      )}
    </group>
  );
}
export default function ToddlerRoomScene({
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
      camera={[8.4, 7.4, 10.8]}
      target={[0, 0.55, 0]}
      background="#e9e6dc"
      ambient={1.65}
      lightPosition={[1, 8, 4]}
      lightIntensity={2}
      fallback="Explore the toddler materials using the cards below."
    >
      <PreparedRoomShell
        width={9}
        depth={7}
        height={3.5}
        floorColors={["#ddccaf", "#dac6a8", "#ddccaf"]}
        backWallColor="#f1e9de"
        sideWallColor="#e2e5d4"
      >
        {/* A broad low window at the back brings the garden into view. */}
        <Box at={[0.75, 2.12, -3.4]} size={[4.7, 2.02, 0.07]} color="#fcf8ed" />
        <Box
          at={[0.75, 2.12, -3.35]}
          size={[4.48, 1.82, 0.02]}
          color="#c9d9d4"
        />
        {[-0.55, 0.55, 1.8].map((x, i) => (
          <mesh
            key={x}
            position={[x, 1.63 + i * 0.1, -3.325]}
            scale={[0.5, 0.45, 0.012]}
          >
            <sphereGeometry args={[1, 18, 12]} />
            <meshStandardMaterial color={i % 2 ? "#b2c4a5" : "#bfd0b0"} />
          </mesh>
        ))}
        {[-0.75, 0.75, 2.25].map((x) => (
          <Box
            key={x}
            at={[x, 2.12, -3.31]}
            size={[0.05, 1.83, 0.045]}
            color="#f9f7ee"
          />
        ))}
        <Box
          at={[0.75, 2.08, -3.29]}
          size={[4.48, 0.045, 0.06]}
          color="#faf7ed"
        />
        <Box at={[0.75, 1.09, -3.2]} size={[4.85, 0.1, 0.38]} color="#dfc7a3" />
        <group position={[2.3, 0, 1.8]}>
          <Box at={[0, 0.68, 0]} size={[1.5, 0.08, 1.05]} color="#d8be96" />
          {[-0.58, 0.58].flatMap((x) =>
            [-0.37, 0.37].map((z) => (
              <Box
                key={`${x}-${z}`}
                at={[x, 0.34, z]}
                size={[0.08, 0.68, 0.08]}
                color="#bd9d70"
              />
            )),
          )}
          <Box at={[0, 0.36, 0.95]} size={[0.58, 0.07, 0.55]} color="#c8aa7b" />
          <Box at={[0, 0.62, 1.2]} size={[0.58, 0.52, 0.05]} color="#bd9d70" />
          {[-0.23, 0.23].flatMap((x) =>
            [0.73, 1.16].map((z) => (
              <Box
                key={`${x}-${z}`}
                at={[x, 0.17, z]}
                size={[0.06, 0.34, 0.06]}
                color="#bd9d70"
              />
            )),
          )}
        </group>
        <LowShelf position={[-2.55, 0, -2.7]} />
        <LowShelf position={[-3.85, 0, -0.25]} rotation={Math.PI / 2} />
        {/* A few everyday objects and baskets, with room between each work. */}
        {[-3.05, -2.0].map((x, i) => (
          <group key={x} position={[x, 0.18, -2.7]}>
            <Box
              at={[0, 0.12, 0]}
              size={[0.53, 0.24, 0.42]}
              color={i ? "#b9aa84" : "#baa17a"}
            />
            <Box at={[0, 0.25, 0]} size={[0.44, 0.015, 0.34]} color="#8f8261" />
          </group>
        ))}
        {/* Child-height mirror and low support rail are away from the shelves. */}
        <Box at={[-4.4, 0.75, 2.08]} size={[0.08, 1.15, 1.9]} color="#c6ac83" />
        <Box
          at={[-4.35, 0.75, 2.08]}
          size={[0.022, 1.02, 1.75]}
          color="#cad8d0"
        />
        <Box
          at={[-4.18, 0.58, 2.08]}
          size={[0.07, 0.07, 2.02]}
          color="#ad9165"
        />
        {[1.3, 2.9].map((z) => (
          <Box
            key={z}
            at={[-4.29, 0.58, z]}
            size={[0.24, 0.05, 0.05]}
            color="#ad9165"
          />
        ))}
        {/* Clear central space for movement, with a soft circular work rug. */}
        <mesh position={[0.6, 0.038, 0.1]} receiveShadow>
          <cylinderGeometry args={[1.68, 1.68, 0.035, 64]} />
          <meshStandardMaterial color="#cbd0b5" roughness={1} />
        </mesh>
        {[1.5, 1.56].map((r) => (
          <mesh
            key={r}
            position={[0.6, 0.059, 0.1]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <ringGeometry args={[r, r + 0.012, 64]} />
            <meshStandardMaterial color="#abb599" />
          </mesh>
        ))}
        {/* Reading nook: floor cushions and forward-facing books. */}
        <Box
          at={[3.05, 0.06, -2.26]}
          size={[2.15, 0.08, 1.5]}
          color="#ded2bb"
        />
        <Cushion
          at={[3.03, 0.25, -2.23]}
          color="#c0bea5"
          scale={[0.95, 0.22, 0.63]}
        />
        <Cushion
          at={[3.1, 0.63, -2.82]}
          color="#b8bba1"
          scale={[0.87, 0.48, 0.17]}
        />
        <Cushion
          at={[2.48, 0.5, -2.4]}
          color="#cfad96"
          scale={[0.3, 0.3, 0.16]}
        />
        <group position={[2.85, 1.5, -3.24]}>
          <Box at={[0, -0.17, 0]} size={[1.48, 0.06, 0.32]} color="#d1b58b" />
          {[-0.45, 0, 0.45].map((x, i) => (
            <group
              key={x}
              position={[x, 0, 0]}
              rotation={[0, 0, (i - 1) * -0.05]}
            >
              <Box
                at={[0, 0, 0]}
                size={[0.34, 0.45, 0.04]}
                color={["#a8bba3", "#d0b083", "#b1bdc3"][i]}
              />
              <Box
                at={[0, 0, 0.025]}
                size={[0.2, 0.23, 0.009]}
                color="#f0eadc"
              />
            </group>
          ))}
          <Box
            at={[0, -0.09, 0.17]}
            size={[1.48, 0.035, 0.035]}
            color="#bfa47e"
          />
        </group>
        {/* Low table and two small chairs, separate from the reading/movement areas. */}
        <group position={[-1.2, 0, 1.6]}>
          <Box at={[0, 0.68, 0]} size={[1.5, 0.08, 1.05]} color="#d8be96" />
          {[-0.58, 0.58].flatMap((x) =>
            [-0.37, 0.37].map((z) => (
              <Box
                key={`${x}-${z}`}
                at={[x, 0.34, z]}
                size={[0.08, 0.68, 0.08]}
                color="#c1a378"
              />
            )),
          )}
        </group>
        <Chair at={[-1.2, 0, 2.48]} />
        <Chair at={[-1.2, 0, 0.72]} turn={Math.PI} />
        {/* Practical care area: a low washstand, towel, and small brush. */}
        <group position={[3.15, 0, 1.65]}>
          <Box at={[0, 0.43, 0]} size={[1.12, 0.8, 0.75]} color="#d0b893" />
          <Box at={[0, 0.86, 0]} size={[1.28, 0.08, 0.88]} color="#e4d3b5" />
          <mesh position={[0, 0.97, 0]}>
            <cylinderGeometry args={[0.32, 0.23, 0.15, 32]} />
            <meshStandardMaterial color="#edeadd" />
          </mesh>
          <mesh position={[0, 1.045, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.27, 32]} />
            <meshStandardMaterial color="#b7caca" />
          </mesh>
          <Box
            at={[0.67, 0.67, 0.1]}
            size={[0.02, 0.48, 0.37]}
            color="#c9d2bd"
          />
          <Box at={[0, 0.32, 0.39]} size={[0.58, 0.3, 0.025]} color="#bba37f" />
        </group>
        <group position={[4.04, 0.4, 0.65]} rotation={[0, 0, -0.12]}>
          <Box at={[0, 0.2, 0]} size={[0.035, 0.8, 0.035]} color="#b59a70" />
          <Box at={[0, -0.22, 0]} size={[0.24, 0.15, 0.06]} color="#9e9b77" />
        </group>
        <Plant at={[4.0, 0, -1.0]} scale={0.85} />
        <Plant at={[-0.2, 1.15, -3.17]} scale={0.45} />
        {/* Artwork at a lower eye level than the primary classroom. */}
        <group position={[-3.25, 1.52, -3.38]}>
          <Box at={[0, 0, 0]} size={[0.6, 0.7, 0.05]} color="#c6ac82" />
          <Box at={[0, 0, 0.03]} size={[0.5, 0.6, 0.015]} color="#f2ecdd" />
          <mesh position={[0, 0, 0.045]} scale={[0.12, 0.2, 0.01]}>
            <sphereGeometry args={[1, 16, 12]} />
            <meshStandardMaterial color="#a8b58e" />
          </mesh>
        </group>
        {scene.placements.map((placement) => (
          <MaterialHotspot
            key={placement.materialId}
            placement={placement}
            onSelect={onSelect}
          />
        ))}
      </PreparedRoomShell>
    </RoomStage>
  );
}
