# Roadmap

Exam: **Sat 12 Dec 2026** (GVA Valencia). Status is updated at the end of every step, and each step is one PR.

## Phase 1: Foundations (plan: `docs/FOUNDATIONS.md`): complete

| Step | What | Status |
|---|---|---|
| F0 | Docs baseline: fix CLAUDE.md, EXAM-SPEC (checked against GVA), ROADMAP, record decisions | done (#1) |
| F1 | Tooling skeleton (Vite, TS, Biome, Vitest, Playwright Test, CI) + minimal guard/post-edit hooks + branch protection | done (#2) |
| F2 | Baseline snapshot of the current app + port the 12 Python tests to real assertions | done (#3) |
| F3 | Question bank → `content/questions/**` JSON, stable IDs, schema, validator | done (#4) |
| F4 | CSS + core (store, helpers, exam spec) → `src/`; rest of the script → `src/legacy/` modules (router stays in `app.js` until phase 2) | done (#5) |
| F5 | `src/legacy/chapters.js` → `src/chapters/tema-NN-<name>/` | done (#6) |
| F6 | `per2:` progress migration to stable IDs | done (#7) |
| F7 | Full `.claude/` setup: settings, hooks, rules, skills, agents, `.mcp.json`, statusline | done (#8) |
| F8 | ARCHITECTURE, CONTENT-GUIDE, ADRs, slim CLAUDE.md, move old files to `legacy/` | done |

## Phase 2: Learning core

Already in the app (found while splitting it): spaced repetition (1/3/7/14/30-day boxes and a mistakes queue), a pass-probability forecast (Bayesian per topic plus a 4,000-exam Monte Carlo, with "which topic helps most"), real sittings, weak-spot mocks.

| Step | What | Status |
|---|---|---|
| P1 | Exam logic as typed, tested modules: scoring (`spec.ts`), mock assembly (`assemble.ts`), spaced repetition (`learn/srs.ts`), exam date; `app.js` calls them | done (#10) |
| P2 | Pass forecast (`forecast()` in `app.js`) → typed module with seeded-random tests; use the spec's pass rule | **in progress**, branch `p2-forecast` |
| P3 | PNB result when a mock fails PER: needs the exact rule for how GVA grades PNB from a PER paper (which 27 questions count). Confirm the source first | todo |
| P4 | Fill the 39 empty explanations (`/content-audit` per topic) | todo |
| P5 | Rewrite the quiz and exam views and the router from `app.js` as typed modules | todo |

## Phase 3: Interactive training
Chart-work trainer (course, current, compass correction) · lights, shapes and sound-signal drills (RIPA) · IALA A buoyage drills.

## Phase 4: Product
PWA + offline (fonts are loaded from Google Fonts today: bundle them) · progress sync outside claude.ai (today it uses the claude.ai artifact runtime) · Capacitor iOS build · App Store listing and privacy labels · **rights cleared** (blocks release).
