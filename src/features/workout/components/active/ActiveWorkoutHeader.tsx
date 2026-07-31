import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Text } from '@/components/common/Text';
import { useTheme } from '@/theme/useTheme';
import type { AegisTheme } from '@/theme/themes';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { formatElapsedTime } from '@/utils/time';
import Svg, { Circle } from 'react-native-svg';

interface ActiveWorkoutHeaderProps {
  workoutName: string;
  currentExerciseIndex: number;
  totalExercises: number;
  elapsedTime: number;
  caloriesBurned?: number;
  heartRate?: number;
}

export const ActiveWorkoutHeader = ({
  workoutName,
  currentExerciseIndex,
  totalExercises,
  elapsedTime,
  caloriesBurned = 0,
  heartRate = 120,
}: ActiveWorkoutHeaderProps) => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = createStyles(theme, insets);

  const progress = totalExercises > 0 ? (currentExerciseIndex + 1) / totalExercises : 0;
  
  // Progress Ring logic
  const size = 44;
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <LinearGradient
      colors={['rgba(0,0,0,0.8)', 'transparent']}
      style={styles.container}
      pointerEvents="box-none"
    >
      <View style={styles.topRow}>
        <View style={styles.progressContainer}>
          <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            <Circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="rgba(255,255,255,0.25)"
              strokeWidth={strokeWidth}
              fill="transparent"
            />
            <Circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={theme.colors.primary}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              fill="transparent"
              strokeLinecap="round"
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
          </Svg>
          <View style={styles.progressTextContainer}>
            <Text variant="caption" style={styles.progressText}>
              {currentExerciseIndex + 1}/{totalExercises}
            </Text>
          </View>
        </View>

        <View style={styles.titleContainer}>
          <Text variant="small" style={styles.subtitle} numberOfLines={1}>
            {workoutName}
          </Text>
          <Text variant="title" style={styles.timeText}>
            {formatElapsedTime(elapsedTime)}
          </Text>
        </View>

        <View style={styles.rightMetrics}>
          <View style={styles.metricItem}>
            <MaterialCommunityIcons name="heart-pulse" size={14} color={theme.colors.error} />
            <Text variant="caption" style={styles.metricText}>{heartRate}</Text>
          </View>
          <View style={styles.metricItem}>
            <MaterialCommunityIcons name="fire" size={14} color={theme.colors.warning} />
            <Text variant="caption" style={styles.metricText}>{caloriesBurned}</Text>
          </View>
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
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    progressContainer: {
      position: 'relative',
      width: 44,
      height: 44,
      justifyContent: 'center',
      alignItems: 'center',
    },
    progressTextContainer: {
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
    },
    progressText: {
      fontWeight: '700',
      fontSize: 10,
      color: '#FFFFFF',
    },
    titleContainer: {
      flex: 1,
      alignItems: 'center',
      paddingHorizontal: theme.spacing.md,
    },
    subtitle: {
      color: 'rgba(255,255,255,0.7)',
      textTransform: 'uppercase',
      letterSpacing: 1,
      marginBottom: 2,
      fontSize: 10,
    },
    timeText: {
      fontWeight: '800',
      fontVariant: ['tabular-nums'],
      color: '#FFFFFF',
      fontSize: 22,
    },
    rightMetrics: {
      alignItems: 'flex-end',
      gap: 4,
    },
    metricItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    metricText: {
      color: 'rgba(255,255,255,0.85)',
      fontWeight: '600',
      fontVariant: ['tabular-nums'],
    },
  });
}
