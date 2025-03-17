#!/usr/bin/env node
import path from "path";
import { fileURLToPath } from "url";
import prompts from "prompts";
import chalk from "chalk";

import { generateHookFiles } from "./file-generator.mjs";
import { updateReadme } from "./readme-updater.mjs";
import logger from "./logger.mjs";

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Converts camelCase to kebab-case
 *
 * @param {string} str - String to convert
 * @returns {string} - Converted string
 */
function camelToKebabCase(str) {
  return str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}

/**
 * Main function to create hooks
 */
const createHook = async () => {
  console.log(chalk.bold.blue("\n🪝 React Hook Generator\n"));

  const { hookName } = await prompts({
    type: "text",
    name: "hookName",
    message: "Enter hook name:",
    validate: (value) =>
      value.startsWith("use") ? true : 'Hook name must start with "use"',
  });

  // Exit if user cancelled
  if (!hookName) {
    logger.warn("Hook creation cancelled");
    return;
  }

  const { description } = await prompts({
    type: "text",
    name: "description",
    message: "Enter a brief description for the hook:",
  });

  const hookDirName = camelToKebabCase(hookName);
  const hookDir = path.join(__dirname, "..", "src", hookDirName);
  const readmePath = path.join(__dirname, "..", "README.md");

  try {
    // Generate all hook files
    await generateHookFiles(hookDir, hookName, hookDirName, description);

    // Update README.md
    await updateReadme(readmePath, hookName, description);

    console.log(
      chalk.bold.green(`\n🎉 Successfully created ${chalk.cyan(hookName)}!`)
    );
    console.log(chalk.dim(`\nLocation: ${hookDir}/${hookDirName}.ts\n`));
  } catch {
    logger.error("Error creating hook");
    process.exit(1);
  }
};

createHook().catch(() => {
  logger.error("Unexpected error");
  process.exit(1);
});
