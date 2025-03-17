import fs from "fs";
import chalk from "chalk";
import ora from "ora";

/**
 * Updates the README.md file with information about the new hook
 *
 * @param {string} readmePath - Path to the README.md file
 * @param {string} hookName - Name of the hook
 * @param {string} description - short description of the hook
 * @returns {Promise<void>}
 */
export async function updateReadme(readmePath, hookName, description) {
  const spinner = ora(
    `Updating README.md with ${chalk.cyan(hookName)}`
  ).start();

  try {
    const readme = fs.readFileSync(readmePath, "utf8");

    const hookEntry = `- [${hookName}](https://kaelui.github.io/hooks/?path=/docs/${hookName.toLowerCase()}--docs/): ${description}.`;

    // Find the Available Hooks section
    const availableHooksSection = "## 🪝 Available Hooks";
    // Pattern to find the next section heading (starts with ## and optional space)
    const nextSectionPattern = /\n## /;

    const hooksStartIndex = readme.indexOf(availableHooksSection);
    if (hooksStartIndex === -1) {
      throw new Error("Could not find Available Hooks section in README");
    }

    // Find the next section to determine where Available Hooks section ends
    const nextSectionMatch = nextSectionPattern.exec(
      readme.substring(hooksStartIndex + availableHooksSection.length)
    );
    const nextSectionIndex = nextSectionMatch
      ? hooksStartIndex + availableHooksSection.length + nextSectionMatch.index
      : readme.length;

    // Split the README into before, hooks section, and after
    const readmeStart = readme.substring(0, hooksStartIndex);
    const hooksSection = readme.substring(hooksStartIndex, nextSectionIndex);
    const readmeEnd = readme.substring(nextSectionIndex);

    // Add the new hook to the end of the hooks section
    const updatedHooksSection = hooksSection.trim() + "\n" + hookEntry + "\n";

    // Combine the parts
    const updatedReadme = readmeStart + updatedHooksSection + readmeEnd;

    fs.writeFileSync(readmePath, updatedReadme);
    spinner.succeed(`Updated README.md with ${chalk.cyan(hookName)}`);
  } catch (error) {
    spinner.fail(
      `Failed to update README: ${error instanceof Error ? error.message : String(error)}`
    );
    throw error;
  }
}
