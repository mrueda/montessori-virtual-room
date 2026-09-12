import { Component, Suspense, useState } from "react";
import type { ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { RotateCcw, Move } from "lucide-react";
class StageBoundary extends Component<
  { children: ReactNode; fallbackMessage: string },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? (
      <div className="room-fallback">
        <p>{this.props.fallbackMessage}</p>
      </div>
    ) : (
      this.props.children
    );
  }
}
export function Block({
  position,
  size,
  color = "#d2b582",
}: {
  position: [number, number, number];
  size: [number, number, number];
  color?: string;
}) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} roughness={0.8} />
    </mesh>
  );
}
export function SelectionRing({
  position,
  radius = 0.5,
}: {
  position: [number, number, number];
  radius?: number;
}) {
  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius, radius + 0.035, 48]} />
      <meshBasicMaterial color="#7d9466" side={2} />
    </mesh>
  );
}
export default function ActivityStage({
  children,
  label,
  target = [0, 0.45, 0],
  camera = [5, 6, 7],
  fallbackMessage = "The 3D view is unavailable on this device. Choose 2D above to continue with your work.",
}: {
  children: ReactNode;
  label: string;
  target?: [number, number, number];
  camera?: [number, number, number];
  fallbackMessage?: string;
}) {
  const [reset, setReset] = useState(0);
  return (
    <div className="activity-stage" role="region" aria-label={label}>
      <StageBoundary fallbackMessage={fallbackMessage}>
        <Canvas
          key={reset}
          shadows
          dpr={[1, 1.5]}
          frameloop="demand"
          camera={{ position: camera, fov: 40 }}
          fallback={<div className="room-fallback">{fallbackMessage}</div>}
        >
          <color attach="background" args={["#eeede3"]} />
          <ambientLight intensity={1.6} />
          <directionalLight
            position={[-4, 8, 5]}
            intensity={2.1}
            castShadow
            shadow-mapSize={[1024, 1024]}
            shadow-camera-left={-6}
            shadow-camera-right={6}
            shadow-camera-top={6}
            shadow-camera-bottom={-6}
            shadow-normalBias={0.035}
          />
          <Suspense fallback={null}>
            <mesh
              rotation={[-Math.PI / 2, 0, 0]}
              position={[0, -0.04, 0]}
              receiveShadow
            >
              <planeGeometry args={[200, 200]} />
              <meshStandardMaterial color="#eeeadb" roughness={1} />
            </mesh>
            {children}
            <OrbitControls
              makeDefault
              target={target}
              minDistance={4}
              maxDistance={18}
              minPolarAngle={0.15}
              maxPolarAngle={1.38}
              enablePan={false}
              enableDamping={false}
            />
          </Suspense>
        </Canvas>
      </StageBoundary>
      <div className="stage-caption">
        <Move size={14} />
        <span>Drag the space to look around · Scroll or pinch to zoom</span>
      </div>
      <button
        className="icon-button stage-reset"
        aria-label="Reset activity camera"
        onClick={() => setReset((n) => n + 1)}
      >
        <RotateCcw size={16} />
      </button>
    </div>
  );
}
