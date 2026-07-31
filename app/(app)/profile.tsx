import { StyleSheet, View } from "react-native";

import { Screen } from "@/components/common/Screen";
import { Text } from "@/components/common/Text";
import { useTheme } from "@/theme/useTheme";

export default function ProfileScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <Screen contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <View style={styles.avatar}>
          <Text variant="display" color="white">
            A
          </Text>
        </View>
        <Text variant="heading2" style={styles.name}>
          Athlete
        </Text>
        <Text variant="caption" color="text.secondary">
          Member since Jan 2026
        </Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text variant="metric" color="primary">
            47
          </Text>
          <Text variant="caption" color="text.secondary">
            Workouts
          </Text>
        </View>
        <View style={styles.statCard}>
          <Text variant="metric" color="primary">
            12
          </Text>
          <Text variant="caption" color="text.secondary">
            Day Streak
          </Text>
        </View>
        <View style={styles.statCard}>
          <Text variant="metric" color="primary">
            98%
          </Text>
          <Text variant="caption" color="text.secondary">
            Consistency
          </Text>
        </View>
      </View>

      <Text variant="caption" color="text.tertiary" style={styles.disclaimer}>
        Profile features coming soon.
      </Text>
    </Screen>
  );
}

function createStyles(theme: ReturnType<typeof useTheme>["theme"]) {
  return StyleSheet.create({
    content: {
      gap: theme.spacing.lg,
      paddingBottom: theme.spacing.huge,
    },
    hero: {
      alignItems: "center",
      gap: theme.spacing.sm,
      paddingTop: theme.spacing.xl,
    },
    avatar: {
      width: 80,
      height: 80,
      borderRadius: theme.radius.full,
      backgroundColor: theme.colors.primary,
      alignItems: "center",
      justifyContent: "center",
      ...theme.shadows,
    },
    name: {
      marginTop: theme.spacing.sm,
    },
    statsRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: theme.spacing.md,
      gap: theme.spacing.sm,
    },
    statCard: {
      flex: 1,
      alignItems: "center",
      gap: theme.spacing.xs,
      paddingVertical: theme.spacing.lg,
      borderRadius: theme.radius.card,
      backgroundColor: theme.colors.surface,
      ...theme.shadows,
    },
    disclaimer: {
      textAlign: "center",
      paddingHorizontal: theme.spacing.xl,
      marginTop: theme.spacing.lg,
    },
  });
}
