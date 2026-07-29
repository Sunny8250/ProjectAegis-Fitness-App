/**
 * Font family tokens for Project Aegis text rendering.
 */
export const fontFamilies = {
  preferred: "Inter",
  fallback: "System",
} as const;

/**
 * Font size tokens from the Project Aegis type scale.
 */
export const fontSizes = {
  display: 32,
  heading1: 28,
  heading2: 24,
  heading3: 20,
  title: 18,
  body: 16,
  caption: 14,
  small: 12,
} as const;

/**
 * Font weight tokens used by the Project Aegis text styles.
 */
export const fontWeights = {
  regular: "400",
  medium: "500",
  semiBold: "600",
  bold: "700",
} as const;

/**
 * Line height tokens using the design system's approximate 1.4x ratio.
 */
export const lineHeights = {
  display: 45,
  heading1: 39,
  heading2: 34,
  heading3: 28,
  title: 25,
  body: 22,
  caption: 20,
  small: 17,
} as const;

/**
 * Letter spacing tokens for consistent text rendering.
 */
export const letterSpacing = {
  none: 0,
} as const;

/**
 * Reusable text style tokens for applying the Project Aegis type scale.
 */
export const textStyles = {
  display: {
    fontSize: fontSizes.display,
    lineHeight: lineHeights.display,
    fontWeight: fontWeights.bold,
    letterSpacing: letterSpacing.none,
  },
  heading1: {
    fontSize: fontSizes.heading1,
    lineHeight: lineHeights.heading1,
    fontWeight: fontWeights.bold,
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
    fontWeight: fontWeights.semiBold,
    letterSpacing: letterSpacing.none,
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
} as const;

/**
 * Backward-compatible typography export containing the app's text styles.
 */
export const typography = textStyles;
