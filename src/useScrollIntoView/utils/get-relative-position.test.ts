import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { getRelativePosition } from "./get-relative-position";

// Helper function to set styles
const setStyles = (
  element: HTMLElement,
  styles: Partial<CSSStyleDeclaration>
) => {
  Object.assign(element.style, styles);
};

describe("getRelativePosition", () => {
  let parent: HTMLElement;
  let target: HTMLElement;

  beforeEach(() => {
    // Set up DOM elements for testing
    parent = document.createElement("div");
    target = document.createElement("div");

    setStyles(parent, {
      position: "relative",
      width: "300px",
      height: "300px",
      overflow: "scroll", // Important for getBoundingClientRect relative to viewport
      boxSizing: "border-box", // Add border-box
    });

    setStyles(target, {
      position: "absolute",
      width: "50px",
      height: "50px",
      backgroundColor: "red", // For visualization if needed
      boxSizing: "border-box", // Add border-box
    });

    parent.appendChild(target);
    document.body.appendChild(parent);

    // Reset scroll positions
    parent.scrollTop = 0;
    parent.scrollLeft = 0;
    window.scrollTo(0, 0);

    // Mock getBoundingClientRect for consistent results
    // Note: Vitest browser mode uses actual browser APIs, but mocking
    // can sometimes simplify testing complex layout scenarios.
    // Here, we'll rely on the actual browser rendering within the test runner.
    // Ensure the test runner window is large enough or adjust dimensions.

    // Position parent relative to viewport (adjust if needed based on test runner)
    setStyles(document.body, { margin: "0", padding: "0" });
    setStyles(parent, { top: "50px", left: "50px" }); // Parent starts 50px from viewport top/left

    // Initial target position within parent
    setStyles(target, { top: "100px", left: "100px" }); // Target starts 100px from parent top/left
  });

  afterEach(() => {
    // Clean up DOM
    // Only remove parent if it's still attached to the body
    if (document.body.contains(parent)) {
      document.body.removeChild(parent);
    }
    // Ensure target is removed if it was added directly to body in window scroll tests
    if (document.body.contains(target)) {
      document.body.removeChild(target);
    }
    document.body.style.margin = "";
    document.body.style.padding = "";
  });

  // --- Tests with Custom Parent ---

  it("should calculate position for y-axis, start alignment", () => {
    const position = getRelativePosition({
      axis: "y",
      target,
      parent,
      alignment: "start",
      offset: 0,
      isList: false,
    });
    // Target top (100) - parent top (relative to itself, 0) - offset (0) = 100
    expect(position).toBeCloseTo(100);
  });

  it("should calculate position for y-axis, start alignment with offset", () => {
    const position = getRelativePosition({
      axis: "y",
      target,
      parent,
      alignment: "start",
      offset: 10,
      isList: false,
    });
    // Target top (100) - parent top (0) - offset (10) = 90
    expect(position).toBeCloseTo(90);
  });

  it("should calculate position for y-axis, end alignment", () => {
    const position = getRelativePosition({
      axis: "y",
      target,
      parent,
      alignment: "end",
      offset: 0,
      isList: false,
    });
    // Target top (100) + offset (0) - parent height (300) + target height (50) = -150
    expect(position).toBeCloseTo(-150);
  });

  it("should calculate position for y-axis, end alignment with offset", () => {
    const position = getRelativePosition({
      axis: "y",
      target,
      parent,
      alignment: "end",
      offset: 20,
      isList: false,
    });
    // Target top (100) + offset (20) - parent height (300) + target height (50) = -130
    expect(position).toBeCloseTo(-130);
  });

  it("should calculate position for y-axis, center alignment", () => {
    const position = getRelativePosition({
      axis: "y",
      target,
      parent,
      alignment: "center",
      offset: 0, // Offset ignored for center
      isList: false,
    });
    // Target top (100) - parent height (300) / 2 + target height (50) / 2 = 100 - 150 + 25 = -25
    expect(position).toBeCloseTo(-25);
  });

  it("should calculate position for x-axis, start alignment", () => {
    const position = getRelativePosition({
      axis: "x",
      target,
      parent,
      alignment: "start",
      offset: 0,
      isList: false,
    });
    // Target left (100) - parent left (0) - offset (0) = 100
    expect(position).toBeCloseTo(100);
  });

  it("should calculate position for x-axis, end alignment", () => {
    const position = getRelativePosition({
      axis: "x",
      target,
      parent,
      alignment: "end",
      offset: 0,
      isList: false,
    });
    // Target left (100) + offset (0) - parent width (300) + target width (50) = -150
    expect(position).toBeCloseTo(-150);
  });

  it("should calculate position for x-axis, center alignment", () => {
    const position = getRelativePosition({
      axis: "x",
      target,
      parent,
      alignment: "center",
      offset: 0,
      isList: false,
    });
    // Target left (100) - parent width (300) / 2 + target width (50) / 2 = 100 - 150 + 25 = -25
    expect(position).toBeCloseTo(-25);
  });

  it("should return 0 if target is already aligned (start)", () => {
    setStyles(target, { top: "0px", left: "0px" });
    const positionY = getRelativePosition({
      axis: "y",
      target,
      parent,
      alignment: "start",
      offset: 0,
      isList: false,
    });
    const positionX = getRelativePosition({
      axis: "x",
      target,
      parent,
      alignment: "start",
      offset: 0,
      isList: false,
    });
    expect(positionY).toBeCloseTo(0);
    expect(positionX).toBeCloseTo(0);
  });

  it("should return 0 if target is already aligned (start) with offset", () => {
    setStyles(target, { top: "10px", left: "10px" }); // Target starts at the offset position
    const positionY = getRelativePosition({
      axis: "y",
      target,
      parent,
      alignment: "start",
      offset: 10,
      isList: false,
    });
    const positionX = getRelativePosition({
      axis: "x",
      target,
      parent,
      alignment: "start",
      offset: 10,
      isList: false,
    });
    expect(positionY).toBeCloseTo(0);
    expect(positionX).toBeCloseTo(0);
  });

  // --- Tests without Custom Parent (using document.body/window) ---
  // Note: These rely heavily on the viewport size of the test runner.

  it("should calculate position for y-axis, start alignment (window scroll)", () => {
    // Position target absolutely relative to body
    setStyles(target, { position: "absolute", top: "600px", left: "100px" });
    document.body.appendChild(target); // Append directly to body
    parent.remove(); // Remove the custom parent

    const position = getRelativePosition({
      axis: "y",
      target,
      parent: null, // Use window
      alignment: "start",
      offset: 0,
      isList: false,
    });
    // Target top relative to viewport (600) - offset (0)
    // This assumes window scrollY is 0 initially.
    expect(position).toBeCloseTo(600);
  });

  it("should calculate position for y-axis, center alignment (window scroll)", () => {
    setStyles(target, { position: "absolute", top: "600px", left: "100px" });
    document.body.appendChild(target);
    parent.remove();

    const position = getRelativePosition({
      axis: "y",
      target,
      parent: null,
      alignment: "center",
      offset: 0,
      isList: false,
    });
    // Target top (600) - window.innerHeight / 2 + target height (50) / 2
    const expected = 600 - window.innerHeight / 2 + 25;
    expect(position).toBeCloseTo(expected);
  });

  // --- Tests with isList ---
  // The isList logic prevents scrolling if the item is partially visible at the edges

  it("should return 0 for start alignment when target top is slightly visible (isList=true)", () => {
    setStyles(target, { top: "5px" }); // Target top is at 5px, slightly inside parent
    const position = getRelativePosition({
      axis: "y",
      target,
      parent,
      alignment: "start",
      offset: 0,
      isList: true, // List behavior
    });
    // diff (5) <= targetSize (50) * factor (0) is false.
    expect(position).toBeCloseTo(0);
  });

  it("should scroll for start alignment when target top is outside (isList=true)", () => {
    setStyles(target, { top: "-10px" }); // Target top is outside parent top
    const position = getRelativePosition({
      axis: "y",
      target,
      parent,
      alignment: "start",
      offset: 0,
      isList: true,
    });
    // diff (-10) - offset (0) = -10
    expect(position).toBeCloseTo(-10);
  });

  it("should return 0 for end alignment when target bottom is slightly visible (isList=true)", () => {
    // Position target near the bottom: parentHeight (300) - targetHeight (50) - 5px = 245px
    setStyles(target, { top: "245px" });
    const position = getRelativePosition({
      axis: "y",
      target,
      parent,
      alignment: "end",
      offset: 0,
      isList: true,
    });
    // diff (245) + offset (0) - parentSize (300) + targetSize (50) = -5
    // distance (-5) >= -targetSize (50) * factor (0) is false.
    // !isList is false.
    // So, shouldScroll is false. The function should return 0.
    expect(position).toBeCloseTo(0); // Update expectation from -5 to 0
  });

  it("should scroll for end alignment when target bottom is outside (isList=true)", () => {
    // Position target so its bottom is outside: parentHeight (300) + 10px = 310px top
    setStyles(target, { top: "310px" });
    const position = getRelativePosition({
      axis: "y",
      target,
      parent,
      alignment: "end",
      offset: 0,
      isList: true,
    });
    // diff (310) + offset (0) - parentSize (300) + targetSize (50) = 60
    // Expectation remains 60, check if removing border fixed it.
    expect(position).toBeCloseTo(60);
  });

  // --- Edge Cases ---

  it("should return 0 if target is null", () => {
    const position = getRelativePosition({
      axis: "y",
      target: null,
      parent,
      alignment: "start",
      offset: 0,
      isList: false,
    });
    expect(position).toBe(0);
  });
});
