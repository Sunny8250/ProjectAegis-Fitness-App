import { useMemo } from 'react';
import { ActivityIndicator, Pressable, View } from 'react-native';

import { Text } from '@/components/common/Text';
import { useTheme } from '@/theme/useTheme';

import {
  createButtonStyles,
  getButtonIndicatorColor,
  getButtonTextColor,
} from './Button.styles';
import type { ButtonProps } from './Button.types';

/** Reusable themed Pressable button with variants, sizes, icons, and loading state. */
export function Button({
  children,
  disabled = false,
  fullWidth = false,
  leftIcon,
  loading = false,
  rightIcon,
  size = 'medium',
  style,
  textStyle,
  variant = 'primary',
  ...pressableProps
}: ButtonProps) {
  const { theme } = useTheme();
  const isDisabled = disabled || loading;
  const textColor = getButtonTextColor(variant, isDisabled);
  const indicatorColor = getButtonIndicatorColor(theme, variant, isDisabled);
  const defaultStyles = useMemo(
    () =>
      createButtonStyles(theme, variant, size, {
        disabled: isDisabled,
        fullWidth,
        pressed: false,
      }),
    [fullWidth, isDisabled, size, theme, variant],
  );
  const pressedStyles = useMemo(
    () =>
      createButtonStyles(theme, variant, size, {
        disabled: isDisabled,
        fullWidth,
        pressed: true,
      }),
    [fullWidth, isDisabled, size, theme, variant],
  );

  return (
    <Pressable
      {...pressableProps}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      style={({ pressed }) => {
        const styles = pressed ? pressedStyles : defaultStyles;

        return [styles.root, isDisabled && styles.disabled, style];
      }}
    >
      {loading ? (
        <ActivityIndicator color={indicatorColor} size="small" />
      ) : (
        leftIcon && <View style={defaultStyles.icon}>{leftIcon}</View>
      )}
      <Text color={textColor} numberOfLines={1} style={textStyle} variant="title">
        {children}
      </Text>
      {!loading && rightIcon ? (
        <View style={defaultStyles.icon}>{rightIcon}</View>
      ) : null}
    </Pressable>
  );
}
