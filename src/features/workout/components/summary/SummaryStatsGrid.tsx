import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@/theme/useTheme';
import type { AegisTheme } from '@/theme/themes';
import { Text } from '@/components/common/Text';
import type { WorkoutSummaryData } from '@/features/workout/data/mockSummaryData';

interface SummaryStatsGridProps {
  metrics: WorkoutSummaryData['metrics'];
}

export const SummaryStatsGrid = ({ metrics }: SummaryStatsGridProps) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const stats = [
    { label: 'Duration', value: `${metrics.duration}m` },
    { label: 'Calories', value: `${metrics.calories} kcal` },
    { label: 'Exercises', value: `${metrics.exercises}` },
    { label: 'Sets', value: `${metrics.sets}` },
    { label: 'Reps', value: `${metrics.reps}` },
    { label: 'Volume', value: `${metrics.volumeKg} kg` },
  ];

  return (
    <View style={styles.container}>
      <Text variant="heading3" style={styles.title}>Workout Summary</Text>
      <View style={styles.grid}>
        {stats.map((stat, index) => (
          <View key={index} style={styles.card}>
            <Text variant="caption" color="secondary" style={styles.label}>
              {stat.label.toUpperCase()}
            </Text>
            <Text variant="heading3" style={styles.value}>
              {stat.value}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

function createStyles(theme: AegisTheme) {
  return StyleSheet.create({
    container: {
      marginBottom: theme.spacing.xl,
    },
    title: {
      marginBottom: theme.spacing.md,
      marginLeft: theme.spacing.xs,
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: theme.spacing.sm,
    },
    card: {
      width: '31%', // 3 columns
      minWidth: 100,
      backgroundColor: theme.colors.surface,
      padding: theme.spacing.md,
      borderRadius: theme.radius.lg,
      borderWidth: 1,
      borderColor: theme.colors.border,
      alignItems: 'flex-start',
    },
    label: {
      marginBottom: theme.spacing.xs,
      fontSize: 10,
      letterSpacing: 0.5,
    },
    value: {
      fontSize: 20,
    },
  });
}
