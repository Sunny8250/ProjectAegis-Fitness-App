import React, { memo, useCallback, useRef } from "react";
import { View, StyleSheet, Pressable, Animated } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Card } from "@/components/common/Card";
import { Text } from "@/components/common/Text";
import { Button } from "@/components/common/Button";
import { Skeleton } from "@/components/common/Skeleton";
import { useTheme } from "@/theme/useTheme";
import type { AegisTheme } from "@/theme/themes";
import { featuredWorkouts } from "../data/mockData";

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

function getDifficultyColor(difficulty: string, theme: AegisTheme) {
  switch (difficulty) {
    case "Beginner":
      return theme.colors.success;
    case "Intermediate":
      return theme.colors.warning;
    case "Advanced":
      return theme.colors.error;
    default:
      return theme.colors.primary;
  }
}

export const TodaysWorkoutSection = memo(function TodaysWorkoutSection({ isLoading }: { isLoading?: boolean }) {
  const { theme } = useTheme();
  const styles = React.useMemo(() => createStyles(theme), [theme]);
  const workout = featuredWorkouts.strength;
  const difficultyColor = getDifficultyColor(workout.difficulty, theme);

  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, { toValue: 0.98, useNativeDriver: true }).start();
  };
  const handlePressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();
  };
  const handlePress = useCallback(() => {
    // TODO: Navigation to workout flow
  }, []);

  const blendedStyle = { transform: [{ scale }] };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Skeleton width={180} height={28} style={styles.sectionTitle} />
      ) : (
        <Text variant="heading2" style={styles.sectionTitle}>Recommended For You</Text>
      )}
      
      <Animated.View style={blendedStyle}>
        <Pressable
          onPress={handlePress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <Card padding="none" style={styles.card}>
            {/* Image Placeholder */}
            <View style={[styles.imagePlaceholder, { backgroundColor: hexToRgba(difficultyColor, 0.1) }]}>
              {isLoading ? (
                <Skeleton width="100%" height="100%" />
              ) : (
                <MaterialCommunityIcons name="arm-flex" size={48} color={difficultyColor} />
              )}
            </View>

            {/* Content area */}
            <View style={styles.contentWrap}>
              {isLoading ? (
                <>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 12 }}>
                    <Skeleton width={80} height={24} borderRadius={12} />
                    <Skeleton width={40} height={24} />
                  </View>
                  <Skeleton width={200} height={32} style={{ marginBottom: 4 }} />
                  <Skeleton width={150} height={16} style={{ marginBottom: 16 }} />
                  <Skeleton width="100%" height={60} borderRadius={12} style={{ marginBottom: 24 }} />
                  <Skeleton width="100%" height={48} borderRadius={24} />
                </>
              ) : (
              <>
                <View style={styles.headerRow}>
                  <View style={[styles.difficultyPill, { backgroundColor: hexToRgba(difficultyColor, 0.15) }]}>
                    <View style={[styles.difficultyDot, { backgroundColor: difficultyColor }]} />
                    <Text variant="caption" style={[styles.difficultyText, { color: difficultyColor }]}>{workout.difficulty}</Text>
                  </View>
                  <View style={styles.ratingWrap}>
                    <MaterialCommunityIcons name="star" size={14} color={theme.colors.primary} />
                    <Text variant="small" style={styles.ratingText}>{workout.rating}</Text>
                  </View>
                </View>

                <Text variant="heading1" style={styles.title}>{workout.title}</Text>
                
                <View style={styles.metaRow}>
                  <MaterialCommunityIcons name="clock-outline" size={14} color={theme.colors.text.secondary} />
                  <Text variant="small" color="text.secondary">{workout.duration}</Text>
                  <Text variant="small" color="text.tertiary"> • </Text>
                  <MaterialCommunityIcons name="dumbbell" size={14} color={theme.colors.text.secondary} />
                  <Text variant="small" color="text.secondary">{workout.exercises}</Text>
                  <Text variant="small" color="text.tertiary"> • </Text>
                  <MaterialCommunityIcons name="fire" size={14} color={theme.colors.text.secondary} />
                  <Text variant="small" color="text.secondary">{workout.calories}</Text>
                </View>

                <View style={styles.aiReasonPanel}>
                  <MaterialCommunityIcons name="creation" size={16} color={theme.colors.primary} />
                  <Text variant="body" style={styles.aiReasonText}>
                    {workout.aiReason}
                  </Text>
                </View>

                <Button
                  accessibilityRole="button"
                  onPress={handlePress}
                  variant="primary"
                  size="large"
                  fullWidth
                  leftIcon={<MaterialCommunityIcons name="play" size={20} color={theme.colors.white} />}
                  style={styles.startButton}
                >
                  Start Workout
                </Button>
              </>
              )}
            </View>
          </Card>
        </Pressable>
      </Animated.View>
    </View>
  );
});

function createStyles(theme: AegisTheme) {
  return StyleSheet.create({
    container: {
      marginBottom: theme.spacing.lg,
      paddingHorizontal: theme.spacing.md,
    },
    sectionTitle: {
      marginBottom: theme.spacing.md,
      paddingHorizontal: theme.spacing.md,
    },
    card: {
      borderRadius: theme.radius.xxl,
      borderWidth: 0,
      backgroundColor: theme.colors.surface,
      elevation: 2,
      shadowOpacity: 0.04,
      overflow: "hidden",
    },
    imagePlaceholder: {
      height: 140,
      alignItems: "center",
      justifyContent: "center",
    },
    contentWrap: {
      padding: theme.spacing.lg,
    },
    headerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: theme.spacing.sm,
    },
    difficultyPill: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: theme.radius.full,
      gap: 6,
    },
    difficultyDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
    },
    difficultyText: {
      fontWeight: "700",
    },
    ratingWrap: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
    },
    ratingText: {
      fontWeight: "700",
      color: theme.colors.text.secondary,
    },
    title: {
      marginBottom: theme.spacing.sm,
    },
    metaRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      marginBottom: theme.spacing.lg,
    },
    aiReasonPanel: {
      flexDirection: "row",
      backgroundColor: hexToRgba(theme.colors.primary, 0.05),
      padding: theme.spacing.md,
      borderRadius: theme.radius.lg,
      borderLeftWidth: 3,
      borderLeftColor: theme.colors.primary,
      gap: theme.spacing.sm,
      marginBottom: theme.spacing.xl,
    },
    aiReasonText: {
      flex: 1,
      color: theme.colors.text.secondary,
      lineHeight: 20,
    },
    startButton: {
      borderRadius: theme.radius.full,
    },
  });
}
