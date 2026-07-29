import type { ColorValue, StyleProp, ViewStyle } from 'react-native';

/** Public Loader size tokens mapped internally to ActivityIndicator sizes. */
export type LoaderSize = 'small' | 'large';

/** Props for the reusable Project Aegis Loader component. */
export type LoaderProps = {
  /** Loader size token. */
  size?: LoaderSize;
  /** Optional spinner color override; defaults to theme primary. */
  color?: ColorValue;
  /** Optional loading label rendered below the spinner. */
  label?: string;
  /** Centers the loader in the available layout space. */
  fullscreen?: boolean;
  /** Adds a themed backdrop and centers the loader. */
  overlay?: boolean;
  /** Additional styles for the loader root. */
  style?: StyleProp<ViewStyle>;
  /** Accessibility label forwarded to the progress indicator. */
  accessibilityLabel?: string;
  /** Accessibility hint forwarded to the progress indicator. */
  accessibilityHint?: string;
};
