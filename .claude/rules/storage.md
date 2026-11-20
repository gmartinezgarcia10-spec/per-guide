---
paths:
  - "src/core/store.ts"
  - "src/core/progress.ts"
  - "src/legacy/app.js"
---
# Saved progress rules

- Everything lives under localStorage `per2:*`. The main record is `per2:state` (v3, keyed by question id). Never rename keys or change the meaning of a field.
- Changing the state shape requires all of the following:
  - bump `PROGRESS_VERSION`;
  - add a pure, idempotent step to `migrateProgress`;
  - a unit test;
  - an e2e test that seeds the previous version (see `tests/e2e/progress-migration.spec.ts`).
- Old data also arrives through `merge()` (claude.ai cloud sync, file import), so migrations must accept any older version, including mixed old and new keys.
- Storage can be unavailable (private mode, blocked): every access goes through `store`, which never throws.
- No analytics or network calls without explicit consent: progress stays on the device unless the person signs in.
