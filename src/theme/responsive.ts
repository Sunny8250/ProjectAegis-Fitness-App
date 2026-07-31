/**
 * Project Aegis — Responsive Metrics
 *
 * The design system is authored against a 375dp-wide viewport. These helpers
 * scale tokens *down* on narrower devices and never up: both scales are capped
 * at 1, so any device at or above the baseline renders exactly as designed.
 *
 * Layout and typography use separate curves. Layout tracks viewport width
 * directly, while type follows a damped curve so text stays legible on the
 * narrowest handsets instead of collapsing proportionally.
 */

/** Viewport width the design system is authored against. */
export const BASE_WIDTH = 375;

/** Viewport height the design system is authored against. */
export const BASE_HEIGHT = 812;

/** Viewport-width breakpoints, in dp. */
export const breakpoints = {
  /** Very narrow handsets, e.g. the 320dp iPhone SE. */
  compact: 360,
  /** The design baseline. At or above this width nothing is scaled. */
  regular: BASE_WIDTH,
  /** Large handsets. */
  wide: 414,
  /** Tablets and desktop-class viewports. */
  tablet: 768,
} as const;

/** Floors that stop tokens shrinking past the point of legibility. */
const MIN_UI_SCALE = 0.85;
const MIN_TYPE_SCALE = 0.88;

/** Shared ceiling. Capping both scales at 1 is what makes scaling shrink-only. */
const MAX_SCALE = 1;

/** Type shrinks at half the rate of layout, so copy stays readable. */
const TYPE_SCALE_DAMPING = 0.5;

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

/** A value per breakpoint tier, resolved by {@link ResponsiveMetrics.select}. */
export type ResponsiveValues<T> = {
  /** Used below {@link breakpoints.compact}. */
  compact?: T;
  /** Used below {@link breakpoints.regular}. */
  small?: T;
  /** Used at or above {@link breakpoints.tablet}. */
  tablet?: T;
  /** Used when no narrower tier matches. */
  default: T;
};

/** Viewport-derived scaling helpers shared by every themed surface. */
export type ResponsiveMetrics = {
  width: number;
  height: number;
  /** Viewport is narrower than {@link breakpoints.compact}. */
  isCompact: boolean;
  /** Viewport is narrower than the design baseline. */
  isSmallScreen: boolean;
  /** Viewport is at least {@link breakpoints.tablet} wide. */
  isTablet: boolean;
  isLandscape: boolean;
  /** Multiplier applied to spacing, radii, and fixed box sizes. */
  uiScale: number;
  /** Multiplier applied to font sizes and line heights. */
  typeScale: number;
  /** Scales a layout dimension to the current viewport. */
  scaleSize: (size: number) => number;
  /** Scales a typographic dimension to the current viewport. */
  scaleFont: (size: number) => number;
  /** Picks the value matching the current breakpoint tier. */
  select: <T>(values: ResponsiveValues<T>) => T;
};

/**
 * Builds the scaling helpers for a viewport.
 *
 * Falls back to the baseline when given a non-positive dimension, which can
 * happen on the very first measurement pass.
 */
export function createResponsiveMetrics(
  width: number,
  height: number,
): ResponsiveMetrics {
  const safeWidth = width > 0 ? width : BASE_WIDTH;
  const safeHeight = height > 0 ? height : BASE_HEIGHT;

  const widthRatio = safeWidth / BASE_WIDTH;
  const uiScale = clamp(widthRatio, MIN_UI_SCALE, MAX_SCALE);
  const typeScale = clamp(
    1 + (widthRatio - 1) * TYPE_SCALE_DAMPING,
    MIN_TYPE_SCALE,
    MAX_SCALE,
  );

  const isCompact = safeWidth < breakpoints.compact;
  const isSmallScreen = safeWidth < breakpoints.regular;
  const isTablet = safeWidth >= breakpoints.tablet;

  return {
    width: safeWidth,
    height: safeHeight,
    isCompact,
    isSmallScreen,
    isTablet,
    isLandscape: safeWidth > safeHeight,
    uiScale,
    typeScale,
    scaleSize: (size: number) => Math.round(size * uiScale),
    scaleFont: (size: number) => Math.round(size * typeScale),
    select: <T,>(values: ResponsiveValues<T>): T => {
      if (isTablet && values.tablet !== undefined) return values.tablet;
      if (isCompact && values.compact !== undefined) return values.compact;
      if (isSmallScreen && values.small !== undefined) return values.small;
      return values.default;
    },
  };
}

/** Metrics for the design baseline, where every scale is exactly 1. */
export const baselineMetrics = createResponsiveMetrics(BASE_WIDTH, BASE_HEIGHT);

/**
 * Applies a scale function to every value in a flat token map, optionally
 * leaving listed keys untouched for sentinel values that are not measurements.
 */
export function scaleTokenMap<T extends Record<string, number>>(
  tokens: T,
  scale: (value: number) => number,
  unscaledKeys: ReadonlySet<string> = new Set(),
): Record<keyof T, number> {
  const entries = Object.entries(tokens).map(([key, value]) => [
    key,
    unscaledKeys.has(key) ? value : scale(value),
  ]);

  return Object.fromEntries(entries) as Record<keyof T, number>;
}
