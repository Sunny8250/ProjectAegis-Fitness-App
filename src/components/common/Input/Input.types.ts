import type { ReactNode } from 'react';
import type { StyleProp, TextInputProps, TextStyle, ViewStyle } from 'react-native';

/** Props for the reusable Project Aegis Input component. */
export type InputProps = Omit<TextInputProps, 'editable' | 'style'> & {
  /** Optional text or node rendered above the input container. */
  label?: ReactNode;
  /** Supporting text rendered below the input when no error is present. */
  helperText?: ReactNode;
  /** Error text rendered below the input and reflected in input styling. */
  error?: ReactNode;
  /** Prevents editing and focus while applying disabled styling. */
  disabled?: boolean;
  /** Shows a required marker beside the label. */
  required?: boolean;
  /** Controls native editability when the input is not disabled. */
  editable?: TextInputProps['editable'];
  /** Optional element rendered before the text field. */
  leftAccessory?: ReactNode;
  /** Optional element rendered after the text field. */
  rightAccessory?: ReactNode;
  /** Additional styles for the outer wrapper. */
  style?: StyleProp<ViewStyle>;
  /** Additional styles for the input container. */
  containerStyle?: StyleProp<ViewStyle>;
  /** Additional styles for the native TextInput. */
  inputStyle?: StyleProp<TextStyle>;
};
