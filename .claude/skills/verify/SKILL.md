---
name: verify
description: Run the full PER verification (typecheck, lint, content validation, id check, unit tests, build, e2e at 390/1280 px, baseline snapshot) and report what failed. Use before saying any change is done, and before /ship.
argument-hint: "[--look]  (also screenshot key routes)"
---
# Verify

1. Run `npm run verify` (needs a build; verify does it). Capture the output.
2. If it passes, report the totals in one line: unit tests, e2e tests, content summary (questions / errors / warnings).
3. If it fails, for each failure give:
   - the test or check name;
   - the first relevant error lines (not the whole log);
   - the likely cause, and whether it's in code, content or the test.

   Do not "fix" a failure by weakening a test or updating `tests/baseline/`. A baseline diff that is the intended content change is fine to update, but say so explicitly.
4. If `$ARGUMENTS` contains `--look`, or the change touched UI (`index.html`, `src/styles`, chapter widgets), also open the built app with the Playwright MCP server:
   - load the routes the change affects, at 390×844 and 1280×900;
   - take screenshots and look at them;
   - report anything visually wrong (overflow, overlap, unreadable contrast, broken SVG).

Never report success without having seen the passing output in this session.
