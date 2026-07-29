import { StyleSheet } from 'react-native';

import type { AegisTheme } from '@/theme/themes';

import type { CardPadding, CardVariant } from './Card.types';

const PRESSED_OPACITY = 0.86;
const DISABLED_OPACITY = 0.56;

const resolveCardPadding = (theme: AegisTheme, padding: CardPadding) => {
  switch (padding) {
    case 'none':
      return 0;
    case 'small':
      return theme.spacing.sm;
    case 'large':
      return theme.spacing.lg;
    case 'medium':
    default:
      return theme.spacing.md;
  }
};

const resolveCardVariantStyle = (theme: AegisTheme, variant: CardVariant) => {
  switch (variant) {
    case 'outlined':
      return {
        backgroundColor: theme.colors.surface,
        borderColor: theme.colors.border,
      };
    case 'filled':
      return {
        backgroundColor: theme.colors.overlay,
        borderColor: theme.colors.transparent,
      };
    case 'elevated':
    default:
      return {
        backgroundColor: theme.colors.surface,
        borderColor: theme.colors.transparent,
        ...theme.shadows,
      };
  }
};

/** Creates theme-aware card styles, applying shadows only for the elevated variant. */
export function createCardStyles(theme: AegisTheme, variant: CardVariant, padding: CardPadding) {
  return StyleSheet.create({
    root: {
      borderRadius: theme.radius.card,
      borderWidth: StyleSheet.hairlineWidth,
      ...resolveCardVariantStyle(theme, variant),
    },
    pressableRoot: {
      opacity: PRESSED_OPACITY,
    },
    disabledRoot: {
      opacity: DISABLED_OPACITY,
    },
    content: {
      gap: theme.spacing.md,
      padding: resolveCardPadding(theme, padding),
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.sm,
    },
    headerText: {
      flex: 1,
      gap: theme.spacing.xxs,
    },
    accessory: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    body: {
      gap: theme.spacing.md,
    },
    footer: {
      gap: theme.spacing.sm,
    },
  });
}
