import { memo, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Text } from '@/components/common/Text';
import type { AegisTheme } from '@/theme/themes';
import { useTheme } from '@/theme/useTheme';
import { hexAlpha } from '@/utils/colors';
import { formatElapsedTime } from '@/utils/time';

import type { WorkoutSessionProgress } from '../../hooks/useActiveWorkout';
import type { CoachIconName } from '../../utils/restCoachEngine';
import { RestMeterBar } from './RestMeterBar';

/**
 * Section 8 — where the athlete stands in the session as a whole.
 *
 * Reuses {@link RestMeterBar} for the overall bar so it animates exactly like
 * the energy meter above it.
 */

const STAT_ICON_SIZE = 16;
const PERCENT_SCALE = 100;

interface RestWorkoutProgressProps {
  progress: WorkoutSessionProgress;
}

interface StatTile {
  icon: any;
  label: string;
  value: string;
  tint: string;
}

function RestWorkoutProgressComponent({
  progress,
}: RestWorkoutProgressProps) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const percent = Math.round(progress.progress * PERCENT_SCALE);

  const stats = useMemo<StatTile[]>(
    () => [
      {
        icon: 'check-circle-outline',
        label: 'Completed',
        value: `${progress.exercisesCompleted}`,
        tint: theme.colors.success,
      },
      {
        icon: 'format-list-numbered',
        label: 'Remaining',
        value: `${progress.exercisesRemaining}`,
        tint: theme.colors.primary,
      },
      {
        icon: 'clock-outline',
        label: 'Elapsed',
        value: formatElapsedTime(progress.elapsedSeconds),
        tint: theme.colors.accent,
      },
      {
        icon: 'fire',
        label: 'Calories',
        value: `${progress.caloriesBurned}`,
        tint: theme.colors.secondary,
      },
    ],
    [
      progress.caloriesBurned,
      progress.elapsedSeconds,
      progress.exercisesCompleted,
      progress.exercisesRemaining,
      theme.colors.accent,
      theme.colors.primary,
      theme.colors.secondary,
      theme.colors.success,
    ],
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.eyebrow} variant="label">
          Workout progress
        </Text>
        <Text color="text.secondary" variant="small">
          {progress.setsCompleted} of {progress.totalSets} sets
        </Text>
      </View>

      <RestMeterBar
        accessibilityLabel={`Workout ${percent} percent complete`}
        label={`${progress.exercisesCompleted} of ${progress.totalExercises} exercises`}
        value={progress.progress}
        valueLabel={`${percent}%`}
      />

      <View style={styles.statGrid}>
        {stats.map((stat) => (
          <View key={stat.label} style={styles.statTile}>
            <View
              style={[
                styles.statIcon,
                { backgroundColor: hexAlpha(stat.tint, 0.12) },
              ]}
            >
              <MaterialCommunityIcons
                color={stat.tint}
                name={stat.icon}
                size={STAT_ICON_SIZE}
              />
            </View>
            <View style={styles.statTextGroup}>
              <Text numberOfLines={1} style={styles.statValue} variant="caption">
                {stat.value}
              </Text>
              <Text color="text.tertiary" numberOfLines={1} variant="small">
                {stat.label}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

function createStyles(theme: AegisTheme) {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.border,
      borderRadius: theme.radius.xxl,
      borderWidth: StyleSheet.hairlineWidth,
      gap: theme.spacing.md,
      padding: theme.spacing.lg,
    },
    headerRow: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    eyebrow: {
      color: theme.colors.text.tertiary,
      textTransform: 'uppercase',
    },
    statGrid: {
      borderTopColor: theme.colors.border,
      borderTopWidth: StyleSheet.hairlineWidth,
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingTop: theme.spacing.sm,
      rowGap: theme.spacing.sm,
    },
    statTile: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: theme.spacing.xs,
      width: '50%',
    },
    statIcon: {
      alignItems: 'center',
      borderRadius: theme.radius.full,
      height: theme.metrics.scaleSize(30),
      justifyContent: 'center',
      width: theme.metrics.scaleSize(30),
    },
    statTextGroup: {
      flex: 1,
    },
    statValue: {
      color: theme.colors.text.primary,
      fontWeight: '700',
    },
  });
}

export const RestWorkoutProgress = memo(RestWorkoutProgressComponent);

RestWorkoutProgress.displayName = 'RestWorkoutProgress';
