import { View, type ViewProps, StyleSheet, useColorScheme } from 'react-native';

import { Colors } from '@/constants/theme';

type ThemedViewProps = ViewProps & {
  type?: 'background' | 'backgroundElement' | 'surface';
};

export function ThemedView({ type = 'background', style, ...rest }: ThemedViewProps) {
  const scheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  return <View style={[styles[type], { backgroundColor: Colors[scheme].background }, style]} {...rest} />;
}

const styles = StyleSheet.create({
  background: {},
  backgroundElement: {},
  surface: {},
});
