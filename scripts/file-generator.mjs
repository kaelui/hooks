import fs from "fs";
import path from "path";
import chalk from "chalk";
import ora from "ora";
import {
  getHookTemplate,
  getIndexTemplate,
  getMdxTemplate,
  getStoryTemplate,
  getTestTemplate,
} from "./templates.mjs";

/**
 * Creates a directory if it doesn't exist
 *
 * @param {string} dirPath - Path to directory
 */
export function createDirIfNotExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Generates all files for a hook with interactive feedback
 *
 * @param {string} hookDir - Directory where hook files will be created
 * @param {string} hookName - Name of the hook
 * @param {string} hookDirName - Name of the hook file
 * @param {string} description - Description of the hook
 * @returns {Promise<void>}
 */
export async function generateHookFiles(
  hookDir,
  hookName,
  hookDirName,
  description
) {
  const mainSpinner = ora(
    `Generating ${chalk.cyan(hookName)} files...`
  ).start();

  try {
    // Create hook directory
    createDirIfNotExists(hookDir);

    // Create index file
    mainSpinner.text = `Creating index file for ${chalk.cyan(hookDirName)}...`;
    fs.writeFileSync(
      path.join(hookDir, "index.ts"),
      getIndexTemplate(hookDirName)
    );
    await new Promise((resolve) => setTimeout(resolve, 300)); // Small delay for visual effect

    // Create hook file
    const hookFileName = `${hookDirName}.ts`;
    mainSpinner.text = `Creating hook file ${chalk.cyan(hookFileName)}...`;
    fs.writeFileSync(
      path.join(hookDir, hookFileName),
      getHookTemplate(hookName, description)
    );
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Create test file
    const testFileName = `${hookDirName}.test.ts`;
    mainSpinner.text = `Creating test file ${chalk.cyan(testFileName)}...`;
    fs.writeFileSync(
      path.join(hookDir, testFileName),
      getTestTemplate(hookName, hookDirName)
    );
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Create story file
    const storyFileName = `${hookDirName}.stories.tsx`;
    mainSpinner.text = `Creating story file ${chalk.cyan(storyFileName)}...`;
    fs.writeFileSync(
      path.join(hookDir, storyFileName),
      getStoryTemplate(hookName, hookDirName)
    );
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Create MDX file
    const mdxFileName = `${hookDirName}.mdx`;
    mainSpinner.text = `Creating docs file ${chalk.cyan(mdxFileName)}...`;
    fs.writeFileSync(
      path.join(hookDir, mdxFileName),
      getMdxTemplate(hookName, description, hookDirName)
    );
    await new Promise((resolve) => setTimeout(resolve, 300));

    mainSpinner.succeed(`Created all files for ${chalk.cyan(hookName)}`);
  } catch (error) {
    mainSpinner.fail(
      `Failed to generate files: ${error instanceof Error ? error.message : String(error)}`
    );
    throw error;
  }
}
