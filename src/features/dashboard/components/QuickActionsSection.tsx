import React, { memo, useMemo } from "react";
import { View, StyleSheet, FlatList, Pressable, Animated } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Card } from "@/components/common/Card";
import { Skeleton } from "@/components/common/Skeleton";
import { Text } from "@/components/common/Text";
import { useTheme } from "@/theme/useTheme";
import type { AegisTheme } from "@/theme/themes";
import { usePressAnimation } from "@/hooks/usePressAnimation";
import { quickActions } from "../data/mockData";
import type { IconName } from "../data/mockData";

const QUICK_ACTION_PRESS_SCALE = 0.95;
const QUICK_ACTION_PRESS_DURATION_MS = 100;

function hexToRgba(hex: string, alpha: number) {
  if (!hex) return `rgba(0,0,0,${alpha})`;
  const cleaned = hex.replace("#", "");
  const bigint = parseInt(
    cleaned.length === 3 ? cleaned.split("").map((c) => c + c).join("") : cleaned,
    16
  );
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const QuickActionCard = memo(function QuickActionCard({
  action,
  styles,
}: {
  action: (typeof quickActions)[number];
  styles: ReturnType<typeof createStyles>;
}) {
  const { theme } = useTheme();
  const color = theme.colors[action.colorKey as keyof AegisTheme["colors"]] as string;

  const { pressProgress, handlePressIn, handlePressOut } = usePressAnimation({
    pressScale: QUICK_ACTION_PRESS_SCALE,
    duration: QUICK_ACTION_PRESS_DURATION_MS,
  });

  const scale = pressProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [1, QUICK_ACTION_PRESS_SCALE],
  });

  return (
    <Animated.View style={[styles.actionWrapper, { transform: [{ scale }] }]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={action.accessibilityLabel}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.actionPressable}
      >
        <View style={[styles.actionCard, { shadowColor: color }]}>
          <View style={[styles.iconWrap, { backgroundColor: hexToRgba(color, 0.15) }]}>
            <MaterialCommunityIcons name={action.iconName} size={24} color={color} />
          </View>
          <Text variant="heading3" style={styles.actionTitle}>{action.title}</Text>
          <Text variant="caption" color="text.secondary">{action.subtitle}</Text>
        </View>
      </Pressable>
    </Animated.View>
  );
});

export const QuickActionsSection = memo(function QuickActionsSection({ isLoading }: { isLoading?: boolean }) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <Text variant="heading3" style={styles.sectionTitle}>Quick Actions</Text>
      {isLoading ? (
        <View style={[styles.listContent, { flexDirection: "row", overflow: "hidden" }]}>
          {[1, 2, 3, 4].map((i) => (
            <View key={i} style={styles.actionWrapper}>
              <Card padding="medium" style={styles.actionCard}>
                <Skeleton width={32} height={32} borderRadius={16} style={{ marginBottom: 12 }} />
                <Skeleton width={60} height={14} />
              </Card>
            </View>
          ))}
        </View>
      ) : (
        <FlatList
          data={quickActions}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => <QuickActionCard action={item} styles={styles} />}
        />
      )}
    </View>
  );
});

function createStyles(theme: AegisTheme) {
  return StyleSheet.create({
    container: {
      marginBottom: theme.spacing.lg,
    },
    sectionTitle: {
      marginBottom: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
      color: theme.colors.text.secondary,
    },
    listContent: {
      paddingHorizontal: theme.spacing.md,
      gap: theme.spacing.sm,
    },
    actionWrapper: {
      width: 110,
    },
    actionPressable: {
      flex: 1,
    },
    actionCard: {
      flex: 1,
      backgroundColor: theme.colors.surface,
      borderRadius: theme.radius.lg,
      padding: theme.spacing.md,
      alignItems: "center",
      justifyContent: "center",
      elevation: 4,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
    },
    iconWrap: {
      width: 48,
      height: 48,
      borderRadius: 24,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: theme.spacing.sm,
    },
    actionTitle: {
      fontSize: 14,
      fontWeight: "700",
      marginBottom: 2,
    },
  });
}
