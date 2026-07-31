import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { View, StyleSheet, FlatList, Pressable, Animated, Easing } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Card } from "@/components/common/Card";
import { Skeleton } from "@/components/common/Skeleton";
import { Text } from "@/components/common/Text";
import { useTheme } from "@/theme/useTheme";
import type { AegisTheme } from "@/theme/themes";
import { usePressAnimation } from "@/hooks/usePressAnimation";
import { workoutCategories, featuredWorkouts } from "../data/mockData";
import type { WorkoutCategoryId } from "../data/mockData";

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

function getDifficultyColor(difficulty: string | undefined, theme: AegisTheme) {
  switch (difficulty) {
    case "Beginner":
      return theme.colors.success;
    case "Intermediate":
      return theme.colors.warning;
    case "Advanced":
      return theme.colors.error;
    default:
      return theme.colors.primary;
  }
}

const CATEGORY_CARD_WIDTH = 138;
const CATEGORY_CARD_MIN_HEIGHT = 155;
const CATEGORY_ICON_WRAP_SIZE = 48;
const CATEGORY_ICON_SIZE = 26;

const WorkoutCategoryCard = memo(function WorkoutCategoryCard({
  category,
  selected,
  styles,
  onSelect,
}: {
  category: (typeof workoutCategories)[number];
  selected: boolean;
  styles: ReturnType<typeof createStyles>;
  onSelect: (id: WorkoutCategoryId) => void;
}) {
  const { theme } = useTheme();
  // @ts-ignore - mock data typing issue, safe for UI
  const difficultyLabel = featuredWorkouts[category.id]?.difficulty;
  const difficultyColor = getDifficultyColor(difficultyLabel, theme);
  const iconBgColor = hexToRgba(difficultyColor, 0.22);

  const { pressProgress, handlePressIn, handlePressOut } = usePressAnimation({ pressScale: 0.97, duration: 90 });

  const glowStyle = useMemo(
    () =>
      ({
        shadowColor: difficultyColor,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 4,
      }) as const,
    [difficultyColor],
  );

  const selectionScale = useMemo(
    () => new Animated.Value(selected ? 1.02 : 1),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    Animated.timing(selectionScale, {
      toValue: selected ? 1.02 : 1,
      duration: 150,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [selected, selectionScale]);

  const blendedStyle = useMemo(
    () => ({
      transform: [
        { scale: Animated.multiply(pressProgress.interpolate({ inputRange: [0, 1], outputRange: [1, 0.97] }), selectionScale) },
      ],
    }),
    [pressProgress, selectionScale]
  );

  const handlePress = useCallback(() => {
    onSelect(category.id);
  }, [category.id, onSelect]);

  return (
    <Animated.View style={[styles.categoryCardWrapper, blendedStyle]}>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ selected }}
        accessibilityLabel={`${category.title}. ${category.subtitle}. Workout category.`}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.categoryCardPressable}
      >
        <Card
          padding="medium"
          variant="elevated"
          style={[styles.categoryCard, glowStyle, selected && { borderColor: difficultyColor, borderWidth: 1.5 }]}
        >
          <View style={styles.categoryCardTopRow}>
            <View style={[styles.categoryIconWrap, { backgroundColor: iconBgColor, borderColor: difficultyColor }]}>
              <MaterialCommunityIcons
                name={category.iconName}
                size={theme.metrics.scaleSize(CATEGORY_ICON_SIZE)}
                color={selected ? theme.colors.primary : theme.colors.text.secondary}
              />
            </View>
            <View style={styles.categoryCountBadge}>
              <Text style={styles.categoryCountText} numberOfLines={1}>
                {category.subtitle}
              </Text>
            </View>
          </View>
          <View style={styles.categoryCardBottom}>
            <Text variant="heading3" numberOfLines={1} style={styles.categoryTitleText}>
              {category.title}
            </Text>
            <Text variant="caption" color="text.secondary" numberOfLines={1}>
              {difficultyLabel}
            </Text>
          </View>
        </Card>
      </Pressable>
    </Animated.View>
  );
});

export const WorkoutCategoriesSection = memo(function WorkoutCategoriesSection({ isLoading }: { isLoading?: boolean }) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [selectedCategory, setSelectedCategory] = useState<WorkoutCategoryId>(workoutCategories[0].id);

  const handleSelectCategory = useCallback((id: WorkoutCategoryId) => {
    setSelectedCategory(id);
  }, []);

  const renderCategory = useCallback(
    ({ item }: { item: (typeof workoutCategories)[number] }) => (
      <WorkoutCategoryCard
        category={item}
        selected={item.id === selectedCategory}
        onSelect={handleSelectCategory}
        styles={styles}
      />
    ),
    [handleSelectCategory, selectedCategory, styles]
  );

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Skeleton width={180} height={28} style={styles.sectionTitle} />
      ) : (
        <Text variant="heading2" style={styles.sectionTitle}>Explore Categories</Text>
      )}
      
      {isLoading ? (
        <View style={[styles.listContent, { flexDirection: "row", overflow: "hidden" }]}>
          {[1, 2, 3, 4].map((i) => (
            <View key={i} style={styles.categoryCardWrapper}>
              <Card padding="medium" style={styles.categoryCard}>
                <View style={styles.categoryCardTopRow}>
                  <Skeleton width={48} height={48} borderRadius={24} />
                  <Skeleton width={32} height={20} borderRadius={10} />
                </View>
                <View>
                  <Skeleton width={80} height={20} style={{ marginBottom: 4 }} />
                  <Skeleton width={100} height={14} />
                </View>
              </Card>
            </View>
          ))}
        </View>
      ) : (
      <FlatList
        data={workoutCategories}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={renderCategory}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
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
      marginBottom: theme.spacing.md,
      paddingHorizontal: theme.spacing.md,
    },
    listContent: {
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      gap: theme.spacing.md,
    },
    categoryCardWrapper: {
      width: theme.metrics.scaleSize(CATEGORY_CARD_WIDTH),
      minHeight: theme.metrics.scaleSize(CATEGORY_CARD_MIN_HEIGHT),
    },
    categoryCardPressable: {
      flex: 1,
    },
    categoryCard: {
      flex: 1,
      justifyContent: "space-between",
      borderRadius: theme.radius.xl,
      backgroundColor: theme.colors.surface,
      elevation: 2,
      shadowOpacity: 0.05,
      borderWidth: 1.5,
      borderColor: "transparent",
    },
    categoryCardTopRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: theme.spacing.md,
    },
    categoryIconWrap: {
      width: theme.metrics.scaleSize(CATEGORY_ICON_WRAP_SIZE),
      height: theme.metrics.scaleSize(CATEGORY_ICON_WRAP_SIZE),
      borderRadius: theme.metrics.scaleSize(CATEGORY_ICON_WRAP_SIZE) / 2,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
    },
    categoryCountBadge: {
      backgroundColor: hexToRgba(theme.colors.text.secondary, 0.1),
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: theme.radius.sm,
      maxWidth: "50%",
    },
    categoryCountText: {
      fontSize: 10,
      lineHeight: 14,
      fontWeight: "700",
      color: theme.colors.text.secondary,
    },
    categoryCardBottom: {
      flex: 1,
      justifyContent: "flex-end",
    },
    categoryTitleText: {
      marginBottom: 2,
    },
  });
}
