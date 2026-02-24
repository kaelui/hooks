import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"; // Import afterEach
import { setScrollParam } from "./set-scroll-param";

// @vitest-environment jsdom
describe("setScrollParam", () => {
  let parentElement: HTMLElement;
  // Define spies outside tests to allow cleanup in afterEach
  let bodyScrollTopSpy: ReturnType<typeof vi.spyOn>;
  let docElScrollTopSpy: ReturnType<typeof vi.spyOn>;
  let bodyScrollLeftSpy: ReturnType<typeof vi.spyOn>;
  let docElScrollLeftSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    parentElement = document.createElement("div");
    // Mock scroll properties for parent
    Object.defineProperty(parentElement, "scrollTop", {
      value: 0,
      writable: true,
      configurable: true, // Ensure configurable for potential future spying
    });
    Object.defineProperty(parentElement, "scrollLeft", {
      value: 0,
      writable: true,
      configurable: true, // Ensure configurable
    });

    // Reset actual scroll positions (though we won't assert reads)
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    document.body.scrollLeft = 0;
    document.documentElement.scrollLeft = 0;

    // Set up spies on document/body setters
    bodyScrollTopSpy = vi.spyOn(document.body, "scrollTop", "set");
    docElScrollTopSpy = vi.spyOn(document.documentElement, "scrollTop", "set");
    bodyScrollLeftSpy = vi.spyOn(document.body, "scrollLeft", "set");
    docElScrollLeftSpy = vi.spyOn(
      document.documentElement,
      "scrollLeft",
      "set"
    );
  });

  // Add afterEach to restore spies
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should set scrollTop on the parent element", () => {
    setScrollParam({ axis: "y", parent: parentElement, distance: 100 });
    expect(parentElement.scrollTop).toBe(100); // Keep direct assertion for parent
  });

  it("should set scrollLeft on the parent element", () => {
    setScrollParam({ axis: "x", parent: parentElement, distance: 150 });
    expect(parentElement.scrollLeft).toBe(150);
  });

  it("should attempt to set scrollTop on the document body and documentElement", () => {
    setScrollParam({ axis: "y", parent: null, distance: 200 });
    // Assert that the setters were called with the correct value
    expect(bodyScrollTopSpy).toHaveBeenCalledWith(200);
    expect(docElScrollTopSpy).toHaveBeenCalledWith(200);
  });

  it("should attempt to set scrollLeft on the document body and documentElement", () => {
    setScrollParam({ axis: "x", parent: null, distance: 250 });

    expect(bodyScrollLeftSpy).toHaveBeenCalledWith(250);
    expect(docElScrollLeftSpy).toHaveBeenCalledWith(250);
  });
});
