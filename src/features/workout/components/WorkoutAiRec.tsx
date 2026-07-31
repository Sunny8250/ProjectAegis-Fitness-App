import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@/theme/useTheme";
import type { AegisTheme } from "@/theme/themes";
import { hexAlpha } from "@/utils/colors";
import { Text } from "@/components/common/Text";
import { MOCK_WORKOUT_DETAIL } from "../data/mockWorkoutDetail";

interface WorkoutAiRecProps {
  recommendation: typeof MOCK_WORKOUT_DETAIL.aiRecommendation;
}

export const WorkoutAiRec = ({ recommendation }: WorkoutAiRecProps) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <MaterialCommunityIcons name="robot-outline" size={20} color={theme.colors.primary} />
          <Text variant="title" style={styles.title}>Aegis AI Match</Text>
        </View>
        <Text variant="small" style={styles.generatedText}>Generated {recommendation.generatedAt}</Text>
      </View>
      
      <View style={styles.poweredByRow}>
        <Text variant="small" style={styles.poweredByLabel}>Powered by:</Text>
        <View style={styles.poweredByTags}>
          <View style={styles.tag}>
            <MaterialCommunityIcons name="heart-pulse" size={12} color={theme.colors.error} />
            <Text variant="small" style={styles.tagText}>Recovery</Text>
          </View>
          <View style={styles.tag}>
            <MaterialCommunityIcons name="lightning-bolt" size={12} color={theme.colors.warning} />
            <Text variant="small" style={styles.tagText}>Readiness</Text>
          </View>
          <View style={styles.tag}>
            <MaterialCommunityIcons name="history" size={12} color={theme.colors.info} />
            <Text variant="small" style={styles.tagText}>History</Text>
          </View>
          <View style={styles.tag}>
            <MaterialCommunityIcons name="target" size={12} color={theme.colors.success} />
            <Text variant="small" style={styles.tagText}>Goals</Text>
          </View>
        </View>
      </View>

      <View style={styles.reasonsList}>
        {recommendation.reasons.map((reason, index) => (
          <View key={index} style={styles.reasonRow}>
            <MaterialCommunityIcons name="check-circle" size={18} color={theme.colors.primary} />
            <Text variant="body" style={styles.reasonText}>{reason}</Text>
          </View>
        ))}
      </View>
    </Animated.View>
  );
};

function createStyles(theme: AegisTheme) {
  return StyleSheet.create({
    container: {
      backgroundColor: hexAlpha(theme.colors.surface, 0.7),
      borderRadius: theme.radius.xl,
      padding: theme.spacing.lg,
      marginBottom: theme.spacing.xl,
      borderWidth: 1,
      borderColor: hexAlpha(theme.colors.border, 0.5),
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      elevation: 3,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme.spacing.md,
      paddingBottom: theme.spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: hexAlpha(theme.colors.border, 0.5),
    },
    headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    title: {
      fontWeight: '700',
    },
    generatedText: {
      color: theme.colors.text.secondary,
    },
    poweredByRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: theme.spacing.md,
      gap: 8,
    },
    poweredByLabel: {
      color: theme.colors.text.secondary,
      fontWeight: '600',
    },
    poweredByTags: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 6,
    },
    tag: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: theme.radius.sm,
      gap: 4,
    },
    tagText: {
      fontSize: 10,
      fontWeight: '600',
    },
    reasonsList: {
      gap: 12,
    },
    reasonRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 12,
    },
    reasonText: {
      flex: 1,
      lineHeight: 20,
    },
  });
}
