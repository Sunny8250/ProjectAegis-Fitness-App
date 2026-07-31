import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView, StatusBar, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTheme } from '@/theme/useTheme';
import type { AegisTheme } from '@/theme/themes';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useActiveWorkout } from '@/features/workout/hooks/useActiveWorkout';
import { ActiveWorkoutHeader } from '@/features/workout/components/active/ActiveWorkoutHeader';
import { ActiveExerciseShowcase } from '@/features/workout/components/active/ActiveExerciseShowcase';
import { ActiveAiCoach } from '@/features/workout/components/active/ActiveAiCoach';
import { ActiveSetTracker } from '@/features/workout/components/active/ActiveSetTracker';
import { ActiveRestTimer } from '@/features/workout/components/active/ActiveRestTimer';
import { ActiveWorkoutTimeline } from '@/features/workout/components/active/ActiveWorkoutTimeline';
import { ActiveBottomControls } from '@/features/workout/components/active/ActiveBottomControls';
import { ActiveExerciseInstructions } from '@/features/workout/components/active/ActiveExerciseInstructions';

import Animated, { FadeIn, FadeOut, Layout } from 'react-native-reanimated';

export default function ActiveWorkoutScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = createStyles(theme, insets);

  const {
    workout,
    exercises,
    currentExerciseIndex,
    currentSetIndex,
    currentExercise,
    currentSet,
    upcomingExercise,
    isResting,
    restTimeRemaining,
    elapsedTime,
    isFinished,
    isPaused,
    completeSet,
    updateSet,
    skipRest,
    adjustRest,
    nextExercise,
    prevExercise,
    finishWorkout,
    togglePause,
  } = useActiveWorkout(id as string);

  useEffect(() => {
    if (isFinished) {
      // Navigate to summary or go back
      router.back();
    }
  }, [isFinished, router]);

  const handleCompleteSet = () => {
    completeSet(currentSet.weight, currentSet.reps);
  };

  const isLastExercise = currentExerciseIndex === exercises.length - 1;
  const isLastSet = currentSetIndex === currentExercise.sets.length - 1;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <ActiveWorkoutHeader
        workoutName={workout.title}
        currentExerciseIndex={currentExerciseIndex}
        totalExercises={exercises.length}
        elapsedTime={elapsedTime}
        caloriesBurned={Math.floor(elapsedTime / 10)} // Mock calculation
        heartRate={120 + (isResting ? -15 : 10)} // Mock fluctuation
      />

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {isResting ? (
          <Animated.View
            key="rest-view"
            entering={FadeIn.duration(400)}
            exiting={FadeOut.duration(300)}
            layout={Layout.springify()}
          >
            <ActiveRestTimer
              restTimeRemaining={restTimeRemaining}
              upcomingExercise={upcomingExercise}
              onSkip={skipRest}
              onAdjust={adjustRest}
            />
          </Animated.View>
        ) : (
          <Animated.View
            key="exercise-view"
            entering={FadeIn.duration(400)}
            exiting={FadeOut.duration(300)}
            layout={Layout.springify()}
            style={styles.exerciseViewContainer}
          >
            <ActiveExerciseShowcase exercise={currentExercise} />
            <View style={styles.exerciseContent}>
              <ActiveAiCoach tip={currentExercise.aiTip} />
              
              <View style={styles.spacer} />
              
              <ActiveSetTracker
                exercise={currentExercise}
                currentSetIndex={currentSetIndex}
                onUpdateSet={(index, weight, reps) => updateSet(currentExerciseIndex, index, weight, reps)}
              />

              <View style={styles.spacer} />

              <ActiveExerciseInstructions instructions={currentExercise.instructions} />

              <ActiveWorkoutTimeline exercises={exercises} currentIndex={currentExerciseIndex} />
            </View>
          </Animated.View>
        )}
      </ScrollView>

      <ActiveBottomControls
        isResting={isResting}
        isPaused={isPaused}
        onPrev={prevExercise}
        onNext={nextExercise}
        onPauseToggle={togglePause}
        onCompleteSet={handleCompleteSet}
        onFinishWorkout={finishWorkout}
        isLastExercise={isLastExercise}
        isLastSet={isLastSet}
      />
    </View>
  );
}

function createStyles(theme: AegisTheme, insets: any) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      paddingBottom: Math.max(insets.bottom, 40) + 100, // Space for bottom controls
    },
    exerciseViewContainer: {
      width: '100%',
    },
    exerciseContent: {
      paddingTop: 0,
    },
    spacer: {
      height: theme.spacing.lg,
    },
  });
}
