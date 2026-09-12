import { Suspense } from "react";
import type { ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, OrbitControls } from "@react-three/drei";

type Triple = [number, number, number];

export default function RoomStage({
  children,
  sceneKey,
  resetKey,
  camera,
  target,
  background = "#eae9df",
  ambient = 1.35,
  lightPosition = [-3, 8, 4],
  lightIntensity = 2.3,
  minDistance = 7,
  maxDistance = 18,
  minAzimuthAngle = -0.6,
  maxAzimuthAngle = 1.3,
  contactShadows = true,
  fallback,
}: {
  children: ReactNode;
  sceneKey: string;
  resetKey: number;
  camera: Triple;
  target: Triple;
  background?: string;
  ambient?: number;
  lightPosition?: Triple;
  lightIntensity?: number;
  minDistance?: number;
  maxDistance?: number;
  minAzimuthAngle?: number;
  maxAzimuthAngle?: number;
  contactShadows?: boolean;
  fallback: string;
}) {
  return (
    <Canvas
      key={`${sceneKey}-${resetKey}`}
      shadows
      dpr={[1, 1.5]}
      frameloop="demand"
      camera={{ position: camera, fov: 38 }}
      fallback={<div className="room-fallback">{fallback}</div>}
    >
      <color attach="background" args={[background]} />
      <ambientLight intensity={ambient} />
      <directionalLight
        position={lightPosition}
        intensity={lightIntensity}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
        shadow-normalBias={0.025}
      />
      <Suspense fallback={null}>
        {children}
        {contactShadows && (
          <ContactShadows
            position={[0, -0.2, 0]}
            opacity={0.23}
            scale={15}
            blur={2.5}
            far={8}
            resolution={256}
            frames={1}
          />
        )}
        <OrbitControls
          makeDefault
          target={target}
          minDistance={minDistance}
          maxDistance={maxDistance}
          minPolarAngle={0.45}
          maxPolarAngle={1.35}
          minAzimuthAngle={minAzimuthAngle}
          maxAzimuthAngle={maxAzimuthAngle}
          enablePan={false}
          enableDamping={false}
        />
      </Suspense>
    </Canvas>
  );
}
