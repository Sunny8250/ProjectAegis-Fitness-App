import type { PropsWithChildren } from 'react';
import type { ScrollViewProps, StyleProp, ViewStyle } from 'react-native';
import type { Edges } from 'react-native-safe-area-context';

/** Props for the reusable themed safe-area screen wrapper. */
export type ScreenProps = PropsWithChildren<{
  /** Safe-area edges applied to the screen root. */
  edges?: Edges;
  /** Enables a themed ScrollView content area when true. */
  scrollable?: boolean;
  /** Additional styles for the SafeAreaView root. */
  style?: StyleProp<ViewStyle>;
  /** Additional styles for the direct screen content container. */
  contentContainerStyle?: StyleProp<ViewStyle>;
  /** Optional props forwarded to ScrollView in scrollable mode. */
  scrollViewProps?: Omit<ScrollViewProps, 'children' | 'contentContainerStyle' | 'style'>;
  /** Test identifier forwarded to the SafeAreaView root. */
  testID?: string;
}>;
