import { isValidElement, memo, useCallback, useMemo } from 'react';
import { Pressable, View } from 'react-native';

import { Icon, type IconName } from '@/components/common/Icon';
import { Text } from '@/components/common/Text';
import { useTheme } from '@/theme/useTheme';

import { createBadgeStyles } from './Badge.styles';
import type { BadgeAccessory, BadgeProps } from './Badge.types';

const isIconName = (accessory: BadgeAccessory): accessory is IconName =>
  !isValidElement(accessory);

/** Memoized badge that renders as Pressable only when onPress is provided. */
function BadgeComponent({
  accessibilityHint,
  accessibilityLabel,
  accessibilityState,
  disabled = false,
  label,
  leftAccessory,
  onPress,
  rightAccessory,
  size = 'medium',
  style,
  variant = 'primary',
  ...pressableProps
}: BadgeProps) {
  const { theme } = useTheme();
  const isPressable = Boolean(onPress);
  const { iconColor, iconSize, styles, textColor, textVariant } = useMemo(
    () => createBadgeStyles(theme, variant, size),
    [size, theme, variant],
  );
  const badgeAccessibilityState = useMemo(
    () => ({
      ...accessibilityState,
      disabled,
    }),
    [accessibilityState, disabled],
  );
  const pressableStyle = useCallback(
    ({ pressed }: { pressed: boolean }) => [
      styles.root,
      pressed && styles.pressedRoot,
      disabled && styles.disabledRoot,
      style,
    ],
    [disabled, style, styles],
  );
  const renderAccessory = useCallback(
    (accessory?: BadgeAccessory) => {
      if (!accessory) {
        return null;
      }

      return (
        <View style={styles.accessory}>
          {isIconName(accessory) ? (
            <Icon accessible={false} color={iconColor} name={accessory} size={iconSize} />
          ) : (
            accessory
          )}
        </View>
      );
    },
    [iconColor, iconSize, styles.accessory],
  );

  const content = (
    <>
      {renderAccessory(leftAccessory)}
      <Text color={textColor} numberOfLines={1} style={styles.label} variant={textVariant}>
        {label}
      </Text>
      {renderAccessory(rightAccessory)}
    </>
  );

  if (isPressable) {
    return (
      <Pressable
        {...pressableProps}
        accessibilityHint={accessibilityHint}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="button"
        accessibilityState={badgeAccessibilityState}
        disabled={disabled}
        onPress={onPress}
        style={pressableStyle}
      >
        {content}
      </Pressable>
    );
  }

  return <View style={[styles.root, disabled && styles.disabledRoot, style]}>{content}</View>;
}

export const Badge = memo(BadgeComponent);

Badge.displayName = 'Badge';
