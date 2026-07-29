/* eslint-disable react-hooks/refs -- Animated.Value refs are stable imperative values for React Native Animated. */
import { useEffect, useMemo, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';

// @ts-expect-error Expo resolves static image imports at build time.
// eslint-disable-next-line import/no-unresolved
import aegisLogo from '@/assets/images/branding/aegis-logo.png';
import { Text } from '@/components/common/Text';
import { useTheme } from '@/theme/useTheme';

const LOGO_SIZE = 180;
const INITIAL_LOGO_SCALE = 0.85;
const FINAL_LOGO_SCALE = 1;
const FADE_DURATION_MS = 700;
const HOLD_DURATION_MS = 600;
const NEXT_ROUTE = '/(onboarding)';

/** Premium animated launch screen shown before entering onboarding. */
export default function LaunchScreen() {
  const { theme } = useTheme();
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(INITIAL_LOGO_SCALE)).current;
  const styles = useMemo(() => createStyles(theme), [theme]);

  useEffect(() => {
    const animation = Animated.sequence([
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: FADE_DURATION_MS,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: FINAL_LOGO_SCALE,
          duration: FADE_DURATION_MS,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(HOLD_DURATION_MS),
    ]);

    animation.start(({ finished }) => {
      if (finished) {
        router.replace(NEXT_ROUTE);
      }
    });

    return () => {
      animation.stop();
    };
    // The Animated.Value refs are stable for this mount-only launch sequence.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View accessible accessibilityLabel="Aegis launch screen" style={styles.container}>
      <Animated.Image
        accessible={false}
        resizeMode="contain"
        source={aegisLogo}
        style={[
          styles.logo,
          {
            opacity,
            transform: [{ scale }],
          },
        ]}
      />
      <View style={styles.copy}>
        <Text align="center" style={styles.title} variant="display">
          AEGIS
        </Text>
        <Text align="center" color="text.secondary" variant="body">
          Build Better Habits
        </Text>
      </View>
    </View>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>['theme']) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.background,
      paddingHorizontal: theme.layoutSpacing.screenPadding,
      gap: theme.spacing.lg,
    },
    logo: {
      width: LOGO_SIZE,
      height: LOGO_SIZE,
    },
    copy: {
      alignItems: 'center',
      gap: theme.spacing.xs,
    },
    title: {
      fontWeight: theme.typography.display.fontWeight,
    },
  });
