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
      <Text variant="heading3" style={styles.title}>Instructions</Text>
      <View style={styles.list}>
        {instructions.map((step, index) => (
          <View key={index} style={styles.stepContainer}>
            <View style={styles.stepNumberContainer}>
              <Text variant="small" style={styles.stepNumber}>{index + 1}</Text>
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
      gap: theme.spacing.md,
    },
    stepContainer: {
      flexDirection: 'row',
      gap: theme.spacing.md,
      alignItems: 'flex-start',
    },
    stepNumberContainer: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: hexAlpha(theme.colors.text.secondary, 0.15),
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 2,
    },
    stepNumber: {
      color: theme.colors.text.secondary,
      fontWeight: '700',
    },
    stepText: {
      flex: 1,
      color: theme.colors.text.primary,
      lineHeight: 22,
    },
  });
}
