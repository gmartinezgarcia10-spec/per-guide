// npm run check:ids: every question id on the base branch must still exist (ids are permanent;
// saved progress is keyed by them). Base: $BASE_REF or origin/main. Skips with a note if the ref is missing.
import { execFileSync } from "node:child_process";
import { loadBank } from "../src/content/load.ts";

const base = process.env.BASE_REF ?? "origin/main";
const git = (...args: string[]) =>
  execFileSync("git", args, { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });

let files: string[];
try {
  files = git("ls-tree", "-r", "--name-only", base, "content/questions")
    .split("\n")
    .filter((f) => f.endsWith(".json"));
} catch {
  console.log(`check:ids skipped: ${base} not available (git fetch origin main)`);
  process.exit(0);
}

const before = new Set<string>();
for (const f of files) {
  for (const q of JSON.parse(git("show", `${base}:${f}`)) as { id: string }[]) before.add(q.id);
}
const now = new Set(loadBank().questions.map((q) => q.id));
const missing = [...before].filter((id) => !now.has(id));

if (missing.length) {
  console.log(
    `✗ ${missing.length} question id(s) on ${base} no longer exist: ${missing.slice(0, 20).join(", ")}`,
  );
  console.log(
    "  Ids are permanent (progress is keyed by them). Restore them; to retire a question, ask first.",
  );
  process.exit(1);
}
console.log(`ids: all ${before.size} ids on ${base} still exist · ${now.size - before.size} new`);
