import React from 'react';
import { View, StyleSheet, Modal, TouchableWithoutFeedback } from 'react-native';
import { useTheme } from '@/theme/useTheme';
import type { AegisTheme } from '@/theme/themes';
import { Text } from '@/components/common/Text';
import { Button } from '@/components/common/Button';
import Animated, { FadeIn, FadeOut, SlideInDown, SlideOutDown } from 'react-native-reanimated';

interface WorkoutExitModalProps {
  isVisible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const WorkoutExitModal = ({ isVisible, onConfirm, onCancel }: WorkoutExitModalProps) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  if (!isVisible) return null;

  return (
    <Modal transparent visible={isVisible} animationType="none" onRequestClose={onCancel}>
      <TouchableWithoutFeedback onPress={onCancel}>
        <Animated.View 
          entering={FadeIn.duration(200)} 
          exiting={FadeOut.duration(200)} 
          style={styles.overlay}
        >
          <TouchableWithoutFeedback>
            <Animated.View 
              entering={SlideInDown.springify().damping(15)} 
              exiting={SlideOutDown.duration(200)} 
              style={styles.modalContent}
            >
              <Text variant="h2" style={styles.title}>End this workout?</Text>
              
              <Text variant="body" color="secondary" style={styles.message}>
                Your session is still in progress. You can keep training and finish it properly.
              </Text>

              <View style={styles.actions}>
                <Button 
                  variant="outline" 
                  onPress={onCancel} 
                  style={styles.cancelButton}
                >
                  Keep Training
                </Button>
                <Button 
                  variant="primary" 
                  onPress={onConfirm} 
                  style={styles.confirmButton}
                >
                  End Workout
                </Button>
              </View>
            </Animated.View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

function createStyles(theme: AegisTheme) {
  return StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.7)',
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing.xl,
    },
    modalContent: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.radius.lg,
      padding: theme.spacing.xl,
      width: '100%',
      maxWidth: 400,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.5,
      shadowRadius: 20,
      elevation: 24,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    title: {
      marginBottom: theme.spacing.md,
      color: theme.colors.text.primary,
    },
    message: {
      marginBottom: theme.spacing.xl,
      lineHeight: 24,
    },
    actions: {
      flexDirection: 'column',
      gap: theme.spacing.md,
      width: '100%',
    },
    cancelButton: {
      width: '100%',
    },
    confirmButton: {
      width: '100%',
      backgroundColor: theme.colors.error,
    },
  });
}
