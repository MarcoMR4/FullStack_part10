import {
  ThemeProviderCustom,
  useThemeScheme
} from '@/src/context/ThemeContext';
import createApolloClient from '@/src/utils/apolloClient';
import { ApolloProvider } from '@apollo/client/react';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider
} from '@react-navigation/native';
// import Constants from 'expo-constants';
import AuthStorageContext from '@/src/context/AuthStorageContext';
import AuthStorage from '@/src/utils/authStorage';
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

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

export default function RootLayout() {
  // console.log(Constants.expoConfig?.extra?.env);
  return (
    <AuthStorageContext.Provider value={authStorage}>
      <ApolloProvider client={apolloClient}>
        <ThemeProviderCustom>
          <RootLayoutInner />
        </ThemeProviderCustom>
      </ApolloProvider>
    </AuthStorageContext.Provider>
  );
}
