import { memo, useEffect, useMemo } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';

import { Text } from '@/components/common/Text';
import { useTheme } from '@/theme/useTheme';

import type { OnboardingItem } from './types';

type OnboardingPageProps = {
  active: boolean;
  item: OnboardingItem;
  width: number;
};

const MICRO_ANIMATION_DURATION_MS = 300;
const MICRO_ANIMATION_STAGGER_MS = 80;
const INITIAL_ILLUSTRATION_TRANSLATE_Y = 16;
const FINAL_ILLUSTRATION_TRANSLATE_Y = 0;

/** Renders a single centered onboarding page from data. */
function OnboardingPageComponent({ active, item, width }: OnboardingPageProps) {
  const { theme } = useTheme();
  const illustrationOpacity = useMemo(() => new Animated.Value(1), []);
  const illustrationTranslateY = useMemo(
    () => new Animated.Value(FINAL_ILLUSTRATION_TRANSLATE_Y),
    [],
  );
  const titleOpacity = useMemo(() => new Animated.Value(1), []);
  const descriptionOpacity = useMemo(() => new Animated.Value(1), []);
  const styles = useMemo(() => createStyles(theme, width), [theme, width]);

  useEffect(() => {
    if (!active) {
      return;
    }

    illustrationOpacity.setValue(0);
    illustrationTranslateY.setValue(INITIAL_ILLUSTRATION_TRANSLATE_Y);
    titleOpacity.setValue(0);
    descriptionOpacity.setValue(0);

    const animation = Animated.stagger(MICRO_ANIMATION_STAGGER_MS, [
      Animated.parallel([
        Animated.timing(illustrationOpacity, {
          toValue: 1,
          duration: MICRO_ANIMATION_DURATION_MS,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(illustrationTranslateY, {
          toValue: FINAL_ILLUSTRATION_TRANSLATE_Y,
          duration: MICRO_ANIMATION_DURATION_MS,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(titleOpacity, {
        toValue: 1,
        duration: MICRO_ANIMATION_DURATION_MS,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(descriptionOpacity, {
        toValue: 1,
        duration: MICRO_ANIMATION_DURATION_MS,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]);

    animation.start();

    return () => {
      animation.stop();
    };
  }, [
    active,
    descriptionOpacity,
    illustrationOpacity,
    illustrationTranslateY,
    titleOpacity,
  ]);

  return (
    <View style={styles.page}>
      <Animated.View
        style={[
          styles.illustration,
          {
            opacity: illustrationOpacity,
            transform: [{ translateY: illustrationTranslateY }],
          },
        ]}
      >
        <Text accessible accessibilityLabel={item.emoji} align="center" style={styles.emoji}>
          {item.emoji}
        </Text>
      </Animated.View>
      <View style={styles.copy}>
        <Animated.View style={{ opacity: titleOpacity }}>
          <Text accessibilityRole="header" align="center" style={styles.title} variant="display">
            {item.title}
          </Text>
        </Animated.View>
        <Animated.View style={{ opacity: descriptionOpacity }}>
          <Text
            accessible
            accessibilityLabel={item.description}
            align="center"
            color="text.secondary"
            style={styles.description}
            variant="body"
          >
            {item.description}
          </Text>
        </Animated.View>
      </View>
    </View>
  );
}

export const OnboardingPage = memo(OnboardingPageComponent);

const createStyles = (theme: ReturnType<typeof useTheme>['theme'], width: number) =>
  StyleSheet.create({
    page: {
      width,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: theme.spacing.xl,
      paddingBottom: theme.spacing.xxl,
      gap: theme.spacing.xxl,
    },
    illustration: {
      width: theme.spacing.huge * 2,
      height: theme.spacing.huge * 2,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: theme.radius.full,
      backgroundColor: theme.colors.surface,
      ...theme.shadows,
    },
    emoji: {
      fontSize: theme.spacing.huge + theme.spacing.lg,
      lineHeight: theme.spacing.huge + theme.spacing.xxl,
    },
    copy: {
      alignItems: 'center',
      gap: theme.spacing.lg,
    },
    title: {
      maxWidth: theme.spacing.huge * theme.spacing.xs,
    },
    description: {
      maxWidth: theme.spacing.huge * theme.spacing.xs,
      paddingHorizontal: theme.spacing.xs,
    },
  });
