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

export type CorrectByTopic = Partial<Record<TopicId, number>>;

export interface ExamResult {
  pass: boolean;
  total: number;
  /** Topics whose minimum was not reached. */
  failedMinimums: TopicId[];
}

export function scoreExam(correct: CorrectByTopic): ExamResult {
  let total = 0;
  const failedMinimums: TopicId[] = [];
  for (const t of TOPICS) {
    const c = correct[t.id] ?? 0;
    if (c < 0 || c > t.q || !Number.isInteger(c)) {
      throw new RangeError(`${t.id}: ${c} correct is outside 0..${t.q}`);
    }
    total += c;
    if (t.min !== undefined && c < t.min) failedMinimums.push(t.id);
  }
  return { pass: total >= EXAM.passCorrect && failedMinimums.length === 0, total, failedMinimums };
}
