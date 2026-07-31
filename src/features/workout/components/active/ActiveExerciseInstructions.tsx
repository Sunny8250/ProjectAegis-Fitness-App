import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@/components/common/Text';
import { useTheme } from '@/theme/useTheme';
import type { AegisTheme } from '@/theme/themes';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { hexAlpha } from '@/utils/colors';

interface ActiveExerciseInstructionsProps {
  instructions: string[];
}

export const ActiveExerciseInstructions = ({ instructions }: ActiveExerciseInstructionsProps) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  if (!instructions || instructions.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text variant="heading3" style={styles.title}>Form & Technique</Text>
      <View style={styles.list}>
        {instructions.map((step, index) => (
          <View key={index} style={styles.stepCard}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name="check-circle" size={20} color={theme.colors.success} />
            </View>
            <Text variant="body" style={styles.stepText}>{step}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

function createStyles(theme: AegisTheme) {
  return StyleSheet.create({
    container: {
      paddingHorizontal: theme.spacing.lg,
      marginVertical: theme.spacing.md,
    },
    title: {
      marginBottom: theme.spacing.md,
    },
    list: {
      gap: theme.spacing.sm,
    },
    stepCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: hexAlpha(theme.colors.surface, 0.4),
      padding: theme.spacing.md,
      borderRadius: theme.radius.md,
      borderWidth: 1,
      borderColor: hexAlpha(theme.colors.text.secondary, 0.1),
      gap: theme.spacing.md,
    },
    iconContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    stepText: {
      flex: 1,
      color: theme.colors.text.primary,
      lineHeight: 20,
    },
  });
}
