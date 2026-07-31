import React, { useState, useCallback } from 'react';
import { StyleSheet, ScrollView, View, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from 'expo-router';
import { useTheme } from '@/theme/useTheme';
import type { AegisTheme } from '@/theme/themes';
import { Screen } from '@/components/common/Screen';
import { Text } from '@/components/common/Text';

import { MOCK_ANALYTICS_DATA } from '../data/mockAnalyticsData';
import { AnalyticsHeroDashboard } from '../components/AnalyticsHeroDashboard';
import { AnalyticsAiReport } from '../components/AnalyticsAiReport';
import { AnalyticsProgressCharts } from '../components/AnalyticsProgressCharts';
import { AnalyticsMuscleHeatMap } from '../components/AnalyticsMuscleHeatMap';

export const AnalyticsScreen = () => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = createStyles(theme, insets);
  
  const [isFocused, setIsFocused] = useState(false);
  const [chartsVisible, setChartsVisible] = useState(false);
  const data = MOCK_ANALYTICS_DATA;

  useFocusEffect(
    useCallback(() => {
      setIsFocused(true);
      return () => {
        setIsFocused(false);
        setChartsVisible(false);
      };
    }, [])
  );

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = event.nativeEvent.contentOffset.y;
    // When the user scrolls down approximately 200px, we trigger the chart animation
    if (y > 200 && !chartsVisible && isFocused) {
      setChartsVisible(true);
    }
  };

  return (
    <Screen style={styles.container}>
      <View style={styles.header}>
        <Text variant="heading1" style={styles.title}>Progress</Text>
      </View>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {/* Hero resets and animates whenever the tab is focused */}
        <AnalyticsHeroDashboard hero={data.hero} isVisible={isFocused} />
        
        <AnalyticsAiReport insights={data.aiInsights} />
        
        {/* Charts reset on blur, and animate when they scroll into view while focused */}
        <AnalyticsProgressCharts charts={data.progressCharts} isVisible={chartsVisible} />
        
        <AnalyticsMuscleHeatMap heatMap={data.muscleHeatMap} />
        
        {/* Extra padding at bottom for tab bar */}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </Screen>
  );
};

function createStyles(theme: AegisTheme, insets: { top: number }) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      paddingHorizontal: theme.spacing.lg,
      paddingTop: Math.max(insets.top + 10, 20),
      paddingBottom: theme.spacing.md,
      backgroundColor: theme.colors.background,
      zIndex: 10,
    },
    title: {
      color: theme.colors.text.primary,
    },
    scrollContent: {
      padding: theme.spacing.lg,
      gap: theme.spacing.xl,
    },
    bottomPadding: {
      height: 100, // accommodate bottom tab bar
    }
  });
}
