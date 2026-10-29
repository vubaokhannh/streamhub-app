import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Smartphone, Tablet, Tv, Monitor, LogOut } from 'lucide-react-native';
import { UserDevice } from '@/types';
import { StreamHubColors, Spacing, Typography, BorderRadius } from '@/constants/theme';
import { useTheme } from '@/hooks';

interface ProfileDevicesListProps {
  devices: UserDevice[];
  onRemoveDevice?: (device: UserDevice) => void;
}

export function ProfileDevicesList({
  devices,
  onRemoveDevice,
}: ProfileDevicesListProps) {
  const { theme, isDark } = useTheme();

  const getDeviceIcon = (type: UserDevice['deviceType']) => {
    const props = { size: 18, color: StreamHubColors.primary };
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

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.accentBar} />
        <Text style={[styles.title, { color: theme.text }]}>Thiết Bị Đang Đăng Nhập</Text>
      </View>

      {/* Device Cards */}
      <View style={styles.list}>
        {devices.map((device) => (
          <View
            key={device.id}
            style={[
              styles.deviceCard,
              {
                backgroundColor: theme.card,
                borderColor: theme.border,
              },
              !isDark && {
                shadowColor: '#000000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 4,
                elevation: 1,
              },
            ]}
          >
            <View
              style={[
                styles.iconCircle,
                {
                  backgroundColor: isDark ? 'rgba(249, 115, 22, 0.12)' : 'rgba(249, 115, 22, 0.1)',
                },
              ]}
            >
              {getDeviceIcon(device.deviceType)}
            </View>

            <View style={styles.deviceInfo}>
              <View style={styles.nameRow}>
                <Text style={[styles.deviceName, { color: theme.text }]}>
                  {device.deviceName}
                </Text>
                {device.isCurrentDevice ? (
                  <View style={styles.currentBadge}>
                    <Text style={styles.currentBadgeText}>Thiết bị này</Text>
                  </View>
                ) : null}
              </View>
              <Text style={[styles.activeText, { color: theme.textMuted }]}>
                Hoạt động: {device.lastActive}
              </Text>
            </View>

            {!device.isCurrentDevice ? (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => onRemoveDevice?.(device)}
                style={styles.removeBtn}
                accessibilityLabel="Đăng xuất thiết bị"
              >
                <LogOut size={14} color="#EF4444" />
              </TouchableOpacity>
            ) : null}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.md,
    marginVertical: Spacing.xs,
    gap: Spacing.sm,
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
  list: {
    gap: Spacing.xs + 2,
  },
  deviceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm + 2,
    backgroundColor: StreamHubColors.card,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    padding: Spacing.sm + 2,
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: 'rgba(249, 115, 22, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deviceInfo: {
    flex: 1,
    gap: 3,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  deviceName: {
    color: '#FFFFFF',
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.semibold,
  },
  currentBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderColor: 'rgba(16, 185, 129, 0.3)',
    borderWidth: 1,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: BorderRadius.full,
  },
  currentBadgeText: {
    color: '#10B981',
    fontSize: 9,
    fontWeight: Typography.weight.bold,
  },
  activeText: {
    color: StreamHubColors.textMuted,
    fontSize: 11,
  },
  removeBtn: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.sm,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
