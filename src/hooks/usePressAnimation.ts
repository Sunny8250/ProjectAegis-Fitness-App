import { useCallback, useMemo } from "react";
import { Animated, Easing } from "react-native";
import * as Haptics from "expo-haptics";

interface PressAnimationConfig {
  /** Scale applied when pressed (default 0.97). */
  pressScale?: number;
  /** Opacity applied when pressed; omitted if not provided (default 1). */
  pressOpacity?: number;
  /** Animation duration in ms (default 100). */
  duration?: number;
}

/**
 * Returns animated press-feedback state and handlers.
 * Callers apply the returned `animatedStyle` to an Animated.View wrapping
 * their interactive element.
 */
export function usePressAnimation(config?: PressAnimationConfig) {
  const {
    pressScale = 0.97,
    pressOpacity,
    duration = 100,
  } = config ?? {};
  const pressProgress = useMemo(() => new Animated.Value(0), []);

  const animatedStyle = useMemo(() => {
    const scale = pressProgress.interpolate({
      inputRange: [0, 1],
      outputRange: [1, pressScale],
    });

    if (pressOpacity != null) {
      const opacity = pressProgress.interpolate({
        inputRange: [0, 1],
        outputRange: [1, pressOpacity],
      });
      return { transform: [{ scale }], opacity };
    }

    return { transform: [{ scale }] };
  }, [pressProgress, pressScale, pressOpacity]);

  const animate = useCallback(
    (toValue: number) => {
      Animated.timing(pressProgress, {
        toValue,
        duration,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    },
    [pressProgress, duration],
  );

  const handlePressIn = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    animate(1);
  }, [animate]);
  
  const handlePressOut = useCallback(() => animate(0), [animate]);

  return { animatedStyle, handlePressIn, handlePressOut, pressProgress };
}
