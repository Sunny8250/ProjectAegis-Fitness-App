import { memo, useEffect, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { Text } from '@/components/common/Text';
import type { AegisTheme } from '@/theme/themes';
import { useTheme } from '@/theme/useTheme';
import { hexAlpha } from '@/utils/colors';

/**
 * Slim labelled progress bar shared by the recovery and workout-progress cards,
 * so both animate identically instead of each rolling its own.
 */

const FILL_ANIMATION_MS = 420;
const DEFAULT_HEIGHT = 8;
const TRACK_ALPHA = 0.14;

interface RestMeterBarProps {
  /** Completion fraction, 0–1. Values outside the range are clamped. */
  value: number;
  /** Leading label. Omit for a bare bar. */
  label?: string;
  /** Trailing value shown opposite the label. */
  valueLabel?: string;
  /** Fill colour. Defaults to the theme primary. */
  color?: string;
  height?: number;
  /** Announced instead of the raw percentage. */
  accessibilityLabel?: string;
}

function RestMeterBarComponent({
  accessibilityLabel,
  color,
  height = DEFAULT_HEIGHT,
  label,
  value,
  valueLabel,
}: RestMeterBarProps) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const fillColor = color ?? theme.colors.primary;
  const target = Math.min(Math.max(value, 0), 1);

  const fill = useSharedValue(target);

  useEffect(() => {
    fill.value = withTiming(target, { duration: FILL_ANIMATION_MS });
  }, [fill, target]);

  const fillStyle = useAnimatedStyle(() => ({
    width: `${fill.value * 100}%`,
  }));

  return (
    <View
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: Math.round(target * 100) }}
      style={styles.container}
    >
      {label || valueLabel ? (
        <View style={styles.labelRow}>
          {label ? (
            <Text color="text.secondary" variant="small">
              {label}
            </Text>
          ) : null}
          {valueLabel ? (
            <Text style={styles.valueLabel} variant="small">
              {valueLabel}
            </Text>
          ) : null}
        </View>
      ) : null}

      <View
        style={[
          styles.track,
          {
            backgroundColor: hexAlpha(fillColor, TRACK_ALPHA),
            height: theme.metrics.scaleSize(height),
          },
        ]}
      >
        <Animated.View
          style={[styles.fill, { backgroundColor: fillColor }, fillStyle]}
        />
      </View>
    </View>
  );
}

function createStyles(theme: AegisTheme) {
  return StyleSheet.create({
    container: {
      gap: theme.spacing.xxs,
      width: '100%',
    },
    labelRow: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    valueLabel: {
      color: theme.colors.text.primary,
      fontWeight: '600',
    },
    track: {
      borderRadius: theme.radius.full,
      overflow: 'hidden',
      width: '100%',
    },
    fill: {
      borderRadius: theme.radius.full,
      height: '100%',
    },
  });
}

export const RestMeterBar = memo(RestMeterBarComponent);

RestMeterBar.displayName = 'RestMeterBar';
