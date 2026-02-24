import { act, renderHook } from "@testing-library/react";
import { commands } from "@vitest/browser/context";
import { beforeEach, describe, expect, it } from "vitest";
import { useReducedMotion } from "./useReducedMotion";

// if you are using TypeScript, you can augment the module
declare module "@vitest/browser/context" {
  interface BrowserCommands {
    emulateReducedMotion: (
      reducedMotion: "reduce" | "no-preference" | null
    ) => Promise<{
      someValue: true;
    }>;
  }
}

describe("useReducedMotion", () => {
  // Reset reduced motion preference before each test
  beforeEach(async () => {
    await commands.emulateReducedMotion(null);
  });

  it("should return false when user has no preference for reduced motion", async () => {
    await commands.emulateReducedMotion("no-preference");

    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);
  });

  it("should return true when user prefers reduced motion", async () => {
    await commands.emulateReducedMotion("reduce");

    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(true);
  });

  it("should respond to changes in reduced motion preference", async () => {
    await commands.emulateReducedMotion("no-preference");

    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);

    await act(async () => {
      await commands.emulateReducedMotion("reduce");
      await new Promise((resolve) => setTimeout(resolve, 100));
    });

    expect(result.current).toBe(true);

    await act(async () => {
      await commands.emulateReducedMotion("no-preference");
      await new Promise((resolve) => setTimeout(resolve, 100));
    });

    expect(result.current).toBe(false);
  });
});
