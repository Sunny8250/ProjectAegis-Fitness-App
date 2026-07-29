import { createContext } from 'react';

import type { AegisTheme, ThemeMode } from './themes';

/** Values exposed by the Project Aegis theme context. */
export type ThemeContextValue = {
  theme: AegisTheme;
  mode: ThemeMode;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
};

/** React context backing the app-wide Project Aegis theme state. */
export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);
