import { useEffect, useState } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTheme } from '@/theme/useTheme';
import type { AegisTheme } from '@/theme/themes';
import { useSafeAreaInsets, type EdgeInsets } from 'react-native-safe-area-context';

import { useActiveWorkout } from '@/features/workout/hooks/useActiveWorkout';
import { useWorkoutExitGuard } from '@/features/workout/hooks/useWorkoutExitGuard';
import { ActiveWorkoutHeader } from '@/features/workout/components/active/ActiveWorkoutHeader';
import { ActiveExerciseShowcase } from '@/features/workout/components/active/ActiveExerciseShowcase';
import { ActiveAiCoach } from '@/features/workout/components/active/ActiveAiCoach';
import { ActiveSetTracker } from '@/features/workout/components/active/ActiveSetTracker';
import { ActiveWorkoutTimeline } from '@/features/workout/components/active/ActiveWorkoutTimeline';
import { ActiveBottomControls } from '@/features/workout/components/active/ActiveBottomControls';
import { ActiveExerciseInstructions } from '@/features/workout/components/active/ActiveExerciseInstructions';
import { ActiveNextExercisePreview } from '@/features/workout/components/active/ActiveNextExercisePreview';
import { ActiveWorkoutIntelligence } from '@/features/workout/components/active/ActiveWorkoutIntelligence';
import { ActivePersonalRecord } from '@/features/workout/components/active/ActivePersonalRecord';
import { WorkoutExitModal } from '@/features/workout/components/active/WorkoutExitModal';
import { RestScreen } from '@/features/workout/components/rest/RestScreen';

