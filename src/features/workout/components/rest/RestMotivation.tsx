import { memo, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Text } from '@/components/common/Text';
import type { AegisTheme } from '@/theme/themes';
import { useTheme } from '@/theme/useTheme';
import { hexAlpha } from '@/utils/colors';

import type { CoachMessage } from '../../utils/restCoachEngine';

/**
 * Section 7 — contextual motivation.
 *
 * Every line is a statement of fact about the session rather than a slogan,
 * which is what keeps it from going stale over a long workout.
 */

const CROSSFADE_IN_MS = 320;
const CROSSFADE_OUT_MS = 180;
const ICON_SIZE = 18;

interface RestMotivationProps {
  /** Current motivation line. Renders nothing until one is chosen. */
  motivation: CoachMessage | null;
}

function RestMotivationComponent({ motivation }: RestMotivationProps) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  if (!motivation) return null;

  return (
    <Animated.View
      key={motivation.id}
      entering={FadeIn.duration(CROSSFADE_IN_MS)}
      exiting={FadeOut.duration(CROSSFADE_OUT_MS)}
      style={styles.container}
    >
      <View style={styles.badge}>
        <MaterialCommunityIcons
          color={theme.colors.secondary}
          name={motivation.icon}
          size={ICON_SIZE}
        />
      </View>
      <Text style={styles.text} variant="callout">
        {motivation.text}
      </Text>
    </Animated.View>
  );
}

function createStyles(theme: AegisTheme) {
  return StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: hexAlpha(theme.colors.secondary, 0.09),
      borderColor: hexAlpha(theme.colors.secondary, 0.18),
      borderRadius: theme.radius.xl,
      borderWidth: StyleSheet.hairlineWidth,
      flexDirection: 'row',
      gap: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
    },
    badge: {
      alignItems: 'center',
      backgroundColor: hexAlpha(theme.colors.secondary, 0.14),
      borderRadius: theme.radius.full,
      height: theme.metrics.scaleSize(32),
      justifyContent: 'center',
      width: theme.metrics.scaleSize(32),
    },
    text: {
      color: theme.colors.text.primary,
      flex: 1,
      fontWeight: '600',
    },
  });
}

export const RestMotivation = memo(RestMotivationComponent);

RestMotivation.displayName = 'RestMotivation';
