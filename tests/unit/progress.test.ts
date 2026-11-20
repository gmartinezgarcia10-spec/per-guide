import { describe, expect, it } from "vitest";
import {
  type BankQuestion,
  legacyKey,
  legacyKeyMap,
  migrateProgress,
  type ProgressState,
} from "../../src/core/progress";

const guide = Object.assign(["nom", `${"La pieza cónica ".repeat(6)}…`, ["a", "b", "c", "d"], 0, ""], {
  id: "g-0001",
}) as BankQuestion;
const real = Object.assign(
  ["ripa", "Luces de un buque…", ["a", "b", "c", "d"], 1, "x", { i: 12, p: ["2024-04"] }],
  {
    id: "gva-0012",
  },
) as BankQuestion;
const map = legacyKeyMap([guide, real]);
const gKey = `nom:${guide[1].slice(0, 70)}`;

describe("legacyKey", () => {
  it("matches the pre-v3 app formula", () => {
    expect(legacyKey(guide)).toBe(gKey);
    expect(legacyKey(real)).toBe("r:12");
  });
});

describe("migrateProgress", () => {
  const v2: ProgressState = {
    v: 2,
    stats: {
      [gKey]: [3, 2, true, 100, 2, 500],
      "r:12": [1, 0, false, 200, 0, 200],
      "seg:orphan": [1, 1, true],
    },
    log: [
      [100, gKey, 1],
      [200, "r:12", 0],
    ],
    cur: { title: "Simulacro", ids: ["r:12", gKey], ans: [null, 1] },
    best: { nom: 80 },
  };

  it("rewrites stats, log and the unfinished exam to permanent ids", () => {
    const m = migrateProgress(v2, map);
    expect(m.v).toBe(3);
    expect(Object.keys(m.stats ?? {})).toEqual(["g-0001", "gva-0012", "seg:orphan"]);
    expect(m.stats?.["g-0001"]).toEqual([3, 2, true, 100, 2, 500]);
    expect(m.log).toEqual([
      [100, "g-0001", 1],
      [200, "gva-0012", 0],
    ]);
    expect(m.cur).toEqual({ title: "Simulacro", ids: ["gva-0012", "g-0001"], ans: [null, 1] });
    expect(m.best).toEqual({ nom: 80 });
  });

  it("keeps keys it can't map, so counts don't change", () => {
    expect(migrateProgress(v2, map).stats?.["seg:orphan"]).toEqual([1, 1, true]);
  });

  it("is idempotent and doesn't mutate its input", () => {
    const before = JSON.stringify(v2);
    const once = migrateProgress(v2, map);
    expect(migrateProgress(once, map)).toEqual(once);
    expect(JSON.stringify(v2)).toBe(before);
  });

  it("merges an old and a new key for the same question by keeping more attempts", () => {
    const mixed: ProgressState = { v: 3, stats: { "g-0001": [5, 5, true], [gKey]: [2, 0, false] } };
    expect(migrateProgress(mixed, map).stats).toEqual({ "g-0001": [5, 5, true] });
    const mixed2: ProgressState = { v: 2, stats: { "g-0001": [1, 1, true], [gKey]: [4, 1, false] } };
    expect(migrateProgress(mixed2, map).stats).toEqual({ "g-0001": [4, 1, false] });
  });

  it("handles empty and partial states", () => {
    expect(migrateProgress({}, map)).toEqual({ v: 3 });
    expect(migrateProgress({ v: 2, cur: null }, map)).toEqual({ v: 3, cur: null });
  });
});
