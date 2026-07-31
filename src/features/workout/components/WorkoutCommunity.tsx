import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "@/theme/useTheme";
import type { AegisTheme } from "@/theme/themes";
import { Text } from "@/components/common/Text";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MOCK_WORKOUT_DETAIL } from "../data/mockWorkoutDetail";
import { Card } from "@/components/common/Card";

interface WorkoutCommunityProps {
  workout: typeof MOCK_WORKOUT_DETAIL;
}

export const WorkoutCommunity = ({ workout }: WorkoutCommunityProps) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Text variant="title" style={styles.sectionTitle}>Community Insights</Text>
      
      <Card style={styles.card}>
        <View style={styles.mainRow}>
          <View style={styles.ratingBlock}>
            <View style={styles.ratingNumberRow}>
              <Text variant="heading1" style={styles.ratingValue}>{workout.rating}</Text>
              <MaterialCommunityIcons name="star" size={24} color="#FBBF24" />
            </View>
            <Text variant="caption" style={styles.reviewsText}>{workout.reviewsCount} reviews</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.statsBlock}>
            <View style={styles.statRow}>
              <MaterialCommunityIcons name="check-all" size={18} color={theme.colors.success} />
              <View style={styles.statTexts}>
                <Text variant="small" style={styles.statValue}>{workout.timesCompleted}</Text>
                <Text variant="caption" style={styles.statLabel}>Times Completed</Text>
              </View>
            </View>
            <View style={styles.statRow}>
              <MaterialCommunityIcons name="account-group" size={18} color={theme.colors.info} />
              <View style={styles.statTexts}>
                <Text variant="small" style={styles.statValue}>Highly Popular</Text>
                <Text variant="caption" style={styles.statLabel}>Top 5% this week</Text>
              </View>
            </View>
          </View>
        </View>
      </Card>
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
    card: {
      backgroundColor: theme.colors.surface,
    },
    mainRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    ratingBlock: {
      alignItems: 'center',
      paddingRight: theme.spacing.lg,
    },
    ratingNumberRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    ratingValue: {
      fontWeight: '800',
    },
    reviewsText: {
      color: theme.colors.text.secondary,
      marginTop: 4,
    },
    divider: {
      width: 1,
      height: '100%',
      backgroundColor: theme.colors.border,
      marginRight: theme.spacing.lg,
    },
    statsBlock: {
      flex: 1,
      gap: theme.spacing.md,
    },
    statRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    statTexts: {
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
