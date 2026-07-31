import { scaleTokenMap, type ResponsiveMetrics } from "./responsive";

/**
 * Project Aegis — Spacing Tokens
 *
 * 8-point grid system. Every value is a multiple of 4, aligned to 8 for
 * common use-cases. Used for padding, margins, gaps, and sizing.
 *
 * The exported constants are the design baseline. `createSpacing` derives the
 * viewport-scaled set the runtime theme actually uses.
 */
export const spacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 40,
  huge: 48,
  massive: 64,
} as const;

export const layoutSpacing = {
  screenPadding: spacing.md,
  cardPadding: spacing.md,
  section: spacing.lg,
  sectionLarge: spacing.xl,
} as const;

/** Spacing scale shape, with values widened for viewport scaling. */
export type SpacingTokens = Record<keyof typeof spacing, number>;

/** Layout spacing shape, with values widened for viewport scaling. */
export type LayoutSpacingTokens = Record<keyof typeof layoutSpacing, number>;

/** Derives the spacing scale for a viewport. */
export const createSpacing = (metrics: ResponsiveMetrics): SpacingTokens =>
  scaleTokenMap(spacing, metrics.scaleSize);

/** Derives layout spacing from an already-scaled spacing scale. */
export const createLayoutSpacing = (
  scaledSpacing: SpacingTokens,
): LayoutSpacingTokens => ({
  screenPadding: scaledSpacing.md,
  cardPadding: scaledSpacing.md,
  section: scaledSpacing.lg,
  sectionLarge: scaledSpacing.xl,
});
