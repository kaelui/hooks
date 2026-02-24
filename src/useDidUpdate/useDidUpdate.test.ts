import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useDidUpdate } from "./useDidUpdate";

describe("useDidUpdate", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should not call the callback on initial render", () => {
    const callback = vi.fn();

    renderHook(() => useDidUpdate(callback));

    expect(callback).not.toHaveBeenCalled();
  });

  it("should call the callback when dependencies change", () => {
    const callback = vi.fn();

    const { rerender } = renderHook(
      ({ dependency }) => useDidUpdate(callback, [dependency]),
      {
        initialProps: { dependency: 0 },
      }
    );

    expect(callback).not.toHaveBeenCalled();

    rerender({ dependency: 1 });
    expect(callback).toHaveBeenCalledTimes(1);

    rerender({ dependency: 2 });
    expect(callback).toHaveBeenCalledTimes(2);
  });

  it("should not call the callback when rerendering with same dependencies", () => {
    const callback = vi.fn();

    const { rerender } = renderHook(
      ({ dependency }) => useDidUpdate(callback, [dependency]),
      {
        initialProps: { dependency: 0 },
      }
    );

    expect(callback).not.toHaveBeenCalled();

    rerender({ dependency: 0 });
    expect(callback).not.toHaveBeenCalled();
  });

  it("should call cleanup function when unmounting", () => {
    const cleanupFn = vi.fn();
    const callback = vi.fn().mockReturnValue(cleanupFn);

    const { rerender, unmount } = renderHook(
      ({ dependency }) => useDidUpdate(callback, [dependency]),
      {
        initialProps: { dependency: 0 },
      }
    );

    rerender({ dependency: 1 });
    expect(callback).toHaveBeenCalledTimes(1);
    expect(cleanupFn).not.toHaveBeenCalled();

    unmount();
    expect(cleanupFn).toHaveBeenCalledTimes(1);
  });

  it("should call cleanup function when dependencies change", () => {
    const cleanupFn = vi.fn();
    const callback = vi.fn().mockReturnValue(cleanupFn);

    const { rerender } = renderHook(
      ({ dependency }) => useDidUpdate(callback, [dependency]),
      {
        initialProps: { dependency: 0 },
      }
    );

    rerender({ dependency: 1 });
    expect(callback).toHaveBeenCalledTimes(1);
    expect(cleanupFn).not.toHaveBeenCalled();

    rerender({ dependency: 2 });
    expect(cleanupFn).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledTimes(2);
  });
});
