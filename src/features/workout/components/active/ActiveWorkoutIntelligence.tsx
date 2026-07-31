import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text } from '@/components/common/Text';
import { useTheme } from '@/theme/useTheme';
import type { AegisTheme } from '@/theme/themes';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { hexAlpha } from '@/utils/colors';

interface ActiveWorkoutIntelligenceProps {
  intelligence: {
    recovery: number;
    readiness: string;
    pace: string;
    recommendedRest: number;
    fatigue: string;
  };
}

export const ActiveWorkoutIntelligence = ({ intelligence }: ActiveWorkoutIntelligenceProps) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  if (!intelligence) return null;

  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <MaterialCommunityIcons name="brain" size={16} color={theme.colors.primary} />
        <Text variant="heading3" style={styles.sectionTitle}>Workout Intelligence</Text>
      </View>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipsScroll}
      >
        <View style={styles.chip}>
          <MaterialCommunityIcons name="battery-high" size={14} color={theme.colors.success} />
          <Text variant="caption" style={styles.chipLabel}>Recovery</Text>
          <Text variant="caption" style={styles.chipValue}>{intelligence.recovery}%</Text>
        </View>

        <View style={styles.chip}>
          <MaterialCommunityIcons name="speedometer" size={14} color={theme.colors.primary} />
          <Text variant="caption" style={styles.chipLabel}>Pace</Text>
          <Text variant="caption" style={styles.chipValue}>{intelligence.pace}</Text>
        </View>

        <View style={styles.chip}>
          <MaterialCommunityIcons name="timer-sand" size={14} color={theme.colors.warning} />
          <Text variant="caption" style={styles.chipLabel}>Suggested Rest</Text>
          <Text variant="caption" style={styles.chipValue}>{intelligence.recommendedRest}s</Text>
        </View>

        <View style={styles.chip}>
          <MaterialCommunityIcons name="check-decagram" size={14} color={theme.colors.info} />
          <Text variant="caption" style={styles.chipLabel}>Readiness</Text>
          <Text variant="caption" style={styles.chipValue}>{intelligence.readiness}</Text>
        </View>

        <View style={styles.chip}>
          <MaterialCommunityIcons name="lightning-bolt" size={14} color={theme.colors.error} />
          <Text variant="caption" style={styles.chipLabel}>Fatigue</Text>
          <Text variant="caption" style={styles.chipValue}>{intelligence.fatigue}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

function createStyles(theme: AegisTheme) {
  return StyleSheet.create({
    container: {
      marginTop: theme.spacing.xl,
    },
    titleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: theme.spacing.lg,
      gap: 6,
      marginBottom: theme.spacing.md,
    },
    sectionTitle: {
      fontWeight: '700',
    },
    chipsScroll: {
      paddingHorizontal: theme.spacing.lg,
      gap: 8,
    },
    chip: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: hexAlpha(theme.colors.surface, 0.5),
      borderWidth: 1,
      borderColor: hexAlpha(theme.colors.text.secondary, 0.1),
      borderRadius: theme.radius.full,
      paddingHorizontal: 12,
      paddingVertical: 6,
      gap: 6,
    },
    chipLabel: {
      color: theme.colors.text.secondary,
      textTransform: 'uppercase',
      fontSize: 10,
      letterSpacing: 0.5,
    },
    chipValue: {
      color: theme.colors.text.primary,
      fontWeight: '700',
      fontSize: 11,
    },
  });
}
