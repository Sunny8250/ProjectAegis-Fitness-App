import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Text } from '@/components/common/Text';
import { useTheme } from '@/theme/useTheme';
import type { AegisTheme } from '@/theme/themes';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { hexAlpha } from '@/utils/colors';
import { LinearGradient } from 'expo-linear-gradient';

interface ActiveAiCoachProps {
  tip: string;
}

export const ActiveAiCoach = ({ tip }: ActiveAiCoachProps) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  if (!tip) return null;

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        {/* Glassmorphic background gradient */}
        <LinearGradient
          colors={[
            hexAlpha(theme.colors.primary, 0.12),
            hexAlpha(theme.colors.primary, 0.04),
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />

        <View style={styles.headerRow}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons name="creation" size={16} color={theme.colors.primary} />
          </View>
          <Text variant="small" style={styles.title}>Aegis AI Coach</Text>
        </View>

        <Text variant="body" style={styles.tipText}>{tip}</Text>
      </View>
    </View>
  );
};

function createStyles(theme: AegisTheme) {
  return StyleSheet.create({
    outerContainer: {
      marginHorizontal: theme.spacing.lg,
      marginTop: -24, // Pull up to overlap the showcase image slightly
    },
    container: {
      borderRadius: theme.radius.xl,
      padding: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
      borderWidth: 1,
      borderColor: hexAlpha(theme.colors.primary, 0.15),
      overflow: 'hidden',
      backgroundColor: hexAlpha(theme.colors.surface, 0.85),
      // Glassmorphic shadow
      shadowColor: theme.colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 16,
      elevation: 4,
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginBottom: 6,
    },
    iconContainer: {
      width: 26,
      height: 26,
      borderRadius: 13,
      backgroundColor: hexAlpha(theme.colors.primary, 0.15),
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      color: theme.colors.primary,
      fontWeight: '700',
      letterSpacing: 0.3,
      textTransform: 'uppercase',
      fontSize: 11,
    },
    tipText: {
      color: theme.colors.text.primary,
      lineHeight: 21,
      fontSize: 13,
    },
  });
}
