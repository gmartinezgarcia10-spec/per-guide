import { resolve } from "node:path";
import { test as base, expect, type Page } from "@playwright/test";

/** The built single-file app. `npm run build` first (`npm run verify` does both). */
export const APP = `file://${resolve(process.env.PER_APP ?? "dist/index.html")}`;

/** Fixed "now" so the exam countdown and spaced-repetition dates are stable. */
export const NOW = new Date("2026-11-20T10:00:00+01:00");

export const CHAPTERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] as const;
export const VIEWS = ["plan", "test", "progreso", "practicas"] as const;

// Deterministic Math.random (mulberry32) so quizzes and simulators pick the same questions every run.
const seedRandom = () => {
  let a = 0x9e3779b9;
  Math.random = () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

type Fixtures = {
  /** JS errors (pageerror + console.error) seen during the test; asserted empty after each test. */
  errors: string[];
  open: (route: string) => Promise<void>;
};

export const test = base.extend<Fixtures>({
  errors: async ({ page }, use) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (m) => {
      if (m.type() === "error") errors.push(m.text());
    });
    await use(errors);
    expect(errors, "JS errors during the test").toEqual([]);
  },
  page: async ({ page }, use) => {
    await page.clock.setFixedTime(NOW);
    await page.addInitScript(seedRandom);
    await use(page);
  },
  open: async ({ page, errors: _errors }, use) => {
    await use(async (route: string) => {
      // Hash-only navigation doesn't reload a file:// page, so go via about:blank for a clean load.
      await page.goto("about:blank");
      await page.goto(`${APP}#${route}`);
      await page.waitForLoadState("load");
      await expect(page.locator("main > section[data-view]:not([hidden])").first()).toBeVisible();
    });
  },
});

export { expect };

/** innerText on purpose: textContent would include the inline script that holds every chapter. */
export async function visibleText(page: Page): Promise<string> {
  return (await page.locator("body").innerText()).toLowerCase();
}

export async function horizontalOverflow(page: Page): Promise<number> {
  return page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
}
