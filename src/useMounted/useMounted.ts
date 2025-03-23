import { useEffect, useState } from "react";

/**
 * A React hook that returns a boolean indicating whether the component is mounted.
 *
 * The hook initializes `mounted` state to `false` and sets it to `true` after the component mounts.
 * This can be useful for avoiding hydration mismatches or conditionally rendering content only on the client side.
 *
 * @returns {boolean} A boolean value indicating whether the component is mounted.
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const isMounted = useMounted();
 *
 *   return (
 *     <div>
 *       {isMounted && <ClientOnlyComponent />}
 *     </div>
 *   );
 * }
 * ```
 */
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
