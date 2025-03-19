import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { useResizeObserver, useElementSize } from "./use-resize-observer";

describe("useResizeObserver", () => {
  let testElement: HTMLDivElement;

  beforeEach(() => {
    testElement = document.createElement("div");
    testElement.style.width = "100px";
    testElement.style.height = "100px";
    document.body.appendChild(testElement);
  });

  afterEach(() => {
    if (document.body.contains(testElement)) {
      document.body.removeChild(testElement);
    }
  });

  it("should return a ref and default rect initially", () => {
    const { result } = renderHook(() => useResizeObserver());

    expect(result.current[0]).toBeDefined();
    expect(result.current[0].current).toBe(null);
    expect(result.current[1]).toEqual({
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    });
  });

  it("should observe element when ref is set", async () => {
    const { result, rerender } = renderHook(() => useResizeObserver());

    // Manually set the ref to test element
    act(() => {
      result.current[0].current = testElement;
    });

    rerender();

    // Wrap the waiting and state updates in act
    await act(async () => {
      // Wait for ResizeObserver to trigger
      await new Promise((resolve) => setTimeout(resolve, 100));
    });

    // Check dimensions match what we set (or are at least detected)
    expect(result.current[1].width).toBeGreaterThanOrEqual(50); // At least half of what we set
    expect(result.current[1].height).toBeGreaterThanOrEqual(50); // At least half of what we set
  });

  it("should detect size changes", async () => {
    const { result, rerender } = renderHook(() => useResizeObserver());

    act(() => {
      result.current[0].current = testElement;
    });

    rerender();

    // Wait for initial ResizeObserver to trigger
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
    });

    const initialWidth = result.current[1].width;
    const initialHeight = result.current[1].height;

    // Change element size
    act(() => {
      testElement.style.width = "200px";
      testElement.style.height = "200px";
    });

    // Wait for ResizeObserver to detect the change
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
    });

    // Check that the hook captured the size change
    expect(result.current[1].width).toBeGreaterThan(initialWidth);
    expect(result.current[1].height).toBeGreaterThan(initialHeight);
  });

  it("should clean up observer on unmount", async () => {
    const disconnectSpy = vi.spyOn(ResizeObserver.prototype, "disconnect");

    const { result, unmount } = renderHook(() => useResizeObserver());

    act(() => {
      result.current[0].current = testElement;
    });

    unmount();

    expect(disconnectSpy).toHaveBeenCalled();
    disconnectSpy.mockRestore();
  });

  it("should cancel animation frame on cleanup", async () => {
    const cancelAnimationFrameSpy = vi.spyOn(window, "cancelAnimationFrame");

    const { result, unmount, rerender } = renderHook(() => useResizeObserver());

    act(() => {
      result.current[0].current = testElement;
    });

    rerender();

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
    });

    unmount();

    expect(cancelAnimationFrameSpy).toHaveBeenCalled();
    cancelAnimationFrameSpy.mockRestore();
  });

  it("should accept ResizeObserver options", async () => {
    const observeSpy = vi.spyOn(ResizeObserver.prototype, "observe");
    const options = { box: "border-box" } as const;

    const { result, rerender } = renderHook(() => useResizeObserver(options));

    act(() => {
      result.current[0].current = testElement;
    });

    rerender();

    expect(observeSpy).toHaveBeenCalledWith(testElement, options);
    observeSpy.mockRestore();
  });
});

describe("useElementSize", () => {
  it("should return width and height with a ref", () => {
    const { result } = renderHook(() => useElementSize());

    expect(result.current.ref).toBeDefined();
    expect(result.current.width).toBe(0);
    expect(result.current.height).toBe(0);
  });
});
