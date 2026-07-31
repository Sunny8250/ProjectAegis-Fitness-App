/**
 * Project Aegis — Rest Coach Engine
 *
 * Selects which recovery insight, motivation line, and preparation cues to show
 * at a given moment of a rest period.
 *
 * Selection is deterministic by design — `docs/14_Workout_Engine_Logic.md` §24
 * requires the engine to "never rely on randomness". Variety comes from
 * rotating a monotonic index and from seeding on the rest period, not from
 * `Math.random`, so the same context always produces the same guidance.
 */

import {
  GENERIC_PREP_CUES,
  MOTIVATION_TEMPLATES,
  PREP_CUES_BY_EQUIPMENT,
  PREP_CUES_BY_MUSCLE,
  RECOVERY_INSIGHTS,
  type CoachIconName,
  type CoachInsightTemplate,
  type RestCoachContext,
  type RestPhase,
} from "../data/restCoachContent";

export type {
  CoachIconName,
  RestCoachContext,
  RestPhase,
} from "../data/restCoachContent";

/** A resolved message ready to render. */
export interface CoachMessage {
  id: string;
  text: string;
  icon: CoachIconName;
}

/** Default number of preparation cues surfaced at once. */
export const DEFAULT_PREP_CUE_COUNT = 2;

/** Upper bound of rest progress for each stage. */
const PHASE_BOUNDS: { phase: RestPhase; maxProgress: number }[] = [
  { phase: "settle", maxProgress: 0.25 },
  { phase: "recover", maxProgress: 0.6 },
  { phase: "prepare", maxProgress: 0.85 },
  { phase: "final", maxProgress: Number.POSITIVE_INFINITY },
];

/** Maps rest progress onto the coaching stage. */
export function resolveRestPhase(restProgress: number): RestPhase {
  return (
    PHASE_BOUNDS.find((bound) => restProgress < bound.maxProgress)?.phase ??
    "final"
  );
}

/** Stable, order-independent string hash used to vary fallbacks per exercise. */
function hashString(value: string): number {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) | 0;
  }
  return Math.abs(hash);
}

const hasOverlap = (a: string[], b: string[]) =>
  a.some((value) => b.includes(value));

function matchesContext(
  template: CoachInsightTemplate,
  context: RestCoachContext,
): boolean {
  if (!template.phases.includes(context.phase)) return false;

  if (
    template.requiresEquipment &&
    !hasOverlap(template.requiresEquipment, context.nextEquipment)
  ) {
    return false;
  }

  if (
    template.requiresCategory &&
    !template.requiresCategory.includes(context.nextCategory)
  ) {
    return false;
  }

  if (
    template.requiresZone &&
    !template.requiresZone.includes(context.recoveryZone)
  ) {
    return false;
  }

  if (
    template.minRestSeconds !== undefined &&
    context.restDurationSeconds < template.minRestSeconds
  ) {
    return false;
  }

  return true;
}

const toMessage = (template: CoachInsightTemplate): CoachMessage => ({
  id: template.id,
  text: template.text,
  icon: template.icon,
});

/**
 * Picks the recovery insight for the current moment.
 *
 * `rotationIndex` advances on a fixed cadence and is monotonic across the whole
 * session, so consecutive insights differ without any "recently shown"
 * bookkeeping. Returns `null` only if no message matches, which callers should
 * treat as "show nothing" rather than an error.
 */
export function selectRecoveryInsight(
  context: RestCoachContext,
  rotationIndex: number,
): CoachMessage | null {
  const pool = RECOVERY_INSIGHTS.filter((template) =>
    matchesContext(template, context),
  );
  if (pool.length === 0) return null;

  return toMessage(pool[Math.abs(rotationIndex) % pool.length]);
}

/**
 * Picks the motivation line: the most specific statement that is true right
 * now, rotating between equally specific lines so consecutive rest periods do
 * not repeat the same phrasing. `seedKey` keeps the choice stable for the whole
 * of one rest period.
 */
export function selectMotivation(
  context: RestCoachContext,
  seedKey: string,
): CoachMessage {
  const applicable = MOTIVATION_TEMPLATES.filter((template) =>
    template.applies(context),
  ).sort((a, b) => b.priority - a.priority);

  const tier = applicable.filter(
    (candidate) => candidate.priority === applicable[0].priority,
  );
  const template = tier[hashString(seedKey) % tier.length];

  return {
    id: template.id,
    text: template.build(context),
    icon: template.icon,
  };
}

/**
 * Resolves the preparation cues for the next exercise.
 *
 * Cues authored on the exercise itself always win. Otherwise they are derived
 * from equipment and target muscles, falling back to generic movement cues.
 */
export function selectPreparationCues(
  context: RestCoachContext,
  authoredCues: readonly string[] | undefined,
  seedKey: string,
  maxCount: number = DEFAULT_PREP_CUE_COUNT,
): string[] {
  if (authoredCues && authoredCues.length > 0) {
    return [...authoredCues].slice(0, maxCount);
  }

  const derived = [
    ...context.nextEquipment.flatMap(
      (item) => PREP_CUES_BY_EQUIPMENT[item] ?? [],
    ),
    ...context.nextMuscles.flatMap((item) => PREP_CUES_BY_MUSCLE[item] ?? []),
  ];

  const unique = Array.from(new Set(derived));
  if (unique.length > 0) return unique.slice(0, maxCount);

  const offset = hashString(seedKey) % GENERIC_PREP_CUES.length;
  return Array.from({ length: Math.min(maxCount, GENERIC_PREP_CUES.length) },
    (_, index) => GENERIC_PREP_CUES[(offset + index) % GENERIC_PREP_CUES.length],
  );
}

const RECENT_MESSAGE_MEMORY = 5;

/** Appends an id to the recent-message window, keeping it bounded. */
export function rememberMessage(
  recentIds: readonly string[],
  id: string,
): string[] {
  if (recentIds[recentIds.length - 1] === id) return [...recentIds];
  return [...recentIds, id].slice(-RECENT_MESSAGE_MEMORY);
}
