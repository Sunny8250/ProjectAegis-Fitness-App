/* eslint-disable react-hooks/refs -- Animated.Value refs are stable imperative values for React Native Animated. */
import { useEffect, useMemo, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { router } from "expo-router";

// @ts-expect-error Expo resolves static image imports at build time.
import aegisLogo from "@/assets/images/branding/aegis-logo.png";
import { Text } from "@/components/common/Text";
import { useTheme } from "@/theme/useTheme";

const LOGO_SIZE = 160;
const INITIAL_LOGO_SCALE = 0.8;
const FINAL_LOGO_SCALE = 1;
const FADE_IN_DURATION_MS = 600;
const HOLD_DURATION_MS = 400;
const PULSE_DURATION_MS = 2000;
const NEXT_ROUTE = "/(onboarding)";

/** Premium animated launch screen with teal accent and fresh motion. */
export default function LaunchScreen() {
  const { theme } = useTheme();
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(INITIAL_LOGO_SCALE)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.9)).current;
  const pulseLoop = useRef(new Animated.Value(0)).current;
  const styles = useMemo(() => createStyles(theme), [theme]);

  useEffect(() => {
    const entrance = Animated.sequence([
      Animated.parallel([
        Animated.timing(opacity, { toValue: 1, duration: FADE_IN_DURATION_MS, useNativeDriver: true }),
        Animated.spring(scale, { toValue: FINAL_LOGO_SCALE, friction: 8, useNativeDriver: true }),
      ]),
      Animated.delay(HOLD_DURATION_MS),
    ]);

    const logoReveal = Animated.sequence([
      Animated.timing(logoOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.timing(logoScale, { toValue: 1, duration: 400, useNativeDriver: true }),
    ]);

    entrance.start(() => {
      logoReveal.start();

      // Continuous subtle pulse on the icon ring
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseLoop, { toValue: 1, duration: PULSE_DURATION_MS, useNativeDriver: true }),
          Animated.timing(pulseLoop, { toValue: 0, duration: PULSE_DURATION_MS, useNativeDriver: true }),
        ]),
      );
      pulse.start();
    });

    const timer = setTimeout(() => {
      router.replace(NEXT_ROUTE);
    }, 2500);

    return () => {
      timer && clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pulseRingStyle = {
    opacity: pulseLoop.interpolate({ inputRange: [0, 1], outputRange: [0.3, 0] }),
    transform: [
      {
        scale: pulseLoop.interpolate({ inputRange: [0, 1], outputRange: [1, 1.4] }),
      },
    ],
  };

  return (
    <View accessible accessibilityLabel="Aegis launch screen" style={styles.container}>
      {/* Ambient glow behind logo */}
      <View style={[styles.glow, { backgroundColor: hexToRgba(theme.colors.primary, 0.08) }]} />

      {/* Pulsing accent ring */}
      <Animated.View style={[styles.pulseRing, pulseRingStyle]}>
        <View style={styles.pulseRingInner} />
      </Animated.View>

      {/* Logo */}
      <Animated.View
        style={[
          styles.logoWrap,
          { opacity: logoOpacity, transform: [{ scale: logoScale }] },
        ]}
      >
        <View style={styles.logoCircle}>
          <Animated.Image
            accessible={false}
            resizeMode="contain"
            source={aegisLogo}
            style={styles.logo}
          />
        </View>
      </Animated.View>

      {/* Brand copy */}
      <Animated.View
        style={[
          styles.copy,
          { opacity: logoOpacity, transform: [{ translateY: pulseLoop.interpolate({ inputRange: [0, 1], outputRange: [0, 6] }) }] },
        ]}
      >
        <Text align="center" variant="display" style={styles.title}>
          AEGIS
        </Text>
        <Text align="center" variant="title" color="text.secondary" style={styles.tagline}>
          Build Better Habits
        </Text>
      </Animated.View>
    </View>
  );
}

function hexToRgba(hex: string, alpha: number) {
  if (!hex) return `rgba(0,0,0,${alpha})`;
  const cleaned = hex.replace("#", "");
  const bigint = parseInt(cleaned, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const createStyles = (theme: ReturnType<typeof useTheme>["theme"]) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.colors.background,
      gap: theme.spacing.lg,
    },
    glow: {
      position: "absolute",
      width: 200,
      height: 200,
      borderRadius: 100,
    },
    pulseRing: {
      position: "absolute",
      width: LOGO_SIZE + 40,
      height: LOGO_SIZE + 40,
      borderRadius: (LOGO_SIZE + 40) / 2,
      alignItems: "center",
      justifyContent: "center",
    },
    pulseRingInner: {
      width: LOGO_SIZE + 16,
      height: LOGO_SIZE + 16,
      borderRadius: (LOGO_SIZE + 16) / 2,
      backgroundColor: hexToRgba(theme.colors.primary, 0.06),
    },
    logoWrap: {
      alignItems: "center",
      justifyContent: "center",
    },
    logoCircle: {
      width: LOGO_SIZE,
      height: LOGO_SIZE,
      borderRadius: LOGO_SIZE / 2,
      backgroundColor: theme.colors.surface,
      alignItems: "center",
      justifyContent: "center",
      ...theme.shadows,
    },
    logo: {
      width: LOGO_SIZE * 0.6,
      height: LOGO_SIZE * 0.6,
    },
    copy: {
      alignItems: "center",
      gap: theme.spacing.xs,
    },
    title: {
      letterSpacing: 4,
    },
    tagline: {
      letterSpacing: 1,
    },
  });
