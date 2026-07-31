import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@/theme/useTheme";
import type { AegisTheme } from "@/theme/themes";
import { Text } from "@/components/common/Text";
import { Card } from "@/components/common/Card";
import { MOCK_WORKOUT_DETAIL } from "../data/mockWorkoutDetail";
import { hexAlpha } from "@/utils/colors";

interface WorkoutOverviewProps {
  workout: typeof MOCK_WORKOUT_DETAIL;
}

export const WorkoutOverview = ({ workout }: WorkoutOverviewProps) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const stats = [
    { label: "Duration", value: workout.duration, icon: "timer-outline", color: theme.colors.primary },
    { label: "Calories", value: `${workout.calories} kcal`, icon: "fire", color: theme.colors.error },
    { label: "Exercises", value: workout.totalExercises.toString(), icon: "dumbbell", color: theme.colors.info },
    { label: "Total Sets", value: workout.totalSets.toString(), icon: "format-list-numbered", color: theme.colors.warning },
    { label: "Difficulty", value: workout.difficulty, icon: "speedometer", color: theme.colors.success },
    { label: "Recovery", value: workout.estimatedRecovery, icon: "heart-pulse", color: "#8B5CF6" },
  ] as const;

  return (
    <View style={styles.container}>
      <Text variant="title" style={styles.sectionTitle}>Workout Overview</Text>
      
      <View style={styles.grid}>
        {stats.map((stat, index) => (
          <View key={index} style={styles.gridItemWrap}>
            <Card style={styles.statCard}>
              <View style={[styles.iconWrap, { backgroundColor: hexAlpha(stat.color, 0.1) }]}>
                <MaterialCommunityIcons name={stat.icon} size={28} color={stat.color} />
              </View>
              <View style={styles.statContent}>
                <Text variant="title" style={styles.statValue}>{stat.value}</Text>
                <Text variant="caption" style={styles.statLabel}>{stat.label}</Text>
              </View>
            </Card>
          </View>
        ))}
      </View>
    </View>
  );
};

function createStyles(theme: AegisTheme) {
  return StyleSheet.create({
    container: {
      marginBottom: theme.spacing.xxl,
    },
    sectionTitle: {
      marginBottom: theme.spacing.md,
      fontWeight: '700',
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginHorizontal: -6, // To offset padding on items
    },
    gridItemWrap: {
      width: '50%',
      padding: 6,
    },
    statCard: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    iconWrap: {
      width: 44,
      height: 44,
      borderRadius: 22,
      justifyContent: 'center',
      alignItems: 'center',
    },
    statContent: {
      flex: 1,
    },
    statValue: {
      fontWeight: '700',
      marginBottom: 2,
    },
    statLabel: {
      color: theme.colors.text.secondary,
    },
  });
}
