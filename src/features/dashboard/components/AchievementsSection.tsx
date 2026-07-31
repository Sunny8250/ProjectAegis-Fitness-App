import React, { memo, useMemo } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Card } from "@/components/common/Card";
import { Skeleton } from "@/components/common/Skeleton";
import { Text } from "@/components/common/Text";
import { useTheme } from "@/theme/useTheme";
import type { AegisTheme } from "@/theme/themes";
import { achievements } from "../data/mockData";
import type { IconName } from "../data/mockData";

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

const AchievementCard = memo(function AchievementCard({
  achievement,
  styles,
}: {
  achievement: (typeof achievements)[number];
  styles: ReturnType<typeof createStyles>;
}) {
  return (
    <Card padding="medium" variant="elevated" style={styles.card}>
      <View style={[styles.iconWrap, { backgroundColor: hexToRgba(achievement.color, 0.15) }]}>
        <MaterialCommunityIcons name={achievement.icon as IconName} size={28} color={achievement.color} />
      </View>
      <View style={styles.textWrap}>
        <Text variant="heading3" style={styles.title}>{achievement.title}</Text>
        <Text variant="caption" color="text.secondary">{achievement.subtitle}</Text>
      </View>
    </Card>
  );
});

export const AchievementsSection = memo(function AchievementsSection({ isLoading }: { isLoading?: boolean }) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Skeleton width={180} height={28} style={styles.sectionTitle} />
      ) : (
        <Text variant="heading2" style={styles.sectionTitle}>Recent Achievements</Text>
      )}

      {isLoading ? (
        <View style={[styles.listContent, { flexDirection: "row", overflow: "hidden" }]}>
          {[1, 2, 3].map((i) => (
            <Card key={i} padding="medium" style={styles.card}>
              <View style={styles.iconWrap}>
                <Skeleton width={40} height={40} borderRadius={20} />
              </View>
              <View style={styles.textWrap}>
                <Skeleton width={80} height={16} style={{ marginBottom: 4 }} />
                <Skeleton width={100} height={12} />
              </View>
            </Card>
          ))}
        </View>
      ) : (
        <FlatList
          data={achievements}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => <AchievementCard achievement={item} styles={styles} />}
        />
      )}
    </View>
  );
});

function createStyles(theme: AegisTheme) {
  return StyleSheet.create({
    container: {
      marginBottom: theme.spacing.xl, // Last section before bottom padding
    },
    sectionTitle: {
      marginBottom: theme.spacing.md,
      paddingHorizontal: theme.spacing.md,
    },
    listContent: {
      paddingHorizontal: theme.spacing.md,
      gap: theme.spacing.sm,
    },
    card: {
      width: 160,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.colors.surface,
      borderRadius: theme.radius.lg,
      borderWidth: 0,
      elevation: 2,
      shadowOpacity: 0.05,
      gap: theme.spacing.sm,
    },
    iconWrap: {
      width: 48,
      height: 48,
      borderRadius: 24,
      alignItems: "center",
      justifyContent: "center",
    },
    textWrap: {
      flex: 1,
    },
    title: {
      fontWeight: "800",
      marginBottom: 2,
    },
  });
}
