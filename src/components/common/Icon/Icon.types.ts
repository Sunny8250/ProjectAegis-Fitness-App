import type { SymbolViewProps } from 'expo-symbols';
import type { ColorValue, StyleProp, ViewProps, ViewStyle } from 'react-native';

/** Icon names supported by the underlying icon implementation. */
export type IconName = SymbolViewProps['name'];

/** Icon weights supported by the underlying icon implementation. */
export type IconWeight = SymbolViewProps['weight'];

/** Props for the Project Aegis icon abstraction. */
export type IconProps = Pick<
  ViewProps,
  'accessible' | 'accessibilityHint' | 'accessibilityLabel' | 'testID'
> & {
  /** Name of the icon to render. */
  name: IconName;
  /** Numeric icon size. */
  size?: number;
  /** Optional color override; defaults to the active theme text color. */
  color?: ColorValue;
  /** Optional icon weight when supported by the active icon library. */
  weight?: IconWeight;
  /** Additional style forwarded to the icon component. */
  style?: StyleProp<ViewStyle>;
};
