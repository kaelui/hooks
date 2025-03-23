import { useEffect } from "react";
import { useDidUpdate } from "#useDidUpdate";

/**
 * A custom hook for component lifecycle logging.
 *
 * This hook logs when a component is mounted, updated, and unmounted.
 * It uses the console to output messages that include the component's name
 * and any props that were passed to the hook.
 *
 * @param componentName - The name of the component to be used in log messages.
 * @param props - An array of props or values to be logged on mount and updates.
 * @returns Always returns null.
 *
 * @example
 * ```tsx
 * function MyComponent(props) {
 *   useLogger('MyComponent', [props.id, props.name]);
 *   // rest of component
 * }
 * ```
 */
export function useLogger(componentName: string, props: unknown[]) {
  useEffect(() => {
    console.log(`${componentName} mounted`, ...props);
    return () => console.log(`${componentName} unmounted`);
  }, []);

  useDidUpdate(() => {
    console.log(`${componentName} updated`, ...props);
  }, props);

  return null;
}
