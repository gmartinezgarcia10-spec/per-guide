import { describe, expect, it } from "vitest";
import { type CorrectByTopic, EXAM, scoreExam, TOPICS } from "../../src/exam/spec";

const allCorrect = (): CorrectByTopic => Object.fromEntries(TOPICS.map((t) => [t.id, t.q]));

describe("exam spec (docs/EXAM-SPEC.md)", () => {
  it("has 11 topics that add up to 45 questions", () => {
    expect(TOPICS.map((t) => t.n)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
    expect(TOPICS.reduce((s, t) => s + t.q, 0)).toBe(EXAM.questions);
  });

  it("has minimums only for carta 2/4, RIPA 5/10, balizamiento 3/5", () => {
    const mins = TOPICS.filter((t) => t.min !== undefined).map((t) => [t.id, t.min, t.q]);
    expect(mins).toEqual([
      ["baliz", 3, 5],
      ["ripa", 5, 10],
      ["carta", 2, 4],
    ]);
  });

  it("lasts 90 minutes and needs 32 correct", () => {
    expect(EXAM.durationSec).toBe(5400);
    expect(EXAM.passCorrect).toBe(32);
  });
});

describe("scoreExam", () => {
  it("passes a perfect exam", () => {
    expect(scoreExam(allCorrect())).toEqual({ pass: true, total: 45, failedMinimums: [] });
  });

  it("passes with exactly 32 correct and every minimum met", () => {
    // 13 errors, none of them pushing a minimum below its floor
    const r = scoreExam({ ...allCorrect(), nom: 0, seg: 0, meteo: 0, emerg: 2 });
    expect(r).toEqual({ pass: true, total: 32, failedMinimums: [] });
  });

  it("fails with 31 correct", () => {
    const r = scoreExam({ ...allCorrect(), nom: 0, seg: 0, meteo: 0, emerg: 1 });
    expect(r.total).toBe(31);
    expect(r.pass).toBe(false);
  });

  it("fails on a missed minimum even with enough total", () => {
    const r = scoreExam({ ...allCorrect(), carta: 1 });
    expect(r.total).toBe(42);
    expect(r).toMatchObject({ pass: false, failedMinimums: ["carta"] });
  });

  it("reports every missed minimum", () => {
    const r = scoreExam({ ...allCorrect(), baliz: 2, ripa: 4, carta: 1 });
    expect(r.failedMinimums).toEqual(["baliz", "ripa", "carta"]);
  });

  it("rejects impossible counts", () => {
    expect(() => scoreExam({ ripa: 11 })).toThrow(RangeError);
    expect(() => scoreExam({ nom: -1 })).toThrow(RangeError);
  });
});
