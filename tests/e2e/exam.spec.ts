import type { Page } from "@playwright/test";
import { expect, test } from "./fixtures";

// Sitting a whole exam: scoring comes from src/exam/spec.ts, assembly from src/exam/assemble.ts.

type Legacy = [string, string, string[], number, string, { i: number }?];
type PerGlobal = { PAPERS: [string, string, (number | null)[]][]; RQ: Record<number, Legacy> };

/** Topic and correct option of each scored question of a real sitting (real papers keep option order). */
const paperKey = (page: Page, sitting: string) =>
  page.evaluate((id) => {
    const { PAPERS, RQ } = (window as unknown as { PER: PerGlobal }).PER;
    const p = PAPERS.find((x) => x[0] === id);
    if (!p) throw new Error(`no sitting ${id}`);
    return p[2].filter((i): i is number => i != null).map((i) => ({ topic: RQ[i]?.[0], answer: RQ[i]?.[3] }));
  }, sitting);

/** Answer question k with option choose(k) via the question navigator, then hand in. */
async function sit(page: Page, n: number, choose: (k: number) => number) {
  const area = page.locator("#mockArea");
  for (let k = 0; k < n; k++) {
    await area.locator(`.qnav [data-go="${k}"]`).click();
    await area.locator(`.q .opt[data-k="${choose(k)}"]`).click();
  }
  await expect(area.locator("[data-end]")).toHaveText(`Entregar examen (${n}/${n})`);
  await area.locator("[data-end]").click();
  return area.locator(".result");
}

const state = (page: Page) => page.evaluate(() => JSON.parse(localStorage.getItem("per2:state") ?? "null"));

test("a perfect real paper is APTO and is recorded", async ({ page, open }) => {
  await open("test");
  await page.locator("#v-test button.paper", { hasText: "Octubre 2026" }).click();
  const key = await paperKey(page, "2026-10");
  expect(key).toHaveLength(45);

  const result = await sit(page, key.length, (k) => key[k]?.answer ?? 0);
  await expect(result).toContainText("45 / 45 · APTO");
  await expect(result).toContainText("Has superado los 32 aciertos y los tres mínimos.");

  const s = await state(page);
  expect(s.hist.at(-1)).toMatchObject({ total: 45, pass: true, p: "2026-10" });
  expect(s.papers["2026-10"]).toMatchObject({ best: 45, pass: true });
  expect(s.cur).toBeNull();
});

test("missing the carta minimum fails even with 42 correct", async ({ page, open }) => {
  await open("test");
  await page.locator("#v-test button.paper", { hasText: "Octubre 2026" }).click();
  const key = await paperKey(page, "2026-10");
  const carta = key.flatMap((q, k) => (q.topic === "carta" ? [k] : []));
  const wrong = new Set(carta.slice(0, carta.length - 1)); // keep only 1 carta right (minimum is 2)
  expect(wrong.size).toBe(3);

  const result = await sit(page, key.length, (k) => {
    const a = key[k]?.answer ?? 0;
    return wrong.has(k) ? (a + 1) % 4 : a;
  });
  await expect(result).toContainText("42 / 45 · NO APTO");
  await expect(result).toContainText("No llegas al mínimo en: Carta de navegación.");
  expect((await state(page)).hist.at(-1)).toMatchObject({ total: 42, pass: false, per: { carta: 1 } });
});

test("a sitting with a voided question is scored out of the remaining 44", async ({ page, open }) => {
  await open("test");
  await page.locator("#v-test button.paper", { hasText: "Septiembre 2025" }).click();
  const key = await paperKey(page, "2025-09");
  expect(key).toHaveLength(44);

  const result = await sit(page, key.length, (k) => key[k]?.answer ?? 0);
  await expect(result).toContainText("44 / 44 · APTO");
  await expect(result).toContainText("1 pregunta sin respuesta en la plantilla, anulada");
});

test("a generated mock has the official 45 questions per topic", async ({ page, open }) => {
  await open("test");
  await page.locator("#startMock").click();
  const area = page.locator("#mockArea");
  await expect(area.locator(".qnav button")).toHaveCount(45);
  await expect(page.locator("#mkT")).toHaveText("90:00");
  const s = await state(page);
  const topics: Record<string, number> = {};
  const bank = await page.evaluate(() =>
    Object.fromEntries(
      (window as unknown as { PER: { Q: (Legacy & { id: string })[] } }).PER.Q.map((q) => [q.id, q[0]]),
    ),
  );
  for (const id of s.cur.ids as string[]) topics[bank[id] ?? "?"] = (topics[bank[id] ?? "?"] ?? 0) + 1;
  expect(topics).toEqual({
    nom: 4,
    amarre: 2,
    seg: 4,
    leg: 2,
    baliz: 5,
    ripa: 10,
    man: 2,
    emerg: 3,
    meteo: 4,
    teoria: 5,
    carta: 4,
  });
});
