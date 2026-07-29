import { memo } from 'react';
import { SymbolView } from 'expo-symbols';

import { useTheme } from '@/theme/useTheme';

import type { IconProps } from './Icon.types';

const DEFAULT_ICON_SIZE = 24;

/** Theme-aware icon abstraction backed by the app's current icon library. */
function IconComponent({
  accessible,
  accessibilityHint,
  accessibilityLabel,
  color,
  name,
  size = DEFAULT_ICON_SIZE,
  style,
  testID,
  weight,
}: IconProps) {
  const { theme } = useTheme();

  return (
    <SymbolView
      accessible={accessible}
      accessibilityHint={accessibilityHint}
      accessibilityLabel={accessibilityLabel}
      name={name}
      size={size}
      style={style}
      testID={testID}
      tintColor={color ?? theme.colors.text.primary}
      weight={weight}
    />
  );
}

export const Icon = memo(IconComponent);

Icon.displayName = 'Icon';
