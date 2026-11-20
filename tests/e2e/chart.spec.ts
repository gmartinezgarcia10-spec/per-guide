import type { Page } from "@playwright/test";
import { course } from "../../src/chart/geo";
import { MARKS } from "../../src/chart/strait";
import { expect, test } from "./fixtures";

// Tema 11.2: the Strait practice chart (C1). Runs at 390 and 1280 px.

const WRAP = "#chPractice .ch-wrap";
const PANEL = "#chPanel";

/** "l 36° 10,9′ N · L 006° 02,1′ W" → minutes (lon west negative). */
function readPos(text: string): { lat: number; lon: number } {
  const m = /l (\d+)° (\d+,\d)′ N · L (\d+)° (\d+,\d)′ W/.exec(text);
  if (!m) throw new Error(`no position in: ${text}`);
  const n = (s: string | undefined) => Number((s ?? "").replace(",", "."));
  return { lat: n(m[1]) * 60 + n(m[2]), lon: -(n(m[3]) * 60 + n(m[4])) };
}

async function clickMark(page: Page, id: string) {
  const b = await page.locator(`${WRAP} [data-mark=${id}] .ch-dot`).boundingBox();
  if (!b) throw new Error(`mark ${id} not visible`);
  await page.mouse.click(b.x + b.width / 2, b.y + b.height / 2);
}

async function zoomIn(page: Page, times: number) {
  for (let i = 0; i < times; i++) await page.locator(`${WRAP} [data-z=in]`).click();
}

test.beforeEach(async ({ open }) => {
  await open("tema/11");
});

test("the chart fits the screen and shows the real Strait lights", async ({ page }) => {
  await expect(page.locator(WRAP)).toBeVisible();
  for (const id of Object.keys(MARKS)) await expect(page.locator(`${WRAP} [data-mark=${id}]`)).toHaveCount(1);
  await expect(page.locator(WRAP)).toContainText("Trafalgar");
  await expect(page.locator(WRAP)).toContainText("OpenStreetMap");
  const [scroll, width] = await page.evaluate(() => [document.documentElement.scrollWidth, innerWidth]);
  expect(scroll).toBeLessThanOrEqual(width);
});

test("tapping a light reads its coordinates off the scales", async ({ page }) => {
  // Zoom in on the light itself (ctrl+wheel, as a trackpad pinch arrives), then tap it.
  await page.locator(`${WRAP} svg`).scrollIntoViewIfNeeded();
  const dot = await page.locator(`${WRAP} [data-mark=trafalgar] .ch-dot`).boundingBox();
  if (!dot) throw new Error("no Trafalgar");
  await page.mouse.move(dot.x + dot.width / 2, dot.y + dot.height / 2);
  await page.keyboard.down("Control");
  await page.mouse.wheel(0, -300);
  await page.keyboard.up("Control");
  expect(Number(await page.locator(WRAP).getAttribute("data-zoom"))).toBeGreaterThan(3);
  // Zoomed in, the scales follow the view along its edges.
  expect(await page.locator(`${WRAP} .ch-rtext`).count()).toBeGreaterThan(1);
  await clickMark(page, "trafalgar");
  await expect(page.locator(PANEL)).not.toContainText("Amplía");
  const got = readPos(await page.locator(PANEL).innerText());
  expect(Math.abs(got.lat - MARKS.trafalgar.pos.lat)).toBeLessThanOrEqual(0.15);
  expect(Math.abs(got.lon - MARKS.trafalgar.pos.lon)).toBeLessThanOrEqual(0.15);
});

test("course and distance between two lights", async ({ page }) => {
  await page.locator("#chModes [data-m=rd]").click();
  await expect(page.locator(PANEL)).toContainText("punto de salida");
  await clickMark(page, "trafalgar");
  await expect(page.locator(PANEL)).toContainText("punto de llegada");
  await clickMark(page, "tarifa");
  const text = await page.locator(PANEL).innerText();
  const m = /Rv = (\d{3})° · distancia = (\d+,\d) mn/.exec(text);
  expect(m, text).not.toBeNull();
  const want = course(MARKS.trafalgar.pos, MARKS.tarifa.pos);
  expect(Math.abs(Number(m?.[1]) - want.rv)).toBeLessThanOrEqual(1.5);
  expect(Math.abs(Number(m?.[2]?.replace(",", ".")) - want.d)).toBeLessThanOrEqual(0.4);
  await expect(page.locator(`${WRAP} .ch-track`)).toHaveCount(1);
  await expect(page.locator(`${WRAP} .ch-bar`)).toHaveCount(1);
  await page.locator("#chClear").click();
  await expect(page.locator(`${WRAP} .ch-track`)).toHaveCount(0);
  await expect(page.locator(PANEL)).toContainText("punto de salida");
});

