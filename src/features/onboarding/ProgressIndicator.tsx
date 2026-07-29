import { memo, useEffect, useMemo } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';

import { useTheme } from '@/theme/useTheme';

const ACTIVE_DOT_WIDTH = 24;
const INACTIVE_DOT_WIDTH = 8;
const ACTIVE_DOT_OPACITY = 1;
const INACTIVE_DOT_OPACITY = 0.4;
const DOT_ANIMATION_DURATION_MS = 300;

type ProgressIndicatorProps = {
  count: number;
  currentIndex: number;
};

type ProgressDotProps = {
  active: boolean;
};

const ProgressDot = memo(function ProgressDot({ active }: ProgressDotProps) {
  const { theme } = useTheme();
  const progress = useMemo(() => new Animated.Value(0), []);
  const styles = useMemo(() => createStyles(theme), [theme]);

  useEffect(() => {
    Animated.timing(progress, {
      toValue: active ? 1 : 0,
      duration: DOT_ANIMATION_DURATION_MS,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [active, progress]);

  const width = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [INACTIVE_DOT_WIDTH, ACTIVE_DOT_WIDTH],
  });
  const opacity = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [INACTIVE_DOT_OPACITY, ACTIVE_DOT_OPACITY],
  });

  return <Animated.View style={[styles.dot, { opacity, width }]} />;
});

/** Animated dot indicator for onboarding progress. */
export const ProgressIndicator = memo(function ProgressIndicator({
  count,
  currentIndex,
}: ProgressIndicatorProps) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View accessible={false} style={styles.container}>
      {Array.from({ length: count }, (_, index) => (
        <ProgressDot active={index === currentIndex} key={index} />
      ))}
    </View>
  );
});

const createStyles = (theme: ReturnType<typeof useTheme>['theme']) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: theme.spacing.xs,
      alignSelf: 'center',
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.xs,
      borderRadius: theme.radius.pill,
      backgroundColor: theme.colors.overlay,
    },
    dot: {
      height: INACTIVE_DOT_WIDTH,
      borderRadius: theme.radius.pill,
      backgroundColor: theme.colors.primary,
    },
  });
