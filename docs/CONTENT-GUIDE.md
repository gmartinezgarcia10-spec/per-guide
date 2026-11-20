# Content guide

How to write and change chapter text and questions. The short, always-loaded versions for Claude are `.claude/rules/content.md` and `.claude/rules/questions.md`. This file is the full reference.

## Principles

1. **Pass the exam, then know how to sail.** Every section answers two questions: what the GVA exam asks, and what you need on board.
2. **The real exams win.** `content/questions/gva/` holds 956 real GVA questions (2019 to October 2026). When the manual, a textbook or memory disagrees with what the exams accept, follow the exams and add a note on the outdated rule.
3. **Paraphrase.** The printed manual is a commercial book. Explain the ideas in our own words, with our own examples and drawings, and never copy sentences. This matters for selling the app: see the rights note in CLAUDE.md.
4. **Exact figures.** Distances, times, angles, signals and equipment counts are where marks are lost. Check each one against the regulation or a real exam question.

## Sources, most authoritative first

| Topic | Primary source |
|---|---|
| Exam format and syllabus | RD 875/2014 (annex II), GVA exam page (see `docs/EXAM-SPEC.md`) |
| Safety equipment by zone | RD 339/2021 |
| Titles, licences, later changes | RD 875/2014, RD 128/2022 |
| Collisions, lights and sound signals | RIPA / COLREG 1972 (with amendments) |
| Buoyage | IALA region A |
| Pollution | MARPOL (amended 2013), Ley de Puertos y Marina Mercante |
| Weather | AEMET, Puertos del Estado |
| Chart work | the exam chart (carta 25-C, Estrecho de Gibraltar) and real exam exercises |

## Style

- Spanish (Spain), second person singular ("tú"), short sentences. Explain the *why* in one line; it helps the student remember.
- Wrap technical terms in `<span class="es">`, formulas in `<span class="formula">`, and mark exam traps with `<b>` and the magenta accent (`--accent`).
- Write bearings as three digits (`005°`). Signs use a true minus (`−3°`). Write `mn` for nautical miles and `nudos` for knots; give times as `HH:MM`.
- Chapter text lives in `src/chapters/tema-NN-<name>/index.js`, in `CH[n].sections` as `[id, title, html]`. The HTML is a template literal, so `${…}` embeds widget code; escape a literal backtick.

## Questions

Schema: `src/content/schema.ts`. One file per topic: `guide/` holds our own questions and `gva/` holds the real exam questions.

**A good guide question:**
- tests one idea the exam asks, in a stem that stands on its own;
- has 4 options with exactly one correct. The distractors are believable mistakes: the wrong sign, the neighbouring rule, port and starboard swapped, a nearby number;
- avoids "todas/ninguna de las anteriores" and joke options;
- has an explanation that says why the answer is right and why the tempting option is wrong;
- isn't a near-copy of an existing question (search first).

**Adding questions:**
- Use `/add-questions <topic> [n] [focus]`. It does the steps below.
- To do it by hand:
  1. Take the next free `g-NNNN` after the highest guide id.
  2. Append the question at the end of `guide/<topic>.json`.
  3. Run `npm run validate:content` and `npm run check:ids`.
  4. Get a review from `question-auditor`, plus `content-reviewer` for rules and law.
  5. Run `npm run verify`, then update the baseline bank snapshot and say why in the PR.

**Editing questions:**
- Change text, options, answer or explanation freely. Progress follows the id.
- Never change an `id`, reuse one, or delete a question. To retire a question, ask first; a `retired` status is planned.
- Real (`gva/`) questions are transcriptions: only fix obvious transcription typos, and improve `explanation`. If an official key is disputed, keep the official answer, set `keyRevised: true` if the template was revised, and explain it.

**Explanations:** every question has one (since P4). The validator warns if an empty one appears.

## Checking content

- `/content-audit <topic>` runs `content-reviewer` and `question-auditor` in parallel and returns a findings list, most severe first. It changes nothing.
- Every content change shows up in the baseline snapshot (`tests/baseline/`). A diff that is exactly the intended change can be accepted with `npx playwright test --project=baseline --update-snapshots`, which asks first. Explain it in the PR.
