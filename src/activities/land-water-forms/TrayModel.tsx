import { useMemo } from "react";
import { Shape, Path } from "three";
import { outlines } from "./geometry";
function Shapes({
  pair,
  side,
  water = false,
  level = 0,
}: {
  pair: number;
  side: number;
  water?: boolean;
  level?: number;
}) {
  const shapes = useMemo(
    () =>
      outlines(pair, side, water).map((o) => {
        const s = new Shape();
        o.outer.forEach(([x, y], i) => (i ? s.lineTo(x, y) : s.moveTo(x, y)));
        s.closePath();
        for (const hole of o.holes ?? []) {
          const h = new Path();
          hole.forEach(([x, y], i) => (i ? h.lineTo(x, y) : h.moveTo(x, y)));
          h.closePath();
          s.holes.push(h);
        }
        return s;
      }),
    [pair, side, water],
  );
  return (
    <group
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, water ? 0.075 + level / 350 : 0.06, 0]}
    >
      {shapes.map((shape, i) => (
        <mesh key={i} receiveShadow castShadow={!water}>
          {water ? (
            <shapeGeometry args={[shape]} />
          ) : (
            <extrudeGeometry
              args={[shape, { depth: 0.25, bevelEnabled: false }]}
            />
          )}
          <meshStandardMaterial
            color={water ? "#68a9bb" : "#a57f51"}
            roughness={water ? 0.2 : 0.9}
            side={2}
          />
        </mesh>
      ))}
    </group>
  );
}
export default function TrayModel({
  pair,
  side,
  level,
}: {
  pair: number;
  side: number;
  level: number;
}) {
  return (
    <group>
      <mesh position={[0, 0.025, 0]}>
        <boxGeometry args={[2.16, 0.05, 2.16]} />
        <meshStandardMaterial color="#d3c9ae" />
      </mesh>
      {[-1.05, 1.05].map((p) => (
        <group key={p}>
          <mesh position={[p, 0.19, 0]}>
            <boxGeometry args={[0.1, 0.38, 2.2]} />
            <meshStandardMaterial color="#b7976d" />
          </mesh>
          <mesh position={[0, 0.19, p]}>
            <boxGeometry args={[2, 0.38, 0.1]} />
            <meshStandardMaterial color="#b7976d" />
          </mesh>
        </group>
      ))}
      <Shapes pair={pair} side={side} />
      {level > 0 && <Shapes pair={pair} side={side} water level={level} />}
    </group>
  );
}
