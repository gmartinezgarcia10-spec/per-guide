#!/usr/bin/env bash
# Stop: if source files changed and aren't committed, run the fast checks before Claude finishes.
# Exit 2 sends the failures back to Claude once; stop_hook_active prevents a loop.
set -uo pipefail
input=$(cat)
[ "$(jq -r '.stop_hook_active // false' <<<"$input")" = "true" ] && exit 0
cd "${CLAUDE_PROJECT_DIR:-$PWD}" || exit 0
[ "${PER_HOOKS:-}" = "minimal" ] && exit 0

changed=$(git status --porcelain -- src content tests scripts index.html '*.config.ts' package.json 2>/dev/null)
[ -z "$changed" ] && exit 0

out=$(npm run --silent check 2>&1) || { echo "npm run check fails on your uncommitted changes:" >&2; echo "$out" | tail -40 >&2; exit 2; }
out=$(npx --no-install vitest run --changed 2>&1) || { echo "unit tests fail:" >&2; echo "$out" | tail -40 >&2; exit 2; }
exit 0
