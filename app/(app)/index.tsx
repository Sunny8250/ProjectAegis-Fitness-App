import { StyleSheet } from 'react-native';

import { Screen } from '@/components/common/Screen';
import { Text } from '@/components/common/Text';

export default function HomeScreen() {
  return (
    <Screen contentContainerStyle={styles.content}>
      <Text align="center">Home Placeholder</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
