---
paths:
  - "tests/**"
---
# Test rules

- Tests must be able to fail. When you add a check, break the code on purpose once to see it fail.
- E2E tests use the fixtures in `tests/e2e/fixtures.ts`:
  - `open(route)`;
  - the clock is fixed at 20 Nov 2026;
  - `Math.random` is seeded;
  - any JS error fails the test.
- Wait on locators (`expect(...).toBeVisible()`), never `waitForTimeout`.
- Use visible text (`innerText`), not `textContent`: the latter includes inline script source.
- `tests/baseline/` is the characterization snapshot. Don't update it to make a test pass. Update it only when the content change is intended, and explain it in the PR.
- Unit tests live in `tests/unit/*.test.ts` (Vitest, Node). Keep logic pure so it can be tested there.
