import { memo, useEffect, useId, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';

import { useTheme } from '@/theme/useTheme';
import { hexAlpha } from '@/utils/colors';

import type { ProgressRingProps } from './ProgressRing.types';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const DEFAULT_STROKE_WIDTH = 12;
const DEFAULT_ANIMATION_MS = 300;
const DEFAULT_TRACK_ALPHA = 0.14;
/** Degrees of rotation that move the arc origin to twelve o'clock. */
const ARC_ORIGIN_ROTATION = -90;

const clamp01 = (value: number) => Math.min(Math.max(value, 0), 1);

/**
 * Theme-aware circular progress indicator.
 *
 * The arc is driven on the UI thread by Reanimated, so it stays smooth while
 * JavaScript is busy. Centre content is composed via `children` rather than
 * baked in, which is what lets the same primitive serve a countdown timer and
 * a static completion ring.
 */
function ProgressRingComponent({
  accessibilityHidden = false,
  accessibilityLabel,
  animationDurationMs = DEFAULT_ANIMATION_MS,
  children,
  color,
  gradientColors,
  progress,
  rounded = true,
  size,
  strokeWidth = DEFAULT_STROKE_WIDTH,
  style,
  testID,
  trackColor,
}: ProgressRingProps) {
  const { theme } = useTheme();
  const gradientId = `progress-ring-${useId()}`;

  const strokeColor = color ?? theme.colors.primary;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  const target = clamp01(progress);
  const animatedProgress = useSharedValue(target);

  useEffect(() => {
    animatedProgress.value =
      animationDurationMs > 0
        ? withTiming(target, {
            duration: animationDurationMs,
            easing: Easing.linear,
          })
        : target;
  }, [animatedProgress, animationDurationMs, target]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference * (1 - animatedProgress.value),
  }));

  const containerStyle = useMemo(
    () => [styles.container, { width: size, height: size }, style],
    [size, style],
  );

  return (
    <View
      accessibilityElementsHidden={accessibilityHidden}
      accessibilityLabel={accessibilityHidden ? undefined : accessibilityLabel}
      accessibilityRole={accessibilityHidden ? undefined : 'progressbar'}
      accessibilityValue={
        accessibilityHidden
          ? undefined
          : { min: 0, max: 100, now: Math.round(target * 100) }
      }
      importantForAccessibility={accessibilityHidden ? 'no-hide-descendants' : 'auto'}
      style={containerStyle}
      testID={testID}
    >
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {gradientColors ? (
          <Defs>
            <LinearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
              <Stop offset="0" stopColor={gradientColors[0]} />
              <Stop offset="1" stopColor={gradientColors[1]} />
            </LinearGradient>
          </Defs>
        ) : null}

        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={trackColor ?? hexAlpha(strokeColor, DEFAULT_TRACK_ALPHA)}
          strokeWidth={strokeWidth}
          fill="none"
        />

        <AnimatedCircle
          animatedProps={animatedProps}
          cx={center}
          cy={center}
          r={radius}
          stroke={gradientColors ? `url(#${gradientId})` : strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeLinecap={rounded ? 'round' : 'butt'}
          fill="none"
          transform={`rotate(${ARC_ORIGIN_ROTATION} ${center} ${center})`}
        />
      </Svg>

      {children ? <View style={styles.content}>{children}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
});

export const ProgressRing = memo(ProgressRingComponent);

ProgressRing.displayName = 'ProgressRing';
