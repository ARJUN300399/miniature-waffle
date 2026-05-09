export const cameraConfig = {
  far: 500,
  followDistance: 7.5,
  followHeight: 3.6,
  followResponsiveness: 5.4,
  fov: 48,
  initialPosition: [0, 4.6, 8.5] as [number, number, number],
  near: 0.1,
  targetHeight: 1.2,
} as const;

export const sceneConfig = {
  background: '#b6c8cc',
  dpr: [1, 2] as [number, number],
  fogColor: '#b6c8cc',
  fogFar: 125,
  fogNear: 38,
  groundLight: '#30392f',
  hemisphereIntensity: 1.35,
  skyLight: '#f5efe2',
  sunIntensity: 4.2,
  sunPosition: [8, 12, 6] as [number, number, number],
  toneMappingExposure: 1,
} as const;

export const vehicleConfig = {
  acceleration: 5.8,
  colliderHalfExtents: [0.44, 0.78, 1.02] as [number, number, number],
  colliderOffset: [0, 0.88, 0] as [number, number, number],
  maxSpeed: 9.5,
  spawnPosition: [0, 0.05, 3] as [number, number, number],
  steerRate: 1.55,
} as const;

export const worldConfig = {
  groundSize: 180,
  roadLength: 140,
  roadWidth: 4.8,
} as const;
