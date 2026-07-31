import { withLayoutContext } from 'expo-router';
import { createMaterialTopTabNavigator } from 'expo-router/js-top-tabs';
import { BottomTabBar } from '@/components/navigation/BottomTabBar';

const { Navigator } = createMaterialTopTabNavigator();
const SwipeTabs = withLayoutContext(Navigator);

export default function AppLayout() {
  return (
    <SwipeTabs
      tabBarPosition="bottom"
      tabBar={(props: any) => <BottomTabBar {...props} />}
      screenOptions={{}}
    >
      <SwipeTabs.Screen
        name="index"
        options={{
          title: 'Home',
        }}
      />
      <SwipeTabs.Screen
        name="explore"
        options={{
          title: 'Explore',
        }}
      />
      <SwipeTabs.Screen
        name="profile"
        options={{
          title: 'Profile',
        }}
      />
      <SwipeTabs.Screen
        name="analytics"
        options={{
          title: 'Analytics',
        }}
      />
      <SwipeTabs.Screen 
        name="workout/[id]" 
        options={{
          href: null,
          tabBarStyle: { display: 'none' }
        } as any} 
      />
      <SwipeTabs.Screen 
        name="workout/active/[id]" 
        options={{
          href: null,
          tabBarStyle: { display: 'none' }
        } as any} 
      />
      <SwipeTabs.Screen 
        name="workout/summary/[id]" 
        options={{
          href: null,
          tabBarStyle: { display: 'none' }
        } as any} 
      />
    </SwipeTabs>
  );
}
