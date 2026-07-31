import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "@/theme/useTheme";
import type { AegisTheme } from "@/theme/themes";
import { Text } from "@/components/common/Text";
import { MOCK_WORKOUT_DETAIL } from "../data/mockWorkoutDetail";
import { hexAlpha } from "@/utils/colors";

interface WorkoutStatsProps {
  workout: typeof MOCK_WORKOUT_DETAIL;
}

export const WorkoutStats = ({ workout }: WorkoutStatsProps) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Text variant="title" style={styles.sectionTitle}>Workout Statistics</Text>
      
      <View style={styles.statsContainer}>
        {/* Completion Rate */}
        <View style={styles.statItem}>
          <View style={styles.statHeader}>
            <Text variant="small" style={styles.statLabel}>Completion Rate</Text>
            <Text variant="small" style={styles.statValue}>{workout.completionRate}%</Text>
          </View>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${workout.completionRate}%`, backgroundColor: theme.colors.success }]} />
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.rowStats}>
          <View style={styles.miniStat}>
            <Text variant="caption" style={styles.miniLabel}>Avg Duration</Text>
            <Text variant="body" style={styles.miniValue}>{workout.duration}</Text>
          </View>
          <View style={styles.miniDivider} />
          <View style={styles.miniStat}>
            <Text variant="caption" style={styles.miniLabel}>Avg Calories</Text>
            <Text variant="body" style={styles.miniValue}>{workout.calories}</Text>
          </View>
          <View style={styles.miniDivider} />
          <View style={styles.miniStat}>
            <Text variant="caption" style={styles.miniLabel}>Avg Rating</Text>
            <Text variant="body" style={styles.miniValue}>{workout.rating}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

function createStyles(theme: AegisTheme) {
  return StyleSheet.create({
    container: {
      marginBottom: 100, // Extra space for action bar
    },
    sectionTitle: {
      marginBottom: theme.spacing.md,
      fontWeight: '700',
    },
    statsContainer: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.radius.xl,
      padding: theme.spacing.lg,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    statItem: {
      marginBottom: theme.spacing.lg,
    },
    statHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    statLabel: {
      color: theme.colors.text.secondary,
      fontWeight: '600',
    },
    statValue: {
      fontWeight: '700',
    },
    progressBarBg: {
      height: 6,
      backgroundColor: hexAlpha(theme.colors.border, 0.5),
      borderRadius: 3,
      overflow: 'hidden',
    },
    progressBarFill: {
      height: '100%',
      borderRadius: 3,
    },
    divider: {
      height: 1,
      backgroundColor: theme.colors.border,
      marginBottom: theme.spacing.lg,
    },
    rowStats: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    miniStat: {
      flex: 1,
      alignItems: 'center',
    },
    miniDivider: {
      width: 1,
      height: 20,
      backgroundColor: theme.colors.border,
    },
    miniLabel: {
      color: theme.colors.text.secondary,
      marginBottom: 4,
    },
    miniValue: {
      fontWeight: '700',
    },
  });
}
