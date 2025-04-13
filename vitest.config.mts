import { defineConfig } from "vitest/config";
import type { BrowserCommand } from "vitest/node";

const emulateReducedMotion: BrowserCommand<
  [reducedMotion: "reduce" | "no-preference" | null]
> = async ({ page, provider }, reducedMotion) => {
  if (provider.name !== "playwright") {
    throw new Error(`provider ${provider.name} is not supported`);
  }

  await page.emulateMedia({ reducedMotion });
};

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
      commands: {
        emulateReducedMotion,
      },
    },
    includeTaskLocation: true,
  },
});
