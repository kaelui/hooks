import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useLogger } from "./useLogger";

describe("useLogger", () => {
  const originalConsoleLog = console.log;
  let consoleLogSpy: ReturnType<typeof vi.spyOn>;

  beforeAll(() => {
    console.log = vi.fn();
    consoleLogSpy = vi.spyOn(console, "log");
  });

  beforeEach(() => {
    consoleLogSpy.mockClear();
  });

  afterAll(() => {
    console.log = originalConsoleLog;
  });

  it("should log when component is mounted", () => {
    const componentName = "TestComponent";
    const props = ["prop1", 42];

    renderHook(() => useLogger(componentName, props));

    expect(consoleLogSpy).toHaveBeenCalledWith(
      `${componentName} mounted`,
      ...props
    );
  });

  it("should log when component is unmounted", () => {
    const componentName = "TestComponent";
    const props = ["prop1", 42];

    const { unmount } = renderHook(() => useLogger(componentName, props));

    unmount();

    expect(consoleLogSpy).toHaveBeenCalledWith(`${componentName} unmounted`);
  });

  it("should log when component is updated", () => {
    const componentName = "TestComponent";
    const initialProps = ["initial", 10];

    const { rerender } = renderHook(
      ({ name, props }) => useLogger(name, props),
      {
        initialProps: { name: componentName, props: initialProps },
      }
    );

    const updatedProps = ["updated", 20];
    rerender({ name: componentName, props: updatedProps });

    expect(consoleLogSpy).toHaveBeenCalledWith(
      `${componentName} updated`,
      ...updatedProps
    );
  });

  it("should work with different component names and empty props", () => {
    const componentName = "AnotherComponent";
    const props: unknown[] = [];

    renderHook(() => useLogger(componentName, props));

    expect(consoleLogSpy).toHaveBeenCalledWith(`${componentName} mounted`);
  });
});
