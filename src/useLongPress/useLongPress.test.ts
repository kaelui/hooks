import { act, renderHook } from "@testing-library/react";
import { vi } from "vitest";
import { useLongPress } from "./useLongPress";

describe("useLongPress", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should return empty object when no callback is provided", () => {
    const { result } = renderHook(() => useLongPress(undefined));

    expect(result.current).toEqual({});
  });

  it("should return event handlers when callback is provided", () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useLongPress(callback));

    expect(result.current).toHaveProperty("onMouseDown");
    expect(result.current).toHaveProperty("onMouseUp");
    expect(result.current).toHaveProperty("onMouseLeave");
    expect(result.current).toHaveProperty("onTouchStart");
    expect(result.current).toHaveProperty("onTouchEnd");
  });

  describe("mouse events", () => {
    it("should trigger callback after threshold on mouse events", () => {
      const callback = vi.fn();
      const { result } = renderHook(() =>
        useLongPress(callback, { threshold: 500 })
      );

      const mouseDownEvent = new MouseEvent("mousedown", { bubbles: true });
      const mouseUpEvent = new MouseEvent("mouseup", { bubbles: true });

      act(() => {
        result.current.onMouseDown?.({
          nativeEvent: mouseDownEvent,
        } as React.MouseEvent);
      });

      expect(callback).not.toHaveBeenCalled();

      act(() => {
        vi.advanceTimersByTime(500);
      });

      expect(callback).toHaveBeenCalledTimes(1);

      act(() => {
        result.current.onMouseUp?.({
          nativeEvent: mouseUpEvent,
        } as React.MouseEvent);
      });
    });

    it("should call onStart callback on mouse down", () => {
      const callback = vi.fn();
      const onStart = vi.fn();
      const { result } = renderHook(() => useLongPress(callback, { onStart }));

      const mouseDownEvent = new MouseEvent("mousedown", { bubbles: true });

      act(() => {
        result.current.onMouseDown?.({
          nativeEvent: mouseDownEvent,
        } as React.MouseEvent);
      });

      expect(onStart).toHaveBeenCalledTimes(1);
    });

    it("should call onFinish callback after successful long press", () => {
      const callback = vi.fn();
      const onFinish = vi.fn();
      const { result } = renderHook(() =>
        useLongPress(callback, { onFinish, threshold: 400 })
      );

      const mouseDownEvent = new MouseEvent("mousedown", { bubbles: true });
      const mouseUpEvent = new MouseEvent("mouseup", { bubbles: true });

      act(() => {
        result.current.onMouseDown?.({
          nativeEvent: mouseDownEvent,
        } as React.MouseEvent);
      });

      act(() => {
        vi.advanceTimersByTime(400);
      });

      act(() => {
        result.current.onMouseUp?.({
          nativeEvent: mouseUpEvent,
        } as React.MouseEvent);
      });

      expect(onFinish).toHaveBeenCalledTimes(1);
    });

    it("should call onCancel callback when released before threshold", () => {
      const callback = vi.fn();
      const onCancel = vi.fn();
      const { result } = renderHook(() =>
        useLongPress(callback, { onCancel, threshold: 500 })
      );

      const mouseDownEvent = new MouseEvent("mousedown", { bubbles: true });
      const mouseUpEvent = new MouseEvent("mouseup", { bubbles: true });

      act(() => {
        result.current.onMouseDown?.({
          nativeEvent: mouseDownEvent,
        } as React.MouseEvent);
      });

      act(() => {
        vi.advanceTimersByTime(200); // Less than threshold
      });

      act(() => {
        result.current.onMouseUp?.({
          nativeEvent: mouseUpEvent,
        } as React.MouseEvent);
      });

      expect(callback).not.toHaveBeenCalled();
      expect(onCancel).toHaveBeenCalledTimes(1);
    });

    it("should cancel long press on mouse leave", () => {
      const callback = vi.fn();
      const onCancel = vi.fn();
      const { result } = renderHook(() =>
        useLongPress(callback, { onCancel, threshold: 500 })
      );

      const mouseDownEvent = new MouseEvent("mousedown", { bubbles: true });
      const mouseLeaveEvent = new MouseEvent("mouseleave", { bubbles: true });

      act(() => {
        result.current.onMouseDown?.({
          nativeEvent: mouseDownEvent,
        } as React.MouseEvent);
      });

      act(() => {
        vi.advanceTimersByTime(200);
      });

      act(() => {
        result.current.onMouseLeave?.({
          nativeEvent: mouseLeaveEvent,
        } as React.MouseEvent);
      });

      expect(callback).not.toHaveBeenCalled();
      expect(onCancel).toHaveBeenCalledTimes(1);
    });
  });

  describe("touch events", () => {
    it("should trigger callback after threshold on touch events", () => {
      const callback = vi.fn();
      const { result } = renderHook(() =>
        useLongPress(callback, { threshold: 400 })
      );

      const touchStartEvent = new TouchEvent("touchstart", {
        bubbles: true,
      });
      const touchEndEvent = new TouchEvent("touchend", {
        bubbles: true,
      });

      act(() => {
        result.current.onTouchStart?.({
          nativeEvent: touchStartEvent,
        } as React.TouchEvent);
      });

      expect(callback).not.toHaveBeenCalled();

      act(() => {
        vi.advanceTimersByTime(400);
      });

      expect(callback).toHaveBeenCalledTimes(1);

      act(() => {
        result.current.onTouchEnd?.({
          nativeEvent: touchEndEvent,
        } as React.TouchEvent);
      });
    });

    it("should call onStart callback on touch start", () => {
      const callback = vi.fn();
      const onStart = vi.fn();
      const { result } = renderHook(() => useLongPress(callback, { onStart }));

      const touchStartEvent = new TouchEvent("touchstart", {
        bubbles: true,
      });

      act(() => {
        result.current.onTouchStart?.({
          nativeEvent: touchStartEvent,
        } as React.TouchEvent);
      });

      expect(onStart).toHaveBeenCalledTimes(1);
    });

    it("should call onCancel callback when touch released before threshold", () => {
      const callback = vi.fn();
      const onCancel = vi.fn();
      const { result } = renderHook(() =>
        useLongPress(callback, { onCancel, threshold: 600 })
      );

      const touchStartEvent = new TouchEvent("touchstart", {
        bubbles: true,
      });
      const touchEndEvent = new TouchEvent("touchend", {
        bubbles: true,
      });

      act(() => {
        result.current.onTouchStart?.({
          nativeEvent: touchStartEvent,
        } as React.TouchEvent);
      });

      act(() => {
        vi.advanceTimersByTime(300); // Less than threshold
      });

      act(() => {
        result.current.onTouchEnd?.({
          nativeEvent: touchEndEvent,
        } as React.TouchEvent);
      });

      expect(callback).not.toHaveBeenCalled();
      expect(onCancel).toHaveBeenCalledTimes(1);
    });
  });

  describe("configuration", () => {
    it("should use default threshold of 400ms", () => {
      const callback = vi.fn();
      const { result } = renderHook(() => useLongPress(callback));

      const mouseDownEvent = new MouseEvent("mousedown", { bubbles: true });

      act(() => {
        result.current.onMouseDown?.({
          nativeEvent: mouseDownEvent,
        } as React.MouseEvent);
      });

      act(() => {
        vi.advanceTimersByTime(399);
      });
      expect(callback).not.toHaveBeenCalled();

      act(() => {
        vi.advanceTimersByTime(1);
      });
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it("should use custom threshold", () => {
      const callback = vi.fn();
      const { result } = renderHook(() =>
        useLongPress(callback, { threshold: 1000 })
      );

      const mouseDownEvent = new MouseEvent("mousedown", { bubbles: true });

      act(() => {
        result.current.onMouseDown?.({
          nativeEvent: mouseDownEvent,
        } as React.MouseEvent);
      });

      act(() => {
        vi.advanceTimersByTime(999);
      });
      expect(callback).not.toHaveBeenCalled();

      act(() => {
        vi.advanceTimersByTime(1);
      });
      expect(callback).toHaveBeenCalledTimes(1);
    });
  });

  describe("cleanup", () => {
    it("should clear timer when component unmounts", () => {
      const callback = vi.fn();
      const { result, unmount } = renderHook(() =>
        useLongPress(callback, { threshold: 500 })
      );

      const mouseDownEvent = new MouseEvent("mousedown", { bubbles: true });

      act(() => {
        result.current.onMouseDown?.({
          nativeEvent: mouseDownEvent,
        } as React.MouseEvent);
      });

      unmount();

      act(() => {
        vi.advanceTimersByTime(500);
      });

      expect(callback).not.toHaveBeenCalled();
    });

    it("should handle multiple rapid interactions correctly", () => {
      const callback = vi.fn();
      const { result } = renderHook(() =>
        useLongPress(callback, { threshold: 300 })
      );

      const mouseDownEvent = new MouseEvent("mousedown", { bubbles: true });
      const mouseUpEvent = new MouseEvent("mouseup", { bubbles: true });

      // First interaction - cancelled
      act(() => {
        result.current.onMouseDown?.({
          nativeEvent: mouseDownEvent,
        } as React.MouseEvent);
      });

      act(() => {
        vi.advanceTimersByTime(100);
      });

      act(() => {
        result.current.onMouseUp?.({
          nativeEvent: mouseUpEvent,
        } as React.MouseEvent);
      });

      // Second interaction - successful
      act(() => {
        result.current.onMouseDown?.({
          nativeEvent: mouseDownEvent,
        } as React.MouseEvent);
      });

      act(() => {
        vi.advanceTimersByTime(300);
      });

      expect(callback).toHaveBeenCalledTimes(1);
    });
  });

  describe("memoization", () => {
    it("should memoize handlers when dependencies don't change", () => {
      const callback = vi.fn();
      const options = { threshold: 400, onStart: vi.fn() };

      const { result, rerender } = renderHook(
        ({ cb, opts }) => useLongPress(cb, opts),
        { initialProps: { cb: callback, opts: options } }
      );

      const firstHandlers = result.current;

      rerender({ cb: callback, opts: options });

      expect(result.current).toBe(firstHandlers);
    });

    it("should update handlers when dependencies change", () => {
      const callback1 = vi.fn();
      const callback2 = vi.fn();

      const { result, rerender } = renderHook(({ cb }) => useLongPress(cb), {
        initialProps: { cb: callback1 },
      });

      const firstHandlers = result.current;

      rerender({ cb: callback2 });

      expect(result.current).not.toBe(firstHandlers);
    });
  });
});
