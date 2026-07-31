import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@/theme/useTheme';
import type { AegisTheme } from '@/theme/themes';
import { Text } from '@/components/common/Text';
import { Card } from '@/components/common/Card';
import { MOCK_ANALYTICS_DATA } from '../data/mockAnalyticsData';

interface Props {
  heatMap: typeof MOCK_ANALYTICS_DATA.muscleHeatMap;
}

export const AnalyticsMuscleHeatMap = ({ heatMap }: Props) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const renderMuscleGroup = (title: string, muscles: string[], color: string) => {
    if (!muscles || muscles.length === 0) return null;
    return (
      <View style={styles.groupContainer}>
        <View style={styles.groupHeader}>
          <View style={[styles.colorDot, { backgroundColor: color }]} />
          <Text variant="caption" style={styles.groupTitle}>{title}</Text>
        </View>
        <View style={styles.chipRow}>
          {muscles.map((muscle) => (
            <View key={muscle} style={[styles.chip, { backgroundColor: color + '15', borderColor: color + '30' }]}>
              <Text variant="small" style={{ color: theme.colors.text.primary }}>
                {muscle.replace('_', ' ').toUpperCase()}
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <Card style={styles.container}>
      <Text variant="heading3" style={styles.title}>Muscle Heat Map</Text>
      
      <View style={styles.content}>
        {renderMuscleGroup('Frequently Trained', heatMap.frequentlyTrained, theme.colors.error)}
        {renderMuscleGroup('Recovering', heatMap.recovering, theme.colors.success)}
        {renderMuscleGroup('Undertrained', heatMap.undertrained, theme.colors.warning)}
        {renderMuscleGroup('Neglected', heatMap.neglected, theme.colors.text.tertiary)}
      </View>
    </Card>
  );
};

function createStyles(theme: AegisTheme) {
  return StyleSheet.create({
    container: {
      padding: theme.spacing.lg,
    },
    title: {
      color: theme.colors.text.primary,
      marginBottom: theme.spacing.lg,
    },
    content: {
      gap: theme.spacing.md,
    },
    groupContainer: {
      marginBottom: theme.spacing.xs,
    },
    groupHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginBottom: 8,
    },
    colorDot: {
      width: 10,
      height: 10,
      borderRadius: 5,
    },
    groupTitle: {
      color: theme.colors.text.secondary,
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    chipRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    chip: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: theme.radius.sm,
      borderWidth: 1,
    }
  });
}
