# 0002: Question bank as JSON with permanent IDs

Date: 20 Nov 2026 · Status: accepted (F3)

## Context
The 2,061 questions lived as positional arrays inside `index.html` (18 `PER.Q.push` blocks plus a 576 KB `const R=[…]` line). Guide questions had no identity. The app keys progress by `topic:<first 70 chars>`, so editing the start of a question silently loses its progress, and spaced repetition (phase 2) needs a permanent handle.

## Decision
- The source of truth is `content/questions/{guide,gva}/<topic>.json`, validated by Zod (`src/content/schema.ts`).
- IDs:
  - guide questions are `g-0001…g-1105`, in their original bank order;
  - real questions are `gva-NNNN`, where NNNN is the original index (the app's `r:<index>` progress key);
  - IDs are never renumbered or reused, and new guide questions take the next number.
- Files are split by topic so diffs and reviews stay small. Bank order is rebuilt from the IDs (guide by number, then real by index), so files can be reorganised without changing what the app sees.
- Images from real papers are stored as files (`gva/img/`) and inlined as data URIs at build.
- A Vite plugin converts the files back to the legacy arrays and injects them as `window.PER_BANK`, so the app code didn't change. The build fails on validation errors.

## Consequences
- `index.html` can't be opened directly any more: use `npm run dev` or `dist/index.html`.
- The unit and baseline tests prove the converted bank is byte-identical to the pre-split one.
- The progress store still uses the old keys. F6 migrates it to IDs, and until then the validator rejects two questions that share a progress key.
- The section comments that grouped the old push blocks (e.g. "manual propio, tema 3") weren't carried over; they remain in git history.
