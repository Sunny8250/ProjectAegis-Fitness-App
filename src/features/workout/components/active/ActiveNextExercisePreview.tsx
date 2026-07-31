import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@/components/common/Text';
import { useTheme } from '@/theme/useTheme';
import type { AegisTheme } from '@/theme/themes';
import { hexAlpha } from '@/utils/colors';
import { Image } from 'expo-image';
import type { ActiveExercise } from '../../hooks/useActiveWorkout';

interface ActiveNextExercisePreviewProps {
  exercise: ActiveExercise | null;
}

export const ActiveNextExercisePreview = ({ exercise }: ActiveNextExercisePreviewProps) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  if (!exercise) return null;

  return (
    <View style={styles.container}>
      <Text variant="heading3" style={styles.sectionTitle}>Up Next</Text>
      
      <View style={styles.card}>
        <Image
          source={exercise.imageUri}
          style={styles.image}
          contentFit="cover"
        />
        
        <View style={styles.content}>
          <Text variant="body" style={styles.title} numberOfLines={1}>
            {exercise.name}
          </Text>
          
          <Text variant="caption" style={styles.subtitle}>
            {exercise.sets.length} Sets • {exercise.reps} Reps • {exercise.duration}
          </Text>

          <View style={styles.tagsContainer}>
            {exercise.targetMuscles.slice(0, 2).map((muscle, i) => (
              <View key={`muscle-${i}`} style={[styles.tag, styles.primaryTag]}>
                <Text variant="caption" style={styles.primaryTagText}>{muscle}</Text>
              </View>
            ))}
            {exercise.equipment.slice(0, 1).map((eq, i) => (
              <View key={`eq-${i}`} style={styles.tag}>
                <Text variant="caption" style={styles.tagText}>{eq}</Text>
              </View>
            ))}
          </View>
        </View>
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
    sectionTitle: {
      marginBottom: theme.spacing.md,
    },
    card: {
      flexDirection: 'row',
      backgroundColor: hexAlpha(theme.colors.surface, 0.6),
      borderRadius: theme.radius.lg,
      borderWidth: 1,
      borderColor: hexAlpha(theme.colors.text.secondary, 0.1),
      overflow: 'hidden',
    },
    image: {
      width: 90,
      height: '100%',
      backgroundColor: theme.colors.surface,
    },
    content: {
      flex: 1,
      padding: theme.spacing.md,
      justifyContent: 'center',
    },
    title: {
      color: theme.colors.text.primary,
      fontWeight: '700',
      marginBottom: 4,
    },
    subtitle: {
      color: theme.colors.text.secondary,
      marginBottom: 10,
    },
    tagsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 6,
    },
    tag: {
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: theme.radius.sm,
      backgroundColor: hexAlpha(theme.colors.text.secondary, 0.1),
    },
    primaryTag: {
      backgroundColor: hexAlpha(theme.colors.primary, 0.15),
    },
    tagText: {
      color: theme.colors.text.secondary,
      fontWeight: '600',
      fontSize: 10,
    },
    primaryTagText: {
      color: theme.colors.primary,
      fontWeight: '700',
      fontSize: 10,
    },
  });
}
