import fs from "fs/promises";
import logger from "./logger.mjs";

/**
 * Updates the index.ts file with the new hook export
 * @param {string} indexPath - Path to the index.ts file
 * @param {string} hookName - Name of the hook to add
 * @returns {Promise<void>}
 */
export async function updateIndex(indexPath, hookName) {
  try {
    // Read the current index file
    const content = await fs.readFile(indexPath, "utf-8");

    // Create the export statement for the new hook
    const exportStatement = `export * from "#${hookName}";`;

    // Check if the hook is already exported
    if (content.includes(exportStatement)) {
      logger.info(`${hookName} is already exported in index.ts`);
      return;
    }

    // Add the new export at the end of the file
    const updatedContent = content.trim() + `\n${exportStatement}\n`;

    // Write the updated content back to the file
    await fs.writeFile(indexPath, updatedContent, "utf-8");

    logger.info(`Updated index.ts with export for ${hookName}`);
  } catch {
    logger.error(`Failed to update index.ts`);
  }
}
