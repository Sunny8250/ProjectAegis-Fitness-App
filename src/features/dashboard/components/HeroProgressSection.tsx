import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Svg, { Circle } from "react-native-svg";

import { Card } from "@/components/common/Card";
import { Skeleton } from "@/components/common/Skeleton";
import { Text } from "@/components/common/Text";
import { useTheme } from "@/theme/useTheme";
import type { AegisTheme } from "@/theme/themes";
import { progressStats } from "../data/mockData";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const RING_MAX_SIZE = 160;
const RING_WIDTH_RATIO = 0.43;
const RING_BORDER_WIDTH = 9;
const TODAY_PROGRESS = 72;
const RING_ANIMATION_DURATION_MS = 1100;
const RING_ANIMATION_DELAY_MS = 200;
const HERO_ANIMATION_DURATION_MS = 300;
const HERO_INITIAL_TRANSLATE_Y = 20;
const HERO_FINAL_TRANSLATE_Y = 0;

function hexToRgba(hex: string, alpha: number) {
  if (!hex) return `rgba(0,0,0,${alpha})`;
  const cleaned = hex.replace("#", "");
  const bigint = parseInt(
    cleaned.length === 3 ? cleaned.split("").map((c) => c + c).join("") : cleaned,
    16
  );
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export interface HeroProgressSectionProps {
  cardRef?: React.RefObject<View | null>;
  triggerRef?: React.MutableRefObject<(() => void) | null>;
  isLoading?: boolean;
}

export const HeroProgressSection = memo(function HeroProgressSection({
  cardRef,
  triggerRef,
  isLoading,
}: HeroProgressSectionProps) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const opacity = useMemo(() => new Animated.Value(0), []);
  const translateY = useMemo(() => new Animated.Value(HERO_INITIAL_TRANSLATE_Y), []);

  const ringAnim = useMemo(() => new Animated.Value(0), []);
  const [displayedRingProgress, setDisplayedRingProgress] = useState(0);
  const ringAnimated = useRef(false);

  const startRingAnimation = useCallback(() => {
    if (ringAnimated.current) return;
    ringAnimated.current = true;
    const listenerId = ringAnim.addListener(({ value }) => {
      setDisplayedRingProgress(Math.round(value * TODAY_PROGRESS));
    });
    setTimeout(() => {
      Animated.timing(ringAnim, {
        toValue: 1,
        duration: RING_ANIMATION_DURATION_MS,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }).start(() => {
        ringAnim.removeListener(listenerId);
        setDisplayedRingProgress(TODAY_PROGRESS);
      });
    }, RING_ANIMATION_DELAY_MS);
  }, [ringAnim]);

  useEffect(() => {
    if (triggerRef) triggerRef.current = startRingAnimation;
    return () => { if (triggerRef) triggerRef.current = null; };
  }, [startRingAnimation, triggerRef]);

  useEffect(() => {
    const animation = Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: HERO_ANIMATION_DURATION_MS, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.timing(translateY, { toValue: HERO_FINAL_TRANSLATE_Y, duration: HERO_ANIMATION_DURATION_MS, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
    ]);
    animation.start();
    return () => { animation.stop(); };
  }, [opacity, translateY]);

  const ringSize = Math.min(RING_MAX_SIZE, Math.round(theme.metrics.width * RING_WIDTH_RATIO));
  const strokeWidth = theme.metrics.scaleSize(RING_BORDER_WIDTH);
  const radius = (ringSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const targetFraction = TODAY_PROGRESS / 100;

  const strokeDashoffset = ringAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, circumference * (1 - targetFraction)],
  });

  return (
    <Animated.View ref={cardRef} style={[styles.container, { opacity, transform: [{ translateY }] }]}>
      <Card
        padding="large"
        style={styles.heroCard}
        variant="elevated"
      >
        {isLoading ? (
          <>
            <View style={[styles.heroHeader, { marginBottom: 32 }]}>
              <Skeleton width={150} height={32} />
              <Skeleton width={120} height={24} borderRadius={12} />
            </View>
            <View style={{ alignItems: "center", marginBottom: 32 }}>
              <Skeleton width={200} height={200} borderRadius={100} />
            </View>
            <View style={styles.statsGrid}>
              {[1, 2, 3, 4].map((i) => (
                <View key={i} style={styles.statItem}>
                  <Skeleton width={24} height={24} borderRadius={12} />
                  <View style={styles.statTextWrap}>
                    <Skeleton width={40} height={20} style={{ marginBottom: 4 }} />
                    <Skeleton width={60} height={12} />
                  </View>
                </View>
              ))}
            </View>
          </>
        ) : (
        <>
        <View style={styles.heroHeader}>
        <View style={{ flexShrink: 1, paddingRight: 8 }}>
          <Text variant="heading2" numberOfLines={1} adjustsFontSizeToFit>Today's Progress</Text>
        </View>
        <View style={styles.readinessBadge}>
            <MaterialCommunityIcons name="lightning-bolt" size={14} color={theme.colors.warning} />
            <Text variant="caption" style={styles.readinessText}>92% Readiness</Text>
          </View>
        </View>

        <View style={styles.ringWrap}>
          <View style={[styles.circleContainer, { width: ringSize, height: ringSize }]}>
            <Svg width={ringSize} height={ringSize} style={{ position: "absolute", transform: [{ rotate: "-90deg" }] }}>
              <Circle cx={ringSize / 2} cy={ringSize / 2} r={radius} stroke={hexToRgba(theme.colors.primary, 0.15)} strokeWidth={strokeWidth} fill="none" />
              <AnimatedCircle cx={ringSize / 2} cy={ringSize / 2} r={radius} stroke={theme.colors.primary} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} />
            </Svg>
            <View style={[styles.circleInner, { width: ringSize - strokeWidth * 2 - 6, height: ringSize - strokeWidth * 2 - 6, borderRadius: (ringSize - strokeWidth * 2 - 6) / 2 }]}>
              <Text align="center" variant="hero" style={{ color: theme.colors.primary }}>{displayedRingProgress}%</Text>
            </View>
          </View>
        </View>

        <View style={styles.statsGrid}>
          {progressStats.map((stat) => (
            <View key={stat.id} style={styles.statItem}>
              <View style={styles.statIconWrap}>
                <MaterialCommunityIcons name={stat.iconName} size={16} color={theme.colors.primary} />
              </View>
              <View style={styles.statTextWrap}>
                <Text variant="heading3" numberOfLines={1} adjustsFontSizeToFit>{stat.value}</Text>
                <Text variant="caption" color="text.secondary" numberOfLines={1} adjustsFontSizeToFit>{stat.label}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.aiTipWrap}>
          <View style={styles.aiTipIcon}>
            <MaterialCommunityIcons name="robot-outline" size={16} color={theme.colors.primary} />
          </View>
          <Text variant="body" style={styles.aiTipText}>
            You're fully recovered. Aim for a high-intensity session today to maximize gains.
          </Text>
        </View>
        </>
        )}
      </Card>
    </Animated.View>
  );
});

