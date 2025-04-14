/**
 * Parameters for calculating the relative position of an element.
 */
type PositionParams = {
  /** Axis to calculate position for ('x' or 'y') */
  axis: "x" | "y";
  /** Target element to scroll into view */
  target: HTMLElement | null;
  /** Parent container to scroll. If not provided, document.body will be used */
  parent: HTMLElement | null;
  /** Desired alignment of the target within the parent */
  alignment: "start" | "end" | "center";
  /** Additional offset to apply to the calculated position */
  offset: number;
  /** Indicates if the parent is a list container */
  isList: boolean;
};

type AxisData = {
  diff: number;
  targetSize: number;
  parentSize: number;
};

/**
 * Calculates axis-specific data needed for scroll positioning.
 *
 * @param axis - The axis to calculate data for, either "x" or "y"
 * @param targetPosition - The DOMRect of the target element
 * @param parentPosition - The DOMRect of the parent/container element
 * @param isCustomParent - Boolean indicating if using a custom parent (true) or the window (false)
 * @returns An object containing:
 *   - diff: The positional difference between target and parent
 *   - targetSize: The size of the target element along the specified axis
 *   - parentSize: The size of the parent element or window along the specified axis
 */
const getAxisData = (
  axis: "x" | "y",
  targetPosition: DOMRect,
  parentPosition: DOMRect,
  isCustomParent: boolean
): AxisData => {
  const isYAxis = axis === "y";
  const property = isYAxis ? "top" : "left";
  const diff = targetPosition[property] - parentPosition[property];
  const targetSize = isYAxis ? targetPosition.height : targetPosition.width;

  let customParentSize;
  if (isYAxis) {
    customParentSize = parentPosition.height;
  } else {
    customParentSize = parentPosition.width;
  }

  let windowSize;
  if (isYAxis) {
    windowSize = window.innerHeight;
  } else {
    windowSize = window.innerWidth;
  }

  const parentSize = isCustomParent ? customParentSize : windowSize;

  return { diff, targetSize, parentSize };
};

/**
 * Calculates the distance to scroll when aligning an element to the "start" of the viewport.
 *
 * @param diff - The difference between the target element's start position and the viewport's start position
 * @param offset - The amount of offset to apply to the scroll position
 * @param targetSize - The size of the target element
 * @param isList - Whether the target is within a list context
 * @returns The distance to scroll (0 if scrolling is not needed)
 */
const calculateStartAlignment = (
  diff: number,
  offset: number,
  targetSize: number,
  isList: boolean
): number => {
  const distance = diff - offset;
  const factor = isList ? 0 : 1;
  const shouldScroll = distance <= targetSize * factor || !isList;
  return shouldScroll ? distance : 0;
};

/**
 * Calculates the position adjustment needed when using 'end' alignment.
 *
 * @param diff - The difference in position between the target and its parent
 * @param offset - Additional offset to apply to the calculation
 * @param targetSize - Size of the target element (width or height)
 * @param parentSize - Size of the parent container (width or height)
 * @param isList - Whether the context is a list, which affects the calculation behavior
 * @returns The calculated distance to scroll when using end alignment, or 0 if scrolling is not needed
 */
const calculateEndAlignment = (
  diff: number,
  offset: number,
  targetSize: number,
  parentSize: number,
  isList: boolean
): number => {
  const distance = diff + offset - parentSize + targetSize;
  const factor = isList ? 0 : 1;
  const shouldScroll = distance >= -targetSize * factor || !isList;
  return shouldScroll ? distance : 0;
};

/**
 * Calculates the center alignment of a target element relative to its parent.
 *
 * @param diff - The difference in position between the target and parent (e.g., target.top - parent.top)
 * @param targetSize - The size of the target element (width or height)
 * @param parentSize - The size of the parent element (width or height)
 * @returns The position value that aligns the target at the center of its parent
 */
const calculateCenterAlignment = (
  diff: number,
  targetSize: number,
  parentSize: number
): number => {
  return diff - parentSize / 2 + targetSize / 2;
};

/**
 * Calculates the relative position for scrolling an element into view.
 *
 * @returns {number} The calculated relative position in pixels.
 */
export const getRelativePosition = ({
  axis,
  target,
  parent,
  alignment,
  offset,
  isList,
}: PositionParams): number => {
  if (!target || (!parent && typeof document === "undefined")) {
    return 0;
  }

  const isCustomParent = !!parent;
  const parentElement = parent || document.body;
  const parentPosition = parentElement.getBoundingClientRect();
  const targetPosition = target.getBoundingClientRect();
  const { diff, targetSize, parentSize } = getAxisData(
    axis,
    targetPosition,
    parentPosition,
    isCustomParent
  );

  if (diff === 0) {
    return 0;
  }

  if (alignment === "start") {
    return calculateStartAlignment(diff, offset, targetSize, isList);
  }

  if (alignment === "end") {
    return calculateEndAlignment(diff, offset, targetSize, parentSize, isList);
  }

  if (alignment === "center") {
    return calculateCenterAlignment(diff, targetSize, parentSize);
  }

  return 0;
};
