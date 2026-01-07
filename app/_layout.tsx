import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';


import { useThemeScheme, ThemeProviderCustom } from '@/src/context/ThemeContext';

export const unstable_settings = {
  anchor: '(tabs)',
};


function RootLayoutInner() {
  const { themeScheme } = useThemeScheme();
  return (
    <ThemeProvider value={themeScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <ThemeProviderCustom>
      <RootLayoutInner />
    </ThemeProviderCustom>
  );
}
