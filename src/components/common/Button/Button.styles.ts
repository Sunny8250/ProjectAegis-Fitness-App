import { StyleSheet } from 'react-native';

import type { TextColorToken } from '@/components/common/Text';
import type { AegisTheme } from '@/theme/themes';

import type { ButtonSize, ButtonVariant } from './Button.types';

type ButtonState = {
  disabled: boolean;
  fullWidth: boolean;
  pressed: boolean;
};

const sizeStyles = (theme: AegisTheme, size: ButtonSize) => {
  const styles = {
    small: {
      minHeight: theme.spacing.xl,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.xs,
      gap: theme.spacing.xs,
    },
    medium: {
      minHeight: theme.spacing.xxl,
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.sm,
      gap: theme.spacing.xs,
    },
    large: {
      minHeight: theme.spacing.xxxl,
      paddingHorizontal: theme.spacing.xl,
      paddingVertical: theme.spacing.md,
      gap: theme.spacing.sm,
    },
  };

  return styles[size];
};

const variantStyles = (theme: AegisTheme, variant: ButtonVariant) => {
  const styles = {
    primary: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
      ...theme.shadows,
    },
    secondary: {
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.border,
    },
    outline: {
      backgroundColor: theme.colors.transparent,
      borderColor: theme.colors.primary,
    },
    ghost: {
      backgroundColor: theme.colors.transparent,
      borderColor: theme.colors.transparent,
    },
    danger: {
      backgroundColor: theme.colors.error,
      borderColor: theme.colors.error,
      ...theme.shadows,
    },
  };

  return styles[variant];
};

const textColors = {
  primary: 'white',
  secondary: 'primary',
  outline: 'primary',
  ghost: 'primary',
  danger: 'white',
} satisfies Record<ButtonVariant, TextColorToken>;

/** Resolves the theme text color token for a button state. */
export function getButtonTextColor(variant: ButtonVariant, disabled: boolean): TextColorToken {
  return disabled ? 'disabled' : textColors[variant];
}

/** Resolves the concrete ActivityIndicator color for a button state. */
export function getButtonIndicatorColor(
  theme: AegisTheme,
  variant: ButtonVariant,
  disabled: boolean,
) {
  const textColor = getButtonTextColor(variant, disabled);

  if (textColor === 'white') {
    return theme.colors.white;
  }

  if (textColor === 'disabled') {
    return theme.colors.disabled;
  }

  return theme.colors.primary;
}

/** Creates theme-aware styles for the Button primitive. */
export function createButtonStyles(
  theme: AegisTheme,
  variant: ButtonVariant,
  size: ButtonSize,
  state: ButtonState,
) {
  return StyleSheet.create({
    root: {
      minWidth: state.fullWidth ? '100%' : undefined,
      alignSelf: state.fullWidth ? 'stretch' : 'flex-start',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderRadius: theme.radius.button,
      opacity: state.disabled ? 0.56 : state.pressed ? 0.82 : 1,
      ...sizeStyles(theme, size),
      ...variantStyles(theme, variant),
    },
    disabled: {
      backgroundColor: variant === 'ghost' ? theme.colors.transparent : theme.colors.overlay,
      borderColor: variant === 'ghost' ? theme.colors.transparent : theme.colors.border,
    },
    label: {
      flexShrink: 1,
    },
    icon: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
}
