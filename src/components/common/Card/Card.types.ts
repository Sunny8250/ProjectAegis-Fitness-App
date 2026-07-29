import type { ReactNode } from 'react';
import type { AccessibilityState, PressableProps, StyleProp, ViewStyle } from 'react-native';

/** Card visual treatment: elevated adds shadow, outlined adds border, filled uses a subtle surface. */
export type CardVariant = 'elevated' | 'outlined' | 'filled';

/** Padding scale supported by the Project Aegis Card primitive. */
export type CardPadding = 'none' | 'small' | 'medium' | 'large';

/** Props for the reusable Project Aegis Card component. */
export type CardProps = Omit<PressableProps, 'children' | 'disabled' | 'style'> & {
  /** Main content rendered inside the card body. */
  children?: ReactNode;
  /** Card visual treatment. */
  variant?: CardVariant;
  /** Card inner spacing. */
  padding?: CardPadding;
  /** Optional title rendered in the header region when any header content exists. */
  title?: ReactNode;
  /** Optional subtitle rendered below the header title. */
  subtitle?: ReactNode;
  /** Optional element rendered before the title block. */
  leftAccessory?: ReactNode;
  /** Optional element rendered after the title block. */
  rightAccessory?: ReactNode;
  /** Optional footer rendered below the card body when provided. */
  footer?: ReactNode;
  /** Prevents press interactions when the card is pressable. */
  disabled?: boolean;
  /** Additional styles for the card root. */
  style?: StyleProp<ViewStyle>;
  /** Accessibility state forwarded when the card is pressable. */
  accessibilityState?: AccessibilityState;
};
