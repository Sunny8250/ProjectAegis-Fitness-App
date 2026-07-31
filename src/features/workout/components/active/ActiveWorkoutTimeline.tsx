import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from '@/components/common/Text';
import { useTheme } from '@/theme/useTheme';
import type { AegisTheme } from '@/theme/themes';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { ActiveExercise } from '../../hooks/useActiveWorkout';

interface ActiveWorkoutTimelineProps {
  exercises: ActiveExercise[];
  currentIndex: number;
}

export const ActiveWorkoutTimeline = ({ exercises, currentIndex }: ActiveWorkoutTimelineProps) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Text variant="heading3" style={styles.title}>Timeline</Text>

      <View style={styles.timeline}>
        {exercises.map((exercise, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;
          
          return (
            <View key={exercise.id} style={styles.itemContainer}>
              <View style={styles.lineColumn}>
                <View style={[
                  styles.dot,
                  isCompleted && styles.dotCompleted,
                  isCurrent && styles.dotCurrent
                ]}>
                  {isCompleted && (
                    <MaterialCommunityIcons name="check" size={12} color="#FFF" />
                  )}
                  {isCurrent && (
                    <View style={styles.dotCurrentInner} />
                  )}
                </View>
                {index < exercises.length - 1 && (
                  <View style={[
                    styles.line,
                    isCompleted && styles.lineCompleted
                  ]} />
                )}
              </View>

              <View style={[styles.content, isCompleted && styles.contentCompleted]}>
                <Text variant="body" style={[
                  styles.exerciseName,
                  isCurrent && styles.exerciseNameCurrent
                ]}>
                  {exercise.name}
                </Text>
                <Text variant="caption" style={styles.exerciseDetails}>
                  {exercise.sets.length} Sets • {exercise.sets[0]?.reps || 'Varies'} Reps
                </Text>
              </View>
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
      paddingHorizontal: theme.spacing.lg,
      marginTop: theme.spacing.xl,
    },
    title: {
      marginBottom: theme.spacing.lg,
    },
    timeline: {
      paddingBottom: theme.spacing.xxl,
    },
    itemContainer: {
      flexDirection: 'row',
      minHeight: 50,
    },
    lineColumn: {
      width: 30,
      alignItems: 'center',
    },
    dot: {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 2,
    },
    dotCompleted: {
      borderColor: theme.colors.success,
      backgroundColor: theme.colors.success,
    },
    dotCurrent: {
      borderColor: theme.colors.primary,
      backgroundColor: theme.colors.background,
    },
    dotCurrentInner: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: theme.colors.primary,
    },
    line: {
      width: 2,
      flex: 1,
      backgroundColor: theme.colors.border,
      marginVertical: -2, // Pull under dots
    },
    lineCompleted: {
      backgroundColor: theme.colors.success,
    },
    content: {
      flex: 1,
      paddingBottom: 20,
      marginTop: -2,
    },
    contentCompleted: {
      opacity: 0.5,
    },
    exerciseName: {
      fontWeight: '600',
      color: theme.colors.text.secondary,
    },
    exerciseNameCurrent: {
      color: theme.colors.text.primary,
      fontWeight: '700',
    },
    exerciseDetails: {
      color: theme.colors.text.secondary,
      marginTop: 2,
    },
  });
}
