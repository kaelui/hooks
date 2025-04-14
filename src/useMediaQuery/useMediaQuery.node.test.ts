import { describe, expect, it, vi } from "vitest";
import { isBrowser } from "#util/isBrowser";
import { getInitialValue } from "./useMediaQuery";

// Mock the isBrowser utility
vi.mock("#util/isBrowser", () => ({
  isBrowser: false,
}));

describe("useMediaQuery in Node environment", () => {
  it("should return initialValue when provided in SSR", () => {
    expect(getInitialValue("(min-width: 768px)", true)).toBe(true);
    expect(getInitialValue("(min-width: 768px)", false)).toBe(false);
  });

  it("should return false when no initialValue is provided in SSR", () => {
    expect(getInitialValue("(min-width: 768px)")).toBe(false);
  });

  it("should return false when isBrowser is false", () => {
    // Verify our mock works properly
    expect(isBrowser).toBe(false);
    expect(getInitialValue("(min-width: 768px)")).toBe(false);
  });
});
