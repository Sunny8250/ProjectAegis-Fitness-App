import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { useSharedValue, withTiming, useAnimatedStyle, withDelay, Easing } from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '@/theme/useTheme';
import type { AegisTheme } from '@/theme/themes';
import { Text } from '@/components/common/Text';
import { ProgressRing } from '@/components/common/ProgressRing';
import { Card } from '@/components/common/Card';
import { MOCK_ANALYTICS_DATA } from '../data/mockAnalyticsData';

interface Props {
  hero: typeof MOCK_ANALYTICS_DATA.hero;
  isVisible?: boolean;
}

export const AnalyticsHeroDashboard = ({ hero, isVisible = true }: Props) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const fitnessScoreProgress = hero.fitnessScore / 100;
  const xpProgress = hero.xp / hero.nextLevelXp;

  const [shouldAnimateRing, setShouldAnimateRing] = useState(false);
  const animatedWidth = useSharedValue(0);

  useEffect(() => {
    if (isVisible) {
      const timeout = setTimeout(() => {
        setShouldAnimateRing(true);
        animatedWidth.value = withTiming(xpProgress * 100, {
          duration: 1200,
          easing: Easing.out(Easing.ease),
        });
      }, 500);
      return () => clearTimeout(timeout);
    } else {
      setShouldAnimateRing(false);
      animatedWidth.value = 0;
    }
  }, [xpProgress, isVisible, animatedWidth]);

  const animatedProgressStyle = useAnimatedStyle(() => {
    return {
      width: `${animatedWidth.value}%`,
    };
  });

  return (
    <View style={styles.container}>
      {/* Main Score Card */}
      <Card style={styles.scoreCard}>
        <View style={styles.scoreHeader}>
          <Text variant="heading3" style={styles.scoreTitle}>Fitness Score</Text>
          <View style={styles.streakBadge}>
            <MaterialCommunityIcons name="fire" size={16} color={theme.colors.error} />
            <Text variant="caption" style={styles.streakText}>{hero.workoutStreak} Wk Streak</Text>
          </View>
        </View>

        <View style={styles.ringContainer}>
          <ProgressRing 
            progress={shouldAnimateRing ? fitnessScoreProgress : 0} 
            size={160} 
            strokeWidth={14}
            gradientColors={[theme.colors.primary, theme.colors.success]}
            animationDurationMs={1200}
          >
            <View style={styles.ringInner}>
              <Text variant="heading1" style={styles.scoreValue}>{hero.fitnessScore}</Text>
              <Text variant="caption" style={styles.scoreLabel}>{hero.scoreLabel}</Text>
            </View>
          </ProgressRing>
        </View>
      </Card>

      {/* Stats Row */}
      <View style={styles.statsRow}>
        {/* Level Card */}
        <Card style={styles.statCard}>
          <Text variant="caption" color="secondary">Current Level</Text>
          <Text variant="heading2" style={styles.statValue}>{hero.level}</Text>
          <View style={styles.progressBarBg}>
            <Animated.View style={[styles.progressBarFill, animatedProgressStyle, { backgroundColor: theme.colors.primary }]} />
          </View>
          <Text variant="small" color="secondary" style={styles.statSub}>{hero.xp.toLocaleString()} / {hero.nextLevelXp.toLocaleString()} XP</Text>
        </Card>

        {/* Goals Card */}
        <Card style={styles.statCard}>
          <Text variant="caption" color="secondary">Weekly Goal</Text>
          <Text variant="heading2" style={styles.statValue}>{hero.weeklyGoalProgress}<Text variant="heading3" color="secondary">/{hero.weeklyGoalTarget}</Text></Text>
          <Text variant="small" color="secondary" style={styles.statSub}>Workouts</Text>
        </Card>
      </View>
    </View>
  );
};

function createStyles(theme: AegisTheme) {
  return StyleSheet.create({
    container: {
      gap: theme.spacing.md,
    },
    scoreCard: {
      padding: theme.spacing.lg,
      alignItems: 'center',
    },
    scoreHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      alignItems: 'center',
      marginBottom: theme.spacing.xl,
    },
    scoreTitle: {
      color: theme.colors.text.primary,
    },
    streakBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.error + '15',
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: theme.radius.full,
      gap: 4,
    },
    streakText: {
      color: theme.colors.error,
      fontWeight: 'bold',
    },
    ringContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: theme.spacing.md,
    },
    ringInner: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    scoreValue: {
      fontSize: 48,
      fontWeight: '800',
      color: theme.colors.text.primary,
    },
    scoreLabel: {
      color: theme.colors.success,
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: 1,
      marginTop: 4,
    },
    statsRow: {
      flexDirection: 'row',
      gap: theme.spacing.md,
    },
    statCard: {
      flex: 1,
      padding: theme.spacing.md,
    },
    statValue: {
      color: theme.colors.text.primary,
      marginVertical: theme.spacing.sm,
    },
    progressBarBg: {
      height: 6,
      backgroundColor: theme.colors.border,
      borderRadius: theme.radius.full,
      overflow: 'hidden',
      marginBottom: theme.spacing.xs,
    },
    progressBarFill: {
      height: '100%',
      borderRadius: theme.radius.full,
    },
    statSub: {
      marginTop: 2,
    }
  });
}
