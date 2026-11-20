import { expect, test } from "./fixtures";

// Interactive widgets exercised by the old Python tests.

test("tema 1: draft and trim calculator", async ({ page, open }) => {
  await open("tema/1");
  await expect(page.locator("#asTxt")).toContainText("Calado medio");
  await expect(page.locator("#asTxt")).toContainText("Asiento");
});

test("tema 2: swinging-circle widget reacts to wind and distance", async ({ page, open }) => {
  await open("tema/2");
  const out = page.locator("#bTxt");
  await expect(out).toContainText("✓");
  await page.locator("[data-bz=lejos]").click();
  const hits: number[] = [];
  for (let a = 0; a < 360; a += 15) {
    await page.locator("#bw").fill(String(a));
    await page.locator("#bw").dispatchEvent("input");
    if ((await out.innerText()).includes("✗")) hits.push(a);
  }
  await page.locator("[data-bz=cerca]").click();
  for (let a = 0; a < 360; a += 15) {
    await page.locator("#bw").fill(String(a));
    await page.locator("#bw").dispatchEvent("input");
    if ((await out.innerText()).includes("✗")) hits.push(1000 + a);
  }
  // Some wind direction must produce a collision warning, and not every one.
  expect(hits.length).toBeGreaterThan(0);
  expect(hits.length).toBeLessThan(48);
});

test("tema 3: navigation-zone selector shows the required gear", async ({ page, open }) => {
  await open("tema/3");
  await page.locator("[data-z='1']").click();
  await expect(page.locator("#zoneInfo")).toContainText("Zona 1");
  await page.locator("[data-z='4']").click();
  await expect(page.locator("#zoneInfo")).toContainText("Zona 4");
  await expect(page.locator("#zoneInfo")).toContainText("12 mn");
  await page.locator("#mobA").click();
});

test("tema 4: coastal-zone map explains a zone on tap", async ({ page, open }) => {
  await open("tema/4");
  await expect(page.locator("#czInfo")).toHaveText("Toca una zona del dibujo.");
  await page.locator(".cz[data-id=buceo]").dispatchEvent("click");
  await expect(page.locator("#czInfo")).not.toHaveText("Toca una zona del dibujo.");
});

test("tema 5: buoy grid describes the selected mark", async ({ page, open }) => {
  await open("tema/5");
  await expect(page.locator("#selTxt")).toHaveText("");
  await page.locator('#markGrid .mark[data-i="9"]').click();
  await expect(page.locator("#selTxt")).not.toHaveText("");
});

test("tema 10: tide/sounding calculator shows its three steps", async ({ page, open }) => {
  await open("tema/10");
  const steps = page.locator("#mzSteps");
  await expect(steps).toContainText("1. Corrección por presión");
  await expect(steps).toContainText("3. Sonda");
});
