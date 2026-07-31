import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { useTheme } from "@/theme/useTheme";
import type { AegisTheme } from "@/theme/themes";
import { Button } from "@/components/common/Button";
import { LinearGradient } from "expo-linear-gradient";
import { hexAlpha } from "@/utils/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface WorkoutActionBarProps {
  onStart: () => void;
  onPreview: () => void;
}

export const WorkoutActionBar = ({ onStart, onPreview }: WorkoutActionBarProps) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <LinearGradient 
        colors={['transparent', theme.colors.background]} 
        style={StyleSheet.absoluteFill} 
      />
      
      <View style={styles.actions}>
        <Button 
          variant="outline" 
          size="large" 
          onPress={onPreview}
          style={styles.previewBtn}
        >
          Preview
        </Button>
        <Button 
          variant="primary" 
          size="large" 
          onPress={onStart}
          style={styles.startBtn}
          leftIcon={<MaterialCommunityIcons name="play" size={24} color="#FFF" />}
        >
          Start Workout
        </Button>
      </View>
    </View>
  );
};

function createStyles(theme: AegisTheme) {
  return StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      paddingTop: 30,
      paddingHorizontal: theme.spacing.lg,
      paddingBottom: Platform.OS === 'ios' ? 40 : theme.spacing.xl,
      borderTopWidth: 1,
      borderTopColor: 'transparent',
    },
    actions: {
      flexDirection: 'row',
      gap: theme.spacing.md,
    },
    previewBtn: {
      flex: 1,
      backgroundColor: theme.colors.surface,
    },
    startBtn: {
      flex: 2,
      shadowColor: theme.colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 12,
      elevation: 6,
    },
  });
}