import Animated, { FadeIn, FadeOut, LinearTransition, useSharedValue, useAnimatedScrollHandler } from 'react-native-reanimated';
/** Scroll clearance for the floating bottom controls, in dp. */
const BOTTOM_CONTROLS_CLEARANCE = 100;
const MIN_BOTTOM_INSET = 40;

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
    elapsedTime,
    caloriesBurned,
    isFinished,
    isPaused,
    isResting,
    restTimer,
    restPlan,
    restCoach,
    recovery,
    nextUp,
    sessionProgress,
    completeSet,
    updateSet,
    skipRest,
    adjustRest,
    nextExercise,
    prevExercise,
    finishWorkout,
    togglePause,
    startWorkout,
    hasStarted,
    workoutIntelligence,
    isPR,
  } = useActiveWorkout(id as string);

  const [countdown, setCountdown] = useState<number | null>(null);

  const handleReady = () => {
    setCountdown(5);
  };

  useEffect(() => {
    if (countdown === null) return;
    
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setCountdown(null);
        startWorkout();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [countdown, startWorkout]);

  const { isPromptOpen, confirmExit, cancelExit } = useWorkoutExitGuard({
    enabled: !isFinished,
    onConfirmExit: () => router.back(),
  });

  useEffect(() => {
    if (isFinished) {
      router.replace({ pathname: '/(app)/workout/summary/[id]', params: { id } });
    }
  }, [isFinished, router, id]);

  const handleCompleteSet = () => {
    completeSet(currentSet.weight, currentSet.reps);
  };

  const isLastExercise = currentExerciseIndex === exercises.length - 1;
  const isLastSet = currentSetIndex === currentExercise.sets.length - 1;
  const isRestVisible = isResting && restPlan !== null;

  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <ActiveWorkoutHeader
        workoutName={workout.title}
        currentExerciseIndex={currentExerciseIndex}
        totalExercises={exercises.length}
        elapsedTime={elapsedTime}
        caloriesBurned={caloriesBurned}
        heartRate={120 + (isResting ? -15 : 10)} // Mock fluctuation
        scrollY={scrollY}
      />

      <ActivePersonalRecord isPR={isPR} />

      <Animated.ScrollView
        style={styles.scrollView}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={
          isRestVisible ? styles.restScrollContent : styles.scrollContent
        }
        showsVerticalScrollIndicator={false}
      >
        {isRestVisible && restPlan ? (
          <Animated.View
            key="rest-view"
            entering={FadeIn.duration(400)}
            exiting={FadeOut.duration(300)}
            layout={LinearTransition.springify()}
          >
            <RestScreen
              coach={restCoach}
              nextUp={nextUp}
              onAdjust={adjustRest}
              onSkip={skipRest}
              onTogglePause={togglePause}
              plan={restPlan}
              progress={sessionProgress}
              recovery={recovery}
              timer={restTimer}
            />
          </Animated.View>
        ) : (
          <Animated.View
            key="exercise-view"
            entering={FadeIn.duration(400)}
            exiting={FadeOut.duration(300)}
            layout={LinearTransition.springify()}
            style={styles.exerciseViewContainer}
          >
            <ActiveExerciseShowcase exercise={currentExercise} currentSetIndex={currentSetIndex} />
            <View style={styles.exerciseContent}>
              <ActiveAiCoach 
                exercise={currentExercise} 
                currentSetIndex={currentSetIndex} 
                workoutIntelligence={workoutIntelligence} 
              />

              <View style={styles.spacer} />

              <ActiveSetTracker
                exercise={currentExercise}
                currentSetIndex={currentSetIndex}
                onUpdateSet={(index, weight, reps) => updateSet(currentExerciseIndex, index, weight, reps)}
              />

              <View style={styles.spacer} />

              <ActiveExerciseInstructions instructions={currentExercise.instructions} />

              <View style={styles.spacer} />

              {!isLastExercise && <ActiveNextExercisePreview exercise={exercises[currentExerciseIndex + 1]} />}

              <ActiveWorkoutTimeline exercises={exercises} currentIndex={currentExerciseIndex} />

              <ActiveWorkoutIntelligence intelligence={workoutIntelligence} />
            </View>
          </Animated.View>
        )}
      </Animated.ScrollView>

      {/* Hidden during rest so RestScreen owns the controls and there is only one pause button. */}
      {isRestVisible ? null : (
        <ActiveBottomControls
          isPaused={isPaused}
          hasStarted={hasStarted}
          onStart={handleReady}
          onPrev={prevExercise}
          onNext={nextExercise}
          onPauseToggle={togglePause}
          onCompleteSet={handleCompleteSet}
          onFinishWorkout={finishWorkout}
          isLastExercise={isLastExercise}
          isLastSet={isLastSet}
        />
      )}

      {countdown !== null && (
        <Animated.View 
          entering={FadeIn.duration(200)}
          exiting={FadeOut.duration(300)}
          style={[StyleSheet.absoluteFill, styles.countdownOverlay]}
        >
          <Animated.Text 
            key={countdown}
            entering={FadeIn.springify().damping(12)}
            exiting={FadeOut.duration(100)}
            style={styles.countdownText}
          >
            {countdown > 0 ? countdown : "GO!"}
          </Animated.Text>
        </Animated.View>
      )}

      <WorkoutExitModal 
        isVisible={isPromptOpen} 
        onConfirm={confirmExit} 
        onCancel={cancelExit} 
      />
    </View>
  );
}

function createStyles(theme: AegisTheme, insets: EdgeInsets) {
  const safeBottom = Math.max(insets.bottom, MIN_BOTTOM_INSET);

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      paddingTop: insets.top + 210, // Space for absolute header
      paddingBottom: safeBottom + BOTTOM_CONTROLS_CLEARANCE, // Space for bottom controls
    },
    restScrollContent: {
      paddingTop: insets.top + 210,
      paddingBottom: safeBottom + theme.spacing.xl,
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
    countdownOverlay: {
      backgroundColor: 'rgba(0,0,0,0.85)',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 100,
    },
    countdownText: {
      color: theme.colors.primary,
      fontSize: 120,
      lineHeight: 140, // Prevent top/bottom clipping
      fontWeight: '900',
      textAlign: 'center',
      textShadowColor: 'rgba(0,0,0,0.5)',
      textShadowOffset: { width: 0, height: 4 },
      textShadowRadius: 10,
    },
  });
}
