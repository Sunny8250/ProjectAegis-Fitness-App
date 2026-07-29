import { memo, useMemo } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { Text } from '@/components/common/Text';
import { useTheme } from '@/theme/useTheme';

import { createLoaderStyles } from './Loader.styles';
import type { LoaderProps } from './Loader.types';

/** Theme-aware loading indicator with optional label, fullscreen, and overlay modes. */
function LoaderComponent({
  accessibilityHint,
  accessibilityLabel,
  color,
  fullscreen = false,
  label,
  overlay = false,
  size = 'large',
  style,
}: LoaderProps) {
  const { theme } = useTheme();
  const styles = useMemo(() => createLoaderStyles(theme), [theme]);
  const rootStyle = [
    styles.root,
    fullscreen && styles.fullscreen,
    overlay && styles.overlay,
    style,
  ];

  return (
    <View style={rootStyle}>
      <ActivityIndicator
        accessibilityHint={accessibilityHint}
        accessibilityLabel={accessibilityLabel}
        accessibilityLiveRegion="polite"
        accessibilityRole="progressbar"
        color={color ?? theme.colors.primary}
        size={size}
      />
      {label ? (
        <Text align="center" color="text.secondary" variant="caption">
          {label}
        </Text>
      ) : null}
    </View>
  );
}

export const Loader = memo(LoaderComponent);

Loader.displayName = 'Loader';
