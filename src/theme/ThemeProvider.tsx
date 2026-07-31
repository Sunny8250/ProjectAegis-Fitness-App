import { useCallback, useMemo, useState, type PropsWithChildren } from 'react';
import { useColorScheme, useWindowDimensions } from 'react-native';

import { createResponsiveMetrics } from './responsive';
import { ThemeContext } from './ThemeContext';
import { createTheme, type ResolvedThemeMode, type ThemeMode } from './themes';

type ThemeProviderProps = PropsWithChildren<{
  initialMode?: ThemeMode;
}>;

const resolveThemeMode = (
  mode: ThemeMode,
  systemScheme: ReturnType<typeof useColorScheme>,
): ResolvedThemeMode => {
  if (mode === 'system') {
    return systemScheme === 'dark' ? 'dark' : 'light';
  }

  return mode;
};

/** Provides Project Aegis theme state, system detection, and theme switching actions. */
export function ThemeProvider({ children, initialMode = 'system' }: ThemeProviderProps) {
  const systemScheme = useColorScheme();
  const { height, width } = useWindowDimensions();
  const [mode, setMode] = useState<ThemeMode>(initialMode);

  const resolvedMode = resolveThemeMode(mode, systemScheme);
  const metrics = useMemo(
    () => createResponsiveMetrics(width, height),
    [height, width],
  );
  const theme = useMemo(
    () => createTheme(resolvedMode, metrics),
    [metrics, resolvedMode],
  );

  const setTheme = useCallback((nextMode: ThemeMode) => {
    setMode(nextMode);
  }, []);

  const toggleTheme = useCallback(() => {
    setMode((currentMode) => {
      const currentResolvedMode = resolveThemeMode(currentMode, systemScheme);
      return currentResolvedMode === 'dark' ? 'light' : 'dark';
    });
  }, [systemScheme]);

  const value = useMemo(
    () => ({
      theme,
      mode,
      toggleTheme,
      setTheme,
    }),
    [mode, setTheme, theme, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
