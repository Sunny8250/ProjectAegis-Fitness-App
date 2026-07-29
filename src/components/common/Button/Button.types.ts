import type { ReactNode } from 'react';
import type { PressableProps, StyleProp, TextStyle, ViewStyle } from 'react-native';

/** Visual treatment supported by the Project Aegis Button primitive. */
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';

/** Size scale supported by the Project Aegis Button primitive. */
export type ButtonSize = 'small' | 'medium' | 'large';

/** Props for the reusable Project Aegis Button component. */
export type ButtonProps = Omit<PressableProps, 'children' | 'disabled' | 'style'> & {
  /** Label or inline content rendered inside the button text. */
  children: ReactNode;
  /** Button visual treatment. */
  variant?: ButtonVariant;
  /** Button size token. */
  size?: ButtonSize;
  /** Shows a loading indicator and prevents presses. */
  loading?: boolean;
  /** Prevents press interactions. */
  disabled?: boolean;
  /** Expands the button to fill the available horizontal space. */
  fullWidth?: boolean;
  /** Optional element rendered before the label. */
  leftIcon?: ReactNode;
  /** Optional element rendered after the label. */
  rightIcon?: ReactNode;
  /** Additional styles for the Pressable root. */
  style?: StyleProp<ViewStyle>;
  /** Additional styles for the internal text label. */
  textStyle?: StyleProp<TextStyle>;
};
