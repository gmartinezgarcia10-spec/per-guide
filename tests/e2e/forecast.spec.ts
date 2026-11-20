import { readFileSync } from "node:fs";
import { expect, NOW, test } from "./fixtures";

// Pass forecast (src/learn/forecast.ts): Beta posterior per topic + Monte Carlo over 4,000 exams.
// The clock and Math.random are fixed, so the numbers are exact. They were recorded from the
// pre-P2 app (forecast inline in app.js) and must not change when the code moves.

type Q = { id: string; topic: string };
const load = (kind: string, topic: string) =>
  JSON.parse(readFileSync(`content/questions/${kind}/${topic}.json`, "utf8")) as Q[];

// A student who is strong everywhere except carta (chart work) and weak-ish in RIPA.
const ACC: Record<string, number> = { carta: 0.3, ripa: 0.6 };
function seededStats() {
  const stats: Record<string, unknown[]> = {};
  const t = NOW.getTime();
  for (const topic of [
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
  ]) {
    const qs = load("gva", topic).slice(0, 10);
    const acc = ACC[topic] ?? 0.9;
    qs.forEach((q, i) => {
      const ok = i < Math.round(acc * qs.length);
      stats[q.id] = [2, ok ? 2 : 0, ok, t, ok ? 2 : 0, t];
    });
  }
  return stats;
}

test.beforeEach(async ({ page }) => {
  await page.addInitScript((stats) => {
    if (location.protocol !== "file:") return;
    localStorage.setItem("per2:state", JSON.stringify({ v: 3, stats, upd: Date.now() }));
  }, seededStats());
});

test("forecast panel shows the pass probability, expected score and best topic to study", async ({
  page,
  open,
}) => {
  await open("progreso");
  const text = (await page.locator("#forecast").innerText()).replace(/\s+/g, " ").trim();
  expect(text).toBe(EXPECTED);
});

const EXPECTED =
  "33 % Probabilidad de aprobar si el examen fuera hoy Nota esperada 33,5/45 · 4.000 exámenes simulados con tu acierto por tema (220 respuestas) Mínimo de Balizamiento (3/5) 95 % Mínimo de Reglamento (RIPA) (5/10) 79 % Mínimo de Carta de navegación (2/4) 46 % Donde más puntos pierdes: Reglamento (RIPA) (≈4,0 de 10) · Carta de navegación (≈2,6 de 4) · Balizamiento (≈0,8 de 5). Dónde rinde más estudiar: subir 10 puntos de acierto en 11. Carta de navegación añade unos 11 puntos a tu probabilidad de aprobar. Después: 6. Reglamento (RIPA) (+5).";
