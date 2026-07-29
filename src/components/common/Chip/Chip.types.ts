import type { ReactElement, ReactNode } from 'react';
import type {
  AccessibilityState,
  PressableProps,
  StyleProp,
  ViewStyle,
} from 'react-native';

import type { IconName } from '@/components/common/Icon';

/** Visual treatment supported by the Project Aegis Chip primitive. */
export type ChipVariant = 'filled' | 'outlined';

/** Size scale supported by the Project Aegis Chip primitive. */
export type ChipSize = 'small' | 'medium' | 'large';

/** Accessory rendered beside the chip label, either as an icon name or custom element. */
export type ChipAccessory = IconName | ReactElement;

/** Props for the reusable Project Aegis Chip component. */
export type ChipProps = Omit<PressableProps, 'children' | 'disabled' | 'style'> & {
  /** Short text or node displayed inside the chip. */
  label: ReactNode;
  /** Indicates the active selection state. */
  selected?: boolean;
  /** Prevents press and long-press interactions when the chip is pressable. */
  disabled?: boolean;
  /** Chip visual treatment. */
  variant?: ChipVariant;
  /** Chip size token. */
  size?: ChipSize;
  /** Optional accessory rendered before the label. */
  leftAccessory?: ChipAccessory;
  /** Optional accessory rendered after the label. */
  rightAccessory?: ChipAccessory;
  /** Additional styles for the chip root. */
  style?: StyleProp<ViewStyle>;
  /** Accessibility state merged with disabled and selected when pressable. */
  accessibilityState?: AccessibilityState;
};
