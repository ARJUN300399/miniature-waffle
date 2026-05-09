import { create } from 'zustand';

type VectorTelemetry = {
  x: number;
  y: number;
  z: number;
};

type PlayerTelemetry = {
  heading: number;
  position: VectorTelemetry;
  speed: number;
};

type PlayerState = PlayerTelemetry & {
  reset: () => void;
  setTelemetry: (telemetry: Partial<PlayerTelemetry>) => void;
};

const initialTelemetry: PlayerTelemetry = {
  heading: 0,
  position: {
    x: 0,
    y: 0.05,
    z: 3,
  },
  speed: 0,
};

export const usePlayerStore = create<PlayerState>((set) => ({
  ...initialTelemetry,
  reset: () => {
    set(initialTelemetry);
  },
  setTelemetry: (telemetry) => {
    set((state) => ({
      ...state,
      ...telemetry,
      position: telemetry.position ?? state.position,
    }));
  },
}));
