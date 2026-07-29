import { StyleSheet } from 'react-native';

import type { AegisTheme } from '@/theme/themes';

const DISABLED_OPACITY = 0.56;

type InputStyleState = {
  disabled: boolean;
  hasError: boolean;
};

/** Creates theme-aware styles for Input labels, container states, and feedback text. */
export function createInputStyles(theme: AegisTheme, state: InputStyleState) {
  return StyleSheet.create({
    root: {
      gap: theme.spacing.xs,
      opacity: state.disabled ? DISABLED_OPACITY : 1,
    },
    labelRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.xxs,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.sm,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: state.hasError ? theme.colors.error : theme.colors.border,
      borderRadius: theme.radius.input,
      backgroundColor: theme.colors.surface,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
    },
    multilineContainer: {
      alignItems: 'flex-start',
    },
    input: {
      flex: 1,
      minWidth: 0,
      color: theme.colors.text.primary,
      ...theme.typography.body,
    },
    accessory: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    feedback: {
      minHeight: theme.typography.caption.lineHeight,
    },
  });
}
