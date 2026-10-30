import React, { useState, useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, useThemeContext } from '@/context';
import { WelcomeSplashScreen } from '@/components';

function NavigationStack() {
  const { isDark, theme } = useThemeContext();
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    setShowWelcome(true);
  }, []);

  return (
    <>
      <StatusBar style={showWelcome ? 'light' : (isDark ? 'light' : 'dark')} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: theme.background,
          },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="explore" />
        <Stack.Screen name="profile" />
        <Stack.Screen name="theme-setting" />
        <Stack.Screen name="devices-setting" />
        <Stack.Screen name="vip" />
        <Stack.Screen name="checkout" />
        <Stack.Screen name="movie/[id]" />
        <Stack.Screen name="movie/index" />
      </Stack>

      {showWelcome ? (
        <WelcomeSplashScreen onFinish={() => setShowWelcome(false)} />
      ) : null}
    </>
  );
}

export default function RootLayout() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5,
            retry: 2,
          },
        },
      })
  );

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <NavigationStack />
        </ThemeProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
