import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "@/theme/useTheme";
import type { AegisTheme } from "@/theme/themes";
import { Text } from "@/components/common/Text";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MOCK_WORKOUT_DETAIL } from "../data/mockWorkoutDetail";
import { hexAlpha } from "@/utils/colors";

interface WorkoutBenefitsProps {
  benefits: typeof MOCK_WORKOUT_DETAIL.aiRecommendation.benefits;
}

export const WorkoutBenefits = ({ benefits }: WorkoutBenefitsProps) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Text variant="title" style={styles.sectionTitle}>Expected Benefits</Text>
      
      <View style={styles.benefitsContainer}>
        {benefits.map((benefit, index) => (
          <View key={index} style={styles.benefitRow}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons 
                name={benefit.icon as any} 
                size={20} 
                color={theme.colors.primary} 
              />
            </View>
            <Text variant="body" style={styles.benefitText}>{benefit.text}</Text>
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
    benefitsContainer: {
      gap: theme.spacing.md,
    },
    benefitRow: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      padding: theme.spacing.md,
      borderRadius: theme.radius.lg,
      gap: 16,
    },
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: hexAlpha(theme.colors.primary, 0.1),
      justifyContent: 'center',
      alignItems: 'center',
    },
    benefitText: {
      flex: 1,
      fontWeight: '500',
    },
  });
}
