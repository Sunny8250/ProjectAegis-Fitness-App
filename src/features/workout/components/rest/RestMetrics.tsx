import React, { memo, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Text } from '@/components/common/Text';
import type { AegisTheme } from '@/theme/themes';
import { useTheme } from '@/theme/useTheme';
import { hexAlpha } from '@/utils/colors';

import type { RecoveryEstimate } from '../../utils/recoveryEstimator';
import type { WorkoutSessionProgress } from '../../hooks/useActiveWorkout';
import type { CoachIconName } from '../../utils/restCoachEngine';

interface RestMetricsProps {
  recovery: RecoveryEstimate;
  progress: WorkoutSessionProgress;
}

interface MetricCardProps {
  icon: CoachIconName | any; // allow extended icons
  label: string;
  value: string;
  valueColor?: string;
  backgroundColor?: string;
}

function MetricCard({ icon, label, value, valueColor, backgroundColor }: MetricCardProps) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={[styles.card, backgroundColor ? { backgroundColor } : null]}>
      <View style={styles.cardHeader}>
        <MaterialCommunityIcons name={icon} color={theme.colors.text.tertiary} size={14} />
        <Text color="text.tertiary" variant="caption">
          {label}
        </Text>
      </View>
      <Text style={[styles.cardValue, valueColor ? { color: valueColor } : null]}>
        {value}
      </Text>
    </View>
  );
}

function RestMetricsComponent({ recovery, progress }: RestMetricsProps) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const zoneColor =
    recovery.zone === 'excellent' ? theme.colors.success :
    recovery.zone === 'poor' ? theme.colors.error :
    theme.colors.primary;

  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow} variant="label">
        Recovery Metrics
      </Text>

      <View style={styles.grid}>
        <MetricCard
          icon="lightning-bolt"
          label="Energy"
          value={`${recovery.energyPercent}%`}
          valueColor={theme.colors.secondary}
          backgroundColor={hexAlpha(theme.colors.secondary, 0.05)}
        />
        <MetricCard
          icon="run-fast"
          label="Pace"
          value={progress.progress > 0.5 ? 'Optimal' : 'Steady'}
        />
        <MetricCard
          icon="water-outline"
          label="Hydration"
          value="Reminder"
          valueColor={theme.colors.info}
          backgroundColor={hexAlpha(theme.colors.info, 0.05)}
        />
        <MetricCard
          icon="brain"
          label="Fatigue"
          value={recovery.energyPercent < 40 ? 'High' : 'Moderate'}
        />
      </View>
    </View>
  );
}

function createStyles(theme: AegisTheme) {
  return StyleSheet.create({
    container: {
      gap: theme.spacing.sm,
    },
    eyebrow: {
      color: theme.colors.text.tertiary,
      textTransform: 'uppercase',
      marginLeft: theme.spacing.xs,
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: theme.spacing.sm,
    },
    card: {
      flex: 1,
      minWidth: '45%',
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.border,
      borderWidth: StyleSheet.hairlineWidth,
      borderRadius: theme.radius.lg,
      padding: theme.spacing.md,
      gap: theme.spacing.xs,
    },
    cardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.xxs,
    },
    cardValue: {
      color: theme.colors.text.primary,
      fontWeight: '700',
      fontSize: 16,
    },
  });
}

export const RestMetrics = memo(RestMetricsComponent);
RestMetrics.displayName = 'RestMetrics';
