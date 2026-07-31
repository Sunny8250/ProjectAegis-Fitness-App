import React from 'react';
import { View, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { Text } from '@/components/common/Text';
import { useTheme } from '@/theme/useTheme';
import type { AegisTheme } from '@/theme/themes';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { formatElapsedTime } from '@/utils/time';
import { hexAlpha } from '@/utils/colors';

import Animated, { useAnimatedStyle, interpolate, Extrapolation, useSharedValue, withTiming, useDerivedValue, SharedValue } from 'react-native-reanimated';

interface ActiveWorkoutHeaderProps {
  workoutName: string;
  currentExerciseIndex: number;
  totalExercises: number;
  elapsedTime: number;
  estimatedTotalSeconds?: number;
  caloriesBurned?: number;
  heartRate?: number;
  scrollY?: SharedValue<number>;
}

export const ActiveWorkoutHeader = ({
  workoutName,
  currentExerciseIndex,
  totalExercises,
  elapsedTime,
  estimatedTotalSeconds = 2700, // default 45 min
  caloriesBurned = 0,
  heartRate = 120,
  scrollY,
}: ActiveWorkoutHeaderProps) => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = createStyles(theme, insets);

  const progress = totalExercises > 0 ? (currentExerciseIndex + 1) / totalExercises : 0;
  const remainingTime = Math.max(0, estimatedTotalSeconds - elapsedTime);

  // Manual collapse state
  const isManuallyCollapsed = useSharedValue(false);

  const manualToggleOffset = useDerivedValue(() => {
    return withTiming(isManuallyCollapsed.value ? 100 : 0, { duration: 300 });
  });

  // Combine scroll offset and manual collapse seamlessly
  const effectiveScrollY = useDerivedValue(() => {
    const scroll = scrollY ? scrollY.value : 0;
    return Math.max(scroll, manualToggleOffset.value);
  });

  const expandedStyle = useAnimatedStyle(() => {
    const height = interpolate(
      effectiveScrollY.value,
      [0, 60],
      [100, 0], // approximate height of the expanded portion
      Extrapolation.CLAMP
    );
    const opacity = interpolate(
      effectiveScrollY.value,
      [0, 40],
      [1, 0],
      Extrapolation.CLAMP
    );
    const scale = interpolate(
      effectiveScrollY.value,
      [0, 60],
      [1, 0.9],
      Extrapolation.CLAMP
    );
    return {
      height,
      opacity,
      transform: [{ scale }],
      overflow: 'hidden',
    };
  });

  const chevronStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      effectiveScrollY.value,
      [0, 60],
      [0, 180],
      Extrapolation.CLAMP
    );
    return {
      transform: [{ rotate: `${rotate}deg` }],
    };
  });

  const compactStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      effectiveScrollY.value,
      [40, 80],
      [0, 1],
      Extrapolation.CLAMP
    );
    const translateY = interpolate(
      effectiveScrollY.value,
      [40, 80],
      [10, 0],
      Extrapolation.CLAMP
    );
    return {
      opacity,
      transform: [{ translateY }],
      position: 'absolute',
      bottom: theme.spacing.md,
      left: theme.spacing.lg,
      right: theme.spacing.lg,
      pointerEvents: opacity === 0 ? 'none' : 'auto',
    };
  });

  const containerStyle = useAnimatedStyle(() => {
    const paddingBottom = interpolate(
      effectiveScrollY.value,
      [0, 60],
      [theme.spacing.lg, theme.spacing.md],
      Extrapolation.CLAMP
    );
    return {
      paddingBottom,
    };
  });

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      {/* EXPANDED VIEW */}
      <Animated.View style={expandedStyle}>
        <View style={styles.topRow}>
          <View style={styles.leftContent}>
            <Text variant="heading3" style={styles.title} numberOfLines={1}>
              {workoutName}
            </Text>
            <Text variant="caption" style={styles.subtitle}>
              Exercise {currentExerciseIndex + 1} / {totalExercises}
            </Text>
          </View>

          <View style={styles.rightMetrics}>
            <View style={styles.metricBadge}>
              <MaterialCommunityIcons name="fire" size={14} color={theme.colors.warning} />
              <Text variant="caption" style={styles.metricText}>{caloriesBurned} kcal</Text>
            </View>
            {heartRate > 0 && (
              <View style={styles.metricBadge}>
                <MaterialCommunityIcons name="heart-pulse" size={14} color={theme.colors.error} />
                <Text variant="caption" style={styles.metricText}>{heartRate}</Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.bottomRow}>
          <View style={styles.timeBlock}>
            <Text variant="heading2" style={styles.timeValue}>{formatElapsedTime(elapsedTime)}</Text>
            <Text variant="caption" style={styles.timeLabel}>elapsed</Text>
          </View>
          <View style={styles.timeBlock}>
            <Text variant="heading2" style={[styles.timeValue, styles.dimmedText]}>{formatElapsedTime(remainingTime)}</Text>
            <Text variant="caption" style={styles.timeLabel}>remaining</Text>
          </View>
          <View style={styles.progressBlock}>
            <Text variant="heading2" style={styles.progressValue}>{Math.round(progress * 100)}%</Text>
            <Text variant="caption" style={styles.timeLabel}>progress</Text>
          </View>
        </View>
      </Animated.View>

      {/* COMPACT VIEW */}
      <Animated.View style={[styles.compactRow, compactStyle]}>
        <View style={styles.compactLeft}>
          <Text variant="body" style={styles.compactTitle} numberOfLines={1}>
            {workoutName}
          </Text>
          <Text variant="caption" style={styles.compactSubtitle}>
            {currentExerciseIndex + 1} / {totalExercises}
          </Text>
        </View>

        <View style={styles.compactRight}>
          <Text variant="body" style={styles.compactTime}>{formatElapsedTime(elapsedTime)}</Text>
          <View style={styles.compactDivider} />
          <Text variant="body" style={styles.compactProgress}>{Math.round(progress * 100)}%</Text>
        </View>
      </Animated.View>

      {/* TOGGLE HITBOX */}
      <TouchableOpacity 
        style={styles.toggleButton} 
        onPress={() => { isManuallyCollapsed.value = !isManuallyCollapsed.value; }}
        activeOpacity={0.7}
      >
        <Animated.View style={chevronStyle}>
          <MaterialCommunityIcons name="chevron-up" size={20} color="rgba(255,255,255,0.4)" />
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );
};

