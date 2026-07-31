import { memo, useMemo, useState, type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

import { Text } from '@/components/common/Text';
import type { AegisTheme } from '@/theme/themes';
import { useTheme } from '@/theme/useTheme';
import { formatDuration } from '@/utils/time';

import type {
  RestNextUp,
  WorkoutSessionProgress,
} from '../../hooks/useActiveWorkout';
import type { RestCoachGuidance } from '../../hooks/useRestCoach';
import type { RestTimerState } from '../../hooks/useRestTimer';
import type { RecoveryEstimate } from '../../utils/recoveryEstimator';
import {
  MAX_REST_SECONDS,
  REST_ADJUSTMENT_STEP_SECONDS,
  type RestPlan,
} from '../../utils/restPlanner';
import { RestCoachInsight } from './RestCoachInsight';
import { RestControls } from './RestControls';
import { RestCountdownRing } from './RestCountdownRing';
import { RestMotivation } from './RestMotivation';
import { RestNextExerciseCard } from './RestNextExerciseCard';
import { RestPreparationTips } from './RestPreparationTips';
import { RestRecommendationCard } from './RestRecommendationCard';
import { RestMetrics } from './RestMetrics';
import { RestWorkoutProgress } from './RestWorkoutProgress';

/**
 * Project Aegis — Rest & Recovery
 *
 * Composes the rest experience: the timer is the focal point, everything below
 * it answers a question the athlete would otherwise have to ask — why this
 * rest, how recovered am I, what is next, and how do I prepare for it.
 *
 * On tablets the supporting sections split into two columns so the timer does
 * not end up marooned at the top of a very tall, very empty screen.
 */

/** Entrance stagger, in ms. */
const SECTION_BASE_DELAY = 80;
const SECTION_STEP_DELAY = 70;
const SECTION_DURATION = 380;
const HERO_DURATION = 420;

interface RestScreenProps {
  timer: RestTimerState;
  plan: RestPlan;
  recovery: RecoveryEstimate;
  coach: RestCoachGuidance;
  /** The set the athlete returns to. Null only if nothing follows this rest. */
  nextUp: RestNextUp | null;
  progress: WorkoutSessionProgress;
  onSkip: () => void;
  onAdjust: (deltaSeconds: number) => void;
  onTogglePause: () => void;
}

interface SectionProps {
  children: ReactNode;
  /** Position in the stagger sequence. */
  index: number;
}

function Section({ children, index }: SectionProps) {
  return (
    <Animated.View
      entering={FadeInDown.delay(
        SECTION_BASE_DELAY + index * SECTION_STEP_DELAY,
      ).duration(SECTION_DURATION)}
    >
      {children}
    </Animated.View>
  );
}

function RestScreenComponent({
  coach,
  nextUp,
  onAdjust,
  onSkip,
  onTogglePause,
  plan,
  progress,
  recovery,
  timer,
}: RestScreenProps) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const canDecrease =
    timer.remainingSeconds > REST_ADJUSTMENT_STEP_SECONDS && !timer.isCompleting;
  const canIncrease =
    timer.durationSeconds + REST_ADJUSTMENT_STEP_SECONDS <= MAX_REST_SECONDS &&
    !timer.isCompleting;

  const [dismissedRecommendation, setDismissedRecommendation] = useState<string | null>(null);

  const showRecommendation =
    (recovery.advice === 'extend' || recovery.isSkipRecommended) &&
    dismissedRecommendation !== recovery.advice;

  const primarySections = (
    <>
      {showRecommendation && (
        <Section index={0}>
          <RestRecommendationCard
            currentRestSeconds={timer.durationSeconds}
            suggestedRestSeconds={recovery.isSkipRecommended ? 0 : timer.durationSeconds + 15}
            reason={recovery.adviceMessage}
            onKeepCurrent={() => setDismissedRecommendation(recovery.advice)}
            onApplySuggested={() => {
              onAdjust(15);
              setDismissedRecommendation(recovery.advice);
            }}
            onSkip={onSkip}
          />
        </Section>
      )}

      <Section index={showRecommendation ? 1 : 0}>
        <RestCoachInsight
          insight={coach.insight}
        />
      </Section>

      <Section index={showRecommendation ? 2 : 1}>
        <RestMetrics progress={progress} recovery={recovery} />
      </Section>

      <Section index={showRecommendation ? 3 : 2}>
        <RestMotivation motivation={coach.motivation} />
      </Section>
    </>
  );

  const secondarySections = (
    <>
      {nextUp ? (
        <Section index={3}>
          <RestNextExerciseCard nextUp={nextUp} />
        </Section>
      ) : null}

      <Section index={4}>
        <RestPreparationTips cues={coach.prepCues} />
      </Section>

      <Section index={5}>
        <RestWorkoutProgress progress={progress} />
      </Section>
    </>
  );

  return (
    <View style={styles.container}>
      <Animated.View
        entering={FadeIn.duration(HERO_DURATION)}
        style={styles.hero}
      >
        <Text style={styles.eyebrow} variant="label">
          {plan.transition === 'between-exercises'
            ? 'Rest before the next exercise'
            : 'Rest between sets'}
        </Text>

        <RestCountdownRing
          isCompleting={timer.isCompleting}
          isFinalCountdown={timer.isFinalCountdown}
          isPaused={timer.isPaused}
          progress={timer.progress}
          remainingSeconds={timer.remainingSeconds}
          recoveryPercent={recovery.recoveryPercent}
          readinessLabel={recovery.readinessLabel}
        />

        <Text align="center" color="text.secondary" style={styles.rationale} variant="caption">
          {plan.rationale}
        </Text>

        <Text align="center" color="text.tertiary" variant="small">
          Recommended {formatDuration(plan.recommendedMinSeconds)} –{' '}
          {formatDuration(plan.recommendedMaxSeconds)}
        </Text>
      </Animated.View>

      <Animated.View entering={FadeIn.delay(SECTION_BASE_DELAY).duration(SECTION_DURATION)}>
        <RestControls
          canDecrease={canDecrease}
          canIncrease={canIncrease}
          isPaused={timer.isPaused}
          isSkipRecommended={recovery.isSkipRecommended}
          onAdjust={onAdjust}
          onSkip={onSkip}
          onTogglePause={onTogglePause}
          stepSeconds={REST_ADJUSTMENT_STEP_SECONDS}
        />
      </Animated.View>

      {theme.metrics.isTablet ? (
        <View style={styles.columns}>
          <View style={styles.column}>{primarySections}</View>
          <View style={styles.column}>{secondarySections}</View>
        </View>
      ) : (
        <>
          {primarySections}
          {secondarySections}
        </>
      )}
    </View>
  );
}

function createStyles(theme: AegisTheme) {
  return StyleSheet.create({
    container: {
      gap: theme.layoutSpacing.section,
      paddingHorizontal: theme.layoutSpacing.screenPadding,
      paddingTop: theme.spacing.xl,
    },
    hero: {
      alignItems: 'center',
      gap: theme.spacing.md,
    },
    eyebrow: {
      color: theme.colors.text.tertiary,
      textTransform: 'uppercase',
    },
    rationale: {
      maxWidth: theme.metrics.scaleSize(340),
    },
    columns: {
      flexDirection: 'row',
      gap: theme.layoutSpacing.section,
    },
    column: {
      flex: 1,
      gap: theme.layoutSpacing.section,
    },
  });
}

export const RestScreen = memo(RestScreenComponent);

RestScreen.displayName = 'RestScreen';
