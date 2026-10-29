import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  Sliders,
  Wifi,
  Bell,
  Globe,
  HelpCircle,
  FileText,
  LogOut,
  ChevronRight,
  Moon,
  Sun,
  Smartphone,
} from 'lucide-react-native';
import { StreamHubColors, Spacing, Typography, BorderRadius } from '@/constants/theme';
import { useTheme } from '@/hooks';

interface ProfileSettingsSectionProps {
  onLogout?: () => void;
  onHelpPress?: () => void;
  onTermsPress?: () => void;
}

export function ProfileSettingsSection({
  onLogout,
  onHelpPress,
  onTermsPress,
}: ProfileSettingsSectionProps) {
  const router = useRouter();
  const { theme, isDark, colorScheme } = useTheme();
  const [wifiOnly, setWifiOnly] = useState(true);
  const [notifications, setNotifications] = useState(true);

  const currentThemeLabel = (() => {
    switch (colorScheme) {
      case 'dark':
        return 'Giao diện tối (Khuyên dùng)';
      case 'light':
        return 'Giao diện sáng';
      case 'system':
      default:
        return `Theo hệ thống (${isDark ? 'Tối' : 'Sáng'})`;
    }
  })();

  const CurrentThemeIcon = (() => {
    switch (colorScheme) {
      case 'dark':
        return Moon;
      case 'light':
        return Sun;
      case 'system':
      default:
        return Smartphone;
    }
  })();

  const handleOpenThemeSetting = () => {
    router.push('/theme-setting');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.accentBar} />
        <Text style={[styles.title, { color: theme.text }]}>Cài Đặt & Tuỳ Chọn</Text>
      </View>

      {/* Settings Card Group 1 */}
      <View
        style={[
          styles.cardGroup,
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
        {/* Theme Setting Row - Navigates to dedicated page */}
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.settingRow}
          onPress={handleOpenThemeSetting}
          accessibilityRole="button"
          accessibilityLabel="Cài đặt giao diện hiển thị"
        >
          <View style={styles.left}>
            <View
              style={[
                styles.iconBox,
                { backgroundColor: isDark ? 'rgba(249, 115, 22, 0.15)' : 'rgba(234, 88, 12, 0.12)' },
              ]}
            >
              <CurrentThemeIcon size={16} color={StreamHubColors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.rowTitleContainer}>
                <Text style={[styles.settingTitle, { color: theme.text }]}>Giao diện hiển thị</Text>
                <View style={styles.themeBadge}>
                  <Text style={styles.themeBadgeText}>
                    {colorScheme === 'dark' ? 'Tối' : colorScheme === 'light' ? 'Sáng' : 'Tự động'}
                  </Text>
                </View>
              </View>
              <Text style={[styles.settingDesc, { color: theme.textMuted }]}>{currentThemeLabel}</Text>
            </View>
          </View>
          <ChevronRight size={16} color={isDark ? '#64748B' : '#94A3B8'} />
        </TouchableOpacity>

        <View style={[styles.divider, { backgroundColor: theme.border }]} />

        {/* Video Quality */}
        <TouchableOpacity activeOpacity={0.7} style={styles.settingRow}>
          <View style={styles.left}>
            <View
              style={[
                styles.iconBox,
                { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)' },
              ]}
            >
              <Sliders size={16} color={StreamHubColors.primary} />
            </View>
            <View>
              <Text style={[styles.settingTitle, { color: theme.text }]}>Chất lượng phát video</Text>
              <Text style={[styles.settingDesc, { color: theme.textMuted }]}>4K Ultra HD (Tự động thích ứng)</Text>
            </View>
          </View>
          <ChevronRight size={16} color={isDark ? '#64748B' : '#94A3B8'} />
        </TouchableOpacity>

        <View style={[styles.divider, { backgroundColor: theme.border }]} />

        {/* Wifi Only Download */}
        <View style={styles.settingRow}>
          <View style={styles.left}>
            <View
              style={[
                styles.iconBox,
                { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)' },
              ]}
            >
              <Wifi size={16} color="#38BDF8" />
            </View>
            <View>
              <Text style={[styles.settingTitle, { color: theme.text }]}>Chỉ tải qua Wi-Fi</Text>
              <Text style={[styles.settingDesc, { color: theme.textMuted }]}>Tiết kiệm dữ liệu di động 4G/5G</Text>
            </View>
          </View>
          <Switch
            value={wifiOnly}
            onValueChange={setWifiOnly}
            trackColor={{ false: isDark ? '#334155' : '#CBD5E1', true: StreamHubColors.primary }}
            thumbColor="#FFFFFF"
          />
        </View>

        <View style={[styles.divider, { backgroundColor: theme.border }]} />

        {/* Push Notifications */}
        <View style={styles.settingRow}>
          <View style={styles.left}>
            <View
              style={[
                styles.iconBox,
                { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)' },
              ]}
            >
              <Bell size={16} color={StreamHubColors.vip} />
            </View>
            <View>
              <Text style={[styles.settingTitle, { color: theme.text }]}>Thông báo tập phim mới</Text>
              <Text style={[styles.settingDesc, { color: theme.textMuted }]}>Nhận tin khi phim theo dõi ra tập mới</Text>
            </View>
          </View>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: isDark ? '#334155' : '#CBD5E1', true: StreamHubColors.primary }}
            thumbColor="#FFFFFF"
          />
        </View>

        <View style={[styles.divider, { backgroundColor: theme.border }]} />

        {/* Language */}
        <TouchableOpacity activeOpacity={0.7} style={styles.settingRow}>
          <View style={styles.left}>
            <View
              style={[
                styles.iconBox,
                { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)' },
              ]}
            >
              <Globe size={16} color="#10B981" />
            </View>
            <View>
              <Text style={[styles.settingTitle, { color: theme.text }]}>Ngôn ngữ & Phụ đề</Text>
              <Text style={[styles.settingDesc, { color: theme.textMuted }]}>Tiếng Việt (Mặc định)</Text>
            </View>
          </View>
          <ChevronRight size={16} color={isDark ? '#64748B' : '#94A3B8'} />
        </TouchableOpacity>
      </View>

      {/* Support & Legal Group */}
      <View
        style={[
          styles.cardGroup,
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
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onHelpPress}
          style={styles.settingRow}
        >
          <View style={styles.left}>
            <View
              style={[
                styles.iconBox,
                { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)' },
              ]}
            >
              <HelpCircle size={16} color={isDark ? StreamHubColors.textSecondary : '#475569'} />
            </View>
            <Text style={[styles.settingTitle, { color: theme.text }]}>Trung tâm hỗ trợ & FAQ</Text>
          </View>
          <ChevronRight size={16} color={isDark ? '#64748B' : '#94A3B8'} />
        </TouchableOpacity>

        <View style={[styles.divider, { backgroundColor: theme.border }]} />

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onTermsPress}
          style={styles.settingRow}
        >
          <View style={styles.left}>
            <View
              style={[
                styles.iconBox,
                { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)' },
              ]}
            >
              <FileText size={16} color={isDark ? StreamHubColors.textSecondary : '#475569'} />
            </View>
            <Text style={[styles.settingTitle, { color: theme.text }]}>Điều khoản dịch vụ & Quyền riêng tư</Text>
          </View>
          <ChevronRight size={16} color={isDark ? '#64748B' : '#94A3B8'} />
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onLogout}
        style={[
          styles.logoutBtn,
          !isDark && {
            backgroundColor: '#FEE2E2',
            borderColor: '#FCA5A5',
          },
        ]}
      >
        <LogOut size={16} color="#DC2626" />
        <Text style={[styles.logoutText, !isDark && { color: '#DC2626' }]}>
          Đăng Xuất Tài Khoản
        </Text>
      </TouchableOpacity>

      {/* App Version */}
      <Text style={[styles.versionText, { color: isDark ? '#475569' : '#94A3B8' }]}>
        StreamHub App v1.0.0 (Build 2026.1)
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.md,
    marginVertical: Spacing.xs,
    gap: Spacing.sm,
    paddingBottom: Spacing.xl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  accentBar: {
    width: 3,
    height: 16,
    borderRadius: 2,
    backgroundColor: StreamHubColors.primary,
  },
  title: {
    fontSize: Typography.size.sm + 1,
    fontWeight: Typography.weight.bold,
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  cardGroup: {
    backgroundColor: StreamHubColors.card,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: 12,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm + 2,
    flex: 1,
  },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingTitle: {
    color: '#FFFFFF',
    fontSize: Typography.size.xs + 1,
    fontWeight: Typography.weight.semibold,
  },
  settingDesc: {
    color: StreamHubColors.textMuted,
    fontSize: 10,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    marginLeft: 54,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderColor: 'rgba(239, 68, 68, 0.25)',
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    paddingVertical: 12,
    marginTop: Spacing.xs,
  },
  logoutText: {
    color: '#EF4444',
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.bold,
  },
  versionText: {
    color: '#475569',
    fontSize: 10,
    textAlign: 'center',
    marginTop: 4,
  },
  rowTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  themeBadge: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
    backgroundColor: 'rgba(249, 115, 22, 0.15)',
  },
  themeBadgeText: {
    fontSize: 10,
    fontWeight: Typography.weight.bold,
    color: StreamHubColors.primary,
  },
});
