#!/usr/bin/env bash
# PreToolUse (Edit|Write|MultiEdit): block edits to generated or frozen paths.
# Exit 2 = block; stderr is shown to Claude.
set -euo pipefail
file=$(jq -r '.tool_input.file_path // empty')
[ -z "$file" ] && exit 0
rel=${file#"${CLAUDE_PROJECT_DIR:-$PWD}"/}

case "$rel" in
  dist/*)           echo "Blocked: dist/ is build output. Edit the sources and run npm run build." >&2; exit 2 ;;
  legacy/*)         echo "Blocked: legacy/ holds historical scripts (manual merges); read them, don't edit or re-run them." >&2; exit 2 ;;
  node_modules/*)   echo "Blocked: node_modules/ is managed by npm." >&2; exit 2 ;;
  package-lock.json) echo "Blocked: package-lock.json is managed by npm; use npm install." >&2; exit 2 ;;
esac
exit 0
