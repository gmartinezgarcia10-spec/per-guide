import { CHAPTERS, expect, test, VIEWS } from "./fixtures";

// Characterization snapshot of the app as it was before the split (F2).
// Stored in tests/baseline/. F3-F5 must reproduce it exactly: if a refactor changes any of it,
// this test fails and shows the diff. Only update it on purpose:
//   npx playwright test --project=baseline --update-snapshots
// and explain the change in the PR.

const VIEW = "main > section[data-view]:not([hidden])";
const ROUTES = [...VIEWS, ...CHAPTERS.flatMap((n) => [`tema/${n}`, `tema/${n}/preguntas`])];
const file = (route: string) => `route-${route.replaceAll("/", "-")}.txt`;

test("question bank", async ({ page, open }) => {
  await open("plan");
  const bank = await page.evaluate(() =>
    (window as unknown as { PER: { Q: unknown[] } }).PER.Q.map((q) => JSON.stringify(q)).join("\n"),
  );
  expect(`${bank}\n`).toMatchSnapshot("bank.jsonl");
});

for (const route of ROUTES) {
  test(`visible text of #${route}`, async ({ page, open }) => {
    await open(route);
    const text = await page.locator(VIEW).innerText();
    expect(`${text.trim()}\n`).toMatchSnapshot(file(route));
  });
}

test("chapter tables of contents", async ({ page, open }) => {
  const tocs: Record<string, string[]> = {};
  for (const n of CHAPTERS) {
    await open(`tema/${n}`);
    tocs[`tema/${n}`] = await page.locator("nav.toc a").allInnerTexts();
  }
  expect(`${JSON.stringify(tocs, null, 2)}\n`).toMatchSnapshot("tocs.json");
});

test("widget outputs", async ({ page, open }) => {
  const out: Record<string, string> = {};
  const read = async (key: string, sel: string) => {
    out[key] = (await page.locator(sel).innerText()).trim();
  };

  await open("tema/1");
  await read("tema1.asTxt", "#asTxt");

  await open("tema/2");
  await read("tema2.bTxt.initial", "#bTxt");
  await page.locator("#bw").fill("90");
  await page.locator("#bw").dispatchEvent("input");
  await read("tema2.bTxt.90", "#bTxt");
  await page.locator("[data-bz=lejos]").click();
  await read("tema2.bTxt.lejos", "#bTxt");

  await open("tema/3");
  for (const z of ["1", "4"]) {
    await page.locator(`[data-z='${z}']`).click();
    await read(`tema3.zoneInfo.${z}`, "#zoneInfo");
  }

  await open("tema/4");
  await page.locator(".cz[data-id=buceo]").dispatchEvent("click");
  await read("tema4.czInfo.buceo", "#czInfo");

  await open("tema/5");
  await page.locator('#markGrid .mark[data-i="9"]').click();
  await read("tema5.selTxt.9", "#selTxt");

  await open("tema/10");
  await read("tema10.mzSteps", "#mzSteps");

  expect(`${JSON.stringify(out, null, 2)}\n`).toMatchSnapshot("widgets.json");
});
