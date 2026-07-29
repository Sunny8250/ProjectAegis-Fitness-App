import { isValidElement, memo, useMemo } from 'react';
import { View } from 'react-native';

import { Icon, type IconName } from '@/components/common/Icon';
import { Text } from '@/components/common/Text';
import { useTheme } from '@/theme/useTheme';

import { createEmptyStateStyles } from './EmptyState.styles';
import type { EmptyStateIcon, EmptyStateProps } from './EmptyState.types';

const isIconName = (icon: EmptyStateIcon): icon is IconName => !isValidElement(icon);
const hasRenderableContent = (node: EmptyStateProps['description']) =>
  node !== null && node !== undefined && node !== false;

/** Centered empty-data message with optional decorative icon and action. */
function EmptyStateComponent({
  accessibilityHint,
  accessibilityLabel,
  action,
  description,
  fullscreen = false,
  icon,
  style,
  title,
}: EmptyStateProps) {
  const { theme } = useTheme();
  const styles = useMemo(() => createEmptyStateStyles(theme), [theme]);

  return (
    <View
      accessibilityHint={accessibilityHint}
      accessibilityLabel={accessibilityLabel}
      style={[styles.root, fullscreen && styles.fullscreen, style]}
    >
      {icon ? (
        <View style={styles.icon}>
          {isIconName(icon) ? (
            <Icon accessible={false} color={theme.colors.text.secondary} name={icon} size={theme.spacing.xxxl} />
          ) : (
            icon
          )}
        </View>
      ) : null}

      <View style={styles.textGroup}>
        <Text align="center" variant="heading3">
          {title}
        </Text>
        {hasRenderableContent(description) ? (
          <Text
            align="center"
            color="text.secondary"
            style={styles.description}
            variant="body"
          >
            {description}
          </Text>
        ) : null}
      </View>

      {hasRenderableContent(action) ? <View style={styles.action}>{action}</View> : null}
    </View>
  );
}

export const EmptyState = memo(EmptyStateComponent);

EmptyState.displayName = 'EmptyState';
