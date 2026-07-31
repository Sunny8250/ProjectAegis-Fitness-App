import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from '@/components/common/Text';
import { useTheme } from '@/theme/useTheme';
import type { AegisTheme } from '@/theme/themes';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { ActiveExercise } from '../../hooks/useActiveWorkout';
import { hexAlpha } from '@/utils/colors';

interface ActiveSetTrackerProps {
  exercise: ActiveExercise;
  currentSetIndex: number;
  onUpdateSet: (setIndex: number, weight: number, reps: string) => void;
}

export const ActiveSetTracker = ({ exercise, currentSetIndex, onUpdateSet }: ActiveSetTrackerProps) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      {/* Section Title */}
      <View style={styles.titleRow}>
        <Text variant="heading3" style={styles.sectionTitle}>Sets</Text>
        <Text variant="caption" style={styles.sectionSubtitle}>
          {exercise.sets.filter(s => s.completed).length}/{exercise.sets.length} completed
        </Text>
      </View>

      {/* Column Headers */}
      <View style={styles.headerRow}>
        <Text variant="caption" style={styles.headerLabel}>SET</Text>
        <Text variant="caption" style={[styles.headerLabel, styles.headerCenter]}>WEIGHT</Text>
        <Text variant="caption" style={[styles.headerLabel, styles.headerCenter]}>REPS</Text>
        <View style={styles.headerCheckPlaceholder} />
      </View>

      {/* Sets */}
      <View style={styles.setsList}>
        {exercise.sets.map((set, index) => {
          const isCurrent = index === currentSetIndex;
          const isCompleted = set.completed;

          const handleWeightChange = (amount: number) => {
            if (isCompleted) return;
            onUpdateSet(index, Math.max(0, set.weight + amount), set.reps);
          };

          const handleRepsChange = (amount: number) => {
            if (isCompleted) return;
            const currentRepsMatch = set.reps.match(/\d+/);
            const currentReps = currentRepsMatch ? parseInt(currentRepsMatch[0], 10) : 10;
            onUpdateSet(index, set.weight, Math.max(0, currentReps + amount).toString());
          };

          // Completed sets render as a minimal row
          if (isCompleted) {
            return (
              <View key={set.id} style={styles.completedRow}>
                <View style={styles.setNumberBubbleCompleted}>
                  <MaterialCommunityIcons name="check" size={14} color={theme.colors.success} />
                </View>
                <Text variant="body" style={styles.completedText}>
                  {set.weight} kg × {set.reps} reps
                </Text>
              </View>
            );
          }

          // Current active set — prominent card
          if (isCurrent) {
            return (
              <View key={set.id} style={styles.activeSetCard}>
                {/* Set Number */}
                <View style={styles.activeSetHeader}>
                  <View style={styles.setNumberBubbleActive}>
                    <Text variant="caption" style={styles.activeSetNumber}>{index + 1}</Text>
                  </View>
                  <Text variant="small" style={styles.activeSetLabel}>Current Set</Text>
                </View>

                {/* Historical Context */}
                <View style={styles.historicalContextRow}>
                  <View style={styles.historyBlock}>
                    <Text variant="caption" style={styles.historyLabel}>PREVIOUS</Text>
                    <Text variant="body" style={styles.historyValue}>
                      {exercise.previousWeight ? `${exercise.previousWeight} kg` : '-'} × {exercise.previousReps || '-'}
                    </Text>
                  </View>
                  <View style={styles.historyDivider} />
                  <View style={styles.historyBlock}>
                    <Text variant="caption" style={styles.historyLabel}>SUGGESTED</Text>
                    <Text variant="body" style={[styles.historyValue, { color: theme.colors.primary }]}>
                      {exercise.suggestedWeight ? `${exercise.suggestedWeight} kg` : '-'}
                    </Text>
                  </View>
                </View>

                {/* Weight and Reps Editors */}
                <View style={styles.editorsRow}>
                  {/* Weight */}
                  <View style={styles.editorBlock}>
                    <Text variant="caption" style={styles.editorLabel}>WEIGHT (kg)</Text>
                    <View style={styles.editorControls}>
                      <TouchableOpacity onPress={() => handleWeightChange(-2.5)} style={styles.editBtn}>
                        <MaterialCommunityIcons name="minus" size={18} color={theme.colors.text.primary} />
                      </TouchableOpacity>
                      <Text variant="heading2" style={styles.editorValue}>{set.weight}</Text>
                      <TouchableOpacity onPress={() => handleWeightChange(2.5)} style={styles.editBtn}>
                        <MaterialCommunityIcons name="plus" size={18} color={theme.colors.text.primary} />
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/* Divider */}
                  <View style={styles.editorDivider} />

                  {/* Reps */}
                  <View style={styles.editorBlock}>
                    <Text variant="caption" style={styles.editorLabel}>REPS</Text>
                    <View style={styles.editorControls}>
                      <TouchableOpacity onPress={() => handleRepsChange(-1)} style={styles.editBtn}>
                        <MaterialCommunityIcons name="minus" size={18} color={theme.colors.text.primary} />
                      </TouchableOpacity>
                      <Text variant="heading2" style={styles.editorValue}>{set.reps}</Text>
                      <TouchableOpacity onPress={() => handleRepsChange(1)} style={styles.editBtn}>
                        <MaterialCommunityIcons name="plus" size={18} color={theme.colors.text.primary} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            );
          }

          // Upcoming sets — subdued minimal row
          return (
            <View key={set.id} style={styles.upcomingRow}>
              <View style={styles.setNumberBubbleUpcoming}>
                <Text variant="caption" style={styles.upcomingSetNumber}>{index + 1}</Text>
              </View>
              <Text variant="body" style={styles.upcomingText}>
                {set.reps} reps
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

function createStyles(theme: AegisTheme) {
  return StyleSheet.create({
    container: {
      marginHorizontal: theme.spacing.lg,
    },
    titleRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: theme.spacing.md,
    },
    sectionTitle: {
      fontWeight: '700',
    },
    sectionSubtitle: {
      color: theme.colors.text.secondary,
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: theme.spacing.sm,
      marginBottom: theme.spacing.sm,
    },
    headerLabel: {
      color: theme.colors.text.secondary,
      fontWeight: '600',
      fontSize: 10,
      letterSpacing: 1,
      textTransform: 'uppercase',
      width: 36,
    },
    headerCenter: {
      flex: 1,
      textAlign: 'center',
      width: undefined,
    },
    headerCheckPlaceholder: {
      width: 28,
    },
    setsList: {
      gap: 8,
    },

    // ── Completed Set ──
    completedRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
      paddingHorizontal: theme.spacing.sm,
      gap: 12,
    },
    setNumberBubbleCompleted: {
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: hexAlpha(theme.colors.success, 0.12),
      justifyContent: 'center',
      alignItems: 'center',
    },
    completedText: {
      color: theme.colors.text.secondary,
      fontSize: 13,
    },

    // ── Active Set Card ──
    activeSetCard: {
      backgroundColor: hexAlpha(theme.colors.primary, 0.06),
      borderRadius: theme.radius.xl,
      borderWidth: 1.5,
      borderColor: hexAlpha(theme.colors.primary, 0.35),
      padding: theme.spacing.lg,
      gap: theme.spacing.md,
    },
    activeSetHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    setNumberBubbleActive: {
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: theme.colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    activeSetNumber: {
      color: '#FFFFFF',
      fontWeight: '800',
      fontSize: 12,
    },
    activeSetLabel: {
      color: theme.colors.primary,
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      fontSize: 11,
    },
    historicalContextRow: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: hexAlpha(theme.colors.surface, 0.5),
      borderRadius: theme.radius.md,
      paddingVertical: 10,
      paddingHorizontal: 16,
      justifyContent: 'space-between',
    },
    historyBlock: {
      flex: 1,
      alignItems: 'center',
    },
    historyDivider: {
      width: 1,
      height: 24,
      backgroundColor: hexAlpha(theme.colors.text.secondary, 0.2),
    },
    historyLabel: {
      color: theme.colors.text.secondary,
      fontSize: 9,
      letterSpacing: 1,
      marginBottom: 2,
    },
    historyValue: {
      fontWeight: '700',
      fontSize: 13,
      color: theme.colors.text.primary,
    },
    editorsRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    editorBlock: {
      flex: 1,
      alignItems: 'center',
      gap: 6,
    },
    editorLabel: {
      color: theme.colors.text.secondary,
      fontWeight: '600',
      fontSize: 10,
      letterSpacing: 1,
      textTransform: 'uppercase',
    },
    editorControls: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    editBtn: {
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: hexAlpha(theme.colors.text.primary, 0.08),
      justifyContent: 'center',
      alignItems: 'center',
    },
    editorValue: {
      fontWeight: '800',
      fontVariant: ['tabular-nums'],
      color: theme.colors.text.primary,
      minWidth: 36,
      textAlign: 'center',
      fontSize: 18,
    },
    editorDivider: {
      width: 1,
      height: 40,
      backgroundColor: hexAlpha(theme.colors.text.secondary, 0.15),
    },

    // ── Upcoming Set ──
    upcomingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
      paddingHorizontal: theme.spacing.sm,
      gap: 12,
    },
    setNumberBubbleUpcoming: {
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: hexAlpha(theme.colors.text.secondary, 0.1),
      justifyContent: 'center',
      alignItems: 'center',
    },
    upcomingSetNumber: {
      color: theme.colors.text.secondary,
      fontWeight: '600',
      fontSize: 12,
    },
    upcomingText: {
      color: theme.colors.text.secondary,
      fontSize: 13,
    },
  });
}
