import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AppState, type AppStateStatus } from 'react-native';
import * as Haptics from 'expo-haptics';

import { clampRestDuration, MIN_REST_SECONDS } from '../utils/restPlanner';

/**
 * Project Aegis — Rest Timer
 *
 * The countdown is driven by a wall-clock deadline rather than by decrementing
 * a counter on every tick. That choice does the heavy lifting for two of the
 * requirements at once: the timer cannot drift, and it stays correct when the
 * app is backgrounded, because elapsed time is always recomputed from the
 * clock instead of from how many intervals happened to fire.
 */

/** How often the remaining time is recomputed. Sub-second keeps the ring smooth. */
const TICK_INTERVAL_MS = 250;

/** Seconds of countdown that get the pulse-and-haptic treatment. */
export const FINAL_COUNTDOWN_SECONDS = 5;

/** How long the completion state is held so its animation can play out. */
const COMPLETION_HOLD_MS = 700;

/** Lifecycle of a single rest period. */
export type RestTimerStatus = 'idle' | 'running' | 'paused' | 'completing';

export interface UseRestTimerOptions {
  /** Called once the rest period has finished and its animation has played. */
  onComplete?: () => void;
  /** Set false to suppress tick and completion haptics. */
  enableHaptics?: boolean;
  /** Override how long the completion state is held, in ms. */
  completionHoldMs?: number;
}

export interface RestTimerState {
  status: RestTimerStatus;
  /** Whole seconds left, never negative. */
  remainingSeconds: number;
  /** Current full rest window, which grows and shrinks with adjustments. */
  durationSeconds: number;
  /** Seconds of rest completed so far. */
  elapsedSeconds: number;
  /** Fraction of the window completed, 0–1. */
  progress: number;
  isRunning: boolean;
  isPaused: boolean;
  /** True while the completion animation is playing. */
  isCompleting: boolean;
  /** True during the final seconds, used to drive the pulse. */
  isFinalCountdown: boolean;
  start: (durationSeconds: number) => void;
  pause: () => void;
  resume: () => void;
  /** Adds or removes seconds, keeping elapsed time unchanged. */
  adjust: (deltaSeconds: number) => void;
  /** Ends rest immediately without the completion animation. */
  skip: () => void;
  /** Clears the timer without notifying completion. */
  reset: () => void;
}

/** Fires a haptic without letting an unsupported platform reject into the void. */
function triggerHaptic(run: () => Promise<void>) {
  void run().catch(() => undefined);
}

const secondsUntil = (deadlineMs: number) =>
  Math.max(0, Math.ceil((deadlineMs - Date.now()) / 1000));

