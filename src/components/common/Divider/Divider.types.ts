import type { ColorValue, StyleProp, ViewStyle } from 'react-native';

/** Supported Divider orientations. */
export type DividerOrientation = 'horizontal' | 'vertical';

/** Supported spacing inset values for Divider margins. */
export type DividerInset = 'none' | 'small' | 'medium' | 'large';

/** Props for the reusable Project Aegis Divider component. */
export type DividerProps = {
  /** Divider direction. */
  orientation?: DividerOrientation;
  /** Margin inset applied on the divider's cross-axis edges. */
  inset?: DividerInset;
  /** Divider line thickness. */
  thickness?: number;
  /** Optional color override; defaults to the active theme border color. */
  color?: ColorValue;
  /** Additional styles for the divider root. */
  style?: StyleProp<ViewStyle>;
};
