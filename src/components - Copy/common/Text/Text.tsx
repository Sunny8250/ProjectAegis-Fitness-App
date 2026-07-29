import { useMemo } from 'react';
import { Text as NativeText } from 'react-native';

import { useTheme } from '@/theme/useTheme';

import { createTextStyles } from './Text.styles';
import type { TextProps } from './Text.types';

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

  return <NativeText style={[styles.base, style]} {...textProps} />;
}
