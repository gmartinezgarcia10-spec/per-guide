#!/usr/bin/env bash
# SessionStart (startup, resume, clear, compact): a few lines of orientation added to Claude's context.
cd "${CLAUDE_PROJECT_DIR:-$PWD}" 2>/dev/null || exit 0
branch=$(git branch --show-current 2>/dev/null)
dirty=$(git status --porcelain 2>/dev/null | wc -l | tr -d ' ')
step=$(grep -m1 -E '\*\*in progress\*\*' docs/ROADMAP.md 2>/dev/null | cut -d'|' -f2,3 | sed 's/^ *//;s/ *| */: /;s/ *$//')
exam=$(date -j -f "%Y-%m-%d %H:%M:%S" "2026-12-12 00:00:00" +%s 2>/dev/null || date -d "2026-12-12 00:00:00" +%s)
days=$(( (exam - $(date +%s) + 86399) / 86400 ))  # whole days left, same as the app's countdown
echo "PER guide · branch ${branch:-?} · ${dirty} uncommitted file(s) · exam in ${days} days (Sat 12 Dec 2026)"
[ -n "$step" ] && echo "Roadmap step in progress: ${step}"
echo "Done means npm run verify passes. After /clear, /catchup restores context."
exit 0
