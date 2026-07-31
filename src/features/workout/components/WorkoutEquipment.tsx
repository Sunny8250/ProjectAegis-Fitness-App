import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "@/theme/useTheme";
import type { AegisTheme } from "@/theme/themes";
import { Text } from "@/components/common/Text";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface WorkoutEquipmentProps {
  equipment: string[];
}

export const WorkoutEquipment = ({ equipment }: WorkoutEquipmentProps) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Text variant="title" style={styles.sectionTitle}>Equipment</Text>
      
      <View style={styles.chipRow}>
        {equipment.length === 0 ? (
          <View style={styles.chip}>
            <MaterialCommunityIcons name="human" size={16} color={theme.colors.text} />
            <Text variant="body" style={styles.chipText}>Bodyweight Only</Text>
          </View>
        ) : (
          equipment.map((item, index) => (
            <View key={index} style={styles.chip}>
              <MaterialCommunityIcons 
                name={getIconForEquipment(item)} 
                size={16} 
                color={theme.colors.text.secondary} 
              />
              <Text variant="body" style={styles.chipText}>{item}</Text>
            </View>
          ))
        )}
      </View>
    </View>
  );
};

function getIconForEquipment(item: string) {
  const lowerItem = item.toLowerCase();
  if (lowerItem.includes('dumbbell')) return 'dumbbell';
  if (lowerItem.includes('kettlebell')) return 'kettlebell';
  if (lowerItem.includes('bench')) return 'seat-outline';
  if (lowerItem.includes('band')) return 'jump-rope';
  if (lowerItem.includes('barbell')) return 'weight-lifter';
  return 'boxing-glove'; // default icon
}

function createStyles(theme: AegisTheme) {
  return StyleSheet.create({
    container: {
      marginBottom: theme.spacing.xxl,
    },
    sectionTitle: {
      marginBottom: theme.spacing.md,
      fontWeight: '700',
    },
    chipRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
    },
    chip: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: theme.radius.lg,
      gap: 8,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    chipText: {
      fontWeight: '500',
    },
  });
}
