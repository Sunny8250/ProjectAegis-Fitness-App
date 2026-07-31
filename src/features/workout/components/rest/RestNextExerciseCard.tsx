import { memo, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';

import { Text } from '@/components/common/Text';
import type { AegisTheme } from '@/theme/themes';
import { useTheme } from '@/theme/useTheme';
import { hexAlpha } from '@/utils/colors';

import type { RestNextUp } from '../../hooks/useActiveWorkout';
import type { CoachIconName } from '../../utils/restCoachEngine';

/**
 * Section 4 — what the athlete is resting *for*.
 *
 * Everything needed to walk back to the equipment prepared: the movement, the
 * muscles it loads, the set and rep target, and how long it should take.
 */

/** Preview image height per breakpoint tier, in baseline dp. */
const IMAGE_HEIGHT = { compact: 128, small: 140, tablet: 200, default: 156 };
const IMAGE_TRANSITION_MS = 220;
const META_ICON_SIZE = 16;
const OVERLAY_ALPHA = { start: 0, end: 0.55 } as const;

interface RestNextExerciseCardProps {
  nextUp: RestNextUp;
}

interface MetaItem {
  icon: CoachIconName;
  label: string;
  value: string;
}

function RestNextExerciseCardComponent({ nextUp }: RestNextExerciseCardProps) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const { exercise, isNewExercise, reps, setNumber, totalSets } = nextUp;

  const meta = useMemo<MetaItem[]>(
    () => [
      {
        icon: 'format-list-numbered',
        label: 'Sets',
        value: `${setNumber} of ${totalSets}`,
      },
      { icon: 'repeat', label: 'Reps', value: reps },
      {
        icon: 'dumbbell',
        label: 'Equipment',
        value: exercise.equipment.join(' · ') || 'Bodyweight',
      },
      { icon: 'clock-outline', label: 'Est. duration', value: exercise.duration },
    ],
    [exercise.duration, exercise.equipment, reps, setNumber, totalSets],
  );

  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image
          accessibilityIgnoresInvertColors
          contentFit="cover"
          source={exercise.imageUri}
          style={styles.image}
          transition={IMAGE_TRANSITION_MS}
        />
        <LinearGradient
          colors={[
            hexAlpha(theme.colors.black, OVERLAY_ALPHA.start),
            hexAlpha(theme.colors.black, OVERLAY_ALPHA.end),
          ]}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.eyebrowChip}>
          <MaterialCommunityIcons
            color={theme.colors.white}
            name="arrow-right-circle"
            size={META_ICON_SIZE - 2}
          />
          <Text style={styles.eyebrowText} variant="label">
            {isNewExercise ? 'Up next' : 'Next set'}
          </Text>
        </View>
      </View>

      <View style={styles.body}>
        <Text numberOfLines={2} variant="heading3">
          {exercise.name}
        </Text>

        {exercise.targetMuscles.length > 0 ? (
          <View style={styles.muscleRow}>
            {exercise.targetMuscles.map((muscle) => (
              <View key={muscle} style={styles.muscleChip}>
                <Text style={styles.muscleText} variant="small">
                  {muscle}
                </Text>
              </View>
            ))}
          </View>
        ) : null}

        <View style={styles.metaGrid}>
          {meta.map((item) => (
            <View key={item.label} style={styles.metaItem}>
              <MaterialCommunityIcons
                color={theme.colors.text.tertiary}
                name={item.icon}
                size={META_ICON_SIZE}
              />
              <View style={styles.metaTextGroup}>
                <Text color="text.tertiary" variant="small">
                  {item.label}
                </Text>
                <Text numberOfLines={1} style={styles.metaValue} variant="caption">
                  {item.value}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

function createStyles(theme: AegisTheme) {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.border,
      borderRadius: theme.radius.xxl,
      borderWidth: StyleSheet.hairlineWidth,
      overflow: 'hidden',
    },
    imageWrapper: {
      height: theme.metrics.scaleSize(theme.metrics.select(IMAGE_HEIGHT)),
      justifyContent: 'flex-end',
      width: '100%',
    },
    image: {
      backgroundColor: theme.colors.surfaceVariant,
      bottom: 0,
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0,
    },
    eyebrowChip: {
      alignItems: 'center',
      alignSelf: 'flex-start',
      backgroundColor: hexAlpha(theme.colors.black, 0.35),
      borderRadius: theme.radius.full,
      flexDirection: 'row',
      gap: theme.spacing.xxs,
      margin: theme.spacing.md,
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.xxs,
    },
    eyebrowText: {
      color: theme.colors.white,
      fontWeight: '700',
      textTransform: 'uppercase',
    },
    body: {
      gap: theme.spacing.sm,
      padding: theme.spacing.lg,
    },
    muscleRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: theme.spacing.xxs,
    },
    muscleChip: {
      backgroundColor: hexAlpha(theme.colors.primary, 0.1),
      borderRadius: theme.radius.full,
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.xxs,
    },
    muscleText: {
      color: theme.colors.primary,
      fontWeight: '600',
    },
    metaGrid: {
      borderTopColor: theme.colors.border,
      borderTopWidth: StyleSheet.hairlineWidth,
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingTop: theme.spacing.sm,
      rowGap: theme.spacing.sm,
    },
    metaItem: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: theme.spacing.xs,
      width: '50%',
    },
    metaTextGroup: {
      flex: 1,
    },
    metaValue: {
      color: theme.colors.text.primary,
      fontWeight: '600',
    },
  });
}

export const RestNextExerciseCard = memo(RestNextExerciseCardComponent);

RestNextExerciseCard.displayName = 'RestNextExerciseCard';
