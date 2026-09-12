import { Vector2 } from "three";
import { Html } from "@react-three/drei";
import type { DemoObject } from "../../domain/demonstration";
const bowl = [
  new Vector2(0, 0),
  new Vector2(0.55, 0),
  new Vector2(0.93, 0.46),
  new Vector2(0.87, 0.48),
  new Vector2(0.5, 0.08),
  new Vector2(0, 0.08),
];
const jug = [
  new Vector2(0, 0),
  new Vector2(0.32, 0),
  new Vector2(0.42, 1),
  new Vector2(0.37, 1),
  new Vector2(0.28, 0.07),
  new Vector2(0, 0.07),
];
export default function DemoObjectMesh({ object: o }: { object: DemoObject }) {
  const mat = <meshStandardMaterial color={o.color} roughness={0.8} />;
  if (o.model.startsWith("letter-"))
    return (
      <group>
        <mesh castShadow receiveShadow>
          <boxGeometry args={o.size} />
          {mat}
        </mesh>
        <Html
          center
          position={[0, o.size[1] / 2 + 0.01, 0]}
          transform
          distanceFactor={5}
        >
          <span className="sandpaper-letter-3d">{o.model.slice(-1)}</span>
        </Html>
      </group>
    );
  if (o.model === "bowl")
    return (
      <mesh castShadow receiveShadow>
        <latheGeometry args={[bowl, 32]} />
        {mat}
      </mesh>
    );
  if (o.model === "jug" || o.model === "cup")
    return (
      <group>
        <mesh castShadow receiveShadow>
          <latheGeometry args={[jug, 32]} />
          {mat}
        </mesh>
        <mesh position={[-0.45, 0.56, 0]}>
          <torusGeometry args={[0.26, 0.045, 10, 24]} />
          {mat}
        </mesh>
      </group>
    );
  if (o.model === "ball")
    return (
      <mesh castShadow>
        <sphereGeometry args={[o.size[0], 24, 16]} />
        {mat}
      </mesh>
    );
  if (o.model === "tablet")
    return (
      <group>
        <mesh castShadow receiveShadow>
          <boxGeometry args={o.size} />
          <meshStandardMaterial color="#dec69f" />
        </mesh>
        <mesh position={[0, o.size[1] / 2 + 0.006, 0]}>
          <boxGeometry args={[o.size[0] * 0.7, 0.012, o.size[2] * 0.96]} />
          {mat}
        </mesh>
      </group>
    );
  if (o.model === "box")
    return (
      <mesh castShadow receiveShadow>
        <boxGeometry args={o.size} />
        {mat}
      </mesh>
    );
  const segments = o.model === "square" ? 4 : o.model === "triangle" ? 3 : 32;
  return (
    <group>
      <mesh
        castShadow
        receiveShadow
        rotation={[0, o.model === "square" ? Math.PI / 4 : 0, 0]}
      >
        <cylinderGeometry
          args={[
            o.size[0] * (o.model === "square" ? 1.3 : 1),
            o.size[2] * (o.model === "square" ? 1.3 : 1),
            o.size[1],
            segments,
          ]}
        />
        {o.model === "water" ? (
          <meshStandardMaterial
            color={o.color}
            transparent
            opacity={0.78}
            roughness={0.25}
          />
        ) : (
          mat
        )}
      </mesh>
      {o.model === "cylinder" && o.size[1] > 0.05 && (
        <mesh position={[0, o.size[1] / 2 + 0.06, 0]} castShadow>
          <sphereGeometry args={[0.055, 12, 10]} />
          <meshStandardMaterial color="#b28b57" />
        </mesh>
      )}
      {["circle", "square", "triangle"].includes(o.model) &&
        o.size[1] > 0.05 && (
          <mesh position={[0, o.size[1] / 2 + 0.07, 0]}>
            <sphereGeometry args={[0.06, 12, 10]} />
            <meshStandardMaterial color="#a7814e" />
          </mesh>
        )}
      {o.model === "button" &&
        [-0.033, 0.033].flatMap((x) =>
          [-0.033, 0.033].map((z) => (
            <mesh
              key={`${x}-${z}`}
              position={[x, 0.028, z]}
              rotation={[-Math.PI / 2, 0, 0]}
            >
              <circleGeometry args={[0.014, 10]} />
              <meshStandardMaterial color="#998b72" />
            </mesh>
          )),
        )}
    </group>
  );
}
