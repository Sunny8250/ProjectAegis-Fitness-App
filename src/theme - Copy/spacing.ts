/**
 * Spacing tokens based on the Project Aegis 8-point grid.
 */
export const spacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
  xxxl: 48,
  huge: 64,
} as const;

/**
 * Semantic layout spacing aliases for common screen and section structure.
 */
export const layoutSpacing = {
  screenPadding: spacing.md,
  cardPadding: spacing.md,
  section: spacing.lg,
  sectionLarge: spacing.xl,
} as const;
