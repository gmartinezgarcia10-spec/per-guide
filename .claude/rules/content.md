---
paths:
  - "src/chapters/**"
  - "content/**"
---
# Content rules (chapters and questions)

- Content is Spanish (Spain), aimed at an adult preparing the GVA exam. Write plain, exact prose; explain the *why* in one line.
- Paraphrase. Never copy the printed manual verbatim: it's a commercial book and the app will be sold.
- Wrap Spanish technical terms in `<span class="es">` and formulas in `<span class="formula">`.
- The real GVA exams outrank the manual. When they disagree, follow the exams and flag the outdated rule. Current references:
  - RD 875/2014 (titles and exam)
  - RD 339/2021 (safety equipment)
  - RD 128/2022 (amendments)
  - MARPOL as amended in 2013
  - RIPA/COLREG
  - IALA region A
- Keep exam figures exact: bearings as `005°`, signs with a true minus `−`, distances in `mn`, speeds in `nudos`.
- Chapter modules are legacy code moved verbatim (`@ts-nocheck`, not linted). Keep edits local and in the surrounding style, and run `npm run verify`: the baseline snapshot will show the text you changed. Update it on purpose (`npx playwright test --project=baseline --update-snapshots`) and say why in the PR.
