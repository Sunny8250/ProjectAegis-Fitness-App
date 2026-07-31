import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@/theme/useTheme';
import type { AegisTheme } from '@/theme/themes';
import { Text } from '@/components/common/Text';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { SummaryAchievement } from '@/features/workout/data/mockSummaryData';

interface SummaryAchievementsProps {
  achievements: SummaryAchievement[];
}

export const SummaryAchievements = ({ achievements }: SummaryAchievementsProps) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  if (!achievements.length) return null;

  return (
    <View style={styles.container}>
      <Text variant="heading3" style={styles.title}>Achievements Unlocked</Text>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {achievements.map((achievement) => (
          <View key={achievement.id} style={styles.badgeCard}>
            <View style={[styles.iconCircle, { backgroundColor: `${achievement.color}15`, borderColor: `${achievement.color}50` }]}>
              {/* @ts-ignore dynamic icon name */}
              <MaterialCommunityIcons name={achievement.icon} size={32} color={achievement.color} />
            </View>
            <Text variant="caption" style={styles.badgeTitle} numberOfLines={2}>
              {achievement.title}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

function createStyles(theme: AegisTheme) {
  return StyleSheet.create({
    container: {
      marginBottom: theme.spacing.xl,
    },
    title: {
      marginBottom: theme.spacing.md,
      marginLeft: theme.spacing.xs,
    },
    scrollContent: {
      gap: theme.spacing.md,
      paddingRight: theme.spacing.xl, // Allow scrolling past the edge
    },
    badgeCard: {
      width: 100,
      alignItems: 'center',
      gap: theme.spacing.sm,
      backgroundColor: theme.colors.surface,
      padding: theme.spacing.md,
      borderRadius: theme.radius.lg,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    iconCircle: {
      width: 60,
      height: 60,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
    },
    badgeTitle: {
      textAlign: 'center',
      fontWeight: '600',
    },
  });
}
