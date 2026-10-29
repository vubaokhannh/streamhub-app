import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Home, Compass, Tv, Sparkles, User } from 'lucide-react-native';
import { StreamHubColors, Typography } from '@/constants/theme';
import { useTheme } from '@/hooks';

export type BottomTabKey = 'home' | 'explore' | 'series' | 'vip' | 'profile';

export interface FooterProps {
  activeTab?: BottomTabKey;
  onTabChange?: (tab: BottomTabKey) => void;
}

export function Footer({ activeTab = 'home', onTabChange }: FooterProps) {
  const router = useRouter();
  const { theme, isDark } = useTheme();
  const insets = useSafeAreaInsets();

  const tabs = [
    { key: 'explore' as BottomTabKey, label: 'Khám phá', icon: Compass },
    { key: 'series' as BottomTabKey, label: 'Phim bộ', icon: Tv },
    { key: 'home' as BottomTabKey, label: 'Trang chủ', icon: Home, isCenter: true },
    { key: 'vip' as BottomTabKey, label: 'Gói VIP', icon: Sparkles },
    { key: 'profile' as BottomTabKey, label: 'Cá nhân', icon: User },
  ];

  const handleTabPress = (tabKey: BottomTabKey) => {
    if (onTabChange) {
      onTabChange(tabKey);
      return;
    }

    if (tabKey === 'home') {
      router.push('/');
    } else if (tabKey === 'explore') {
      router.push('/explore' as any);
    } else if (tabKey === 'vip') {
      router.push('/vip' as any);
    } else if (tabKey === 'profile') {
      router.push('/profile');
    }
  };

  const barBg = isDark ? '#060913' : '#FFFFFF';
  const borderColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)';
  const bottomPadding = Math.max(insets.bottom, Platform.OS === 'ios' ? 12 : 8);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: barBg,
          borderTopColor: borderColor,
          paddingBottom: bottomPadding,
        },
      ]}
    >
      <View style={styles.tabsRow}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          const IconComponent = tab.icon;

          // Tab Trang chủ ở giữa nổi bật nhẹ nhàng, hài hòa
          if (tab.isCenter) {
            return (
              <TouchableOpacity
                key={tab.key}
                activeOpacity={0.85}
                onPress={() => handleTabPress(tab.key)}
                style={styles.centerTabItem}
                accessibilityRole="tab"
                accessibilityState={{ selected: isActive }}
                accessibilityLabel={tab.label}
              >
                <View
                  style={[
                    styles.centerButton,
                    {
                      borderColor: barBg,
                      backgroundColor: isActive
                        ? StreamHubColors.primary
                        : isDark
                        ? '#1E293B'
                        : '#F1F5F9',
                    },
                    isActive && styles.centerButtonActive,
                  ]}
                >
                  <Home
                    size={22}
                    color={isActive ? '#FFFFFF' : isDark ? '#94A3B8' : '#64748B'}
                    strokeWidth={isActive ? 2.4 : 2}
                  />
                </View>
                <Text
                  style={[
                    styles.tabLabel,
                    {
                      color: isActive
                        ? StreamHubColors.primary
                        : isDark
                        ? '#94A3B8'
                        : '#64748B',
                      fontWeight: isActive
                        ? Typography.weight.bold
                        : Typography.weight.semibold,
                    },
                  ]}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          }

          // Các tab thông thường xung quanh
          const color = isActive
            ? StreamHubColors.primary
            : isDark
            ? '#64748B'
            : '#94A3B8';

          return (
            <TouchableOpacity
              key={tab.key}
              activeOpacity={0.7}
              onPress={() => handleTabPress(tab.key)}
              style={styles.tabItem}
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive }}
              accessibilityLabel={tab.label}
            >
              <View style={styles.iconWrapper}>
                <IconComponent
                  size={21}
                  color={color}
                  strokeWidth={isActive ? 2.4 : 1.8}
                />
                {tab.key === 'vip' && (
                  <View style={styles.vipDot} />
                )}
              </View>
              <Text
                style={[
                  styles.tabLabel,
                  {
                    color,
                    fontWeight: isActive
                      ? Typography.weight.bold
                      : Typography.weight.medium,
                  },
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    paddingTop: 8,
  },
  tabsRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    gap: 4,
  },
  iconWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    height: 24,
  },
  vipDot: {
    position: 'absolute',
    top: -2,
    right: -5,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#F59E0B',
  },
  centerTabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 4,
    gap: 3,
  },
  centerButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3.5,
    marginTop: -16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  centerButtonActive: {
    shadowColor: StreamHubColors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.55,
    shadowRadius: 8,
    elevation: 8,
    transform: [{ scale: 1.04 }],
  },
  tabLabel: {
    fontSize: 10.5,
    letterSpacing: 0.1,
  },
});
