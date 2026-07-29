import type { ReactElement, ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

import type { IconName } from '@/components/common/Icon';

/** Empty-state icon content, either an app icon name or custom element. */
export type EmptyStateIcon = IconName | ReactElement;

/** Props for the reusable Project Aegis EmptyState component. */
export type EmptyStateProps = {
  /** Required title describing the empty condition. */
  title: ReactNode;
  /** Optional supporting description rendered below the title. */
  description?: ReactNode;
  /** Optional decorative icon rendered above the title. */
  icon?: EmptyStateIcon;
  /** Optional call-to-action or custom content rendered below the text. */
  action?: ReactNode;
  /** Centers the empty state within the available layout space. */
  fullscreen?: boolean;
  /** Additional styles for the root container. */
  style?: StyleProp<ViewStyle>;
  /** Accessibility label forwarded to the root container. */
  accessibilityLabel?: string;
  /** Accessibility hint forwarded to the root container. */
  accessibilityHint?: string;
};
