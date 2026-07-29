import { StyleSheet } from 'react-native';

import type { AegisTheme } from '@/theme/themes';

/** Creates theme-aware styles for the Screen layout primitive. */
export function createScreenStyles(theme: AegisTheme) {
  return StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      flex: 1,
      paddingHorizontal: theme.layoutSpacing.screenPadding,
      paddingVertical: theme.layoutSpacing.screenPadding,
    },
    scroll: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollContent: {
      flexGrow: 1,
      paddingHorizontal: theme.layoutSpacing.screenPadding,
      paddingVertical: theme.layoutSpacing.screenPadding,
    },
  });
}
