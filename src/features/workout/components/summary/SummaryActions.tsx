import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useTheme } from '@/theme/useTheme';
import type { AegisTheme } from '@/theme/themes';
import { Button } from '@/components/common/Button';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets, type EdgeInsets } from 'react-native-safe-area-context';

export const SummaryActions = () => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = createStyles(theme, insets);
  const router = useRouter();

  const handleShare = () => {
    Alert.alert('Share', 'Screenshot generated and share sheet opened! (Simulation)');
  };

  const handleDetailedSummary = () => {
    Alert.alert('Detailed Summary', 'Navigating to detailed breakdown...');
  };

  const handleReturnHome = () => {
    // Usually we would navigate to the actual home tab or pop to top
    // For now, backing out twice or routing to home
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <Button 
        variant="outline" 
        onPress={handleShare}
        style={styles.shareButton}
        leftIcon={<MaterialCommunityIcons name="export-variant" size={20} color={theme.colors.text.primary} />}
      >
        Share Achievement
      </Button>

      <Button 
        variant="primary" 
        size="large"
        onPress={handleDetailedSummary}
        style={styles.primaryButton}
      >
        View Detailed Summary
      </Button>

      <Button 
        variant="ghost" 
        onPress={handleReturnHome}
        style={styles.secondaryButton}
      >
        Return Home
      </Button>
    </View>
  );
};

function createStyles(theme: AegisTheme, insets: EdgeInsets) {
  return StyleSheet.create({
    container: {
      gap: theme.spacing.md,
      paddingTop: theme.spacing.xl,
    },
    shareButton: {
      marginBottom: theme.spacing.md,
    },
    primaryButton: {
      width: '100%',
    },
    secondaryButton: {
      width: '100%',
    },
  });
}
