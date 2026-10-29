import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { Camera, Sparkles, ChevronRight, Crown } from 'lucide-react-native';
import { UserProfile } from '@/types';
import { StreamHubColors, Spacing, Typography, BorderRadius } from '@/constants/theme';
import { useTheme } from '@/hooks';

interface ProfileHeroCardProps {
  user: UserProfile;
  onEditAvatar?: () => void;
  onManageSubscription?: () => void;
}

export function ProfileHeroCard({
  user,
  onEditAvatar,
  onManageSubscription,
}: ProfileHeroCardProps) {
  const { theme, isDark } = useTheme();

  return (
    <View style={styles.container}>
      {/* User Info Header */}
      <View style={styles.userRow}>
        {/* Avatar with Camera badge */}
        <View style={styles.avatarWrapper}>
          <Image
            source={{ uri: user.avatarUrl }}
            style={styles.avatar}
            contentFit="cover"
            transition={200}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onEditAvatar}
            style={[styles.cameraBadge, { borderColor: theme.background }]}
            accessibilityLabel="Đổi ảnh đại diện"
          >
            <Camera size={12} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* User Details */}
        <View style={styles.userDetails}>
          <Text style={[styles.userName, { color: theme.text }]}>{user.name}</Text>
          <Text style={[styles.userEmail, { color: theme.textMuted }]} numberOfLines={1}>
            {user.email}
          </Text>

          {user.isVip ? (
            <View style={styles.vipTag}>
              <Crown size={11} color="#000000" fill="#000000" />
              <Text style={styles.vipTagText}>VIP MEMBER</Text>
            </View>
          ) : (
            <View
              style={[
                styles.freeTag,
                {
                  backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)',
                },
              ]}
            >
              <Text
                style={[
                  styles.freeTagText,
                  { color: isDark ? StreamHubColors.textSecondary : '#475569' },
                ]}
              >
                Thành viên miễn phí
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* Subscription Card Banner */}
      <TouchableOpacity
        activeOpacity={0.88}
        onPress={onManageSubscription}
        style={[
          styles.vipCard,
          isDark
            ? {
                backgroundColor: '#0F162E',
                borderColor: 'rgba(251, 191, 36, 0.4)',
              }
            : {
                backgroundColor: '#FFFBEB',
                borderColor: 'rgba(245, 158, 11, 0.4)',
                shadowColor: '#F59E0B',
                shadowOpacity: 0.12,
                shadowRadius: 10,
                elevation: 3,
              },
        ]}
      >
        <View
          style={[
            styles.vipCardGlow,
            { backgroundColor: isDark ? 'rgba(249, 115, 22, 0.2)' : 'rgba(251, 191, 36, 0.25)' },
          ]}
        />

        <View style={styles.vipCardContent}>
          <View
            style={[
              styles.vipIconBox,
              {
                backgroundColor: isDark ? 'rgba(251, 191, 36, 0.15)' : 'rgba(251, 191, 36, 0.3)',
              },
            ]}
          >
            <Sparkles size={18} color={isDark ? StreamHubColors.vip : '#D97706'} />
          </View>

          <View style={styles.vipCardInfo}>
            <Text
              style={[
                styles.vipCardTitle,
                { color: isDark ? '#FFFFFF' : '#0F172A' },
              ]}
            >
              {user.vipPlanName || 'Gói VIP Premium'}
            </Text>
            <Text
              style={[
                styles.vipCardDesc,
                { color: isDark ? StreamHubColors.vip : '#B45309' },
              ]}
            >
              {user.vipExpiresAt ? `Hạn dùng: ${user.vipExpiresAt}` : 'Trải nghiệm không giới hạn 4K'}
            </Text>
          </View>

          <View style={styles.manageBtn}>
            <Text style={styles.manageBtnText}>Chi tiết</Text>
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
    gap: Spacing.md,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatar: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 2,
    borderColor: StreamHubColors.primary,
    backgroundColor: '#0E1428',
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: StreamHubColors.primary,
    borderWidth: 2,
    borderColor: StreamHubColors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userDetails: {
    flex: 1,
    gap: 3,
  },
  userName: {
    fontSize: Typography.size.lg,
    fontWeight: Typography.weight.bold,
    color: '#FFFFFF',
  },
  userEmail: {
    fontSize: Typography.size.xs,
    color: StreamHubColors.textMuted,
  },
  vipTag: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: StreamHubColors.vip,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
    marginTop: 2,
  },
  vipTagText: {
    color: '#000000',
    fontSize: 9,
    fontWeight: Typography.weight.heavy,
    letterSpacing: 0.5,
  },
  freeTag: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
    marginTop: 2,
  },
  freeTagText: {
    color: StreamHubColors.textSecondary,
    fontSize: 10,
    fontWeight: Typography.weight.medium,
  },
  vipCard: {
    backgroundColor: '#0F162E',
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: 'rgba(251, 191, 36, 0.4)',
    padding: Spacing.md,
    position: 'relative',
    overflow: 'hidden',
  },
  vipCardGlow: {
    position: 'absolute',
    top: -20,
    right: -20,
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(249, 115, 22, 0.2)',
  },
  vipCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm + 2,
  },
  vipIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(251, 191, 36, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  vipCardInfo: {
    flex: 1,
    gap: 2,
  },
  vipCardTitle: {
    color: '#FFFFFF',
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.bold,
  },
  vipCardDesc: {
    color: StreamHubColors.vip,
    fontSize: 11,
    fontWeight: Typography.weight.medium,
  },
  manageBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: StreamHubColors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: BorderRadius.full,
  },
  manageBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: Typography.weight.bold,
  },
});
