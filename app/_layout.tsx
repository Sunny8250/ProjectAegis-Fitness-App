import AppTabs from '@/components/app-tabs';
import { AppProviders } from '@/providers/AppProviders';

export default function TabLayout() {
  return (
    <AppProviders>
      <AppTabs />
    </AppProviders>
  );
}
