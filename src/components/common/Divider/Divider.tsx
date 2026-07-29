import { memo, useMemo } from 'react';
import { View } from 'react-native';

import { useTheme } from '@/theme/useTheme';

import { createDividerStyles } from './Divider.styles';
import type { DividerProps } from './Divider.types';

const DEFAULT_THICKNESS = 1;

/** Decorative themed separator supporting horizontal and vertical layouts. */
function DividerComponent({
  color,
  inset = 'none',
  orientation = 'horizontal',
  style,
  thickness = DEFAULT_THICKNESS,
}: DividerProps) {
  const { theme } = useTheme();
  const styles = useMemo(
    () => createDividerStyles(theme, orientation, inset, thickness, color),
    [color, inset, orientation, theme, thickness],
  );

  return <View accessible={false} style={[styles.root, styles.line, style]} />;
}

export const Divider = memo(DividerComponent);

Divider.displayName = 'Divider';
