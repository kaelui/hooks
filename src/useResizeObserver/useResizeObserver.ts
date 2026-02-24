import { useEffect, useMemo, useRef, useState } from "react";

type ObserverRect = Omit<DOMRectReadOnly, "toJSON">;

const defaultRect: ObserverRect = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};

/**
 * A custom React hook that uses ResizeObserver to track changes in element dimensions.
 *
 * @template T - Type of the HTML element to observe, defaults to HTMLElement
 * @param options - Optional ResizeObserver configuration options
 * @returns A tuple containing:
 *  - A React ref object to attach to the element to observe
 *  - The current dimensions (rect) of the observed element
 *
 * @example
 * ```tsx
 * function Component() {
 *   const [ref, rect] = useResizeObserver<HTMLDivElement>();
 *
 *   return (
 *     <div ref={ref}>
 *       Current width: {rect.width}px, height: {rect.height}px
 *     </div>
 *   );
 * }
 * ```
 */
export const useResizeObserver = <T extends HTMLElement = HTMLElement>(
  options?: ResizeObserverOptions
): readonly [React.RefObject<T | null>, ObserverRect] => {
  const frameID = useRef(0);
  const ref = useRef<T>(null);

  const [rect, setRect] = useState<ObserverRect>(defaultRect);

  const observer = useMemo(() => {
    if (typeof window === "undefined") return null;

    return new ResizeObserver(([entry]) => {
      if (!entry) return;

      // Cancel any pending animation frames to prevent multiple updates queuing up
      // during rapid resize events. This ensures only the latest size is processed.
      cancelAnimationFrame(frameID.current);

      frameID.current = requestAnimationFrame(() => {
        if (ref.current) {
          setRect(entry.contentRect);
        }
      });
    });
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: "We intentionally want to observe the element whenever the ref changes, and we want to ensure that the observer is properly cleaned up on unmount. The observer instance itself is memoized and won't change, so we don't need to include it in the dependencies."
  useEffect(() => {
    if (ref.current) {
      observer?.observe(ref.current, options);
    }

    return () => {
      observer?.disconnect();

      if (frameID.current) {
        cancelAnimationFrame(frameID.current);
      }
    };
  }, [ref.current]);

  return [ref, rect] as const;
};

/**
 * A hook that returns the width and height of an element along with a ref to that element.
 * The hook uses ResizeObserver internally to track changes to the element's dimensions.
 *
 * @template T - The type of HTMLElement to observe. Defaults to HTMLElement.
 * @param options - Optional ResizeObserver options.
 * @returns An object containing:
 *   - ref: A React ref object to attach to the element you want to observe
 *   - width: The current width of the observed element in pixels
 *   - height: The current height of the observed element in pixels
 *
 * @example
 * ```tsx
 * const { ref, width, height } = useElementSize<HTMLDivElement>();
 *
 * return (
 *   <div ref={ref}>
 *     This element's dimensions: {width}px × {height}px
 *   </div>
 * );
 * ```
 */
export const useElementSize = <T extends HTMLElement = HTMLElement>(
  options?: ResizeObserverOptions
): {
  ref: React.RefObject<T | null>;
  width: number;
  height: number;
} => {
  const [ref, { width, height }] = useResizeObserver<T>(options);
  return { ref, width, height };
};
