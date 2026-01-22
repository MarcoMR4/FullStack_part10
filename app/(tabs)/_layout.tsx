import { HapticTab } from "@/src/components/ui/haptic-tab";
import { IconSymbol } from "@/src/components/ui/icon-symbol";
import { useThemeScheme } from "@/src/context/ThemeContext";
import { GET_ME } from "@/src/graphql/queries";
import { getTheme } from "@/src/theme";
import { GetMeData } from "@/src/types/user";
import { useQuery } from "@apollo/client/react";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  const { themeScheme } = useThemeScheme();
  const theme = getTheme(themeScheme);

  // Check if user is authenticated
  const { data } = useQuery<GetMeData>(GET_ME, {
    errorPolicy: "ignore",
    variables: {
      reviews: false,
    },
  });

  const isAuthenticated = !!data?.me;

  return (
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
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="signin"
        options={{
          title: "Sign In",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="person" color={color} />
          ),
          href: isAuthenticated ? null : "/signin",
        }}
      />
      <Tabs.Screen
        name="myReviews"
        options={{
          title: "My Reviews",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="person" color={color} />
          ),
          href: isAuthenticated ? null : "/reviews",
        }}
      />
      <Tabs.Screen
        name="signup"
        options={{
          title: "Sign Up",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="person" color={color} />
          ),
          href: isAuthenticated ? null : "/signup",
        }}
      />
      <Tabs.Screen
        name="signout"
        options={{
          title: "Sign Out",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="person" color={color} />
          ),
          href: isAuthenticated ? "/signout" : null,
        }}
      />
    </Tabs>
  );
}
