import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Home, Compass, Tv, Sparkles, User } from 'lucide-react-native';
import { StreamHubColors, Typography } from '@/constants/theme';
import { useTheme } from '@/hooks';

export type BottomTabKey = 'home' | 'explore' | 'series' | 'vip' | 'profile';

export interface FooterProps {
  activeTab?: BottomTabKey;
  onTabChange?: (tab: BottomTabKey) => void;
}

export function Footer({ activeTab = 'home', onTabChange }: FooterProps) {
  const { theme, isDark } = useTheme();

  const tabs = [
    { key: 'home' as BottomTabKey, label: 'Trang chủ', icon: Home },
    { key: 'explore' as BottomTabKey, label: 'Khám phá', icon: Compass },
    { key: 'series' as BottomTabKey, label: 'Phim bộ', icon: Tv },
    { key: 'vip' as BottomTabKey, label: 'Gói VIP', icon: Sparkles },
    { key: 'profile' as BottomTabKey, label: 'Cá nhân', icon: User },
  ];

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDark ? 'rgba(5, 8, 22, 0.96)' : 'rgba(255, 255, 255, 0.98)',
          borderTopColor: theme.border,
        },
      ]}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        const IconComponent = tab.icon;
        const color = isActive ? StreamHubColors.primary : (isDark ? '#64748B' : '#94A3B8');

        return (
          <TouchableOpacity
            key={tab.key}
            activeOpacity={0.7}
            onPress={() => onTabChange?.(tab.key)}
            style={styles.tabItem}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
          >
            <IconComponent
              size={20}
              color={color}
              strokeWidth={isActive ? 2.4 : 1.8}
            />
            <Text
              style={[
                styles.tabLabel,
                { color, fontWeight: isActive ? Typography.weight.bold : Typography.weight.medium },
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(5, 8, 22, 0.96)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
    paddingVertical: 8,
    paddingBottom: 14,
  },
  tabItem: {
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 8,
  },
  tabLabel: {
    fontSize: 10,
  },
});
