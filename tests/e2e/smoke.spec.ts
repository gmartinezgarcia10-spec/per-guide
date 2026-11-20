import { resolve } from "node:path";
import { expect, test } from "@playwright/test";

// Smoke test of the built app. The full port of tests/test1-12.py arrives in F2.
const APP = `file://${resolve("dist/index.html")}`;
const ROUTES = ["plan", "test", "progreso", "practicas", "tema/1", "tema/6", "tema/11", "tema/11/preguntas"];

for (const route of ROUTES) {
  test(`#${route} renders without JS errors or horizontal overflow`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (m) => {
      if (m.type() === "error") errors.push(m.text());
    });

    await page.goto(`${APP}#${route}`);
    await expect(page.locator("main, #app, body").first()).not.toBeEmpty();
    await page.waitForLoadState("networkidle");

    const { scrollWidth, innerWidth } = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
    }));
    expect(scrollWidth, "horizontal overflow").toBeLessThanOrEqual(innerWidth);
    expect(errors).toEqual([]);
  });
}

test("question bank is loaded and well-formed", async ({ page }) => {
  await page.goto(`${APP}#plan`);
  const bank = await page.evaluate(() => {
    const Q = (window as unknown as { PER: { Q: unknown[][] } }).PER.Q;
    const bad = Q.filter((q) => {
      const opts = q[2] as unknown[];
      const k = q[3] as number;
      return !Array.isArray(opts) || !(k >= 0 && k < opts.length);
    }).length;
    return { total: Q.length, real: Q.filter((q) => q[5]).length, bad };
  });
  expect(bank).toEqual({ total: 2061, real: 956, bad: 0 });
});
