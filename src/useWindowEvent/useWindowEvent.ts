import { useEffect } from "react";

// Overload for standard window events
export function useWindowEvent<K extends keyof WindowEventMap>(
  type: K,
  listener: (this: Window, ev: WindowEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions
): void;

// Overload for custom events
export function useWindowEvent(
  type: string,
  listener: EventListenerOrEventListenerObject,
  options?: boolean | AddEventListenerOptions
): void;

/**
 * A custom React hook that adds an event listener to the window object.
 * The event listener is automatically removed when the component unmounts.
 *
 * @param type - The type of event to listen for (e.g., 'resize', 'scroll')
 * @param listener - The event listener callback function
 * @param options - Optional event listener options or boolean specifying if the event should be captured
 *
 * @example
 * ```tsx
 * // Track window resize
 * useWindowEvent('resize', () => {
 *   console.log('Window was resized');
 * });
 *
 * // Track clicks with capture phase
 * useWindowEvent('click', (event) => {
 *   console.log('Clicked at:', event.clientX, event.clientY);
 * }, true);
 * ```
 */
export function useWindowEvent(
  type: string,
  listener: EventListenerOrEventListenerObject,
  options?: boolean | AddEventListenerOptions
): void {
  useEffect(() => {
    window.addEventListener(type, listener, options);
    return () => window.removeEventListener(type, listener, options);
  }, [type, listener, options]);
}
