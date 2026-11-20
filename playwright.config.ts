import { defineConfig, devices } from "@playwright/test";

// e2e runs against the built single file (npm run build first; `npm run verify` does both).
export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  use: { trace: "retain-on-failure", locale: "es-ES", timezoneId: "Europe/Madrid" },
  // Baseline snapshots are plain text/JSON, the same on every OS.
  snapshotPathTemplate: "tests/baseline/{arg}{ext}",
  projects: [
    {
      name: "mobile-390",
      testIgnore: /baseline\.spec/,
      use: { ...devices["Desktop Chrome"], viewport: { width: 390, height: 844 } },
    },
    {
      name: "desktop-1280",
      testIgnore: /baseline\.spec/,
      use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 900 } },
    },
    // Characterization snapshot (tests/baseline/), checked at one width.
    {
      name: "baseline",
      testMatch: /baseline\.spec/,
      use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 900 } },
    },
  ],
});
