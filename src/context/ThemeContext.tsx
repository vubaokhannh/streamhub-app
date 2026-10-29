import React, { createContext, useContext, useState, useMemo } from 'react';
import { useColorScheme as useDeviceColorScheme } from 'react-native';
import { ColorScheme, ThemeColors } from '@/types';
import { LightColors, DarkColors } from '@/constants/theme';

interface ThemeContextValue {
  theme: ThemeColors;
  isDark: boolean;
  colorScheme: ColorScheme;
  setColorScheme: (scheme: ColorScheme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const deviceScheme = useDeviceColorScheme();
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');

  const isDark = useMemo(() => {
    if (colorScheme === 'system') {
      return deviceScheme === 'dark';
    }
    return colorScheme === 'dark';
  }, [colorScheme, deviceScheme]);

  const theme = useMemo(() => (isDark ? DarkColors : LightColors), [isDark]);

  const toggleTheme = () => {
    setColorScheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const value = useMemo(
    () => ({
      theme,
      isDark,
      colorScheme,
      setColorScheme,
      toggleTheme,
    }),
    [theme, isDark, colorScheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useThemeContext(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
}
