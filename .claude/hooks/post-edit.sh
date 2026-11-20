#!/usr/bin/env bash
# PostToolUse (Edit|Write|MultiEdit): format and lint the edited file, typecheck TS.
# Silent on success; exit 2 with the errors so Claude fixes them straight away.
set -uo pipefail
file=$(jq -r '.tool_input.file_path // empty')
[ -z "$file" ] || [ ! -f "$file" ] && exit 0
cd "${CLAUDE_PROJECT_DIR:-$PWD}" || exit 0

case "$file" in
  *.ts|*.tsx|*.js|*.mjs|*.json|*.css)
    out=$(npx --no-install biome check --write --no-errors-on-unmatched "$file" 2>&1) \
      || { echo "biome: $file" >&2; echo "$out" | tail -40 >&2; exit 2; }
    ;;
esac

case "$file" in
  *.ts|*.tsx)
    out=$(npx --no-install tsc --noEmit 2>&1) \
      || { echo "typecheck failed:" >&2; echo "$out" | head -30 >&2; exit 2; }
    ;;
esac
exit 0
