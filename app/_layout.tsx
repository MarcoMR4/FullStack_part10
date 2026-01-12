import {
  ThemeProviderCustom,
  useThemeScheme
} from '@/src/context/ThemeContext';
import { createApolloClient } from '@/src/utils/apolloClient';
import { ApolloProvider } from '@apollo/client/react';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider
} from '@react-navigation/native';
// import Constants from 'expo-constants';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';


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
  // console.log(Constants.expoConfig?.extra?.env);
  return (
    <ApolloProvider client={createApolloClient}>
      <ThemeProviderCustom>
        <RootLayoutInner />
      </ThemeProviderCustom>
    </ApolloProvider>
  );
}
