import {
  type DependencyList,
  type EffectCallback,
  useEffect,
  useRef,
} from "react";

/**
 * A hook that executes a callback function only after the initial render and when dependencies change.
 * Unlike `useEffect`, it skips the initial render.
 *
 * @param fn - The effect callback function to execute after the component updates
 * @param dependencies - An optional array of dependencies that trigger the effect when changed
 *
 * @example
 * ```tsx
 * // This will only log when count changes, not on initial render
 * useDidUpdate(() => {
 *   console.log('Count changed:', count);
 * }, [count]);
 * ```
 *
 * @returns void
 */
export function useDidUpdate(
  fn: EffectCallback,
  dependencies?: DependencyList
) {
  const mounted = useRef(false);

  useEffect(
    () => () => {
      mounted.current = false;
    },
    []
  );

  useEffect(() => {
    if (mounted.current) {
      return fn();
    }

    mounted.current = true;
    return undefined;
    // biome-ignore lint/correctness/useExhaustiveDependencies: "We intentionally want to allow users to omit dependencies if they choose, just like useEffect"
  }, dependencies);
}
