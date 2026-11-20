import { expect, test } from "./fixtures";

const VIEW = "main > section[data-view]:not([hidden])";

test("plan counts down to Saturday 12 Dec 2026", async ({ page, open }) => {
  await open("plan"); // clock fixed at 20 Nov 2026
  await expect(page.locator("#countdown")).toHaveText("22");
});

test("answering a chapter question gives feedback and saves progress", async ({ page, open }) => {
  await open("tema/1/preguntas");
  const quiz = page.locator(`${VIEW} .q`).first();
  await expect(quiz.locator(".eyebrow").first()).toContainText("Pregunta 1 de");
  await quiz.locator("button.opt").first().click();

  await expect(quiz.locator("button.opt.right")).toHaveCount(1);
  await expect(quiz.locator("button.opt:not([disabled])")).toHaveCount(0);
  await expect(quiz.locator(".expl")).toContainText(/✓|✗/);

  const state = await page.evaluate(() => JSON.parse(localStorage.getItem("per2:state") ?? "null"));
  expect(state?.v).toBe(2);
  expect(Object.keys(state.stats)).toHaveLength(1);
  // Progress keys: guide questions "topic:<first 70 chars>", real GVA questions "r:<index>" (F6 migrates these).
  expect(Object.keys(state.stats)[0]).toMatch(/^(nom:.+|r:\d+)$/);

  await quiz.locator("[data-next]").click();
  await expect(page.locator(`${VIEW} .q .eyebrow`).first()).toContainText("Pregunta 2 de");
});

test("a real GVA sitting opens as a timed 45-question exam", async ({ page, open }) => {
  await open("test");
  await page.locator(`${VIEW} button`, { hasText: "Octubre 2026" }).first().click();
  await expect(page.locator("#mkT")).toHaveText("90:00");
  await expect(page.locator(VIEW)).toContainText("45");
});

test("progress survives a reload", async ({ page, open }) => {
  await open("tema/2/preguntas");
  await page.locator(`${VIEW} .q button.opt`).first().click();
  await open("progreso");
  await expect(page.locator(VIEW)).not.toContainText("Preguntas que no he visto (2061)");
  await expect(page.locator(VIEW)).toContainText("Preguntas que no he visto (2060)");
});
