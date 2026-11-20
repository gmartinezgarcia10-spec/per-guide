import { describe, expect, it } from "vitest";
import { distanceToCoast, onLand } from "../../src/chart/coast";
import { randomWaterPos, twoBearings } from "../../src/chart/exercises";
import { angleDiff, course, n360 } from "../../src/chart/geo";
import { MARKS } from "../../src/chart/strait";

// mulberry32, as in the e2e fixtures.
const seeded = (seed: number) => {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

describe("randomWaterPos", () => {
  it("is always at sea and clear of the coast", () => {
    const rand = seeded(1);
    for (let i = 0; i < 200; i++) {
      const p = randomWaterPos(rand);
      expect(onLand(p)).toBe(false);
      expect(distanceToCoast(p)).toBeGreaterThanOrEqual(1.5);
    }
  });
});

describe("twoBearings", () => {
  it("gives a solvable, consistent exercise every time", () => {
    const rand = seeded(7);
    for (let i = 0; i < 200; i++) {
      const ex = twoBearings(rand);
      expect(onLand(ex.ship)).toBe(false);
      expect(ex.ct).toBe(ex.dm + ex.dev);
      for (const k of [0, 1] as const) {
        const m = MARKS[ex.marks[k]].pos;
        // The stated Dv is the true bearing from the answer, to well under a degree.
        expect(Math.abs(angleDiff(course(ex.ship, m).rv, ex.dv[k]))).toBeLessThan(0.01);
        expect(n360(ex.da[k] + ex.ct)).toBe(ex.dv[k]);
        expect(Number.isInteger(ex.da[k])).toBe(true);
        const d = course(ex.ship, m).d;
        expect(d).toBeGreaterThan(1);
        expect(d).toBeLessThan(16);
      }
      const cut = Math.abs(angleDiff(ex.dv[0], ex.dv[1]));
      expect(cut).toBeGreaterThanOrEqual(35);
      expect(cut).toBeLessThanOrEqual(145);
    }
  });

  it("is deterministic for a seed", () => {
    expect(twoBearings(seeded(3))).toEqual(twoBearings(seeded(3)));
  });
});
