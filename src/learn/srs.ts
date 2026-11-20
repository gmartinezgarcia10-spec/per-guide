// Spaced repetition (Leitner boxes). A correct answer moves the question up one box and schedules
// it 1, 3, 7, 14 or 30 days later; a mistake sends it back to box 0, due immediately.
import type { Stat } from "../core/progress.ts";

export const INTERVALS_DAYS = [1, 3, 7, 14, 30] as const;
const DAY = 864e5;

/** New stat after answering. Never mutates `prev`. */
export function review(prev: Stat | undefined, ok: boolean, now: number): Stat {
  const attempts = (prev?.[0] ?? 0) + 1;
  const correct = (prev?.[1] ?? 0) + (ok ? 1 : 0);
  const box = ok ? Math.min((prev?.[4] ?? 0) + 1, INTERVALS_DAYS.length) : 0;
  const due = ok ? now + (INTERVALS_DAYS[box - 1] ?? 1) * DAY : now;
  return [attempts, correct, ok, now, box, due];
}

/** Due for review now. Old stats without a due date are due only if the last answer was wrong. */
export function isDue(s: Stat | undefined, now: number): boolean {
  if (!s) return false;
  const due = s[5];
  return due != null ? due <= now : !s[2];
}

/** "toca repasarla hoy" / "vuelve mañana" / "vuelve en N días", or "" if not scheduled. */
export function nextReviewLabel(s: Stat | undefined, now: number): string {
  const due = s?.[5];
  if (due == null) return "";
  const d = Math.ceil((due - now) / DAY);
  return d <= 0 ? "toca repasarla hoy" : d === 1 ? "vuelve mañana" : `vuelve en ${d} días`;
}
