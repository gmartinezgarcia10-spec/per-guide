// Saved progress (localStorage "per2:state", cloud copy, exported files) is keyed per question.
// Up to v2 the key was derived from the question (`topic:<first 70 chars>`, or `r:<index>` for real
// exam questions); from v3 it is the question's permanent id (g-NNNN / gva-NNNN).
// migrateProgress() rewrites old keys wherever they appear. It is pure and idempotent, and keeps keys it
// can't map (questions edited or removed earlier) so counts don't change.
import type { LegacyQuestion } from "../content/schema.ts";

export const PROGRESS_VERSION = 3;

/** A question in the app's bank: the legacy array plus its permanent id (set in src/legacy/bank.js). */
export type BankQuestion = LegacyQuestion & { id: string };

/** [attempts, correct, lastOk, lastTs, box, dueTs]; older entries may have only the first 3. */
export type Stat = [number, number, boolean, number?, number?, (number | null)?];
export type LogEntry = [ts: number, key: string, ok: 0 | 1];

export interface ProgressState {
  v?: number;
  stats?: Record<string, Stat>;
  log?: LogEntry[];
  cur?: { ids: string[]; [k: string]: unknown } | null;
  [k: string]: unknown;
}

/** The pre-v3 key, exactly as the app used to compute it. */
export const legacyKey = (q: LegacyQuestion) => (q[5] ? `r:${q[5].i}` : `${q[0]}:${q[1].slice(0, 70)}`);

export function legacyKeyMap(bank: readonly BankQuestion[]): Map<string, string> {
  return new Map(bank.map((q) => [legacyKey(q), q.id]));
}

export function migrateProgress<S extends ProgressState>(state: S, map: Map<string, string>): S {
  if (!state || typeof state !== "object") return state;
  const to = (k: string) => map.get(k) ?? k;
  const out: S = { ...state, v: Math.max(PROGRESS_VERSION, state.v ?? 0) };

  if (state.stats) {
    const stats: Record<string, Stat> = {};
    for (const [k, s] of Object.entries(state.stats)) {
      const id = to(k);
      const prev = stats[id];
      // Same rule as the app's merge(): keep the entry with more attempts.
      if (!prev || s[0] > prev[0]) stats[id] = s;
    }
    out.stats = stats;
  }
  if (Array.isArray(state.log)) out.log = state.log.map(([ts, k, ok]) => [ts, to(k), ok]);
  if (state.cur && Array.isArray(state.cur.ids)) out.cur = { ...state.cur, ids: state.cur.ids.map(to) };
  return out;
}
