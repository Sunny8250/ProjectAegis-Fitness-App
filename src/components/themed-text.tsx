import { Text, type TextProps, StyleSheet } from 'react-native';

import { Colors, Spacing, Typography } from '@/constants/theme';

type ThemedTextProps = TextProps & {
  type?: 'default' | 'title' | 'small' | 'code';
};

export function ThemedText({ type = 'default', style, ...rest }: ThemedTextProps) {
  return <Text style={[styles.base, styles[type], style]} {...rest} />;
}

const styles = StyleSheet.create({
  base: {
    color: Colors.light.text.primary,
  },
  default: {
    ...Typography.body,
  },
  title: {
    ...Typography.display,
  },
  small: {
    ...Typography.small,
    color: Colors.light.text.secondary,
  },
  code: {
    ...Typography.caption,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
    borderRadius: Spacing.one,
    overflow: 'hidden',
    color: Colors.light.primaryDark,
    backgroundColor: Colors.light.overlay,
    fontFamily: 'monospace',
  },
});
