import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@/theme/useTheme';
import type { AegisTheme } from '@/theme/themes';
import { Text } from '@/components/common/Text';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { WorkoutSummaryData, SummaryMetric } from '@/features/workout/data/mockSummaryData';

interface SummaryProgressComparisonProps {
  comparisons: WorkoutSummaryData['comparisons'];
}

export const SummaryProgressComparison = ({ comparisons }: SummaryProgressComparisonProps) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const renderComparisonRow = (label: string, metric: SummaryMetric) => {
    const isUp = metric.trend === 'up';
    const isNeutral = metric.trend === 'neutral';
    
    // In fitness, "Volume up" is usually good (primary color). "Duration down" could be good or bad, 
    // but we'll use primary for up, error/warning for down just as a basic visual. Or simply secondary for neutral.
    const trendColor = isNeutral 
      ? theme.colors.text.secondary 
      : (isUp ? theme.colors.primary : theme.colors.error);
    
    const iconName = isNeutral 
      ? 'minus' 
      : (isUp ? 'arrow-up-right' : 'arrow-down-right');

    return (
      <View style={styles.row} key={label}>
        <View style={styles.metricInfo}>
          <Text variant="body" style={styles.metricLabel}>{label}</Text>
          <Text variant="caption" color="secondary">{metric.value}</Text>
        </View>
        <View style={styles.trendContainer}>
          <MaterialCommunityIcons name={iconName} size={16} color={trendColor} />
          <Text variant="body" style={[styles.trendText, { color: trendColor }]}>
            {metric.trendValue}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text variant="heading3" style={styles.title}>Progress Comparison</Text>
      <View style={styles.card}>
        <Text variant="caption" color="secondary" style={styles.subtitle}>
          COMPARED TO PREVIOUS SESSION
        </Text>
        
        {renderComparisonRow('Volume', comparisons.volume)}
        <View style={styles.divider} />
        {renderComparisonRow('Calories', comparisons.calories)}
        <View style={styles.divider} />
        {renderComparisonRow('Duration', comparisons.duration)}
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
    card: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.radius.lg,
      borderWidth: 1,
      borderColor: theme.colors.border,
      padding: theme.spacing.lg,
    },
    subtitle: {
      marginBottom: theme.spacing.lg,
      fontWeight: '600',
      letterSpacing: 0.5,
      fontSize: 10,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: theme.spacing.sm,
    },
    metricInfo: {
      gap: 2,
    },
    metricLabel: {
      fontWeight: '500',
    },
    trendContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    trendText: {
      fontWeight: '600',
    },
    divider: {
      height: 1,
      backgroundColor: theme.colors.border,
      marginVertical: theme.spacing.xs,
    },
  });
}
