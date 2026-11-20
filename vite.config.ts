import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

// Output must stay a single self-contained HTML file: it is opened from disk,
// works offline and will be wrapped by Capacitor (phase 4).
export default defineConfig({
  plugins: [viteSingleFile()],
  build: { outDir: "dist", emptyOutDir: true },
});
