import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getScrollStart } from "./get-scroll-start";

describe("getScrollStart", () => {
  let parentElement: HTMLDivElement;
  // No need for original scroll values if we mock/restore properly

  beforeEach(() => {
    // Create a parent element with scrollable content
    parentElement = document.createElement("div");
    parentElement.style.width = "100px";
    parentElement.style.height = "100px";
    parentElement.style.overflow = "scroll";

    const content = document.createElement("div");
    content.style.width = "200px";
    content.style.height = "200px";

    parentElement.appendChild(content);
    document.body.appendChild(parentElement);

    // Reset mocks if any were set previously (good practice)
    vi.restoreAllMocks();
  });

  afterEach(() => {
    // Clean up the DOM
    if (parentElement.parentNode === document.body) {
      document.body.removeChild(parentElement);
    }

    // Restore any mocks set during the test
    vi.restoreAllMocks();
  });

  it("should return the correct scrollTop for a parent element", () => {
    parentElement.scrollTop = 50;
    expect(getScrollStart({ axis: "y", parent: parentElement })).toBe(50);
  });

  it("should return the correct scrollLeft for a parent element", () => {
    parentElement.scrollLeft = 30;
    expect(getScrollStart({ axis: "x", parent: parentElement })).toBe(30);
  });

  it("should return the correct scrollTop for the document", () => {
    // Mock documentElement scroll
    vi.spyOn(document.documentElement, "scrollTop", "get").mockImplementation(
      () => 75
    );
    vi.spyOn(document.body, "scrollTop", "get").mockImplementation(() => 0);
    expect(getScrollStart({ axis: "y", parent: null })).toBe(75);
    vi.restoreAllMocks(); // Restore immediately or rely on afterEach

    // Mock body scroll
    vi.spyOn(document.documentElement, "scrollTop", "get").mockImplementation(
      () => 0
    );

    vi.spyOn(document.body, "scrollTop", "get").mockImplementation(() => 85);
    expect(getScrollStart({ axis: "y", parent: null })).toBe(85);
  });

  it("should return the correct scrollLeft for the document", () => {
    // Mock documentElement scroll
    vi.spyOn(document.documentElement, "scrollLeft", "get").mockImplementation(
      () => 65
    );
    vi.spyOn(document.body, "scrollLeft", "get").mockImplementation(() => 0);
    expect(getScrollStart({ axis: "x", parent: null })).toBe(65);
    vi.restoreAllMocks(); // Restore immediately or rely on afterEach

    // Mock body scroll
    vi.spyOn(document.documentElement, "scrollLeft", "get").mockImplementation(
      () => 0
    );
    vi.spyOn(document.body, "scrollLeft", "get").mockImplementation(() => 95);
    expect(getScrollStart({ axis: "x", parent: null })).toBe(95);
  });
});
