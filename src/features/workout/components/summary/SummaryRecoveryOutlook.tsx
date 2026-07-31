import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@/theme/useTheme';
import type { AegisTheme } from '@/theme/themes';
import { Text } from '@/components/common/Text';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { WorkoutSummaryData } from '@/features/workout/data/mockSummaryData';

interface SummaryRecoveryOutlookProps {
  recovery: WorkoutSummaryData['recoveryOutlook'];
}

export const SummaryRecoveryOutlook = ({ recovery }: SummaryRecoveryOutlookProps) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Text variant="heading3" style={styles.title}>Recovery Outlook</Text>
      
      <View style={styles.card}>
        <View style={styles.row}>
          <View style={styles.iconBox}>
            <MaterialCommunityIcons name="battery-charging-60" size={24} color={theme.colors.primary} />
          </View>
          <View style={styles.textContainer}>
            <Text variant="caption" color="secondary" style={styles.label}>ESTIMATED RECOVERY</Text>
            <Text variant="body">{recovery.estimatedHours} Hours</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <View style={styles.iconBox}>
            <MaterialCommunityIcons name="calendar-arrow-right" size={24} color={theme.colors.primary} />
          </View>
          <View style={styles.textContainer}>
            <Text variant="caption" color="secondary" style={styles.label}>NEXT RECOMMENDATION</Text>
            <Text variant="body">{recovery.nextRecommendation}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <View style={styles.iconBox}>
            <MaterialCommunityIcons name="water-outline" size={24} color={theme.colors.primary} />
          </View>
          <View style={styles.textContainer}>
            <Text variant="caption" color="secondary" style={styles.label}>HYDRATION</Text>
            <Text variant="body">{recovery.hydrationTip}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <View style={styles.iconBox}>
            <MaterialCommunityIcons name="sleep" size={24} color={theme.colors.primary} />
          </View>
          <View style={styles.textContainer}>
            <Text variant="caption" color="secondary" style={styles.label}>SLEEP</Text>
            <Text variant="body">{recovery.sleepTip}</Text>
          </View>
        </View>
      </View>
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
    card: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.radius.lg,
      borderWidth: 1,
      borderColor: theme.colors.border,
      paddingVertical: theme.spacing.sm,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.md,
      gap: theme.spacing.md,
    },
    iconBox: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: `${theme.colors.primary}15`,
      justifyContent: 'center',
      alignItems: 'center',
    },
    textContainer: {
      flex: 1,
      gap: 2,
    },
    label: {
      fontSize: 10,
      fontWeight: '600',
      letterSpacing: 0.5,
    },
    divider: {
      height: 1,
      backgroundColor: theme.colors.border,
      marginLeft: theme.spacing.lg + 40 + theme.spacing.md,
    },
  });
}
