import { describe, expect, it } from "vitest";
import { page } from "@vitest/browser/context";
import { renderHook, act } from "@testing-library/react";
import { useMediaQuery } from "./useMediaQuery";

describe("useMediaQuery", () => {
  it("should initialize correctly with default options", () => {
    const query = "(min-width: 768px)";
    const { result } = renderHook(() => useMediaQuery(query));

    expect(result.current).toBeDefined();
    expect(typeof result.current).toBe("boolean");
    // The actual value will depend on the browser window size during testing
  });

  it("should ignore initialValue when getInitialValueInEffect is false", () => {
    // Use a query that will definitely match in browsers
    const definitelyMatchesQuery = "(min-width: 0px)";

    const { result } = renderHook(() =>
      useMediaQuery(definitelyMatchesQuery, false, {
        getInitialValueInEffect: false,
      })
    );

    expect(result.current).toBe(true);
  });

  it("should update matches when media query changes", async () => {
    const query = "(min-width: 150px)";
    const { result } = renderHook(() => useMediaQuery(query));

    expect(result.current).toBe(true);

    // Change viewport and simulate media query change
    await act(async () => {
      await page.viewport(25, 25);

      // Add a small delay to ensure events propagate in Chromium
      await new Promise((resolve) => setTimeout(resolve, 100));
    });

    expect(result.current).toBe(false);
  });

  it("should handle different queries appropriately", () => {
    // A query that will always match in browsers
    const alwaysMatchQuery = "(max-width: 9999px)";
    const { result: alwaysMatchResult } = renderHook(() =>
      useMediaQuery(alwaysMatchQuery, false, { getInitialValueInEffect: false })
    );

    // A query that will never match in browsers
    const neverMatchQuery = "(min-width: 9999px)";
    const { result: neverMatchResult } = renderHook(() =>
      useMediaQuery(neverMatchQuery, false, { getInitialValueInEffect: false })
    );

    expect(alwaysMatchResult.current).toBe(true);
    expect(neverMatchResult.current).toBe(false);
  });

  it("should handle query parameter updates", () => {
    const initialQuery = "(min-width: 0px)"; // Will match

    const { result, rerender } = renderHook(
      (query) =>
        useMediaQuery(query, false, { getInitialValueInEffect: false }),
      { initialProps: initialQuery }
    );

    expect(result.current).toBe(true);

    // Change the query to one that won't match
    rerender("(min-width: 9999px)");

    expect(result.current).toBe(false);
  });
});
