import { describe, expect, it } from 'vitest';

import {
  stepVehicleMotion,
  type VehicleMotionState,
} from '@/features/experience/lib/vehicle-motion';

const initialMotion: VehicleMotionState = {
  heading: 0,
  position: {
    x: 0,
    y: 0.05,
    z: 3,
  },
  speed: 0,
};

describe('vehicle motion', () => {
  it('moves forward along the road when forward input is active', () => {
    const next = stepVehicleMotion(
      initialMotion,
      {
        back: false,
        forward: true,
        left: false,
        right: false,
      },
      0.5,
    );

    expect(next.speed).toBeGreaterThan(0);
    expect(next.position.z).toBeLessThan(initialMotion.position.z);
  });

  it('reverses when back input is active', () => {
    const next = stepVehicleMotion(
      initialMotion,
      {
        back: true,
        forward: false,
        left: false,
        right: false,
      },
      0.5,
    );

    expect(next.speed).toBeLessThan(0);
    expect(next.position.z).toBeGreaterThan(initialMotion.position.z);
  });

  it('steers only once the bike is moving', () => {
    const next = stepVehicleMotion(
      {
        ...initialMotion,
        speed: 4,
      },
      {
        back: false,
        forward: true,
        left: true,
        right: false,
      },
      0.5,
    );

    expect(next.heading).toBeGreaterThan(initialMotion.heading);
  });
});
