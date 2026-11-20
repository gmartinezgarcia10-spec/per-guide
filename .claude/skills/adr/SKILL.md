---
name: adr
description: Record an architecture or product decision as docs/decisions/NNNN-<slug>.md. Use when a choice with lasting consequences is made (tooling, data format, storage, platform, content policy).
argument-hint: "<decision title>"
---
# Decision record

1. Find the next number: the highest `docs/decisions/NNNN-*.md` + 1, 4 digits.
2. Write `docs/decisions/NNNN-<kebab-slug>.md`, at most about 40 lines:

   ```
   # NNNN: <Title>

   Date: <today> · Status: accepted | proposed

   ## Context
   <the problem and constraints, with facts and numbers>

   ## Decision
   <what we do, concretely>

   ## Consequences
   <what gets easier or harder, what to watch, follow-ups>
   ```
3. If it changes how Claude should work, add a one-line pointer in CLAUDE.md or the relevant `.claude/rules/*.md`.
