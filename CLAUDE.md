# PER study guide — project notes for Claude Code

Spanish PER (Patrón de Embarcaciones de Recreo) study guide, intended to become a paid App Store app. Exam: Generalitat Valenciana, 11–12 Dec 2026 (PER normally Saturday 12 Dec). Official format: `docs/EXAM-SPEC.md`. The content is in Spanish; talk to Gerardo in English.

## Commands
- `npm run verify` — check + unit + build + e2e. **A task is done only when this passes**; report failures with output.
- `npm run check` (typecheck, Biome, content validation) · `npm test` (Vitest) · `npm run build` (→ `dist/index.html`, single file) · `npm run e2e` (Playwright, 390 + 1280 px).
- Hooks in `.claude/settings.json` block edits to `dist/`, `legacy/`, `tools/patches/`, lockfile, and lint/typecheck every edit (plus validate the bank on `content/questions` edits).
- `main` is protected: work on a branch, open a PR, CI must be green.

## What's here
- `index.html` — the HTML shell (views, header, footer); loads `src/main.ts`. **Not runnable on its own**: run `npm run dev` (http://localhost:5173) or `npm run build` and open `dist/index.html`.
- `src/` — `main.ts` (entry; import order matters), `core/` (typed: dom, store, util, draw, audio, `per.ts` publishes `window.PER`), `exam/spec.ts`, `content/` (bank schema, validator, Vite plugin), `styles/app.css`, `legacy/` (moved verbatim, `@ts-nocheck`, not linted: `chapters.js`, `bank.js`, `app.js`).
- `content/questions/{guide,gva}/<topic>.json` — the question bank (source of truth). Schema and rules: `src/content/schema.ts`; validator: `npm run validate:content`.
- `src/styles/app.css` is kept byte-for-byte (Biome formatter off) so the build's CSS stays identical; restyle it on purpose, not via formatting.
- `tools/patches/patch1.py … patch14.py` — the history of content merges from Gerardo's printed manual (one per chapter). Kept for reference; don't re-run them on the current file.
- `tests/e2e/` — Playwright tests against `dist/index.html` at 390 and 1280 px (fixed clock 20 Nov 2026, seeded `Math.random`): key terms per chapter, overflow, question-bank validity, quiz/simulator flows, widgets. `tests/unit/` — Vitest.
- `tests/baseline/` — snapshot of the app before the split (bank, visible text of every route, TOCs, widget outputs). The refactor must reproduce it exactly; update only on purpose (`npx playwright test --project=baseline --update-snapshots`) and explain why in the PR.

## Code layout
- **Chapters** (`src/legacy/chapters.js`, split per chapter in F5): `CH[n] = {intro, sections: [[id, title, `html`], ...], init(root){...}}`, n = 1..11. Sections render as collapsible blocks; the chapter's table of contents is built from the array. Widgets are wired in `init(root)`.
- **Helpers:** `window.PER` (`src/core/per.ts`): `$`, `$$`, `store`, `T` (= `TOPICS` from `src/exam/spec.ts`), `TBY`, `CH`, `Q`, `COL`, `buoy`, `boatTop`, `r`, `n360`, `deg`, `pm`, `rad`, `esc`, `shuffle`, `horn`. Legacy code destructures from it; new code imports the modules directly.
- **Question bank `PER.Q`:** built from `content/questions/` by `src/content/vite-plugin-bank.ts`, which injects `window.PER_BANK = {guide, real}` as legacy arrays: `[topic, question, options[4], answer, explanation]`, plus `{i, p: [sittings], d?, img?}` for real questions. `index.html` does `PER.Q.push(...PER_BANK.guide)` and `const R=PER_BANK.real`.
  - Topic keys: nom, amarre, seg, leg, baliz, ripa, man, emerg, meteo, teoria, carta.
  - **IDs are permanent:** guide `g-NNNN` (new ones take the next free number, appended at the end), real `gva-NNNN` = original index. Never renumber, reuse or delete-and-recreate an id.
  - Editing the first 70 characters of a guide question's text changes its progress key (orphans saved progress) until F6 moves progress onto ids. Avoid it, or flag it in the PR.
- **App** (`src/legacy/app.js`): progress state, quiz engine, chapter rendering, mock exams, views and the hash router. Routes: `#tema/N`, `#tema/N/preguntas`, `#plan`, `#test`, `#progreso`, `#practicas`.
- **Sync:** `app.js` also syncs progress to the claude.ai artifact runtime (`window.claude.use("db")`) when present; elsewhere it's local only.
- **Progress:** localStorage `per2:state` (`v:2`); per-question stats keyed `topic:<first 70 chars>` (guide) or `r:<index>` (real GVA). Never break existing keys. The app already schedules reviews (1/3/7/14/30 days) and a mistakes queue.

## Conventions
- Paraphrase source material; never copy the manual verbatim. Spanish terms in `<span class="es">`, formulas in `<span class="formula">`.
- When the manual and real exams disagree, follow the real exams and flag outdated rules (RD 339/2021, MARPOL 2013, RD 128/2022).
- Add or edit questions only in `content/questions/`; the validator (also run by the post-edit hook and the build) rejects schema errors, duplicate ids, shared progress keys and repeated options. 39 guide questions have empty explanations (warnings) — fill them when touching those questions.
- Run `npm run verify` after every change.

## Rights note
The manual content is Gerardo's own copy of a commercial book. Owning a copy doesn't confer the right to sell its content, so clear rights before shipping a paid app.

## Status (20 Nov 2026)
The whole manual is merged (Temas 1–11). 2,061 questions in total: 1,105 guide questions plus 956 real GVA questions.

## Current work
Phase 1 (foundations) — plan in `docs/FOUNDATIONS.md`, status in `docs/ROADMAP.md`.
