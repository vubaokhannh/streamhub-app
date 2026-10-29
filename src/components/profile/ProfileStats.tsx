import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Bookmark, Clock, Smartphone } from 'lucide-react-native';
import { StreamHubColors, Spacing, Typography, BorderRadius } from '@/constants/theme';
import { useTheme } from '@/hooks';

interface ProfileStatsProps {
  watchlistCount?: number;
  watchHours?: number;
  activeDevicesCount?: number;
  maxDevices?: number;
  onDevicesPress?: () => void;
}

export function ProfileStats({
  watchlistCount = 12,
  watchHours = 34,
  activeDevicesCount = 2,
  maxDevices = 4,
  onDevicesPress,
}: ProfileStatsProps) {
  const { theme, isDark } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.card,
          borderColor: theme.border,
        },
        !isDark && {
          shadowColor: '#000000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 6,
          elevation: 2,
        },
      ]}
    >
      {/* Stat 1: Watchlist */}
      <View style={styles.statBox}>
        <View
          style={[
            styles.iconCircle,
            { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(249, 115, 22, 0.1)' },
          ]}
        >
          <Bookmark size={16} color={StreamHubColors.primary} />
        </View>
        <Text style={[styles.statValue, { color: theme.text }]}>{watchlistCount}</Text>
        <Text style={[styles.statLabel, { color: theme.textMuted }]}>Yêu thích</Text>
      </View>

      <View style={[styles.divider, { backgroundColor: theme.border }]} />

      {/* Stat 2: Watch Hours */}
      <View style={styles.statBox}>
        <View
          style={[
            styles.iconCircle,
            { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(56, 189, 248, 0.12)' },
          ]}
        >
          <Clock size={16} color="#0284C7" />
        </View>
        <Text style={[styles.statValue, { color: theme.text }]}>{watchHours}h</Text>
        <Text style={[styles.statLabel, { color: theme.textMuted }]}>Thời lượng</Text>
      </View>

      <View style={[styles.divider, { backgroundColor: theme.border }]} />

      {/* Stat 3: Devices (Clickable) */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onDevicesPress}
        style={styles.statBox}
        accessibilityRole="button"
        accessibilityLabel="Xem chi tiết thiết bị đăng nhập"
      >
        <View
          style={[
            styles.iconCircle,
            { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(245, 158, 11, 0.12)' },
          ]}
        >
          <Smartphone size={16} color={isDark ? StreamHubColors.vip : '#D97706'} />
        </View>
        <Text style={[styles.statValue, { color: theme.text }]}>
          {activeDevicesCount}/{maxDevices}
        </Text>
        <Text style={[styles.statLabel, { color: theme.textMuted }]}>Thiết bị</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: StreamHubColors.card,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.sm + 2,
  },
  statBox: {
    alignItems: 'center',
    gap: 4,
    flex: 1,
  },
  iconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statValue: {
    fontSize: Typography.size.md,
    fontWeight: Typography.weight.bold,
  },
  statLabel: {
    fontSize: Typography.size.xs,
  },
  divider: {
    width: 1,
    height: 28,
  },
});
