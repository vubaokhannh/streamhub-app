/**
 * Theme & Color Scheme types
 */

export type ColorScheme = 'light' | 'dark' | 'system';

export interface ThemeColors {
  primary: string;
  primaryLight: string;
  background: string;
  card: string;
  text: string;
  textMuted: string;
  border: string;
  notification: string;
  success: string;
  warning: string;
  danger: string;
}
