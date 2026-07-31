import React from 'react';
import { View, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { Text } from '@/components/common/Text';
import { useTheme } from '@/theme/useTheme';
import type { AegisTheme } from '@/theme/themes';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Button } from '@/components/common/Button';
import { LinearGradient } from 'expo-linear-gradient';

interface ActiveBottomControlsProps {
  isResting: boolean;
  isPaused: boolean;
  onPrev: () => void;
  onNext: () => void;
  onPauseToggle: () => void;
  onCompleteSet: () => void;
  onFinishWorkout: () => void;
  isLastExercise: boolean;
  isLastSet: boolean;
}

export const ActiveBottomControls = ({
  isResting,
  isPaused,
  onPrev,
  onNext,
  onPauseToggle,
  onCompleteSet,
  onFinishWorkout,
  isLastExercise,
  isLastSet,
}: ActiveBottomControlsProps) => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = createStyles(theme, insets);

  const isWorkoutEnd = isLastExercise && isLastSet;

  return (
    <View style={styles.container}>
      <LinearGradient 
        colors={['transparent', theme.colors.background, theme.colors.background]} 
        locations={[0, 0.4, 1]}
        style={StyleSheet.absoluteFill} 
      />
      <View style={styles.content}>
        <TouchableOpacity style={styles.iconButton} onPress={onPrev}>
          <MaterialCommunityIcons name="chevron-left" size={28} color={theme.colors.text.primary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton} onPress={onPauseToggle}>
          <MaterialCommunityIcons 
            name={isPaused ? "play" : "pause"} 
            size={28} 
            color={isPaused ? theme.colors.primary : theme.colors.text.primary} 
          />
        </TouchableOpacity>

        <View style={styles.mainActionContainer}>
          {!isResting ? (
            <Button
              variant="primary"
              size="large"
              onPress={isWorkoutEnd ? onFinishWorkout : onCompleteSet}
              style={styles.mainButton}
              leftIcon={
                <MaterialCommunityIcons 
                  name={isWorkoutEnd ? "check-all" : "check"} 
                  size={24} 
                  color="#FFF" 
                />
              }
            >
              {isWorkoutEnd ? "Finish Workout" : "Complete Set"}
            </Button>
          ) : (
            <Button
              variant="outline"
              size="large"
              onPress={isWorkoutEnd ? onFinishWorkout : onCompleteSet}
              style={[styles.mainButton, styles.restButton]}
              disabled={true} // Disabled while resting if we want to force wait, or maybe just hidden
            >
              Resting...
            </Button>
          )}
        </View>

        <TouchableOpacity style={styles.iconButton} onPress={onNext}>
          <MaterialCommunityIcons name="chevron-right" size={28} color={theme.colors.text.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

function createStyles(theme: AegisTheme, insets: any) {
  return StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      paddingTop: 40,
      paddingHorizontal: theme.spacing.lg,
      paddingBottom: Platform.OS === 'ios' ? Math.max(40, insets.bottom) : theme.spacing.xl,
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: theme.spacing.sm,
    },
    iconButton: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
      justifyContent: 'center',
      alignItems: 'center',
    },
    mainActionContainer: {
      flex: 1,
      paddingHorizontal: theme.spacing.sm,
    },
    mainButton: {
      width: '100%',
      shadowColor: theme.colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 12,
      elevation: 6,
    },
    restButton: {
      opacity: 0.5,
      shadowOpacity: 0,
      elevation: 0,
    },
  });
}
