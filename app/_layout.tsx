import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { AppProviders } from '@/providers/AppProviders';

/**
 * Application entry layout for Expo Router.
 * AppProviders wraps navigation so every route receives global app context.
 */
export default function RootLayout() {
  return (
    <AppProviders>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'fade',
        }}
      />
      <StatusBar style="auto" />
    </AppProviders>
  );
}
