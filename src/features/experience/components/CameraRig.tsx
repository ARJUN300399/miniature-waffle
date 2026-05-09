import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import { Vector3 } from 'three';

import { cameraConfig } from '@/features/experience/config/experience.config';
import { usePlayerStore } from '@/features/experience/state/player.store';

export function CameraRig() {
  const { camera } = useThree();
  const lookTarget = useRef(new Vector3());

  useFrame((_, delta) => {
    const { heading, position } = usePlayerStore.getState();
    const forwardX = Math.sin(heading);
    const forwardZ = -Math.cos(heading);
    const anchor = new Vector3(position.x, position.y + cameraConfig.targetHeight, position.z);
    const desired = new Vector3(
      position.x - forwardX * cameraConfig.followDistance,
      position.y + cameraConfig.followHeight,
      position.z - forwardZ * cameraConfig.followDistance,
    );

    const blend = 1 - Math.exp(-cameraConfig.followResponsiveness * delta);
    camera.position.lerp(desired, blend);
    lookTarget.current.lerp(anchor, blend);
    camera.lookAt(lookTarget.current);
  });

  return null;
}
