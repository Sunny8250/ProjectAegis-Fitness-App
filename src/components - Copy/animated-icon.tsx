import { useEffect, useMemo } from 'react';
import { Animated, Image, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

import { Colors, Spacing } from '@/constants/theme';

export function AnimatedIcon() {
  const scale = useMemo(() => new Animated.Value(0.94), []);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 0.94,
          duration: 900,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [scale]);

  return (
    <Animated.View style={[styles.iconWrap, { transform: [{ scale }] }]}>
      <Image source={require('../../assets/images/icon.png')} style={styles.icon} />
    </Animated.View>
  );
}

export function AnimatedSplashOverlay() {
  const opacity = useMemo(() => new Animated.Value(1), []);

  useEffect(() => {
    SplashScreen.hideAsync().catch(() => undefined);
    Animated.timing(opacity, {
      toValue: 0,
      duration: 450,
      useNativeDriver: true,
    }).start();
  }, [opacity]);

  return <Animated.View pointerEvents="none" style={[StyleSheet.absoluteFill, styles.overlay, { opacity }]} />;
}

const styles = StyleSheet.create({
  iconWrap: {
    width: 116,
    height: 116,
    borderRadius: Spacing.six,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.light.surface,
    shadowColor: Colors.light.black,
    shadowOpacity: 0.12,
    shadowRadius: 18,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    elevation: 6,
  },
  icon: {
    width: 88,
    height: 88,
  },
  overlay: {
    zIndex: 10,
    backgroundColor: Colors.light.background,
  },
});
