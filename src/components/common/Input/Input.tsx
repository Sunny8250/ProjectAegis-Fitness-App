import { memo, useMemo } from 'react';
import { TextInput, View } from 'react-native';

import { Text } from '@/components/common/Text';
import { useTheme } from '@/theme/useTheme';

import { createInputStyles } from './Input.styles';
import type { InputProps } from './Input.types';

const hasRenderableContent = (node: InputProps['label']) =>
  node !== null && node !== undefined && node !== false;

/** Accessible themed TextInput wrapper with optional label, accessories, and feedback text. */
function InputComponent({
  accessibilityHint,
  accessibilityLabel,
  containerStyle,
  disabled = false,
  editable = true,
  error,
  helperText,
  inputStyle,
  label,
  leftAccessory,
  multiline = false,
  placeholderTextColor,
  required = false,
  rightAccessory,
  style,
  textAlignVertical,
  ...textInputProps
}: InputProps) {
  const { theme } = useTheme();
  const hasError = hasRenderableContent(error);
  const showLabel = hasRenderableContent(label);
  const showHelperText = !hasError && hasRenderableContent(helperText);
  const isEditable = !disabled && editable;
  const styles = useMemo(
    () => createInputStyles(theme, { disabled, hasError }),
    [disabled, hasError, theme],
  );
  const resolvedTextAlignVertical = multiline ? textAlignVertical ?? 'top' : textAlignVertical;

  return (
    <View style={[styles.root, style]}>
      {showLabel ? (
        <View style={styles.labelRow}>
          <Text variant="caption">{label}</Text>
          {required ? (
            <Text color="error" variant="caption">
              *
            </Text>
          ) : null}
        </View>
      ) : null}

      <View
        pointerEvents={disabled ? 'none' : 'auto'}
        style={[
          styles.inputContainer,
          multiline && styles.multilineContainer,
          containerStyle,
        ]}
      >
        {hasRenderableContent(leftAccessory) ? (
          <View style={styles.accessory}>{leftAccessory}</View>
        ) : null}
        <TextInput
          {...textInputProps}
          accessibilityHint={accessibilityHint}
          accessibilityLabel={accessibilityLabel}
          editable={isEditable}
          multiline={multiline}
          placeholderTextColor={placeholderTextColor ?? theme.colors.text.secondary}
          style={[styles.input, inputStyle]}
          textAlignVertical={resolvedTextAlignVertical}
        />
        {hasRenderableContent(rightAccessory) ? (
          <View style={styles.accessory}>{rightAccessory}</View>
        ) : null}
      </View>

      {hasError ? (
        <Text color="error" style={styles.feedback} variant="caption">
          {error}
        </Text>
      ) : null}
      {showHelperText ? (
        <Text color="text.secondary" style={styles.feedback} variant="caption">
          {helperText}
        </Text>
      ) : null}
    </View>
  );
}

export const Input = memo(InputComponent);

Input.displayName = 'Input';
