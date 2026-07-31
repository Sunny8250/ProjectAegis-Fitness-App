import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text } from '@/components/common/Text';
import { useTheme } from '@/theme/useTheme';
import type { AegisTheme } from '@/theme/themes';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { ActiveExercise } from '../../hooks/useActiveWorkout';

interface ActiveExerciseShowcaseProps {
  exercise: ActiveExercise;
  currentSetIndex?: number;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SHOWCASE_HEIGHT = SCREEN_WIDTH * 0.85;

export const ActiveExerciseShowcase = ({ exercise, currentSetIndex = 0 }: ActiveExerciseShowcaseProps) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const targetWeight = exercise.suggestedWeight || exercise.previousWeight || 0;
  const targetReps = exercise.reps;
  const currentSetDisplay = `Set ${currentSetIndex + 1} of ${exercise.sets.length}`;

  return (
    <View style={styles.container}>
      <Image
        source={exercise.imageUri}
        style={styles.image}
        contentFit="cover"
        transition={300}
      />
      
      <LinearGradient
        colors={['rgba(0,0,0,0.3)', 'transparent', 'transparent', theme.colors.background]}
        locations={[0, 0.25, 0.55, 1]}
        style={styles.overlay}
      >
        {/* Set Details Overlay */}
        <View style={styles.setOverlayContainer}>
          <View style={styles.setOverlayBox}>
            <Text variant="caption" style={styles.setOverlayLabel}>{currentSetDisplay}</Text>
          </View>
          <View style={styles.setOverlayBox}>
            <Text variant="caption" style={styles.setOverlayLabel}>{targetReps} Reps</Text>
          </View>
          {targetWeight > 0 && (
            <View style={styles.setOverlayBox}>
              <Text variant="caption" style={styles.setOverlayLabel}>{targetWeight} kg</Text>
            </View>
          )}
        </View>

        <View style={styles.overlayContent}>
          <Text variant="display" style={styles.title}>{exercise.name}</Text>
          
          <View style={styles.tagsContainer}>
            {exercise.targetMuscles.slice(0, 3).map((muscle, index) => (
              <View key={`muscle-${index}`} style={[styles.tag, styles.primaryTag]}>
                <Text variant="caption" style={styles.primaryTagText}>{muscle}</Text>
              </View>
            ))}
            {exercise.equipment.slice(0, 2).map((eq, index) => (
              <View key={`eq-${index}`} style={styles.tag}>
                <Text variant="caption" style={styles.tagText}>{eq}</Text>
              </View>
            ))}
          </View>
        </View>
      </LinearGradient>

      {/* Mock Play Button Overlay */}
      <View style={styles.playButtonOverlay}>
        <View style={styles.playButton}>
          <MaterialCommunityIcons name="play" size={24} color={theme.colors.background} />
        </View>
      </View>
    </View>
  );
};

function createStyles(theme: AegisTheme) {
  return StyleSheet.create({
    container: {
      height: SHOWCASE_HEIGHT,
      width: '100%',
      backgroundColor: theme.colors.surface,
      position: 'relative',
      overflow: 'hidden',
    },
    image: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      width: '100%',
      height: '100%',
    },
    overlay: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      justifyContent: 'flex-end',
      padding: theme.spacing.lg,
    },
    setOverlayContainer: {
      flexDirection: 'row',
      gap: 8,
      marginBottom: theme.spacing.sm,
    },
    setOverlayBox: {
      backgroundColor: 'rgba(0,0,0,0.6)',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: theme.radius.sm,
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.15)',
      backdropFilter: 'blur(8px)',
    },
    setOverlayLabel: {
      color: '#FFFFFF',
      fontWeight: '700',
      letterSpacing: 0.5,
    },
    overlayContent: {
      gap: theme.spacing.sm,
    },
    title: {
      color: '#FFFFFF',
      fontSize: 28,
      fontWeight: '800',
      letterSpacing: -0.5,
    },
    tagsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 6,
    },
    tag: {
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: theme.radius.full,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    primaryTag: {
      backgroundColor: theme.colors.primary,
    },
    tagText: {
      color: '#FFFFFF',
      fontWeight: '600',
    },
    primaryTagText: {
      color: '#FFFFFF',
      fontWeight: '700',
    },
    playButtonOverlay: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      justifyContent: 'center',
      alignItems: 'center',
      pointerEvents: 'none',
    },
    playButton: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 5,
    },
  });
}
