import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { View, StyleSheet, Pressable, Animated, Easing } from "react-native";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Svg, { Circle } from "react-native-svg";

import { Card } from "@/components/common/Card";
import { Skeleton } from "@/components/common/Skeleton";
import { Text } from "@/components/common/Text";
import { Button } from "@/components/common/Button";
import { useTheme } from "@/theme/useTheme";
import type { AegisTheme } from "@/theme/themes";

function hexToRgba(hex: string, alpha: number) {
  if (!hex) return `rgba(0,0,0,${alpha})`;
  const cleaned = hex.replace("#", "");
  const bigint = parseInt(
    cleaned.length === 3
      ? cleaned.split("").map((c) => c + c).join("")
      : cleaned,
    16,
  );
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// ────────────────────────────────────────────────────────────────────────
// MOCK DATA
// ────────────────────────────────────────────────────────────────────────

const WEEKLY_DATA = [
  { day: "M", intensity: 0.4, state: "past", workouts: 1, time: "45m", calories: "320 kcal", name: "Recovery" },
  { day: "T", intensity: 0.8, state: "past", workouts: 1, time: "60m", calories: "550 kcal", name: "Upper Body" },
  { day: "W", intensity: 0.1, state: "past", workouts: 0, time: "0m", calories: "0 kcal", name: "Rest" },
  { day: "T", intensity: 0.6, state: "past", workouts: 1, time: "40m", calories: "420 kcal", name: "Cardio" },
  { day: "F", intensity: 0.9, state: "today", workouts: 2, time: "75m", calories: "840 kcal", name: "HIIT + Core" },
  { day: "S", intensity: 0.5, state: "future", workouts: 1, time: "45m", calories: "—", name: "Yoga" },
  { day: "S", intensity: 0.0, state: "future", workouts: 0, time: "0m", calories: "—", name: "Rest" },
];

const WEEKLY_GOAL_PERCENT = 82;
const PROGRESS_ANIMATION_DURATION = 900;
const PROGRESS_ANIMATION_DELAY = 300;
const CHART_ANIMATION_DURATION = 600;

// ────────────────────────────────────────────────────────────────────────
// COMPONENT
// ────────────────────────────────────────────────────────────────────────

export interface WeeklyActivitySectionProps {
  cardRef?: React.RefObject<View | null>;
  triggerRef?: React.MutableRefObject<(() => void) | null>;
  isLoading?: boolean;
}

export const WeeklyActivitySection = memo(function WeeklyActivitySection({
  cardRef,
  triggerRef,
  isLoading,
}: WeeklyActivitySectionProps) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const router = useRouter();

  // Trigger State
  const [isTriggered, setIsTriggered] = useState(!triggerRef);
  const animationPlayed = useRef(false);

  const startAnimation = useCallback(() => {
    if (animationPlayed.current) return;
    animationPlayed.current = true;
    setIsTriggered(true);
  }, []);

  useEffect(() => {
    if (triggerRef) triggerRef.current = startAnimation;
    return () => {
      if (triggerRef) triggerRef.current = null;
    };
  }, [startAnimation, triggerRef]);

  // Chart Animations
  const chartAnims = useRef(WEEKLY_DATA.map(() => new Animated.Value(0))).current;
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);

  useEffect(() => {
    if (!isTriggered) return;
    const animations = chartAnims.map((anim, index) =>
      Animated.timing(anim, {
        toValue: 1,
        duration: CHART_ANIMATION_DURATION,
        delay: index * 50,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false, // Animating height
      })
    );
    Animated.stagger(50, animations).start();
  }, [isTriggered, chartAnims]);

  // Goal Progress Animation
  const progressAnim = useRef(new Animated.Value(0)).current;
  const [trackWidth, setTrackWidth] = useState(0);

  const handleTrackLayout = useCallback(
    (e: { nativeEvent: { layout: { width: number } } }) => {
      setTrackWidth(e.nativeEvent.layout.width);
    },
    [],
  );

  useEffect(() => {
    if (trackWidth === 0 || !isTriggered) return;

    const targetWidth = (WEEKLY_GOAL_PERCENT / 100) * trackWidth;
    progressAnim.setValue(0);

    const timer = setTimeout(() => {
      Animated.timing(progressAnim, {
        toValue: targetWidth,
        duration: PROGRESS_ANIMATION_DURATION,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }).start();
    }, PROGRESS_ANIMATION_DELAY);

    return () => {
      clearTimeout(timer);
    };
  }, [isTriggered, trackWidth, progressAnim]);

  // Helpers
  const handleViewAnalytics = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    router.push("/analytics" as any);
  }, [router]);

  const toggleTooltip = useCallback((index: number) => {
    setActiveTooltip((prev) => (prev === index ? null : index));
  }, []);

  return (
    <View ref={cardRef} style={styles.container}>
      <Card
        accessible={false}
        padding="large"
        variant="elevated"
        style={styles.card}
      >
        {/* SECTION 1: HEADER */}
        <View style={styles.header}>
          <View style={[styles.headerLeft, { flexShrink: 1, paddingRight: 8 }]}>
            <Text variant="heading2" numberOfLines={1}>Weekly Activity</Text>
          </View>
          <Pressable onPress={handleViewAnalytics} style={styles.headerRight}>
            <Text variant="small" color="primary" style={styles.headerLink}>
              View Analytics
            </Text>
            <MaterialCommunityIcons name="arrow-right" size={14} color={theme.colors.primary} />
          </Pressable>
        </View>

        {isLoading ? (
          <>
            <View style={[styles.chartSection, { height: 120, justifyContent: "center" }]}>
               <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", height: 100, paddingHorizontal: 16 }}>
                 {[1, 2, 3, 4, 5, 6, 7].map(i => (
                   <Skeleton key={i} width={28} height={20 + Math.random() * 80} borderRadius={6} />
                 ))}
               </View>
            </View>
            <View style={styles.summaryGrid}>
              {[1, 2, 3].map(i => (
                <Skeleton key={i} width="31%" height={60} borderRadius={12} />
              ))}
            </View>
            <Skeleton width="100%" height={80} borderRadius={12} style={{ marginTop: 24 }} />
          </>
        ) : (
        <>
        {/* SECTION 2: CHART */}
        <View style={styles.chartSection}>
          <View style={styles.chartContainer}>
            {WEEKLY_DATA.map((data, index) => {
              const maxBarHeight = 90;
              const barHeight = data.intensity === 0 ? 4 : data.intensity * maxBarHeight;

              let barColor: string = theme.colors.primary;
              let barOpacity = 1;
              if (data.state === "past") {
                barOpacity = 0.6;
              } else if (data.state === "future") {
                barColor = theme.colors.border;
                barOpacity = 0.4;
              }

              const animatedHeight = chartAnims[index].interpolate({
                inputRange: [0, 1],
                outputRange: [0, barHeight],
              });

              const isTooltipActive = activeTooltip === index;

              return (
                <View key={index} style={styles.barWrapper}>
                  {/* Tooltip Overlay (Absolute) */}
                  {isTooltipActive && (
                    <View style={styles.tooltip}>
                      <Text variant="caption" style={styles.tooltipTitle}>{data.name}</Text>
                      <Text variant="small" style={styles.tooltipText}>{data.time} • {data.calories}</Text>
                    </View>
                  )}

                  <Pressable
                    onPress={() => toggleTooltip(index)}
                    style={styles.barPressable}
                  >
                    <View style={styles.barTrack}>
                      <Animated.View
                        style={[
                          styles.barFill,
                          {
                            height: animatedHeight,
                            backgroundColor: barColor,
                            opacity: barOpacity,
                          },
                        ]}
                      />
                    </View>
                    <Text variant="small" color={data.state === "today" ? "primary" : "text.secondary"} style={data.state === "today" ? styles.todayText : undefined}>
                      {data.day}
                    </Text>
                  </Pressable>
                </View>
              );
            })}
          </View>
        </View>

        {/* SECTION 3: WEEKLY SUMMARY GRID */}
        <View style={styles.summaryGrid}>
          <View style={styles.summaryCard}>
            <View style={styles.summaryIconWrap}>
              <MaterialCommunityIcons name="fire" size={18} color="#F97316" />
            </View>
            <View style={styles.summaryData}>
              <Text variant="small" color="text.secondary" numberOfLines={1} style={{ marginBottom: 2 }}>Streak</Text>
              <View style={styles.summaryRow}>
                <Text variant="heading3" numberOfLines={1}>5</Text>
                <MaterialCommunityIcons name="trending-up" size={12} color={theme.colors.success} style={styles.trendIcon} />
              </View>
            </View>
          </View>
          
          <View style={styles.summaryCard}>
            <View style={[styles.summaryIconWrap, { backgroundColor: hexToRgba(theme.colors.success, 0.15) }]}>
              <MaterialCommunityIcons name="check-circle-outline" size={18} color={theme.colors.success} />
            </View>
            <View style={styles.summaryData}>
              <Text variant="small" color="text.secondary" numberOfLines={1} style={{ marginBottom: 2 }}>Workouts</Text>
              <View style={styles.summaryRow}>
                <Text variant="heading3" numberOfLines={1}>4/6</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.summaryCard}>
            <View style={[styles.summaryIconWrap, { backgroundColor: hexToRgba("#2563EB", 0.15) }]}>
              <MaterialCommunityIcons name="timer-outline" size={18} color="#3B82F6" />
            </View>
            <View style={styles.summaryData}>
              <Text variant="small" color="text.secondary" numberOfLines={1} style={{ marginBottom: 2 }}>Time</Text>
              <View style={styles.summaryRow}>
                <Text variant="heading3" numberOfLines={1} style={{ flexShrink: 1 }}>245m</Text>
                <Text variant="small" style={styles.trendTextPositive}>+18%</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.summaryCard}>
            <View style={[styles.summaryIconWrap, { backgroundColor: hexToRgba("#8B5CF6", 0.15) }]}>
              <MaterialCommunityIcons name="lightning-bolt-outline" size={18} color="#A78BFA" />
            </View>
            <View style={styles.summaryData}>
              <Text variant="small" color="text.secondary" numberOfLines={1} style={{ marginBottom: 2 }}>Calories</Text>
              <View style={styles.summaryRow}>
                <Text variant="heading3" numberOfLines={1} style={{ flexShrink: 1 }}>2.8k</Text>
                <Text variant="small" style={styles.trendTextPositive}>+5%</Text>
              </View>
            </View>
          </View>
        </View>

        {/* SECTION 4: WEEKLY GOAL */}
        <View style={styles.goalSection}>
          <View style={styles.goalHeaderRow}>
            <Text variant="heading3">Weekly Goal</Text>
            <Text variant="title" color="primary">{WEEKLY_GOAL_PERCENT}%</Text>
          </View>
          <View style={styles.progressBarWrap} onLayout={handleTrackLayout}>
            <View style={[styles.progressBarTrack, { backgroundColor: hexToRgba(theme.colors.primary, 0.12) }]}>
              <Animated.View
                style={[
                  styles.progressBarFill,
                  { backgroundColor: theme.colors.primary, width: progressAnim },
                ]}
              />
            </View>
          </View>
          <View style={styles.goalMetricsRow}>
            <Text variant="small" color="text.secondary">1 Workout Remaining</Text>
            <Text variant="small" color="text.secondary">Est: Saturday</Text>
          </View>
        </View>

        {/* SECTION 5: AI WEEKLY INSIGHT */}
        <View style={styles.aiInsightPanel}>
          <View style={styles.aiHeader}>
            <View style={styles.aiBadge}>
              <MaterialCommunityIcons name="robot-outline" size={16} color={theme.colors.primary} />
              <Text variant="small" color="primary" style={styles.aiBadgeText}>AI Insight</Text>
            </View>
          </View>
          
          <View style={styles.aiContentRow}>
            <MaterialCommunityIcons name="circle-medium" size={14} color={theme.colors.primary} style={styles.aiBullet} />
            <Text variant="body" style={styles.aiInsightText}>
              <Text style={styles.aiInsightHighlight}>18% improvement</Text> in training time this week.
            </Text>
          </View>
          
          <View style={styles.aiContentRow}>
            <MaterialCommunityIcons name="circle-medium" size={14} color={theme.colors.primary} style={styles.aiBullet} />
            <Text variant="body" style={styles.aiInsightText}>
              <Text style={styles.aiInsightHighlight}>Action:</Text> Schedule a Recovery stretch tomorrow.
            </Text>
          </View>
        </View>

        {/* SECTION 6: PRIMARY CTA */}
        <Button
          accessibilityRole="button"
          onPress={handleViewAnalytics}
          variant="outline"
          size="medium"
          fullWidth
          leftIcon={<MaterialCommunityIcons name="chart-bar" size={18} color={theme.colors.primary} />}
          style={styles.ctaButton}
        >
          View Weekly Report
        </Button>
        </>
        )}
      </Card>
    </View>
  );
});

