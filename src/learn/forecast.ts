// Pass forecast: "what's my chance of passing if the exam were today?"
//
// Per topic, accuracy is uncertain, so it's modelled as Beta(3 + correct, 2 + wrong): a 60 % prior
// worth 5 answers, updated with every answer given. Each simulated exam draws an accuracy per topic,
// answers that topic's questions with it, and applies the official rule (≥ 32 correct and the topic
// minimums). The leverage of a topic is how much the pass rate rises if its accuracy were 10 points higher.
//
// Random numbers are drawn in a fixed order, so a seeded source gives exactly reproducible results.
import type { Stat } from "../core/progress.ts";
import { EXAM, TOPICS, type Topic, type TopicId } from "../exam/spec.ts";

export type Rng = () => number;
/** [correct, attempts] per topic. */
export type TopicAccuracy = Record<TopicId, [number, number]>;

export const PRIOR = { a: 3, b: 2 } as const;

/** Gamma(k, 1) sample (Marsaglia–Tsang; k < 1 via the boost k + 1). */
export function rgamma(k: number, rng: Rng = Math.random): number {
  if (k < 1) return rgamma(k + 1, rng) * rng() ** (1 / k);
  const d = k - 1 / 3;
  const c = 1 / Math.sqrt(9 * d);
  for (;;) {
    let x: number;
    let v: number;
    do {
      const u1 = rng();
      const u2 = rng();
      x = Math.sqrt(-2 * Math.log(u1 || 1e-12)) * Math.cos(2 * Math.PI * u2);
      v = 1 + c * x;
    } while (v <= 0);
    v = v * v * v;
    const u = rng();
    if (u < 1 - 0.0331 * x * x * x * x) return d * v;
    if (Math.log(u) < 0.5 * x * x + d * (1 - v + Math.log(v))) return d * v;
  }
}

/** Beta(a, b) sample. */
export function rbeta(a: number, b: number, rng: Rng = Math.random): number {
  const x = rgamma(a, rng);
  return x / (x + rgamma(b, rng));
}

/** Sum correct answers and attempts per topic from saved stats. */
export function topicAccuracy<Q>(
  bank: readonly Q[],
  stats: Record<string, Stat>,
  key: (q: Q) => string,
  topic: (q: Q) => string,
): TopicAccuracy {
  const A = Object.fromEntries(TOPICS.map((t) => [t.id, [0, 0]])) as TopicAccuracy;
  for (const q of bank) {
    const s = stats[key(q)];
    const id = topic(q);
    const acc = Object.hasOwn(A, id) ? A[id as TopicId] : undefined;
    if (s && acc) {
      acc[0] += s[1];
      acc[1] += s[0];
    }
  }
  return A;
}

export interface Simulation {
  /** Share of simulated exams passed. */
  p: number;
  /** Expected number of correct answers (out of 45). */
  exp: number;
  /** Share of simulated exams meeting each topic minimum. */
  mins: Partial<Record<TopicId, number>>;
}

/** Run n simulated exams; P[topic]() draws that exam's accuracy for the topic. */
export function simulate(P: Record<TopicId, () => number>, n: number, rng: Rng = Math.random): Simulation {
  let pass = 0;
  let sum = 0;
  const mins: Partial<Record<TopicId, number>> = {};
  for (const t of TOPICS) if (t.min !== undefined) mins[t.id] = 0;
  for (let k = 0; k < n; k++) {
    let tot = 0;
    let ok = true;
    for (const t of TOPICS) {
      const p = P[t.id]();
      let c = 0;
      for (let j = 0; j < t.q; j++) if (rng() < p) c++;
      tot += c;
      if (t.min !== undefined) {
        if (c >= t.min) mins[t.id] = (mins[t.id] ?? 0) + 1;
        else ok = false;
      }
    }
    sum += tot;
    if (ok && tot >= EXAM.passCorrect) pass++;
  }
  for (const id of Object.keys(mins) as TopicId[]) mins[id] = (mins[id] ?? 0) / n;
  return { p: pass / n, exp: sum / n, mins };
}

export interface Forecast {
  base: Simulation;
  /** Topics by how much +10 points of accuracy would raise the pass rate, best first. */
  lev: { t: Topic; gain: number }[];
  answered: number;
  A: TopicAccuracy;
}

export interface ForecastOptions {
  rng?: Rng;
  /** Simulated exams for the main estimate. */
  n?: number;
  /** Simulated exams per topic for the leverage ranking. */
  nLeverage?: number;
}

export function forecast(A: TopicAccuracy, o: ForecastOptions = {}): Forecast {
  const rng = o.rng ?? Math.random;
  const answered = TOPICS.reduce((s, t) => s + A[t.id][1], 0);
  const draws = (boost: TopicId | null) =>
    Object.fromEntries(
      TOPICS.map((t) => {
        const [a, b] = A[t.id];
        const al = PRIOR.a + a;
        const be = PRIOR.b + (b - a);
        return [
          t.id,
          () => {
            const p = rbeta(al, be, rng);
            return t.id === boost ? Math.min(0.99, p + 0.1) : p;
          },
        ];
      }),
    ) as Record<TopicId, () => number>;
  const base = simulate(draws(null), o.n ?? 4000, rng);
  const lev = TOPICS.map((t) => ({
    t,
    gain: simulate(draws(t.id), o.nLeverage ?? 1500, rng).p - base.p,
  })).sort((x, y) => y.gain - x.gain);
  return { base, lev, answered, A };
}
