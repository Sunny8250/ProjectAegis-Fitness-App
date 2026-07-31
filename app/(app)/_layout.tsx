import { Tabs } from 'expo-router';
import { BottomTabBar } from '@/components/navigation/BottomTabBar';

export default function AppLayout() {
  return (
    <Tabs
      tabBar={(props) => <BottomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
        }}
      />
      <Tabs.Screen 
        name="workout/[id]" 
        options={{
          href: null,
          tabBarStyle: { display: 'none' }
        }} 
      />
      <Tabs.Screen 
        name="workout/active/[id]" 
        options={{
          href: null,
          tabBarStyle: { display: 'none' }
        }} 
      />
    </Tabs>
  );
}
