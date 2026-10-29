import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { Play, Search, Bell, ChevronLeft } from 'lucide-react-native';
import { StreamHubColors, Spacing, Typography, BorderRadius } from '@/constants/theme';

export interface HeaderProps {
  title?: string;
  showLogo?: boolean;
  showBackButton?: boolean;
  onBackPress?: () => void;
  onSearchPress?: () => void;
  onNotificationPress?: () => void;
  rightActions?: React.ReactNode;
  bottomSlot?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function Header({
  title,
  showLogo = true,
  showBackButton = false,
  onBackPress,
  onSearchPress,
  onNotificationPress,
  rightActions,
  bottomSlot,
  style,
}: HeaderProps) {
  return (
    <View style={[styles.container, style]}>
      {/* Top Bar Row */}
      <View style={styles.topRow}>
        {/* Left: Back button or Logo or Title */}
        <View style={styles.leftSection}>
          {showBackButton ? (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onBackPress}
              style={styles.backButton}
              accessibilityLabel="Quay lại"
            >
              <ChevronLeft size={22} color="#FFFFFF" />
            </TouchableOpacity>
          ) : null}

          {showLogo ? (
            <View style={styles.brand}>
              <View style={styles.logoBadge}>
                <Play size={13} color="#FFFFFF" fill="#FFFFFF" />
              </View>
              <Text style={styles.brandText}>
                STREAM<Text style={styles.brandAccent}>HUB</Text>
              </Text>
            </View>
          ) : title ? (
            <Text style={styles.titleText}>{title}</Text>
          ) : null}
        </View>

        {/* Right: Actions */}
        <View style={styles.rightSection}>
          {rightActions ? (
            rightActions
          ) : (
            <View style={styles.defaultActions}>
              {onSearchPress ? (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={onSearchPress}
                  style={styles.iconButton}
                  accessibilityLabel="Tìm kiếm"
                >
                  <Search size={18} color="#FFFFFF" />
                </TouchableOpacity>
              ) : null}

              {onNotificationPress ? (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={onNotificationPress}
                  style={styles.iconButton}
                  accessibilityLabel="Thông báo"
                >
                  <Bell size={18} color="#FFFFFF" />
                  <View style={styles.notifyDot} />
                </TouchableOpacity>
              ) : null}
            </View>
          )}
        </View>
      </View>

      {/* Optional Bottom Slot (e.g. Category Pills, Search Input) */}
      {bottomSlot ? <View style={styles.bottomSlot}>{bottomSlot}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: StreamHubColors.background,
    paddingTop: Spacing.xs,
    paddingBottom: Spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    height: 44,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  backButton: {
    width: 34,
    height: 34,
    borderRadius: BorderRadius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoBadge: {
    width: 26,
    height: 26,
    borderRadius: 7,
    backgroundColor: StreamHubColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: StreamHubColors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 3,
  },
  brandText: {
    fontSize: Typography.size.md + 2,
    fontWeight: Typography.weight.heavy,
    color: '#FFFFFF',
    letterSpacing: 1.2,
  },
  brandAccent: {
    color: StreamHubColors.primary,
  },
  titleText: {
    fontSize: Typography.size.md + 1,
    fontWeight: Typography.weight.bold,
    color: '#FFFFFF',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  defaultActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  iconButton: {
    width: 34,
    height: 34,
    borderRadius: BorderRadius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  notifyDot: {
    position: 'absolute',
    top: 7,
    right: 8,
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: StreamHubColors.primary,
  },
  bottomSlot: {
    marginTop: 4,
  },
});
