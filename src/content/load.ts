// Node-side loading of content/questions (build, validator, tests).
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { type Report, type SourceFile, validateBank } from "./validate.ts";

export const CONTENT_DIR = resolve(import.meta.dirname, "../../content/questions");

export function readSources(dir = CONTENT_DIR): SourceFile[] {
  const files: SourceFile[] = [];
  for (const kind of ["guide", "gva"]) {
    const sub = join(dir, kind);
    if (!existsSync(sub)) continue;
    for (const name of readdirSync(sub)
      .filter((n) => n.endsWith(".json"))
      .sort()) {
      const path = `${kind}/${name}`;
      let data: unknown;
      try {
        data = JSON.parse(readFileSync(join(dir, path), "utf8"));
      } catch (e) {
        data = { parseError: String(e) };
      }
      files.push({ path, data });
    }
  }
  return files;
}

export function loadBank(dir = CONTENT_DIR): Report {
  return validateBank(readSources(dir), (img) => existsSync(join(dir, "gva", img)));
}

export function loadImages(dir = CONTENT_DIR): Record<string, string> {
  const imgDir = join(dir, "gva", "img");
  if (!existsSync(imgDir)) return {};
  const out: Record<string, string> = {};
  for (const name of readdirSync(imgDir)) {
    const mime = name.endsWith(".png") ? "image/png" : "image/jpeg";
    out[`img/${name}`] = `data:${mime};base64,${readFileSync(join(imgDir, name)).toString("base64")}`;
  }
  return out;
}
