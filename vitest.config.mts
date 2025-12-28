import { defineConfig } from "vitest/config";
import { playwright, defineBrowserCommand } from "@vitest/browser-playwright";

const emulateReducedMotion = defineBrowserCommand<
  [reducedMotion: "reduce" | "no-preference" | null]
>(async ({ page, provider }, reducedMotion) => {
  if (provider.name !== "playwright") {
    throw new Error(`provider ${provider.name} is not supported`);
  }

  await page.emulateMedia({ reducedMotion });
});

export default defineConfig({
  test: {
    globals: true,
    includeTaskLocation: true,
    coverage: {
      enabled: true,
      provider: "istanbul",
      reporter: ["html", "lcov", "text", "json"],
      include: ["src"],
      exclude: [
        "**/*.test.ts",
        "**/*.spec.ts",
        "**/*.stories.*",
        "**/*.story.*",
        "**/*.mdx",
      ],
    },
    projects: [
      {
        test: {
          name: "node",
          environment: "node", // Explicitly set Node environment
          include: ["src/**/*.node.test.ts"], // Only include Node-specific tests
        },
      },
      {
        extends: true,
        test: {
          name: "browser",
          include: ["src/**/*.test.ts", "src/**/*.spec.ts"],
          exclude: ["**/*.node.test.ts"], // Exclude Node-specific tests
          browser: {
            enabled: true,
            provider: playwright({
              launchOptions: {
                slowMo: 100,
              },
            }),
            instances: [{ browser: "chromium" }, { browser: "webkit" }],
            headless: true,
            screenshotFailures: false,
            commands: {
              emulateReducedMotion,
            },
          },
        },
      },
    ],
  },
});
