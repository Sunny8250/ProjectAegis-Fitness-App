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

export interface WorkoutSessionProgress {
  progress: number;
  exercisesCompleted: number;
  exercisesRemaining: number;
  elapsedSeconds: number;
  caloriesBurned: number;
  totalExercises: number;
  setsCompleted: number;
  totalSets: number;
}

export interface RestNextUp {
  exercise: ActiveExercise;
  isNewExercise: boolean;
  reps: string;
  setNumber: number;
  totalSets: number;
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
      weight: ex.suggestedWeight || ex.previousWeight || 0,
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
  const [hasStarted, setHasStarted] = useState(false);

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

  const startWorkout = useCallback(() => {
    setHasStarted(true);
    setIsPaused(false);
  }, []);

  useEffect(() => {
    if (hasStarted && !isFinished && !isPaused && !isResting) {
      timerRef.current = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [hasStarted, isFinished, isPaused, isResting]);

  const handleRestComplete = useCallback(() => {
    setIsResting(false);
    setRestTimeRemaining(0);
  }, []);

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
      setCurrentSetIndex((prev) => prev + 1);
      setIsResting(true);
      setRestTimeRemaining(60);
    } else if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex((prev) => prev + 1);
      setCurrentSetIndex(0);
      setIsResting(true);
      setRestTimeRemaining(90);
    } else {
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

  // MOCK properties needed by RestScreen and [id].tsx
  const caloriesBurned = Math.round(elapsedTime * 0.15); // Mock calories

  const restTimer = {
    status: isResting ? 'running' : 'idle',
    remainingSeconds: restTimeRemaining,
    durationSeconds: currentSetIndex === 0 ? 90 : 60,
    elapsedSeconds: (currentSetIndex === 0 ? 90 : 60) - restTimeRemaining,
    progress: ((currentSetIndex === 0 ? 90 : 60) - restTimeRemaining) / (currentSetIndex === 0 ? 90 : 60),
    isRunning: isResting,
    isPaused: isPaused,
    isCompleting: restTimeRemaining === 0 && isResting,
    isFinalCountdown: restTimeRemaining <= 5 && restTimeRemaining > 0,
    start: () => {},
    pause: () => {},
    resume: () => {},
    adjust: () => {},
    skip: () => {},
    reset: () => {},
  } as any;

  const restPlan = {
    transition: currentSetIndex === 0 ? 'between-exercises' : 'between-sets',
    rationale: 'Recover your ATP stores before the next set.',
    recommendedMinSeconds: 45,
    recommendedMaxSeconds: 90,
  } as any;

  const restCoach = {
    insight: { id: '1', icon: 'lightning-bolt', text: 'You are recovering well.' },
    motivation: { id: '1', text: 'Keep it up!', author: 'Aegis' },
    prepCues: ['Breathe deeply', 'Check your grip'],
  } as any;

  const recovery = {
    recoveryPercent: 88,
    energyPercent: 75,
    zone: 'good',
    readinessLabel: 'Ready soon',
    headline: 'Recovery is on track.',
    advice: 'hold',
    adviceMessage: 'Maintain your current pace.',
    isSkipRecommended: false,
  } as any;

  const nextUp: RestNextUp | null = exercises[currentExerciseIndex] ? {
    exercise: exercises[currentExerciseIndex],
    isNewExercise: currentSetIndex === 0,
    reps: exercises[currentExerciseIndex].sets[currentSetIndex]?.reps || '10',
    setNumber: currentSetIndex + 1,
    totalSets: exercises[currentExerciseIndex].sets.length,
  } : null;

  const sessionProgress: WorkoutSessionProgress = {
    progress: (currentExerciseIndex) / exercises.length,
    exercisesCompleted: currentExerciseIndex,
    exercisesRemaining: exercises.length - currentExerciseIndex,
    elapsedSeconds: elapsedTime,
    caloriesBurned,
    totalExercises: exercises.length,
    setsCompleted: currentExerciseIndex * 3 + currentSetIndex,
    totalSets: exercises.length * 3,
  };

  const isPR = exercises[currentExerciseIndex]?.sets[currentSetIndex]?.isPR || false;

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
    hasStarted,
    workoutIntelligence,
    completeSet,
    updateSet,
    skipRest,
    adjustRest,
    nextExercise,
    prevExercise,
    finishWorkout,
    togglePause,
    startWorkout,
    caloriesBurned,
    restTimer,
    restPlan,
    restCoach,
    recovery,
    nextUp,
    sessionProgress,
    isPR,
  };
}
