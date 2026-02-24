import { type UseMediaQueryOptions, useMediaQuery } from "#useMediaQuery";

/**
 * Hook that tracks the user's preference for reduced motion.
 *
 * @param initialValue - Optional boolean value to use when the media query status is loading
 * @param options - Optional configuration options for the media query
 * @returns Boolean indicating whether the user prefers reduced motion
 *
 * @example
 * ```tsx
 * const prefersReducedMotion = useReducedMotion();
 *
 * return (
 *   <div style={{
 *     transition: prefersReducedMotion ? 'none' : 'all 0.3s ease',
 *   }}>
 *     Animated content
 *   </div>
 * );
 * ```
 */
export function useReducedMotion(
  initialValue?: boolean,
  options?: UseMediaQueryOptions
) {
  return useMediaQuery(
    "(prefers-reduced-motion: reduce)",
    initialValue,
    options
  );
}
