import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Image } from 'expo-image';
import { Play } from 'lucide-react-native';
import { WatchHistoryItem } from '@/types';
import { StreamHubColors, Spacing, Typography, BorderRadius } from '@/constants/theme';
import { useTheme } from '@/hooks';

interface WatchHistoryRailProps {
  items: WatchHistoryItem[];
  onPlayPress?: (item: WatchHistoryItem) => void;
}

export function WatchHistoryRail({ items, onPlayPress }: WatchHistoryRailProps) {
  const { theme, isDark } = useTheme();

  if (!items || items.length === 0) return null;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.accentBar} />
        <Text style={[styles.title, { color: theme.text }]}>Tiếp Tục Xem</Text>
      </View>

      {/* Horizontal List */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollList}
      >
        {items.map((item) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.8}
            onPress={() => onPlayPress?.(item)}
            style={[
              styles.card,
              {
                backgroundColor: theme.card,
                borderColor: theme.border,
              },
              !isDark && {
                shadowColor: '#000000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.06,
                shadowRadius: 5,
                elevation: 2,
              },
            ]}
          >
            {/* Image & Progress */}
            <View style={styles.mediaContainer}>
              <Image
                source={{ uri: item.movie.backdropUrl || item.movie.posterUrl }}
                style={styles.image}
                contentFit="cover"
                transition={200}
              />
              <View style={styles.overlay} />

              {/* Play Badge */}
              <View style={styles.playBadge}>
                <Play size={12} color="#FFFFFF" fill="#FFFFFF" style={{ marginLeft: 2 }} />
              </View>

              {/* Progress Bar Container at Bottom */}
              <View style={styles.progressBarBackground}>
                <View
                  style={[
                    styles.progressBarFill,
                    { width: `${item.progressPercent}%` },
                  ]}
                />
              </View>
            </View>

            {/* Info */}
            <View style={styles.info}>
              <Text style={[styles.movieTitle, { color: theme.text }]} numberOfLines={1}>
                {item.movie.title}
              </Text>
              <Text style={[styles.subText, { color: theme.textMuted }]}>
                {item.currentEpisode ? `Tập ${item.currentEpisode} • ` : ''}
                {item.lastWatchedAt}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.xs,
    gap: Spacing.sm,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.md,
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
  scrollList: {
    paddingHorizontal: Spacing.md,
    gap: Spacing.sm + 2,
  },
  card: {
    width: 175,
    borderRadius: BorderRadius.md,
    backgroundColor: StreamHubColors.card,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    overflow: 'hidden',
  },
  mediaContainer: {
    width: '100%',
    height: 100,
    position: 'relative',
    backgroundColor: '#0E1428',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  playBadge: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -14,
    marginLeft: -14,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(249, 115, 22, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressBarBackground: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: StreamHubColors.primary,
  },
  info: {
    padding: Spacing.sm,
    gap: 2,
  },
  movieTitle: {
    fontSize: Typography.size.xs + 1,
    fontWeight: Typography.weight.bold,
    color: '#FFFFFF',
  },
  subText: {
    fontSize: 10,
    color: StreamHubColors.textMuted,
  },
});
