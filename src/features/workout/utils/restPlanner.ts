/**
 * Project Aegis — Rest Planner
 *
 * Derives the prescribed rest window for a set transition instead of hardcoding
 * a single duration. Ranges follow the rest table in
 * `docs/14_Workout_Engine_Logic.md` §13, adjusted for movement difficulty and
 * whether the athlete is moving to the next set or the next exercise.
 *
 * Every function here is pure so the numbers stay testable and explainable.
 */

/** Movement classification used to select a rest window. */
export type ExerciseCategory =
  | "mobility"
  | "stability"
  | "strength"
  | "conditioning";

/** Which boundary the athlete just crossed. */
export type RestTransition = "between-sets" | "between-exercises";

/** Recommended rest window per movement category, in seconds. */
const REST_WINDOWS_SECONDS: Record<
  ExerciseCategory,
  { min: number; max: number; base: number }
> = {
  mobility: { min: 15, max: 30, base: 20 },
  stability: { min: 30, max: 45, base: 35 },
  strength: { min: 60, max: 120, base: 60 },
  conditioning: { min: 30, max: 60, base: 45 },
};

/** Extra recovery granted when the next movement is a new exercise. */
const NEW_EXERCISE_MULTIPLIER = 1.5;

/** Seconds added or removed based on how demanding the movement is. */
const DIFFICULTY_OFFSET_SECONDS: Record<string, number> = {
  beginner: -10,
  intermediate: 0,
  advanced: 15,
};

/** Granularity every derived duration snaps to, so the ring reads cleanly. */
const ROUNDING_STEP_SECONDS = 5;

/** Step applied by the +/- controls. */
export const REST_ADJUSTMENT_STEP_SECONDS = 15;

/** Hard bounds for manual adjustment, independent of the prescribed window. */
export const MIN_REST_SECONDS = 5;
export const MAX_REST_SECONDS = 300;

/** Fallback category when an exercise carries no classification. */
const DEFAULT_CATEGORY: ExerciseCategory = "strength";

/** The prescribed rest for one transition, with the reasoning behind it. */
export interface RestPlan {
  /** Seconds the timer starts from. */
  durationSeconds: number;
  category: ExerciseCategory;
  transition: RestTransition;
  /** Plain-language answer to "why this rest duration matters". */
  rationale: string;
  /** Lower bound of the recommended window for this movement. */
  recommendedMinSeconds: number;
  /** Upper bound of the recommended window for this movement. */
  recommendedMaxSeconds: number;
}

/** Minimal exercise shape the planner needs. */
export interface RestPlannerExercise {
  category?: ExerciseCategory;
  difficulty?: string;
  restSeconds?: number;
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const roundToStep = (value: number) =>
  Math.round(value / ROUNDING_STEP_SECONDS) * ROUNDING_STEP_SECONDS;

const RATIONALE_BY_CATEGORY: Record<
  ExerciseCategory,
  Record<RestTransition, string>
> = {
  mobility: {
    "between-sets": "Short rest keeps mobility work flowing and joints warm.",
    "between-exercises":
      "A brief pause is enough here — mobility work recovers quickly.",
  },
  stability: {
    "between-sets":
      "Stability work fatigues control before muscle, so a moderate rest protects your technique.",
    "between-exercises":
      "A moderate rest restores the fine control the next movement needs.",
  },
  strength: {
    "between-sets":
      "Heavy strength work needs a full rest to restore the energy your next set depends on.",
    "between-exercises":
      "A longer rest between exercises lets you start the next movement at full strength.",
  },
  conditioning: {
    "between-sets":
      "Shorter rest keeps your heart rate elevated and builds muscular endurance.",
    "between-exercises":
      "A controlled rest keeps the conditioning effect without losing quality.",
  },
};

/** Resolves the category for an exercise, falling back to strength. */
export function resolveCategory(
  exercise: RestPlannerExercise | null | undefined,
): ExerciseCategory {
  return exercise?.category ?? DEFAULT_CATEGORY;
}

/**
 * Builds the rest plan for the transition into `nextExercise`.
 *
 * An explicit `restSeconds` on the exercise always wins; otherwise the duration
 * is derived from the category window, the difficulty offset, and the
 * transition multiplier, then clamped back into the recommended window.
 */
export function resolveRestPlan(
  nextExercise: RestPlannerExercise | null | undefined,
  transition: RestTransition,
): RestPlan {
  const category = resolveCategory(nextExercise);
  const window = REST_WINDOWS_SECONDS[category];
  const difficultyOffset =
    DIFFICULTY_OFFSET_SECONDS[nextExercise?.difficulty?.toLowerCase() ?? ""] ??
    0;

  const multiplier =
    transition === "between-exercises" ? NEW_EXERCISE_MULTIPLIER : 1;
  const derived = roundToStep((window.base + difficultyOffset) * multiplier);

  const durationSeconds =
    nextExercise?.restSeconds ?? clamp(derived, window.min, window.max);

  return {
    durationSeconds: clamp(durationSeconds, MIN_REST_SECONDS, MAX_REST_SECONDS),
    category,
    transition,
    rationale: RATIONALE_BY_CATEGORY[category][transition],
    recommendedMinSeconds: window.min,
    recommendedMaxSeconds: window.max,
  };
}

/** Clamps a manually adjusted rest duration to the supported bounds. */
export function clampRestDuration(seconds: number): number {
  return clamp(Math.round(seconds), MIN_REST_SECONDS, MAX_REST_SECONDS);
}
