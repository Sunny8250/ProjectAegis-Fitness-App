import { memo, useCallback, useMemo } from 'react';
import { Pressable, View } from 'react-native';

import { Text } from '@/components/common/Text';
import { useTheme } from '@/theme/useTheme';

import { createCardStyles } from './Card.styles';
import type { CardProps } from './Card.types';

const hasRenderableContent = (node: CardProps['children']) =>
  node !== null && node !== undefined && node !== false;

/** Memoized card that renders a Pressable only when onPress is provided. */
function CardComponent({
  accessible,
  accessibilityHint,
  accessibilityLabel,
  accessibilityState,
  children,
  disabled = false,
  footer,
  leftAccessory,
  onPress,
  padding = 'medium',
  rightAccessory,
  style,
  subtitle,
  title,
  variant = 'elevated',
  ...pressableProps
}: CardProps) {
  const { theme } = useTheme();
  const isPressable = Boolean(onPress);
  const hasHeader =
    hasRenderableContent(title) ||
    hasRenderableContent(subtitle) ||
    hasRenderableContent(leftAccessory) ||
    hasRenderableContent(rightAccessory);
  const styles = useMemo(() => createCardStyles(theme, variant, padding), [padding, theme, variant]);
  const isAccessible = useMemo(
    () => accessible ?? (isPressable || Boolean(accessibilityLabel || accessibilityHint)),
    [accessible, accessibilityHint, accessibilityLabel, isPressable],
  );
  const cardAccessibilityState = useMemo(
    () => ({
      ...accessibilityState,
      disabled,
    }),
    [accessibilityState, disabled],
  );
  const pressableStyle = useCallback(
    ({ pressed }: { pressed: boolean }) => [
      styles.root,
      pressed && styles.pressableRoot,
      disabled && styles.disabledRoot,
      style,
    ],
    [disabled, style, styles],
  );

  const content = (
    <View style={styles.content}>
      {hasHeader ? (
        <View style={styles.header}>
          {hasRenderableContent(leftAccessory) ? (
            <View style={styles.accessory}>{leftAccessory}</View>
          ) : null}
          <View style={styles.headerText}>
            {hasRenderableContent(title) ? <Text variant="heading3">{title}</Text> : null}
            {hasRenderableContent(subtitle) ? (
              <Text color="text.secondary" variant="caption">
                {subtitle}
              </Text>
            ) : null}
          </View>
          {hasRenderableContent(rightAccessory) ? (
            <View style={styles.accessory}>{rightAccessory}</View>
          ) : null}
        </View>
      ) : null}
      {hasRenderableContent(children) ? <View style={styles.body}>{children}</View> : null}
      {hasRenderableContent(footer) ? <View style={styles.footer}>{footer}</View> : null}
    </View>
  );

  if (isPressable) {
    return (
      <Pressable
        {...pressableProps}
        accessible={isAccessible}
        accessibilityHint={accessibilityHint}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="button"
        accessibilityState={cardAccessibilityState}
        disabled={disabled}
        onPress={onPress}
        style={pressableStyle}
      >
        {content}
      </Pressable>
    );
  }

  return (
    <View
      accessible={isAccessible}
      accessibilityHint={accessibilityHint}
      accessibilityLabel={accessibilityLabel}
      accessibilityState={accessibilityState}
      style={[styles.root, style]}
    >
      {content}
    </View>
  );
}

export const Card = memo(CardComponent);

Card.displayName = 'Card';
