/**
 * Project Aegis — New Colour Palette
 *
 * Deep Teal primary + Warm Amber accent — distinct, ownable, premium.
 * Every colour is a semantic token; no raw hex escapes into components.
 */
export const palette = {
  primary: {
    DEFAULT: "#0D9488",
    light: "#14B8A6",
    dark: "#0F766E",
  },
  secondary: {
    amber: "#F59E0B",
    amberLight: "#FDE68A",
    indigo: "#4F46E5",
    indigoLight: "#E0E7FF",
    emerald: "#10B981",
    emeraldLight: "#D1FAE5",
  },
  neutral: {
    light: {
      background: "#F0F4F8",
      surface: "#FFFFFF",
      border: "#E2E8F0",
      textPrimary: "#0F172A",
      textSecondary: "#64748B",
      textTertiary: "#94A3B8",
      overlay: "rgba(15, 23, 42, 0.04)",
    },
    dark: {
      background: "#0B1120",
      surface: "#172033",
      border: "#1E293B",
      textPrimary: "#F1F5F9",
      textSecondary: "#94A3B8",
      textTertiary: "#64748B",
      overlay: "rgba(255, 255, 255, 0.04)",
    },
  },
} as const;

/** Semantic colour aliases mapped to app states and feedback. */
export const semanticColors = {
  success: palette.secondary.emerald,
  successLight: palette.secondary.emeraldLight,
  warning: palette.secondary.amber,
  warningLight: palette.secondary.amberLight,
  error: "#EF4444",
  errorLight: "#FEE2E2",
  info: palette.primary.DEFAULT,
  infoLight: palette.primary.light,
  disabled: {
    light: palette.neutral.light.textTertiary,
    dark: palette.neutral.dark.textTertiary,
  },
  skeleton: {
    light: "rgba(148, 163, 184, 0.18)",
    dark: "rgba(148, 163, 184, 0.08)",
  },
} as const;

/** Common utility colours. */
export const utilityColors = {
  transparent: "transparent",
  white: "#FFFFFF",
  black: "#000000",
  divider: {
    light: palette.neutral.light.border,
    dark: palette.neutral.dark.border,
  },
  overlay: {
    light: "rgba(15, 23, 42, 0.04)",
    dark: "rgba(255, 255, 255, 0.04)",
  },
  backdrop: {
    light: "rgba(11, 17, 32, 0.6)",
    dark: "rgba(0, 0, 0, 0.8)",
  },
} as const;

/**
 * Light theme colour tokens consumed by every surface.
 */
export const lightColors = {
  background: palette.neutral.light.background,
  surface: palette.neutral.light.surface,
  surfaceVariant: "#F8FAFC",
  border: palette.neutral.light.border,
  text: {
    primary: palette.neutral.light.textPrimary,
    secondary: palette.neutral.light.textSecondary,
    tertiary: palette.neutral.light.textTertiary,
  },
  primary: palette.primary.DEFAULT,
  primaryLight: palette.primary.light,
  primaryDark: palette.primary.dark,
  secondary: palette.secondary.amber,
  secondaryLight: palette.secondary.amberLight,
  accent: palette.secondary.indigo,
  accentLight: palette.secondary.indigoLight,
  success: semanticColors.success,
  successLight: semanticColors.successLight,
  warning: semanticColors.warning,
  warningLight: semanticColors.warningLight,
  error: semanticColors.error,
  errorLight: semanticColors.errorLight,
  info: semanticColors.info,
  infoLight: semanticColors.infoLight,
  /** Alias for `info` — used in legacy quickActions color tokens. */
  information: semanticColors.info,
  disabled: semanticColors.disabled.light,
  skeleton: semanticColors.skeleton.light,
  transparent: utilityColors.transparent,
  white: utilityColors.white,
  black: utilityColors.black,
  divider: utilityColors.divider.light,
  overlay: utilityColors.overlay.light,
  backdrop: utilityColors.backdrop.light,
} as const;

/**
 * Dark theme colour tokens — same semantic names, dark-optimised values.
 */
export const darkColors = {
  background: palette.neutral.dark.background,
  surface: palette.neutral.dark.surface,
  surfaceVariant: "#1E293B",
  border: palette.neutral.dark.border,
  text: {
    primary: palette.neutral.dark.textPrimary,
    secondary: palette.neutral.dark.textSecondary,
    tertiary: palette.neutral.dark.textTertiary,
  },
  primary: palette.primary.DEFAULT,
  primaryLight: palette.primary.light,
  primaryDark: palette.primary.dark,
  secondary: palette.secondary.amber,
  secondaryLight: palette.secondary.amberLight,
  accent: palette.secondary.indigo,
  accentLight: palette.secondary.indigoLight,
  success: semanticColors.success,
  successLight: semanticColors.successLight,
  warning: semanticColors.warning,
  warningLight: semanticColors.warningLight,
  error: semanticColors.error,
  errorLight: semanticColors.errorLight,
  info: semanticColors.info,
  infoLight: semanticColors.infoLight,
  /** Alias for `info` — used in legacy quickActions color tokens. */
  information: semanticColors.info,
  disabled: semanticColors.disabled.dark,
  skeleton: semanticColors.skeleton.dark,
  transparent: utilityColors.transparent,
  white: utilityColors.white,
  black: utilityColors.black,
  divider: utilityColors.divider.dark,
  overlay: utilityColors.overlay.dark,
  backdrop: utilityColors.backdrop.dark,
} as const;

export const colors = {
  light: lightColors,
  dark: darkColors,
} as const;
