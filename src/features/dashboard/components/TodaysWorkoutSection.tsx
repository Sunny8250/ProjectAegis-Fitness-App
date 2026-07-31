import React, { memo, useCallback, useRef, useState, useEffect } from "react";
import { View, StyleSheet, Pressable, Animated, Easing, ScrollView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";

import { Card } from "@/components/common/Card";
import { Text } from "@/components/common/Text";
import { Button } from "@/components/common/Button";
import { Skeleton } from "@/components/common/Skeleton";
import { useTheme } from "@/theme/useTheme";
import type { AegisTheme } from "@/theme/themes";
import { aiRecommendation } from "../data/mockData";

// Fallback if not exported properly
function hexAlpha(hex: string, alpha: number) {
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
  const workout = aiRecommendation;
  const difficultyColor = getDifficultyColor(workout.difficulty, theme);

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!isLoading) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
  }, [isLoading]);

  const handlePressIn = () => Animated.spring(scaleAnim, { toValue: 0.98, useNativeDriver: true }).start();
  const handlePressOut = () => Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }).start();
  const handleStartWorkout = useCallback(() => {}, []);
  const handleViewDetails = useCallback(() => {}, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerTitleRow}>
            <Skeleton width={24} height={24} borderRadius={12} />
            <Skeleton width={200} height={28} />
          </View>
          <Skeleton width={150} height={16} style={styles.headerSubtitle} />
        </View>
        <Card padding="none" style={styles.card}>
          <Skeleton width="100%" height={240} />
          <View style={{ padding: theme.spacing.lg }}>
            <Skeleton width="60%" height={28} style={{ marginBottom: 8 }} />
            <Skeleton width="100%" height={16} style={{ marginBottom: 4 }} />
            <Skeleton width="80%" height={16} style={{ marginBottom: 24 }} />
            
            <Skeleton width="100%" height={100} borderRadius={12} style={{ marginBottom: 24 }} />
            
            <View style={{ flexDirection: 'row', gap: 12, marginBottom: 24 }}>
              <Skeleton width={80} height={32} borderRadius={16} />
              <Skeleton width={80} height={32} borderRadius={16} />
              <Skeleton width={80} height={32} borderRadius={16} />
            </View>

            <Skeleton width="100%" height={56} borderRadius={28} style={{ marginBottom: 12 }} />
            <Skeleton width="100%" height={56} borderRadius={28} />
          </View>
        </Card>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* SECTION 1: HEADER */}
      <View style={styles.header}>
        <View style={styles.headerTitleRow}>
          <MaterialCommunityIcons name="robot-outline" size={24} color={theme.colors.primary} />
          <Text variant="heading2" style={styles.headerTitle}>Aegis AI Recommendation</Text>
        </View>
        <Text variant="caption" color="text.secondary" style={styles.headerSubtitle}>
          Your personalized workout for today
        </Text>
      </View>

      <Animated.View style={{ transform: [{ scale: scaleAnim }], opacity: fadeAnim }}>
        <Pressable onPress={handleViewDetails} onPressIn={handlePressIn} onPressOut={handlePressOut}>
          <Card padding="none" style={styles.card}>
            {/* SECTION 2: HERO IMAGE & OVERLAY */}
            <View style={styles.heroSection}>
              <Image 
                source={{ uri: workout.imageUri }} 
                style={StyleSheet.absoluteFill} 
                contentFit="cover" 
                transition={300}
              />
              <LinearGradient
                colors={['transparent', hexAlpha(theme.colors.background, 0.95), theme.colors.surface]}
                locations={[0, 0.8, 1]}
                style={StyleSheet.absoluteFill}
              />
              <View style={styles.heroOverlay}>
                <View style={[styles.difficultyBadge, { backgroundColor: hexAlpha(difficultyColor, 0.9) }]}>
                  <Text variant="small" style={styles.difficultyText}>{workout.difficulty}</Text>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.heroMetrics}>
                  <View style={styles.heroMetricBadge}>
                    <Text variant="caption" style={styles.heroMetricText}>⏱️ {workout.duration}</Text>
                  </View>
                  <View style={styles.heroMetricBadge}>
                    <Text variant="caption" style={styles.heroMetricText}>🔥 {workout.calories}</Text>
                  </View>
                  <View style={styles.heroMetricBadge}>
                    <Text variant="caption" style={styles.heroMetricText}>💪 {workout.exercises}</Text>
                  </View>
                  <View style={styles.heroMetricBadge}>
                    <MaterialCommunityIcons name="star" size={12} color="#FBBF24" />
                    <Text variant="caption" style={styles.heroMetricText}> {workout.rating}</Text>
                  </View>
                </ScrollView>
              </View>
            </View>

            <View style={styles.contentWrap}>
              {/* SECTION 2 (Cont.): WORKOUT TITLE & DESC */}
              <View style={styles.titleSection}>
                <Text variant="heading1" style={styles.workoutTitle}>{workout.title}</Text>
                <Text variant="body" color="text.secondary" style={styles.workoutDesc} numberOfLines={2}>
                  {workout.description}
                </Text>
              </View>

              {/* SECTION 3: AI INSIGHT PANEL */}
              <View style={styles.aiInsightPanel}>
                <View style={styles.aiInsightHeader}>
                  <MaterialCommunityIcons name="robot" size={18} color={theme.colors.primary} />
                  <Text variant="title" style={styles.aiInsightTitle}>Why Aegis AI Recommends This</Text>
                </View>
                <View style={styles.aiReasonsList}>
                  {workout.recommendationReasons.map((reason, index) => (
                    <View key={index} style={styles.aiReasonRow}>
                      <MaterialCommunityIcons name="check-circle" size={16} color={theme.colors.success} style={styles.reasonIcon} />
                      <Text variant="small" style={styles.reasonText}>{reason}</Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* SECTION 4: WORKOUT HIGHLIGHTS (CHIPS) */}
              <View style={styles.highlightsSection}>
                <View style={styles.chipRow}>
                  {workout.targetMuscles.map((muscle, index) => (
                    <View key={`muscle-${index}`} style={styles.chip}>
                      <Text variant="small" style={styles.chipText}>{muscle}</Text>
                    </View>
                  ))}
                  {workout.equipment.map((item, index) => (
                    <View key={`equip-${index}`} style={styles.chipSecondary}>
                      <Text variant="small" style={styles.chipTextSecondary}>{item}</Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* SECTION 6: ACTIONS */}
              <View style={styles.actionsSection}>
                <Button 
                  variant="primary" 
                  size="large" 
                  onPress={handleStartWorkout} 
                  style={styles.primaryBtn}
                  leftIcon={<MaterialCommunityIcons name="play" size={24} color="#FFF" />}
                >
                  Start Workout
                </Button>
                <Button 
                  variant="outline" 
                  size="large" 
                  onPress={handleViewDetails}
                  style={styles.secondaryBtn}
                >
                  View Details
                </Button>
              </View>
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
      paddingHorizontal: theme.spacing.md,
      marginBottom: theme.spacing.xl,
    },
    header: {
      marginBottom: theme.spacing.md,
    },
    headerTitleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginBottom: 2,
    },
    headerTitle: {
      fontWeight: '800',
    },
    headerSubtitle: {
      marginLeft: 32,
    },
    card: {
      borderRadius: theme.radius.xxl,
      borderWidth: 0,
      backgroundColor: theme.colors.surface,
      elevation: 4,
      shadowOpacity: 0.08,
      shadowRadius: 16,
      overflow: 'hidden',
    },
    heroSection: {
      height: 240,
      width: '100%',
      justifyContent: 'flex-end',
      position: 'relative',
    },
    heroOverlay: {
      padding: theme.spacing.lg,
      zIndex: 2,
    },
    difficultyBadge: {
      alignSelf: 'flex-start',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: theme.radius.full,
      marginBottom: 12,
    },
    difficultyText: {
      color: '#FFF',
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      fontSize: 10,
    },
    heroMetrics: {
      flexDirection: 'row',
      gap: 8,
    },
    heroMetricBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: hexAlpha('#000', 0.6),
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: theme.radius.full,
    },
    heroMetricText: {
      color: '#FFF',
      fontWeight: '600',
    },
    contentWrap: {
      padding: theme.spacing.lg,
      paddingTop: 0,
      backgroundColor: theme.colors.surface,
    },
    titleSection: {
      marginBottom: theme.spacing.lg,
    },
    workoutTitle: {
      marginBottom: 4,
    },
    workoutDesc: {
      lineHeight: 20,
    },
    aiInsightPanel: {
      backgroundColor: hexAlpha(theme.colors.primary, 0.08),
      borderRadius: theme.radius.xl,
      padding: theme.spacing.md,
      marginBottom: theme.spacing.xl,
      borderWidth: 1,
      borderColor: hexAlpha(theme.colors.primary, 0.2),
      shadowColor: theme.colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      elevation: 3,
    },
    aiInsightHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginBottom: theme.spacing.sm,
      paddingBottom: theme.spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: hexAlpha(theme.colors.primary, 0.1),
    },
    aiInsightTitle: {
      color: theme.colors.primary,
      fontWeight: '700',
    },
    aiReasonsList: {
      gap: 8,
    },
    aiReasonRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 8,
    },
    reasonIcon: {
      marginTop: 2,
    },
    reasonText: {
      flex: 1,
      color: theme.colors.text.primary,
      lineHeight: 18,
    },

    highlightsSection: {
      marginBottom: theme.spacing.xl,
    },
    chipRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    chip: {
      backgroundColor: hexAlpha(theme.colors.primary, 0.1),
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: theme.radius.full,
      borderWidth: 1,
      borderColor: hexAlpha(theme.colors.primary, 0.2),
    },
    chipText: {
      color: theme.colors.primary,
      fontWeight: '600',
    },
    chipSecondary: {
      backgroundColor: theme.colors.background,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: theme.radius.full,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    chipTextSecondary: {
      color: theme.colors.text.secondary,
      fontWeight: '600',
    },
    actionsSection: {
      gap: 12,
    },
    primaryBtn: {
      borderRadius: theme.radius.full,
      height: 56,
    },
    secondaryBtn: {
      borderRadius: theme.radius.full,
      height: 56,
      borderWidth: 2,
    },
  });
}
