import { ThemeColors } from '@/types';

export const StreamHubColors = {
  primary: '#F97316',
  primaryDark: '#EA580C',
  primaryLight: 'rgba(249, 115, 22, 0.15)',
  accent: '#F59E0B',
  vip: '#FBBF24',
  vipBg: 'rgba(251, 191, 36, 0.15)',
  background: '#050816',
  card: '#0D1326',
  cardElevated: '#131A33',
  cardBorder: 'rgba(255, 255, 255, 0.08)',
  cardBorderHover: 'rgba(249, 115, 22, 0.4)',
  text: '#FFFFFF',
  textSecondary: '#CBD5E1',
  textMuted: '#94A3B8',
  danger: '#EF4444',
  success: '#10B981',
};

export const DarkColors: ThemeColors = {
  primary: '#F97316',
  primaryLight: 'rgba(249, 115, 22, 0.2)',
  background: '#050816',
  card: '#0D1326',
  text: '#FFFFFF',
  textSecondary: '#CBD5E1',
  textMuted: '#94A3B8',
  border: 'rgba(255, 255, 255, 0.08)',
  notification: '#EF4444',
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
};

export const LightColors: ThemeColors = {
  primary: '#EA580C',
  primaryLight: 'rgba(234, 88, 12, 0.15)',
  background: '#F8FAFC',
  card: '#FFFFFF',
  text: '#0F172A',
  textSecondary: '#475569',
  textMuted: '#64748B',
  border: '#E2E8F0',
  notification: '#EF4444',
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
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
    xs: 11,
    sm: 13,
    md: 15,
    lg: 18,
    xl: 22,
    xxl: 28,
    hero: 34,
  },
  weight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    heavy: '900' as const,
  },
} as const;

export const BorderRadius = {
  sm: 6,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;
