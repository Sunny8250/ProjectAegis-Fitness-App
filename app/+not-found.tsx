import { router } from 'expo-router';

import { Button } from '@/components/common/Button';
import { EmptyState } from '@/components/common/EmptyState';
import { Screen } from '@/components/common/Screen';

export default function NotFoundScreen() {
  return (
    <Screen>
      <EmptyState
        action={<Button onPress={() => router.replace('/')}>Go Home</Button>}
        description="The page you're looking for doesn't exist."
        fullscreen
        title="Page Not Found"
      />
    </Screen>
  );
}
