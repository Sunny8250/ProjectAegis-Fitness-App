import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "@/theme/useTheme";
import type { AegisTheme } from "@/theme/themes";
import { Text } from "@/components/common/Text";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MOCK_WORKOUT_DETAIL } from "../data/mockWorkoutDetail";
import { hexAlpha } from "@/utils/colors";

interface WorkoutMusclesProps {
  muscles: typeof MOCK_WORKOUT_DETAIL.aiRecommendation.targetMuscles;
}

export const WorkoutMuscles = ({ muscles }: WorkoutMusclesProps) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Text variant="title" style={styles.sectionTitle}>Target Muscles</Text>
      
      <View style={styles.muscleContainer}>
        {/* Primary Muscles */}
        <View style={styles.muscleGroup}>
          <Text variant="small" style={styles.groupLabel}>PRIMARY</Text>
          <View style={styles.chipRow}>
            {muscles.primary.map((muscle, index) => (
              <View key={`primary-${index}`} style={[styles.chip, styles.chipPrimary]}>
                <MaterialCommunityIcons name="target" size={14} color={theme.colors.primary} />
                <Text variant="small" style={styles.chipTextPrimary}>{muscle}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Secondary Muscles */}
        {muscles.secondary && muscles.secondary.length > 0 && (
          <View style={styles.muscleGroup}>
            <Text variant="small" style={styles.groupLabel}>SECONDARY</Text>
            <View style={styles.chipRow}>
              {muscles.secondary.map((muscle, index) => (
                <View key={`secondary-${index}`} style={[styles.chip, styles.chipSecondary]}>
                  <Text variant="small" style={styles.chipTextSecondary}>{muscle}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
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
    muscleContainer: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.radius.xl,
      padding: theme.spacing.lg,
      gap: theme.spacing.lg,
    },
    muscleGroup: {
      gap: theme.spacing.sm,
    },
    groupLabel: {
      color: theme.colors.text.secondary,
      fontWeight: '600',
      letterSpacing: 0.5,
    },
    chipRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    chip: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: theme.radius.full,
      gap: 6,
    },
    chipPrimary: {
      backgroundColor: hexAlpha(theme.colors.primary, 0.1),
      borderWidth: 1,
      borderColor: hexAlpha(theme.colors.primary, 0.2),
    },
    chipSecondary: {
      backgroundColor: hexAlpha(theme.colors.text.secondary, 0.1),
    },
    chipTextPrimary: {
      color: theme.colors.primary,
      fontWeight: '600',
    },
    chipTextSecondary: {
      color: theme.colors.text.secondary,
      fontWeight: '500',
    },
  });
}
