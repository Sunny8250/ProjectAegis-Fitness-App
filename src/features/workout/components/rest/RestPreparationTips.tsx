import { memo, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Text } from '@/components/common/Text';
import type { AegisTheme } from '@/theme/themes';
import { useTheme } from '@/theme/useTheme';
import { hexAlpha } from '@/utils/colors';

/**
 * Section 5 — how to set up for the next movement.
 *
 * Deliberately capped at a couple of cues: a rest period is not the moment to
 * read a technique manual.
 */

const ICON_SIZE = 16;

interface RestPreparationTipsProps {
  /** One or two setup cues. Renders nothing when empty. */
  cues: string[];
}

function RestPreparationTipsComponent({ cues }: RestPreparationTipsProps) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  if (cues.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow} variant="label">
        Preparation Checklist
      </Text>

      {cues.map((cue) => (
        <View key={cue} style={styles.cueRow}>
          <MaterialCommunityIcons
            color={theme.colors.primary}
            name="checkbox-marked-circle-outline"
            size={ICON_SIZE + 4}
          />
          <Text style={styles.cueText} variant="caption">
            {cue}
          </Text>
        </View>
      ))}
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
      gap: theme.spacing.sm,
      padding: theme.spacing.lg,
    },
    eyebrow: {
      color: theme.colors.text.tertiary,
      textTransform: 'uppercase',
    },
    cueRow: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: theme.spacing.xs,
    },
    cueText: {
      color: theme.colors.text.primary,
      flex: 1,
    },
  });
}

export const RestPreparationTips = memo(RestPreparationTipsComponent);

RestPreparationTips.displayName = 'RestPreparationTips';
