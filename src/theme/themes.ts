import {
  DarkTheme as ExpoRouterDarkTheme,
  DefaultTheme as ExpoRouterDefaultTheme,
  type Theme as ExpoRouterTheme,
} from "expo-router";

import { colors } from "./colors";
import { createTypography, fontFamilies, type TypographyTokens } from "./typography";
import {
  createLayoutSpacing,
  createSpacing,
  type LayoutSpacingTokens,
  type SpacingTokens,
} from "./spacing";
import { createRadius, type RadiusTokens } from "./radius";
import { baselineMetrics, type ResponsiveMetrics } from "./responsive";
import { shadows } from "./shadows";

/** User-selectable theme preference. */
export type ThemeMode = "light" | "dark" | "system";

/** Concrete theme variant resolved from the user preference and device setting. */
export type ResolvedThemeMode = Exclude<ThemeMode, "system">;

/** Runtime theme object consumed by every UI surface. */
export type AegisTheme = {
  name: ResolvedThemeMode;
  isDark: boolean;
  colors: (typeof colors)[ResolvedThemeMode];
  spacing: SpacingTokens;
  layoutSpacing: LayoutSpacingTokens;
  typography: TypographyTokens;
  fontFamilies: typeof fontFamilies;
  radius: RadiusTokens;
  shadows: (typeof shadows.card)[ResolvedThemeMode];
  /**
   * Viewport metrics behind the scaled tokens above. Exposed so `createStyles`
   * helpers can make layout decisions without taking extra parameters.
   */
  metrics: ResponsiveMetrics;
  navigation: ExpoRouterTheme;
};

const createNavigationTheme = (
  baseTheme: ExpoRouterTheme,
  colorTokens: AegisTheme["colors"],
): ExpoRouterTheme => ({
  ...baseTheme,
  colors: {
    ...baseTheme.colors,
    primary: colorTokens.primary,
    background: colorTokens.background,
    card: colorTokens.surface,
    text: colorTokens.text.primary,
    border: colorTokens.border,
    notification: colorTokens.error,
  },
});

const baseNavigationThemes = {
  light: ExpoRouterDefaultTheme,
  dark: ExpoRouterDarkTheme,
} as const;

/**
 * Builds the runtime theme for a colour mode and viewport.
 *
 * Colours are viewport-independent; every measurement token is derived from
 * `metrics` so the same design scales down on narrow devices.
 */
export const createTheme = (
  mode: ResolvedThemeMode,
  metrics: ResponsiveMetrics,
): AegisTheme => {
  const colorTokens = colors[mode];
  const scaledSpacing = createSpacing(metrics);

  return {
    name: mode,
    isDark: mode === "dark",
    colors: colorTokens,
    spacing: scaledSpacing,
    layoutSpacing: createLayoutSpacing(scaledSpacing),
    typography: createTypography(metrics),
    fontFamilies,
    radius: createRadius(metrics),
    shadows: shadows.card[mode],
    metrics,
    navigation: createNavigationTheme(baseNavigationThemes[mode], colorTokens),
  };
};

/** Light runtime theme at the design baseline — teal primary + warm amber accent. */
export const lightTheme: AegisTheme = createTheme("light", baselineMetrics);

/** Dark runtime theme at the design baseline — same tokens, darker surfaces. */
export const darkTheme: AegisTheme = createTheme("dark", baselineMetrics);
