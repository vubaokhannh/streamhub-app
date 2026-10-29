import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Sparkles, ChevronRight, Zap } from 'lucide-react-native';
import { StreamHubColors, Spacing, Typography, BorderRadius } from '@/constants/theme';
import { useTheme } from '@/hooks';

interface VipBannerCardProps {
  onUpgradePress?: () => void;
}

export function VipBannerCard({ onUpgradePress }: VipBannerCardProps) {
  const { isDark } = useTheme();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.88}
        onPress={onUpgradePress}
        style={[
          styles.card,
          !isDark && {
            backgroundColor: '#FFFBEB',
            borderColor: 'rgba(245, 158, 11, 0.4)',
            shadowColor: '#F59E0B',
            shadowOpacity: 0.15,
            shadowRadius: 10,
            elevation: 3,
          },
        ]}
      >
        {/* Glow decoration */}
        <View
          style={[
            styles.glow,
            !isDark && { backgroundColor: 'rgba(251, 191, 36, 0.25)' },
          ]}
        />

        <View style={styles.contentRow}>
          {/* Left Icon */}
          <View
            style={[
              styles.iconBox,
              !isDark && {
                backgroundColor: 'rgba(251, 191, 36, 0.25)',
                borderColor: 'rgba(245, 158, 11, 0.35)',
              },
            ]}
          >
            <Sparkles size={20} color={isDark ? StreamHubColors.vip : '#D97706'} />
          </View>

          {/* Center Info */}
          <View style={styles.info}>
            <View style={styles.badgeRow}>
              <Text
                style={[
                  styles.title,
                  !isDark && { color: '#0F172A' },
                ]}
              >
                StreamHub VIP
              </Text>
              <View style={styles.tag}>
                <Zap size={9} color={StreamHubColors.primary} />
                <Text style={styles.tagText}>Từ 59K/tháng</Text>
              </View>
            </View>
            <Text
              style={[
                styles.subtitle,
                !isDark && { color: '#78350F' },
              ]}
              numberOfLines={1}
            >
              4K Ultra HD • Không quảng cáo • Tải ngoại tuyến
            </Text>
          </View>

          {/* Right Button */}
          <View style={styles.upgradeBtn}>
            <Text style={styles.upgradeBtnText}>Nâng cấp</Text>
            <ChevronRight size={14} color="#FFFFFF" />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.md,
    marginVertical: Spacing.xs + 2,
  },
  card: {
    backgroundColor: '#0E1630',
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: 'rgba(251, 191, 36, 0.35)',
    padding: Spacing.md,
    position: 'relative',
    overflow: 'hidden',
    shadowColor: StreamHubColors.vip,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  glow: {
    position: 'absolute',
    top: -20,
    right: -20,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(249, 115, 22, 0.15)',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm + 2,
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: 'rgba(251, 191, 36, 0.15)',
    borderColor: 'rgba(251, 191, 36, 0.3)',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 1,
    gap: 3,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  title: {
    color: '#FFFFFF',
    fontSize: Typography.size.sm + 1,
    fontWeight: Typography.weight.bold,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: 'rgba(249, 115, 22, 0.15)',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: BorderRadius.full,
  },
  tagText: {
    color: StreamHubColors.primary,
    fontSize: 9,
    fontWeight: Typography.weight.bold,
  },
  subtitle: {
    color: StreamHubColors.textMuted,
    fontSize: 11,
  },
  upgradeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: StreamHubColors.primary,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: BorderRadius.full,
    shadowColor: StreamHubColors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 2,
  },
  upgradeBtnText: {
    color: '#FFFFFF',
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.bold,
  },
});
