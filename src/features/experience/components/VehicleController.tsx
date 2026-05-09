import { useFrame } from '@react-three/fiber';
import { CuboidCollider, RigidBody, type RapierRigidBody } from '@react-three/rapier';
import { useRef, type MutableRefObject } from 'react';
import { Euler, Quaternion } from 'three';

import { BikeModel } from '@/features/experience/components/BikeModel';
import { ControlAction } from '@/features/experience/config/controls.config';
import { vehicleConfig } from '@/features/experience/config/experience.config';
import { stepVehicleMotion } from '@/features/experience/lib/vehicle-motion';
import { usePlayerStore } from '@/features/experience/state/player.store';
import { useKeyboardControls } from '@react-three/drei';

export function VehicleController() {
  const rigidBodyRef = useRef<RapierRigidBody>(null);
  const motionRef = useRef({
    heading: 0,
    speed: 0,
  });
  const forwardPressed = useKeyboardControls<ControlAction>(
    (state) => state[ControlAction.Forward],
  );
  const backPressed = useKeyboardControls<ControlAction>((state) => state[ControlAction.Back]);
  const leftPressed = useKeyboardControls<ControlAction>((state) => state[ControlAction.Left]);
  const rightPressed = useKeyboardControls<ControlAction>((state) => state[ControlAction.Right]);

  return (
    <RigidBody
      ref={rigidBodyRef}
      colliders={false}
      enabledRotations={[false, true, false]}
      position={vehicleConfig.spawnPosition}
      type="kinematicPosition"
      onSleep={() => {
        rigidBodyRef.current?.wakeUp();
      }}
    >
      <VehicleMotion
        body={rigidBodyRef}
        backPressed={backPressed}
        forwardPressed={forwardPressed}
        leftPressed={leftPressed}
        motion={motionRef}
        rightPressed={rightPressed}
      />
      <CuboidCollider
        args={vehicleConfig.colliderHalfExtents}
        position={vehicleConfig.colliderOffset}
      />
      <BikeModel />
    </RigidBody>
  );
}

type VehicleMotionProps = {
  backPressed: boolean;
  body: MutableRefObject<RapierRigidBody | null>;
  forwardPressed: boolean;
  leftPressed: boolean;
  motion: MutableRefObject<{
    heading: number;
    speed: number;
  }>;
  rightPressed: boolean;
};

function VehicleMotion({
  backPressed,
  body,
  forwardPressed,
  leftPressed,
  motion,
  rightPressed,
}: VehicleMotionProps) {
  useFrameVehicle({
    backPressed,
    body,
    forwardPressed,
    leftPressed,
    motion,
    rightPressed,
  });

  return null;
}

function useFrameVehicle({
  backPressed,
  body,
  forwardPressed,
  leftPressed,
  motion,
  rightPressed,
}: VehicleMotionProps) {
  useFrame((_, delta) => {
    const rigidBody = body.current;

    if (!rigidBody) {
      return;
    }

    const translation = rigidBody.translation();
    const nextMotion = stepVehicleMotion(
      {
        heading: motion.current.heading,
        position: {
          x: translation.x,
          y: vehicleConfig.spawnPosition[1],
          z: translation.z,
        },
        speed: motion.current.speed,
      },
      {
        back: backPressed,
        forward: forwardPressed,
        left: leftPressed,
        right: rightPressed,
      },
      delta,
    );
    const nextRotation = new Quaternion().setFromEuler(new Euler(0, nextMotion.heading, 0));

    motion.current.heading = nextMotion.heading;
    motion.current.speed = nextMotion.speed;

    rigidBody.setNextKinematicTranslation(nextMotion.position);
    rigidBody.setNextKinematicRotation(nextRotation);
    usePlayerStore.getState().setTelemetry({
      heading: nextMotion.heading,
      position: nextMotion.position,
      speed: nextMotion.speed,
    });
  });
}
