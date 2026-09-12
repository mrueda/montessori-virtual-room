import { Html } from "@react-three/drei";
import type { MaterialId, RoomSceneDefinition } from "../domain/material";
import { environmentRooms } from "../content/en/environments";
import { Box, Plant, PreparedRoomShell, MaterialHotspot } from "./RoomObjects";
import RoomStage from "./RoomStage";

function Table({
  at,
  width = 2,
  depth = 1.2,
  height = 1,
}: {
  at: [number, number, number];
  width?: number;
  depth?: number;
  height?: number;
}) {
  return (
    <group position={at}>
      <Box at={[0, height, 0]} size={[width, 0.12, depth]} color="#c9a577" />
      {[-1, 1].flatMap((x) =>
        [-1, 1].map((z) => (
          <Box
            key={`${x}${z}`}
            at={[x * (width / 2 - 0.15), height / 2, z * (depth / 2 - 0.15)]}
            size={[0.1, height, 0.1]}
            color="#aa8159"
          />
        )),
      )}
    </group>
  );
}
function Chair({
  at,
  adult = false,
  rotation = 0,
}: {
  at: [number, number, number];
  adult?: boolean;
  rotation?: number;
}) {
  const h = adult ? 0.65 : 0.5;
  return (
    <group position={at} rotation={[0, rotation, 0]}>
      <Box at={[0, h, 0]} size={[0.65, 0.1, 0.65]} color="#a0ac90" />
      <Box at={[0, h + 0.35, 0.28]} size={[0.65, 0.7, 0.09]} color="#b59b77" />
      {[-0.24, 0.24].flatMap((x) =>
        [-0.24, 0.24].map((z) => (
          <Box
            key={`${x}${z}`}
            at={[x, h / 2, z]}
            size={[0.07, h, 0.07]}
            color="#ae8d65"
          />
        )),
      )}
    </group>
  );
}
function Shelf({
  at,
  tall = false,
  books = false,
}: {
  at: [number, number, number];
  tall?: boolean;
  books?: boolean;
}) {
  const levels = tall ? [0.12, 0.75, 1.4, 2.05] : [0.12, 0.65, 1.18];
  const height = levels.at(-1)!;
  return (
    <group position={at}>
      <Box
        at={[0, height / 2, -0.25]}
        size={[2.6, height, 0.07]}
        color="#b99a71"
      />
      {levels.map((y) => (
        <Box key={y} at={[0, y, 0]} size={[2.7, 0.08, 0.65]} color="#d1b88d" />
      ))}
      {[-1.3, 0, 1.3].map((x) => (
        <Box
          key={x}
          at={[x, height / 2, 0]}
          size={[0.08, height, 0.65]}
          color="#bc9c6f"
        />
      ))}
      {books &&
        levels
          .slice(0, -1)
          .flatMap((y, row) =>
            Array.from({ length: 8 }, (_, i) => (
              <Box
                key={`${row}-${i}`}
                at={[-1.12 + i * 0.29, y + 0.25, -0.02]}
                size={[0.17, 0.34 + (i % 3) * 0.07, 0.32]}
                color={["#879d93", "#ba9476", "#a2a3b2", "#d0bd91"][i % 4]}
              />
            )),
          )}
    </group>
  );
}
function Window({
  at,
  width = 2,
}: {
  at: [number, number, number];
  width?: number;
}) {
  return (
    <group position={at}>
      <Box at={[0, 0, 0]} size={[width, 1.6, 0.08]} color="#faf5e8" />
      <Box
        at={[0, 0, 0.05]}
        size={[width - 0.15, 1.44, 0.02]}
        color="#b6cfcc"
      />
      <Box at={[0, 0, 0.075]} size={[0.06, 1.44, 0.03]} color="#faf5e8" />
      <Box
        at={[0, 0, 0.075]}
        size={[width - 0.15, 0.05, 0.03]}
        color="#faf5e8"
      />
    </group>
  );
}
function Nido() {
  return (
    <>
      <group position={[-1.65, 0, 0.45]}>
        <Box at={[0, 0.08, 0]} size={[2.8, 0.12, 2.2]} color="#d7d8bf" />
        <Box
          at={[-2.15, 0.72, -0.15]}
          size={[0.08, 1.25, 2.5]}
          color="#c0a47c"
        />
        <Box
          at={[-2.1, 0.72, -0.15]}
          size={[0.02, 1.1, 2.32]}
          color="#c3d4d0"
        />
      </group>
      <group position={[-1.7, 0, -2.6]} scale={[1, 0.5, 1]}>
        <Shelf at={[0, 0, 0]} />
      </group>
      <group position={[2.55, 0, -1.65]}>
        <Box at={[0, 0.37, 0]} size={[1.2, 0.38, 1]} color="#dad0bc" />
        <Box at={[0, 0.96, -0.44]} size={[1.2, 0.9, 0.23]} color="#d7cbb6" />
        {[-0.57, 0.57].map((x) => (
          <Box
            key={x}
            at={[x, 0.64, 0]}
            size={[0.16, 0.55, 1.03]}
            color="#b79a75"
          />
        ))}
      </group>
      <Box at={[2.3, 0.055, 1.3]} size={[2.15, 0.04, 1.6]} color="#e9dbc6" />
      <Window at={[0.35, 2.25, -3.05]} />
    </>
  );
}
function LowerElementary() {
  return (
    <>
      <Shelf at={[-2.6, 0, -2.65]} />
      <Shelf at={[2.55, 0, -2.65]} books />
      <Window at={[0, 2.4, -3.08]} width={1.8} />
      <Table at={[0.2, 0, 0.75]} width={2.9} depth={1.6} height={0.92} />
      {[-0.8, 1.1].map((x) => (
        <Chair key={x} at={[x, 0, 2.05]} />
      ))}
      <Chair at={[0.2, 0, -0.55]} rotation={Math.PI} />
      <Box at={[-2.8, 0.045, 1]} size={[1.6, 0.025, 2.55]} color="#bdc8ae" />
    </>
  );
}
function UpperElementary() {
  return (
    <>
      <Shelf at={[-2.65, 0, -2.65]} tall books />
      <Shelf at={[0.1, 0, -2.65]} tall books />
      <group position={[2.7, 2, -3.05]}>
        <Box at={[0, 0, 0]} size={[1.9, 1.55, 0.09]} color="#ac8d63" />
        <Box at={[0, 0, 0.06]} size={[1.74, 1.4, 0.03]} color="#bcae8a" />
        {[-0.5, 0, 0.5].map((x, i) => (
          <Box
            key={x}
            at={[x, 0.15 - (i % 2) * 0.25, 0.09]}
            size={[0.38, 0.55, 0.02]}
            color="#f1ebd8"
          />
        ))}
      </group>
      <Table at={[1.55, 0, 0.65]} width={3.1} depth={1.65} height={1.05} />
      {[-0.55, 1.55, 3.65].map((x, i) => (
        <Chair
          key={x}
          at={[x, 0, i === 1 ? 2 : 0.6]}
          adult
          rotation={i === 0 ? -Math.PI / 2 : i === 2 ? Math.PI / 2 : 0}
        />
      ))}
      <Table at={[-2.75, 0, 0.4]} width={1.2} depth={1.7} height={1.05} />

      <Chair at={[-2.75, 0, 1.6]} adult />

      <Box at={[2.25, 1.13, 0.9]} size={[0.65, 0.03, 0.45]} color="#f3edda" />
    </>
  );
}
function Adolescent() {
  return (
    <>
      <Box at={[3.35, 0.01, 0]} size={[2.15, 0.025, 6.1]} color="#a9b397" />
      {[-1.5, 0.7].map((z) => (
        <group key={z} position={[3.35, 0, z]}>
          <Box at={[0, 0.23, 0]} size={[1.7, 0.4, 1.55]} color="#a78a64" />
          <Box at={[0, 0.45, 0]} size={[1.5, 0.03, 1.35]} color="#76664c" />
          {[-0.45, 0, 0.45].flatMap((x) =>
            [-0.35, 0.35].map((dz) => (
              <mesh
                key={`${x}-${dz}`}
                position={[x, 0.59, dz]}
                scale={[0.16, 0.13, 0.18]}
              >
                <sphereGeometry args={[1, 10, 8]} />
                <meshStandardMaterial color="#80936a" />
              </mesh>
            )),
          )}
        </group>
      ))}
      <Table at={[-2.55, 0, -2.3]} width={3} depth={1} height={1.15} />
      <Box at={[-2.55, 2.05, -3.06]} size={[2.8, 1.1, 0.08]} color="#af936b" />
      {[-3.4, -2.9, -2.4, -1.9].map((x) => (
        <group key={x}>
          <Box at={[x, 2, -2.98]} size={[0.07, 0.55, 0.06]} color="#687876" />
          <Box at={[x, 2.27, -2.95]} size={[0.3, 0.09, 0.07]} color="#78837e" />
        </group>
      ))}
      <Shelf at={[0.5, 0, -2.65]} books />
      <Table at={[-0.4, 0, 1]} width={3} depth={1.6} height={1.08} />
      {[-1.3, 0.65].map((x) => (
        <Chair key={x} at={[x, 0, 2.3]} adult />
      ))}
      <Chair at={[-0.4, 0, -0.2]} adult rotation={Math.PI} />
      <Box at={[-0.55, 1.16, 1]} size={[0.9, 0.02, 0.6]} color="#f2ead8" />
    </>
  );
}
export default function DevelopmentalRoomScene({
  scene,
  resetKey,
  onSelect,
}: {
  scene: RoomSceneDefinition;
  resetKey: number;
  onSelect: (id: MaterialId) => void;
}) {
  const room = Object.values(environmentRooms).find(
    (candidate) => candidate.defaultSceneId === scene.id,
  )!;
  return (
    <RoomStage
      sceneKey={scene.id}
      resetKey={resetKey}
      camera={[8.5, 6.8, 10.8]}
      target={[0, 0.85, 0]}
      minDistance={6}
      maxDistance={18}
      background={scene.renderer === "nido" ? "#eee9df" : "#e6e9df"}
      fallback="Read about this environment below."
    >
      <PreparedRoomShell
        width={9}
        depth={6.4}
        height={3.8}
        floorColors={["#dfcbaa", "#d8c09b", "#dfc7a6"]}
        backWallColor="#ebe9df"
        sideWallColor={scene.renderer === "nido" ? "#e1e5da" : "#d6ded5"}
      >
        {scene.renderer === "nido" && <Nido />}
        {scene.renderer === "lower-elementary" && <LowerElementary />}
        {scene.renderer === "upper-elementary" && <UpperElementary />}
        {scene.renderer === "adolescent" && <Adolescent />}
        {scene.renderer !== "nido" && (
          <Plant at={[-3.9, 0, 2.45]} scale={0.8} />
        )}
        {scene.placements.map((placement) => (
          <MaterialHotspot
            key={placement.materialId}
            placement={placement}
            onSelect={onSelect}
          />
        ))}
        {room.guide.points.map((point, i) => (
          <Html
            key={point.id}
            center
            position={point.position}
            zIndexRange={[15, 0]}
          >
            <button
              className="environment-marker"
              aria-label={`Explore ${point.title}`}
              onClick={() => {
                const target = document.getElementById(
                  `environment-${point.id}`,
                ) as HTMLDetailsElement | null;
                if (target) {
                  target.open = true;
                  target.scrollIntoView({
                    behavior: window.matchMedia(
                      "(prefers-reduced-motion: reduce)",
                    ).matches
                      ? "instant"
                      : "smooth",
                    block: "center",
                  });
                  target
                    .querySelector("summary")
                    ?.focus({ preventScroll: true });
                }
              }}
            >
              {i + 1}
            </button>
          </Html>
        ))}
      </PreparedRoomShell>
    </RoomStage>
  );
}
