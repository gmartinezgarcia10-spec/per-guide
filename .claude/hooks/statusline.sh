#!/usr/bin/env bash
# Status line: branch · context used · days to the exam.
input=$(cat)
dir=$(jq -r '.workspace.current_dir // .cwd // empty' <<<"$input")
cd "${dir:-$PWD}" 2>/dev/null || true
branch=$(git branch --show-current 2>/dev/null)
ctx=$(jq -r '.context_window.used_percentage // empty' <<<"$input" 2>/dev/null)
exam=$(date -j -f "%Y-%m-%d %H:%M:%S" "2026-12-12 00:00:00" +%s 2>/dev/null || date -d "2026-12-12 00:00:00" +%s)
days=$(( (exam - $(date +%s) + 86399) / 86400 ))  # whole days left, same as the app's countdown
line="⎇ ${branch:-—}"
[ -n "$ctx" ] && line="$line · ctx ${ctx%.*}%"
echo "$line · examen en ${days} d"
