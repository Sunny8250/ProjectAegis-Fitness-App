import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@/components/common/Text';
import { useTheme } from '@/theme/useTheme';
import type { AegisTheme } from '@/theme/themes';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { hexAlpha } from '@/utils/colors';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withTiming, 
  withDelay
} from 'react-native-reanimated';

interface ActivePersonalRecordProps {
  isPR?: boolean;
}

export const ActivePersonalRecord = ({ isPR }: ActivePersonalRecordProps) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const translateY = useSharedValue(-50);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (isPR) {
      // Slide down and fade in
      translateY.value = withSpring(0, { damping: 12 });
      opacity.value = withTiming(1, { duration: 400 });

      // Auto-hide after 3.5 seconds
      translateY.value = withDelay(3500, withTiming(-50, { duration: 400 }));
      opacity.value = withDelay(3500, withTiming(0, { duration: 400 }));
    }
  }, [isPR, opacity, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  if (!isPR) return null;

  return (
    <View style={styles.pointerContainer} pointerEvents="none">
      <Animated.View style={[styles.container, animatedStyle]}>
        <View style={styles.iconContainer}>
          <Text style={styles.emoji}>🏆</Text>
        </View>
        <View style={styles.textContainer}>
          <Text variant="caption" style={styles.title}>New Personal Record</Text>
          <Text variant="caption" style={styles.subtitle}>Highest Weight</Text>
        </View>
        <MaterialCommunityIcons name="star-four-points" size={16} color={theme.colors.warning} />
      </Animated.View>
    </View>
  );
};

function createStyles(theme: AegisTheme) {
  return StyleSheet.create({
    pointerContainer: {
      position: 'absolute',
      top: 140, // Below header
      left: 0,
      right: 0,
      alignItems: 'center',
      zIndex: 100,
    },
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: hexAlpha(theme.colors.surface, 0.9),
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      borderRadius: theme.radius.full,
      borderWidth: 1,
      borderColor: theme.colors.warning,
      gap: theme.spacing.sm,
      shadowColor: theme.colors.warning,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 12,
      elevation: 5,
    },
    iconContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    emoji: {
      fontSize: 16,
    },
    textContainer: {
      justifyContent: 'center',
    },
    title: {
      color: theme.colors.warning,
      fontWeight: '800',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    subtitle: {
      color: theme.colors.text.primary,
      fontSize: 10,
    },
  });
}
