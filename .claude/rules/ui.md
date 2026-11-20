---
paths:
  - "index.html"
  - "src/styles/**"
  - "src/legacy/app.js"
  - "src/chapters/**"
---
# UI rules

- Mobile first. Everything must work at 390 px wide with no horizontal scroll (e2e tests check 390 and 1280).
- Touch targets ≥ 44 px. Interactive SVG parts need `role="button"`, `tabindex="0"` and an `aria-label`.
- Use the CSS custom properties in `:root` (`--ink`, `--sea`, `--accent`…) and don't hard-code colours. Magenta (`--accent`) marks exam traps.
- `src/styles/app.css` is kept byte-for-byte (Biome formatter off). Change it on purpose and look at the result: run `npm run dev`, or use the `ux-reviewer` agent with Playwright MCP.
- New interactive widgets need an e2e test (both widths) that exercises them.
