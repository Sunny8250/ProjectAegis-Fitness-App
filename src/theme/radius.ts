import { scaleTokenMap, type ResponsiveMetrics } from "./responsive";

/**
 * Project Aegis — Border Radius Tokens
 *
 * Used consistently across all components for a cohesive,
 * friendly but precise visual language.
 *
 * The exported constants are the design baseline. `createRadius` derives the
 * viewport-scaled set the runtime theme actually uses.
 */
export const radius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  full: 999,
  button: 12,
  card: 16,
  cardElevated: 20,
  input: 12,
  bottomSheet: 24,
  pill: 999,
  avatar: 999,
  icon: 10,
} as const;

/**
 * Fully-round sentinels. These are "as round as possible" markers rather than
 * measurements, so scaling them would be meaningless.
 */
const UNSCALED_RADIUS_KEYS: ReadonlySet<string> = new Set([
  "full",
  "pill",
  "avatar",
]);

/** Radius scale shape, with values widened for viewport scaling. */
export type RadiusTokens = Record<keyof typeof radius, number>;

/** Derives the radius scale for a viewport. */
export const createRadius = (metrics: ResponsiveMetrics): RadiusTokens =>
  scaleTokenMap(radius, metrics.scaleSize, UNSCALED_RADIUS_KEYS);
