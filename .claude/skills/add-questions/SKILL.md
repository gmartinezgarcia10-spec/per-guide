---
name: add-questions
description: Draft, review and add new guide questions for one PER topic to content/questions/guide/<topic>.json, with ids, duplicate checks, validation and an independent review. Use when asked to add, write or generate questions.
argument-hint: "<topic> [count] [focus]   e.g. ripa 10 luces de remolque"
---
# Add questions

Arguments: topic key (`nom amarre seg leg baliz ripa man emerg meteo teoria carta`), optional count (default 10), optional focus.

1. **Scope.**
   - Read `docs/EXAM-SPEC.md` (how much the topic weighs) and the topic's chapter in `src/chapters/tema-NN-*/`.
   - Look at real exam questions for the topic in `content/questions/gva/<topic>.json` to see what the exam actually asks.
   - Prefer gaps: sub-topics the real exams ask about that have few guide questions.
2. **Draft** in Spanish, following `.claude/rules/questions.md`:
   - one idea per question;
   - 4 options, with distractors that are plausible mistakes;
   - an explanation that says why the answer is right and why the tempting option is wrong.

   Paraphrase; never copy the manual.
3. **De-duplicate.** For each draft, `rg -i` a key phrase across `content/questions/`. Drop or rewrite near-duplicates.
4. **IDs.** Find the highest `g-NNNN` across all `content/questions/guide/*.json` and number the new questions consecutively after it. Append them at the end of `guide/<topic>.json`.
5. **Validate.** Run `npm run validate:content` and `npm run check:ids`: 0 errors.
6. **Review.** Send the new questions (ids plus full text) to the `question-auditor` agent. For anything legal or rule-based (leg, seg, ripa, baliz, emerg), also send them to `content-reviewer`. Apply the fixes they report, or explain why not.
7. **Verify.** Run `npm run verify`. The baseline bank snapshot will now differ by exactly the added questions: confirm the diff contains only those, then update it (`npx playwright test --project=baseline --update-snapshots`) and say so.
8. **Report:** count added, ids, topics covered, reviewer findings and how each was resolved.
