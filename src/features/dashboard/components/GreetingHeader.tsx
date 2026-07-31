import React, { memo, useMemo } from "react";
import { View, StyleSheet, Pressable, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Text } from "@/components/common/Text";
import { useTheme } from "@/theme/useTheme";
import type { AegisTheme } from "@/theme/themes";
import { Skeleton } from "@/components/common/Skeleton";

export const GreetingHeader = memo(function GreetingHeader({ isLoading }: { isLoading?: boolean }) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const hour = new Date().getHours();
  const isMorning = hour >= 5 && hour < 12;
  const isAfternoon = hour >= 12 && hour < 17;
  const isEvening = hour >= 17;

  let greetingTitle = "Hello";
  if (isMorning) greetingTitle = "Good Morning";
  else if (isAfternoon) greetingTitle = "Good Afternoon";
  else if (isEvening) greetingTitle = "Good Evening";

  let subtext = "Ready for a new workout?";
  if (isMorning) subtext = "Rise and grind, time to conquer the day!";
  else if (isAfternoon) subtext = "Ready to push hard this afternoon?";
  else if (isEvening) subtext = "Time to wind down with an evening session.";

  return (
    <View style={styles.container}>
      <View style={styles.leftColumn}>
        <View style={styles.dateBadge}>
          {isLoading ? (
            <Skeleton width={100} height={16} />
          ) : (
            <Text variant="caption" style={styles.dateText}>
              LEVEL 12 ATHLETE
            </Text>
          )}
        </View>
        {isLoading ? (
          <Skeleton width={200} height={32} style={{ marginTop: 8 }} />
        ) : (
          <Text variant="heading1" style={styles.greetingTitle}>
            {greetingTitle}, Alex{"\n"}
            <Text variant="heading1">👋</Text>
          </Text>
        )}
        {isLoading ? (
          <Skeleton width={250} height={16} style={{ marginTop: 8 }} />
        ) : (
          <Text variant="body" color="text.secondary" style={styles.quote}>
            {subtext}
          </Text>
        )}
      </View>

      <View style={styles.rightColumn}>
        {isLoading ? (
          <Skeleton width={48} height={48} borderRadius={24} />
        ) : (
        <>
        <Pressable style={styles.notificationBtn}>
          <MaterialCommunityIcons name="bell-outline" size={24} color={theme.colors.text.primary} />
          <View style={styles.notificationDot} />
        </Pressable>
        <View style={styles.avatarWrap}>
          {/* Mock avatar */}
          <View style={styles.avatarPlaceholder}>
            <Text variant="heading2" color="white">A</Text>
          </View>
        </View>
        </>
        )}
      </View>
    </View>
  );
});

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

function createStyles(theme: AegisTheme) {
  return StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      paddingHorizontal: theme.spacing.md,
      paddingTop: theme.spacing.lg,
      paddingBottom: theme.spacing.md,
    },
    leftColumn: {
      flex: 1,
      gap: 4,
      paddingRight: theme.spacing.md,
    },
    dateBadge: {
      backgroundColor: hexToRgba(theme.colors.primary, 0.1),
      alignSelf: "flex-start",
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: theme.radius.full,
      marginBottom: 4,
    },
    dateText: {
      fontWeight: "700",
      letterSpacing: 0.5,
    },
    greetingTitle: {
      fontSize: 28,
      lineHeight: 34,
      fontWeight: "700",
      color: theme.colors.text.primary,
    },
    quote: {
      fontStyle: "italic",
      marginTop: 4,
      fontSize: 13,
      lineHeight: 18,
    },
    rightColumn: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.md,
    },
    notificationBtn: {
      position: "relative",
      padding: 4,
    },
    notificationDot: {
      position: "absolute",
      top: 4,
      right: 4,
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: theme.colors.error,
      borderWidth: 2,
      borderColor: theme.colors.background,
    },
    avatarWrap: {
      width: 48,
      height: 48,
      borderRadius: 24,
      overflow: "hidden",
      borderWidth: 2,
      borderColor: theme.colors.primary,
    },
    avatarPlaceholder: {
      flex: 1,
      backgroundColor: theme.colors.primary,
      alignItems: "center",
      justifyContent: "center",
    },
  });
}
