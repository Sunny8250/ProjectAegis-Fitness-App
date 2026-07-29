import { colors, radius, spacing, textStyles } from '@/theme';

export const Colors = colors;
export const Radius = radius;
export const Spacing = {
  one: spacing.xxs,
  two: spacing.xs,
  three: spacing.sm,
  four: spacing.md,
  six: spacing.lg,
  eight: spacing.xl,
  ten: spacing.xxl,
  twelve: spacing.xxxl,
  sixteen: spacing.huge,
} as const;

export const Typography = textStyles;
export const BottomTabInset = 84;
export const MaxContentWidth = 720;
