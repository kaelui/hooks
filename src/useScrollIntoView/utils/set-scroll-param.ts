/**
 * Sets the scroll position of the parent element or document.
 *
 * @returns void
 *
 * @example
 * // Scroll a specific element vertically
 * setScrollParam({ axis: 'y', parent: containerElement, distance: 500 });
 *
 * @example
 * // Scroll the document horizontally
 * setScrollParam({ axis: 'x', parent: null, distance: 200 });
 */
export const setScrollParam = ({
  axis,
  parent,
  distance,
}: {
  /** The axis to set the scroll position for, either "x" or "y". */
  axis: "x" | "y";
  /** The parent element to set the scroll position for. If null, document will be used. */
  parent: HTMLElement | null;
  /** The distance to scroll to (in pixels). */
  distance: number;
}) => {
  if (!parent && typeof document === "undefined") {
    return;
  }

  const method = axis === "y" ? "scrollTop" : "scrollLeft";

  if (parent) {
    parent[method] = distance;
  } else {
    const { body, documentElement } = document;
    body[method] = distance;
    documentElement[method] = distance;
  }
};
