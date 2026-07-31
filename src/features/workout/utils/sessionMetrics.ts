/**
 * Project Aegis — Session Metrics
 *
 * Small pure helpers for the numbers a live session reports back to the
 * athlete. They live here rather than in the view so the figures are derived
 * from the workout's own estimates instead of an arbitrary constant.
 */

const SECONDS_PER_MINUTE = 60;
const MINUTES_PER_HOUR = 60;

/** Burn rate used when a workout carries no calorie estimate, in kcal/min. */
const DEFAULT_BURN_RATE_PER_MINUTE = 6;

/**
 * Reads a planned duration label such as "45 min" or "1h 05m" into minutes.
 * Returns 0 when the label carries no recognisable duration.
 */
export function parseDurationMinutes(label: string | undefined): number {
  if (!label) return 0;

  const hours = Number(/(\d+)\s*h/i.exec(label)?.[1] ?? 0);
  const minutes = Number(/(\d+)\s*m/i.exec(label)?.[1] ?? 0);

  return hours * MINUTES_PER_HOUR + minutes;
}

export interface CalorieEstimateInput {
  elapsedSeconds: number;
  /** The workout's own calorie estimate for a full session. */
  totalCalories?: number;
  /** The workout's planned duration label, e.g. "45 min". */
  plannedDurationLabel?: string;
}

/**
 * Estimates calories burned so far by spreading the workout's own estimate
 * across its planned duration. Falls back to a generic strength-training burn
 * rate when the workout does not supply one.
 */
export function estimateCaloriesBurned({
  elapsedSeconds,
  totalCalories,
  plannedDurationLabel,
}: CalorieEstimateInput): number {
  const plannedMinutes = parseDurationMinutes(plannedDurationLabel);
  const ratePerMinute =
    totalCalories && plannedMinutes > 0
      ? totalCalories / plannedMinutes
      : DEFAULT_BURN_RATE_PER_MINUTE;

  return Math.max(
    0,
    Math.round((ratePerMinute * elapsedSeconds) / SECONDS_PER_MINUTE),
  );
}
