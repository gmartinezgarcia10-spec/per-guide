# PER study guide — project notes for Claude Code

Spanish PER (Patrón de Embarcaciones de Recreo) study guide, intended to become a paid App Store app. Exam: Generalitat Valenciana, 11–12 Dec 2026 (PER normally Saturday 12 Dec). Official format: `docs/EXAM-SPEC.md`. The content is in Spanish; talk to Gerardo in English.

## Commands
- `npm run verify` — check + unit + build + e2e. **A task is done only when this passes**; report failures with output.
- `npm run check` (typecheck, Biome, content validation) · `npm test` (Vitest) · `npm run build` (→ `dist/index.html`, single file) · `npm run e2e` (Playwright, 390 + 1280 px).
- Hooks in `.claude/settings.json` block edits to `dist/`, `legacy/`, `tools/patches/`, lockfile, and lint/typecheck every edit.
- `main` is protected: work on a branch, open a PR, CI must be green.

## What's here
- `index.html` — the whole app: one self-contained file (~1.2 MB) with HTML, CSS, JS and the question bank. No build step. Open it in a browser to run it.
- `tools/patches/patch1.py … patch14.py` — the history of content merges from Gerardo's printed manual (one per chapter). Kept for reference; don't re-run them on the current file.
- `tests/e2e/` — Playwright tests against `dist/index.html` at 390 and 1280 px (fixed clock 20 Nov 2026, seeded `Math.random`): key terms per chapter, overflow, question-bank validity, quiz/simulator flows, widgets. `tests/unit/` — Vitest.
- `tests/baseline/` — snapshot of the app before the split (bank, visible text of every route, TOCs, widget outputs). The refactor must reproduce it exactly; update only on purpose (`npx playwright test --project=baseline --update-snapshots`) and explain why in the PR.

## Code layout inside index.html
- **Chapters:** `CH[n] = {intro, sections: [[id, title, `html`], ...], init(root){...}}`, n = 1..11. Sections render as collapsible blocks; the chapter's table of contents is built from the array. Widgets are wired in `init(root)`.
- **Helpers:** `PER` with `$`, `$$`, `boatTop`, `AR(id, color)`.
- **Question bank `PER.Q`:**
  - Guide questions are `[topic, question, options[], correctIndex, explanation]`, added through `PER.Q.push(...)` blocks placed just before the `(function(){` that precedes `const R=[`.
  - Real GVA exam questions live in `const R=[...]`; they carry a 6th field, `{p: [sittings], i}`.
  - Topic keys: nom, amarre, seg, leg, baliz, ripa, man, emerg, meteo, teoria, carta.
- **Routes:** `#tema/N`, `#tema/N/preguntas`, `#plan`, `#test`, `#progreso`, `#practicas`.
- **Progress:** localStorage `per2:state` (`v:2`); per-question stats keyed `topic:<first 70 chars>` (guide) or `r:<index>` (real GVA). Never break existing keys. The app already schedules reviews (1/3/7/14/30 days) and a mistakes queue.

## Conventions
- Paraphrase source material; never copy the manual verbatim. Spanish terms in `<span class="es">`, formulas in `<span class="formula">`.
- When the manual and real exams disagree, follow the real exams and flag outdated rules (RD 339/2021, MARPOL 2013, RD 128/2022).
- Check for duplicates before adding questions (the e2e tests fail on them).
- Run `npm run verify` after every change.

## Rights note
The manual content is Gerardo's own copy of a commercial book. Owning a copy doesn't confer the right to sell its content, so clear rights before shipping a paid app.

## Status (20 Nov 2026)
The whole manual is merged (Temas 1–11). 2,061 questions in total: 1,105 guide questions plus 956 real GVA questions. Possible next steps: wrap it as an iOS app (e.g. Capacitor), split the single file into modules, add sync for progress.

## Current work
Phase 1 (foundations) — plan in `docs/FOUNDATIONS.md`, status in `docs/ROADMAP.md`.
