import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

/** Props for the reusable Project Aegis ProgressRing primitive. */
export type ProgressRingProps = {
  /** Completion fraction, 0–1. Values outside the range are clamped. */
  progress: number;
  /** Outer diameter of the ring in dp. */
  size: number;
  /** Ring thickness in dp. */
  strokeWidth?: number;
  /** Stroke colour of the progress arc. Defaults to the theme primary. */
  color?: string;
  /** Optional two-stop gradient applied to the arc, overriding `color`. */
  gradientColors?: readonly [string, string];
  /** Colour of the unfilled track. Defaults to a tint of `color`. */
  trackColor?: string;
  /** Duration of the progress transition in ms. Set 0 to disable animation. */
  animationDurationMs?: number;
  /** Rounds the arc ends. Defaults to true. */
  rounded?: boolean;
  /** Content rendered centred inside the ring. */
  children?: ReactNode;
  /** Additional styles for the ring container. */
  style?: StyleProp<ViewStyle>;
  /** Announced by screen readers in place of the raw percentage. */
  accessibilityLabel?: string;
  /** Hides the ring from screen readers when the parent already describes it. */
  accessibilityHidden?: boolean;
  testID?: string;
};
