# 0001: Build and tooling

Date: 20 Nov 2026 · Status: accepted (F1)

## Context
The app was one hand-edited 1.2 MB `index.html`, with no build, no type checking, and Python test scripts that printed results but could never fail. It must stay a single file that works offline and can later be wrapped for iOS (Capacitor). Most changes will be made by Claude Code, which needs fast, reliable feedback after each edit.

## Decision
- **Vite + `vite-plugin-singlefile`:** bundles everything into one `dist/index.html`, has a dev server with reload, and is the standard path to a PWA and Capacitor.
- **TypeScript strict** for new and core code. Legacy chapter and app code stays JS (`@ts-nocheck`) until it is rewritten.
- **Biome** for lint and format: one fast binary, quick enough to run after every edit from a hook. Formatting is off for `app.css` and Markdown, so neither the CSS output nor the docs change by accident.
- **Vitest** for unit tests, **Playwright Test** for e2e at 390 and 1280 px, and **Zod** for the content schema.
- **npm scripts** are the single interface for people, hooks, skills and CI. `npm run verify` is the definition of done.
- **GitHub Actions** CI on every PR. `main` is protected: a PR and a green `verify` are required, admins included.

## Consequences
- `index.html` can't be opened directly. Use `npm run dev` or `dist/index.html`.
- Node ≥ 22 is required (CI uses 24; scripts run `.ts` directly through Node's type stripping).
- Tool versions are pinned exactly in `package.json`.
