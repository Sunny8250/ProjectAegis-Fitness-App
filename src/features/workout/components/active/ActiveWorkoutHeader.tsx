import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Text } from '@/components/common/Text';
import { useTheme } from '@/theme/useTheme';
import type { AegisTheme } from '@/theme/themes';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { formatElapsedTime } from '@/utils/time';
import { hexAlpha } from '@/utils/colors';

interface ActiveWorkoutHeaderProps {
  workoutName: string;
  currentExerciseIndex: number;
  totalExercises: number;
  elapsedTime: number;
  estimatedTotalSeconds?: number;
  caloriesBurned?: number;
  heartRate?: number;
}

export const ActiveWorkoutHeader = ({
  workoutName,
  currentExerciseIndex,
  totalExercises,
  elapsedTime,
  estimatedTotalSeconds = 2700, // default 45 min
  caloriesBurned = 0,
  heartRate = 120,
}: ActiveWorkoutHeaderProps) => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = createStyles(theme, insets);

  const progress = totalExercises > 0 ? (currentExerciseIndex + 1) / totalExercises : 0;
  const remainingTime = Math.max(0, estimatedTotalSeconds - elapsedTime);

  return (
    <LinearGradient
      colors={['rgba(0,0,0,0.9)', 'rgba(0,0,0,0.5)', 'transparent']}
      locations={[0, 0.7, 1]}
      style={styles.container}
      pointerEvents="box-none"
    >
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
    </LinearGradient>
  );
};

function createStyles(theme: AegisTheme, insets: any) {
  return StyleSheet.create({
    container: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10,
      paddingTop: Math.max(insets.top, Platform.OS === 'android' ? 40 : 0) + theme.spacing.sm,
      paddingHorizontal: theme.spacing.lg,
      paddingBottom: theme.spacing.xl,
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
      fontVariant: ['tabular-nums'],
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
      fontVariant: ['tabular-nums'],
    },
    dimmedText: {
      color: 'rgba(255,255,255,0.6)',
    },
    progressValue: {
      color: theme.colors.primary,
      fontVariant: ['tabular-nums'],
    },
    timeLabel: {
      color: 'rgba(255,255,255,0.5)',
      textTransform: 'uppercase',
      letterSpacing: 1,
      fontSize: 10,
      marginTop: -2,
    },
  });
}