export function useRestTimer(
  options: UseRestTimerOptions = {},
): RestTimerState {
  const {
    enableHaptics = true,
    completionHoldMs = COMPLETION_HOLD_MS,
  } = options;

  const [status, setStatus] = useState<RestTimerStatus>('idle');
  const [durationSeconds, setDurationSeconds] = useState(0);
  const [remainingSeconds, setRemainingSeconds] = useState(0);

  /** Epoch ms the countdown ends at. Null whenever the timer is not running. */
  const deadlineRef = useRef<number | null>(null);
  /** Seconds held while paused, restored on resume. */
  const pausedRemainingRef = useRef(0);
  /** Last whole second a countdown haptic fired for, so each fires once. */
  const lastHapticSecondRef = useRef<number | null>(null);
  const completionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Held in a ref so changing the callback never restarts the interval.
  const onCompleteRef = useRef(options.onComplete);
  useEffect(() => {
    onCompleteRef.current = options.onComplete;
  }, [options.onComplete]);

  const clearCompletionTimeout = useCallback(() => {
    if (completionTimeoutRef.current) {
      clearTimeout(completionTimeoutRef.current);
      completionTimeoutRef.current = null;
    }
  }, []);

  const finish = useCallback(() => {
    deadlineRef.current = null;
    lastHapticSecondRef.current = null;
    setRemainingSeconds(0);
    setStatus('completing');

    if (enableHaptics) {
      triggerHaptic(() =>
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success),
      );
    }

    clearCompletionTimeout();
    completionTimeoutRef.current = setTimeout(() => {
      completionTimeoutRef.current = null;
      setStatus('idle');
      onCompleteRef.current?.();
    }, completionHoldMs);
  }, [clearCompletionTimeout, completionHoldMs, enableHaptics]);

  /** Recomputes remaining time from the deadline. Used by the tick and on resume. */
  const syncFromDeadline = useCallback(() => {
    if (deadlineRef.current === null) return;

    const next = secondsUntil(deadlineRef.current);
    setRemainingSeconds(next);

    if (
      enableHaptics &&
      next > 0 &&
      next <= FINAL_COUNTDOWN_SECONDS &&
      lastHapticSecondRef.current !== next
    ) {
      lastHapticSecondRef.current = next;
      triggerHaptic(() =>
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
      );
    }

    if (next <= 0) finish();
  }, [enableHaptics, finish]);

  // The countdown itself.
  useEffect(() => {
    if (status !== 'running') return;

    const interval = setInterval(syncFromDeadline, TICK_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [status, syncFromDeadline]);

  // Backgrounding does not stop wall-clock time, so resync the moment we return.
  useEffect(() => {
    if (status !== 'running') return;

    const subscription = AppState.addEventListener(
      'change',
      (nextState: AppStateStatus) => {
        if (nextState === 'active') syncFromDeadline();
      },
    );

    return () => subscription.remove();
  }, [status, syncFromDeadline]);

  useEffect(() => clearCompletionTimeout, [clearCompletionTimeout]);

  const start = useCallback(
    (nextDuration: number) => {
      const duration = clampRestDuration(nextDuration);

      clearCompletionTimeout();
      lastHapticSecondRef.current = null;
      pausedRemainingRef.current = 0;
      deadlineRef.current = Date.now() + duration * 1000;

      setDurationSeconds(duration);
      setRemainingSeconds(duration);
      setStatus('running');
    },
    [clearCompletionTimeout],
  );

  const pause = useCallback(() => {
    if (deadlineRef.current === null) return;

    pausedRemainingRef.current = secondsUntil(deadlineRef.current);
    deadlineRef.current = null;
    setRemainingSeconds(pausedRemainingRef.current);
    setStatus('paused');
  }, []);

  const resume = useCallback(() => {
    setStatus((current) => {
      if (current !== 'paused') return current;

      deadlineRef.current = Date.now() + pausedRemainingRef.current * 1000;
      return 'running';
    });
  }, []);

  const reset = useCallback(() => {
    clearCompletionTimeout();
    deadlineRef.current = null;
    pausedRemainingRef.current = 0;
    lastHapticSecondRef.current = null;
    setRemainingSeconds(0);
    setDurationSeconds(0);
    setStatus('idle');
  }, [clearCompletionTimeout]);

  const skip = useCallback(() => {
    clearCompletionTimeout();
    deadlineRef.current = null;
    pausedRemainingRef.current = 0;
    lastHapticSecondRef.current = null;
    setRemainingSeconds(0);
    setStatus('idle');
    onCompleteRef.current?.();
  }, [clearCompletionTimeout]);

  /**
   * Shifts both the deadline and the window by the same amount so the elapsed
   * portion — and therefore the ring — stays put.
   */
  const adjust = useCallback(
    (deltaSeconds: number) => {
      if (status !== 'running' && status !== 'paused') return;

      const current =
        status === 'paused'
          ? pausedRemainingRef.current
          : secondsUntil(deadlineRef.current ?? Date.now());

      const nextRemaining = current + deltaSeconds;

      if (nextRemaining <= 0) {
        finish();
        return;
      }

      setDurationSeconds((previous) =>
        Math.max(MIN_REST_SECONDS, previous + deltaSeconds),
      );
      lastHapticSecondRef.current = null;

      if (status === 'paused') {
        pausedRemainingRef.current = nextRemaining;
      } else {
        deadlineRef.current = Date.now() + nextRemaining * 1000;
      }

      setRemainingSeconds(nextRemaining);
    },
    [finish, status],
  );

  const elapsedSeconds = Math.max(0, durationSeconds - remainingSeconds);
  const progress =
    durationSeconds > 0 ? Math.min(1, elapsedSeconds / durationSeconds) : 0;

  return useMemo(
    () => ({
      status,
      remainingSeconds,
      durationSeconds,
      elapsedSeconds,
      progress,
      isRunning: status === 'running',
      isPaused: status === 'paused',
      isCompleting: status === 'completing',
      isFinalCountdown:
        status === 'running' &&
        remainingSeconds > 0 &&
        remainingSeconds <= FINAL_COUNTDOWN_SECONDS,
      start,
      pause,
      resume,
      adjust,
      skip,
      reset,
    }),
    [
      adjust,
      durationSeconds,
      elapsedSeconds,
      pause,
      progress,
      remainingSeconds,
      reset,
      resume,
      skip,
      start,
      status,
    ],
  );
}
