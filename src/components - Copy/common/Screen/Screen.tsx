import { useMemo } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '@/theme/useTheme';

import { createScreenStyles } from './Screen.styles';
import type { ScreenProps } from './Screen.types';

const defaultEdges = ['top', 'right', 'bottom', 'left'] as const;

/** Reusable themed screen wrapper with safe-area and optional scrolling support. */
export function Screen({
  children,
  contentContainerStyle,
  edges = defaultEdges,
  scrollable = false,
  scrollViewProps,
  style,
  testID,
}: ScreenProps) {
  const { theme } = useTheme();
  const styles = useMemo(() => createScreenStyles(theme), [theme]);

  return (
    <SafeAreaView edges={edges} style={[styles.root, style]} testID={testID}>
      {scrollable ? (
        <ScrollView
          {...scrollViewProps}
          contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
          style={styles.scroll}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.content, contentContainerStyle]}>{children}</View>
      )}
    </SafeAreaView>
  );
}
