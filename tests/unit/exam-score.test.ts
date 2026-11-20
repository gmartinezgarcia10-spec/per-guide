import { describe, expect, it } from "vitest";
import type { TopicId } from "../../src/exam/spec";
import { daysToExam, EXAM, EXAM_DATE, scoreAnswers, scoreExam, TOPICS } from "../../src/exam/spec";

const blueprint = (wrong: Partial<Record<TopicId, number>> = {}) =>
  TOPICS.flatMap((t) =>
    Array.from({ length: t.q }, (_, i) => ({ topic: t.id, ok: i >= (wrong[t.id] ?? 0) })),
  );

describe("scoreAnswers", () => {
  it("tallies correct and asked per topic", () => {
    const r = scoreAnswers(blueprint({ ripa: 2, carta: 1 }));
    expect(r.total).toBe(42);
    expect(r.asked).toBe(45);
    expect(r.perTopic.ripa).toEqual({ correct: 8, asked: 10 });
    expect(r.perTopic.carta).toEqual({ correct: 3, asked: 4 });
    expect(r.pass).toBe(true);
  });

  it("fails on a topic minimum even with 44 correct", () => {
    const r = scoreAnswers(blueprint({ carta: 3 }));
    expect(r).toMatchObject({ total: 42, pass: false, failedMinimums: ["carta"] });
  });

  it("scores real papers whose topic counts differ from the blueprint, and voided questions", () => {
    // e.g. a sitting with 6 nomenclatura questions and one voided RIPA question (44 asked)
    const items = [
      ...Array.from({ length: 6 }, () => ({ topic: "nom" as const, ok: true })),
      ...blueprint().filter((x) => x.topic !== "nom"),
    ];
    const ripa = items.findIndex((x) => x.topic === "ripa");
    items.splice(ripa, 1);
    const r = scoreAnswers(items);
    expect(r.asked).toBe(46);
    expect(r.perTopic.nom).toEqual({ correct: 6, asked: 6 });
    expect(r.perTopic.ripa).toEqual({ correct: 9, asked: 9 });
    expect(r.pass).toBe(true);
  });

  it("passes when every minimum is met exactly (carta 2/4, RIPA 5/10, balizamiento 3/5)", () => {
    const r = scoreAnswers(blueprint({ carta: 2, ripa: 5, baliz: 2 }));
    expect(r).toMatchObject({ total: 36, pass: true, failedMinimums: [] });
    expect(scoreAnswers(blueprint({ carta: 3 })).failedMinimums).toEqual(["carta"]);
  });

  it("counts unanswered questions as wrong", () => {
    const items = blueprint().map((x, i) => (i < 14 ? { ...x, ok: false } : x));
    expect(scoreAnswers(items)).toMatchObject({ total: 31, pass: false });
  });

  it("reports every topic, including ones with no questions", () => {
    expect(Object.keys(scoreAnswers([]).perTopic)).toEqual(TOPICS.map((t) => t.id));
    expect(scoreAnswers([])).toMatchObject({ total: 0, asked: 0, pass: false });
  });
});

describe("scoreExam (by topic counts)", () => {
  it("accepts more correct answers in a topic than the blueprint has (real papers)", () => {
    const all = Object.fromEntries(TOPICS.map((t) => [t.id, t.q]));
    expect(scoreExam({ ...all, nom: 6 }).total).toBe(47);
  });
});

describe("exam date", () => {
  it("is Saturday 12 Dec 2026", () => {
    expect(EXAM_DATE).toEqual({ y: 2026, m: 12, d: 12 });
    expect(EXAM.passCorrect).toBe(32);
  });

  it("counts whole local days like the plan view", () => {
    expect(daysToExam(new Date(2026, 10, 20, 10))).toBe(22);
    expect(daysToExam(new Date(2026, 10, 20, 23, 59))).toBe(22);
    expect(daysToExam(new Date(2026, 11, 11, 8))).toBe(1);
    expect(daysToExam(new Date(2026, 11, 12, 18))).toBe(0);
    expect(daysToExam(new Date(2026, 11, 13))).toBe(-1);
  });
});
