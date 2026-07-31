import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '@/theme/useTheme';
import type { AegisTheme } from '@/theme/themes';
import { Text } from '@/components/common/Text';
import { Card } from '@/components/common/Card';

interface Props {
  insights: string[];
}

export const AnalyticsAiReport = ({ insights }: Props) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  if (!insights || insights.length === 0) return null;

  return (
    <Card style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconBg}>
          <MaterialCommunityIcons name="robot-outline" size={20} color={theme.colors.primary} />
        </View>
        <Text variant="heading3" style={styles.title}>Aegis AI Progress Report</Text>
      </View>
      
      <View style={styles.list}>
        {insights.slice(0, 5).map((insight, index) => (
          <View key={index} style={styles.listItem}>
            <MaterialCommunityIcons name="check-circle-outline" size={18} color={theme.colors.primary} style={styles.listIcon} />
            <Text variant="body" style={styles.listText}>{insight}</Text>
          </View>
        ))}
      </View>
    </Card>
  );
};

function createStyles(theme: AegisTheme) {
  return StyleSheet.create({
    container: {
      padding: theme.spacing.lg,
      backgroundColor: theme.colors.primary + '10', // subtle tint
      borderWidth: 1,
      borderColor: theme.colors.primary + '30',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: theme.spacing.md,
      gap: theme.spacing.sm,
    },
    iconBg: {
      backgroundColor: theme.colors.primary + '20',
      padding: 6,
      borderRadius: theme.radius.md,
    },
    title: {
      color: theme.colors.text.primary,
    },
    list: {
      gap: theme.spacing.sm,
    },
    listItem: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: theme.spacing.sm,
    },
    listIcon: {
      marginTop: 2,
    },
    listText: {
      flex: 1,
      color: theme.colors.text.secondary,
      lineHeight: 22,
    }
  });
}
