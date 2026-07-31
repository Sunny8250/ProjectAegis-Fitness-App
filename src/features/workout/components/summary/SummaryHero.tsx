import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useTheme } from '@/theme/useTheme';
import type { AegisTheme } from '@/theme/themes';
import { Text } from '@/components/common/Text';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withRepeat, 
  withSequence, 
  withDelay, 
  Easing,
  interpolate
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Simple Reanimated Confetti Particle
const ConfettiParticle = ({ index }: { index: number }) => {
  const progress = useSharedValue(0);
  const colors = ['#FFD700', '#FF4500', '#4CAF50', '#00BCD4', '#E91E63'];
  const color = colors[index % colors.length];
  
  const startX = (SCREEN_WIDTH / 10) * (index % 10) + Math.random() * 20;
  const endX = startX + (Math.random() * 100 - 50);
  
  useEffect(() => {
    progress.value = withDelay(
      Math.random() * 500,
      withTiming(1, { duration: 2500 + Math.random() * 1000, easing: Easing.out(Easing.cubic) })
    );
  }, [progress]);

  const style = useAnimatedStyle(() => {
    return {
      opacity: interpolate(progress.value, [0, 0.8, 1], [1, 1, 0]),
      transform: [
        { translateX: interpolate(progress.value, [0, 1], [startX, endX]) },
        { translateY: interpolate(progress.value, [0, 1], [-20, 300]) },
        { rotate: `${progress.value * 360 * (index % 2 === 0 ? 1 : -1)}deg` },
        { scale: interpolate(progress.value, [0, 0.1, 1], [0, 1, 0.5]) }
      ]
    };
  });

  return <Animated.View style={[styles.particle, { backgroundColor: color }, style]} />;
};

interface SummaryHeroProps {
  completedAt: Date;
}

export const SummaryHero = ({ completedAt }: SummaryHeroProps) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  // Generate 40 particles
  const particles = Array.from({ length: 40 }).map((_, i) => i);

  return (
    <View style={styles.container}>
      {/* Confetti Layer */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        {particles.map((i) => (
          <ConfettiParticle key={i} index={i} />
        ))}
      </View>

      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name="trophy-award" size={80} color={theme.colors.primary} />
      </View>
      
      <Text variant="heading1" style={styles.title}>Workout Complete!</Text>
      
      <Text variant="body" color="secondary" style={styles.subtitle}>
        Excellent work! You completed today's workout.
      </Text>
      
      <View style={styles.timeBadge}>
        <MaterialCommunityIcons name="clock-check-outline" size={16} color={theme.colors.text.secondary} />
        <Text variant="caption" color="secondary" style={styles.timeText}>
          Completed at {completedAt.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  particle: {
    position: 'absolute',
    width: 8,
    height: 16,
    borderRadius: 4,
    top: 0,
    left: 0,
  }
});

function createStyles(theme: AegisTheme) {
  return StyleSheet.create({
    container: {
      alignItems: 'center',
      paddingVertical: theme.spacing.xl,
    },
    iconContainer: {
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: `${theme.colors.primary}15`,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: theme.spacing.lg,
      borderWidth: 2,
      borderColor: `${theme.colors.primary}30`,
    },
    title: {
      textAlign: 'center',
      marginBottom: theme.spacing.sm,
    },
    subtitle: {
      textAlign: 'center',
      marginBottom: theme.spacing.lg,
      paddingHorizontal: theme.spacing.lg,
    },
    timeBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.xs,
      backgroundColor: theme.colors.surface,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      borderRadius: theme.radius.full,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    timeText: {
      fontWeight: '600',
    },
  });
}
