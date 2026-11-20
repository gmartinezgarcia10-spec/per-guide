# Architecture

How the PER study app is put together, as of the end of Phase 1 (20 Nov 2026). Decisions and their reasons are recorded in `docs/decisions/`.

## Shape

The app is one self-contained HTML file. It has no server and no network calls, except the optional claude.ai sync and Google Fonts.

```
content/questions/**/*.json ──┐                    (validated, build fails on errors)
                              ├─ vite-plugin-bank ─→ <script>window.PER_BANK={guide,real,ids}</script>
index.html (HTML shell) ──────┤
src/main.ts ──────────────────┴─ Vite + singlefile ─→ dist/index.html  (≈1.2 MB, works from disk/offline)
```

- **Build:** `npm run build`. Vite bundles `src/main.ts` and inlines JS and CSS (`vite-plugin-singlefile`). `src/content/vite-plugin-bank.ts` injects the question bank as a classic script before the app module.
- **Dev:** `npm run dev`. Same pipeline at http://localhost:5173, with a full reload when content files change.
- **Output:** `dist/index.html` is opened from disk today and will be wrapped by Capacitor in phase 4. It is gitignored, and hooks block editing it.

## Modules and load order (`src/main.ts`)

Import order matters, because legacy code reads globals as it loads.

1. `styles/app.css`: the original stylesheet, byte-for-byte.
2. `core/per.ts`: builds the `PER` namespace from the typed core modules and sets `window.PER`.
3. `chapters/index.js`: each `chapters/tema-NN-<name>/index.js` sets `PER.CH[n] = {intro, sections, init}`.
4. `legacy/bank.js`: attaches ids to the `PER_BANK` arrays, fills `PER.Q` (guide, then real), and defines `PER.PAPERS` (the questions of each real sitting) and `PER.RQ`.
5. `legacy/app.js`: progress state and sync, quiz engine, chapter rendering, mock exams, views, the hash router. It starts with `route()`.

| Area | Files | Status |
|---|---|---|
| Core helpers | `src/core/{dom,store,util,draw,audio,progress,per}.ts` | typed, unit-tested |
| Exam format | `src/exam/spec.ts` (from `docs/EXAM-SPEC.md`) | typed, unit-tested |
| Question bank | `src/content/{schema,validate,load,vite-plugin-bank}.ts` | typed, unit-tested |
| Chapters | `src/chapters/tema-NN-*/index.js` | legacy, moved verbatim (`@ts-nocheck`, not linted) |
| App | `src/legacy/{bank,app}.js` | legacy, moved verbatim; rewrite planned for phase 2 |

New code imports the core modules directly. Legacy code destructures from `window.PER`:
- `$`, `$$`, `store`
- `T`, `TBY` (topics), `CH` (chapters), `Q` (questions)
- drawing: `COL`, `buoy`, `boatTop`
- angles and numbers: `r`, `n360`, `deg`, `pm`, `rad`
- `esc`, `shuffle`, `horn`
- `legacyKeyMap`, `migrateProgress`

## Question bank

- **Source:** `content/questions/{guide,gva}/<topic>.json`. The schema is `src/content/schema.ts`; decision record 0002 explains it.
- **IDs:** guide `g-NNNN` and real `gva-NNNN` (the original index). IDs are permanent: `check:ids` fails if an id from `main` disappears.
- **What the app sees:** legacy positional arrays `[topic, q, options, answer, explanation, meta?]`, where `meta = {i, p: sittings, d?: keyRevised, img?: dataURI}`. Each array also carries a non-index `id` property.
- **Order:** guide questions by id number, then real questions by index. This keeps the baseline bank byte-identical.

## Saved progress

Saved in localStorage `per2:state`. It is also copied to claude.ai when the page runs there, and can be exported and imported as a file. The shape at v3 (`src/core/progress.ts`):

| Field | Meaning |
|---|---|
| `v` | 3 |
| `stats[id]` | `[attempts, correct, lastOk, lastTs, box, dueTs]` (spaced repetition: box → 1/3/7/14/30 days) |
| `log` | last 300 answers: `[ts, id, ok]` |
| `cur` | unfinished exam: `{title, paper, timed, ids, ord, ans, i, left, ts, …}` |
| `best[topic]` | best chapter-quiz score (%) |
| `hist` | last 60 mock exams: `{d, total, pass, p, per}` |
| `papers[sitting]` | best result per real sitting: `{best, pass, d}` |
| `checks[i]` | practical-exam checklist ticks |
| `lastTema`, `upd` | last chapter opened; last update time |

Every load and every `merge()` (cloud, import) runs `migrateProgress`, which is pure and idempotent. A state-shape change needs all of these: a version bump, a migration step, a unit test, and an e2e test that seeds the old version (`.claude/rules/storage.md`).

## Routing and views

The router is a hash router in `app.js`. A route is `#<view>[/…]`, where the view is `plan`, `tema`, `test`, `progreso` or `practicas`. Each view is a `<section data-view>` in `index.html`.
- `#tema/N` renders chapter N.
- `#tema/N/<section>` scrolls to that section; `#tema/N/preguntas` scrolls to the chapter quiz.

## Duplicated facts to fold in (phase 2)

`app.js` still hard-codes the exam date (`new Date(2026,11,12)`) and the pass rule (`total>=32` and the topic minimums). These duplicate `src/exam/spec.ts`. The date also appears in `index.html` text and in `.claude/hooks/{session-context,statusline}.sh`. When the next sitting is announced, update `docs/EXAM-SPEC.md` first and then grep for `2026-12-12`, `2026,11,12` and `12 dic`.

## Testing

| Layer | Where | What |
|---|---|---|
| Static | `npm run check` | TypeScript strict; Biome; content validator; `check:ids` |
| Unit | `tests/unit` (Vitest) | exam scoring; bank schema and validator; bank ⇄ baseline round-trip; core helpers; progress migration |
| E2E | `tests/e2e` (Playwright, 390 + 1280 px) | key terms per chapter; overflow; bank validity; study flows; widgets; v2 → v3 progress |
| Baseline | `tests/e2e/baseline.spec.ts` → `tests/baseline/` | the bank, the visible text of 26 routes, TOCs and widget outputs, as they were before the split |

The e2e tests fix the clock at 20 Nov 2026 (Europe/Madrid), seed `Math.random`, and fail on any JS error. CI (`.github/workflows/ci.yml`) runs `npm run verify` on every PR. `main` is protected and needs a PR with green CI.

## Privacy and external dependencies

- Progress stays on the device unless the page runs inside claude.ai, where it syncs via `window.claude.use("db")`. There are no analytics.
- Fonts load from Google Fonts. Offline, the app falls back to system fonts.
- Phase 4 needs its own sync and bundled fonts for the App Store build.
