import { StyleSheet } from 'react-native';

import type { AegisTheme } from '@/theme/themes';

/** Creates theme-aware styles for Loader layout, fullscreen, and overlay states. */
export function createLoaderStyles(theme: AegisTheme) {
  return StyleSheet.create({
    root: {
      alignItems: 'center',
      justifyContent: 'center',
      gap: theme.spacing.sm,
    },
    fullscreen: {
      flex: 1,
      alignSelf: 'stretch',
    },
    overlay: {
      flex: 1,
      alignSelf: 'stretch',
      backgroundColor: theme.colors.backdrop,
    },
  });
}
