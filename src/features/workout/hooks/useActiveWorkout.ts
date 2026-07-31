import { useState, useEffect, useCallback, useRef } from 'react';
import { MOCK_WORKOUT_DETAIL } from '../data/mockWorkoutDetail';

export interface WorkoutSet {
  id: string;
  reps: string;
  weight: number;
  completed: boolean;
  isPR?: boolean;
}

export interface ActiveExercise {
  id: string;
  name: string;
  sets: WorkoutSet[];
  duration: string;
  equipment: string[];
  imageUri: string;
  instructions: string[];
  aiTip: string;
  targetMuscles: string[]; // Mocking target muscles for now
  previousWeight?: number;
  previousReps?: string;
  suggestedWeight?: number;
}

export function useActiveWorkout(workoutId: string) {
  // In a real app, fetch workout by ID
  const workoutData = MOCK_WORKOUT_DETAIL;

  const initialExercises: ActiveExercise[] = workoutData.exercises.map((ex) => ({
    ...ex,
    targetMuscles: workoutData.aiRecommendation.targetMuscles.primary,
    sets: Array.from({ length: ex.sets }).map((_, i) => ({
      id: `${ex.id}-set-${i}`,
      reps: ex.reps,
      weight: ex.suggestedWeight || ex.previousWeight || 0, // Load suggested weight
      completed: false,
      isPR: false,
    })),
  }));

  const [exercises, setExercises] = useState<ActiveExercise[]>(initialExercises);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  
  const [isResting, setIsResting] = useState(false);
  const [restTimeRemaining, setRestTimeRemaining] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  
  const [isFinished, setIsFinished] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Mock Workout Intelligence
  const workoutIntelligence = {
    recovery: 94,
    readiness: 'High',
    pace: 'Excellent',
    recommendedRest: 60,
    fatigue: 'Moderate'
  };

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const restTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Global elapsed time
  useEffect(() => {
    if (!isFinished && !isPaused) {
      timerRef.current = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isFinished, isPaused]);

  const handleRestComplete = useCallback(() => {
    setIsResting(false);
    setRestTimeRemaining(0);
  }, []);

  // Rest timer
  useEffect(() => {
    if (isResting && !isPaused && restTimeRemaining > 0) {
      restTimerRef.current = setInterval(() => {
        setRestTimeRemaining((prev) => {
          if (prev <= 1) {
            handleRestComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (restTimerRef.current) {
      clearInterval(restTimerRef.current);
    }
    return () => {
      if (restTimerRef.current) clearInterval(restTimerRef.current);
    };
  }, [isResting, isPaused, restTimeRemaining, handleRestComplete]);

  const completeSet = useCallback((weight: number, reps: string) => {
    setExercises((prev) => {
      const newExercises = [...prev];
      const ex = { ...newExercises[currentExerciseIndex] };
      const set = { ...ex.sets[currentSetIndex] };
      
      
      // Simple mock PR logic: if weight > previous weight and reps >= previous reps
      const isPR = ex.previousWeight && weight > ex.previousWeight;
      
      set.completed = true;
      set.weight = weight;
      set.reps = reps;
      set.isPR = !!isPR;
      
      ex.sets[currentSetIndex] = set;
      newExercises[currentExerciseIndex] = ex;
      return newExercises;
    });

    const currentEx = exercises[currentExerciseIndex];
    if (currentSetIndex < currentEx.sets.length - 1) {
      // Move to next set, start rest
      setCurrentSetIndex((prev) => prev + 1);
      setIsResting(true);
      setRestTimeRemaining(60); // 60s default rest
    } else if (currentExerciseIndex < exercises.length - 1) {
      // Move to next exercise, start rest
      setCurrentExerciseIndex((prev) => prev + 1);
      setCurrentSetIndex(0);
      setIsResting(true);
      setRestTimeRemaining(90); // 90s rest between exercises
    } else {
      // Workout complete
      setIsFinished(true);
    }
  }, [currentExerciseIndex, currentSetIndex, exercises]);

  const updateSet = useCallback((exIndex: number, setIndex: number, weight: number, reps: string) => {
    setExercises((prev) => {
      const newExercises = [...prev];
      const ex = { ...newExercises[exIndex] };
      const set = { ...ex.sets[setIndex] };
      
      set.weight = weight;
      set.reps = reps;
      
      ex.sets[setIndex] = set;
      newExercises[exIndex] = ex;
      return newExercises;
    });
  }, []);

  const skipRest = useCallback(() => {
    handleRestComplete();
  }, [handleRestComplete]);

  const adjustRest = useCallback((amount: number) => {
    setRestTimeRemaining((prev) => Math.max(0, prev + amount));
  }, []);

  const nextExercise = useCallback(() => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex((prev) => prev + 1);
      setCurrentSetIndex(0);
      setIsResting(false);
    } else {
      setIsFinished(true);
    }
  }, [currentExerciseIndex, exercises.length]);

  const prevExercise = useCallback(() => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex((prev) => prev - 1);
      setCurrentSetIndex(0);
      setIsResting(false);
    }
  }, [currentExerciseIndex]);

  const finishWorkout = useCallback(() => {
    setIsFinished(true);
  }, []);

  const togglePause = useCallback(() => {
    setIsPaused((prev) => !prev);
  }, []);

  return {
    workout: workoutData,
    exercises,
    currentExerciseIndex,
    currentSetIndex,
    currentExercise: exercises[currentExerciseIndex],
    currentSet: exercises[currentExerciseIndex]?.sets[currentSetIndex],
    upcomingExercise: exercises[currentExerciseIndex + 1] || null,
    isResting,
    restTimeRemaining,
    elapsedTime,
    isFinished,
    isPaused,
    workoutIntelligence,
    completeSet,
    updateSet,
    skipRest,
    adjustRest,
    nextExercise,
    prevExercise,
    finishWorkout,
    togglePause,
  };
}
