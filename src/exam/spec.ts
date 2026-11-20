// Official PER exam format (GVA, RD 875/2014 annex II). Source of truth: docs/EXAM-SPEC.md.
// Mirrors `T[]` in index.html; the app switches to this module in F4.

export type TopicId =
  | "nom"
  | "amarre"
  | "seg"
  | "leg"
  | "baliz"
  | "ripa"
  | "man"
  | "emerg"
  | "meteo"
  | "teoria"
  | "carta";

export interface Topic {
  n: number;
  id: TopicId;
  name: string;
  /** Questions of this topic in a 45-question exam. */
  q: number;
  /** Minimum correct answers in this topic to pass, if the topic has one. */
  min?: number;
}

export const TOPICS: readonly Topic[] = [
  { n: 1, id: "nom", name: "Nomenclatura náutica", q: 4 },
  { n: 2, id: "amarre", name: "Elementos de amarre y fondeo", q: 2 },
  { n: 3, id: "seg", name: "Seguridad en la mar", q: 4 },
  { n: 4, id: "leg", name: "Legislación", q: 2 },
  { n: 5, id: "baliz", name: "Balizamiento", q: 5, min: 3 },
  { n: 6, id: "ripa", name: "Reglamento (RIPA)", q: 10, min: 5 },
  { n: 7, id: "man", name: "Maniobra y navegación", q: 2 },
  { n: 8, id: "emerg", name: "Emergencias en la mar", q: 3 },
  { n: 9, id: "meteo", name: "Meteorología", q: 4 },
  { n: 10, id: "teoria", name: "Teoría de navegación", q: 5 },
  { n: 11, id: "carta", name: "Carta de navegación", q: 4, min: 2 },
];

export const EXAM = {
  questions: 45,
  passCorrect: 32,
  durationSec: 90 * 60,
  /** Wrong answers carry no penalty. */
  penalty: 0,
} as const;

/** Next sitting (GVA Valencia). PER is on the Saturday. Update docs/EXAM-SPEC.md first. */
export const EXAM_DATE = { y: 2026, m: 12, d: 12 } as const;

/** Whole days from `now`'s local date to the exam date: 0 on the day, negative after. */
export function daysToExam(now: Date): number {
  const exam = new Date(EXAM_DATE.y, EXAM_DATE.m - 1, EXAM_DATE.d);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.round((exam.getTime() - today.getTime()) / 864e5);
}

export type CorrectByTopic = Partial<Record<TopicId, number>>;

export interface ExamResult {
  pass: boolean;
  total: number;
  /** Topics whose minimum was not reached. */
  failedMinimums: TopicId[];
}

/**
 * Pass/fail from correct answers per topic: at least 32 correct and every topic minimum
 * (carta 2, RIPA 5, balizamiento 3). Counts may exceed the blueprint: real papers vary.
 */
export function scoreExam(correct: CorrectByTopic): ExamResult {
  let total = 0;
  const failedMinimums: TopicId[] = [];
  for (const t of TOPICS) {
    const c = correct[t.id] ?? 0;
    if (c < 0 || !Number.isInteger(c)) throw new RangeError(`${t.id}: ${c} correct is not a count`);
    total += c;
    if (t.min !== undefined && c < t.min) failedMinimums.push(t.id);
  }
  return { pass: total >= EXAM.passCorrect && failedMinimums.length === 0, total, failedMinimums };
}

export interface AnswerResult {
  topic: TopicId;
  /** Answered correctly. Unanswered counts as wrong. */
  ok: boolean;
}

export interface ScoredExam extends ExamResult {
  asked: number;
  perTopic: Record<TopicId, { correct: number; asked: number }>;
}

/** Score a finished exam question by question. Voided questions are simply not included. */
export function scoreAnswers(items: readonly AnswerResult[]): ScoredExam {
  const perTopic = Object.fromEntries(
    TOPICS.map((t) => [t.id, { correct: 0, asked: 0 }]),
  ) as ScoredExam["perTopic"];
  for (const it of items) {
    const p = perTopic[it.topic];
    p.asked++;
    if (it.ok) p.correct++;
  }
  const r = scoreExam(Object.fromEntries(TOPICS.map((t) => [t.id, perTopic[t.id].correct])));
  return { ...r, asked: items.length, perTopic };
}
