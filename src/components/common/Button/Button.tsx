import { memo, useCallback, useMemo } from 'react';
import { ActivityIndicator, Pressable, View } from 'react-native';

import { Text } from '@/components/common/Text';
import type { TextVariant } from '@/components/common/Text';
import { useTheme } from '@/theme/useTheme';

import {
  createButtonStyles,
  getButtonIndicatorColor,
  getButtonTextColor,
} from './Button.styles';
import type { ButtonProps } from './Button.types';

const textVariantsBySize = {
  small: 'body',
  medium: 'title',
  large: 'heading3',
} satisfies Record<NonNullable<ButtonProps['size']>, TextVariant>;

/** Memoized button implementation preserving variant behavior, loading layout, and theme styles. */
function ButtonComponent({
  accessibilityHint,
  accessibilityLabel,
  accessibilityState,
  children,
  disabled = false,
  fullWidth = false,
  leftIcon,
  loading = false,
  onPress,
  rightIcon,
  size = 'medium',
  style,
  textStyle,
  variant = 'primary',
  ...pressableProps
}: ButtonProps) {
  const { theme } = useTheme();
  const isDisabled = disabled || loading;
  const textVariant = useMemo(() => textVariantsBySize[size], [size]);
  const textColor = useMemo(() => getButtonTextColor(variant, isDisabled), [isDisabled, variant]);
  const indicatorColor = useMemo(
    () => getButtonIndicatorColor(theme, variant, isDisabled),
    [isDisabled, theme, variant],
  );
  const buttonAccessibilityLabel = useMemo(
    () => accessibilityLabel ?? (typeof children === 'string' ? children : undefined),
    [accessibilityLabel, children],
  );
  const buttonAccessibilityState = useMemo(
    () => ({
      ...accessibilityState,
      disabled: isDisabled,
      busy: loading,
    }),
    [accessibilityState, isDisabled, loading],
  );
  const styles = useMemo(
    () =>
      createButtonStyles(theme, variant, size, {
        disabled: isDisabled,
        fullWidth,
      }),
    [fullWidth, isDisabled, size, theme, variant],
  );
  const handlePress = useCallback<NonNullable<ButtonProps['onPress']>>(
    (event) => {
      if (isDisabled) {
        return;
      }

      onPress?.(event);
    },
    [isDisabled, onPress],
  );
  const pressableStyle = useCallback(
    ({ pressed }: { pressed: boolean }) => {
      return [
        styles.root,
        pressed && styles.pressedRoot,
        isDisabled && styles.disabled,
        style,
      ];
    },
    [isDisabled, style, styles],
  );
  const leadingContent = loading ? (
    <>
      {leftIcon ? <View style={styles.hiddenContent}>{leftIcon}</View> : null}
      <ActivityIndicator
        color={indicatorColor}
        size="small"
        style={leftIcon ? styles.loadingIndicator : undefined}
      />
    </>
  ) : (
    leftIcon
  );
  const trailingContent = loading && rightIcon ? (
    <View style={styles.hiddenContent}>{rightIcon}</View>
  ) : (
    rightIcon
  );

  return (
    <Pressable
      {...pressableProps}
      accessibilityHint={accessibilityHint}
      accessibilityLabel={buttonAccessibilityLabel}
      accessibilityRole="button"
      accessibilityState={buttonAccessibilityState}
      disabled={isDisabled}
      onPress={handlePress}
      style={pressableStyle}
    >
      {leadingContent ? <View style={styles.icon}>{leadingContent}</View> : null}
      <Text color={textColor} numberOfLines={1} style={textStyle} variant={textVariant}>
        {children}
      </Text>
      {trailingContent ? <View style={styles.icon}>{trailingContent}</View> : null}
    </Pressable>
  );
}

export const Button = memo(ButtonComponent);

Button.displayName = 'Button';
