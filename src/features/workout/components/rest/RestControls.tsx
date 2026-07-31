import { memo, useMemo } from 'react';
import { Animated, Pressable, StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Text } from '@/components/common/Text';
import { usePressAnimation } from '@/hooks/usePressAnimation';
import type { AegisTheme } from '@/theme/themes';
import { useTheme } from '@/theme/useTheme';
import { hexAlpha } from '@/utils/colors';

import type { CoachIconName } from '../../utils/restCoachEngine';

/**
 * Section 6 — the controls.
 *
 * Skip is only given the filled, primary treatment once the recovery model
 * agrees that ending rest early is a reasonable choice. The rest of the time it
 * stays available but visually quiet, so the default path is to let the timer
 * run.
 */

/** Minimum tappable dimension, per the accessibility guidelines. */
const TOUCH_TARGET = 64;
const ROUND_ICON_SIZE = 24;
const SKIP_ICON_SIZE = 20;
const DISABLED_OPACITY = 0.4;

interface RestControlsProps {
  isPaused: boolean;
  /** False when removing another step would end the rest window. */
  canDecrease: boolean;
  /** False when the rest window is already at its maximum. */
  canIncrease: boolean;
  /** True when the recovery model supports ending rest early. */
  isSkipRecommended: boolean;
  /** Seconds added or removed by the adjustment controls. */
  stepSeconds: number;
  onAdjust: (deltaSeconds: number) => void;
  onTogglePause: () => void;
  onSkip: () => void;
}

interface RoundControlProps {
  accessibilityHint?: string;
  accessibilityLabel: string;
  disabled?: boolean;
  icon: CoachIconName;
  label: string;
  onPress: () => void;
  /** Gives the pause control slightly more visual weight than the steppers. */
  prominent?: boolean;
}

function RoundControl({
  accessibilityHint,
  accessibilityLabel,
  disabled = false,
  icon,
  label,
  onPress,
  prominent = false,
}: RoundControlProps) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { animatedStyle, handlePressIn, handlePressOut } = usePressAnimation();

  const tint = prominent ? theme.colors.primary : theme.colors.text.primary;

  return (
    <Animated.View style={[styles.roundWrapper, animatedStyle]}>
      <Pressable
        accessibilityHint={accessibilityHint}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="button"
        accessibilityState={{ disabled }}
        disabled={disabled}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[
          styles.roundButton,
          prominent && styles.roundButtonProminent,
          disabled && styles.disabled,
        ]}
      >
        <MaterialCommunityIcons
          color={tint}
          name={icon}
          size={theme.metrics.scaleSize(ROUND_ICON_SIZE)}
        />
        <Text style={[styles.roundLabel, { color: tint }]} variant="small">
          {label}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

function RestControlsComponent({
  canDecrease,
  canIncrease,
  isPaused,
  isSkipRecommended,
  onAdjust,
  onSkip,
  onTogglePause,
  stepSeconds,
}: RestControlsProps) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { animatedStyle, handlePressIn, handlePressOut } = usePressAnimation();

  const skipTint = isSkipRecommended
    ? theme.colors.white
    : theme.colors.text.secondary;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <RoundControl
          accessibilityHint="Removes time from the current rest period"
          accessibilityLabel={`Reduce rest by ${stepSeconds} seconds`}
          disabled={!canDecrease}
          icon="minus"
          label={`${stepSeconds}s`}
          onPress={() => onAdjust(-stepSeconds)}
        />

        <RoundControl
          accessibilityHint={
            isPaused ? 'Continues the countdown' : 'Holds the countdown'
          }
          accessibilityLabel={isPaused ? 'Resume timer' : 'Pause timer'}
          icon={isPaused ? 'play' : 'pause'}
          label={isPaused ? 'Resume' : 'Pause'}
          onPress={onTogglePause}
          prominent
        />

        <RoundControl
          accessibilityHint="Adds time to the current rest period"
          accessibilityLabel={`Add ${stepSeconds} seconds of rest`}
          disabled={!canIncrease}
          icon="plus"
          label={`${stepSeconds}s`}
          onPress={() => onAdjust(stepSeconds)}
        />
      </View>

      <Animated.View style={animatedStyle}>
        <Pressable
          accessibilityHint={
            isSkipRecommended
              ? 'Your recovery supports starting the next set now'
              : 'Ends rest before the timer finishes'
          }
          accessibilityLabel="Skip rest"
          accessibilityRole="button"
          onPress={onSkip}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={[
            styles.skipButton,
            isSkipRecommended
              ? styles.skipButtonRecommended
              : styles.skipButtonQuiet,
          ]}
        >
          <MaterialCommunityIcons
            color={skipTint}
            name="skip-next"
            size={theme.metrics.scaleSize(SKIP_ICON_SIZE)}
          />
          <Text style={[styles.skipLabel, { color: skipTint }]} variant="button">
            Skip rest
          </Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}

function createStyles(theme: AegisTheme) {
  const touchTarget = theme.metrics.scaleSize(TOUCH_TARGET);

  return StyleSheet.create({
    container: {
      gap: theme.spacing.md,
      width: '100%',
    },
    row: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: theme.spacing.md,
      justifyContent: 'center',
    },
    roundWrapper: {
      borderRadius: theme.radius.full,
    },
    roundButton: {
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.border,
      borderRadius: theme.radius.full,
      borderWidth: StyleSheet.hairlineWidth,
      gap: theme.spacing.xxs / 2,
      height: touchTarget,
      justifyContent: 'center',
      width: touchTarget,
    },
    roundButtonProminent: {
      backgroundColor: hexAlpha(theme.colors.primary, 0.1),
      borderColor: hexAlpha(theme.colors.primary, 0.24),
    },
    disabled: {
      opacity: DISABLED_OPACITY,
    },
    roundLabel: {
      fontWeight: '600',
    },
    skipButton: {
      alignItems: 'center',
      borderRadius: theme.radius.full,
      flexDirection: 'row',
      gap: theme.spacing.xs,
      justifyContent: 'center',
      minHeight: touchTarget,
      paddingHorizontal: theme.spacing.xl,
    },
    skipButtonRecommended: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
      borderWidth: StyleSheet.hairlineWidth,
    },
    skipButtonQuiet: {
      backgroundColor: theme.colors.transparent,
      borderColor: theme.colors.border,
      borderWidth: StyleSheet.hairlineWidth,
    },
    skipLabel: {
      fontWeight: '600',
    },
  });
}

export const RestControls = memo(RestControlsComponent);

RestControls.displayName = 'RestControls';