test("fix by two compass bearings: wrong, then right", async ({ page }) => {
  await page.locator("#chModes [data-m=dem]").click();
  await expect(page.locator(PANEL)).toContainText("Tomas a la vez");
  await expect(page.locator(`${WRAP} .ch-track`)).toHaveCount(2);

  // The sliders start off the answer: checking now fails and shows the worked solution.
  await page.locator("#chChk").click();
  await expect(page.locator("#chOut")).toContainText("✗ Revisa las demoras");
  // The right bearings are drawn on the chart for comparison.
  await expect(page.locator(`${WRAP} .ch-sol`)).toHaveCount(2);
  const steps = await page.locator("#chOut .steps").innerText();
  const dv = [...steps.matchAll(/= (\d{3})°\n/g)].map((x) => Number(x[1]));
  expect(dv).toHaveLength(2);

  for (const k of [0, 1]) await page.locator(`#chD${k}`).fill(String(dv[k]));
  await expect(page.locator(`${WRAP} .ch-cut`)).toHaveCount(1);
  await page.locator("#chChk").click();
  await expect(page.locator("#chOut")).toContainText("✓ Bien trazado");
  await expect(page.locator("#chOut")).toContainText("Situación verdadera: l ");

  // The ± buttons step a bearing by one degree.
  await page.locator('[data-k="0"][data-step="1"]').click();
  await expect(page.locator("#chD0")).toHaveValue(String((dv[0] ?? 0) + 1 === 360 ? 0 : (dv[0] ?? 0) + 1));

  await page.locator("#chNew").click();
  await expect(page.locator("#chOut")).toBeEmpty();
});

test("zoom with buttons and keyboard, pan by dragging without reading a position", async ({ page }) => {
  const wrap = page.locator(WRAP);
  await expect(wrap).toHaveAttribute("data-zoom", "1.00");
  await zoomIn(page, 1);
  await expect(wrap).toHaveAttribute("data-zoom", "1.60");
  await page.locator(`${WRAP} [data-z=reset]`).click();
  await expect(wrap).toHaveAttribute("data-zoom", "1.00");

  const svg = page.locator(`${WRAP} svg`);
  await svg.focus();
  await page.keyboard.press("+");
  await expect(wrap).toHaveAttribute("data-zoom", "1.50");
  const before = await svg.getAttribute("viewBox");
  await page.keyboard.press("ArrowRight");
  expect(await svg.getAttribute("viewBox")).not.toBe(before);
  await page.keyboard.press("Enter");
  await expect(page.locator(PANEL)).toContainText("l 3");
  await page.keyboard.press("-");
  await expect(wrap).toHaveAttribute("data-zoom", "1.00");
  await page.keyboard.press("+");
  await page.keyboard.press("+");
  await page.keyboard.press("0");
  await expect(wrap).toHaveAttribute("data-zoom", "1.00");
  // Ctrl/⌘ + − stays with the browser: the chart doesn't zoom.
  await page.keyboard.press("Control+=");
  await expect(wrap).toHaveAttribute("data-zoom", "1.00");
  await page.keyboard.press("+");

  await page.locator("#chModes [data-m=pos]").click();
  await svg.scrollIntoViewIfNeeded();
  const b = await svg.boundingBox();
  if (!b) throw new Error("no chart");
  const vb = await svg.getAttribute("viewBox");
  await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2);
  await page.mouse.down();
  await page.mouse.move(b.x + b.width / 2 - 60, b.y + b.height / 2 - 20, { steps: 5 });
  await page.mouse.up();
  expect(await svg.getAttribute("viewBox")).not.toBe(vb);
  await expect(page.locator(PANEL)).toContainText("Toca cualquier punto");
});

test("at full view a phone tap doesn't claim tenths of a minute", async ({ page }) => {
  test.skip((page.viewportSize()?.width ?? 0) > 500, "phone width only");
  await page.locator(`${WRAP} svg`).scrollIntoViewIfNeeded();
  await clickMark(page, "tarifa");
  await expect(page.locator(PANEL)).toContainText("Amplía la carta para leer las décimas");
  const got = readPos(await page.locator(PANEL).innerText());
  // Rounded to 0,5′ or 1′.
  expect((got.lat * 2) % 1).toBeCloseTo(0, 6);
});
