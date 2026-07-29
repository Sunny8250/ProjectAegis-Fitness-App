/**
 * Raw colour palette from the Project Aegis design system.
 */
export const palette = {
  primary: {
    blue: "#2563EB",
    blueDark: "#1D4ED8",
  },
  secondary: {
    emerald: "#10B981",
    amber: "#F59E0B",
    red: "#EF4444",
  },
  neutral: {
    light: {
      background: "#F8FAFC",
      surface: "#FFFFFF",
      border: "#E5E7EB",
      textPrimary: "#111827",
      textSecondary: "#6B7280",
    },
    dark: {
      background: "#0F172A",
      surface: "#1E293B",
      border: "#334155",
      textPrimary: "#F8FAFC",
      textSecondary: "#CBD5E1",
    },
  },
} as const;

/**
 * Semantic colour aliases for app states and feedback.
 */
export const semanticColors = {
  success: palette.secondary.emerald,
  warning: palette.secondary.amber,
  error: palette.secondary.red,
  information: palette.primary.blue,
  disabled: {
    light: palette.neutral.light.textSecondary,
    dark: palette.neutral.dark.textSecondary,
  },
} as const;

/**
 * Common utility colours for borders, overlays, and transparent surfaces.
 */
export const utilityColors = {
  transparent: "transparent",
  white: "#FFFFFF",
  black: "#000000",
  divider: {
    light: palette.neutral.light.border,
    dark: palette.neutral.dark.border,
  },
  overlay: {
    light: "rgba(17, 24, 39, 0.08)",
    dark: "rgba(0, 0, 0, 0.24)",
  },
  backdrop: {
    light: "rgba(15, 23, 42, 0.48)",
    dark: "rgba(0, 0, 0, 0.64)",
  },
} as const;

/**
 * Theme-aware colour tokens consumed by light and dark UI surfaces.
 */
export const colors = {
  light: {
    background: palette.neutral.light.background,
    surface: palette.neutral.light.surface,
    border: palette.neutral.light.border,
    text: {
      primary: palette.neutral.light.textPrimary,
      secondary: palette.neutral.light.textSecondary,
    },
    primary: palette.primary.blue,
    primaryDark: palette.primary.blueDark,
    success: semanticColors.success,
    warning: semanticColors.warning,
    error: semanticColors.error,
    information: semanticColors.information,
    disabled: semanticColors.disabled.light,
    transparent: utilityColors.transparent,
    white: utilityColors.white,
    black: utilityColors.black,
    divider: utilityColors.divider.light,
    overlay: utilityColors.overlay.light,
    backdrop: utilityColors.backdrop.light,
  },
  dark: {
    background: palette.neutral.dark.background,
    surface: palette.neutral.dark.surface,
    border: palette.neutral.dark.border,
    text: {
      primary: palette.neutral.dark.textPrimary,
      secondary: palette.neutral.dark.textSecondary,
    },
    primary: palette.primary.blue,
    primaryDark: palette.primary.blueDark,
    success: semanticColors.success,
    warning: semanticColors.warning,
    error: semanticColors.error,
    information: semanticColors.information,
    disabled: semanticColors.disabled.dark,
    transparent: utilityColors.transparent,
    white: utilityColors.white,
    black: utilityColors.black,
    divider: utilityColors.divider.dark,
    overlay: utilityColors.overlay.dark,
    backdrop: utilityColors.backdrop.dark,
  },
} as const;
