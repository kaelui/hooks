import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    coverage: {
      provider: "istanbul",
      reporter: ["html", "lcov", "text", "json"],
      include: ["src"],
      exclude: [
        "**/*.test.ts",
        "**/*.spec.ts",
        "**/*.stories.*",
        "**/*.story.*",
      ],
    },
    browser: {
      enabled: true,
      provider: "playwright",
      instances: [{ browser: "chromium" }, { browser: "webkit" }],
      headless: true,
      screenshotFailures: false,
    },
    includeTaskLocation: true,
  },
});
