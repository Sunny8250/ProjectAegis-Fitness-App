import { StyleSheet, type ColorValue } from 'react-native';

import type { TextColorToken, TextVariant } from '@/components/common/Text';
import type { AegisTheme } from '@/theme/themes';

import type { BadgeSize, BadgeVariant } from './Badge.types';

const PRESSED_OPACITY = 0.86;
const DISABLED_OPACITY = 0.56;

type BadgeColors = {
  backgroundColor: string;
  borderColor: string;
  iconColor: ColorValue;
  textColor: TextColorToken;
};

const resolveBadgeColors = (theme: AegisTheme, variant: BadgeVariant): BadgeColors => {
  switch (variant) {
    case 'secondary':
      return {
        backgroundColor: theme.colors.surface,
        borderColor: theme.colors.border,
        iconColor: theme.colors.text.primary,
        textColor: 'text.primary',
      };
    case 'success':
      return {
        backgroundColor: theme.colors.success,
        borderColor: theme.colors.success,
        iconColor: theme.colors.white,
        textColor: 'white',
      };
    case 'warning':
      return {
        backgroundColor: theme.colors.warning,
        borderColor: theme.colors.warning,
        iconColor: theme.colors.black,
        textColor: 'black',
      };
    case 'error':
      return {
        backgroundColor: theme.colors.error,
        borderColor: theme.colors.error,
        iconColor: theme.colors.white,
        textColor: 'white',
      };
    case 'info':
      return {
        backgroundColor: theme.colors.information,
        borderColor: theme.colors.information,
        iconColor: theme.colors.white,
        textColor: 'white',
      };
    case 'outline':
      return {
        backgroundColor: theme.colors.transparent,
        borderColor: theme.colors.primary,
        iconColor: theme.colors.primary,
        textColor: 'primary',
      };
    case 'primary':
    default:
      return {
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.primary,
        iconColor: theme.colors.white,
        textColor: 'white',
      };
  }
};

const resolveBadgeSize = (theme: AegisTheme, size: BadgeSize) => {
  switch (size) {
    case 'small':
      return {
        minHeight: theme.spacing.lg,
        paddingHorizontal: theme.spacing.sm,
        paddingVertical: theme.spacing.xxs,
        gap: theme.spacing.xxs,
        iconSize: theme.spacing.md,
        textVariant: 'caption' as TextVariant,
      };
    case 'large':
      return {
        minHeight: theme.spacing.xxxl,
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.sm,
        gap: theme.spacing.xs,
        iconSize: theme.spacing.xl,
        textVariant: 'body' as TextVariant,
      };
    case 'medium':
    default:
      return {
        minHeight: theme.spacing.xxl,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.xs,
        gap: theme.spacing.xs,
        iconSize: theme.spacing.lg,
        textVariant: 'caption' as TextVariant,
      };
  }
};

/** Creates theme-aware styles and metadata for Badge variants and sizes. */
export function createBadgeStyles(theme: AegisTheme, variant: BadgeVariant, size: BadgeSize) {
  const colors = resolveBadgeColors(theme, variant);
  const sizeTokens = resolveBadgeSize(theme, size);

  return {
    iconSize: sizeTokens.iconSize,
    iconColor: colors.iconColor,
    textColor: colors.textColor,
    textVariant: sizeTokens.textVariant,
    styles: StyleSheet.create({
      root: {
        minHeight: sizeTokens.minHeight,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: sizeTokens.gap,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: theme.radius.pill,
        paddingHorizontal: sizeTokens.paddingHorizontal,
        paddingVertical: sizeTokens.paddingVertical,
        backgroundColor: colors.backgroundColor,
        borderColor: colors.borderColor,
      },
      pressedRoot: {
        opacity: PRESSED_OPACITY,
      },
      disabledRoot: {
        opacity: DISABLED_OPACITY,
      },
      accessory: {
        alignItems: 'center',
        justifyContent: 'center',
      },
      label: {
        flexShrink: 1,
      },
    }),
  };
}
