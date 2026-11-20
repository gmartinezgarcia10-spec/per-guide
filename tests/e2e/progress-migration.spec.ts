import { readFileSync } from "node:fs";
import { expect, NOW, test } from "./fixtures";

// Progress saved by the pre-F6 app (v2, keys derived from question text / real index) must survive.
const VIEW = "main > section[data-view]:not([hidden])";
const bank = readFileSync("tests/baseline/bank.jsonl", "utf8").trim().split("\n");
const firstGuide = JSON.parse(bank[0] ?? "[]") as [string, string];
const GUIDE_KEY = `${firstGuide[0]}:${firstGuide[1].slice(0, 70)}`; // id g-0001
const DAY = 864e5;
const now = NOW.getTime();

const v2 = {
  v: 2,
  upd: now - DAY,
  stats: {
    // answered right yesterday, back in 3 days
    [GUIDE_KEY]: [2, 2, true, now - DAY, 2, now + 3 * DAY],
    // real question 0 answered wrong yesterday: due today
    "r:0": [1, 0, false, now - DAY, 0, now - DAY],
  },
  best: {},
  hist: [],
  checks: {},
  papers: {},
  log: [
    [now - DAY, GUIDE_KEY, 1],
    [now - DAY + 1000, "r:0", 0],
  ],
  cur: null,
  lastTema: 1,
};

test.beforeEach(async ({ page }) => {
  await page.addInitScript((state) => {
    if (location.protocol !== "file:") return; // also runs on about:blank, which has no storage
    if (!localStorage.getItem("per2:state")) localStorage.setItem("per2:state", JSON.stringify(state));
  }, v2);
});

test("old v2 progress is migrated to permanent ids on first load", async ({ page, open }) => {
  await open("plan");
  const state = await page.evaluate(() => JSON.parse(localStorage.getItem("per2:state") ?? "null"));
  expect(state.v).toBe(3);
  expect(Object.keys(state.stats).sort()).toEqual(["g-0001", "gva-0000"]);
  expect(state.log.map((x: unknown[]) => x[1])).toEqual(["g-0001", "gva-0000"]);
  expect(state.stats["g-0001"]).toEqual(v2.stats[GUIDE_KEY]);
});

test("migrated progress shows up in the plan and progress views", async ({ page, open }) => {
  await open("plan");
  await expect(page.locator("#continueBox")).toContainText("Toca repasar hoy: 1");
  await open("progreso");
  await expect(page.locator(VIEW)).toContainText("Preguntas que no he visto (2059)");
  await expect(page.locator(VIEW)).toContainText("Repasar mis fallos (1)");
  await expect(page.locator("#activity tr")).toHaveCount(3); // header + 2 answers
});

test.describe("importing an old exported file", () => {
  test("merges v2 keys into the id-keyed state", async ({ page, open }) => {
    // Start from an empty v3 state (overrides the v2 seed above), then import the old file.
    await page.addInitScript(() => {
      if (location.protocol === "file:")
        localStorage.setItem("per2:state", JSON.stringify({ v: 3, stats: {} }));
    });
    await open("progreso");
    await page.locator("#impIn").setInputFiles({
      name: "per-progreso.json",
      mimeType: "application/json",
      buffer: Buffer.from(JSON.stringify(v2)),
    });
    await expect(page.locator("#bkMsg")).toContainText("importado");
    const state = await page.evaluate(() => JSON.parse(localStorage.getItem("per2:state") ?? "null"));
    expect(Object.keys(state.stats).sort()).toEqual(["g-0001", "gva-0000"]);
  });
});
