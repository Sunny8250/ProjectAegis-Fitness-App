import React, { useMemo } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useTheme } from "@/theme/useTheme";
import { Text } from "@/components/common/Text";
import type { AegisTheme } from "@/theme/themes";

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

export function BottomTabBar({ state, descriptors, navigation }: any) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.containerWrap}>
      <View style={styles.tabBar}>
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          let iconName: any = "help";
          if (route.name === "index") {
            iconName = isFocused ? "home" : "home-outline";
          } else if (route.name === "profile") {
            iconName = isFocused ? "account" : "account-outline";
          } else if (route.name === "explore") {
            iconName = isFocused ? "compass" : "compass-outline";
          } else if (route.name === "analytics") {
            iconName = isFocused ? "chart-box" : "chart-box-outline";
          }

          const color = isFocused ? theme.colors.primary : theme.colors.text.tertiary;

          return (
            <Pressable
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tabItem}
            >
              <View style={[styles.iconWrap, isFocused && styles.iconWrapFocused]}>
                <MaterialCommunityIcons name={iconName} size={24} color={color} />
              </View>
              {isFocused && (
                <Text style={[styles.label, { color }]}>{label as string}</Text>
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

function createStyles(theme: AegisTheme) {
  return StyleSheet.create({
    containerWrap: {
      position: "absolute",
      bottom: 24,
      left: 24,
      right: 24,
      alignItems: "center",
      justifyContent: "center",
    },
    tabBar: {
      flexDirection: "row",
      backgroundColor: theme.colors.surface,
      borderRadius: theme.radius.full,
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: 12,
      elevation: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.1,
      shadowRadius: 20,
      gap: 8,
      borderWidth: 1,
      borderColor: hexToRgba(theme.colors.text.secondary, 0.05),
    },
    tabItem: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: theme.radius.full,
    },
    iconWrap: {
      alignItems: "center",
      justifyContent: "center",
    },
    iconWrapFocused: {
      // Could add a slight scale or background here
    },
    label: {
      fontSize: 12,
      fontWeight: "700",
    },
  });
}
