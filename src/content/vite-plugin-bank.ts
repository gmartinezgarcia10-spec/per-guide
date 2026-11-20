// Injects the question bank into index.html as `window.PER_BANK = {guide, real, ids}` (legacy arrays + ids),
// in a classic script before the app script. Fails the build on validation errors.
import type { Plugin } from "vite";
import { CONTENT_DIR, loadBank, loadImages } from "./load.ts";
import { toLegacy } from "./schema.ts";
import { orderBank } from "./validate.ts";

export function questionBank(): Plugin {
  return {
    name: "per-question-bank",
    transformIndexHtml() {
      const report = loadBank();
      if (report.errors) {
        const first = report.issues.filter((i) => i.level === "error").slice(0, 10);
        throw new Error(
          `question bank has ${report.errors} errors (npm run validate:content):\n${first.map((i) => `  ${i.file} ${i.id ?? ""}: ${i.message}`).join("\n")}`,
        );
      }
      const images = loadImages();
      const { guide, gva } = orderBank(report.questions);
      const bank = {
        guide: guide.map((q) => toLegacy(q)),
        real: gva.map((q) => toLegacy(q, images)),
        // Permanent ids, parallel to the arrays; src/legacy/bank.js attaches them as q.id.
        ids: { guide: guide.map((q) => q.id), real: gva.map((q) => q.id) },
      };
      // "</" would end the script element early.
      const json = JSON.stringify(bank).replaceAll("</", "<\\/");
      return [{ tag: "script", children: `window.PER_BANK=${json};`, injectTo: "body-prepend" }];
    },
    configureServer(server) {
      server.watcher.add(CONTENT_DIR);
      server.watcher.on("change", (file) => {
        if (file.startsWith(CONTENT_DIR)) server.ws.send({ type: "full-reload" });
      });
    },
  };
}
