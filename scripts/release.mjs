#!/usr/bin/env node

import { execSync } from "child_process";
import prompts from "prompts";
import chalk from "chalk";
import ora from "ora";
import logger from "./logger.mjs";

// Get current version from package.json
const packageJson = JSON.parse(
  execSync("cat package.json", { encoding: "utf-8" })
);
const currentVersion = packageJson.version;

/**
 * Check if git working directory is clean
 * @returns {Promise<boolean>} true if clean, false if there are uncommitted changes
 */
async function checkGitStatus() {
  try {
    const status = execSync("git status --porcelain", {
      stdio: "pipe",
      encoding: "utf-8",
    });
    return status?.trim() === "";
  } catch {
    await logger.error("Failed to check git status");
    return false;
  }
}

/**
 * Prompts for commit message and commits all changes
 * @returns {Promise<boolean>} true if successful, false if failed
 */
async function commitChanges() {
  const { commitMessage } = await prompts({
    type: "text",
    name: "commitMessage",
    message: "Enter commit message:",
    initial: "chore: prepare for release",
  });

  if (!commitMessage) {
    await logger.warn("Release aborted");
    return false;
  }

  const stageSpinner = ora("Staging and committing changes...").start();
  try {
    execSync("git add .");
    execSync(`git commit -m "${commitMessage}"`);
    stageSpinner.succeed(chalk.green("Changes committed successfully"));
    return true;
  } catch {
    stageSpinner.fail(chalk.red("Failed to commit changes"));
    return false;
  }
}

/**
 * Checks git status and offers to commit changes if needed
 * @returns {Promise<boolean>} true if git is clean or changes were committed, false if operation was aborted
 */
async function ensureCleanGitStatus() {
  const isGitClean = await checkGitStatus();
  if (isGitClean) return true;

  const { action } = await prompts({
    type: "select",
    name: "action",
    message: "Git working directory is not clean. What would you like to do?",
    choices: [
      { title: "Commit all changes", value: "commit" },
      { title: "Abort release", value: "abort" },
    ],
  });

  if (action === "abort" || !action) {
    await logger.warn("Release aborted");
    return false;
  }

  return await commitChanges();
}

/**
 * @param {string} releaseType
 */
function getNextVersion(releaseType) {
  const [major, minor, patch] = currentVersion.split(".").map(Number);

  switch (releaseType) {
    case "patch":
      return `${major}.${minor}.${patch + 1}`;
    case "minor":
      return `${major}.${minor + 1}.0`;
    case "major":
      return `${major + 1}.0.0`;
    default:
      return releaseType;
  }
}

/**
 * @param {string} version
 */
function isValidVersion(version) {
  const semVerRegex = /^\d+\.\d+\.\d+$/;
  return semVerRegex.test(version);
}

/**
 * Prompts the user to select a version for release
 * @returns {Promise<string|null>} selected version or null if canceled
 */
async function selectVersionForRelease() {
  const response = await prompts({
    type: "select",
    name: "releaseType",
    message: "Select the type of release:",
    choices: [
      { title: `Patch (${getNextVersion("patch")})`, value: "patch" },
      { title: `Minor (${getNextVersion("minor")})`, value: "minor" },
      { title: `Major (${getNextVersion("major")})`, value: "major" },
      { title: "Custom", value: "custom" },
    ],
  });

  if (!response.releaseType) {
    await logger.warn("Release cancelled");
    return null;
  }

  if (response.releaseType !== "custom") {
    return response.releaseType;
  }

  // Handle custom version input
  const customResponse = await prompts({
    type: "text",
    name: "version",
    message: "Enter the version number:",
    validate: (value) =>
      isValidVersion(value) ? true : "Please enter a valid semver version",
  });

  if (!customResponse.version) {
    await logger.warn("Release cancelled");
    return null;
  }

  return customResponse.version;
}

/**
 * Creates a release with the specified version
 * @param {string} version The version to release
 */
async function createRelease(version) {
  await logger.info("Starting release process...");

  try {
    // https://docs.npmjs.com/cli/v11/commands/npm-version
    execSync(`pnpm version ${version} --message "ignore(chore): release v%s"`, {
      stdio: "inherit",
    });
    await logger.info(
      `Successfully released version ${getNextVersion(version)}`
    );
    return true;
  } catch {
    await logger.error("Release failed");
    process.exit(1);
  }
}

async function main() {
  await logger.info(`Current version: ${currentVersion}`);

  // Ensure git is clean before proceeding
  if (!(await ensureCleanGitStatus())) return;

  // Get version from user
  const version = await selectVersionForRelease();
  if (!version) return;

  // Create the release
  await createRelease(version);
}

main().catch(async () => {
  await logger.error("An unknown error occurred");
  process.exit(1);
});
