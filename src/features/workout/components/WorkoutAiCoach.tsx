import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "@/theme/useTheme";
import type { AegisTheme } from "@/theme/themes";
import { Text } from "@/components/common/Text";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { hexAlpha } from "@/utils/colors";

interface WorkoutAiCoachProps {
  tip: string;
}

export const WorkoutAiCoach = ({ tip }: WorkoutAiCoachProps) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Text variant="title" style={styles.sectionTitle}>AI Coaching Tip</Text>
      
      <View style={styles.card}>
        <View style={styles.header}>
          <MaterialCommunityIcons name="robot" size={24} color={theme.colors.info} />
          <Text variant="title" style={styles.cardTitle}>Coach Tip</Text>
        </View>
        <Text variant="body" style={styles.tipText}>&quot;{tip}&quot;</Text>
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
    card: {
      backgroundColor: hexAlpha(theme.colors.info, 0.1),
      borderRadius: theme.radius.xl,
      padding: theme.spacing.lg,
      borderWidth: 1,
      borderColor: hexAlpha(theme.colors.info, 0.2),
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginBottom: theme.spacing.sm,
    },
    cardTitle: {
      fontWeight: '700',
      color: theme.colors.info,
    },
    tipText: {
      fontStyle: 'italic',
      lineHeight: 22,
      color: theme.colors.text.primary,
    },
  });
}
