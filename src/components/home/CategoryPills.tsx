import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { StreamHubColors, Spacing, Typography, BorderRadius } from '@/constants/theme';
import { useTheme } from '@/hooks';

export const HOME_CATEGORIES = [
  'Tất cả',
  'Phim Chiếu Rạp',
  'Phim Bộ',
  'Anime',
  'Thịnh Hành',
  'VIP',
];

interface CategoryPillsProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  categories?: string[];
}

export function CategoryPills({
  selectedCategory,
  onSelectCategory,
  categories = HOME_CATEGORIES,
}: CategoryPillsProps) {
  const { isDark } = useTheme();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {categories.map((cat) => {
        const isSelected = selectedCategory === cat;
        return (
          <TouchableOpacity
            key={cat}
            activeOpacity={0.75}
            onPress={() => onSelectCategory(cat)}
            style={[
              styles.pill,
              isSelected
                ? styles.pillActive
                : [
                    styles.pillInactive,
                    !isDark && {
                      backgroundColor: 'rgba(0, 0, 0, 0.05)',
                      borderColor: 'rgba(0, 0, 0, 0.08)',
                    },
                  ],
            ]}
          >
            <Text
              style={[
                styles.text,
                isSelected
                  ? styles.textActive
                  : [styles.textInactive, !isDark && { color: '#475569' }],
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.md,
    gap: 8,
    paddingVertical: 6,
  },
  pill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: BorderRadius.full,
  },
  pillActive: {
    backgroundColor: StreamHubColors.primary,
    shadowColor: StreamHubColors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 2,
  },
  pillInactive: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  text: {
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.semibold,
  },
  textActive: {
    color: '#FFFFFF',
    fontWeight: Typography.weight.bold,
  },
  textInactive: {
    color: StreamHubColors.textSecondary,
  },
});
