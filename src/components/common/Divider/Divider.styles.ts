import { StyleSheet, type ColorValue } from 'react-native';

import type { AegisTheme } from '@/theme/themes';

import type { DividerInset, DividerOrientation } from './Divider.types';

const resolveInset = (theme: AegisTheme, inset: DividerInset) => {
  switch (inset) {
    case 'small':
      return theme.spacing.sm;
    case 'medium':
      return theme.spacing.md;
    case 'large':
      return theme.spacing.lg;
    case 'none':
    default:
      return 0;
  }
};

/** Creates theme-aware styles for divider orientation, inset, thickness, and color. */
export function createDividerStyles(
  theme: AegisTheme,
  orientation: DividerOrientation,
  inset: DividerInset,
  thickness: number,
  color?: ColorValue,
) {
  const insetSize = resolveInset(theme, inset);
  const backgroundColor = color ?? theme.colors.border;

  return StyleSheet.create({
    root: {
      backgroundColor,
    },
    line: orientation === 'horizontal'
      ? {
          height: thickness,
          marginHorizontal: insetSize,
          alignSelf: 'stretch',
        }
      : {
          width: thickness,
          marginVertical: insetSize,
          alignSelf: 'stretch',
        },
  });
}
