import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Card, Header } from '@/components';
import { useTheme } from '@/hooks';
import { Spacing, Typography } from '@/constants/theme';

export default function HomeScreen() {
  const { theme, isDark, toggleTheme } = useTheme();

  const layers = [
    { name: 'app/', desc: 'Màn hình & layout định tuyến Expo Router' },
    { name: 'components/', desc: 'Các UI component dùng chung (Button, Card, Header...)' },
    { name: 'constants/', desc: 'Theme colors, typography, spacing và hằng số' },
    { name: 'context/', desc: 'State toàn cục và Context providers (ThemeProvider...)' },
    { name: 'hooks/', desc: 'Custom hooks (useTheme, useColorScheme...)' },
    { name: 'services/', desc: 'Tầng gọi API (fetch/axios) và local storage' },
    { name: 'types/', desc: 'Định nghĩa kiểu dữ liệu TypeScript dùng chung' },
    { name: 'utils/', desc: 'Hàm tiện ích format tiền tệ, ngày tháng...' },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Header
          title="MyApp"
          subtitle="Kiến trúc Layer Modular"
          rightAction={
            <Button
              title={isDark ? '☀️ Sáng' : '🌙 Tối'}
              size="sm"
              variant="outline"
              onPress={toggleTheme}
            />
          }
        />

        <Card style={styles.heroCard}>
          <Text style={[styles.heroBadge, { color: theme.primary, backgroundColor: theme.primaryLight }]}>
            Sẵn sàng phát triển
          </Text>
          <Text style={[styles.heroTitle, { color: theme.text }]}>
            Dự án đã được tổ chức lại gọn gàng!
          </Text>
          <Text style={[styles.heroDesc, { color: theme.textMuted }]}>
            Cấu trúc thư mục được phân lớp rõ ràng, chuẩn hóa TypeScript và tích hợp sẵn Light/Dark theme.
          </Text>
        </Card>

        <Text style={[styles.sectionTitle, { color: theme.text }]}>Cấu trúc thư mục (src/)</Text>

        <View style={styles.grid}>
          {layers.map((layer) => (
            <Card key={layer.name} style={styles.layerCard}>
              <Text style={[styles.layerName, { color: theme.primary }]}>{layer.name}</Text>
              <Text style={[styles.layerDesc, { color: theme.textMuted }]}>{layer.desc}</Text>
            </Card>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.md,
    gap: Spacing.md,
  },
  heroCard: {
    gap: Spacing.sm,
  },
  heroBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: 999,
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.semibold,
    overflow: 'hidden',
  },
  heroTitle: {
    fontSize: Typography.size.lg,
    fontWeight: Typography.weight.bold,
  },
  heroDesc: {
    fontSize: Typography.size.sm,
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: Typography.size.md,
    fontWeight: Typography.weight.bold,
    marginTop: Spacing.xs,
  },
  grid: {
    gap: Spacing.sm,
  },
  layerCard: {
    gap: 4,
    padding: Spacing.sm + 4,
  },
  layerName: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.bold,
    fontFamily: 'monospace',
  },
  layerDesc: {
    fontSize: Typography.size.xs,
    lineHeight: 18,
  },
});
