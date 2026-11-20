# 0003: Saved progress keyed by question id

Date: 20 Nov 2026 · Status: accepted (F6)

## Context
Progress (`per2:state`) keyed each question by `topic:<first 70 characters of the text>`, or `r:<index>` for real exam questions. Editing the start of a question silently detached its history. Spaced repetition and readiness scoring (phase 2) need a stable handle. Old data can also arrive later, from claude.ai cloud sync (another device running the old version) or an imported backup file.

## Decision
- From state v3, progress is keyed by the permanent ids from decision 0002 (`g-NNNN`, `gva-NNNN`).
- `src/core/progress.ts` has a pure, idempotent `migrateProgress` that rewrites old keys in `stats`, `log` and `cur.ids`. It runs on every load (written back once) and inside `merge()`, so old data from any source is converted. Keys it can't map are kept, so counts don't change. If a question has both an old and a new key, the entry with more attempts wins.
- The validator keeps old-style keys unique, so pre-v3 progress can still be migrated.

## Consequences
- Question text can be edited freely.
- A shape change from now on needs a version bump, a migration step, a unit test, and an e2e test that seeds the previous version (`.claude/rules/storage.md`).
- Progress saved before v3 is matched against current question text. If a question is edited before that progress is opened, its history is kept but no longer attached to the question.
