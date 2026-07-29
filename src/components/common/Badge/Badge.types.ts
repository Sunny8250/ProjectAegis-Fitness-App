import type { ReactElement, ReactNode } from 'react';
import type {
  AccessibilityState,
  PressableProps,
  StyleProp,
  ViewStyle,
} from 'react-native';

import type { IconName } from '@/components/common/Icon';

/** Visual treatment supported by the Project Aegis Badge primitive. */
export type BadgeVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'outline';

/** Size scale supported by the Project Aegis Badge primitive. */
export type BadgeSize = 'small' | 'medium' | 'large';

/** Accessory rendered beside the badge label, either as an icon name or custom element. */
export type BadgeAccessory = IconName | ReactElement;

/** Props for the reusable Project Aegis Badge component. */
export type BadgeProps = Omit<PressableProps, 'children' | 'disabled' | 'style'> & {
  /** Short text or node displayed inside the badge. */
  label: ReactNode;
  /** Badge visual treatment. */
  variant?: BadgeVariant;
  /** Badge size token. */
  size?: BadgeSize;
  /** Optional accessory rendered before the label. */
  leftAccessory?: BadgeAccessory;
  /** Optional accessory rendered after the label. */
  rightAccessory?: BadgeAccessory;
  /** Additional styles for the badge root. */
  style?: StyleProp<ViewStyle>;
  /** Prevents press interactions when the badge is pressable. */
  disabled?: boolean;
  /** Accessibility state forwarded when the badge is pressable. */
  accessibilityState?: AccessibilityState;
};
