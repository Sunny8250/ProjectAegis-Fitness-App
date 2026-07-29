import { StyleSheet } from 'react-native';

import { Screen } from '@/components/common/Screen';
import { Text } from '@/components/common/Text';

export default function OnboardingScreen() {
  return (
    <Screen contentContainerStyle={styles.content}>
      <Text align="center">Onboarding Placeholder</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
