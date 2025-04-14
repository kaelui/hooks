/**
 * Easing function that accelerates then decelerates, following a quadratic curve.
 * Provides smooth transitions for animations.
 *
 * @param t - A value between 0 and 1 representing the progress of the animation
 * @returns A transformed value between 0 and 1
 *
 * When t < 0.5, returns 2t² (acceleration phase)
 * When t >= 0.5, returns -1 + (4 - 2t)t (deceleration phase)
 */
export const easeInOutQuad = (t: number) =>
  t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
