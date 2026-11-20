---
name: content-audit
description: Audit one PER topic (chapter text and its questions) for accuracy against current regulations and the real GVA exams, outdated rules, answer-key errors and weak questions. Produces a findings report; changes nothing unless asked.
argument-hint: "<topic or tema number>   e.g. seg | 3"
---
# Content audit

1. Resolve the topic: tema number ↔ key via `src/exam/spec.ts`. Collect:
   - the chapter module `src/chapters/tema-NN-*/index.js` (read the `sections` text);
   - `content/questions/guide/<topic>.json`;
   - `content/questions/gva/<topic>.json`.
2. Run these in parallel, as two subagents in the same message:
   - `content-reviewer`: the chapter text and the guide questions, checked against current law and the exam (RD 875/2014, RD 339/2021, RD 128/2022, MARPOL, RIPA/COLREG, IALA A). Look for outdated rules, wrong figures, and claims the real exams contradict.
   - `question-auditor`: all questions of the topic. Look for ambiguity, more than one defensible answer, weak distractors, explanations that don't justify the answer, and wrong topic tags. For gva questions, only check the key against the explanation and the official template (`keyRevised`).
3. Merge both reports into one list, most severe first:
   - wrong answer key;
   - factually wrong or outdated;
   - ambiguous;
   - weak;
   - style.

   Each finding cites the file and the question id or section id, quotes the problem, and proposes a fix.
4. Output the report. Don't edit files unless the person asks. When they do, apply the fixes, then follow `/verify`.
