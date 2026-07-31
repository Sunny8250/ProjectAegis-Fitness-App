import React, { useRef } from "react";
import { View, StyleSheet, Animated, StatusBar, Platform } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTheme } from "@/theme/useTheme";
import type { AegisTheme } from "@/theme/themes";
import { Screen } from "@/components/common/Screen";

import { MOCK_WORKOUT_DETAIL } from "@/features/workout/data/mockWorkoutDetail";
import { WorkoutHero } from "@/features/workout/components/WorkoutHero";
import { WorkoutAiRec } from "@/features/workout/components/WorkoutAiRec";
import { WorkoutOverview } from "@/features/workout/components/WorkoutOverview";
import { WorkoutMuscles } from "@/features/workout/components/WorkoutMuscles";
import { WorkoutEquipment } from "@/features/workout/components/WorkoutEquipment";
import { WorkoutBenefits } from "@/features/workout/components/WorkoutBenefits";
import { WorkoutExerciseList } from "@/features/workout/components/WorkoutExerciseList";
import { WorkoutAiCoach } from "@/features/workout/components/WorkoutAiCoach";
import { WorkoutCommunity } from "@/features/workout/components/WorkoutCommunity";
import { WorkoutStats } from "@/features/workout/components/WorkoutStats";
import { WorkoutActionBar } from "@/features/workout/components/WorkoutActionBar";

export default function WorkoutDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const scrollOffsetY = useRef(new Animated.Value(0)).current;

  // In a real app, fetch workout by ID. Here we use mock data.
  const workout = MOCK_WORKOUT_DETAIL;

  const handleBack = () => router.back();
  const handleBookmark = () => console.log("Bookmarked");
  const handleShare = () => console.log("Shared");
  const handleStart = () => console.log("Start Workout");
  const handlePreview = () => console.log("Preview Exercises");

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      <Animated.ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
          { useNativeDriver: true }
        )}
      >
        <WorkoutHero 
          workout={workout} 
          scrollOffsetY={scrollOffsetY} 
          onBack={handleBack}
          onBookmark={handleBookmark}
          onShare={handleShare}
        />

        <View style={styles.body}>
          <WorkoutAiRec recommendation={workout.aiRecommendation} />
          <WorkoutOverview workout={workout} />
          <WorkoutMuscles muscles={workout.aiRecommendation.targetMuscles} />
          <WorkoutEquipment equipment={workout.aiRecommendation.equipment} />
          <WorkoutBenefits benefits={workout.aiRecommendation.benefits} />
          <WorkoutExerciseList exercises={workout.exercises} />
          <WorkoutAiCoach tip={workout.aiRecommendation.coachingTip} />
          <WorkoutCommunity workout={workout} />
          <WorkoutStats workout={workout} />
        </View>
      </Animated.ScrollView>

      <WorkoutActionBar onStart={handleStart} onPreview={handlePreview} />
    </View>
  );
}

function createStyles(theme: AegisTheme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      paddingBottom: 0,
    },
    body: {
      padding: theme.spacing.lg,
      backgroundColor: theme.colors.background,
      // Pull body up slightly to overlap hero gradient nicely if needed
      marginTop: -20,
      borderTopLeftRadius: theme.radius.xxl,
      borderTopRightRadius: theme.radius.xxl,
    },
  });
}
