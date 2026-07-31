import React from "react";
import { View, StyleSheet, Pressable, Animated } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/theme/useTheme";
import type { AegisTheme } from "@/theme/themes";
import { Text } from "@/components/common/Text";
import { MOCK_WORKOUT_DETAIL } from "../data/mockWorkoutDetail";

interface WorkoutHeroProps {
  workout: typeof MOCK_WORKOUT_DETAIL;
  scrollOffsetY: Animated.Value;
  onBack: () => void;
  onBookmark: () => void;
  onShare: () => void;
}

export const WorkoutHero = ({ workout, scrollOffsetY, onBack, onBookmark, onShare }: WorkoutHeroProps) => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = createStyles(theme, insets);

  const heroHeight = 400;

  const imageScale = scrollOffsetY.interpolate({
    inputRange: [-heroHeight, 0, heroHeight],
    outputRange: [2, 1, 1],
    extrapolate: 'clamp'
  });

  const imageOpacity = scrollOffsetY.interpolate({
    inputRange: [0, heroHeight / 2],
    outputRange: [1, 0.4],
    extrapolate: 'clamp'
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.imageContainer, { transform: [{ scale: imageScale }], opacity: imageOpacity }]}>
        <Image source={{ uri: workout.imageUri }} style={StyleSheet.absoluteFill} contentFit="cover" />
      </Animated.View>
      <LinearGradient 
        colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.4)', theme.colors.background]} 
        locations={[0, 0.4, 1]}
        style={StyleSheet.absoluteFill} 
      />

      {/* Top Navigation */}
      <View style={styles.topNav}>
        <Pressable onPress={onBack} style={styles.navButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#FFF" />
        </Pressable>
        <View style={styles.navRight}>
          <Pressable onPress={onBookmark} style={styles.navButton}>
            <MaterialCommunityIcons name="bookmark-outline" size={24} color="#FFF" />
          </Pressable>
          <Pressable onPress={onShare} style={styles.navButton}>
            <MaterialCommunityIcons name="share-variant-outline" size={24} color="#FFF" />
          </Pressable>
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.badges}>
          <View style={styles.difficultyBadge}>
            <Text variant="small" style={styles.difficultyText}>{workout.difficulty}</Text>
          </View>
          {workout.isTrending && (
            <View style={[styles.difficultyBadge, { backgroundColor: theme.colors.error, marginLeft: 8 }]}>
              <MaterialCommunityIcons name="fire" size={12} color="#FFF" />
              <Text variant="small" style={styles.difficultyText}>Trending</Text>
            </View>
          )}
        </View>

        <Text variant="heading1" style={styles.title}>{workout.title}</Text>
        <Text variant="body" style={styles.description}>{workout.description}</Text>

        <View style={styles.metrics}>
          <View style={styles.metricItem}>
            <MaterialCommunityIcons name="timer-outline" size={16} color="#CCC" />
            <Text variant="caption" style={styles.metricText}>{workout.duration}</Text>
          </View>
          <View style={styles.metricItem}>
            <MaterialCommunityIcons name="fire" size={16} color="#CCC" />
            <Text variant="caption" style={styles.metricText}>{workout.calories} kcal</Text>
          </View>
          <View style={styles.metricItem}>
            <MaterialCommunityIcons name="dumbbell" size={16} color="#CCC" />
            <Text variant="caption" style={styles.metricText}>{workout.totalExercises} Ex.</Text>
          </View>
          <View style={styles.metricItem}>
            <MaterialCommunityIcons name="star" size={16} color="#FBBF24" />
            <Text variant="caption" style={styles.metricText}>{workout.rating}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

function createStyles(theme: AegisTheme, insets: { top: number }) {
  return StyleSheet.create({
    container: {
      height: 400,
      width: '100%',
      justifyContent: 'space-between',
    },
    imageContainer: {
      ...StyleSheet.absoluteFill as any,
    },
    topNav: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: theme.spacing.md,
      paddingTop: Math.max(insets.top + 10, 20), // Use safe area
      zIndex: 10,
    },
    navButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 8,
    },
    navRight: {
      flexDirection: 'row',
    },
    content: {
      padding: theme.spacing.lg,
      paddingBottom: theme.spacing.xl,
    },
    badges: {
      flexDirection: 'row',
      marginBottom: theme.spacing.sm,
      alignItems: 'center',
    },
    difficultyBadge: {
      backgroundColor: theme.colors.primary,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: theme.radius.full,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    difficultyText: {
      color: '#FFF',
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      fontSize: 10,
    },
    title: {
      color: '#FFF',
      marginBottom: theme.spacing.xs,
    },
    description: {
      color: '#CCC',
      lineHeight: 20,
      marginBottom: theme.spacing.md,
    },
    metrics: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: theme.spacing.md,
    },
    metricItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    metricText: {
      color: '#FFF',
      fontWeight: '600',
    },
  });
}
