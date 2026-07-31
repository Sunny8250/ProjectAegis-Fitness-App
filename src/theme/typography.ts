import type { TextStyle } from "react-native";

import type { ResponsiveMetrics } from "./responsive";

/**
 * Project Aegis — New Typography Scale
 *
 * Inter (preferred) / System fallback.
 * Each token encodes size, weight, and line-height in one place.
 *
 * The exported constants are the design baseline. `createTypography` derives
 * the viewport-scaled set the runtime theme actually uses.
 */
export const fontFamilies = {
  preferred: "Inter",
  fallback: "System",
} as const;

export const fontSizes = {
  display: 36,
  hero: 32,
  heading1: 26,
  heading2: 22,
  heading3: 18,
  title: 16,
  body: 15,
  callout: 14,
  caption: 13,
  small: 12,
  label: 12,
  button: 15,
  metric: 40,
  metricLabel: 12,
} as const;

export const fontWeights = {
  regular: "400",
  medium: "500",
  semiBold: "600",
  bold: "700",
  heavy: "800",
} as const;

export const lineHeights = {
  display: 44,
  hero: 40,
  heading1: 34,
  heading2: 30,
  heading3: 26,
  title: 24,
  body: 22,
  callout: 20,
  caption: 18,
  small: 16,
  label: 16,
  button: 22,
  metric: 44,
  metricLabel: 16,
} as const;

export const letterSpacing = {
  none: 0,
  tight: -0.5,
  wide: 0.5,
} as const;

/** Complete text style tokens — the single source of truth for typography. */
export const textStyles = {
  display: {
    fontSize: fontSizes.display,
    lineHeight: lineHeights.display,
    fontWeight: fontWeights.bold,
    letterSpacing: letterSpacing.tight,
  },
  hero: {
    fontSize: fontSizes.hero,
    lineHeight: lineHeights.hero,
    fontWeight: fontWeights.bold,
    letterSpacing: letterSpacing.tight,
  },
  heading1: {
    fontSize: fontSizes.heading1,
    lineHeight: lineHeights.heading1,
    fontWeight: fontWeights.semiBold,
    letterSpacing: letterSpacing.none,
  },
  heading2: {
    fontSize: fontSizes.heading2,
    lineHeight: lineHeights.heading2,
    fontWeight: fontWeights.semiBold,
    letterSpacing: letterSpacing.none,
  },
  heading3: {
    fontSize: fontSizes.heading3,
    lineHeight: lineHeights.heading3,
    fontWeight: fontWeights.medium,
    letterSpacing: letterSpacing.tight,
  },
  title: {
    fontSize: fontSizes.title,
    lineHeight: lineHeights.title,
    fontWeight: fontWeights.medium,
    letterSpacing: letterSpacing.none,
  },
  body: {
    fontSize: fontSizes.body,
    lineHeight: lineHeights.body,
    fontWeight: fontWeights.regular,
    letterSpacing: letterSpacing.none,
  },
  callout: {
    fontSize: fontSizes.callout,
    lineHeight: lineHeights.callout,
    fontWeight: fontWeights.regular,
    letterSpacing: letterSpacing.none,
  },
  caption: {
    fontSize: fontSizes.caption,
    lineHeight: lineHeights.caption,
    fontWeight: fontWeights.regular,
    letterSpacing: letterSpacing.none,
  },
  small: {
    fontSize: fontSizes.small,
    lineHeight: lineHeights.small,
    fontWeight: fontWeights.regular,
    letterSpacing: letterSpacing.none,
  },
  label: {
    fontSize: fontSizes.label,
    lineHeight: lineHeights.label,
    fontWeight: fontWeights.medium,
    letterSpacing: letterSpacing.wide,
  },
  button: {
    fontSize: fontSizes.button,
    lineHeight: lineHeights.button,
    fontWeight: fontWeights.semiBold,
    letterSpacing: letterSpacing.none,
  },
  metric: {
    fontSize: fontSizes.metric,
    lineHeight: lineHeights.metric,
    fontWeight: fontWeights.bold,
    letterSpacing: letterSpacing.tight,
  },
  metricLabel: {
    fontSize: fontSizes.metricLabel,
    lineHeight: lineHeights.metricLabel,
    fontWeight: fontWeights.medium,
    letterSpacing: letterSpacing.wide,
  },
} as const;

/** Backward-compatible export. */
export const typography = textStyles;

/** Name of a text style token. */
export type TextStyleName = keyof typeof textStyles;

/**
 * A single text style, with measurements widened for viewport scaling.
 *
 * `fontWeight` is typed against React Native rather than widened to `string`
 * so call sites can keep spreading it straight into a style object.
 */
export type TextStyleToken = {
  fontSize: number;
  lineHeight: number;
  fontWeight: TextStyle["fontWeight"];
  letterSpacing: number;
};

/** Typography scale shape, with values widened for viewport scaling. */
export type TypographyTokens = Record<TextStyleName, TextStyleToken>;

/**
 * Derives the typography scale for a viewport.
 *
 * Only `fontSize` and `lineHeight` scale. Weight is categorical, and letter
 * spacing is already sub-pixel, so scaling it would only add rounding noise.
 */
export const createTypography = (
  metrics: ResponsiveMetrics,
): TypographyTokens => {
  const entries = Object.entries(textStyles).map(([name, style]) => [
    name,
    {
      ...style,
      fontSize: metrics.scaleFont(style.fontSize),
      lineHeight: metrics.scaleFont(style.lineHeight),
    },
  ]);

  return Object.fromEntries(entries) as TypographyTokens;
};
