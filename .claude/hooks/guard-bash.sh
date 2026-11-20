#!/usr/bin/env bash
# PreToolUse (Bash): keep work on branches and baseline updates deliberate.
# Exit 2 = block (stderr goes to Claude). JSON on stdout with permissionDecision "ask" = ask the person.
set -euo pipefail
cmd=$(jq -r '.tool_input.command // empty')
[ -z "$cmd" ] && exit 0
cd "${CLAUDE_PROJECT_DIR:-$PWD}" 2>/dev/null || exit 0
branch=$(git branch --show-current 2>/dev/null || echo "")

# Look only at the `git push …` part of each command, up to the next ; & | or newline
# (so `gh pr create --base main` or "main" in a message doesn't count).
while IFS= read -r push; do
  [ -z "$push" ] && continue
  if [[ "$push" =~ (^|[[:space:]:])main([[:space:]]|$) ]] || [ "$branch" = "main" ]; then
    echo "Blocked: main is protected. Push a feature branch and open a PR (gh pr create)." >&2; exit 2
  fi
done < <(grep -oE 'git[[:space:]]+push[^;&|]*' <<<"$cmd" || true)
if [[ "$cmd" =~ git[[:space:]]+commit ]] && [ "$branch" = "main" ]; then
  echo "Blocked: you're on main. Create a branch first (git switch -c <step-or-feature>)." >&2; exit 2
fi
if [[ "$cmd" =~ --update-snapshots ]]; then
  jq -n '{hookSpecificOutput:{hookEventName:"PreToolUse",permissionDecision:"ask",
    permissionDecisionReason:"Updating the baseline snapshot changes what counts as correct. Only for an intended content change, explained in the PR."}}'
  exit 0
fi
exit 0
