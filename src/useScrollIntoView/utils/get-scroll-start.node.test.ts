import { describe, it, expect } from "vitest";
import { getScrollStart } from "./get-scroll-start";

describe("getScrollStart in Node environment", () => {
  it("should return 0 when parent is null and document is undefined", () => {
    // In a Node environment, `document` is naturally undefined.
    expect(getScrollStart({ axis: "y", parent: null })).toBe(0);
    expect(getScrollStart({ axis: "x", parent: null })).toBe(0);
  });
});
