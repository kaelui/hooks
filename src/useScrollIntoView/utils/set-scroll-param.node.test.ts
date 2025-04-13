import { describe, it, expect } from "vitest";
import { setScrollParam } from "./set-scroll-param";

// This test runs in a Node.js environment where `document` is undefined.
describe("setScrollParam (Node environment)", () => {
  it("should return early and not throw if parent is null and document is undefined", () => {
    // In Node.js, typeof document === 'undefined' is true.
    expect(() => {
      setScrollParam({ axis: "y", parent: null, distance: 100 });
    }).not.toThrow();

    expect(() => {
      setScrollParam({ axis: "x", parent: null, distance: 100 });
    }).not.toThrow();
  });
});
