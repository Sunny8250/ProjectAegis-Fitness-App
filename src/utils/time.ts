export function formatElapsedTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

/** Countdown values below a minute read better as a bare seconds count. */
const MMSS_THRESHOLD_SECONDS = 60;

/**
 * Formats a countdown for the rest timer.
 * Under a minute the bare seconds count is clearer; above it, mm:ss.
 */
export function formatCountdown(seconds: number): string {
  const safeSeconds = Math.max(0, Math.round(seconds));
  return safeSeconds < MMSS_THRESHOLD_SECONDS
    ? String(safeSeconds)
    : formatElapsedTime(safeSeconds);
}

/** Unit label matching the value returned by {@link formatCountdown}. */
export function countdownUnitLabel(seconds: number): string {
  const safeSeconds = Math.max(0, Math.round(seconds));
  if (safeSeconds >= MMSS_THRESHOLD_SECONDS) return 'remaining';
  return safeSeconds === 1 ? 'second' : 'seconds';
}

/** Compact human-readable duration, e.g. "45s", "5 min", "1h 05m". */
export function formatDuration(seconds: number): string {
  const safeSeconds = Math.max(0, Math.round(seconds));
  if (safeSeconds < MMSS_THRESHOLD_SECONDS) return `${safeSeconds}s`;

  const minutes = Math.floor(safeSeconds / 60);
  if (minutes < 60) return `${minutes} min`;

  const hours = Math.floor(minutes / 60);
  return `${hours}h ${(minutes % 60).toString().padStart(2, '0')}m`;
}

/** Spoken duration for screen readers, e.g. "1 minute 30 seconds". */
export function describeDuration(seconds: number): string {
  const safeSeconds = Math.max(0, Math.round(seconds));
  const minutes = Math.floor(safeSeconds / 60);
  const remainder = safeSeconds % 60;

  const parts: string[] = [];
  if (minutes > 0) parts.push(`${minutes} minute${minutes === 1 ? '' : 's'}`);
  if (remainder > 0 || minutes === 0) {
    parts.push(`${remainder} second${remainder === 1 ? '' : 's'}`);
  }

  return parts.join(' ');
}
