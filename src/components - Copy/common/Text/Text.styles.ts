import { StyleSheet } from 'react-native';

import type { AegisTheme } from '@/theme/themes';

import type { FlatTextColorToken, TextAlign, TextColorToken, TextVariant } from './Text.types';

const defaultColorToken = 'text.primary' satisfies TextColorToken;

const resolveTextColor = (theme: AegisTheme, color: TextColorToken) => {
  if (color.startsWith('text.')) {
    const textColor = color.replace('text.', '') as keyof AegisTheme['colors']['text'];
    return theme.colors.text[textColor];
  }

  return theme.colors[color as FlatTextColorToken];
};

/** Creates theme-aware styles for the Text primitive. */
export function createTextStyles(
  theme: AegisTheme,
  variant: TextVariant,
  color: TextColorToken = defaultColorToken,
  align?: TextAlign,
) {
  return StyleSheet.create({
    base: {
      ...theme.typography[variant],
      color: resolveTextColor(theme, color),
      textAlign: align,
    },
  });
}
