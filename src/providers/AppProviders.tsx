import { useEffect, type PropsWithChildren } from 'react';
import { ThemeProvider as ExpoRouterThemeProvider } from 'expo-router';
import { useFonts, type FontSource } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { ThemeProvider } from '@/theme/ThemeProvider';
import { useTheme } from '@/theme/useTheme';

void SplashScreen.preventAutoHideAsync().catch(() => undefined);

const fontAssets = {} satisfies Record<string, FontSource>;

function NavigationThemeBridge({ children }: PropsWithChildren) {
  const { theme } = useTheme();

  return <ExpoRouterThemeProvider value={theme.navigation}>{children}</ExpoRouterThemeProvider>;
}

/** Composes root-level providers for fonts, app theme state, and Expo Router theming. */
export function AppProviders({ children }: PropsWithChildren) {
  const [fontsLoaded, fontError] = useFonts(fontAssets);
  const isReady = fontsLoaded || Boolean(fontError);

  useEffect(() => {
    if (isReady) {
      void SplashScreen.hideAsync().catch(() => undefined);
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <ThemeProvider>
      <NavigationThemeBridge>{children}</NavigationThemeBridge>
    </ThemeProvider>
  );
}
