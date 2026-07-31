import { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, BackHandler, Platform } from 'react-native';

/**
 * Project Aegis — Workout Exit Guard
 *
 * Confirms before an in-progress session is abandoned.
 * `docs/05_Interaction_Behaviour.md` §15 is explicit that progress must never
 * be lost silently, so the hardware back gesture is intercepted rather than
 * allowed through.
 */

const DEFAULT_TITLE = 'End this workout?';
const DEFAULT_MESSAGE =
  'Your session is still in progress. You can keep training and finish it properly.';
const CONFIRM_LABEL = 'End workout';
const CANCEL_LABEL = 'Keep training';

export interface UseWorkoutExitGuardOptions {
  /** False once the workout is finished, letting navigation through normally. */
  enabled: boolean;
  /** Invoked when the athlete confirms they want to leave. */
  onConfirmExit: () => void;
  /** Invoked when the athlete chooses to stay. */
  onCancelExit?: () => void;
  title?: string;
  message?: string;
}

export interface WorkoutExitGuard {
  /** Opens the confirmation prompt. Safe to call from any exit affordance. */
  requestExit: () => void;
  isPromptOpen: boolean;
  confirmExit: () => void;
  cancelExit: () => void;
}

export function useWorkoutExitGuard({
  enabled,
  onConfirmExit,
  onCancelExit,
}: UseWorkoutExitGuardOptions): WorkoutExitGuard {
  const [isPromptOpen, setIsPromptOpen] = useState(false);

  const requestExit = useCallback(() => {
    setIsPromptOpen(true);
  }, []);

  const confirmExit = useCallback(() => {
    setIsPromptOpen(false);
    onConfirmExit();
  }, [onConfirmExit]);

  const cancelExit = useCallback(() => {
    setIsPromptOpen(false);
    onCancelExit?.();
  }, [onCancelExit]);

  useEffect(() => {
    if (!enabled || Platform.OS !== 'android') return;

    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (!isPromptOpen) {
          requestExit();
        }
        return true;
      },
    );

    return () => subscription.remove();
  }, [enabled, requestExit, isPromptOpen]);

  return { requestExit, isPromptOpen, confirmExit, cancelExit };
}
