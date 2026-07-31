import { useCallback, useEffect, useRef } from 'react';
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
}

export function useWorkoutExitGuard({
  enabled,
  onConfirmExit,
  onCancelExit,
  title = DEFAULT_TITLE,
  message = DEFAULT_MESSAGE,
}: UseWorkoutExitGuardOptions): WorkoutExitGuard {
  // Held in refs so the back handler never needs re-subscribing.
  const onConfirmRef = useRef(onConfirmExit);
  const onCancelRef = useRef(onCancelExit);
  const isPromptOpenRef = useRef(false);

  useEffect(() => {
    onConfirmRef.current = onConfirmExit;
    onCancelRef.current = onCancelExit;
  }, [onCancelExit, onConfirmExit]);

  const requestExit = useCallback(() => {
    if (isPromptOpenRef.current) return;
    isPromptOpenRef.current = true;

    Alert.alert(title, message, [
      {
        text: CANCEL_LABEL,
        style: 'cancel',
        onPress: () => {
          isPromptOpenRef.current = false;
          onCancelRef.current?.();
        },
      },
      {
        text: CONFIRM_LABEL,
        style: 'destructive',
        onPress: () => {
          isPromptOpenRef.current = false;
          onConfirmRef.current();
        },
      },
    ]);
  }, [message, title]);

  useEffect(() => {
    if (!enabled || Platform.OS !== 'android') return;

    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        requestExit();
        return true;
      },
    );

    return () => subscription.remove();
  }, [enabled, requestExit]);

  return { requestExit };
}
