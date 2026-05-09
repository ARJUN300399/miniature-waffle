import { describe, expect, it } from 'vitest';

import { clamp, damp } from '@/shared/lib/math';

describe('math helpers', () => {
  it('clamps values within an inclusive range', () => {
    expect(clamp(4, 0, 10)).toBe(4);
    expect(clamp(-4, 0, 10)).toBe(0);
    expect(clamp(14, 0, 10)).toBe(10);
  });

  it('damps toward the target without overshooting', () => {
    const next = damp(0, 10, 4, 0.16);

    expect(next).toBeGreaterThan(0);
    expect(next).toBeLessThan(10);
  });
});
