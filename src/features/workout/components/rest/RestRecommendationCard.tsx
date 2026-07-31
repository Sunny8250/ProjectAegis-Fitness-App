import React, { memo, useMemo } from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { Text } from '@/components/common/Text';
import type { AegisTheme } from '@/theme/themes';
import { useTheme } from '@/theme/useTheme';
import { hexAlpha } from '@/utils/colors';

const GRADIENT_ALPHA = { start: 0.15, end: 0.05 } as const;

interface RestRecommendationCardProps {
  currentRestSeconds: number;
  suggestedRestSeconds: number;
  reason: string;
  onKeepCurrent: () => void;
  onApplySuggested: () => void;
  onSkip: () => void;
}

function RestRecommendationCardComponent({
  currentRestSeconds,
  suggestedRestSeconds,
  reason,
  onKeepCurrent,
  onApplySuggested,
  onSkip,
}: RestRecommendationCardProps) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.container}>
      <LinearGradient
        colors={[
          hexAlpha(theme.colors.primary, GRADIENT_ALPHA.start),
          hexAlpha(theme.colors.primary, GRADIENT_ALPHA.end),
        ]}
        end={{ x: 1, y: 1 }}
        start={{ x: 0, y: 0 }}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.headerRow}>
        <MaterialCommunityIcons name="robot-outline" color={theme.colors.primary} size={20} />
        <Text style={styles.eyebrow} variant="label">
          Aegis Recovery Coach
        </Text>
      </View>

      <View style={styles.metricsRow}>
        <View style={styles.metricBlock}>
          <Text color="text.secondary" variant="caption">Current Rest</Text>
          <Text style={styles.metricValue}>{currentRestSeconds}s</Text>
        </View>
        <MaterialCommunityIcons name="arrow-right" color={theme.colors.text.tertiary} size={16} />
        <View style={styles.metricBlock}>
          <Text color="text.secondary" variant="caption">AI Suggested</Text>
          <Text style={[styles.metricValue, { color: theme.colors.primary }]}>{suggestedRestSeconds}s</Text>
        </View>
      </View>

      <View style={styles.reasonBlock}>
        <Text style={styles.reasonText} variant="small">
          {reason}
        </Text>
      </View>

      <View style={styles.actionsRow}>
        <Pressable style={styles.actionButtonSecondary} onPress={onKeepCurrent}>
          <Text style={styles.actionTextSecondary} variant="button">Keep Current</Text>
        </Pressable>
        {suggestedRestSeconds === 0 ? (
          <Pressable style={styles.actionButtonPrimary} onPress={onSkip}>
            <Text style={styles.actionTextPrimary} variant="button">Skip Rest</Text>
          </Pressable>
        ) : (
          <Pressable style={styles.actionButtonPrimary} onPress={onApplySuggested}>
            <Text style={styles.actionTextPrimary} variant="button">Apply Rest</Text>
          </Pressable>
        )}
      </View>
    </Animated.View>
  );
}

function createStyles(theme: AegisTheme) {
  return StyleSheet.create({
    container: {
      backgroundColor: hexAlpha(theme.colors.surface, 0.95),
      borderColor: hexAlpha(theme.colors.primary, 0.2),
      borderRadius: theme.radius.xl,
      borderWidth: StyleSheet.hairlineWidth,
      padding: theme.spacing.lg,
      gap: theme.spacing.md,
      overflow: 'hidden',
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.xs,
    },
    eyebrow: {
      color: theme.colors.primary,
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    metricsRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.lg,
      backgroundColor: hexAlpha(theme.colors.black, 0.2),
      padding: theme.spacing.md,
      borderRadius: theme.radius.lg,
    },
    metricBlock: {
      gap: 2,
    },
    metricValue: {
      color: theme.colors.text.primary,
      fontWeight: '700',
      fontSize: 18,
    },
    reasonBlock: {
      paddingHorizontal: theme.spacing.xs,
    },
    reasonText: {
      color: theme.colors.text.secondary,
      lineHeight: 20,
    },
    actionsRow: {
      flexDirection: 'row',
      gap: theme.spacing.sm,
      marginTop: theme.spacing.xs,
    },
    actionButtonSecondary: {
      flex: 1,
      paddingVertical: theme.spacing.sm,
      borderRadius: theme.radius.full,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: hexAlpha(theme.colors.surfaceVariant, 0.5),
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: theme.colors.border,
    },
    actionTextSecondary: {
      color: theme.colors.text.primary,
      fontWeight: '600',
    },
    actionButtonPrimary: {
      flex: 1,
      paddingVertical: theme.spacing.sm,
      borderRadius: theme.radius.full,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.primary,
    },
    actionTextPrimary: {
      color: theme.colors.white,
      fontWeight: '700',
    },
  });
}

export const RestRecommendationCard = memo(RestRecommendationCardComponent);
RestRecommendationCard.displayName = 'RestRecommendationCard';
