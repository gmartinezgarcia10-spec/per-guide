# Phase 1: Foundations

Status: **approved 20 Nov 2026** (decisions in §14) · Written 20 Nov 2026 · Owner: Gerardo

**Goal.** Make the project fast and safe for Claude Code to work on before any new learning features are added. Nothing changes for the person studying: the app looks and behaves exactly as it does today, and progress saved under `per2:` in the browser survives.

**Reference.** The Claude Code setup follows [claude-code-ultimate-guide](https://github.com/FlorianBruniaux/claude-code-ultimate-guide) (v3.45, Oct–Nov 2026). It was adapted to a project with one developer and a lot of content, and §12 lists what was left out on purpose.

---

## 0. Where we start (checked 20 Nov 2026)

| Area | Today | Problem |
|---|---|---|
| App | `index.html`: 1.2 MB and ~4,100 lines. CSS is at lines 9–170, JS from line 385 onward, the 11 `CH[n]` chapters start at line 524, and `const R=[…]` is at line 4101. | Claude has to grep and edit a huge file. Edits are hard to review, and no two tasks can safely change it at the same time. |
| Question bank | Positional arrays `[topic, q, opts, correct, expl, meta?]`. Guide questions have no stable ID. | Spaced repetition and progress tracking need a permanent ID for every question. |
| Tests | 12 Python Playwright scripts that **only print** results. | Nothing can ever fail. Playwright isn't even installed for the system `python3`. |
| Docs | CLAUDE.md is the only doc. It says the storage prefix is `per:`, but the code uses `per2:`. | Out-of-date context steers every session the wrong way. |
| Claude config | No `.claude/` folder, no hooks or skills, no MCP. | Every session starts from scratch, and checks only run if someone remembers them. |
| CI | None, even though the repo is on GitHub (`gmartinezgarcia10-spec/per-guide`). | Nothing checks a change before it's merged. |
| Exam model | `T[]` has questions and minimum correct answers per topic (RD 875/2014, annex II). | This is good and should become the single source of truth. |

---

## 1. Target repository layout

```
per-guide/
├── CLAUDE.md                  # ≤100 lines: a routing index, not an encyclopedia
├── .mcp.json                  # project MCP servers (committed)
├── .claude/
│   ├── settings.json          # permissions, hooks, statusline (committed)
│   ├── settings.local.json    # personal overrides (gitignored)
│   ├── rules/                 # rules that load only for matching paths
│   ├── skills/                # repeatable procedures, used as /commands
│   ├── agents/                # subagents with one specific job each
│   └── hooks/                 # hook scripts (bash + node)
├── docs/
│   ├── FOUNDATIONS.md         # this file
│   ├── ROADMAP.md             # phases 1–4, current status
│   ├── ARCHITECTURE.md        # modules, data flow, storage, routes
│   ├── CONTENT-GUIDE.md       # how to write content and questions (Spanish style, sources, laws)
│   ├── EXAM-SPEC.md           # official exam format: blocks, minimums, timing, sources
│   └── decisions/             # ADRs: 0001-build-tool.md, 0002-question-ids.md, …
├── src/
│   ├── main.ts                # bootstrap + router
│   ├── core/                  # store (localStorage), router, PER helpers ($, $$, boatTop, AR)
│   ├── exam/                  # exam spec (from T[]), simulator, scoring
│   ├── quiz/                  # quiz engine, (phase 2: scheduler)
│   ├── ui/                    # shared components, progress screens, plan
│   ├── styles/                # split from the current <style> block
│   └── chapters/
│       └── tema-01-nomenclatura/
│           ├── index.ts       # {intro, sections, init(root)}
│           ├── sections/*.html
│           └── widgets.ts     # what init() wires up today
├── content/
│   └── questions/
│       ├── guide/<topic>.json # 1,105 guide questions, split by topic
│       └── gva/<sitting>.json # 956 real exam questions, e.g. 2019-11.json
├── schemas/question.schema.json
├── scripts/
│   ├── validate-content.ts    # schema, duplicates, indices, topics, outdated-rule scan
│   ├── extract-baseline.ts    # one-time: dump today's app into a snapshot
│   └── migrate-progress.ts    # per2: keys → stable question IDs (runs in the app)
├── tests/
│   ├── unit/                  # Vitest
│   ├── e2e/                   # Playwright Test (TypeScript)
│   └── baseline/              # snapshot of the current app (proves the split changed nothing)
├── legacy/                    # the current index.html, python tests, tools/patches (read-only)
└── dist/index.html            # BUILD OUTPUT: still a single file that works offline (gitignored)
```

The build still produces **one self-contained `dist/index.html`**, so opening it directly from disk, offline use and a later Capacitor wrap all keep working.

---

## 2. Toolchain (ADR-0001)

| Need | Choice | Why |
|---|---|---|
| Build | **Vite** + `vite-plugin-singlefile` | Gives one output HTML file. Standard for Capacitor and PWA (phase 4). The dev server reloads instantly. |
| Language | **TypeScript** with `strict`. Chapter widgets can start as `// @ts-check` JS and be migrated one at a time. | Type errors show up right after an edit (with an LSP or the typecheck hook), which catches whole classes of mistakes the AI would otherwise make. |
| Lint + format | **Biome** | A single fast binary, quick enough to run on every edit from a hook. |
| Unit tests | **Vitest** | Same config as Vite. Covers the scheduler, scoring and validators. |
| E2E | **@playwright/test** (Node) | Replaces the Python scripts. Real assertions, 390/1280 px projects, traces on failure. |
| Content schema | **Zod**, with JSON Schema generated from it | One definition is shared by the validator, the app types and editor autocomplete. |
| Package manager | npm (Node 25 is already installed) | No extra tool to install. |
| CI | GitHub Actions | `gh` is already set up, and the remote is GitHub. |

`package.json` scripts are the **single interface** that people, hooks, skills and CI all use:

```
npm run dev          # vite dev server
npm run build        # → dist/index.html
npm run check        # typecheck + biome + validate:content   (fast, < 15 s)
npm run test         # vitest
npm run e2e          # playwright (390 + 1280)
npm run verify       # check + test + build + e2e   ← "done" means this passes
npm run validate:content
```

---

## 3. Content model and stable IDs (ADR-0002)

The positional arrays become objects. **As built in F3** (`src/content/schema.ts`, decision record `docs/decisions/0002-question-ids.md`):

```jsonc
{
  "id": "gva-0587",                 // guide: "g-0042". Permanent: never reused or renumbered
  "topic": "carta",                 // one of the 11 keys from EXAM-SPEC
  "q": "¿…?",
  "options": ["…", "…", "…", "…"],  // exactly 4
  "answer": 0,
  "explanation": "…",               // may be empty (warning)
  "gva": {                          // real exam questions only
    "index": 587,                   // original index; progress key r:<index>
    "sittings": ["2024-04"],
    "keyRevised": true,             // optional: official key was revised
    "image": "img/gva-0587.jpg"     // optional: figure, inlined at build
  }
}
```

The planned `refs` (links to theory), `law` and `status` fields are left out until something uses them (phase 2: theory links; content audits: status).

- **The validator** (`npm run validate:content`) checks:
  - the schema;
  - that `answer` falls within `options`;
  - unique IDs;
  - near-duplicates (normalized text and similarity of options);
  - option count;
  - empty explanations;
  - known outdated terms (an editable list in `content/outdated-terms.json`, e.g. superseded RD numbers).

  It exits with a non-zero code on any error, and can report as human-readable text or `--json` for hooks.
  *As built:* errors for schema, ids (format, uniqueness, order, gva id = index), topic vs. file, folder, repeated options (signs count: "+5°" ≠ "−5°"), shared progress keys, missing images; warnings for empty explanations and repeated question text. The outdated-terms list is deferred to `/content-audit` (F7), since nobody has checked which terms are outdated yet.
- **Migration:** the IDs are assigned once by `extract-baseline.ts`, in the same order as today's bank. `migrate-progress.ts` maps the existing `per2:` progress to the new IDs the first time the new app loads. An e2e test proves that seeded old progress survives.

---

## 4. Testing and verification strategy

The order matters. **Freeze the current behavior first, then refactor.**

1. **Baseline (characterization) snapshot.** Before anything moves, a script runs the *current* `index.html` in Playwright and saves:
   - the full question bank as JSON;
   - the rendered text of every route (`#tema/1..11`, `/preguntas`, `#plan`, `#test`, `#progreso`, `#practicas`);
   - the list of tables of contents;
   - the widget outputs the old tests looked for (`#asTxt`, `#mzSteps`, …);
   - screenshots at 390 and 1280 px.
2. **Porting the old tests.** Every check in `tests/test1–12.py` becomes a Playwright assertion: keywords, no horizontal overflow, question counts, no invalid questions or duplicates, no JS errors.
3. **Equivalence gate.** For every route, the new `dist/index.html` must produce the same text and the same question bank as the baseline, with visual diffs under a set threshold. This is how we *prove* the split changed nothing.
4. **The verification loop Claude follows** (stated in CLAUDE.md):
   1. make the change;
   2. `npm run check`;
   3. run the relevant tests;
   4. before saying it's done, run `npm run verify`;
   5. for UI work, take a screenshot through Playwright MCP and look at it.

   A task isn't "done" until verify passes, and Claude reports any failures together with the output.
5. **Independent review.** Before merging, the `code-reviewer` subagent (fresh context, read-only) reviews the diff, and so does `/code-review`. Questions and content also go to `content-reviewer`.

---

## 5. Context engineering

**Principle:** CLAUDE.md is always loaded and holds only what changes Claude's behavior on every task. Everything else lives in a doc it points to, a rule scoped to certain paths, or a skill that loads on demand.

**CLAUDE.md** (≤100 lines, most important rules in the top third):
- What the project is, who it's for, the exam date, and "talk to Gerardo in English, content in Spanish".
- Commands (the `npm run` list) and what "done" means (`verify` passes).
- A map: which folder holds what, with pointers to `docs/ARCHITECTURE.md`, `docs/CONTENT-GUIDE.md` and `docs/EXAM-SPEC.md`.
- Hard boundaries, each with a reason:
  - never edit `dist/` or `legacy/`;
  - never renumber or reuse question IDs (progress depends on them);
  - real exams win over the manual;
  - never copy the manual verbatim (rights);
  - don't add dependencies without asking.
- A glossary of domain terms, kept to key items only: PER, GVA, RIPA, IALA A, *convocatoria*, *apto*.
- Current phase, plus a link to ROADMAP.md.

**`.claude/rules/`** (these load only when Claude touches matching files; the frontmatter field is `paths`, not `globs`):

| File | `paths` | Contents |
|---|---|---|
| `content.md` | `src/chapters/**`, `content/**` | Spanish style; `<span class="es">` / `<span class="formula">`; paraphrase; cite the law; flag outdated rules |
| `questions.md` | `content/questions/**` | Schema reminders, how IDs are chosen, how to write good distractors and explanations, run the validator |
| `ui.md` | `src/ui/**`, `src/styles/**`, `src/chapters/**/widgets.ts` | Mobile first (390 px, no overflow), touch targets ≥44 px, dark mode, a11y (labels, contrast, focus) |
| `storage.md` | `src/core/store*` | `per2:` compatibility, migrations are append-only, wrap storage access in try/catch |
| `tests.md` | `tests/**` | Real assertions only, no `waitForTimeout` where a locator wait works, fixtures |

**Memory layers:**
- **Project:** CLAUDE.md and rules (committed).
- **Personal:** `CLAUDE.local.md` (gitignored), for things like personal study notes.
- **Auto-memory:** `~/.claude/projects/…/memory/` holds preferences learned across sessions.
- **Durable task state:** `docs/ROADMAP.md`, ADRs and git history, *not* chat history.

**Session habits:**
- One task per session.
- Use plan mode for anything touching more than 3 files.
- `/clear` between foundation steps.
- `/compact` at about 70% context.
- `/context` to check what got loaded.
- `/rename` sessions, e.g. `f3-split-questions`.
- A statusline that shows context % and the branch.

**Keeping it healthy:**
- 3–5 "canary" prompts, e.g. "add a RIPA question about lights for a vessel being towed". Run them after big CLAUDE.md edits and check that Claude follows the rules.
- Review CLAUDE.md at the end of each phase, removing stale lines and promoting repeated corrections into rules.

---

## 6. Harness: settings, permissions, hooks

**`.claude/settings.json`** (committed):

```jsonc
{
  "permissions": {
    "allow": [
      "Bash(npm run *)", "Bash(npx vitest *)", "Bash(npx playwright test *)",
      "Bash(git status)", "Bash(git diff *)", "Bash(git log *)", "Bash(git add *)",
      "Bash(git commit *)", "Bash(git switch *)", "Bash(git worktree *)",
      "Bash(gh pr view *)", "Bash(gh pr checks *)", "Bash(gh run view *)"
    ],
    "ask":  ["Bash(git push *)", "Bash(gh pr create *)", "Bash(gh pr merge *)", "Bash(npm install *)"],
    "deny": ["Bash(git push --force*)", "Bash(rm -rf *)", "Bash(sudo *)",
             "Read(./.env*)", "Edit(./legacy/**)", "Edit(./dist/**)"]
  },
  "hooks": { /* see below */ },
  "statusLine": { "type": "command", "command": ".claude/hooks/statusline.sh" }
}
```

**Hooks.** They stay silent when things pass, say exactly what failed when they don't, and the fast ones run first.

| Event | Matcher | Script | Behavior |
|---|---|---|---|
| `PreToolUse` | `Edit\|Write` | `guard-paths.sh` | Exit 2 (block) for `dist/`, `legacy/`, `content/questions/**` edits that change an existing `id`, and lockfiles |
| `PreToolUse` | `Bash` | `guard-bash.sh` | Blocks destructive commands and pushes to `main` |
| `PostToolUse` | `Edit\|Write` | `post-edit.sh` | Runs Biome on the changed file. If a question JSON changed, runs `validate:content --file`. If a `.ts` changed, runs a typecheck (incremental). Exit 2 with the errors so Claude fixes them straight away |
| `Stop` | — | `stop-gate.sh` | If the tree has uncommitted source changes, runs `npm run check` and `vitest --changed`. On failure it exits 2 once (it respects `stop_hook_active` so it can't loop) |
| `SessionStart` | — | `session-context.sh` | Prints the branch, a dirty-file count, the current ROADMAP step and the days left to the exam (about 3 lines) |
| `PreCompact` | — | `precompact-note.sh` | Appends the current task state to `.claude/session-notes.md` (gitignored) so the summary after compaction has it |

Git `pre-commit` (via `simple-git-hooks`) runs `npm run check` as well, so work done outside Claude gets checked the same way.

---

## 7. Skills (slash commands)

All of these live in `.claude/skills/<name>/SKILL.md`. Skills with side effects set `disable-model-invocation: true`, so Claude never runs them on its own initiative.

| Skill | Effort | What it does |
|---|---|---|
| `/verify` | low | Runs `npm run verify`, summarizes failures and screenshots key routes |
| `/add-questions <topic>` | high | Drafts questions → checks for near-duplicates → validates against the schema → sends them to `content-reviewer` → writes the JSON. Includes a checklist for good distractors |
| `/content-audit <topic\|tema>` | high | Checks a topic's content and questions against the current law and the GVA exams, then reports items marked `needs-review` / `outdated` |
| `/new-widget` | medium | Scaffolds an interactive widget (TS module, styles, e2e test at both widths) |
| `/adr <title>` | low | Writes `docs/decisions/NNNN-*.md` from the template |
| `/ship` | low | verify → commit (conventional) → push branch → `gh pr create` with a template. Manual only |
| `/catchup` | low | After `/clear`: reads ROADMAP, `git log`, the open PR and session notes, then gives a summary |

Built-in commands to use:
- `/code-review` before merges;
- `/simplify` after big refactors;
- `/security-review` before phase 4;
- `/fewer-permission-prompts` after a week of use.

---

## 8. Subagents (`.claude/agents/`)

Each agent is scoped by context boundary and kept read-only unless it has to write.

| Agent | Model | Tools | Purpose |
|---|---|---|---|
| `content-reviewer` | opus | Read, Grep, Glob, WebSearch | Nautical subject expert. Checks accuracy against current rules (RD 875/2014, RD 339/2021, RD 128/2022, MARPOL, RIPA/COLREG, IALA A), checks real-exam alignment, makes sure text is paraphrased rather than copied, and checks Spanish quality. Returns findings, never edits |
| `question-auditor` | sonnet | Read, Grep, Glob, Bash(`npm run validate:content*`) | Finds ambiguous stems, more than one defensible answer, weak distractors, explanations that don't justify the answer, and wrong topic tags |
| `code-reviewer` | sonnet | Read, Grep, Glob, Bash(`git diff*`) | Reviews the diff with a fresh context: correctness, `per2:` compatibility, mobile overflow risks |
| `ux-reviewer` | sonnet | Read + Playwright MCP | Drives the built app at 390/1280 px, takes screenshots, and reports layout, a11y and interaction problems |
| `test-writer` | sonnet | Read, Write, Edit, Bash(`npx vitest*`, `npx playwright*`) | Writes failing tests first, for TDD on the scheduler and scoring (phase 2) |

For long content passes, run them in the background with `isolation: worktree` so they don't block main work.

---

## 9. MCP servers

**Default to tools Claude already knows** (git, gh, rg, jq, npm). Add MCP only where it adds a capability the CLI doesn't have.

| Server | Scope | Why |
|---|---|---|
| **Playwright MCP** (`@playwright/mcp`, version pinned) | project `.mcp.json` | Lets Claude *see* the app: screenshots at 390/1280, clicking through quizzes, checking widgets. Used by `ux-reviewer` and `/verify` |
| **Context7** (`@upstash/context7-mcp`, pinned) | user | Current docs for Vite, Playwright, Capacitor and Zod, so Claude doesn't rely on stale API knowledge |
| GitHub | — (use the `gh` CLI) | The CLI is already authenticated and well known, and it avoids another MCP's tool definitions taking up context |
| Claude in Chrome | already installed | Manual exploratory checks in your real browser. Not used for automated verification |

```json
{ "mcpServers": {
    "playwright": { "command": "npx", "args": ["-y", "@playwright/mcp@<pinned>", "--headless"] }
} }
```

MCP hygiene:
- Pin versions.
- Check `/mcp` after setup.
- Turn off servers you don't use in a session.
- Review them each phase.

---

## 10. Git workflow and CI

- **Branches:** `main` is protected. Each foundation step gets its own branch, e.g. `f3-split-questions`, and its own PR. Commits use conventional messages (`feat:`, `refactor:`, `test:`, `docs:`, `content:`).
- **CI** (`.github/workflows/ci.yml`): runs on every PR. It does `npm ci` → `check` → `test` → `build` → `e2e` (both widths) → uploads the Playwright report and the built `index.html` as artifacts.
  - Branch protection requires CI to be green.
  - An optional nightly job runs `content-audit` through a scheduled cloud routine (phase 2+).
- **Worktrees:** use `claude -w` or agent `isolation: worktree` once the code is split into modules and tasks touch separate files, e.g. one content worktree and one feature worktree. Don't run them in parallel during the split itself (F3–F5), because those steps all touch the same files.
- **Undoing:**
  - `/rewind` for uncommitted changes;
  - `git revert` for anything already pushed;
  - never force-push to `main`.

---

## 11. Security, privacy and rights

- No secrets exist today. Keep it that way: `.env*` is denied and gitignored, and a secrets check runs in pre-commit.
- **Privacy:** progress stays on the device (`localStorage`). No analytics or network calls without explicit consent. Write this down now in ARCHITECTURE.md, since it simplifies App Store privacy labels and GDPR later.
- **Rights** block shipping (phase 4) but not the foundations. No per-section source tagging (decision 4).
- Before installing a third-party skill or MCP, read its source and pin its version.

---

## 12. What we're deliberately *not* adopting (yet)

| From the guide | Why not now |
|---|---|
| Serena / grepai / semantic-index MCPs | Once split into modules, the codebase is small enough that `rg` and the ARCHITECTURE map are enough. Look again if `src/` grows past about 15k lines |
| claude-mem / extra memory servers | Built-in auto-memory, docs and git already cover this. Another memory store would drift out of date |
| Sequential-thinking MCP | Plan mode and extended thinking are enough |
| Many parallel instances / `/batch` | You're a solo developer, and the split touches shared files. Parallel sessions come in phase 2 at most, with 2–3 worktrees |
| Hook profiles (minimal/standard/strict) | One profile is enough to start. Add a `PER_HOOKS=minimal` env switch if hooks slow down content sessions |
| `bypassPermissions` | Never. Use the allowlist and auto mode instead |

---

## 13. Execution plan (each step = one PR, `npm run verify` green)

| Step | Deliverable | Done when |
|---|---|---|
| **F0** | Fix CLAUDE.md (`per2:`), add `docs/ROADMAP.md`, this doc approved | Merged |
| **F1** | Tooling skeleton: `package.json`, Vite, TS, Biome, Vitest, Playwright Test, CI workflow, `.gitignore`, minimal `guard-paths` + `post-edit` hooks, branch protection on `main` | CI runs green on an empty suite; a direct push to `main` is rejected |
| **F2** | Baseline snapshot of the current app + port the 12 Python tests to Playwright assertions (run against `legacy/index.html`) | Tests pass on legacy and **fail** when a keyword is deliberately broken (proves the tests can fail) |
| **F3** | Extract the question bank → `content/questions/**` JSON with stable IDs + schema + validator | Extracted bank == baseline bank; validator clean; counts match the 1,105 + 956 recorded in CLAUDE.md |
| **F4** | Extract CSS + core (store, router, helpers, exam spec from `T[]`) into `src/` | Equivalence gate passes |
| **F5** | Extract chapters 1–11 (one commit per chapter) | Equivalence gate passes after each chapter |
| **F6** | `per2:` progress migration to stable IDs + e2e test with seeded old progress | Old progress shows the same in `#progreso` |
| **F7** | `.claude/`: settings, hooks, rules, skills, agents, `.mcp.json`, statusline | Canary prompts behave correctly; hooks block a deliberate violation |
| **F8** | Docs: ARCHITECTURE, CONTENT-GUIDE, EXAM-SPEC, ADRs 0001–0003; slim CLAUDE.md; move the old file and tests to `legacy/` | `/catchup` from a fresh session gives a correct status |

F7 could move earlier, right after F1. That way the hooks protect the risky split steps, though they would need adjusting as the paths change. **Recommendation:** put in a minimal `guard-paths` and `post-edit` hook right after F1, and leave the full `.claude/` setup for F7.

---

## 14. Decisions (20 Nov 2026)

1. **TypeScript:** strict TS for `core/`, `quiz/` and `exam/`. Chapter widgets start as `// @ts-check` JS and are migrated when touched. *(Gerardo left this to Claude.)*
2. **Branch protection:** yes. `main` requires a PR and green CI, and is turned on in F1 once CI exists. *(Gerardo left this to Claude.)*
3. **Exam spec:** checked against the GVA page on 20 Nov 2026 → `docs/EXAM-SPEC.md`. `T[]`, the 90-min timer, the 32-correct pass mark and the three minimums all match. The only gap is the PNB fallback result (phase 2).
4. **Content `source` tags:** no. Leave the `source` field off chapter sections. Question `source` stays, because it identifies GVA sittings and isn't about rights. Remove rights-inventory tagging from §11.
