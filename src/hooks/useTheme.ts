import { useThemeContext } from '@/context/ThemeContext';

export function useTheme() {
  const { theme, isDark, toggleTheme, colorScheme, setColorScheme } = useThemeContext();
  return {
    theme,
    isDark,
    toggleTheme,
    colorScheme,
    setColorScheme,
  };
}
