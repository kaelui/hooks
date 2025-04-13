/**
 * Gets the scroll start position for the given axis and parent element.
 *
 * @returns The scroll start position in pixels.
 *
 * @example
 * // Get vertical scroll position of an element
 * const scrollTop = getScrollStart({ axis: 'y', parent: myElement });
 *
 * @example
 * // Get horizontal scroll position of the document
 * const scrollLeft = getScrollStart({ axis: 'x', parent: null });
 */
export const getScrollStart = ({
  axis,
  parent,
}: {
  /** The axis to get the scroll start for, either "x" or "y". */
  axis: "x" | "y";
  /** The parent element to get the scroll start from. If null, document will be used. */
  parent: HTMLElement | null;
}) => {
  if (!parent && typeof document === "undefined") {
    return 0;
  }

  const method = axis === "y" ? "scrollTop" : "scrollLeft";

  if (parent) {
    return parent[method];
  }

  const { body, documentElement } = document;

  // While one of it has a value the second is equal 0
  return body[method] + documentElement[method];
};
