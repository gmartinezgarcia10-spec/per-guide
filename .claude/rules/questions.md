---
paths:
  - "content/questions/**"
---
# Question bank rules

- Schema: `src/content/schema.ts`. Each question has 4 options and exactly one correct answer (`answer` 0–3).
- **IDs are permanent.** New guide questions take the next free `g-NNNN` (after the highest in any guide file) and go at the end of their topic file. Never renumber, reuse or delete-and-recreate an id: saved progress is keyed by id. `npm run check:ids` fails if an id that exists on `main` disappears.
- Real GVA questions (`gva/*.json`) are transcriptions. Don't reword the stem or options, only the `explanation`. Fixing a transcription typo is fine; say so in the PR.
- Good questions:
  - test one idea that the exam actually asks;
  - use distractors that are plausible mistakes (sign errors, adjacent rules, swapped sides), never jokes;
  - avoid "all/none of the above";
  - have an explanation that says why the answer is right, and why the tempting wrong one is wrong.
- Fill an empty `explanation` whenever you touch that question (39 guide questions have none).
- Before adding questions, search for near-duplicates (`rg -i "<key phrase>" content/questions`). The validator also warns on repeated text.
- After editing, `npm run validate:content` must show 0 errors (the post-edit hook runs it).
