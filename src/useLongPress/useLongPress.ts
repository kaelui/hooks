import React from "react";

type LongPressEvent = React.MouseEvent | React.TouchEvent;

interface LongPressOptions {
  /** Duration in milliseconds to trigger long press (default: 400ms) */
  threshold?: number;
  /** Callback fired when press begins */
  onStart?: (event: LongPressEvent) => void;
  /** Callback fired when long press completes successfully */
  onFinish?: (event: LongPressEvent) => void;
  /** Callback fired when press is cancelled before threshold */
  onCancel?: (event: LongPressEvent) => void;
}

interface UseLongPressReturn {
  onMouseDown?: (event: React.MouseEvent) => void;
  onMouseUp?: (event: React.MouseEvent) => void;
  onMouseLeave?: (event: React.MouseEvent) => void;
  onTouchStart?: (event: React.TouchEvent) => void;
  onTouchEnd?: (event: React.TouchEvent) => void;
}

function isMouseEvent(event: LongPressEvent): event is React.MouseEvent {
  return event.nativeEvent instanceof MouseEvent;
}

function isTouchEvent(event: LongPressEvent): event is React.TouchEvent {
  return window.TouchEvent
    ? event.nativeEvent instanceof TouchEvent
    : "touches" in event.nativeEvent;
}

/**
 * A React hook that detects long press gestures on mouse and touch events.
 *
 * This hook provides event handlers for detecting when a user presses and holds
 * on an element for a specified duration. It supports both mouse and touch events
 * and provides callbacks for different stages of the long press interaction.
 *
 * @param callback - The function to execute when a long press is detected (after threshold is met)
 * @param options - Configuration options for the long press behavior:
 * @returns Event handlers object containing mouse and touch event handlers
 *
 * @example
 * ```tsx
 * const longPressHandlers = useLongPress(
 *   () => console.log('Long pressed!'),
 *   {
 *     threshold: 500,
 *     onStart: () => console.log('Press started'),
 *     onCancel: () => console.log('Press cancelled')
 *   }
 * );
 *
 * return <button {...longPressHandlers}>Hold me</button>;
 * ```
 */
export function useLongPress(
  callback: ((event: LongPressEvent) => void) | undefined,
  options: LongPressOptions = {}
): UseLongPressReturn {
  const { threshold = 400, onStart, onFinish, onCancel } = options;
  const isLongPressActive = React.useRef(false);
  const isPressed = React.useRef(false);
  const timerId = React.useRef<NodeJS.Timeout | null>(null);

  // Cleanup timer on unmount
  React.useEffect(() => {
    return () => {
      if (timerId.current) {
        window.clearTimeout(timerId.current);
        timerId.current = null;
      }
    };
  }, []);

  return React.useMemo(() => {
    if (typeof callback !== "function") {
      return {};
    }

    const start = (event: LongPressEvent) => {
      if (!isMouseEvent(event) && !isTouchEvent(event)) return;

      if (onStart) {
        onStart(event);
      }

      isPressed.current = true;
      timerId.current = setTimeout(() => {
        callback(event);
        isLongPressActive.current = true;
      }, threshold);
    };

    const cancel = (event: LongPressEvent) => {
      if (!isMouseEvent(event) && !isTouchEvent(event)) return;

      if (isLongPressActive.current) {
        if (onFinish) {
          onFinish(event);
        }
      } else if (isPressed.current) {
        if (onCancel) {
          onCancel(event);
        }
      }

      isLongPressActive.current = false;
      isPressed.current = false;

      if (timerId.current) {
        window.clearTimeout(timerId.current);
        timerId.current = null;
      }
    };

    const mouseHandlers = {
      onMouseDown: start,
      onMouseUp: cancel,
      onMouseLeave: cancel,
    };

    const touchHandlers = {
      onTouchStart: start,
      onTouchEnd: cancel,
    };

    return {
      ...mouseHandlers,
      ...touchHandlers,
    };
  }, [callback, threshold, onCancel, onFinish, onStart]);
}
