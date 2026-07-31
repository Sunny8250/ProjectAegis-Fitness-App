import { memo, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { ProgressRing } from '@/components/common/ProgressRing';
import { Text } from '@/components/common/Text';
import type { AegisTheme } from '@/theme/themes';
import { useTheme } from '@/theme/useTheme';
import { hexAlpha } from '@/utils/colors';

import type { RecoveryZone } from '../../utils/recoveryEstimator';
import { RestMeterBar } from './RestMeterBar';

/**
 * Section 3 — recovery progress, readiness, and remaining energy.
 *
 * The ring carries the single number that matters; readiness and energy sit
 * beside it as supporting detail rather than competing focal points.
 */

const RING_SIZE = 84;
const RING_STROKE_WIDTH = 8;
const PERCENT_SCALE = 100;

interface RestRecoveryStatusProps {
  /** Physical recovery from the last set, 0–100. */
  recoveryPercent: number;
  /** Estimated energy reserve left for the session, 0–100. */
  energyPercent: number;
  zone: RecoveryZone;
  /** Short readiness status, e.g. "Ready for next set". */
  readinessLabel: string;
  /** One-sentence observation from the recovery model. */
  headline: string;
}

/** Maps a recovery zone onto the semantic colour that represents it. */
function zoneColor(theme: AegisTheme, zone: RecoveryZone): string {
  switch (zone) {
    case 'excellent':
      return theme.colors.success;
    case 'good':
      return theme.colors.primary;
    case 'fair':
      return theme.colors.secondary;
    case 'low':
      return theme.colors.warning;
    case 'poor':
    default:
      return theme.colors.error;
  }
}

function RestRecoveryStatusComponent({
  energyPercent,
  headline,
  readinessLabel,
  recoveryPercent,
  zone,
}: RestRecoveryStatusProps) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const accent = zoneColor(theme, zone);

  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow} variant="label">
        Recovery status
      </Text>

      <View style={styles.row}>
        <ProgressRing
          accessibilityLabel={`Recovery ${recoveryPercent} percent`}
          color={accent}
          progress={recoveryPercent / PERCENT_SCALE}
          size={theme.metrics.scaleSize(RING_SIZE)}
          strokeWidth={theme.metrics.scaleSize(RING_STROKE_WIDTH)}
        >
          <Text style={[styles.ringValue, { color: accent }]} variant="heading3">
            {recoveryPercent}%
          </Text>
          <Text color="text.tertiary" variant="small">
            Recovery
          </Text>
        </ProgressRing>

        <View style={styles.details}>
          <View
            style={[
              styles.readinessChip,
              { backgroundColor: hexAlpha(accent, 0.12) },
            ]}
          >
            <View style={[styles.readinessDot, { backgroundColor: accent }]} />
            <Text style={[styles.readinessLabel, { color: accent }]} variant="small">
              {readinessLabel}
            </Text>
          </View>

          <Text color="text.secondary" variant="caption">
            {headline}
          </Text>

          <RestMeterBar
            accessibilityLabel={`Estimated energy ${energyPercent} percent`}
            color={theme.colors.secondary}
            label="Estimated energy"
            value={energyPercent / PERCENT_SCALE}
            valueLabel={`${energyPercent}%`}
          />
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
      gap: theme.spacing.md,
      padding: theme.spacing.lg,
    },
    eyebrow: {
      color: theme.colors.text.tertiary,
      textTransform: 'uppercase',
    },
    row: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: theme.spacing.lg,
    },
    ringValue: {
      fontVariant: ['tabular-nums'],
      fontWeight: '700',
    },
    details: {
      flex: 1,
      gap: theme.spacing.xs,
    },
    readinessChip: {
      alignItems: 'center',
      alignSelf: 'flex-start',
      borderRadius: theme.radius.full,
      flexDirection: 'row',
      gap: theme.spacing.xxs,
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.xxs,
    },
    readinessDot: {
      borderRadius: theme.radius.full,
      height: theme.metrics.scaleSize(6),
      width: theme.metrics.scaleSize(6),
    },
    readinessLabel: {
      fontWeight: '700',
    },
  });
}

export const RestRecoveryStatus = memo(RestRecoveryStatusComponent);

RestRecoveryStatus.displayName = 'RestRecoveryStatus';
