import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  Smartphone,
  Tablet,
  Tv,
  Monitor,
  ShieldCheck,
  LogOut,
  MapPin,
  Clock,
  Radio,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react-native';
import { MainLayout } from '@/layouts';
import { StreamHubColors, Spacing, Typography, BorderRadius } from '@/constants/theme';
import { useTheme } from '@/hooks';
import { UserDevice, LoginHistoryItem } from '@/types';
import { MOCK_DEVICES, MOCK_LOGIN_HISTORY } from '@/constants/mockData';

export function DevicesSettingScreen() {
  const router = useRouter();
  const { theme, isDark } = useTheme();
  const [devices, setDevices] = useState<UserDevice[]>(MOCK_DEVICES);
  const [loginHistory] = useState<LoginHistoryItem[]>(MOCK_LOGIN_HISTORY);

  const currentDevice = devices.find((d) => d.isCurrentDevice) || devices[0];
  const otherDevices = devices.filter((d) => !d.isCurrentDevice);

  const getDeviceIcon = (type: UserDevice['deviceType'], size = 20) => {
    const props = { size, color: StreamHubColors.primary };
    switch (type) {
      case 'phone':
        return <Smartphone {...props} />;
      case 'tablet':
        return <Tablet {...props} />;
      case 'tv':
        return <Tv {...props} />;
      case 'web':
        return <Monitor {...props} />;
      default:
        return <Smartphone {...props} />;
    }
  };

  const handleRemoveDevice = (device: UserDevice) => {
    Alert.alert(
      '⚠️ Đăng xuất thiết bị',
      `Bạn có chắc chắn muốn ngắt kết nối và đăng xuất khỏi "${device.deviceName}"?`,
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Đăng Xuất',
          style: 'destructive',
          onPress: () => {
            setDevices((prev) => prev.filter((d) => d.id !== device.id));
            Alert.alert('Thành công', `Đã đăng xuất khỏi "${device.deviceName}".`);
          },
        },
      ]
    );
  };

  const handleLogoutAllOtherDevices = () => {
    if (otherDevices.length === 0) {
      Alert.alert('Thông báo', 'Hiện không có thiết bị nào khác đang đăng nhập.');
      return;
    }

    Alert.alert(
      '🚨 Đăng xuất tất cả thiết bị khác',
      `Tất cả ${otherDevices.length} thiết bị khác sẽ bị đăng xuất khỏi tài khoản của bạn ngay lập tức. Bạn vẫn duy trì đăng nhập trên thiết bị này.`,
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Đăng Xuất Tất Cả',
          style: 'destructive',
          onPress: () => {
            setDevices((prev) => prev.filter((d) => d.isCurrentDevice));
            Alert.alert('Thành công', 'Đã đăng xuất tất cả các thiết bị khác.');
          },
        },
      ]
    );
  };

  return (
    <MainLayout
      hideFooter
      headerProps={{
        title: 'Thiết Bị Đăng Nhập',
        showLogo: false,
        showBackButton: true,
        onBackPress: () => {
          if (router.canGoBack()) {
            router.back();
          } else {
            router.push('/profile');
          }
        },
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* 1. Account Security Summary Card */}
        <View
          style={[
            styles.summaryCard,
            {
              backgroundColor: theme.card,
              borderColor: theme.border,
            },
            !isDark && styles.cardLight,
          ]}
        >
          <View style={styles.summaryHeader}>
            <View
              style={[
                styles.shieldIconBox,
                {
                  backgroundColor: isDark ? 'rgba(16, 185, 129, 0.15)' : 'rgba(16, 185, 129, 0.12)',
                },
              ]}
            >
              <ShieldCheck size={22} color="#10B981" />
            </View>
            <View style={styles.summaryInfo}>
              <Text style={[styles.summaryTitle, { color: theme.text }]}>
                Bảo Mật Thiết Bị
              </Text>
              <Text style={[styles.summaryDesc, { color: theme.textMuted }]}>
                Tài khoản đang đăng nhập trên {devices.length}/4 thiết bị cho phép.
              </Text>
            </View>
          </View>

          <View style={[styles.summaryDivider, { backgroundColor: theme.border }]} />

          <View style={styles.summaryStatsRow}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: StreamHubColors.primary }]}>
                {devices.length}
              </Text>
              <Text style={[styles.statLabel, { color: theme.textMuted }]}>
                Đang trực tuyến
              </Text>
            </View>
            <View style={[styles.statSeparator, { backgroundColor: theme.border }]} />
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: theme.text }]}>4</Text>
              <Text style={[styles.statLabel, { color: theme.textMuted }]}>
                Giới hạn tối đa
              </Text>
            </View>
            <View style={[styles.statSeparator, { backgroundColor: theme.border }]} />
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: '#10B981' }]}>VIP 4K</Text>
              <Text style={[styles.statLabel, { color: theme.textMuted }]}>
                Gói tài khoản
              </Text>
            </View>
          </View>
        </View>

        {/* 2. Current Device Section */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Thiết Bị Này (Hiện Tại)
          </Text>
        </View>

        {currentDevice ? (
          <View
            style={[
              styles.currentDeviceCard,
              {
                backgroundColor: theme.card,
                borderColor: StreamHubColors.primary,
              },
              !isDark && styles.cardLight,
            ]}
          >
            <View style={styles.deviceRow}>
              <View
                style={[
                  styles.deviceIconCircle,
                  {
                    backgroundColor: isDark ? 'rgba(249, 115, 22, 0.15)' : 'rgba(249, 115, 22, 0.12)',
                  },
                ]}
              >
                {getDeviceIcon(currentDevice.deviceType, 22)}
              </View>

              <View style={styles.deviceDetails}>
                <View style={styles.nameBadgeRow}>
                  <Text style={[styles.currentDeviceName, { color: theme.text }]}>
                    {currentDevice.deviceName}
                  </Text>
                  <View style={styles.activePill}>
                    <Radio size={10} color="#10B981" />
                    <Text style={styles.activePillText}>Đang hoạt động</Text>
                  </View>
                </View>

                {currentDevice.browserOrApp ? (
                  <Text style={[styles.deviceSub, { color: theme.textMuted }]}>
                    {currentDevice.browserOrApp}
                  </Text>
                ) : null}

                <View style={styles.metaRow}>
                  <View style={styles.metaItem}>
                    <MapPin size={12} color={theme.textMuted} />
                    <Text style={[styles.metaText, { color: theme.textMuted }]}>
                      {currentDevice.location || 'TP. Hồ Chí Minh'}
                    </Text>
                  </View>
                  <Text style={[styles.metaDot, { color: theme.textMuted }]}>•</Text>
                  <View style={styles.metaItem}>
                    <Clock size={12} color={theme.textMuted} />
                    <Text style={[styles.metaText, { color: theme.textMuted }]}>
                      {currentDevice.loginDate || 'Vừa xong'}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        ) : null}

        {/* 3. Other Logged-in Devices */}
        {otherDevices.length > 0 ? (
          <>
            <View style={styles.sectionHeaderBetween}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>
                Các Thiết Bị Khác ({otherDevices.length})
              </Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={handleLogoutAllOtherDevices}
                style={styles.logoutAllBtn}
              >
                <LogOut size={13} color="#EF4444" />
                <Text style={styles.logoutAllText}>Đăng xuất tất cả</Text>
              </TouchableOpacity>
            </View>

            <View
              style={[
                styles.deviceListGroup,
                {
                  backgroundColor: theme.card,
                  borderColor: theme.border,
                },
                !isDark && styles.cardLight,
              ]}
            >
              {otherDevices.map((device, index) => {
                const isLast = index === otherDevices.length - 1;
                return (
                  <View key={device.id}>
                    <View style={styles.deviceRowItem}>
                      <View
                        style={[
                          styles.smallDeviceIcon,
                          {
                            backgroundColor: isDark
                              ? 'rgba(255, 255, 255, 0.06)'
                              : 'rgba(0, 0, 0, 0.04)',
                          },
                        ]}
                      >
                        {getDeviceIcon(device.deviceType, 18)}
                      </View>

                      <View style={styles.otherDeviceInfo}>
                        <Text style={[styles.otherDeviceName, { color: theme.text }]}>
                          {device.deviceName}
                        </Text>
                        <Text style={[styles.otherDeviceSub, { color: theme.textMuted }]}>
                          {device.browserOrApp || device.lastActive}
                        </Text>
                        <View style={styles.metaRow}>
                          <Text style={[styles.metaText, { color: theme.textMuted }]}>
                            {device.location}
                          </Text>
                          <Text style={[styles.metaDot, { color: theme.textMuted }]}>•</Text>
                          <Text style={[styles.metaText, { color: theme.textMuted }]}>
                            {device.lastActive}
                          </Text>
                        </View>
                      </View>

                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => handleRemoveDevice(device)}
                        style={styles.disconnectBtn}
                        accessibilityLabel="Đăng xuất thiết bị này"
                      >
                        <LogOut size={15} color="#EF4444" />
                        <Text style={styles.disconnectText}>Đăng xuất</Text>
                      </TouchableOpacity>
                    </View>
                    {!isLast && (
                      <View
                        style={[
                          styles.itemDivider,
                          { backgroundColor: theme.border },
                        ]}
                      />
                    )}
                  </View>
                );
              })}
            </View>
          </>
        ) : null}

        {/* 4. Detailed Login History Timeline */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Lịch Sử Đăng Nhập Gần Đây
          </Text>
        </View>

        <View
          style={[
            styles.historyCardGroup,
            {
              backgroundColor: theme.card,
              borderColor: theme.border,
            },
            !isDark && styles.cardLight,
          ]}
        >
          {loginHistory.map((item, idx) => {
            const isLast = idx === loginHistory.length - 1;
            const isActive = item.status === 'ACTIVE';

            return (
              <View key={item.id}>
                <View style={styles.historyItemRow}>
                  <View style={styles.historyLeft}>
                    <View
                      style={[
                        styles.statusDot,
                        {
                          backgroundColor: isActive ? '#10B981' : isDark ? '#64748B' : '#94A3B8',
                        },
                      ]}
                    />
                    <View style={styles.historyTextCol}>
                      <View style={styles.historyTitleRow}>
                        <Text style={[styles.historyDeviceName, { color: theme.text }]}>
                          {item.deviceName}
                        </Text>
                        {isActive ? (
                          <View style={styles.activeHistoryBadge}>
                            <Text style={styles.activeHistoryBadgeText}>Phiên hiện tại</Text>
                          </View>
                        ) : (
                          <View style={styles.successBadge}>
                            <CheckCircle2 size={10} color="#10B981" />
                            <Text style={styles.successBadgeText}>Thành công</Text>
                          </View>
                        )}
                      </View>

                      <Text style={[styles.historyMeta, { color: theme.textMuted }]}>
                        {item.browserOrApp} • {item.location} ({item.ipAddress})
                      </Text>
                      <Text style={[styles.historyTime, { color: theme.textMuted }]}>
                        {item.timestamp}
                      </Text>
                    </View>
                  </View>
                </View>

                {!isLast && (
                  <View
                    style={[
                      styles.itemDivider,
                      { backgroundColor: theme.border },
                    ]}
                  />
                )}
              </View>
            );
          })}
        </View>

        {/* Security Notice Footer */}
        <View style={styles.noticeBox}>
          <AlertTriangle size={15} color="#F59E0B" />
          <Text style={styles.noticeText}>
            Nếu phát hiện thiết bị hoặc vị trí đăng nhập lạ, hãy đăng xuất ngay lập tức và tiến hành đổi mật khẩu để bảo vệ tài khoản.
          </Text>
        </View>
      </ScrollView>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.xl,
    gap: Spacing.sm + 4,
  },
  cardLight: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  /* ---------------- SUMMARY CARD ---------------- */
  summaryCard: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    padding: Spacing.md,
    gap: 12,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  shieldIconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryInfo: {
    flex: 1,
    gap: 2,
  },
  summaryTitle: {
    fontSize: Typography.size.md,
    fontWeight: Typography.weight.bold,
  },
  summaryDesc: {
    fontSize: Typography.size.xs,
    lineHeight: 18,
  },
  summaryDivider: {
    height: 1,
    width: '100%',
  },
  summaryStatsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 4,
  },
  statItem: {
    alignItems: 'center',
    gap: 2,
  },
  statValue: {
    fontSize: Typography.size.lg,
    fontWeight: Typography.weight.heavy,
  },
  statLabel: {
    fontSize: 11,
  },
  statSeparator: {
    width: 1,
    height: 28,
  },
  /* ---------------- SECTION HEADERS ---------------- */
  sectionHeader: {
    marginTop: 8,
  },
  sectionHeaderBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: Typography.size.sm + 1,
    fontWeight: Typography.weight.bold,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  logoutAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
  },
  logoutAllText: {
    color: '#EF4444',
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.semibold,
  },
  /* ---------------- CURRENT DEVICE CARD ---------------- */
  currentDeviceCard: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1.5,
    padding: Spacing.md,
  },
  deviceRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  deviceIconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deviceDetails: {
    flex: 1,
    gap: 4,
  },
  nameBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 6,
  },
  currentDeviceName: {
    fontSize: Typography.size.md,
    fontWeight: Typography.weight.bold,
  },
  activePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: BorderRadius.full,
  },
  activePillText: {
    color: '#10B981',
    fontSize: 10,
    fontWeight: Typography.weight.bold,
  },
  deviceSub: {
    fontSize: Typography.size.xs,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
    flexWrap: 'wrap',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  metaText: {
    fontSize: 11,
  },
  metaDot: {
    fontSize: 10,
  },
  /* ---------------- OTHER DEVICES LIST ---------------- */
  deviceListGroup: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    overflow: 'hidden',
  },
  deviceRowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    gap: 12,
  },
  smallDeviceIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  otherDeviceInfo: {
    flex: 1,
    gap: 2,
  },
  otherDeviceName: {
    fontSize: Typography.size.sm + 1,
    fontWeight: Typography.weight.semibold,
  },
  otherDeviceSub: {
    fontSize: Typography.size.xs,
  },
  disconnectBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: BorderRadius.sm,
  },
  disconnectText: {
    color: '#EF4444',
    fontSize: 11,
    fontWeight: Typography.weight.bold,
  },
  itemDivider: {
    height: 1,
    marginLeft: 62,
  },
  /* ---------------- HISTORY TIMELINE ---------------- */
  historyCardGroup: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    overflow: 'hidden',
  },
  historyItemRow: {
    padding: Spacing.md,
  },
  historyLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 6,
  },
  historyTextCol: {
    flex: 1,
    gap: 2,
  },
  historyTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 6,
  },
  historyDeviceName: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.bold,
  },
  activeHistoryBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  activeHistoryBadgeText: {
    color: '#10B981',
    fontSize: 9,
    fontWeight: Typography.weight.bold,
  },
  successBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  successBadgeText: {
    color: '#10B981',
    fontSize: 10,
    fontWeight: Typography.weight.medium,
  },
  historyMeta: {
    fontSize: 11,
    lineHeight: 16,
  },
  historyTime: {
    fontSize: 10,
    marginTop: 2,
  },
  /* ---------------- NOTICE BOX ---------------- */
  noticeBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    borderRadius: BorderRadius.md,
    padding: Spacing.sm + 2,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.25)',
    marginTop: 4,
  },
  noticeText: {
    flex: 1,
    fontSize: Typography.size.xs,
    color: '#D97706',
    lineHeight: 18,
  },
});
