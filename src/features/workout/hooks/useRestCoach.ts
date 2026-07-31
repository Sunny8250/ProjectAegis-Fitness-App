import { useEffect, useMemo, useState } from 'react';

import type { RestCoachContext } from '../data/restCoachContent';
import {
  resolveRestPhase,
  selectMotivation,
  selectPreparationCues,
  selectRecoveryInsight,
  type CoachMessage,
} from '../utils/restCoachEngine';

/**
 * Project Aegis — Rest Coach
 *
 * Turns the live rest context into the guidance shown on screen.
 *
 * The rotation tick is monotonic for the whole session rather than reset per
 * rest period, so the coach never opens two rests with the same line and no
 * "recently shown" bookkeeping is needed. Everything else is derived, which
 * keeps selection pure and free of render-phase side effects.
 */

/** How long each recovery insight stays on screen. */
const INSIGHT_ROTATION_MS = 6500;

export interface UseRestCoachInput {
  /** False whenever the athlete is not resting; freezes all selection. */
  isActive: boolean;
  /** Changes when a new rest period begins. */
  periodKey: string;
  /** Live rest context, minus the stage which this hook derives. */
  context: Omit<RestCoachContext, 'phase'>;
  /** Cues authored on the upcoming exercise, preferred over derived ones. */
  authoredCues?: readonly string[];
}

export interface RestCoachGuidance {
  /** Current recovery insight, or null when nothing matches the context. */
  insight: CoachMessage | null;
  /** Contextual motivation for this rest period. */
  motivation: CoachMessage | null;
  /** One or two preparation cues for the upcoming exercise. */
  prepCues: string[];
  /** Current coaching stage, exposed for presentation decisions. */
  phase: RestCoachContext['phase'];
}

export function useRestCoach({
  isActive,
  periodKey,
  context,
  authoredCues,
}: UseRestCoachInput): RestCoachGuidance {
  const phase = resolveRestPhase(context.restProgress);

  const fullContext = useMemo<RestCoachContext>(
    () => ({ ...context, phase }),
    [context, phase],
  );

  const [rotationTick, setRotationTick] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setRotationTick((previous) => previous + 1);
    }, INSIGHT_ROTATION_MS);

    return () => clearInterval(interval);
  }, [isActive, periodKey]);

  // Re-selected on each rotation tick and whenever the stage changes the pool.
  const insight = useMemo(
    () => (isActive ? selectRecoveryInsight(fullContext, rotationTick) : null),
    [fullContext, isActive, rotationTick],
  );

  // Seeded on the period so the line holds steady for the whole rest.
  const motivation = useMemo(
    () => (isActive ? selectMotivation(fullContext, periodKey) : null),
    [fullContext, isActive, periodKey],
  );

  const prepCues = useMemo(
    () =>
      isActive
        ? selectPreparationCues(fullContext, authoredCues, periodKey)
        : [],
    [authoredCues, fullContext, isActive, periodKey],
  );

  return useMemo(
    () => ({ insight, motivation, prepCues, phase }),
    [insight, motivation, phase, prepCues],
  );
}
