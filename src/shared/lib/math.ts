export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function damp(current: number, target: number, lambda: number, delta: number) {
  return current + (target - current) * (1 - Math.exp(-lambda * delta));
}
