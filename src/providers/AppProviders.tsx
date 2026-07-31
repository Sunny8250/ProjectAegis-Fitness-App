import type { PropsWithChildren } from 'react';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';

import { ThemeProvider } from '@/theme/ThemeProvider';

/**
 * Centralizes application-wide providers.
 * Add future global providers here around ThemeProvider or its children as needed.
 *
 * SafeAreaProvider is outermost so every screen can read insets. Seeding it
 * with `initialWindowMetrics` avoids a first-frame layout jump.
 */
export function AppProviders({ children }: PropsWithChildren) {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <ThemeProvider>{children}</ThemeProvider>
    </SafeAreaProvider>
  );
}
