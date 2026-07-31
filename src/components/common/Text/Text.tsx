import { useMemo } from 'react';
import { Text as NativeText } from 'react-native';

import { useTheme } from '@/theme/useTheme';

import { createTextStyles } from './Text.styles';
import type { TextProps } from './Text.types';

/**
 * Ceiling on the OS font-size setting. Type still grows for accessibility, but
 * not far enough to burst the fixed-size boxes the design relies on.
 */
const MAX_FONT_SIZE_MULTIPLIER = 1.3;

/** Reusable themed wrapper around React Native's Text component. */
export function Text({
  align,
  color,
  style,
  variant = 'body',
  ...textProps
}: TextProps) {
  const { theme } = useTheme();
  const styles = useMemo(
    () => createTextStyles(theme, variant, color, align),
    [align, color, theme, variant],
  );

  return (
    <NativeText
      maxFontSizeMultiplier={MAX_FONT_SIZE_MULTIPLIER}
      style={[styles.base, style]}
      {...textProps}
    />
  );
}
