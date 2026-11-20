import { describe, expect, it } from "vitest";
import type { Stat } from "../../src/core/progress";
import { assembleMock, weakness } from "../../src/exam/assemble";
import { TOPICS } from "../../src/exam/spec";

type Q = { id: string; topic: string };
const pool: Q[] = TOPICS.flatMap((t) =>
  Array.from({ length: 20 }, (_, i) => ({ id: `${t.id}-${i}`, topic: t.id })),
);
const identity = <T>(a: readonly T[]) => a.slice();

describe("assembleMock", () => {
  it("takes the official number of questions per topic, in topic order", () => {
    const qs = assembleMock(pool, { shuffle: identity });
    expect(qs).toHaveLength(45);
    const counts = Object.fromEntries(TOPICS.map((t) => [t.id, qs.filter((q) => q.topic === t.id).length]));
    expect(counts).toEqual(Object.fromEntries(TOPICS.map((t) => [t.id, t.q])));
    expect(qs.map((q) => q.topic)).toEqual(TOPICS.flatMap((t) => Array(t.q).fill(t.id)));
  });

  it("takes what there is when a topic has too few questions", () => {
    const small = pool.filter((q) => q.topic !== "ripa" || q.id === "ripa-0");
    expect(assembleMock(small, { shuffle: identity }).filter((q) => q.topic === "ripa")).toHaveLength(1);
  });

  it("weak mode puts failed and unseen questions first, mastered last", () => {
    const stats: Record<string, Stat> = {
      "nom-0": [5, 5, true], // mastered, 100% → weakness 2.0
      "nom-1": [4, 1, false], // last wrong, 25% → 0.25
      "nom-2": [2, 2, false], // last wrong, 100% → 1.0
      // nom-3… unseen → 0.6
    };
    const qs = assembleMock(pool, { shuffle: identity, weak: true, stats }).filter((q) => q.topic === "nom");
    expect(qs.map((q) => q.id)).toEqual(["nom-1", "nom-3", "nom-4", "nom-5"]);
  });

  it("ranks weakness: wrong and inaccurate < unseen < wrong but usually right < last answer right", () => {
    const order = [
      weakness([4, 1, false]),
      weakness(undefined),
      weakness([4, 3, false]),
      weakness([4, 1, true]),
      weakness([4, 4, true]),
    ];
    expect(order).toEqual([...order].sort((a, b) => a - b));
    expect(new Set(order).size).toBe(order.length);
  });

  it("is random without weak mode (uses the shuffle it's given)", () => {
    const reverse = <T>(a: readonly T[]) => a.slice().reverse();
    expect(assembleMock(pool, { shuffle: reverse })[0]?.id).toBe("nom-19");
  });
});
