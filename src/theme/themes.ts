import {
  DarkTheme as ExpoRouterDarkTheme,
  DefaultTheme as ExpoRouterDefaultTheme,
  type Theme as ExpoRouterTheme,
} from 'expo-router';

import { colors } from './colors';
import { fontFamilies, typography } from './typography';
import { layoutSpacing, spacing } from './spacing';
import { radius } from './radius';
import { shadows } from './shadows';

/** User-selectable theme preference, including automatic system matching. */
export type ThemeMode = 'light' | 'dark' | 'system';

/** Concrete theme variant resolved from the user preference and device setting. */
export type ResolvedThemeMode = Exclude<ThemeMode, 'system'>;

/** Runtime theme object consumed by application UI and navigation chrome. */
export type AegisTheme = {
  name: ResolvedThemeMode;
  isDark: boolean;
  colors: (typeof colors)[ResolvedThemeMode];
  spacing: typeof spacing;
  layoutSpacing: typeof layoutSpacing;
  typography: typeof typography;
  fontFamilies: typeof fontFamilies;
  radius: typeof radius;
  shadows: (typeof shadows.card)[ResolvedThemeMode];
  navigation: ExpoRouterTheme;
};

const createNavigationTheme = (
  baseTheme: ExpoRouterTheme,
  colorTokens: AegisTheme['colors'],
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

/** Light runtime theme composed from Project Aegis design tokens. */
export const lightTheme: AegisTheme = {
  name: 'light',
  isDark: false,
  colors: colors.light,
  spacing,
  layoutSpacing,
  typography,
  fontFamilies,
  radius,
  shadows: shadows.card.light,
  navigation: createNavigationTheme(ExpoRouterDefaultTheme, colors.light),
};

/** Dark runtime theme composed from Project Aegis design tokens. */
export const darkTheme: AegisTheme = {
  name: 'dark',
  isDark: true,
  colors: colors.dark,
  spacing,
  layoutSpacing,
  typography,
  fontFamilies,
  radius,
  shadows: shadows.card.dark,
  navigation: createNavigationTheme(ExpoRouterDarkTheme, colors.dark),
};
