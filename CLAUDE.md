# PER study guide — project notes for Claude Code

Spanish PER (Patrón de Embarcaciones de Recreo) study guide, intended to become a paid App Store app. Exam: Generalitat Valenciana, 11–12 Dec 2026 (PER normally Saturday 12 Dec). Official format: `docs/EXAM-SPEC.md`. The content is in Spanish; talk to Gerardo in English.

## What's here
- `index.html` — the whole app: one self-contained file (~1.2 MB) with HTML, CSS, JS and the question bank. No build step. Open it in a browser to run it.
- `tools/patches/patch1.py … patch14.py` — the history of content merges from Gerardo's printed manual (one per chapter). Kept for reference; don't re-run them on the current file.
- `tests/test1.py … test12.py` — Playwright smoke tests. Run with `python3 tests/testN.py "$PWD/index.html"`. Each checks keywords, horizontal overflow at 390 px and 1280 px, question counts, invalid or duplicate questions, and JS errors. **Caveat:** they only print results and never fail (no asserts, exit 0), and Playwright isn't installed for the system `python3`. Read the output; being replaced in F2 (see `docs/FOUNDATIONS.md`).

## Code layout inside index.html
- **Chapters:** `CH[n] = {intro, sections: [[id, title, `html`], ...], init(root){...}}`, n = 1..11. Sections render as collapsible blocks; the chapter's table of contents is built from the array. Widgets are wired in `init(root)`.
- **Helpers:** `PER` with `$`, `$$`, `boatTop`, `AR(id, color)`.
- **Question bank `PER.Q`:**
  - Guide questions are `[topic, question, options[], correctIndex, explanation]`, added through `PER.Q.push(...)` blocks placed just before the `(function(){` that precedes `const R=[`.
  - Real GVA exam questions live in `const R=[...]`; they carry a 6th field, `{p: [sittings], i}`.
  - Topic keys: nom, amarre, seg, leg, baliz, ripa, man, emerg, meteo, teoria, carta.
- **Routes:** `#tema/N`, `#tema/N/preguntas`, `#plan`, `#test`, `#progreso`, `#practicas`.
- **Progress:** saved in the browser's localStorage (keys prefixed `per2:`; never break existing keys).

## Conventions
- Paraphrase source material; never copy the manual verbatim. Spanish terms in `<span class="es">`, formulas in `<span class="formula">`.
- When the manual and real exams disagree, follow the real exams and flag outdated rules (RD 339/2021, MARPOL 2013, RD 128/2022).
- Check for duplicates before adding questions (the tests report them).
- Run all the tests after every change.

## Rights note
The manual content is Gerardo's own copy of a commercial book. Owning a copy doesn't confer the right to sell its content, so clear rights before shipping a paid app.

## Status (20 Nov 2026)
The whole manual is merged (Temas 1–11). 2,061 questions in total: 1,105 guide questions plus 956 real GVA questions. Possible next steps: wrap it as an iOS app (e.g. Capacitor), split the single file into modules, add sync for progress.

## Current work
Phase 1 (foundations) — plan in `docs/FOUNDATIONS.md`, status in `docs/ROADMAP.md`.
