import { describe, expect, it } from "vitest";
import { INTERVALS_DAYS, isDue, nextReviewLabel, review } from "../../src/learn/srs";

const DAY = 864e5;
const now = Date.UTC(2026, 10, 20, 9);

describe("review", () => {
  it("starts a new stat on first answer", () => {
    expect(review(undefined, true, now)).toEqual([1, 1, true, now, 1, now + 1 * DAY]);
    expect(review(undefined, false, now)).toEqual([1, 0, false, now, 0, now]);
  });

  it("moves up one box per correct answer: 1, 3, 7, 14, 30 days, then stays at 30", () => {
    let s = review(undefined, true, now);
    const due: number[] = [];
    for (let i = 0; i < 6; i++) {
      due.push(((s[5] as number) - now) / DAY);
      s = review(s, true, now);
    }
    expect(INTERVALS_DAYS).toEqual([1, 3, 7, 14, 30]);
    expect(due).toEqual([1, 3, 7, 14, 30, 30]);
  });

  it("drops back to box 0 and is due now after a mistake", () => {
    const s = review(review(review(undefined, true, now), true, now), false, now + DAY);
    expect(s).toEqual([3, 2, false, now + DAY, 0, now + DAY]);
  });

  it("accepts old 3-field stats (no box yet) and doesn't mutate its input", () => {
    const old: [number, number, boolean] = [4, 3, true];
    expect(review(old, true, now)).toEqual([5, 4, true, now, 1, now + DAY]);
    expect(old).toEqual([4, 3, true]);
  });
});

describe("isDue", () => {
  it("is due when the due date has passed", () => {
    expect(isDue([1, 0, false, now, 0, now], now)).toBe(true);
    expect(isDue([1, 1, true, now, 1, now + DAY], now)).toBe(false);
    expect(isDue([1, 1, true, now, 1, now + DAY], now + DAY)).toBe(true);
  });

  it("treats old stats without a due date as due only if last answer was wrong", () => {
    expect(isDue([2, 1, false], now)).toBe(true);
    expect(isDue([2, 2, true], now)).toBe(false);
    expect(isDue(undefined, now)).toBe(false);
  });
});

describe("nextReviewLabel", () => {
  it("says when the question comes back", () => {
    expect(nextReviewLabel([1, 0, false, now, 0, now], now)).toBe("toca repasarla hoy");
    expect(nextReviewLabel([1, 1, true, now, 1, now + DAY], now)).toBe("vuelve mañana");
    expect(nextReviewLabel([1, 1, true, now, 2, now + 3 * DAY], now)).toBe("vuelve en 3 días");
    expect(nextReviewLabel([1, 1, true, now, 2, now + 2.5 * DAY], now)).toBe("vuelve en 3 días");
    expect(nextReviewLabel([2, 2, true], now)).toBe("");
    expect(nextReviewLabel(undefined, now)).toBe("");
  });
});
