import { useContext } from 'react';

import { ThemeContext, type ThemeContextValue } from './ThemeContext';

/** Reads the Project Aegis theme context and guards against missing providers. */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider.');
  }

  return context;
}
