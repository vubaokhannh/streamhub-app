import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { useColorScheme as useDeviceColorScheme } from 'react-native';
import { ColorScheme, ThemeColors } from '@/types';
import { LightColors, DarkColors } from '@/constants/theme';
import { storageService } from '@/services/storage';

const THEME_STORAGE_KEY = 'user_theme_preference';

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
  const [colorScheme, setColorSchemeState] = useState<ColorScheme>('dark');

  // Load saved theme from storage on start
  useEffect(() => {
    (async () => {
      try {
        const saved = await storageService.getItem(THEME_STORAGE_KEY);
        if (saved === 'light' || saved === 'dark' || saved === 'system') {
          setColorSchemeState(saved);
        }
      } catch {
        // Ignore fallback
      }
    })();
  }, []);

  const setColorScheme = (scheme: ColorScheme) => {
    setColorSchemeState(scheme);
    storageService.setItem(THEME_STORAGE_KEY, scheme).catch(() => {});
  };

  const isDark = useMemo(() => {
    if (colorScheme === 'system') {
      return deviceScheme === 'dark';
    }
    return colorScheme === 'dark';
  }, [colorScheme, deviceScheme]);

  const theme = useMemo(() => (isDark ? DarkColors : LightColors), [isDark]);

  const toggleTheme = () => {
    const next = isDark ? 'light' : 'dark';
    setColorScheme(next);
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
