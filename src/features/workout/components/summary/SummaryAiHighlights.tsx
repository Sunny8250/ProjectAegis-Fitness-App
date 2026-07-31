import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@/theme/useTheme';
import type { AegisTheme } from '@/theme/themes';
import { Text } from '@/components/common/Text';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface SummaryAiHighlightsProps {
  highlights: string[];
}

export const SummaryAiHighlights = ({ highlights }: SummaryAiHighlightsProps) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  if (!highlights.length) return null;

  return (
    <View style={styles.container}>
      <Text variant="heading3" style={styles.title}>Aegis AI Insights</Text>
      
      <View style={styles.cardContainer}>
        <LinearGradient
          colors={[`${theme.colors.primary}15`, `${theme.colors.primary}05`]}
          style={[StyleSheet.absoluteFill, { borderRadius: theme.radius.lg }]}
        />
        
        <View style={styles.header}>
          <MaterialCommunityIcons name="robot-outline" size={24} color={theme.colors.primary} />
          <Text variant="body" color="primary" style={styles.headerText}>
            POST-WORKOUT ANALYSIS
          </Text>
        </View>

        <View style={styles.list}>
          {highlights.map((highlight, index) => (
            <View key={index} style={styles.listItem}>
              <View style={styles.bullet} />
              <Text variant="body" style={styles.highlightText}>
                {highlight}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

function createStyles(theme: AegisTheme) {
  return StyleSheet.create({
    container: {
      marginBottom: theme.spacing.xl,
    },
    title: {
      marginBottom: theme.spacing.md,
      marginLeft: theme.spacing.xs,
    },
    cardContainer: {
      padding: theme.spacing.lg,
      borderRadius: theme.radius.lg,
      borderWidth: 1,
      borderColor: `${theme.colors.primary}30`,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.sm,
      marginBottom: theme.spacing.md,
    },
    headerText: {
      fontWeight: '700',
      letterSpacing: 0.5,
      fontSize: 12,
    },
    list: {
      gap: theme.spacing.md,
    },
    listItem: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: theme.spacing.sm,
      paddingRight: theme.spacing.md,
    },
    bullet: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: theme.colors.primary,
      marginTop: 8,
    },
    highlightText: {
      flex: 1,
      lineHeight: 22,
    },
  });
}
