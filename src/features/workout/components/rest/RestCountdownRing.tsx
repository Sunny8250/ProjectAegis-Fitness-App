import { memo, useEffect, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  FadeIn,
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { ProgressRing } from '@/components/common/ProgressRing';
import { Text } from '@/components/common/Text';
import type { AegisTheme } from '@/theme/themes';
import { useTheme } from '@/theme/useTheme';
import { hexAlpha } from '@/utils/colors';
import {
  countdownUnitLabel,
  describeDuration,
  formatCountdown,
} from '@/utils/time';

/**
 * The focal point of the rest experience: how much time is left.
 *
 * The arc is driven by the shared {@link ProgressRing} rather than a private
 * SVG, and sweeps over a full second so the countdown reads as continuous
 * motion instead of a once-per-second jump.
 */

/** Ring diameter per breakpoint tier, in baseline dp. */
const RING_SIZE = { compact: 208, small: 224, tablet: 288, default: 248 };
const RING_STROKE_WIDTH = 14;

/** Matches the tick cadence so the arc never lags behind the digits. */
const RING_ANIMATION_MS = 1000;

/** Soft halo drawn behind the ring, in baseline dp of extra diameter. */
const HALO_PADDING = 32;
const HALO_ALPHA = 0.07;

/** Final-seconds pulse. */
const PULSE_SCALE = 1.045;
const PULSE_DURATION_MS = 480;
const PULSE_SETTLE_MS = 200;

/** Completion state cross-fade. */
const COMPLETION_FADE_MS = 260;
const COMPLETION_ICON_SIZE = 56;

const COUNTDOWN_FONT_SIZE = 64;
const NUMBER_FADE_MS = 180;

interface RestCountdownRingProps {
  /** Whole seconds left in the rest window. */
  remainingSeconds: number;
  /** Fraction of the rest window already elapsed, 0–1. */
  progress: number;
  isPaused: boolean;
  /** True during the final seconds, which drives the pulse. */
  isFinalCountdown: boolean;
  /** True while the completion animation plays. */
  isCompleting: boolean;
}

function RestCountdownRingComponent({
  isCompleting,
  isFinalCountdown,
  isPaused,
  progress,
  remainingSeconds,
}: RestCountdownRingProps) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const size = theme.metrics.scaleSize(theme.metrics.select(RING_SIZE));
  const haloSize = size + theme.metrics.scaleSize(HALO_PADDING);

  const accentColor = isCompleting
    ? theme.colors.success
    : isFinalCountdown
      ? theme.colors.secondary
      : theme.colors.primary;

  const gradientColors = useMemo<readonly [string, string]>(() => {
    if (isCompleting) return [theme.colors.successLight, theme.colors.success];
    if (isFinalCountdown) {
      return [theme.colors.secondaryLight, theme.colors.secondary];
    }
    return [theme.colors.primaryLight, theme.colors.primary];
  }, [
    isCompleting,
    isFinalCountdown,
    theme.colors.primary,
    theme.colors.primaryLight,
    theme.colors.secondary,
    theme.colors.secondaryLight,
    theme.colors.success,
    theme.colors.successLight,
  ]);

  const pulse = useSharedValue(1);
  const completion = useSharedValue(0);

  useEffect(() => {
    if (isFinalCountdown) {
      pulse.value = withRepeat(
        withSequence(
          withTiming(PULSE_SCALE, {
            duration: PULSE_DURATION_MS,
            easing: Easing.out(Easing.quad),
          }),
          withTiming(1, {
            duration: PULSE_DURATION_MS,
            easing: Easing.in(Easing.quad),
          }),
        ),
        -1,
        false,
      );
    } else {
      cancelAnimation(pulse);
      pulse.value = withTiming(1, { duration: PULSE_SETTLE_MS });
    }

    return () => cancelAnimation(pulse);
  }, [isFinalCountdown, pulse]);

  useEffect(() => {
    completion.value = withTiming(isCompleting ? 1 : 0, {
      duration: COMPLETION_FADE_MS,
    });
  }, [completion, isCompleting]);

  const ringStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
  }));

  const countdownStyle = useAnimatedStyle(() => ({
    opacity: 1 - completion.value,
  }));

  const completionStyle = useAnimatedStyle(() => ({
    opacity: completion.value,
    transform: [{ scale: 0.8 + completion.value * 0.2 }],
  }));

  const countdownLabel = formatCountdown(remainingSeconds);
  const unitLabel = isPaused ? 'Paused' : countdownUnitLabel(remainingSeconds);

  return (
    <View
      accessible
      accessibilityLabel={
        isCompleting
          ? 'Rest complete'
          : `${describeDuration(remainingSeconds)} of rest remaining${
              isPaused ? ', paused' : ''
            }`
      }
      style={styles.container}
    >
      <View
        style={[
          styles.halo,
          {
            width: haloSize,
            height: haloSize,
            backgroundColor: hexAlpha(accentColor, HALO_ALPHA),
          },
        ]}
      />

      <Animated.View style={ringStyle}>
        <ProgressRing
          accessibilityHidden
          animationDurationMs={RING_ANIMATION_MS}
          gradientColors={gradientColors}
          progress={1 - progress}
          size={size}
          strokeWidth={theme.metrics.scaleSize(RING_STROKE_WIDTH)}
          trackColor={theme.colors.border}
        >
          <Animated.View style={[styles.center, countdownStyle]}>
            <Animated.View
              key={countdownLabel}
              entering={FadeIn.duration(NUMBER_FADE_MS)}
            >
              <Text
                style={[
                  styles.countdown,
                  {
                    color: accentColor,
                    fontSize: theme.metrics.scaleFont(COUNTDOWN_FONT_SIZE),
                  },
                ]}
              >
                {countdownLabel}
              </Text>
            </Animated.View>

            <Text style={styles.unit} variant="label">
              {unitLabel}
            </Text>
          </Animated.View>

          <Animated.View style={[styles.center, completionStyle]}>
            <MaterialCommunityIcons
              color={theme.colors.success}
              name="check-circle-outline"
              size={theme.metrics.scaleSize(COMPLETION_ICON_SIZE)}
            />
            <Text style={styles.completionLabel} variant="label">
              Rest complete
            </Text>
          </Animated.View>
        </ProgressRing>
      </Animated.View>
    </View>
  );
}

function createStyles(theme: AegisTheme) {
  return StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    // Absolute without insets, so the parent's centring still applies.
    halo: {
      position: 'absolute',
      borderRadius: theme.radius.full,
    },
    center: {
      alignItems: 'center',
      bottom: 0,
      justifyContent: 'center',
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0,
    },
    countdown: {
      fontVariant: ['tabular-nums'],
      fontWeight: '700',
      includeFontPadding: false,
      textAlign: 'center',
    },
    unit: {
      color: theme.colors.text.secondary,
      marginTop: theme.spacing.xxs,
      textTransform: 'uppercase',
    },
    completionLabel: {
      color: theme.colors.success,
      marginTop: theme.spacing.xs,
      textTransform: 'uppercase',
    },
  });
}

export const RestCountdownRing = memo(RestCountdownRingComponent);

RestCountdownRing.displayName = 'RestCountdownRing';
