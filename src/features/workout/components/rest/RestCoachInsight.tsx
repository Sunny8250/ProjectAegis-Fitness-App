import { memo, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { Skeleton } from '@/components/common/Skeleton';
import { Text } from '@/components/common/Text';
import type { AegisTheme } from '@/theme/themes';
import { useTheme } from '@/theme/useTheme';
import { hexAlpha } from '@/utils/colors';

import type { CoachMessage } from '../../utils/restCoachEngine';

/**
 * Section 2 — the AI Recovery Coach.
 *
 * One insight at a time, cross-faded as the coach moves through the rest
 * period. The advice line underneath is the coach's read on the rest itself
 * ("hold", "extend", "shorten"), kept separate so the two never compete.
 */

const CROSSFADE_IN_MS = 320;
const CROSSFADE_OUT_MS = 180;
const ICON_SIZE = 18;
const BADGE_SIZE = 34;
const GRADIENT_ALPHA = { start: 0.12, end: 0.03 } as const;
const SKELETON_LINE_HEIGHTS = [16, 16] as const;

interface RestCoachInsightProps {
  /** Current insight, or null while the first is still being chosen. */
  insight: CoachMessage | null;
}

function RestCoachInsightComponent({
  insight,
}: RestCoachInsightProps) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.container}>
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
        <View style={styles.badge}>
          <MaterialCommunityIcons
            color={theme.colors.primary}
            name="robot-outline" // updated icon for consistency
            size={ICON_SIZE}
          />
        </View>
        <Text style={styles.eyebrow} variant="label">
          Coach Guidance
        </Text>
      </View>

      {insight ? (
        <Animated.View
          key={insight.id}
          entering={FadeIn.duration(CROSSFADE_IN_MS)}
          exiting={FadeOut.duration(CROSSFADE_OUT_MS)}
          style={styles.insightRow}
        >
          <MaterialCommunityIcons
            color={theme.colors.primary}
            name={insight.icon}
            size={ICON_SIZE + 4} // Slightly larger for emphasis
            style={styles.insightIcon}
          />
          <Text style={styles.insightText} variant="heading3">
            {insight.text}
          </Text>
        </Animated.View>
      ) : (
        <View style={styles.skeletonGroup}>
          {SKELETON_LINE_HEIGHTS.map((height, index) => (
            <Skeleton
              key={index}
              borderRadius={theme.radius.xs}
              height={height}
              width={index === 0 ? '100%' : '68%'}
            />
          ))}
        </View>
      )}

      {/* Advice Row removed here, because we handle active recommendations in RestRecommendationCard */}
    </View>
  );
}

function createStyles(theme: AegisTheme) {
  return StyleSheet.create({
    container: {
      backgroundColor: hexAlpha(theme.colors.surface, 0.9),
      borderColor: hexAlpha(theme.colors.primary, 0.16),
      borderRadius: theme.radius.xxl,
      borderWidth: StyleSheet.hairlineWidth * 2,
      gap: theme.spacing.sm,
      overflow: 'hidden',
      padding: theme.spacing.lg,
    },
    headerRow: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: theme.spacing.xs,
    },
    badge: {
      alignItems: 'center',
      backgroundColor: hexAlpha(theme.colors.primary, 0.14),
      borderRadius: theme.radius.full,
      height: theme.metrics.scaleSize(BADGE_SIZE),
      justifyContent: 'center',
      width: theme.metrics.scaleSize(BADGE_SIZE),
    },
    eyebrow: {
      color: theme.colors.primary,
      fontWeight: '700',
      textTransform: 'uppercase',
    },
    insightRow: {
      alignItems: 'flex-start',
      flexDirection: 'row',
      gap: theme.spacing.xs,
    },
    insightIcon: {
      marginTop: theme.spacing.xxs / 2,
    },
    insightText: {
      color: theme.colors.text.primary,
      flex: 1,
      fontWeight: '600',
    },
    skeletonGroup: {
      gap: theme.spacing.xs,
    },
    adviceRow: {
      alignItems: 'center',
      borderTopColor: theme.colors.border,
      borderTopWidth: StyleSheet.hairlineWidth,
      flexDirection: 'row',
      gap: theme.spacing.xs,
      paddingTop: theme.spacing.sm,
    },
    adviceText: {
      flex: 1,
    },
  });
}

export const RestCoachInsight = memo(RestCoachInsightComponent);

RestCoachInsight.displayName = 'RestCoachInsight';
