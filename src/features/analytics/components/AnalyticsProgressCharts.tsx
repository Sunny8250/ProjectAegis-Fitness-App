import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { LineChart, BarChart } from 'react-native-gifted-charts';
import { useTheme } from '@/theme/useTheme';
import type { AegisTheme } from '@/theme/themes';
import { Text } from '@/components/common/Text';
import { Card } from '@/components/common/Card';
import { MOCK_ANALYTICS_DATA } from '../data/mockAnalyticsData';

interface Props {
  charts: typeof MOCK_ANALYTICS_DATA.progressCharts;
  isVisible?: boolean;
}

type ChartType = 'volume' | 'calories' | 'consistency';

export const AnalyticsProgressCharts = ({ charts, isVisible = true }: Props) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [activeTab, setActiveTab] = useState<ChartType>('volume');

  const getChartData = () => {
    return charts[activeTab].map(item => ({
      value: item.value,
      label: item.label,
      labelTextStyle: { color: theme.colors.text.tertiary, fontSize: 10 },
      frontColor: theme.colors.primary,
    }));
  };

  const data = getChartData();

  return (
    <Card style={styles.container}>
      <Text variant="heading3" style={styles.title}>Progress Overview</Text>
      
      {/* Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsContainer}>
        {(['volume', 'calories', 'consistency'] as ChartType[]).map(tab => {
          const isActive = activeTab === tab;
          return (
            <Pressable 
              key={tab} 
              onPress={() => setActiveTab(tab)}
              style={[styles.tab, isActive && styles.tabActive]}
            >
              <Text variant="small" style={[styles.tabText, isActive && styles.tabTextActive]}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* Chart */}
      <View style={styles.chartWrapper}>
        {!isVisible ? null : activeTab === 'volume' || activeTab === 'calories' ? (
          <LineChart
            data={data}
            color={theme.colors.primary}
            thickness={3}
            dataPointsColor={theme.colors.secondary}
            hideYAxisText
            hideRules
            xAxisColor={theme.colors.border}
            yAxisColor="transparent"
            height={160}
            spacing={40}
            initialSpacing={10}
            curved
            isAnimated
            animationDuration={800}
          />
        ) : (
          <BarChart
            data={data}
            barWidth={22}
            frontColor={theme.colors.primary}
            hideYAxisText
            hideRules
            xAxisColor={theme.colors.border}
            yAxisColor="transparent"
            height={160}
            spacing={40}
            initialSpacing={10}
            isAnimated
            animationDuration={800}
            barBorderRadius={4}
          />
        )}
      </View>
    </Card>
  );
};

function createStyles(theme: AegisTheme) {
  return StyleSheet.create({
    container: {
      padding: theme.spacing.lg,
    },
    title: {
      color: theme.colors.text.primary,
      marginBottom: theme.spacing.md,
    },
    tabsContainer: {
      flexDirection: 'row',
      marginBottom: theme.spacing.lg,
    },
    tab: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: theme.radius.full,
      marginRight: theme.spacing.sm,
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    tabActive: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
    tabText: {
      color: theme.colors.text.secondary,
      fontWeight: '600',
    },
    tabTextActive: {
      color: '#FFFFFF',
    },
    chartWrapper: {
      alignItems: 'center',
      marginTop: theme.spacing.sm,
      minHeight: 240, // Fixed height to prevent layout jumps when mounting
      width: '100%',
    }
  });
}
