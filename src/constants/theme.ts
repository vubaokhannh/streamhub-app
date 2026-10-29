import { ThemeColors } from '@/types';

export const LightColors: ThemeColors = {
  primary: '#2563EB',
  primaryLight: '#DBEAFE',
  background: '#F8FAFC',
  card: '#FFFFFF',
  text: '#0F172A',
  textMuted: '#64748B',
  border: '#E2E8F0',
  notification: '#EF4444',
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
};

export const DarkColors: ThemeColors = {
  primary: '#3B82F6',
  primaryLight: '#1E3A8A',
  background: '#0B0F19',
  card: '#161E2E',
  text: '#F8FAFC',
  textMuted: '#94A3B8',
  border: '#2A3447',
  notification: '#F87171',
  success: '#34D399',
  warning: '#FBBF24',
  danger: '#F87171',
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
} as const;

export const Typography = {
  size: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 22,
    xxl: 28,
  },
  weight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
} as const;

export const BorderRadius = {
  sm: 6,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;
