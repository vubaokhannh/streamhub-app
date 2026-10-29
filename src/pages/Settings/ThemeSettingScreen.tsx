import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  useColorScheme as useDeviceColorScheme,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Moon, Sun, Smartphone, Check, Sparkles, ShieldCheck } from 'lucide-react-native';
import { MainLayout } from '@/layouts';
import { StreamHubColors, Spacing, Typography, BorderRadius } from '@/constants/theme';
import { useTheme } from '@/hooks';
import { ColorScheme } from '@/types';

interface ThemeOptionItem {
  id: ColorScheme;
  title: string;
  desc: string;
  icon: typeof Moon;
  tag?: string;
}

export function ThemeSettingScreen() {
  const router = useRouter();
  const { theme, isDark, colorScheme, setColorScheme } = useTheme();
  const deviceScheme = useDeviceColorScheme();

  const themeOptions: ThemeOptionItem[] = [
    {
      id: 'dark',
      title: 'Giao diện tối (Dark Mode)',
      desc: 'Màu tối điện ảnh huyền bí, tiết kiệm pin tối đa cho màn hình OLED & dịu mắt khi xem phim.',
      icon: Moon,
      tag: 'Khuyên Dùng',
    },
    {
      id: 'light',
      title: 'Giao diện sáng (Light Mode)',
      desc: 'Độ sáng cao, độ tương phản sắc nét, phù hợp khi sử dụng ngoài trời hoặc nơi nhiều ánh sáng.',
      icon: Sun,
    },
    {
      id: 'system',
      title: 'Theo hệ thống điện thoại',
      desc: `Tự động chuyển đổi theo cài đặt Sáng / Tối trên thiết bị của bạn. (Hiện tại: ${
        deviceScheme === 'dark' ? 'Tối' : 'Sáng'
      })`,
      icon: Smartphone,
    },
  ];

  return (
    <MainLayout
      hideFooter
      headerProps={{
        title: 'Giao Diện Hiển Thị',
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
        {/* Visual Preview Thumbnails */}
        <View style={styles.previewSection}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Xem Trước Giao Diện</Text>
          <View style={styles.previewRow}>
            {/* Dark Preview Card */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setColorScheme('dark')}
              style={[
                styles.previewCard,
                { backgroundColor: '#050816', borderColor: colorScheme === 'dark' ? StreamHubColors.primary : 'rgba(255, 255, 255, 0.1)' },
                colorScheme === 'dark' && styles.previewCardActive,
              ]}
            >
              <View style={styles.mockHeader}>
                <View style={[styles.mockDot, { backgroundColor: '#F97316' }]} />
                <View style={[styles.mockBar, { backgroundColor: 'rgba(255, 255, 255, 0.3)' }]} />
              </View>
              <View style={[styles.mockHero, { backgroundColor: '#0F162E' }]}>
                <View style={[styles.mockPlay, { backgroundColor: '#F97316' }]} />
              </View>
              <View style={styles.mockRow}>
                <View style={[styles.mockPill, { backgroundColor: 'rgba(255, 255, 255, 0.15)' }]} />
                <View style={[styles.mockPill, { backgroundColor: 'rgba(255, 255, 255, 0.15)' }]} />
              </View>
              <Text style={styles.previewLabelDark}>Giao diện Tối</Text>
            </TouchableOpacity>

            {/* Light Preview Card */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setColorScheme('light')}
              style={[
                styles.previewCard,
                { backgroundColor: '#F8FAFC', borderColor: colorScheme === 'light' ? StreamHubColors.primary : '#E2E8F0' },
                colorScheme === 'light' && styles.previewCardActive,
              ]}
            >
              <View style={[styles.mockHeader, { borderBottomColor: '#E2E8F0' }]}>
                <View style={[styles.mockDot, { backgroundColor: '#EA580C' }]} />
                <View style={[styles.mockBar, { backgroundColor: '#CBD5E1' }]} />
              </View>
              <View style={[styles.mockHero, { backgroundColor: '#FFFFFF', borderColor: '#E2E8F0', borderWidth: 1 }]}>
                <View style={[styles.mockPlay, { backgroundColor: '#EA580C' }]} />
              </View>
              <View style={styles.mockRow}>
                <View style={[styles.mockPill, { backgroundColor: '#E2E8F0' }]} />
                <View style={[styles.mockPill, { backgroundColor: '#E2E8F0' }]} />
              </View>
              <Text style={styles.previewLabelLight}>Giao diện Sáng</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Options List */}
        <View style={styles.optionsSection}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Tuỳ Chọn Chế Độ</Text>

          <View style={styles.optionsList}>
            {themeOptions.map((opt) => {
              const isSelected = colorScheme === opt.id;
              const IconComp = opt.icon;

              return (
                <TouchableOpacity
                  key={opt.id}
                  activeOpacity={0.8}
                  onPress={() => setColorScheme(opt.id)}
                  style={[
                    styles.optionCard,
                    {
                      backgroundColor: theme.card,
                      borderColor: isSelected ? StreamHubColors.primary : theme.border,
                    },
                    isSelected && {
                      backgroundColor: isDark
                        ? 'rgba(249, 115, 22, 0.12)'
                        : 'rgba(249, 115, 22, 0.08)',
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
                  <View style={styles.cardLeft}>
                    <View
                      style={[
                        styles.iconBox,
                        {
                          backgroundColor: isSelected
                            ? StreamHubColors.primary
                            : isDark
                            ? 'rgba(255, 255, 255, 0.06)'
                            : 'rgba(0, 0, 0, 0.04)',
                        },
                      ]}
                    >
                      <IconComp
                        size={20}
                        color={isSelected ? '#FFFFFF' : isDark ? '#CBD5E1' : '#475569'}
                      />
                    </View>

                    <View style={styles.textContainer}>
                      <View style={styles.titleRow}>
                        <Text
                          style={[
                            styles.optionTitle,
                            {
                              color: isSelected ? StreamHubColors.primary : theme.text,
                              fontWeight: isSelected ? Typography.weight.bold : Typography.weight.semibold,
                            },
                          ]}
                        >
                          {opt.title}
                        </Text>
                        {opt.tag ? (
                          <View style={styles.tagBadge}>
                            <Sparkles size={9} color={StreamHubColors.primary} />
                            <Text style={styles.tagText}>{opt.tag}</Text>
                          </View>
                        ) : null}
                      </View>
                      <Text style={[styles.optionDesc, { color: theme.textMuted }]}>
                        {opt.desc}
                      </Text>
                    </View>
                  </View>

                  {/* Radio / Check Circle */}
                  <View
                    style={[
                      styles.checkCircle,
                      isSelected
                        ? styles.checkCircleActive
                        : {
                            borderColor: isDark
                              ? 'rgba(255, 255, 255, 0.2)'
                              : 'rgba(0, 0, 0, 0.2)',
                          },
                    ]}
                  >
                    {isSelected ? <Check size={14} color="#FFFFFF" strokeWidth={3} /> : null}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Info Tip Footer */}
        <View
          style={[
            styles.infoCard,
            {
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)',
              borderColor: theme.border,
            },
          ]}
        >
          <ShieldCheck size={18} color={StreamHubColors.primary} />
          <Text style={[styles.infoText, { color: theme.textMuted }]}>
            Giao diện được lưu tự động trên thiết bị của bạn và đồng bộ mượt mà ở tất cả các tab và trang phụ trong StreamHub.
          </Text>
        </View>
      </ScrollView>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    gap: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  sectionTitle: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.bold,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: Spacing.sm,
  },
  previewSection: {
    gap: Spacing.xs,
  },
  previewRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  previewCard: {
    flex: 1,
    height: 140,
    borderRadius: BorderRadius.lg,
    borderWidth: 2,
    padding: 10,
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  previewCardActive: {
    shadowColor: StreamHubColors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  mockHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
  },
  mockDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  mockBar: {
    width: 40,
    height: 6,
    borderRadius: 3,
  },
  mockHero: {
    height: 48,
    borderRadius: BorderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mockPlay: {
    width: 18,
    height: 18,
    borderRadius: 9,
  },
  mockRow: {
    flexDirection: 'row',
    gap: 6,
  },
  mockPill: {
    width: 28,
    height: 8,
    borderRadius: 4,
  },
  previewLabelDark: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: Typography.weight.bold,
    textAlign: 'center',
  },
  previewLabelLight: {
    color: '#0F172A',
    fontSize: 10,
    fontWeight: Typography.weight.bold,
    textAlign: 'center',
  },
  optionsSection: {
    gap: Spacing.xs,
  },
  optionsList: {
    gap: Spacing.sm,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1.5,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    flex: 1,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  textContainer: {
    flex: 1,
    gap: 4,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  optionTitle: {
    fontSize: Typography.size.sm + 1,
  },
  tagBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: 'rgba(249, 115, 22, 0.15)',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
  },
  tagText: {
    color: StreamHubColors.primary,
    fontSize: 9,
    fontWeight: Typography.weight.bold,
  },
  optionDesc: {
    fontSize: Typography.size.xs,
    lineHeight: 17,
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  checkCircleActive: {
    backgroundColor: StreamHubColors.primary,
    borderColor: StreamHubColors.primary,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
  },
  infoText: {
    flex: 1,
    fontSize: Typography.size.xs,
    lineHeight: 18,
  },
});
