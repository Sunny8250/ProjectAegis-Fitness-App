import React, { useRef, useCallback, useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import { Screen } from "@/components/common/Screen";
import { useTheme } from "@/theme/useTheme";

import { GreetingHeader } from "@/features/dashboard/components/GreetingHeader";
import { HeroProgressSection } from "@/features/dashboard/components/HeroProgressSection";
import { QuickActionsSection } from "@/features/dashboard/components/QuickActionsSection";
import { TodaysWorkoutSection } from "@/features/dashboard/components/TodaysWorkoutSection";
import { HealthMetricsSection } from "@/features/dashboard/components/HealthMetricsSection";
import { WeeklyActivitySection } from "@/features/dashboard/components/WeeklyActivitySection";
import { WorkoutCategoriesSection } from "@/features/dashboard/components/WorkoutCategoriesSection";
import { AchievementsSection } from "@/features/dashboard/components/AchievementsSection";

export default function HomeDashboard() {
  const { theme } = useTheme();
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const heroTriggerRef = useRef<(() => void) | null>(null);
  const weeklyTriggerRef = useRef<(() => void) | null>(null);
  const [weeklyY, setWeeklyY] = useState(700);

  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    // Trigger animation when the card is about to enter or is in the viewport
    if (offsetY + 500 > weeklyY && weeklyTriggerRef.current) {
      weeklyTriggerRef.current();
    }
  }, [weeklyY]);

  return (
    <Screen edges={["top"]} style={styles.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: theme.spacing.xxl + 80 }]}
      >
        {/* 1. Greeting */}
        <GreetingHeader isLoading={isLoading} />

        {/* 2. Today's Progress (Hero Section) */}
        <HeroProgressSection triggerRef={heroTriggerRef} isLoading={isLoading} />

        {/* 3. Today's Workout */}
        <TodaysWorkoutSection isLoading={isLoading} />

        {/* 4. Quick Actions */}
        <QuickActionsSection isLoading={isLoading} />

        {/* 5. Health Metrics */}
        <HealthMetricsSection isLoading={isLoading} />

        {/* 6. Weekly Activity (Already Premium) */}
        <View style={styles.sectionPadding} onLayout={(e) => setWeeklyY(e.nativeEvent.layout.y)}>
          <WeeklyActivitySection triggerRef={weeklyTriggerRef} isLoading={isLoading} />
        </View>

        {/* 7. Workout Categories */}
        <WorkoutCategoriesSection isLoading={isLoading} />

        {/* 8. Achievements */}
        <AchievementsSection isLoading={isLoading} />

      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  sectionPadding: {
    paddingHorizontal: 16, // Matches the theme.spacing.md typically used
  }
});
