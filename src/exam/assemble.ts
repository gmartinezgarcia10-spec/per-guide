// Build a mock exam with the official number of questions per topic (docs/EXAM-SPEC.md).
import type { Stat } from "../core/progress.ts";
import { shuffle as defaultShuffle } from "../core/util.ts";
import { TOPICS } from "./spec.ts";

export interface MockOptions<Q> {
  /** Prefer questions the student gets wrong or hasn't seen. */
  weak?: boolean;
  stats?: Record<string, Stat>;
  /** Injected for tests; defaults to a random shuffle. */
  shuffle?: (a: readonly Q[]) => Q[];
  /** Progress key of a question; defaults to `q.id`. */
  key?: (q: Q) => string;
  /** Topic of a question; defaults to `q.topic` (legacy arrays: `q => q[0]`). */
  topic?: (q: Q) => string;
}

/**
 * Weakness: lower = practise first. Unseen 0.6; otherwise accuracy (0–1), plus 1 if the last
 * answer was right. So: failed and inaccurate < unseen < failed but usually right < mastered.
 */
export function weakness(s: Stat | undefined): number {
  return s ? (s[2] ? 1 : 0) + s[1] / s[0] : 0.6;
}

export function assembleMock<Q>(pool: readonly Q[], o: MockOptions<Q> = {}): Q[] {
  const shuffle = o.shuffle ?? defaultShuffle;
  const key = o.key ?? ((q: Q) => (q as { id?: string }).id ?? "");
  const topicOf = o.topic ?? ((q: Q) => (q as { topic: string }).topic);
  const stats = o.stats ?? {};
  return TOPICS.flatMap((t) => {
    const topicPool = shuffle(pool.filter((q) => topicOf(q) === t.id));
    if (o.weak) topicPool.sort((a, b) => weakness(stats[key(a)]) - weakness(stats[key(b)]));
    return topicPool.slice(0, t.q);
  });
}
