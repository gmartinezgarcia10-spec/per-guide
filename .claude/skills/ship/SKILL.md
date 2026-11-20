---
name: ship
description: Verify, commit, push the current branch and open a PR with the project template.
disable-model-invocation: true
argument-hint: "[PR title]"
---
# Ship

1. Refuse if the current branch is `main`, and suggest a branch name.
2. Run `npm run verify`. Stop and report if it fails.
3. Run `git status` and `git diff --stat`. Make sure nothing unintended is staged (no `dist/`, `test-results/`, `.claude/settings.local.json`).
4. Commit with a conventional message (`feat|fix|content|refactor|test|docs|build: …`):
   - a body listing what changed and why;
   - end with the Co-Authored-By line from the session's attribution instructions.
5. Run `git push -u origin <branch>`.
6. Run `gh pr create --base main` with title `$ARGUMENTS`, or one derived from the commit. The body has:
   - **What / Why**;
   - **Proof**: verify totals, plus baseline changes and why;
   - **Findings or deviations**;
   - the attribution line from the session instructions.
7. Wait for CI (`gh pr checks --watch`) and report the PR URL and the result. Don't merge unless asked.
