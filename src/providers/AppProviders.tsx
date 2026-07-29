import type { PropsWithChildren } from 'react';

import { ThemeProvider } from '@/theme/ThemeProvider';

/**
 * Centralizes application-wide providers.
 * Add future global providers here around ThemeProvider or its children as needed.
 */
export function AppProviders({ children }: PropsWithChildren) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
