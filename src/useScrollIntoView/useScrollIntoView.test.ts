import { act, renderHook } from "@testing-library/react";
import { vi } from "vitest"; // Import vi for mocking
import { useScrollIntoView } from "./useScrollIntoView";

describe("useScrollIntoView", () => {
  let scrollableElement: HTMLDivElement;
  let targetElement: HTMLDivElement;

  beforeEach(() => {
    // Create a scrollable container and target element
    scrollableElement = document.createElement("div");
    scrollableElement.style.height = "200px";
    scrollableElement.style.overflow = "auto";
    scrollableElement.scrollTop = 0; // Reset scroll position
    document.body.appendChild(scrollableElement);

    targetElement = document.createElement("div");
    targetElement.style.height = "100px";
    targetElement.style.marginTop = "300px"; // Ensure it's initially out of view
    scrollableElement.appendChild(targetElement);

    vi.useFakeTimers(); // Use fake timers for controlling animation time
  });

  afterEach(() => {
    document.body.removeChild(scrollableElement);
    vi.useRealTimers(); // Restore real timers after each test
  });

  it("should scroll to target element with default alignment (start)", () => {
    const { result } = renderHook(() =>
      useScrollIntoView<HTMLDivElement, HTMLDivElement>()
    );
    const { scrollableRef, targetRef, scrollIntoView } = result.current;

    // Set the refs
    scrollableRef.current = scrollableElement;
    targetRef.current = targetElement;

    act(() => {
      scrollIntoView();
    });

    // Wait for the scroll to take effect (adjust timeout as needed)
    setTimeout(() => {
      expect(scrollableElement.scrollTop).toBeGreaterThan(0);
      expect(scrollableElement.scrollTop).toBeCloseTo(300, 10);
    }, 1500);
  });

  it("should scroll to target element with center alignment", () => {
    const { result } = renderHook(() =>
      useScrollIntoView<HTMLDivElement, HTMLDivElement>()
    );
    const { scrollableRef, targetRef, scrollIntoView } = result.current;

    // Set the refs
    scrollableRef.current = scrollableElement;
    targetRef.current = targetElement;

    act(() => {
      scrollIntoView({ alignment: "center" });
    });

    // Wait for the scroll to take effect (adjust timeout as needed)
    setTimeout(() => {
      expect(scrollableElement.scrollTop).toBeGreaterThan(0);
      // Example calculation for center alignment (adjust as needed)
      const expectedScrollTop = 300 - (200 - 100) / 2;
      expect(scrollableElement.scrollTop).toBeCloseTo(expectedScrollTop, 10);
    }, 1500);
  });

  it("should scroll to target element with end alignment", () => {
    const { result } = renderHook(() =>
      useScrollIntoView<HTMLDivElement, HTMLDivElement>()
    );
    const { scrollableRef, targetRef, scrollIntoView } = result.current;

    // Set the refs
    scrollableRef.current = scrollableElement;
    targetRef.current = targetElement;

    act(() => {
      scrollIntoView({ alignment: "end" });
    });

    // Wait for the scroll to take effect (adjust timeout as needed)
    setTimeout(() => {
      expect(scrollableElement.scrollTop).toBeGreaterThan(0);
      // Example calculation for end alignment (adjust as needed)
      const expectedScrollTop = 300 - (200 - 100);
      expect(scrollableElement.scrollTop).toBeCloseTo(expectedScrollTop, 10);
    }, 1500);
  });

  it("should apply offset correctly", () => {
    const offsetValue = 50;
    const { result } = renderHook(() =>
      useScrollIntoView<HTMLDivElement, HTMLDivElement>({ offset: offsetValue })
    );
    const { scrollableRef, targetRef, scrollIntoView } = result.current;

    // Set the refs
    scrollableRef.current = scrollableElement;
    targetRef.current = targetElement;

    act(() => {
      scrollIntoView();
    });

    // Wait for the scroll to take effect (adjust timeout as needed)
    setTimeout(() => {
      expect(scrollableElement.scrollTop).toBeGreaterThan(0);
      expect(scrollableElement.scrollTop).toBeCloseTo(300 - offsetValue, 10);
    }, 1500);
  });

  it("should cancel the scroll animation", () => {
    const { result } = renderHook(() =>
      useScrollIntoView<HTMLDivElement, HTMLDivElement>({ duration: 5000 })
    );
    const { scrollableRef, targetRef, scrollIntoView, cancel } = result.current;

    // Set the refs
    scrollableRef.current = scrollableElement;
    targetRef.current = targetElement;

    act(() => {
      scrollIntoView();
    });

    // Cancel the scroll after a short delay
    setTimeout(() => {
      act(() => {
        cancel();
      });
      const scrollTopAfterCancel = scrollableElement.scrollTop;

      // Wait a bit longer to ensure scrolling has stopped
      setTimeout(() => {
        expect(scrollableElement.scrollTop).toBeCloseTo(
          scrollTopAfterCancel,
          5
        );
      }, 100);
    }, 500);
  });

  it("should handle window scrolling when scrollableRef is not provided", () => {
    const { result } = renderHook(() => useScrollIntoView<HTMLDivElement>());
    const { targetRef, scrollIntoView } = result.current;

    // Mock the target ref and append it to the body
    targetRef.current = targetElement;
    document.body.appendChild(targetElement);

    // Save initial scroll position
    window.scrollTo(0, 0);

    act(() => {
      scrollIntoView();
    });

    setTimeout(() => {
      expect(window.scrollY).toBeGreaterThan(0);
      document.body.removeChild(targetElement);
      window.scrollTo(0, 0); // Clean up and reset scroll
    }, 1500);
  });

  it("should call onScrollFinish callback when scroll completes", () => {
    const onScrollFinishMock = vi.fn();
    const scrollDuration = 500; // Use a specific duration for the test
    const { result } = renderHook(() =>
      useScrollIntoView<HTMLDivElement, HTMLDivElement>({
        onScrollFinish: onScrollFinishMock,
        duration: scrollDuration,
      })
    );
    const { scrollableRef, targetRef, scrollIntoView } = result.current;

    // Set the refs
    scrollableRef.current = scrollableElement;
    targetRef.current = targetElement;

    act(() => {
      scrollIntoView();
    });

    // Fast-forward time past the scroll duration
    act(() => {
      vi.advanceTimersByTime(scrollDuration + 100); // Advance time slightly more than duration
    });

    expect(onScrollFinishMock).toHaveBeenCalledTimes(1);
  });
});
