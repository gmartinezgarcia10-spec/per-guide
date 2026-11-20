import { describe, expect, it } from "vitest";
import type { TopicId } from "../../src/exam/spec";
import { TOPICS } from "../../src/exam/spec";
import { forecast, rbeta, rgamma, simulate, topicAccuracy } from "../../src/learn/forecast";

/** Deterministic RNG (mulberry32), same as the e2e fixture. */
function seeded(seed = 0x9e3779b9) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const constant = (p: number) =>
  Object.fromEntries(TOPICS.map((t) => [t.id, () => p])) as Record<TopicId, () => number>;
const acc = (f: (id: TopicId) => [number, number]) =>
  Object.fromEntries(TOPICS.map((t) => [t.id, f(t.id)])) as Record<TopicId, [number, number]>;

describe("rgamma / rbeta", () => {
  it("sample with the right mean (Gamma(k) mean k, Beta(a,b) mean a/(a+b))", () => {
    const rng = seeded();
    const mean = (f: () => number, n = 20000) => Array.from({ length: n }, f).reduce((s, x) => s + x, 0) / n;
    expect(mean(() => rgamma(2.5, rng))).toBeCloseTo(2.5, 1);
    expect(mean(() => rgamma(0.5, rng))).toBeCloseTo(0.5, 1); // k < 1 branch
    expect(mean(() => rbeta(3, 2, rng))).toBeCloseTo(0.6, 2);
    expect(mean(() => rbeta(30, 10, rng))).toBeCloseTo(0.75, 2);
  });

  it("Beta samples stay in (0, 1)", () => {
    const rng = seeded();
    for (let i = 0; i < 2000; i++) {
      const x = rbeta(1.2, 4, rng);
      expect(x).toBeGreaterThan(0);
      expect(x).toBeLessThan(1);
    }
  });
});

describe("simulate", () => {
  it("always passes when every answer is right", () => {
    expect(simulate(constant(1), 200, seeded())).toEqual({
      p: 1,
      exp: 45,
      mins: { baliz: 1, ripa: 1, carta: 1 },
    });
  });

  it("never passes when every answer is wrong", () => {
    expect(simulate(constant(0), 200, seeded())).toEqual({
      p: 0,
      exp: 0,
      mins: { baliz: 0, ripa: 0, carta: 0 },
    });
  });

  it("passes with exactly 32 correct and the minimums met", () => {
    // baliz 5 + ripa 10 + carta 4 + teoria 5 + nom 4 + seg 4 = 32
    const right = new Set(["baliz", "ripa", "carta", "teoria", "nom", "seg"]);
    const P = Object.fromEntries(TOPICS.map((t) => [t.id, () => (right.has(t.id) ? 1 : 0)])) as Record<
      TopicId,
      () => number
    >;
    expect(simulate(P, 50, seeded())).toMatchObject({ p: 1, exp: 32 });
  });

  it("fails on a minimum even with a high total", () => {
    const P = { ...constant(1), ripa: () => 0 };
    const r = simulate(P, 200, seeded());
    expect(r.exp).toBe(35);
    expect(r.p).toBe(0);
    expect(r.mins.ripa).toBe(0);
  });

  it("at 70 % everywhere the expected score is about 31.5/45 and passing is a coin toss", () => {
    const r = simulate(constant(0.7), 4000, seeded());
    expect(r.exp).toBeCloseTo(31.5, 0);
    expect(r.p).toBeGreaterThan(0.3);
    expect(r.p).toBeLessThan(0.7);
  });
});

describe("forecast", () => {
  it("with no answers, starts from the 60 % prior", () => {
    const f = forecast(
      acc(() => [0, 0]),
      { rng: seeded() },
    );
    expect(f.answered).toBe(0);
    expect(f.base.exp).toBeCloseTo(27, 0); // 45 × 0.6
  });

  it("a strong student is very likely to pass", () => {
    const f = forecast(
      acc(() => [95, 100]),
      { rng: seeded() },
    );
    expect(f.base.p).toBeGreaterThan(0.95);
    expect(f.answered).toBe(1100);
  });

  it("ranks the weakest minimum topic as the best one to study", () => {
    const f = forecast(
      acc((id) => (id === "carta" ? [3, 10] : [9, 10])),
      { rng: seeded() },
    );
    expect(f.lev.map((x) => x.t.id)).toHaveLength(11);
    expect(f.lev[0]?.t.id).toBe("carta");
    const gains = f.lev.map((x) => x.gain);
    expect(gains).toEqual([...gains].sort((a, b) => b - a));
  });

  it("is deterministic for a given random source", () => {
    const A = acc((id) => (id === "ripa" ? [6, 10] : [8, 10]));
    expect(forecast(A, { rng: seeded(7) })).toEqual(forecast(A, { rng: seeded(7) }));
  });
});

describe("topicAccuracy", () => {
  it("sums correct answers and attempts per topic from the saved stats", () => {
    const bank = [
      { id: "g-1", topic: "nom" },
      { id: "g-2", topic: "nom" },
      { id: "g-3", topic: "ripa" },
    ];
    const stats = { "g-1": [3, 2, true], "g-3": [1, 0, false], other: [5, 5, true] } as const;
    const A = topicAccuracy(
      bank,
      stats as never,
      (q) => q.id,
      (q) => q.topic,
    );
    expect(A.nom).toEqual([2, 3]);
    expect(A.ripa).toEqual([0, 1]);
    expect(A.carta).toEqual([0, 0]);
  });
});
