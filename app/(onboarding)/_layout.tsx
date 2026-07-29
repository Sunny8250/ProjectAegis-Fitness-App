import { Stack } from 'expo-router';

/** Groups onboarding routes behind a stack for future onboarding flow screens. */
export default function OnboardingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
