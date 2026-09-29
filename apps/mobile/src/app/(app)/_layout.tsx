import { Tabs } from 'expo-router';
import { Text } from 'react-native';
import { theme } from '@/theme';

function TabLabel({ label, focused }: { label: string; focused: boolean }) {
  return (
    <Text
      style={{
        fontSize: 11,
        fontWeight: focused ? theme.typography.weight.semibold : theme.typography.weight.medium,
        color: focused ? theme.colors.brand.teal : theme.colors.text.secondary,
      }}
    >
      {label}
    </Text>
  );
}

export default function AppLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.surface.canvas },
        headerTintColor: theme.colors.brand.ink,
        headerShadowVisible: false,
        tabBarStyle: {
          backgroundColor: theme.colors.surface.raised,
          borderTopColor: theme.colors.border.subtle,
          minHeight: 56,
        },
        tabBarActiveTintColor: theme.colors.brand.teal,
        tabBarInactiveTintColor: theme.colors.text.secondary,
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarLabel: ({ focused }) => <TabLabel label="Home" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="marketplace"
        options={{
          title: 'Marketplace',
          tabBarLabel: ({ focused }) => <TabLabel label="Market" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="matches"
        options={{
          title: 'Matches',
          tabBarLabel: ({ focused }) => <TabLabel label="Matches" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          tabBarLabel: ({ focused }) => <TabLabel label="Chat" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarLabel: ({ focused }) => <TabLabel label="Profile" focused={focused} />,
        }}
      />
    </Tabs>
  );
}