function createStyles(theme: AegisTheme) {
  return StyleSheet.create({
    container: {
      paddingHorizontal: theme.spacing.md,
    },
    heroCard: {
      borderRadius: theme.radius.xxl,
      borderWidth: 0,
      backgroundColor: theme.colors.surface,
      elevation: 2,
      shadowOpacity: 0.04,
      marginBottom: theme.spacing.lg,
    },
    heroHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: theme.spacing.md,
      gap: theme.spacing.sm,
    },
    readinessBadge: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: hexToRgba(theme.colors.warning, 0.15),
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: theme.radius.full,
      gap: 4,
      flexShrink: 0,
    },
    readinessText: {
      color: theme.colors.warning,
      fontWeight: "700",
    },
    ringWrap: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: theme.spacing.md,
    },
    circleContainer: {
      position: "relative",
      alignItems: "center",
      justifyContent: "center",
    },
    circleInner: {
      backgroundColor: theme.colors.surface,
      alignItems: "center",
      justifyContent: "center",
    },
    statsGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      rowGap: theme.spacing.md,
      marginTop: theme.spacing.sm,
      marginBottom: theme.spacing.lg,
    },
    statItem: {
      width: "48%",
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: hexToRgba(theme.colors.text.secondary, 0.05),
      padding: theme.spacing.sm,
      borderRadius: theme.radius.md,
      gap: theme.spacing.sm,
    },
    statIconWrap: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: theme.colors.surface,
      alignItems: "center",
      justifyContent: "center",
      elevation: 1,
      shadowOpacity: 0.05,
    },
    statTextWrap: {
      flex: 1,
    },
    aiTipWrap: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: hexToRgba(theme.colors.primary, 0.1),
      padding: theme.spacing.md,
      borderRadius: theme.radius.lg,
      gap: theme.spacing.sm,
      borderLeftWidth: 3,
      borderLeftColor: theme.colors.primary,
    },
    aiTipIcon: {
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: hexToRgba(theme.colors.primary, 0.2),
      alignItems: "center",
      justifyContent: "center",
    },
    aiTipText: {
      flex: 1,
      color: theme.colors.text.primary,
      lineHeight: 18,
    },
  });
}
