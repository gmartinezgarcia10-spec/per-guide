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
    // 31 (emerg's 3 instead of seg's 4) must fail.
    const right31 = new Set(["baliz", "ripa", "carta", "teoria", "nom", "emerg"]); // 5+10+4+5+4+3 = 31
    const P31 = Object.fromEntries(TOPICS.map((t) => [t.id, () => (right31.has(t.id) ? 1 : 0)])) as Record<
      TopicId,
      () => number
    >;
    expect(simulate(P31, 50, seeded())).toMatchObject({ p: 0, exp: 31 });
  });

  it.each([
    ["ripa", 35],
    ["baliz", 40],
    ["carta", 41],
  ] as const)("fails on the %s minimum even with %i correct", (topic, exp) => {
    const P = { ...constant(1), [topic]: () => 0 };
    const r = simulate(P, 200, seeded());
    expect(r.exp).toBe(exp);
    expect(r.p).toBe(0);
    expect(r.mins[topic]).toBe(0);
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

// Golden values: computed by the pre-P2 inline code (app.js on main, run in Node with this seed).
// Any change to the model or to the order of random draws changes them. Update only on purpose.
const GOLDEN = {
  typical: {
    A: {
      nom: [18, 20],
      amarre: [9, 10],
      seg: [15, 20],
      leg: [7, 10],
      baliz: [20, 25],
      ripa: [30, 50],
      man: [8, 10],
      emerg: [10, 12],
      meteo: [12, 20],
      teoria: [14, 25],
      carta: [5, 16],
    },
    base: {
      p: 0.15975,
      exp: 29.4815,
      mins: {
        baliz: 0.906,
        ripa: 0.812,
        carta: 0.49375,
      },
    },
    lev: [
      ["ripa", 0.07291666666666666],
      ["carta", 0.060916666666666675],
      ["baliz", 0.058249999999999996],
      ["nom", 0.04091666666666666],
      ["seg", 0.04025000000000001],
      ["meteo", 0.029583333333333323],
      ["teoria", 0.023583333333333317],
      ["man", 0.02291666666666667],
      ["leg", 0.013583333333333336],
      ["emerg", 0.010250000000000009],
      ["amarre", 0.0035833333333333273],
    ],
    answered: 218,
  },
  sparse: {
    A: {
      nom: [1, 1],
      amarre: [0, 0],
      seg: [0, 2],
      leg: [0, 0],
      baliz: [2, 3],
      ripa: [1, 4],
      man: [0, 0],
      emerg: [0, 0],
      meteo: [0, 1],
      teoria: [0, 0],
      carta: [0, 1],
    },
    base: {
      p: 0.0255,
      exp: 24.2875,
      mins: {
        baliz: 0.6895,
        ripa: 0.47975,
        carta: 0.64725,
      },
    },
    lev: [
      ["ripa", 0.025166666666666667],
      ["emerg", 0.010499999999999999],
      ["baliz", 0.009833333333333336],
      ["carta", 0.009833333333333336],
      ["leg", 0.009166666666666667],
      ["nom", 0.005833333333333333],
      ["amarre", 0.005833333333333333],
      ["seg", 0.005833333333333333],
      ["teoria", 0.005833333333333333],
      ["meteo", 0.005166666666666667],
      ["man", 0.00116666666666667],
    ],
    answered: 12,
  },
} as const;

describe("forecast golden values (identical to the pre-P2 app)", () => {
  for (const [name, g] of Object.entries(GOLDEN)) {
    it(`${name} profile`, () => {
      const f = forecast(g.A as unknown as Record<TopicId, [number, number]>, { rng: seeded(12345) });
      expect(f.base).toEqual(g.base);
      expect(f.lev.map((x) => [x.t.id, x.gain])).toEqual(g.lev);
      expect(f.answered).toBe(g.answered);
    });
  }
});
