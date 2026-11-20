# Roadmap

Exam: **Sat 12 Dec 2026** (GVA Valencia). Status is updated at the end of every step, and each step is one PR.

## Phase 1: Foundations (plan: `docs/FOUNDATIONS.md`)

| Step | What | Status |
|---|---|---|
| F0 | Docs baseline: fix CLAUDE.md, EXAM-SPEC (checked against GVA), ROADMAP, record decisions | done (#1) |
| F1 | Tooling skeleton (Vite, TS, Biome, Vitest, Playwright Test, CI) + minimal guard/post-edit hooks + branch protection | done (#2) |
| F2 | Baseline snapshot of the current app + port the 12 Python tests to real assertions | done (#3) |
| F3 | Question bank → `content/questions/**` JSON, stable IDs, schema, validator | done (#4) |
| F4 | CSS + core (store, helpers, exam spec) → `src/`; rest of the script → `src/legacy/` modules (router stays in `app.js` until phase 2) | done (#5) |
| F5 | `src/legacy/chapters.js` → `src/chapters/tema-NN-<name>/` | **in progress**, branch `f5-chapters` |
| F6 | `per2:` progress migration to stable IDs | todo |
| F7 | Full `.claude/` setup: settings, hooks, rules, skills, agents, `.mcp.json`, statusline | todo |
| F8 | ARCHITECTURE, CONTENT-GUIDE, ADRs, slim CLAUDE.md, move old files to `legacy/` | todo |

## Phase 2: Learning core
Spaced repetition already exists (1/3/7/14/30-day reviews + mistakes queue): move it onto stable IDs and upgrade the scheduler · rewrite `src/legacy/app.js` (quiz engine, router, views) as typed modules · weak-spot queues · readiness score / pass probability · PNB fallback result in the simulator · explanations linked to theory sections.

## Phase 3: Interactive training
Chart-work trainer (course, current, compass correction) · lights, shapes and sound-signal drills (RIPA) · IALA A buoyage drills.

## Phase 4: Product
PWA + offline (fonts are loaded from Google Fonts today: bundle them) · progress sync outside claude.ai (today it uses the claude.ai artifact runtime) · Capacitor iOS build · App Store listing and privacy labels · **rights cleared** (blocks release).
