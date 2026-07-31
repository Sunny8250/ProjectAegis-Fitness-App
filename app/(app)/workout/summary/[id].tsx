import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTheme } from '@/theme/useTheme';
import type { AegisTheme } from '@/theme/themes';
import { useSafeAreaInsets, type EdgeInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { mockSummaryData } from '@/features/workout/data/mockSummaryData';
import { SummaryHero } from '@/features/workout/components/summary/SummaryHero';
import { SummaryStatsGrid } from '@/features/workout/components/summary/SummaryStatsGrid';
import { SummaryAiHighlights } from '@/features/workout/components/summary/SummaryAiHighlights';
import { SummaryAchievements } from '@/features/workout/components/summary/SummaryAchievements';
import { SummaryXpProgress } from '@/features/workout/components/summary/SummaryXpProgress';
import { SummaryRecoveryOutlook } from '@/features/workout/components/summary/SummaryRecoveryOutlook';
import { SummaryProgressComparison } from '@/features/workout/components/summary/SummaryProgressComparison';
import { SummaryActions } from '@/features/workout/components/summary/SummaryActions';

export default function WorkoutSummaryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = createStyles(theme, insets);

  const data = mockSummaryData;

  const AnimatedItem = ({ children, index }: { children: React.ReactNode, index: number }) => (
    <Animated.View 
      entering={FadeInDown.duration(600).springify().damping(15).delay(100 * index)}
    >
      {children}
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle={theme.isDark ? 'light-content' : 'dark-content'} />
      <Animated.ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <AnimatedItem index={0}>
          <SummaryHero completedAt={data.completedAt} />
        </AnimatedItem>

        <AnimatedItem index={1}>
          <SummaryStatsGrid metrics={data.metrics} />
        </AnimatedItem>

        <AnimatedItem index={2}>
          <SummaryAchievements achievements={data.achievements} />
        </AnimatedItem>

        <AnimatedItem index={3}>
          <SummaryXpProgress xp={data.xp} />
        </AnimatedItem>

        <AnimatedItem index={4}>
          <SummaryAiHighlights highlights={data.aiHighlights} />
        </AnimatedItem>

        <AnimatedItem index={5}>
          <SummaryRecoveryOutlook recovery={data.recoveryOutlook} />
        </AnimatedItem>

        <AnimatedItem index={6}>
          <SummaryProgressComparison comparisons={data.comparisons} />
        </AnimatedItem>

        <AnimatedItem index={7}>
          <SummaryActions />
        </AnimatedItem>

      </Animated.ScrollView>
    </View>
  );
}

function createStyles(theme: AegisTheme, insets: EdgeInsets) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      paddingTop: insets.top + theme.spacing.xl,
      paddingBottom: insets.bottom + 120, // Space for bottom actions
      paddingHorizontal: theme.spacing.md,
      gap: theme.spacing.xl,
    },
  });
}
