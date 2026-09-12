import ElementaryMaterialModel, {
  elementaryModelIds,
} from "./ElementaryMaterialModel";
import { useState } from "react";
import type { ReactNode } from "react";
import { Html } from "@react-three/drei";
import type { MaterialId, RoomSceneDefinition } from "../domain/material";
import { content } from "../content/en/materials";
import { studyConfigs } from "../activities/studies/config";
import type { StudyConfig } from "../activities/studies/config";

type Placement = RoomSceneDefinition["placements"][number];
export function Box({
  at,
  size,
  color,
}: {
  at: [number, number, number];
  size: [number, number, number];
  color: string;
}) {
  return (
    <mesh position={at} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} roughness={0.85} />
    </mesh>
  );
}
export function MaterialModel({ id }: { id: MaterialId }) {
  if (elementaryModelIds.includes(id))
    return <ElementaryMaterialModel id={id} />;
  const study: StudyConfig | undefined = studyConfigs.find(
    (config) => config.id === id,
  );
  if (id === "transferring")
    return (
      <group>
        <Box at={[0, 0.025, 0]} size={[1.1, 0.05, 0.6]} color="#c6a675" />
        {[-0.28, 0.28].map((x, i) => (
          <group key={x} position={[x, 0.09, 0]}>
            <mesh>
              <cylinderGeometry args={[0.18, 0.12, 0.12, 24]} />
              <meshStandardMaterial color="#d9bb8b" />
            </mesh>
            {i === 0 &&
              [-0.08, 0, 0.08].map((z) => (
                <mesh key={z} position={[0, 0.09, z]}>
                  <sphereGeometry args={[0.05, 12, 10]} />
                  <meshStandardMaterial color="#ad824e" />
                </mesh>
              ))}
          </group>
        ))}
      </group>
    );
  if (id === "shape-puzzle")
    return (
      <group>
        <Box at={[0, 0.045, 0]} size={[1.05, 0.09, 0.45]} color="#c6a572" />
        {[0, 1, 2].map((i) => (
          <group key={i} position={[(i - 1) * 0.32, 0.1, 0]}>
            <mesh>
              <cylinderGeometry
                args={[0.12, 0.12, 0.025, i === 0 ? 24 : i === 1 ? 4 : 3]}
              />
              <meshStandardMaterial color="#dbb77b" />
            </mesh>
            <mesh position={[0, 0.04, 0]}>
              <sphereGeometry args={[0.025, 10, 8]} />
              <meshStandardMaterial color="#a67e47" />
            </mesh>
          </group>
        ))}
      </group>
    );

  if (id === "pink-tower") {
    let y = 0;
    return (
      <group>
        {Array.from({ length: 10 }, (_, i) => {
          const s = (10 - i) * 0.022;
          const cy = y + s / 2;
          y += s;
          return (
            <Box key={i} at={[0, cy, 0]} size={[s, s, s]} color="#cf8795" />
          );
        })}
      </group>
    );
  }
  if (id === "cylinder-blocks")
    return (
      <group>
        <Box at={[0, 0.07, 0]} size={[1.05, 0.14, 0.28]} color="#c8a16a" />
        {Array.from({ length: 8 }, (_, i) => (
          <group key={i} position={[-0.43 + i * 0.12, 0.16, 0]}>
            <mesh>
              <cylinderGeometry
                args={[0.025 + i * 0.003, 0.025 + i * 0.003, 0.1, 16]}
              />
              <meshStandardMaterial color="#dfc398" />
            </mesh>
            <mesh position={[0, 0.08, 0]}>
              <sphereGeometry args={[0.025, 10, 8]} />
              <meshStandardMaterial color="#b68d56" />
            </mesh>
          </group>
        ))}
      </group>
    );
  if (id === "pouring")
    return (
      <group>
        <Box at={[0, 0.035, 0]} size={[0.95, 0.07, 0.58]} color="#bfa273" />
        {[-0.23, 0.23].map((x, i) => (
          <group key={x} position={[x, 0.1, 0]}>
            <mesh position={[0, 0.18, 0]}>
              <cylinderGeometry args={[0.12, 0.16, 0.34, 24]} />
              <meshStandardMaterial color={i ? "#91a798" : "#eeeadd"} />
            </mesh>
            <mesh position={[0.14, 0.23, 0]}>
              <torusGeometry args={[0.09, 0.024, 8, 24]} />
              <meshStandardMaterial color={i ? "#91a798" : "#eeeadd"} />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.353, 0]}>
              <circleGeometry args={[0.095, 24]} />
              <meshStandardMaterial color="#71908f" />
            </mesh>
          </group>
        ))}
      </group>
    );
  if (id === "dressing-frame")
    return (
      <group rotation={[-0.35, 0, 0]}>
        <Box at={[0, 0.055, 0]} size={[0.65, 0.09, 0.48]} color="#bd996b" />
        <Box at={[0, 0.11, 0]} size={[0.54, 0.015, 0.38]} color="#8ca6b6" />
        {[-0.12, 0, 0.12].map((z) => (
          <mesh key={z} position={[0, 0.13, z]} rotation={[-Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.027, 0.027, 0.02, 12]} />
            <meshStandardMaterial color="#eee4ce" />
          </mesh>
        ))}
      </group>
    );
  if (id === "red-rods")
    return (
      <group position={[-0.38, 0, 0]}>
        {Array.from({ length: 10 }, (_, index) => {
          const width = 0.16 + index * 0.075;
          return (
            <Box
              key={index}
              at={[width / 2, 0.025 + index * 0.018, (index - 4.5) * 0.042]}
              size={[width, 0.035, 0.032]}
              color="#b84b42"
            />
          );
        })}
      </group>
    );
  if (id === "number-rods")
    return (
      <group position={[-0.38, 0, 0]}>
        {Array.from({ length: 7 }, (_, row) => {
          const units = 7 - row;
          return (
            <group
              key={units}
              position={[0, 0.025 + row * 0.02, (row - 3) * 0.05]}
            >
              {Array.from({ length: units }, (_, unit) => (
                <Box
                  key={unit}
                  at={[0.055 + unit * 0.11, 0, 0]}
                  size={[0.11, 0.038, 0.038]}
                  color={unit % 2 ? "#416f97" : "#b84b42"}
                />
              ))}
            </group>
          );
        })}
      </group>
    );
  if (id === "sandpaper-letters")
    return (
      <group rotation={[-0.2, 0, 0]}>
        {[-0.28, 0, 0.28].map((x, index) => (
          <group key={x} position={[x, 0, 0]}>
            <Box at={[0, 0.04, 0]} size={[0.24, 0.07, 0.34]} color="#49779a" />
            <mesh position={[0, 0.081, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry
                args={[0.045 + index * 0.006, 0.063 + index * 0.006, 20]}
              />
              <meshStandardMaterial color="#dec9a3" roughness={1} />
            </mesh>
          </group>
        ))}
      </group>
    );
  if (id === "broad-stair")
    return (
      <group>
        {Array.from({ length: 10 }, (_, index) => {
          const side = 0.035 + (10 - index) * 0.014;
          return (
            <Box
              key={index}
              at={[-0.43 + index * 0.095, side / 2, 0]}
              size={[0.5, side, side]}
              color="#8e6c51"
            />
          );
        })}
      </group>
    );
  if (study)
    return (
      <group>
        <Box at={[0, 0.025, 0]} size={[0.92, 0.05, 0.5]} color="#c7a675" />
        {study.pieces.slice(0, 6).map((piece, index) => (
          <group
            key={piece.id}
            position={[
              -0.28 + (index % 3) * 0.28,
              0.09,
              -0.11 + Math.floor(index / 3) * 0.22,
            ]}
          >
            <mesh>
              {piece.shape === "circle" ? (
                <cylinderGeometry args={[0.085, 0.085, 0.045, 20]} />
              ) : piece.shape === "triangle" ? (
                <cylinderGeometry args={[0.09, 0.09, 0.045, 3]} />
              ) : (
                <boxGeometry args={[0.19, 0.045, 0.14]} />
              )}
              <meshStandardMaterial color={piece.color} roughness={0.9} />
            </mesh>
          </group>
        ))}
      </group>
    );
  return (
    <group>
      <Box at={[0, 0.025, 0]} size={[0.85, 0.05, 0.45]} color="#d4bc91" />
      {["#b84f46", "#d2ac4c", "#668ca2", "#b84f46", "#d2ac4c", "#668ca2"].map(
        (c, i) => (
          <Box
            key={i}
            at={[-0.27 + (i % 3) * 0.27, 0.065, -0.1 + Math.floor(i / 3) * 0.2]}
            size={[0.19, 0.04, 0.14]}
            color={c}
          />
        ),
      )}
    </group>
  );
}

export function MaterialHotspot({
  placement,
  onSelect,
}: {
  placement: Placement;
  onSelect: (id: MaterialId) => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <group
      position={placement.position}
      rotation={[0, placement.rotation ?? 0, 0]}
      onClick={(event) => {
        if (event.delta > 5) return;
        event.stopPropagation();
        onSelect(placement.materialId);
      }}
      onPointerOver={(event) => {
        event.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
    >
      <MaterialModel id={placement.materialId} />
      {hovered && (
        <Html
          center
          position={[0, placement.labelHeight ?? 0.6, 0]}
          style={{ pointerEvents: "none" }}
        >
          <span className="scene-label">
            {content[placement.materialId].name}
          </span>
        </Html>
      )}
      <mesh position={[0, 0.22, 0]}>
        <boxGeometry args={[1.1, 0.5, 0.65]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
    </group>
  );
}

export function PreparedRoomShell({
  width,
  depth,
  height,
  floorColors,
  backWallColor,
  sideWallColor,
  children,
}: {
  width: number;
  depth: number;
  height: number;
  floorColors: readonly [string, string, string];
  backWallColor: string;
  sideWallColor: string;
  children: ReactNode;
}) {
  const boards = Math.round(width * 2);
  return (
    <group position={[0, -0.1, 0]}>
      <Box
        at={[0, -0.12, 0]}
        size={[width, 0.2, depth]}
        color={floorColors[1]}
      />
      {Array.from({ length: boards }, (_, index) => (
        <Box
          key={index}
          at={[-width / 2 + 0.25 + index * 0.5, 0, 0]}
          size={[0.486, 0.04, depth]}
          color={floorColors[index % floorColors.length]}
        />
      ))}
      <Box
        at={[0, height / 2, -depth / 2]}
        size={[width, height, 0.16]}
        color={backWallColor}
      />
      <Box
        at={[-width / 2, height / 2, 0]}
        size={[0.16, height, depth]}
        color={sideWallColor}
      />
      <Box
        at={[0, 0.16, -depth / 2 + 0.13]}
        size={[width, 0.25, 0.08]}
        color="#f6f2e6"
      />
      <Box
        at={[-width / 2 + 0.12, 0.16, 0]}
        size={[0.08, 0.25, depth]}
        color="#f6f2e6"
      />
      {children}
    </group>
  );
}
export function Plant({
  at,
  scale = 1,
}: {
  at: [number, number, number];
  scale?: number;
}) {
  return (
    <group position={at} scale={scale}>
      <mesh position={[0, 0.22, 0]}>
        <cylinderGeometry args={[0.24, 0.17, 0.44, 20]} />
        <meshStandardMaterial color="#b78363" />
      </mesh>
      {[0, 1, 2, 3, 4].map((i) => (
        <group key={i} rotation={[0, i * 1.4, 0]}>
          <mesh position={[0.07, 0.55 + i * 0.1, 0]} rotation={[0, 0, -0.25]}>
            <cylinderGeometry args={[0.012, 0.015, 0.7, 6]} />
            <meshStandardMaterial color="#6c7650" />
          </mesh>
          <mesh
            position={[0.16, 0.8 + i * 0.09, 0]}
            rotation={[0, 0, -0.65]}
            scale={[0.15, 0.3, 0.045]}
          >
            <sphereGeometry args={[1, 10, 10]} />
            <meshStandardMaterial color={i % 2 ? "#778564" : "#899575"} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
