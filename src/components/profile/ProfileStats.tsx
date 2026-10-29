import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Bookmark, Clock, Smartphone } from 'lucide-react-native';
import { StreamHubColors, Spacing, Typography, BorderRadius } from '@/constants/theme';
import { useTheme } from '@/hooks';

interface ProfileStatsProps {
  watchlistCount?: number;
  watchHours?: number;
  activeDevicesCount?: number;
  maxDevices?: number;
}

export function ProfileStats({
  watchlistCount = 12,
  watchHours = 34,
  activeDevicesCount = 2,
  maxDevices = 4,
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

      {/* Stat 3: Devices */}
      <View style={styles.statBox}>
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
      </View>
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
    paddingHorizontal: Spacing.sm,
  },
  statBox: {
    alignItems: 'center',
    gap: 3,
    flex: 1,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  statValue: {
    color: '#FFFFFF',
    fontSize: Typography.size.md,
    fontWeight: Typography.weight.heavy,
  },
  statLabel: {
    color: StreamHubColors.textMuted,
    fontSize: 10,
    fontWeight: Typography.weight.medium,
  },
  divider: {
    width: 1,
    height: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
});
