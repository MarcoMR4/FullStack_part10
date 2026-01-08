import AppBar from '@/src/components/AppBar';
import { HapticTab } from '@/src/components/ui/haptic-tab';
import { IconSymbol } from '@/src/components/ui/icon-symbol';
import { useThemeScheme } from '@/src/context/ThemeContext';
import { getTheme } from '@/src/theme';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  const { themeScheme } = useThemeScheme();
  const theme = getTheme(themeScheme);
  return (
    <>
      <AppBar />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: theme.colors.tabIconSelected,
          headerShown: false,
          tabBarButton: HapticTab,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
          }}
        />
        <Tabs.Screen
          name="signin"
          options={{
            title: 'Sign In',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="person" color={color} />,
          }}
        />
      </Tabs>
    </>
  );
}
