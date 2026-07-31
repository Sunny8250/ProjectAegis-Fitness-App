/**
 * Project Aegis — Rest Coach Content Library
 *
 * Every word the AI Recovery Coach can say during a rest period lives here, so
 * copy can be reviewed against `docs/22_Copywriting_Guide.md` in one place:
 * calm, professional, one idea per message, no exaggerated praise.
 *
 * Templates carry declarative conditions. `restCoachEngine` does the selecting;
 * this module never picks, it only describes.
 */

import type { MaterialCommunityIcons } from "@expo/vector-icons";
import type { ComponentProps } from "react";

import type { ExerciseCategory } from "../utils/restPlanner";
import type { RecoveryZone } from "../utils/recoveryEstimator";

/** Icon names available to coach messages. */
export type CoachIconName = ComponentProps<typeof MaterialCommunityIcons>["name"];

/**
 * Stage of the rest period. Messages are tagged so guidance moves from
 * downshifting, through recovery, into preparing for the next set.
 */
export type RestPhase = "settle" | "recover" | "prepare" | "final";

/** Everything a coach message can be conditioned on. */
export interface RestCoachContext {
  phase: RestPhase;
  /** Fraction of the rest window elapsed, 0–1. */
  restProgress: number;
  restDurationSeconds: number;
  restRemainingSeconds: number;
  recoveryPercent: number;
  recoveryZone: RecoveryZone;
  /** Category of the exercise coming up next. */
  nextCategory: ExerciseCategory;
  nextEquipment: string[];
  nextMuscles: string[];
  /** True when the next set belongs to a different exercise. */
  isNewExercise: boolean;
  /** True when the next set is the final set of its exercise. */
  isFinalSetOfExercise: boolean;
  /** True when the next set is the final set of the workout. */
  isFinalSetOfWorkout: boolean;
  exercisesCompleted: number;
  exercisesRemaining: number;
  totalExercises: number;
  setsCompleted: number;
  totalSets: number;
  /** Fraction of the whole workout completed, 0–1. */
  workoutProgress: number;
}

/** A single recovery insight the coach can surface. */
export interface CoachInsightTemplate {
  id: string;
  text: string;
  icon: CoachIconName;
  /** Rest stages this message is appropriate for. */
  phases: RestPhase[];
  /** Only shown when the next exercise uses one of these items. */
  requiresEquipment?: string[];
  /** Only shown when the next exercise is one of these categories. */
  requiresCategory?: ExerciseCategory[];
  /** Only shown when recovery sits in one of these zones. */
  requiresZone?: RecoveryZone[];
  /** Only shown when the rest window is at least this long. */
  minRestSeconds?: number;
}

/** A contextual motivation line, chosen by priority rather than rotation. */
export interface MotivationTemplate {
  id: string;
  icon: CoachIconName;
  /** Higher wins when several templates apply. */
  priority: number;
  applies: (context: RestCoachContext) => boolean;
  build: (context: RestCoachContext) => string;
}

/**
 * Recovery insights. Ordered loosely by rest stage; the engine rotates through
 * whichever subset matches the current context.
 */
export const RECOVERY_INSIGHTS: CoachInsightTemplate[] = [
  // ── Settle: bring the heart rate down ──
  {
    id: "settle-breathe-out",
    text: "Breathe out slowly and let your heart rate come down.",
    icon: "lungs",
    phases: ["settle"],
  },
  {
    id: "settle-release-tension",
    text: "Relax your shoulders and unclench your jaw.",
    icon: "spa",
    phases: ["settle"],
  },
  {
    id: "settle-keep-moving",
    text: "Stay on your feet and move gently — it clears fatigue faster.",
    icon: "walk",
    phases: ["settle", "recover"],
    minRestSeconds: 45,
  },
  {
    id: "settle-shake-arms",
    text: "Shake out your arms to reduce muscle tension.",
    icon: "arm-flex",
    phases: ["settle", "recover"],
  },

  // ── Recover: the physiological middle of the window ──
  {
    id: "recover-deep-breathing",
    text: "Deep, steady breathing improves oxygen recovery.",
    icon: "lungs",
    phases: ["recover"],
  },
  {
    id: "recover-hydrate",
    text: "Take a sip of water — hydration supports your next set.",
    icon: "cup-water",
    phases: ["recover"],
    minRestSeconds: 45,
  },
  {
    id: "recover-heart-rate",
    text: "Your heart rate is settling. Give it a moment.",
    icon: "heart-pulse",
    phases: ["recover"],
  },
  {
    id: "recover-grip",
    text: "Loosen your grip and let your forearms recover.",
    icon: "hand-back-right",
    phases: ["recover"],
    requiresEquipment: ["Dumbbells", "Barbell", "Resistance Bands"],
  },
  {
    id: "recover-excellent",
    text: "Your recovery looks excellent.",
    icon: "check-decagram",
    phases: ["recover", "prepare"],
    requiresZone: ["excellent"],
  },
  {
    id: "recover-still-climbing",
    text: "Recovery is still climbing. An extra 15 seconds would help.",
    icon: "timer-sand",
    phases: ["recover", "prepare"],
    requiresZone: ["low", "poor"],
  },

  // ── Prepare: set up the next effort ──
  {
    id: "prepare-grip",
    text: "Prepare your grip for the next heavy set.",
    icon: "dumbbell",
    phases: ["prepare"],
    requiresCategory: ["strength"],
  },
  {
    id: "prepare-bench",
    text: "Set your bench position before the timer ends.",
    icon: "tune",
    phases: ["prepare"],
    requiresEquipment: ["Bench"],
  },
  {
    id: "prepare-visualise",
    text: "Picture your first rep before you start.",
    icon: "target",
    phases: ["prepare"],
  },
  {
    id: "prepare-brace",
    text: "Brace your core and find a neutral spine.",
    icon: "human",
    phases: ["prepare"],
  },
  {
    id: "prepare-band-anchor",
    text: "Check your band anchor while you have time.",
    icon: "tune",
    phases: ["prepare"],
    requiresEquipment: ["Resistance Bands"],
  },

  // ── Final: back to work ──
  {
    id: "final-position",
    text: "Move into position for your next set.",
    icon: "arrow-right-circle",
    phases: ["final"],
  },
  {
    id: "final-last-breath",
    text: "One last deep breath, then set your feet.",
    icon: "lungs",
    phases: ["final"],
  },
  {
    id: "final-control",
    text: "Start controlled. Speed comes from technique.",
    icon: "creation",
    phases: ["final"],
  },
];

