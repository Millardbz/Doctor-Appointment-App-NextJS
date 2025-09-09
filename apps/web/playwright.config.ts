import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 30_000,
  fullyParallel: true,
  expect: { timeout: 5_000 },
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
    headless: true,
  },
  // Start the whole stack (web + api) using your root dev script
  webServer: [
    {
      command: "yarn dev",
      cwd: "../..",            // run from repo root so it starts both apps
      port: 3000,              // Playwright waits for this port
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
    },
  ],
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    // You can add firefox/webkit later if you want
  ],
});
