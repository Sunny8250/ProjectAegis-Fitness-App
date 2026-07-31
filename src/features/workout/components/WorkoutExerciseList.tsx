import React, { useState } from "react";
import { View, StyleSheet, Pressable, LayoutAnimation, Platform, UIManager } from "react-native";
import { useTheme } from "@/theme/useTheme";
import type { AegisTheme } from "@/theme/themes";
import { Text } from "@/components/common/Text";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MOCK_WORKOUT_DETAIL } from "../data/mockWorkoutDetail";
import { Image } from "expo-image";
import { hexAlpha } from "@/utils/colors";

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface WorkoutExerciseListProps {
  exercises: typeof MOCK_WORKOUT_DETAIL.exercises;
}

export const WorkoutExerciseList = ({ exercises }: WorkoutExerciseListProps) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Text variant="title" style={styles.sectionTitle}>Exercises</Text>
      <View style={styles.list}>
        {exercises.map((exercise, index) => (
          <ExerciseItem key={exercise.id} exercise={exercise} index={index + 1} />
        ))}
      </View>
    </View>
  );
};

const ExerciseItem = ({ exercise, index }: { exercise: typeof MOCK_WORKOUT_DETAIL.exercises[0], index: number }) => {
  const [expanded, setExpanded] = useState(false);
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View style={styles.exerciseCard}>
      <Pressable style={styles.exerciseHeader} onPress={toggleExpand}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: exercise.imageUri }} style={StyleSheet.absoluteFill} contentFit="cover" />
          <View style={styles.indexBadge}>
            <Text variant="small" style={{ color: '#FFF', fontWeight: '700' }}>{index}</Text>
          </View>
        </View>
        
        <View style={styles.exerciseInfo}>
          <Text variant="body" style={styles.exerciseName}>{exercise.name}</Text>
          <Text variant="small" style={styles.exerciseMeta}>
            {exercise.sets} Sets × {exercise.reps} Reps
          </Text>
        </View>

        <MaterialCommunityIcons 
          name={expanded ? "chevron-up" : "chevron-down"} 
          size={24} 
          color={theme.colors.text.secondary} 
        />
      </Pressable>

      {expanded && (
        <View style={styles.expandedContent}>
          <View style={styles.metaRow}>
            <View style={styles.metaBadge}>
              <MaterialCommunityIcons name="timer-outline" size={14} color={theme.colors.text.secondary} />
              <Text variant="small" style={styles.metaText}>{exercise.duration}</Text>
            </View>
            <View style={styles.metaBadge}>
              <MaterialCommunityIcons name="dumbbell" size={14} color={theme.colors.text.secondary} />
              <Text variant="small" style={styles.metaText}>{exercise.equipment.join(", ")}</Text>
            </View>
          </View>

          <View style={styles.instructionsBlock}>
            <Text variant="small" style={styles.blockTitle}>Instructions</Text>
            {exercise.instructions.map((inst, i) => (
              <View key={i} style={styles.bulletRow}>
                <View style={styles.bullet} />
                <Text variant="small" style={styles.bulletText}>{inst}</Text>
              </View>
            ))}
          </View>

          <View style={styles.instructionsBlock}>
            <Text variant="small" style={[styles.blockTitle, { color: theme.colors.error }]}>Common Mistakes</Text>
            {exercise.mistakes.map((mistake, i) => (
              <View key={i} style={styles.bulletRow}>
                <MaterialCommunityIcons name="close" size={12} color={theme.colors.error} style={{ marginTop: 2 }} />
                <Text variant="small" style={styles.bulletText}>{mistake}</Text>
              </View>
            ))}
          </View>

          <View style={styles.aiTipBlock}>
            <MaterialCommunityIcons name="robot" size={16} color={theme.colors.info} />
            <Text variant="small" style={styles.aiTipText}>{exercise.aiTip}</Text>
          </View>
        </View>
      )}
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
    list: {
      gap: theme.spacing.md,
    },
    exerciseCard: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.radius.xl,
      overflow: 'hidden',
    },
    exerciseHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: theme.spacing.md,
      gap: theme.spacing.md,
    },
    imageContainer: {
      width: 60,
      height: 60,
      borderRadius: theme.radius.md,
      overflow: 'hidden',
      backgroundColor: theme.colors.background,
    },
    indexBadge: {
      position: 'absolute',
      top: 4,
      left: 4,
      backgroundColor: 'rgba(0,0,0,0.6)',
      width: 20,
      height: 20,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    exerciseInfo: {
      flex: 1,
      justifyContent: 'center',
    },
    exerciseName: {
      fontWeight: '600',
      marginBottom: 4,
    },
    exerciseMeta: {
      color: theme.colors.text.secondary,
    },
    expandedContent: {
      padding: theme.spacing.md,
      paddingTop: 0,
    },
    metaRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      marginBottom: theme.spacing.md,
    },
    metaBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: theme.radius.full,
      gap: 4,
    },
    metaText: {
      color: theme.colors.text.secondary,
    },
    instructionsBlock: {
      marginBottom: theme.spacing.lg,
    },
    blockTitle: {
      fontWeight: '700',
      marginBottom: 6,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      fontSize: 10,
      color: theme.colors.text.secondary,
    },
    bulletRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 8,
      gap: 6,
    },
    bullet: {
      width: 4,
      height: 4,
      borderRadius: 2,
      backgroundColor: theme.colors.text.secondary,
      marginTop: 6,
    },
    bulletText: {
      flex: 1,
      color: theme.colors.text.primary,
      lineHeight: 22,
    },
    aiTipBlock: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      backgroundColor: hexAlpha(theme.colors.info, 0.1),
      padding: theme.spacing.md,
      borderRadius: theme.radius.lg,
      gap: 8,
    },
    aiTipText: {
      flex: 1,
      color: theme.colors.info,
      fontStyle: 'italic',
      lineHeight: 22,
    },
  });
}