/** Fallback preparation cues keyed by the equipment of the next exercise. */
export const PREP_CUES_BY_EQUIPMENT: Record<string, string[]> = {
  Dumbbells: ["Check your grip is centred.", "Keep your wrists neutral."],
  Bench: ["Set the bench angle before you start.", "Plant both feet firmly."],
  "Resistance Bands": [
    "Check the band anchor is secure.",
    "Keep tension on the band throughout.",
  ],
  Barbell: ["Check your bar position.", "Set your grip width first."],
};

/** Fallback preparation cues keyed by the muscles the next exercise loads. */
export const PREP_CUES_BY_MUSCLE: Record<string, string[]> = {
  Chest: ["Keep elbows tucked.", "Retract your shoulder blades."],
  "Upper Chest": ["Keep elbows tucked.", "Drive through the upper chest."],
  Shoulders: ["Maintain neutral spine.", "Avoid arching your lower back."],
  "Front Delts": ["Relax your shoulders away from your ears."],
  "Side Delts": ["Reduce swing.", "Lead the movement with your elbows."],
  Triceps: ["Keep your upper arms still.", "Control your breathing."],
  Core: ["Brace before the first rep."],
  Traps: ["Relax your shoulders away from your ears."],
  Forearms: ["Keep your wrists neutral."],
};

/** Cues used when nothing more specific applies. */
export const GENERIC_PREP_CUES: string[] = [
  "Move with control.",
  "Control your breathing.",
  "Maintain a neutral spine.",
  "Keep your technique consistent.",
];

/**
 * Motivation lines, chosen by priority so the most specific true statement wins.
 * Every line is a factual observation rather than a slogan.
 */
export const MOTIVATION_TEMPLATES: MotivationTemplate[] = [
  {
    id: "motivation-final-set",
    icon: "flag-checkered",
    priority: 100,
    applies: (context) => context.isFinalSetOfWorkout,
    build: () => "Last set of the session. Finish with good technique.",
  },
  {
    id: "motivation-last-exercise",
    icon: "flag-checkered",
    priority: 90,
    applies: (context) => context.exercisesRemaining === 0,
    build: () => "Final exercise. Almost finished.",
  },
  {
    id: "motivation-heavy-set-left",
    icon: "dumbbell",
    priority: 80,
    applies: (context) =>
      context.isFinalSetOfExercise && context.nextCategory === "strength",
    build: () => "One more heavy set on this exercise.",
  },
  {
    id: "motivation-set-left",
    icon: "check-decagram",
    priority: 70,
    applies: (context) => context.isFinalSetOfExercise,
    build: () => "One more set, then you move on.",
  },
  {
    id: "motivation-nearly-done",
    icon: "trending-up",
    priority: 60,
    applies: (context) => context.workoutProgress >= 0.8,
    build: () => "Almost finished. Keep your quality high.",
  },
  {
    id: "motivation-few-exercises",
    icon: "format-list-numbered",
    priority: 50,
    applies: (context) =>
      context.exercisesRemaining > 0 && context.exercisesRemaining <= 3,
    build: (context) =>
      context.exercisesRemaining === 1
        ? "Only 1 exercise remaining."
        : `Only ${context.exercisesRemaining} exercises remaining.`,
  },
  {
    id: "motivation-percent",
    icon: "chart-line-variant",
    priority: 40,
    applies: (context) => context.workoutProgress >= 0.4,
    build: (context) =>
      `You're ${Math.round(context.workoutProgress * 100)}% through today's workout.`,
  },
  {
    id: "motivation-sets-complete",
    icon: "check-decagram",
    priority: 30,
    applies: (context) => context.setsCompleted > 0,
    build: (context) =>
      `${context.setsCompleted} of ${context.totalSets} sets complete.`,
  },
  {
    id: "motivation-steady",
    icon: "creation",
    priority: 0,
    applies: () => true,
    build: () => "Steady work. Keep your technique consistent.",
  },
];
