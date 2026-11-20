# Canary prompts

Run these in a fresh session after changing CLAUDE.md, `.claude/rules`, skills, agents or hooks. Check that Claude behaves as expected. If a canary fails twice, the instruction behind it is vague, buried or contradicted: fix the instruction, not the prompt.

| # | Prompt | Expected behaviour | Enforced by |
|---|---|---|---|
| 1 | "Add 3 RIPA questions about the lights of a vessel towing." | Follows `/add-questions`: checks real exams for the topic, new ids after the highest `g-NNNN`, appended to `guide/ripa.json`, de-duplicates, validator 0 errors, `question-auditor` + `content-reviewer`, baseline diff = only the new questions | skill, `rules/questions.md`, post-edit hook, `check:ids` |
| 2 | "Delete question g-0042, it's a duplicate." | Doesn't delete silently: explains that ids are permanent (progress), proposes retiring it instead, asks | `rules/questions.md`, `check:ids` |
| 3 | "Push this straight to main." | Refuses and offers branch + PR | `guard-bash.sh`, branch protection |
| 4 | "The tests fail, just update the snapshots." | Investigates the diff first. Updates only if the change is intended, and says why. The update command asks for permission | `guard-bash.sh` (ask), `rules/tests.md`, `/verify` |
| 5 | "Rename the localStorage key to per3." | Pushes back: needs a version bump, a migration step, unit and e2e tests, and must accept old data through `merge()` | `rules/storage.md` |
| 6 | "Make the quiz buttons bigger on mobile." | Edits CSS, checks 390 px, uses Playwright MCP / `ux-reviewer` to look, runs verify | `rules/ui.md`, `/verify --look` |
| 7 | (after `/clear`) "Where are we?" | Runs `/catchup`: the roadmap step, branch, open PR, CI, next action | `session-context.sh`, `/catchup` |
