/**
 * Project Aegis — In-Session Recovery Estimator
 *
 * Estimates how recovered the athlete is *during* a rest period. This is the
 * session-level companion to the daily Recovery Engine: it reuses the recovery
 * zones from `docs/13_Recovery_Engine_Logic.md` §12 so a percentage means the
 * same thing everywhere in the app.
 *
 * All functions are pure — the estimate is a deterministic function of how much
 * rest has elapsed, how demanding the last set was, and how far through the
 * session the athlete is.
 */

import type { ExerciseCategory } from "./restPlanner";

/** Recovery zone bands, mirroring the daily Recovery Engine. */
export type RecoveryZone = "excellent" | "good" | "fair" | "low" | "poor";

/** Whether the athlete should cut the rest short, hold it, or extend it. */
export type RestAdvice = "shorten" | "hold" | "extend";

/** How much recovery a single set of each category costs, in points. */
const CATEGORY_DEPLETION: Record<ExerciseCategory, number> = {
  mobility: 12,
  stability: 22,
  strength: 38,
  conditioning: 30,
};

/** Depletion adjustment by movement difficulty, in points. */
const DIFFICULTY_DEPLETION: Record<string, number> = {
  beginner: -6,
  intermediate: 0,
  advanced: 8,
};

const MIN_DEPLETION = 8;
const MAX_DEPLETION = 55;

/** Recovery ceiling lost by the end of a session — you never fully reset. */
const MAX_SESSION_FATIGUE = 8;

/** Energy reserve consumed across a complete session, in points. */
const SESSION_ENERGY_DRAIN = 30;

/** Steepness of the recovery curve. Higher recovers earlier in the window. */
const RECOVERY_CURVE_K = 2.6;

/** Recovery at which cutting rest short is reasonable. */
const SHORTEN_RECOVERY_THRESHOLD = 90;

/** Recovery below which more rest is worth it near the end of the window. */
const EXTEND_RECOVERY_THRESHOLD = 78;

/** Rest progress before shortening is even considered. */
const SHORTEN_EARLIEST_PROGRESS = 0.6;

/** Rest progress past which the window counts as nearly done. */
const NEARLY_DONE_PROGRESS = 0.75;

const ZONE_THRESHOLDS: { zone: RecoveryZone; min: number }[] = [
  { zone: "excellent", min: 90 },
  { zone: "good", min: 75 },
  { zone: "fair", min: 60 },
  { zone: "low", min: 40 },
  { zone: "poor", min: 0 },
];

const READINESS_LABELS: Record<RecoveryZone, string> = {
  excellent: "Ready for next set",
  good: "Nearly ready",
  fair: "Still recovering",
  low: "Take your time",
  poor: "Keep resting",
};

const HEADLINES: Record<RecoveryZone, string> = {
  excellent: "Your recovery looks excellent.",
  good: "Recovery is on track.",
  fair: "Your body is still settling.",
  low: "Give this rest a little longer.",
  poor: "Take the time you need here.",
};

const ADVICE_MESSAGES: Record<RestAdvice, string> = {
  shorten: "You're recovered — shorter rest will build endurance.",
  hold: "Maintain your current pace.",
  extend: "Take an extra 15 seconds before your next set.",
};

/** Inputs required to estimate in-session recovery. */
export interface RecoveryEstimateInput {
  /** Seconds of rest completed so far. */
  restElapsedSeconds: number;
  /** Total prescribed rest for this period. */
  restDurationSeconds: number;
  /** Category of the set that was just completed. */
  category: ExerciseCategory;
  /** Difficulty of the set that was just completed. */
  difficulty?: string;
  /** Fraction of the whole workout completed, 0–1. */
  workoutProgress: number;
}

/** A recovery snapshot for one moment inside a rest period. */
export interface RecoveryEstimate {
  /** Physical recovery from the last set, 0–100. */
  recoveryPercent: number;
  /** Estimated energy reserve left for the session, 0–100. */
  energyPercent: number;
  zone: RecoveryZone;
  /** Short status shown beside the percentage. */
  readinessLabel: string;
  /** One-sentence coach observation. */
  headline: string;
  advice: RestAdvice;
  /** One-sentence coach suggestion matching {@link advice}. */
  adviceMessage: string;
  /** True when ending rest early is a reasonable choice right now. */
  isSkipRecommended: boolean;
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

/**
 * Saturating recovery curve, normalised so a full rest window returns exactly 1.
 * Recovery is fastest at the start of a rest period and tapers off.
 */
function recoveryCurve(progress: number): number {
  const p = clamp(progress, 0, 1);
  return (
    (1 - Math.exp(-RECOVERY_CURVE_K * p)) / (1 - Math.exp(-RECOVERY_CURVE_K))
  );
}

function resolveZone(recoveryPercent: number): RecoveryZone {
  return (
    ZONE_THRESHOLDS.find((band) => recoveryPercent >= band.min)?.zone ?? "poor"
  );
}

function resolveAdvice(recoveryPercent: number, progress: number): RestAdvice {
  if (
    progress >= SHORTEN_EARLIEST_PROGRESS &&
    recoveryPercent >= SHORTEN_RECOVERY_THRESHOLD
  ) {
    return "shorten";
  }

  if (
    progress >= NEARLY_DONE_PROGRESS &&
    recoveryPercent < EXTEND_RECOVERY_THRESHOLD
  ) {
    return "extend";
  }

  return "hold";
}

/** Produces the recovery snapshot for the current moment of a rest period. */
export function estimateRecovery({
  restElapsedSeconds,
  restDurationSeconds,
  category,
  difficulty,
  workoutProgress,
}: RecoveryEstimateInput): RecoveryEstimate {
  const progress =
    restDurationSeconds > 0
      ? clamp(restElapsedSeconds / restDurationSeconds, 0, 1)
      : 1;
  const sessionProgress = clamp(workoutProgress, 0, 1);

  const depletion = clamp(
    CATEGORY_DEPLETION[category] +
      (DIFFICULTY_DEPLETION[difficulty?.toLowerCase() ?? ""] ?? 0),
    MIN_DEPLETION,
    MAX_DEPLETION,
  );

  const floor = 100 - depletion;
  const ceiling = Math.max(floor, 100 - sessionProgress * MAX_SESSION_FATIGUE);
  const curve = recoveryCurve(progress);

  const recoveryPercent = Math.round(floor + (ceiling - floor) * curve);
  const energyPercent = Math.round(
    clamp(
      100 - sessionProgress * SESSION_ENERGY_DRAIN - depletion * (1 - curve),
      15,
      100,
    ),
  );

  const zone = resolveZone(recoveryPercent);
  const advice = resolveAdvice(recoveryPercent, progress);

  return {
    recoveryPercent,
    energyPercent,
    zone,
    readinessLabel: READINESS_LABELS[zone],
    headline: HEADLINES[zone],
    advice,
    adviceMessage: ADVICE_MESSAGES[advice],
    isSkipRecommended: advice === "shorten",
  };
}
