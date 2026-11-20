// npm run validate:content [-- --json] [-- --quiet]
// Exit 1 on any error. Warnings are reported but don't fail.
import { loadBank } from "../src/content/load.ts";

const args = new Set(process.argv.slice(2));
const report = loadBank();

if (args.has("--json")) {
  console.log(
    JSON.stringify({ errors: report.errors, warnings: report.warnings, issues: report.issues }, null, 2),
  );
} else {
  const show = report.issues.filter((i) => i.level === "error" || !args.has("--quiet"));
  for (const i of show)
    console.log(`${i.level === "error" ? "✗" : "⚠"} ${i.file}${i.id ? ` ${i.id}` : ""}: ${i.message}`);
  const guide = report.questions.filter((q) => !q.gva).length;
  console.log(
    `content: ${report.questions.length} questions (${guide} guide, ${report.questions.length - guide} gva) · ${report.errors} errors · ${report.warnings} warnings`,
  );
}
process.exit(report.errors ? 1 : 0);
