import { renderHook } from "@testing-library/react";
import { useMounted } from "./use-mounted";

describe("useMounted", () => {
  it("should return true after component renders", () => {
    const { result } = renderHook(() => useMounted());

    // In RTL environment, effects run synchronously after render
    // So the value is already true when we can first access it
    expect(result.current).toBe(true);
  });

  it("should maintain mounted state across rerenders", () => {
    const { result, rerender } = renderHook(() => useMounted());
    expect(result.current).toBe(true);

    // Force a rerender
    rerender();

    // Value should remain true
    expect(result.current).toBe(true);
  });
});
