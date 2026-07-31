import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@/components/common/Text';
import { useTheme } from '@/theme/useTheme';
import type { AegisTheme } from '@/theme/themes';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { hexAlpha } from '@/utils/colors';
import { LinearGradient } from 'expo-linear-gradient';
import type { ActiveExercise } from '../../hooks/useActiveWorkout';

interface ActiveAiCoachProps {
  exercise: ActiveExercise;
  currentSetIndex: number;
  workoutIntelligence?: {
    recovery: number;
    readiness: string;
    pace: string;
  };
}

export const ActiveAiCoach = ({ exercise, currentSetIndex, workoutIntelligence }: ActiveAiCoachProps) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const contextualTip = useMemo(() => {
    if (currentSetIndex > 0 && exercise.previousWeight && exercise.previousWeight < (exercise.suggestedWeight || 0)) {
      return `You completed your previous set easily. Consider increasing the weight to ${exercise.suggestedWeight} kg.`;
    }
    if (workoutIntelligence?.pace === 'Excellent' && currentSetIndex > 1) {
      return "Excellent pace. Keep your current tempo.";
    }
    if (workoutIntelligence?.recovery > 90) {
      return "High readiness detected. You can push hard on this set.";
    }
    return exercise.aiTip || "Maintain a neutral spine throughout this movement.";
  }, [exercise, currentSetIndex, workoutIntelligence]);

  if (!contextualTip) return null;

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        {/* Glassmorphic background gradient */}
        <LinearGradient
          colors={[
            hexAlpha(theme.colors.primary, 0.12),
            hexAlpha(theme.colors.primary, 0.04),
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />

        <View style={styles.headerRow}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons name="creation" size={16} color={theme.colors.primary} />
          </View>
          <Text variant="small" style={styles.title}>Aegis AI Coach</Text>
        </View>

        <Text variant="body" style={styles.tipText}>{contextualTip}</Text>
      </View>
    </View>
  );
};

function createStyles(theme: AegisTheme) {
  return StyleSheet.create({
    outerContainer: {
      marginHorizontal: theme.spacing.lg,
      marginTop: -24, // Pull up to overlap the showcase image slightly
    },
    container: {
      borderRadius: theme.radius.xl,
      padding: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
      borderWidth: 1,
      borderColor: hexAlpha(theme.colors.primary, 0.15),
      overflow: 'hidden',
      backgroundColor: hexAlpha(theme.colors.surface, 0.85),
      // Glassmorphic shadow
      shadowColor: theme.colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 16,
      elevation: 4,
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginBottom: 6,
    },
    iconContainer: {
      width: 26,
      height: 26,
      borderRadius: 13,
      backgroundColor: hexAlpha(theme.colors.primary, 0.15),
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      color: theme.colors.primary,
      fontWeight: '700',
      letterSpacing: 0.3,
      textTransform: 'uppercase',
      fontSize: 11,
    },
    tipText: {
      color: theme.colors.text.primary,
      lineHeight: 21,
      fontSize: 13,
    },
  });
}
