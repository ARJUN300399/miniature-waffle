import { KeyboardControls, Preload, SoftShadows } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { Suspense } from 'react';
import { ACESFilmicToneMapping, SRGBColorSpace } from 'three';

import { CameraRig } from '@/features/experience/components/CameraRig';
import { SceneLighting } from '@/features/experience/components/SceneLighting';
import { VehicleController } from '@/features/experience/components/VehicleController';
import { World } from '@/features/experience/components/World';
import { keyboardMap } from '@/features/experience/config/controls.config';
import { cameraConfig, sceneConfig } from '@/features/experience/config/experience.config';

export function ExperienceCanvas() {
  return (
    <main className="experience-shell" aria-label="Miniature Waffle 3D experience">
      <KeyboardControls map={keyboardMap}>
        <Canvas
          camera={{
            fov: cameraConfig.fov,
            near: cameraConfig.near,
            far: cameraConfig.far,
            position: cameraConfig.initialPosition,
          }}
          dpr={sceneConfig.dpr}
          gl={{
            antialias: true,
            powerPreference: 'high-performance',
          }}
          shadows
          onCreated={({ gl }) => {
            gl.outputColorSpace = SRGBColorSpace;
            gl.toneMapping = ACESFilmicToneMapping;
            gl.toneMappingExposure = sceneConfig.toneMappingExposure;
          }}
        >
          <Suspense fallback={null}>
            <color attach="background" args={[sceneConfig.background]} />
            <fog
              attach="fog"
              args={[sceneConfig.fogColor, sceneConfig.fogNear, sceneConfig.fogFar]}
            />
            <SoftShadows focus={0.86} samples={18} size={18} />
            <SceneLighting />
            <Physics gravity={[0, -9.81, 0]} interpolate timeStep="vary">
              <World />
              <VehicleController />
            </Physics>
            <CameraRig />
            <Preload all />
          </Suspense>
        </Canvas>
      </KeyboardControls>
    </main>
  );
}
