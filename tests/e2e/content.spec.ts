import { KEYWORDS } from "./data/keywords";
import { CHAPTERS, expect, horizontalOverflow, test, VIEWS, visibleText } from "./fixtures";

// Ported from tests/test1-12.py, now with real assertions.

for (const n of CHAPTERS) {
  test.describe(`tema ${n}`, () => {
    test("renders its sections with a table of contents and no overflow", async ({ page, open }) => {
      await open(`tema/${n}`);
      const toc = await page.locator("nav.toc a").allInnerTexts();
      expect(toc.length, "TOC entries").toBeGreaterThan(2);
      expect(toc.at(-1)).toMatch(/^Preguntas de examen \(\d+\)$/);
      expect(await horizontalOverflow(page)).toBeLessThanOrEqual(0);
    });

    const keywords = KEYWORDS[n];
    if (keywords) {
      test("shows its key exam terms", async ({ page, open }) => {
        await open(`tema/${n}`);
        const text = await visibleText(page);
        const missing = keywords.filter((k) => !text.includes(k));
        expect(missing, "missing key terms").toEqual([]);
      });
    }

    test("question page has no overflow", async ({ page, open }) => {
      await open(`tema/${n}/preguntas`);
      await expect(page.locator("main > section[data-view]:not([hidden]) .opts").first()).toBeVisible();
      expect(await horizontalOverflow(page)).toBeLessThanOrEqual(0);
    });
  });
}

for (const v of VIEWS) {
  test(`#${v} renders without overflow`, async ({ page, open }) => {
    await open(v);
    expect(await horizontalOverflow(page)).toBeLessThanOrEqual(0);
  });
}

test.describe("question bank", () => {
  type Q = [string, string, string[], number, string, { i: number; p: string[] }?];
  const bank = (page: import("@playwright/test").Page) =>
    page.evaluate(() => (window as unknown as { PER: { Q: Q[] } }).PER.Q);

  test("has the expected size: 1,105 guide + 956 real GVA questions", async ({ page, open }) => {
    await open("plan");
    const Q = await bank(page);
    expect({ total: Q.length, real: Q.filter((q) => q[5]).length }).toEqual({ total: 2061, real: 956 });
  });

  test("every question is well-formed", async ({ page, open }) => {
    await open("plan");
    const TOPICS = [
      "nom",
      "amarre",
      "seg",
      "leg",
      "baliz",
      "ripa",
      "man",
      "emerg",
      "meteo",
      "teoria",
      "carta",
    ];
    const bad = (await bank(page)).filter(
      ([topic, q, opts, k, expl]) =>
        !TOPICS.includes(topic) ||
        !q?.trim() ||
        !Array.isArray(opts) ||
        opts.length < 2 ||
        opts.some((o) => !String(o).trim()) ||
        !(Number.isInteger(k) && k >= 0 && k < opts.length) ||
        typeof expl !== "string",
    );
    expect(bad.map((q) => q[1])).toEqual([]);
  });

  test("has no duplicates (same key as the progress store)", async ({ page, open }) => {
    await open("plan");
    const seen = new Set<string>();
    const dups: string[] = [];
    for (const q of await bank(page)) {
      const key = q[5] ? `r${q[5].i}` : q[0] + q[1].slice(0, 70);
      if (seen.has(key)) dups.push(q[1]);
      seen.add(key);
    }
    expect(dups).toEqual([]);
  });
});
