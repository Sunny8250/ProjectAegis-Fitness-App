import { StyleSheet } from "react-native";

import type { AegisTheme } from "@/theme/themes";

import type { CardPadding, CardVariant } from "./Card.types";

const PRESSED_OPACITY = 0.88;
const DISABLED_OPACITY = 0.45;

const resolveCardPadding = (_theme: AegisTheme, padding: CardPadding) => {
  switch (padding) {
    case "none":
      return 0;
    case "small":
      return _theme.spacing.sm;
    case "large":
      return _theme.spacing.xl;
    case "medium":
    default:
      return _theme.spacing.md;
  }
};

const resolveCardVariantStyle = (theme: AegisTheme, variant: CardVariant) => {
  switch (variant) {
    case "outlined":
      return {
        backgroundColor: theme.colors.surface,
        borderColor: theme.colors.border,
      };
    case "filled":
      return {
        backgroundColor: theme.colors.overlay,
        borderColor: theme.colors.transparent,
      };
    case "elevated":
    default:
      return {
        backgroundColor: theme.colors.surface,
        borderColor: theme.colors.transparent,
        ...theme.shadows,
      };
  }
};

export function createCardStyles(
  theme: AegisTheme,
  variant: CardVariant,
  padding: CardPadding,
) {
  return StyleSheet.create({
    root: {
      borderRadius: theme.radius.card,
      borderWidth: StyleSheet.hairlineWidth,
      ...resolveCardVariantStyle(theme, variant),
      overflow: "hidden",
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
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.sm,
    },
    headerText: {
      flex: 1,
      gap: theme.spacing.xxs,
    },
    accessory: {
      alignItems: "center",
      justifyContent: "center",
    },
    body: {
      gap: theme.spacing.md,
    },
    footer: {
      gap: theme.spacing.sm,
    },
  });
}
