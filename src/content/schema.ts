// Question bank schema. Source files: content/questions/{guide,gva}/<topic>.json.
// The app still consumes the legacy positional arrays; toLegacy() converts at build time.
import { z } from "zod";
import { TOPICS, type TopicId } from "../exam/spec.ts";

export const TOPIC_IDS = TOPICS.map((t) => t.id) as [TopicId, ...TopicId[]];

const text = z.string().trim().min(1);

export const GvaMeta = z.strictObject({
  /** Index in the original real-exam list. Progress is keyed `r:<index>`: never change it. */
  index: z.int().nonnegative(),
  /** Sittings (YYYY-MM) where this question appeared. */
  sittings: z.array(z.string().regex(/^\d{4}-\d{2}$/)).min(1),
  /** The official answer key was revised for this question (shown as "clave revisada"). */
  keyRevised: z.literal(true).optional(),
  /** Figure from the original paper, relative to content/questions/gva/. */
  image: z
    .string()
    .regex(/^img\/[\w-]+\.(jpg|png)$/)
    .optional(),
});

export const Question = z
  .strictObject({
    /** Permanent ID: `g-NNNN` (guide) or `gva-NNNN` (real exam). Never reuse or renumber. */
    id: z.string().regex(/^(g|gva)-\d{4}$/),
    topic: z.enum(TOPIC_IDS),
    q: text,
    options: z.array(text).length(4),
    answer: z.int().min(0).max(3),
    /** Why the answer is right. May be empty (reported as a warning). */
    explanation: z.string(),
    gva: GvaMeta.optional(),
  })
  .refine((x) => x.id.startsWith("gva-") === (x.gva !== undefined), {
    message: "gva-* ids must have `gva` metadata and g-* ids must not",
  })
  .refine((x) => !x.gva || x.id === gvaId(x.gva.index), {
    message: "gva id must match gva.index (gva-NNNN)",
  });

export type Question = z.infer<typeof Question>;
export const QuestionFile = z.array(Question);

export const guideId = (n: number) => `g-${String(n).padStart(4, "0")}`;
export const gvaId = (index: number) => `gva-${String(index).padStart(4, "0")}`;
export const idNumber = (id: string) => Number(id.slice(id.indexOf("-") + 1));

/** Key the app's progress store uses for a question (see `qid` in index.html). */
export const progressKey = (q: Question) => (q.gva ? `r:${q.gva.index}` : `${q.topic}:${q.q.slice(0, 70)}`);

type LegacyMeta = { i: number; p: string[]; d?: 1; img?: string };
export type LegacyQuestion =
  | [string, string, string[], number, string]
  | [string, string, string[], number, string, LegacyMeta];

/** Convert to the positional array the app uses. `images` maps `img/…` paths to data URIs. */
export function toLegacy(q: Question, images: Record<string, string> = {}): LegacyQuestion {
  const base = [q.topic, q.q, q.options, q.answer, q.explanation] as const;
  if (!q.gva) return [...base];
  const meta: LegacyMeta = { i: q.gva.index, p: q.gva.sittings };
  if (q.gva.keyRevised) meta.d = 1;
  if (q.gva.image) {
    const uri = images[q.gva.image];
    if (!uri) throw new Error(`${q.id}: image ${q.gva.image} not loaded`);
    meta.img = uri;
  }
  return [...base, meta];
}
