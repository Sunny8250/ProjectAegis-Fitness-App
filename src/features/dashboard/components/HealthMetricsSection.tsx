import React, { memo, useMemo } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Svg, { Polyline } from "react-native-svg";

import { Text } from "@/components/common/Text";
import { useTheme } from "@/theme/useTheme";
import { Skeleton } from "@/components/common/Skeleton";
import type { AegisTheme } from "@/theme/themes";
import { healthMetrics } from "../data/mockData";
import { usePressAnimation } from "@/hooks/usePressAnimation";

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

const Sparkline = memo(function Sparkline({ data, color }: { data: readonly number[], color: string }) {
  if (!data || data.length === 0) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const width = 60;
  const height = 24;

  const points = data
    .map((val, idx) => {
      const x = (idx / (data.length - 1)) * width;
      const y = height - ((val - min) / range) * height;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <Svg width={width} height={height}>
      <Polyline points={points} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
});

const HealthMetricCard = memo(function HealthMetricCard({
  metric,
  styles,
}: {
  metric: (typeof healthMetrics)[number];
  styles: ReturnType<typeof createStyles>;
}) {
  const { handlePressIn, handlePressOut } = usePressAnimation({ pressScale: 0.97 });

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={metric.accessibilityLabel}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={styles.card}
    >
      <View style={styles.cardHeader}>
        <View style={[styles.iconWrap, { backgroundColor: hexToRgba(metric.iconColor, 0.15) }]}>
          <MaterialCommunityIcons name={metric.iconName} size={18} color={metric.iconColor} />
        </View>
        <Sparkline data={metric.sparklineData} color={metric.iconColor} />
      </View>
      <Text variant="heading2" style={styles.value}>{metric.value}</Text>
      <Text variant="caption" color="text.secondary" style={styles.label}>{metric.label}</Text>
      <Text variant="small" style={[styles.support, { color: metric.support.includes("+") ? "#10B981" : metric.support.includes("-") ? "#10B981" : "#8B5CF6" }]}>{metric.support}</Text>
    </Pressable>
  );
});

export const HealthMetricsSection = memo(function HealthMetricsSection({ isLoading }: { isLoading?: boolean }) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Skeleton width={150} height={28} style={styles.sectionTitle} />
      ) : (
        <Text variant="heading2" style={styles.sectionTitle}>Your Health</Text>
      )}
      <View style={styles.grid}>
        {isLoading ? (
          [1, 2, 3, 4].map((i) => (
            <View key={i} style={styles.card}>
              <View style={styles.cardHeader}>
                <Skeleton width={32} height={32} borderRadius={16} />
                <Skeleton width={60} height={24} />
              </View>
              <Skeleton width={80} height={24} style={{ marginBottom: 4 }} />
              <Skeleton width={100} height={14} style={{ marginBottom: 8 }} />
              <Skeleton width={60} height={12} />
            </View>
          ))
        ) : (
          healthMetrics.map((metric) => (
            <HealthMetricCard key={metric.id} metric={metric} styles={styles} />
          ))
        )}
      </View>
    </View>
  );
});

function createStyles(theme: AegisTheme) {
  return StyleSheet.create({
    container: {
      marginBottom: theme.spacing.lg,
      paddingHorizontal: theme.spacing.md,
    },
    sectionTitle: {
      marginBottom: theme.spacing.md,
    },
    grid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      rowGap: theme.spacing.md,
    },
    card: {
      width: "48.5%",
      backgroundColor: theme.colors.surface,
      borderRadius: theme.radius.xl,
      padding: theme.spacing.md,
      elevation: 2,
      shadowOpacity: 0.03,
    },
    cardHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: theme.spacing.sm,
    },
    iconWrap: {
      width: 36,
      height: 36,
      borderRadius: 18,
      alignItems: "center",
      justifyContent: "center",
    },
    value: {
      fontWeight: "800",
      marginBottom: 2,
    },
    label: {
      fontWeight: "600",
      marginBottom: 4,
    },
    support: {
      fontSize: 10,
      fontWeight: "700",
    },
  });
}
