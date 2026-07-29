import { isValidElement, memo, useCallback, useMemo } from 'react';
import { Pressable, View } from 'react-native';

import { Icon, type IconName } from '@/components/common/Icon';
import { Text } from '@/components/common/Text';
import { useTheme } from '@/theme/useTheme';

import { createChipStyles } from './Chip.styles';
import type { ChipAccessory, ChipProps } from './Chip.types';

const isIconName = (accessory: ChipAccessory): accessory is IconName =>
  !isValidElement(accessory);

/** Memoized interactive chip that renders as Pressable only when onPress is provided. */
function ChipComponent({
  accessibilityHint,
  accessibilityLabel,
  accessibilityState,
  disabled = false,
  label,
  leftAccessory,
  onLongPress,
  onPress,
  rightAccessory,
  selected = false,
  size = 'medium',
  style,
  variant = 'filled',
  ...pressableProps
}: ChipProps) {
  const { theme } = useTheme();
  const isPressable = Boolean(onPress);
  const { iconColor, iconSize, styles, textColor, textVariant } = useMemo(
    () => createChipStyles(theme, variant, size, selected),
    [selected, size, theme, variant],
  );
  const chipAccessibilityState = useMemo(
    () => ({
      ...accessibilityState,
      disabled,
      selected,
    }),
    [accessibilityState, disabled, selected],
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
    (accessory?: ChipAccessory) => {
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
        accessibilityState={chipAccessibilityState}
        disabled={disabled}
        onLongPress={onLongPress}
        onPress={onPress}
        style={pressableStyle}
      >
        {content}
      </Pressable>
    );
  }

  return <View style={[styles.root, disabled && styles.disabledRoot, style]}>{content}</View>;
}

export const Chip = memo(ChipComponent);

Chip.displayName = 'Chip';
