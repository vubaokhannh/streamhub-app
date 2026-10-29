import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Image } from 'expo-image';
import { Play, Plus, Info, Star, Flame } from 'lucide-react-native';
import { Movie } from '@/types';
import { StreamHubColors, Spacing, Typography, BorderRadius } from '@/constants/theme';

interface HomeHeroProps {
  movie: Movie;
  onPlayPress?: (movie: Movie) => void;
  onAddListPress?: (movie: Movie) => void;
  onInfoPress?: (movie: Movie) => void;
}

export function HomeHero({
  movie,
  onPlayPress,
  onAddListPress,
  onInfoPress,
}: HomeHeroProps) {
  if (!movie) return null;

  return (
    <View style={styles.container}>
      {/* Hero Media Card */}
      <View style={styles.cardWrapper}>
        <Image
          source={{ uri: movie.backdropUrl || movie.posterUrl }}
          style={styles.image}
          contentFit="cover"
          transition={300}
        />

        {/* Ambient Gradient Overlays */}
        <View style={styles.topVignette} />
        <View style={styles.bottomGradient} />

        {/* Top Badges */}
        <View style={styles.topBadgeRow}>
          <View style={styles.trendingBadge}>
            <Flame size={12} color="#FFFFFF" fill="#FFFFFF" />
            <Text style={styles.trendingText}>TOP 1 HÔM NAY</Text>
          </View>

          {movie.isPremium ? (
            <View style={styles.vipBadge}>
              <Text style={styles.vipText}>VIP</Text>
            </View>
          ) : null}
        </View>

        {/* Bottom Hero Info Overlay */}
        <View style={styles.bottomInfo}>
          {/* Title */}
          <Text style={styles.title} numberOfLines={2}>
            {movie.title}
          </Text>

          {/* Meta & Genres */}
          <View style={styles.metaRow}>
            <View style={styles.ratingBadge}>
              <Star size={11} color="#FBBF24" fill="#FBBF24" />
              <Text style={styles.ratingText}>{movie.rating.toFixed(1)}</Text>
            </View>
            <Text style={styles.dot}>•</Text>
            <Text style={styles.metaText}>{movie.year}</Text>
            <Text style={styles.dot}>•</Text>
            <Text style={styles.metaText}>{movie.genres.slice(0, 2).join(', ')}</Text>
            <Text style={styles.dot}>•</Text>
            <View style={styles.ageBadge}>
              <Text style={styles.ageText}>{movie.ageRating}</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionRow}>
            {/* Play Button */}
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => onPlayPress?.(movie)}
              style={styles.playButton}
            >
              <Play size={16} color="#FFFFFF" fill="#FFFFFF" />
              <Text style={styles.playText}>Phát Ngay</Text>
            </TouchableOpacity>

            {/* Add to List Button */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => onAddListPress?.(movie)}
              style={styles.listButton}
            >
              <Plus size={16} color="#FFFFFF" />
              <Text style={styles.listText}>Danh Sách</Text>
            </TouchableOpacity>

            {/* Info Button */}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => onInfoPress?.(movie)}
              style={styles.infoButton}
              accessibilityLabel="Chi tiết"
            >
              <Info size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.xs,
  },
  cardWrapper: {
    width: '100%',
    height: 380,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#0A0F24',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.6,
    shadowRadius: 16,
    elevation: 8,
  },
  image: {
    ...StyleSheet.absoluteFill,
  },
  topVignette: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: 'rgba(5, 8, 22, 0.3)',
  },
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 240,
    backgroundColor: 'rgba(5, 8, 22, 0.94)',
  },
  topBadgeRow: {
    position: 'absolute',
    top: Spacing.md,
    left: Spacing.md,
    right: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 10,
  },
  trendingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: StreamHubColors.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
    shadowColor: StreamHubColors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 4,
  },
  trendingText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: Typography.weight.heavy,
    letterSpacing: 0.5,
  },
  vipBadge: {
    backgroundColor: StreamHubColors.vip,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: BorderRadius.sm,
  },
  vipText: {
    color: '#000000',
    fontSize: 10,
    fontWeight: Typography.weight.heavy,
  },
  bottomInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: Spacing.md,
    gap: 8,
    zIndex: 10,
  },
  title: {
    fontSize: Typography.size.xl + 2,
    fontWeight: Typography.weight.heavy,
    color: '#FFFFFF',
    lineHeight: 28,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: 'rgba(251, 191, 36, 0.15)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  ratingText: {
    color: '#FBBF24',
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.bold,
  },
  dot: {
    color: '#64748B',
    fontSize: 12,
  },
  metaText: {
    color: StreamHubColors.textSecondary,
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.medium,
  },
  ageBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 3,
  },
  ageText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: Typography.weight.bold,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginTop: 4,
  },
  playButton: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: StreamHubColors.primary,
    paddingVertical: 11,
    borderRadius: BorderRadius.md,
    shadowColor: StreamHubColors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 4,
  },
  playText: {
    color: '#FFFFFF',
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.bold,
  },
  listButton: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderColor: 'rgba(255, 255, 255, 0.18)',
    borderWidth: 1,
    paddingVertical: 11,
    borderRadius: BorderRadius.md,
  },
  listText: {
    color: '#FFFFFF',
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.semibold,
  },
  infoButton: {
    width: 42,
    height: 42,
    borderRadius: BorderRadius.md,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
