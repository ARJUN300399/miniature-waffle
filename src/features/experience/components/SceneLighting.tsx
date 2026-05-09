import { sceneConfig } from '@/features/experience/config/experience.config';

export function SceneLighting() {
  return (
    <>
      <hemisphereLight
        args={[sceneConfig.skyLight, sceneConfig.groundLight, sceneConfig.hemisphereIntensity]}
      />
      <directionalLight
        castShadow
        intensity={sceneConfig.sunIntensity}
        position={sceneConfig.sunPosition}
        shadow-bias={-0.0001}
        shadow-camera-bottom={-28}
        shadow-camera-far={80}
        shadow-camera-left={-28}
        shadow-camera-near={1}
        shadow-camera-right={28}
        shadow-camera-top={28}
        shadow-mapSize-height={2048}
        shadow-mapSize-width={2048}
      />
    </>
  );
}
