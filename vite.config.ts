import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";
import { questionBank } from "./src/content/vite-plugin-bank.ts";

// Output must stay a single self-contained HTML file: it is opened from disk,
// works offline and will be wrapped by Capacitor (phase 4).
export default defineConfig({
  plugins: [questionBank(), viteSingleFile()],
  build: { outDir: "dist", emptyOutDir: true },
});
