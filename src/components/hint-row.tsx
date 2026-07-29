import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { Spacing } from '@/constants/theme';
import { ThemedText } from '@/components/themed-text';

type HintRowProps = {
  title: string;
  hint: ReactNode;
};

export function HintRow({ title, hint }: HintRowProps) {
  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>{title}</ThemedText>
      <View style={styles.hint}>{hint}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.three,
  },
  title: {
    flexShrink: 0,
  },
  hint: {
    flexShrink: 1,
    alignItems: 'flex-end',
  },
});
