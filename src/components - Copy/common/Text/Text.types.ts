import type { TextProps as NativeTextProps, TextStyle } from 'react-native';

import type { AegisTheme } from '@/theme/themes';

/** Typography variants available in the Project Aegis design system. */
export type TextVariant = keyof AegisTheme['typography'];

/** Top-level theme color tokens that can be used directly as text colors. */
export type FlatTextColorToken = Exclude<keyof AegisTheme['colors'], 'text'>;

/** Theme color tokens available for text foreground overrides. */
export type TextColorToken =
  | FlatTextColorToken
  | `text.${keyof AegisTheme['colors']['text']}`;

/** Alignment values supported by React Native text rendering. */
export type TextAlign = TextStyle['textAlign'];

/** Props for the reusable Project Aegis Text primitive. */
export type TextProps = NativeTextProps & {
  /** Typography token applied to the text. */
  variant?: TextVariant;
  /** Theme color token used as the text foreground color. */
  color?: TextColorToken;
  /** Text alignment override. */
  align?: TextAlign;
};