function createStyles(theme: AegisTheme, insets: any) {
  return StyleSheet.create({
    container: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: theme.colors.background,
      paddingTop: Math.max(insets.top, Platform.OS === 'android' ? 40 : 0) + theme.spacing.sm,
      paddingHorizontal: theme.spacing.lg,
      paddingBottom: theme.spacing.lg,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      zIndex: 10,
    },
    topRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      marginBottom: theme.spacing.md,
    },
    leftContent: {
      flex: 1,
      paddingRight: theme.spacing.md,
    },
    title: {
      color: '#FFFFFF',
      marginBottom: 2,
    },
    subtitle: {
      color: 'rgba(255,255,255,0.7)',
      textTransform: 'uppercase',
      letterSpacing: 1,
      fontSize: 11,
      fontWeight: '600',
    },
    rightMetrics: {
      alignItems: 'flex-end',
      gap: 6,
    },
    metricBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      backgroundColor: hexAlpha(theme.colors.surface, 0.2),
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: theme.radius.sm,
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.1)',
    },
    metricText: {
      color: 'rgba(255,255,255,0.9)',
      fontWeight: '700',
    },
    bottomRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.xl,
    },
    timeBlock: {
      alignItems: 'flex-start',
    },
    progressBlock: {
      alignItems: 'flex-start',
      marginLeft: 'auto',
    },
    timeValue: {
      color: '#FFFFFF',
    },
    dimmedText: {
      color: 'rgba(255,255,255,0.6)',
    },
    progressValue: {
      color: theme.colors.primary,
    },
    timeLabel: {
      color: 'rgba(255,255,255,0.5)',
      textTransform: 'uppercase',
      letterSpacing: 1,
      fontSize: 10,
      marginTop: -2,
    },
    compactRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: Math.max(insets.top, Platform.OS === 'android' ? 40 : 0) + 12,
    },
    compactLeft: {
      flex: 1,
      paddingRight: 16,
    },
    compactTitle: {
      color: '#FFFFFF',
      fontWeight: '700',
    },
    compactSubtitle: {
      color: 'rgba(255,255,255,0.7)',
      fontSize: 11,
    },
    compactRight: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    compactTime: {
      color: '#FFFFFF',
      fontWeight: '600',
    },
    compactDivider: {
      width: 1,
      height: 12,
      backgroundColor: 'rgba(255,255,255,0.3)',
    },
    compactProgress: {
      color: theme.colors.primary,
      fontWeight: '700',
    },
    toggleButton: {
      alignItems: 'center',
      paddingTop: 8,
      marginTop: -8, // pull up into the padding
    }
  });
}
