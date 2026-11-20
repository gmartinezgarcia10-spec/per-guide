// One-time F3 migration: tests/baseline/bank.jsonl (the pre-split PER.Q) → content/questions/**.
// Kept for the record. Refuses to run once content/questions exists: the JSON files are now the source.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { CONTENT_DIR } from "../src/content/load.ts";
import { guideId, gvaId, type LegacyQuestion, type Question } from "../src/content/schema.ts";
import { TOPICS } from "../src/exam/spec.ts";

if (existsSync(CONTENT_DIR)) {
  console.error(`${CONTENT_DIR} already exists; extraction is a one-time step.`);
  process.exit(1);
}

const lines = readFileSync("tests/baseline/bank.jsonl", "utf8").trim().split("\n");
const legacy = lines.map((l) => JSON.parse(l) as LegacyQuestion);
const out: Record<string, Question[]> = {};
mkdirSync(join(CONTENT_DIR, "gva", "img"), { recursive: true });
mkdirSync(join(CONTENT_DIR, "guide"), { recursive: true });

let g = 0;
for (const [topic, q, options, answer, explanation, meta] of legacy) {
  let item: Question;
  if (!meta) {
    item = { id: guideId(++g), topic: topic as Question["topic"], q, options, answer, explanation };
  } else {
    const gva: NonNullable<Question["gva"]> = { index: meta.i, sittings: meta.p };
    if (meta.d) gva.keyRevised = true;
    if (meta.img) {
      const m = /^data:image\/(jpeg|png);base64,(.+)$/.exec(meta.img);
      if (!m?.[2]) throw new Error(`question ${meta.i}: unexpected image format`);
      const name = `img/${gvaId(meta.i)}.${m[1] === "png" ? "png" : "jpg"}`;
      writeFileSync(join(CONTENT_DIR, "gva", name), Buffer.from(m[2], "base64"));
      gva.image = name;
    }
    item = { id: gvaId(meta.i), topic: topic as Question["topic"], q, options, answer, explanation, gva };
  }
  const file = `${meta ? "gva" : "guide"}/${topic}.json`;
  out[file] ??= [];
  out[file].push(item);
}

for (const t of TOPICS) {
  for (const kind of ["guide", "gva"]) {
    const file = `${kind}/${t.id}.json`;
    writeFileSync(join(CONTENT_DIR, file), `${JSON.stringify(out[file] ?? [], null, 2)}\n`);
  }
}
console.log(`extracted ${g} guide + ${legacy.length - g} gva questions`);
