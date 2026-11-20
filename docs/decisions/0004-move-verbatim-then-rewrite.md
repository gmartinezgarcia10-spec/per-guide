# 0004: Split the single file by moving code verbatim, proven by a baseline

Date: 20 Nov 2026 · Status: accepted (F2–F5)

## Context
About 3,000 lines of dense legacy JS (11 chapters with widgets, quiz engine, mock exams, sync) had no tests. Rewriting it while splitting it would mix two risks, and any change in behaviour would be invisible.

## Decision
1. **Freeze the behaviour first (F2).** A characterization snapshot (`tests/baseline/`) records the question bank, the visible text of all 26 routes, the chapter TOCs and the widget outputs. The clock is fixed and `Math.random` is seeded.
2. **Move, don't rewrite (F3–F5).**
   - The bank goes to JSON.
   - The core helpers move to typed modules. They are small and easy to check line by line.
   - Everything else moves verbatim into ES modules, in the original order: `src/chapters/tema-NN-*/index.js`, `src/legacy/{bank,app}.js`.
   - Each step is proven equivalent:
     - the baseline stays unchanged;
     - the built CSS is byte-identical;
     - the bank round-trips byte for byte;
     - the moved chapter code is checked by parsing to be verbatim.
3. **Rewrite later, behind tests.** The quiz engine, router and views in `app.js` get rewritten as typed modules in phase 2, starting with tests (`test-writer`), one area at a time.

## Consequences
- The chapter and legacy files are excluded from Biome and type checking for now. Edits there rely on e2e tests and the baseline.
- The router and pass rule stay in `app.js` until phase 2. The exam date and pass mark are duplicated there (see ARCHITECTURE).
- The baseline is now the guard for content changes too: a content edit changes it, and updating it is a deliberate act, explained in the PR.
