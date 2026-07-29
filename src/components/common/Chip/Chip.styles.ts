import { StyleSheet, type ColorValue } from 'react-native';

import type { TextColorToken, TextVariant } from '@/components/common/Text';
import type { AegisTheme } from '@/theme/themes';

import type { ChipSize, ChipVariant } from './Chip.types';

const PRESSED_OPACITY = 0.86;
const DISABLED_OPACITY = 0.56;

type ChipColors = {
  backgroundColor: string;
  borderColor: string;
  iconColor: ColorValue;
  textColor: TextColorToken;
};

const resolveChipColors = (
  theme: AegisTheme,
  variant: ChipVariant,
  selected: boolean,
): ChipColors => {
  if (selected && variant === 'filled') {
    return {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
      iconColor: theme.colors.white,
      textColor: 'white',
    };
  }

  if (selected) {
    return {
      backgroundColor: theme.colors.transparent,
      borderColor: theme.colors.primary,
      iconColor: theme.colors.primary,
      textColor: 'primary',
    };
  }

  if (variant === 'outlined') {
    return {
      backgroundColor: theme.colors.transparent,
      borderColor: theme.colors.border,
      iconColor: theme.colors.text.primary,
      textColor: 'text.primary',
    };
  }

  return {
    backgroundColor: theme.colors.overlay,
    borderColor: theme.colors.transparent,
    iconColor: theme.colors.text.primary,
    textColor: 'text.primary',
  };
};

const resolveChipSize = (theme: AegisTheme, size: ChipSize) => {
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

/** Creates theme-aware styles and metadata for Chip variants, sizes, and selection. */
export function createChipStyles(
  theme: AegisTheme,
  variant: ChipVariant,
  size: ChipSize,
  selected: boolean,
) {
  const colors = resolveChipColors(theme, variant, selected);
  const sizeTokens = resolveChipSize(theme, size);

  return {
    iconColor: colors.iconColor,
    iconSize: sizeTokens.iconSize,
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
