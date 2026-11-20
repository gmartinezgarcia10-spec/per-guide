// Pure validation of the question bank. Used by scripts/validate-content.ts, the build and unit tests.
import { idNumber, progressKey, type Question, QuestionFile } from "./schema.ts";

export interface SourceFile {
  /** Path relative to content/questions, e.g. "guide/nom.json". */
  path: string;
  data: unknown;
}

export interface Issue {
  level: "error" | "warning";
  file: string;
  id?: string;
  message: string;
}

export interface Report {
  questions: Question[];
  issues: Issue[];
  errors: number;
  warnings: number;
}

const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9ñ]+/g, " ")
    .trim();

/** For comparing options: keeps signs and symbols ("+5°" ≠ "−5°"), ignores case, spacing and a final period. */
const normOption = (s: string) => s.toLowerCase().replace(/\s+/g, " ").replace(/\.$/, "").trim();

export function validateBank(
  files: SourceFile[],
  imageExists: (path: string) => boolean = () => true,
): Report {
  const issues: Issue[] = [];
  const questions: Question[] = [];
  const err = (file: string, message: string, id?: string) =>
    issues.push({ level: "error", file, id, message });
  const warn = (file: string, message: string, id?: string) =>
    issues.push({ level: "warning", file, id, message });

  const where = new Map<Question, string>();
  for (const f of files) {
    const m = /^(guide|gva)\/([a-z]+)\.json$/.exec(f.path);
    if (!m) {
      err(f.path, "unexpected file: expected guide/<topic>.json or gva/<topic>.json");
      continue;
    }
    const [, kind, topic] = m;
    const parsed = QuestionFile.safeParse(f.data);
    if (!parsed.success) {
      for (const e of parsed.error.issues) {
        const i = typeof e.path[0] === "number" ? e.path[0] : undefined;
        const id = i !== undefined ? (f.data as { id?: string }[])[i]?.id : undefined;
        err(f.path, `${e.path.slice(1).join(".") || "(question)"}: ${e.message}`, id ?? `#${i}`);
      }
      continue;
    }
    let prev = -1;
    for (const q of parsed.data) {
      where.set(q, f.path);
      questions.push(q);
      if (q.topic !== topic) err(f.path, `topic "${q.topic}" doesn't match the file`, q.id);
      if ((kind === "gva") !== Boolean(q.gva)) err(f.path, `${q.id} is in the wrong folder`, q.id);
      if (idNumber(q.id) <= prev) err(f.path, "ids must be in increasing order within a file", q.id);
      prev = idNumber(q.id);
      if (new Set(q.options.map(normOption)).size !== q.options.length) err(f.path, "repeated options", q.id);
      if (q.gva?.image && !imageExists(q.gva.image)) err(f.path, `missing image ${q.gva.image}`, q.id);
      if (!q.explanation.trim()) warn(f.path, "empty explanation", q.id);
    }
  }

  const byId = new Map<string, Question>();
  const byKey = new Map<string, Question>();
  const byText = new Map<string, Question>();
  for (const q of questions) {
    const file = where.get(q) ?? "";
    const other = byId.get(q.id);
    if (other) err(file, `duplicate id (also in ${where.get(other)})`, q.id);
    byId.set(q.id, q);

    const key = progressKey(q);
    const clash = byKey.get(key);
    if (clash) err(file, `same progress key as ${clash.id}: progress would be shared`, q.id);
    byKey.set(key, q);

    if (!q.gva) {
      const t = `${q.topic}|${norm(q.q)}`;
      const twin = byText.get(t);
      if (twin) warn(file, `same question text as ${twin.id}`, q.id);
      byText.set(t, q);
    }
  }

  const errors = issues.filter((i) => i.level === "error").length;
  return { questions, issues, errors, warnings: issues.length - errors };
}

/** Bank in app order: guide questions by id, then real questions by index. */
export function orderBank(questions: Question[]) {
  const guide = questions.filter((q) => !q.gva).sort((a, b) => idNumber(a.id) - idNumber(b.id));
  const gva = questions.filter((q) => q.gva).sort((a, b) => (a.gva?.index ?? 0) - (b.gva?.index ?? 0));
  return { guide, gva };
}
