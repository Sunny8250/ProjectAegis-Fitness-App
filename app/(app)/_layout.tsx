import { Stack } from 'expo-router';

/** Groups authenticated app routes behind a stack until tabs are introduced later. */
export default function AppLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
