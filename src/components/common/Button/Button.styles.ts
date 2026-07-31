import { StyleSheet } from "react-native";

import type { TextColorToken } from "@/components/common/Text";
import type { AegisTheme } from "@/theme/themes";

import type { ButtonSize, ButtonVariant } from "./Button.types";

type ButtonState = {
  disabled: boolean;
  fullWidth: boolean;
};

const sizeStyles = (theme: AegisTheme, size: ButtonSize) => {
  const s = {
    small: {
      minHeight: 36,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.xs,
      gap: theme.spacing.xs,
    },
    medium: {
      minHeight: 44,
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.sm,
      gap: theme.spacing.xs,
    },
    large: {
      minHeight: 52,
      paddingHorizontal: theme.spacing.xl,
      paddingVertical: theme.spacing.md,
      gap: theme.spacing.sm,
    },
  };

  return s[size];
};

const variantStyles = (theme: AegisTheme, variant: ButtonVariant) => {
  const s = {
    primary: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
      ...theme.shadows,
    },
    secondary: {
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.border,
    },
    outline: {
      backgroundColor: theme.colors.transparent,
      borderColor: theme.colors.primary,
      borderWidth: 1.5,
    },
    ghost: {
      backgroundColor: theme.colors.transparent,
      borderColor: theme.colors.transparent,
    },
    danger: {
      backgroundColor: theme.colors.error,
      borderColor: theme.colors.error,
      ...theme.shadows,
    },
  };

  return s[variant];
};

const textColors = {
  primary: "white",
  secondary: "primary",
  outline: "primary",
  ghost: "primary",
  danger: "white",
} satisfies Record<ButtonVariant, TextColorToken>;

export function getButtonTextColor(
  variant: ButtonVariant,
  disabled: boolean,
): TextColorToken {
  return disabled ? "disabled" : textColors[variant];
}

export function getButtonIndicatorColor(
  theme: AegisTheme,
  variant: ButtonVariant,
  disabled: boolean,
): string {
  const textColor = getButtonTextColor(variant, disabled);

  if (textColor === "white") return theme.colors.white;
  if (textColor === "disabled") return theme.colors.disabled;
  return theme.colors.primary;
}

export function createButtonStyles(
  theme: AegisTheme,
  variant: ButtonVariant,
  size: ButtonSize,
  state: ButtonState,
) {
  return StyleSheet.create({
    root: {
      minWidth: state.fullWidth ? "100%" : undefined,
      alignSelf: state.fullWidth ? "stretch" : "flex-start",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      borderWidth: variant === "ghost" ? 0 : 1,
      borderRadius: theme.radius.button,
      opacity: state.disabled ? 0.5 : 1,
      ...sizeStyles(theme, size),
      ...variantStyles(theme, variant),
    },
    pressedRoot: {
      opacity: state.disabled ? 0.5 : 0.75,
      transform: [{ scale: 0.97 }],
    },
    disabled: {
      backgroundColor:
        variant === "ghost"
          ? theme.colors.transparent
          : theme.colors.overlay,
      borderColor:
        variant === "ghost" ? theme.colors.transparent : theme.colors.border,
    },
    label: {
      flexShrink: 1,
    },
    icon: {
      alignItems: "center",
      justifyContent: "center",
    },
    hiddenContent: {
      opacity: 0,
    },
    loadingIndicator: {
      position: "absolute",
    },
  });
}
