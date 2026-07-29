import { Image, StyleSheet, View } from 'react-native';

import { Spacing } from '@/constants/theme';

export function WebBadge() {
  return (
    <View style={styles.container}>
      <Image
        accessibilityLabel="Expo"
        resizeMode="contain"
        source={require('../../assets/images/expo-badge.png')}
        style={styles.badge}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingBottom: Spacing.three,
  },
  badge: {
    width: 128,
    height: 38,
  },
});
