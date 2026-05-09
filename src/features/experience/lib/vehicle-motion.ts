import { vehicleConfig } from '@/features/experience/config/experience.config';
import { damp } from '@/shared/lib/math';

export type VehicleInputState = {
  back: boolean;
  forward: boolean;
  left: boolean;
  right: boolean;
};

export type VehicleMotionState = {
  heading: number;
  position: {
    x: number;
    y: number;
    z: number;
  };
  speed: number;
};

export function stepVehicleMotion(
  state: VehicleMotionState,
  input: VehicleInputState,
  delta: number,
): VehicleMotionState {
  const accelerationInput = Number(input.forward) - Number(input.back);
  const steeringInput = Number(input.left) - Number(input.right);
  const targetSpeed = accelerationInput * vehicleConfig.maxSpeed;
  const speed = damp(state.speed, targetSpeed, vehicleConfig.acceleration, delta);
  const turnScale = Math.max(0.35, Math.abs(speed) / vehicleConfig.maxSpeed);
  const heading =
    Math.abs(speed) > 0.05
      ? state.heading +
        steeringInput * vehicleConfig.steerRate * turnScale * Math.sign(speed) * delta
      : state.heading;
  const forwardX = Math.sin(heading);
  const forwardZ = -Math.cos(heading);

  return {
    heading,
    position: {
      x: state.position.x + forwardX * speed * delta,
      y: vehicleConfig.spawnPosition[1],
      z: state.position.z + forwardZ * speed * delta,
    },
    speed,
  };
}
