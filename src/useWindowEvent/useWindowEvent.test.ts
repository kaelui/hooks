import { renderHook } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useWindowEvent } from "./useWindowEvent";

describe("useWindowEvent", () => {
  beforeEach(() => {
    // Setup spies for addEventListener and removeEventListener
    vi.spyOn(window, "addEventListener");
    vi.spyOn(window, "removeEventListener");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should add event listener to window on mount", () => {
    const listener = vi.fn();

    renderHook(() => useWindowEvent("resize", listener));

    expect(window.addEventListener).toHaveBeenCalledWith(
      "resize",
      listener,
      undefined
    );
  });

  it("should remove event listener on unmount", () => {
    const listener = vi.fn();

    const { unmount } = renderHook(() => useWindowEvent("resize", listener));
    unmount();

    expect(window.removeEventListener).toHaveBeenCalledWith(
      "resize",
      listener,
      undefined
    );
  });

  it("should add event listener with options when provided", () => {
    const listener = vi.fn();
    const options = { capture: true };

    renderHook(() => useWindowEvent("click", listener, options));

    expect(window.addEventListener).toHaveBeenCalledWith(
      "click",
      listener,
      options
    );
  });

  it("should handle boolean options", () => {
    const listener = vi.fn();

    renderHook(() => useWindowEvent("click", listener, true));

    expect(window.addEventListener).toHaveBeenCalledWith(
      "click",
      listener,
      true
    );
  });

  it("should call listener when event occurs", () => {
    const listener = vi.fn();

    renderHook(() => useWindowEvent("click", listener));

    // Simulate a click event
    const event = new MouseEvent("click");
    window.dispatchEvent(event);

    expect(listener).toHaveBeenCalledWith(event);
  });

  it("should handle custom events", () => {
    const listener = vi.fn();
    const customEvent = new CustomEvent("customEvent", {
      detail: { data: "test" },
    });

    renderHook(() => useWindowEvent("customEvent", listener));

    window.dispatchEvent(customEvent);

    expect(listener).toHaveBeenCalledWith(customEvent);
  });

  it("should not call listener after component unmounts", () => {
    const listener = vi.fn();

    const { unmount } = renderHook(() => useWindowEvent("click", listener));
    unmount();

    const event = new MouseEvent("click");
    window.dispatchEvent(event);

    expect(listener).not.toHaveBeenCalled();
  });
});
