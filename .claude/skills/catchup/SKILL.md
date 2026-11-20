---
name: catchup
description: Restore working context after /clear or in a new session - roadmap step, branch, open PR, recent commits, uncommitted changes - and say what's next.
---
# Catch up

Read, don't change anything:

1. Read `docs/ROADMAP.md` and find the step marked **in progress**, or the next one marked todo.
2. Run `git branch --show-current`, `git status --short` and `git log --oneline -8`.
3. Run `gh pr list --state open --json number,title,headRefName,statusCheckRollup`. Note the PR for the current branch and its CI state.
4. If the step has a section in `docs/FOUNDATIONS.md` or a decision record in `docs/decisions/`, skim it.
5. Report in up to 8 lines:
   - where we are;
   - what's done on this branch;
   - what's uncommitted;
   - CI status;
   - the next concrete action.