// ────────────────────────────────────────────────────────────────────────
// STYLES
// ────────────────────────────────────────────────────────────────────────

function createStyles(theme: AegisTheme) {
  return StyleSheet.create({
    container: {
      paddingBottom: theme.spacing.lg,
    },
    card: {
      borderRadius: theme.radius.xl,
      borderWidth: 0,
      padding: theme.spacing.lg,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: theme.spacing.lg,
      gap: theme.spacing.sm,
    },
    headerLeft: {
      gap: 2,
    },
    headerRight: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      paddingVertical: 4,
      paddingHorizontal: 8,
      backgroundColor: hexToRgba(theme.colors.primary, 0.08),
      borderRadius: theme.radius.full,
      flexShrink: 0,
    },
    headerLink: {
      fontWeight: "600",
      fontSize: 13,
    },
    chartSection: {
      marginBottom: theme.spacing.lg,
      zIndex: 10,
    },
    chartContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-end",
      height: 120, // Reduced height
      paddingHorizontal: theme.spacing.xs,
    },
    barWrapper: {
      alignItems: "center",
      width: 32, // Tighter wrapper
    },
    barPressable: {
      alignItems: "center",
      width: "100%",
    },
    barTrack: {
      height: 90,
      width: 12, // Slimmer bars
      justifyContent: "flex-end",
      alignItems: "center",
      marginBottom: 6,
      backgroundColor: hexToRgba(theme.colors.border, 0.15),
      borderRadius: 99,
      overflow: "hidden",
    },
    barFill: {
      width: "100%",
      borderRadius: 99,
    },
    todayText: {
      fontWeight: "700",
    },
    tooltip: {
      position: "absolute",
      bottom: 115,
      width: 100,
      backgroundColor: theme.colors.surface,
      borderRadius: 8,
      padding: 6,
      alignItems: "center",
      zIndex: 100,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
      borderWidth: 1,
      borderColor: hexToRgba(theme.colors.border, 0.5),
    },
    tooltipTitle: {
      color: theme.colors.text.primary,
      fontWeight: "600",
      marginBottom: 2,
      textAlign: "center",
    },
    tooltipText: {
      color: theme.colors.text.secondary,
      textAlign: "center",
      fontSize: 10,
    },
    summaryGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      rowGap: theme.spacing.sm,
      marginBottom: theme.spacing.lg,
    },
    summaryCard: {
      width: "48.5%", // 2x2 grid
      flexDirection: "column",
      alignItems: "flex-start",
      backgroundColor: theme.colors.surface, // No border, relies on surface color
      borderRadius: theme.radius.md,
      padding: theme.spacing.sm,
      gap: theme.spacing.sm,
      ...theme.shadows,
      shadowOpacity: 0.02,
      elevation: 1,
    },
    summaryIconWrap: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: hexToRgba("#F97316", 0.15),
      alignItems: "center",
      justifyContent: "center",
    },
    summaryData: {
      justifyContent: "center",
      marginTop: 2,
    },
    summaryRow: {
      flexDirection: "row",
      alignItems: "baseline",
      gap: 4,
    },
    trendIcon: {
      marginLeft: 2,
    },
    trendTextPositive: {
      color: theme.colors.success,
      fontWeight: "600",
      fontSize: 11,
    },
    goalSection: {
      marginBottom: theme.spacing.lg,
    },
    goalHeaderRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: theme.spacing.xs,
    },
    progressBarWrap: {
      width: "100%",
    },
    progressBarTrack: {
      height: 6, // Sleeker track
      borderRadius: theme.radius.full,
      overflow: "hidden",
      marginBottom: theme.spacing.xs,
    },
    progressBarFill: {
      height: "100%",
      borderRadius: theme.radius.full,
    },
    goalMetricsRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    aiInsightPanel: {
      backgroundColor: hexToRgba(theme.colors.primary, 0.04),
      borderRadius: theme.radius.lg,
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
      marginBottom: theme.spacing.lg,
      borderWidth: 1,
      borderColor: hexToRgba(theme.colors.primary, 0.15),
    },
    aiHeader: {
      marginBottom: theme.spacing.sm,
    },
    aiBadge: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      backgroundColor: hexToRgba(theme.colors.primary, 0.15),
      alignSelf: "flex-start",
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: theme.radius.full,
    },
    aiBadgeText: {
      fontWeight: "700",
      fontSize: 11,
      textTransform: "uppercase",
    },
    aiContentRow: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginBottom: 6,
      paddingRight: theme.spacing.md,
    },
    aiBullet: {
      marginTop: 2,
      marginRight: 4,
    },
    aiInsightText: {
      lineHeight: 18,
      color: theme.colors.text.primary,
    },
    aiInsightHighlight: {
      fontWeight: "700",
    },
    ctaButton: {
      borderRadius: theme.radius.full,
    },
  });
}
