import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from '@/components/common/Text';
import { useTheme } from '@/theme/useTheme';
import type { AegisTheme } from '@/theme/themes';
import Svg, { Circle } from 'react-native-svg';
import { Image } from 'expo-image';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { ActiveExercise } from '../../hooks/useActiveWorkout';
import { formatElapsedTime } from '@/utils/time';

interface ActiveRestTimerProps {
  restTimeRemaining: number;
  initialRestTime?: number;
  upcomingExercise: ActiveExercise | null;
  onSkip: () => void;
  onAdjust: (amount: number) => void;
}

export const ActiveRestTimer = ({
  restTimeRemaining,
  initialRestTime = 60,
  upcomingExercise,
  onSkip,
  onAdjust,
}: ActiveRestTimerProps) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const size = 200;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  // Fallback to avoid division by zero
  const maxTime = Math.max(initialRestTime, restTimeRemaining, 1);
  const progress = restTimeRemaining / maxTime;
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <View style={styles.container}>
      <Text variant="heading2" style={styles.restTitle}>Rest</Text>

      <View style={styles.timerContainer}>
        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={theme.colors.border}
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
        <View style={styles.timerTextContainer}>
          <Text variant="display" style={styles.timeText}>
            {formatElapsedTime(restTimeRemaining)}
          </Text>
        </View>
      </View>

      <View style={styles.controlsRow}>
        <TouchableOpacity style={styles.controlButton} onPress={() => onAdjust(-15)}>
          <Text variant="title" style={styles.controlText}>-15s</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.controlButton, styles.skipButton]} onPress={onSkip}>
          <Text variant="title" style={styles.skipText}>Skip</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlButton} onPress={() => onAdjust(15)}>
          <Text variant="title" style={styles.controlText}>+15s</Text>
        </TouchableOpacity>
      </View>

      {upcomingExercise && (
        <View style={styles.upcomingContainer}>
          <Text variant="small" style={styles.upcomingLabel}>UPCOMING</Text>
          <View style={styles.upcomingCard}>
            <Image source={upcomingExercise.imageUri} style={styles.upcomingImage} />
            <View style={styles.upcomingInfo}>
              <Text variant="body" style={styles.upcomingName}>{upcomingExercise.name}</Text>
              <Text variant="caption" style={styles.upcomingDetails}>
                {upcomingExercise.sets.length} Sets • {upcomingExercise.sets[0]?.reps || 'Varies'} Reps
              </Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={24} color={theme.colors.text.secondary} />
          </View>
        </View>
      )}
    </View>
  );
};

function createStyles(theme: AegisTheme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: theme.spacing.xxl,
      paddingHorizontal: theme.spacing.lg,
    },
    restTitle: {
      marginBottom: theme.spacing.xl,
    },
    timerContainer: {
      position: 'relative',
      width: 200,
      height: 200,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: theme.spacing.xxl,
    },
    timerTextContainer: {
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
    },
    timeText: {
      fontVariant: ['tabular-nums'],
      color: theme.colors.primary,
    },
    controlsRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.lg,
      marginBottom: theme.spacing.xxl,
    },
    controlButton: {
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: theme.radius.full,
      backgroundColor: theme.colors.surface,
    },
    skipButton: {
      backgroundColor: theme.colors.primary,
      paddingHorizontal: 32,
    },
    controlText: {
      color: theme.colors.text.primary,
    },
    skipText: {
      color: '#FFFFFF',
    },
    upcomingContainer: {
      width: '100%',
      gap: theme.spacing.sm,
    },
    upcomingLabel: {
      color: theme.colors.text.secondary,
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: 1,
    },
    upcomingCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      borderRadius: theme.radius.xl,
      padding: theme.spacing.md,
      gap: theme.spacing.md,
    },
    upcomingImage: {
      width: 60,
      height: 60,
      borderRadius: theme.radius.md,
      backgroundColor: theme.colors.border,
    },
    upcomingInfo: {
      flex: 1,
      gap: 4,
    },
    upcomingName: {
      fontWeight: '700',
    },
    upcomingDetails: {
      color: theme.colors.text.secondary,
    },
  });
}
