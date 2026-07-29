import { StyleSheet } from 'react-native';

import type { AegisTheme } from '@/theme/themes';

/** Creates theme-aware styles for EmptyState layout and spacing. */
export function createEmptyStateStyles(theme: AegisTheme) {
  return StyleSheet.create({
    root: {
      alignItems: 'center',
      justifyContent: 'center',
      gap: theme.spacing.md,
      paddingHorizontal: theme.layoutSpacing.screenPadding,
      paddingVertical: theme.layoutSpacing.section,
    },
    fullscreen: {
      flex: 1,
      alignSelf: 'stretch',
    },
    icon: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: theme.spacing.xs,
    },
    textGroup: {
      alignItems: 'center',
      gap: theme.spacing.xs,
    },
    description: {
      maxWidth: theme.spacing.huge * theme.spacing.xs,
    },
    action: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: theme.spacing.xs,
    },
  });
}
