import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@/theme/useTheme';
import type { AegisTheme } from '@/theme/themes';
import { Text } from '@/components/common/Text';
import type { WorkoutSummaryData } from '@/features/workout/data/mockSummaryData';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing, withDelay } from 'react-native-reanimated';

interface SummaryXpProgressProps {
  xp: WorkoutSummaryData['xp'];
}

export const SummaryXpProgress = ({ xp }: SummaryXpProgressProps) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(
      800, // wait for screen entrance
      withTiming(xp.progressPercentage, { duration: 1500, easing: Easing.out(Easing.cubic) })
    );
  }, [xp.progressPercentage]);

  const animatedBarStyle = useAnimatedStyle(() => {
    return {
      width: `${progress.value}%`,
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text variant="caption" color="secondary" style={styles.label}>LEVEL {xp.currentLevel}</Text>
          <Text variant="heading3">+{xp.earned} XP</Text>
        </View>
        <Text variant="heading3" color="primary">{xp.progressPercentage}%</Text>
      </View>

      <View style={styles.barContainer}>
        <Animated.View style={[styles.barFill, animatedBarStyle]} />
      </View>
    </View>
  );
};

function createStyles(theme: AegisTheme) {
  return StyleSheet.create({
    container: {
      marginBottom: theme.spacing.xl,
      backgroundColor: theme.colors.surface,
      padding: theme.spacing.lg,
      borderRadius: theme.radius.lg,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      marginBottom: theme.spacing.md,
    },
    label: {
      fontWeight: '700',
      letterSpacing: 1,
      marginBottom: 2,
    },
    barContainer: {
      height: 12,
      backgroundColor: theme.colors.background,
      borderRadius: 6,
      overflow: 'hidden',
    },
    barFill: {
      height: '100%',
      backgroundColor: theme.colors.primary,
      borderRadius: 6,
    },
  });
}
