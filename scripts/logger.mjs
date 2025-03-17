import chalk from "chalk";

/**
 * @typedef {Object} LogLevel
 * @property {string} label - The display label for the log level
 * @property {import('chalk').ForegroundColorName} color - The chalk color name for this level
 */

/**
 * @type {Record<string, LogLevel>}
 */
const LEVELS = {
  INFO: {
    label: "INFO",
    color: "blue",
  },
  WARN: {
    label: "WARN",
    color: "yellow",
  },
  ERROR: {
    label: "ERROR",
    color: "red",
  },
};

/**
 * Promise-based logger with colorized output
 */
class Logger {
  /**
   * Returns a formatted timestamp showing only hours, minutes and seconds
   * @returns {string} Time string in HH:MM:SS format
   */
  #getTimestamp() {
    const now = new Date();
    return now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }

  /**
   * @param {string} level - Log level key from LEVELS
   * @param {string} message - Log message
   * @returns {string} Formatted log message
   */
  #formatMessage(level, message) {
    const timestamp = this.#getTimestamp();
    const colorFn = chalk[LEVELS[level].color];
    const levelLabel = colorFn(LEVELS[level].label);
    return `${timestamp} [${levelLabel}]: ${message}`;
  }

  /**
   * Logs an info message
   * @param {string} message - The message to log
   * @returns {Promise<void>}
   */
  async info(message) {
    return new Promise((resolve) => {
      console.info(this.#formatMessage("INFO", message));
      resolve();
    });
  }

  /**
   * Logs a warning message
   * @param {string} message - The message to log
   * @returns {Promise<void>}
   */
  async warn(message) {
    return new Promise((resolve) => {
      console.warn(this.#formatMessage("WARN", message));
      resolve();
    });
  }

  /**
   * Logs an error message
   * @param {string} message - The message to log
   * @returns {Promise<void>}
   */
  async error(message) {
    return new Promise((resolve) => {
      console.error(this.#formatMessage("ERROR", message));
      resolve();
    });
  }
}

/** @type {Logger} */
const logger = new Logger();
export default logger;
