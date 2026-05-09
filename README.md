# Miniature Waffle

Browser-first 3D riding experience built with React, Three.js, React Three Fiber, and Rapier.

## Stack

- Vite + React + TypeScript for the application shell
- Three.js + React Three Fiber for real-time WebGL rendering
- Drei for common scene helpers
- Rapier for physics and collision primitives
- Zustand for shared runtime state
- Vitest, Testing Library, ESLint, and Prettier for quality gates

## Getting Started

Use Node `^20.19.0` or `>=22.12.0`. If you use `nvm`, run:

```bash
nvm use
```

```bash
npm install
npm run dev
```

## Scripts

```bash
npm run dev
npm run lint
npm run typecheck
npm run test
npm run build
npm run preview
```

## Asset Pipeline

Future production assets should be exported as `.glb` files and placed under `public/models`.
HDRI environments can live under `public/environments`, and reusable texture maps under
`public/textures`.

For the realistic rider and bike flow:

1. Capture the rider and bike with photogrammetry or a structured 3D scanning app.
2. Clean, retopologize, scale, and material the scan in Blender.
3. Split independently animated parts such as wheels, handlebar, pedals, and rider rig.
4. Export optimized `.glb` assets with compressed textures.
5. Replace the procedural prototype in `src/features/experience/components/BikeModel.tsx`.
