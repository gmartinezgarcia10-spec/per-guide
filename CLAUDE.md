# PER study guide

A study app for the Spanish PER (Patrón de Embarcaciones de Recreo) theory exam, GVA Valencia. The next sitting is **Saturday 12 Dec 2026**. It will become a paid App Store app. The app content is in Spanish; talk to Gerardo in English.

## Definition of done
- `npm run verify` passes: check, unit, build, e2e at 390 and 1280 px, and the baseline. Use `/verify`, and report failures with their output.
- Work on a branch, then open a PR (`/ship`). `main` is protected and CI must be green.

## Hard rules (each one exists for a reason)
- **Never change, reuse or delete a question id.** Saved progress is keyed by id, and `npm run check:ids` enforces it.
- **Never copy the printed manual verbatim.** It's a commercial book and the app will be sold. Paraphrase.
- **The real GVA exams outrank the manual.** Follow them and flag outdated rules.
- **Never break saved progress** (`per2:*`). Shape changes need a version bump and a migration (`.claude/rules/storage.md`).
- **Never update `tests/baseline/` to make a test pass.** Update it only for an intended content change, and say why in the PR.
- Don't edit `dist/` (build output), `legacy/` (historical scripts) or `package-lock.json`. Don't add dependencies without asking.

## Commands
- `npm run dev` (http://localhost:5173) · `npm run build` → `dist/index.html` (single offline file; `index.html` alone doesn't run)
- `npm run check` = typecheck + Biome + `validate:content` + `check:ids` · `npm test` (Vitest) · `npm run e2e` (Playwright)

## Where things are
| What | Where | Details |
|---|---|---|
| Architecture, modules, load order, saved state | `src/` | `docs/ARCHITECTURE.md` |
| Question bank (2,061: 1,105 guide `g-NNNN`, 956 real `gva-NNNN`) | `content/questions/{guide,gva}/<topic>.json` | `docs/CONTENT-GUIDE.md`, `src/content/schema.ts` |
| Chapter text and widgets (temas 1–11) | `src/chapters/tema-NN-<name>/index.js` | legacy, moved verbatim |
| Quiz engine, mock exams, views, router, sync | `src/legacy/app.js` | legacy; rewrite in phase 2 |
| Exam format (45 q, 90 min, ≥32, minimums) | `src/exam/spec.ts` | `docs/EXAM-SPEC.md` |
| Tests | `tests/unit`, `tests/e2e`, `tests/baseline` | `.claude/rules/tests.md` |
| Plan and status | | `docs/ROADMAP.md` · decisions in `docs/decisions/` |

## Claude Code setup
- **Rules** (`.claude/rules/`, loaded by path): content, questions, ui, storage, tests.
- **Skills:** `/verify`, `/add-questions <topic> [n]`, `/content-audit <topic>`, `/ship`, `/catchup` (after `/clear`), `/adr`.
- **Agents:** `content-reviewer`, `question-auditor`, `code-reviewer`, `ux-reviewer` (Playwright MCP), `test-writer`. Review with an agent that didn't write the change.
- **Hooks:**
  - frozen-path guard;
  - lint, typecheck and bank validation after edits;
  - no push or commit on `main`;
  - ask before `--update-snapshots`;
  - the Stop gate (`PER_HOOKS=minimal` skips it);
  - session context.
- After changing CLAUDE.md, rules, skills, agents or hooks, run `docs/CANARIES.md`.

## Glossary
PER (the licence), PNB (the lower licence: a PER fail can still be graded *apto* PNB), GVA (Generalitat Valenciana), *convocatoria* (exam sitting), *apto* (pass), RIPA (collision regulations, COLREG), IALA A (buoyage), *carta* 25-C (exam chart), tema (chapter/topic). Topic keys: nom amarre seg leg baliz ripa man emerg meteo teoria carta.

## Rights
The manual is Gerardo's own copy of a commercial book (Castells et al., UPC). Clear rights, or replace the derived text, before shipping a paid app.

## Now
Phase 1 (foundations) is complete. Next is phase 2, the learning core: see `docs/ROADMAP.md`.
