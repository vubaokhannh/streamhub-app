import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Image } from 'expo-image';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { Play, Plus, Info, Star, Flame, Sparkles } from 'lucide-react-native';
import { Movie } from '@/types';
import { StreamHubColors, Spacing, Typography, BorderRadius } from '@/constants/theme';
import { useTheme } from '@/hooks';

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
  const { theme, isDark } = useTheme();

  if (!movie) return null;

  return (
    <View style={styles.container}>
      {/* Hero Media Card */}
      <View
        style={[
          styles.cardWrapper,
          {
            backgroundColor: isDark ? '#0A0F24' : theme.card,
            borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : theme.border,
          },
          !isDark && styles.cardWrapperLight,
        ]}
      >
        <Image
          source={{ uri: movie.backdropUrl || movie.posterUrl }}
          style={styles.image}
          contentFit="cover"
          transition={300}
        />

        {/* Top Vignette Gradient Overlay */}
        <View style={styles.topVignette} pointerEvents="none">
          <Svg width="100%" height="100%">
            <Defs>
              <LinearGradient id="heroTopVignette" x1="0" y1="0" x2="0" y2="1">
                <Stop
                  offset="0%"
                  stopColor={isDark ? '#050816' : '#FFFFFF'}
                  stopOpacity={isDark ? 0.65 : 0.6}
                />
                <Stop
                  offset="100%"
                  stopColor={isDark ? '#050816' : '#FFFFFF'}
                  stopOpacity={0}
                />
              </LinearGradient>
            </Defs>
            <Rect width="100%" height="100%" fill="url(#heroTopVignette)" />
          </Svg>
        </View>

        {/* Bottom Ambient Gradient Overlay */}
        <View style={styles.bottomGradient} pointerEvents="none">
          <Svg width="100%" height="100%">
            <Defs>
              <LinearGradient id="heroBottomGrad" x1="0" y1="0" x2="0" y2="1">
                <Stop
                  offset="0%"
                  stopColor={isDark ? '#050816' : '#FFFFFF'}
                  stopOpacity={0}
                />
                <Stop
                  offset="42%"
                  stopColor={isDark ? '#050816' : '#FFFFFF'}
                  stopOpacity={isDark ? 0.72 : 0.7}
                />
                <Stop
                  offset="100%"
                  stopColor={isDark ? '#050816' : '#FFFFFF'}
                  stopOpacity={isDark ? 0.98 : 0.96}
                />
              </LinearGradient>
            </Defs>
            <Rect width="100%" height="100%" fill="url(#heroBottomGrad)" />
          </Svg>
        </View>

        {/* Top Badges - Fully synchronized with Light & Dark Theme */}
        <View style={styles.topBadgeRow}>
          {/* Trending Badge */}
          <View
            style={[
              styles.trendingBadge,
              isDark ? styles.trendingBadgeDark : styles.trendingBadgeLight,
            ]}
          >
            <Flame
              size={12}
              color={isDark ? '#FFFFFF' : theme.primary}
              fill={isDark ? '#FFFFFF' : theme.primary}
            />
            <Text
              style={[
                styles.trendingText,
                { color: isDark ? '#FFFFFF' : theme.primary },
              ]}
            >
              TOP 1 HÔM NAY
            </Text>
          </View>

          {/* VIP Badge */}
          {movie.isPremium ? (
            <View
              style={[
                styles.vipBadge,
                isDark ? styles.vipBadgeDark : styles.vipBadgeLight,
              ]}
            >
              <Sparkles
                size={10}
                color={isDark ? '#FCD34D' : '#B45309'}
                fill={isDark ? '#FCD34D' : '#B45309'}
              />
              <Text
                style={[
                  styles.vipText,
                  { color: isDark ? '#FCD34D' : '#B45309' },
                ]}
              >
                VIP
              </Text>
            </View>
          ) : null}
        </View>

        {/* Bottom Hero Info Overlay */}
        <View style={styles.bottomInfo}>
          {/* Title */}
          <Text
            style={[
              styles.title,
              { color: isDark ? '#FFFFFF' : theme.text },
            ]}
            numberOfLines={2}
          >
            {movie.title}
          </Text>

          {/* Meta & Genres */}
          <View style={styles.metaRow}>
            <View
              style={[
                styles.ratingBadge,
                !isDark && styles.ratingBadgeLight,
              ]}
            >
              <Star
                size={11}
                color={isDark ? '#FBBF24' : '#D97706'}
                fill={isDark ? '#FBBF24' : '#D97706'}
              />
              <Text
                style={[
                  styles.ratingText,
                  !isDark && { color: '#B45309' },
                ]}
              >
                {movie.rating.toFixed(1)}
              </Text>
            </View>
            <Text style={[styles.dot, !isDark && { color: '#94A3B8' }]}>•</Text>
            <Text
              style={[
                styles.metaText,
                { color: isDark ? StreamHubColors.textSecondary : theme.textMuted },
              ]}
            >
              {movie.year}
            </Text>
            <Text style={[styles.dot, !isDark && { color: '#94A3B8' }]}>•</Text>
            <Text
              style={[
                styles.metaText,
                { color: isDark ? StreamHubColors.textSecondary : theme.textMuted },
              ]}
            >
              {movie.genres.slice(0, 2).join(', ')}
            </Text>
            <Text style={[styles.dot, !isDark && { color: '#94A3B8' }]}>•</Text>
            <View
              style={[
                styles.ageBadge,
                !isDark && styles.ageBadgeLight,
              ]}
            >
              <Text
                style={[
                  styles.ageText,
                  { color: isDark ? '#FFFFFF' : theme.text },
                ]}
              >
                {movie.ageRating}
              </Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionRow}>
            {/* Play Button */}
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => onPlayPress?.(movie)}
              style={[
                styles.playButton,
                {
                  backgroundColor: theme.primary,
                  shadowColor: theme.primary,
                },
              ]}
            >
              <Play size={16} color="#FFFFFF" fill="#FFFFFF" />
              <Text style={styles.playText}>Phát Ngay</Text>
            </TouchableOpacity>

            {/* Add to List Button */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => onAddListPress?.(movie)}
              style={[
                styles.listButton,
                !isDark && styles.listButtonLight,
              ]}
            >
              <Plus size={16} color={isDark ? '#FFFFFF' : theme.text} />
              <Text
                style={[
                  styles.listText,
                  { color: isDark ? '#FFFFFF' : theme.text },
                ]}
              >
                Danh Sách
              </Text>
            </TouchableOpacity>

            {/* Info Button */}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => onInfoPress?.(movie)}
              style={[
                styles.infoButton,
                !isDark && styles.infoButtonLight,
              ]}
              accessibilityLabel="Chi tiết"
            >
              <Info size={18} color={isDark ? '#FFFFFF' : theme.text} />
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
  cardWrapperLight: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  image: {
    ...StyleSheet.absoluteFill,
  },
  topVignette: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 90,
  },
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 240,
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
  /* ---------------- TRENDING BADGE ---------------- */
  trendingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: BorderRadius.full,
  },
  trendingBadgeDark: {
    backgroundColor: StreamHubColors.primary,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    shadowColor: StreamHubColors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 4,
  },
  trendingBadgeLight: {
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
    borderWidth: 1,
    borderColor: 'rgba(234, 88, 12, 0.35)',
    shadowColor: '#EA580C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 3,
  },
  trendingText: {
    fontSize: 10,
    fontWeight: Typography.weight.heavy,
    letterSpacing: 0.5,
  },
  /* ---------------- VIP BADGE ---------------- */
  vipBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm + 1,
  },
  vipBadgeDark: {
    backgroundColor: 'rgba(251, 191, 36, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(251, 191, 36, 0.5)',
  },
  vipBadgeLight: {
    backgroundColor: '#FEF3C7',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.45)',
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 3,
    elevation: 2,
  },
  vipText: {
    fontSize: 10,
    fontWeight: Typography.weight.heavy,
    letterSpacing: 0.3,
  },
  /* ---------------- BOTTOM HERO INFO ---------------- */
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
  ratingBadgeLight: {
    backgroundColor: '#FEF3C7',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.35)',
  },
  ratingText: {
    color: '#FBBF24',
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.bold,
  },
  dot: {
    fontSize: 12,
  },
  metaText: {
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.medium,
  },
  ageBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 3,
  },
  ageBadgeLight: {
    backgroundColor: 'rgba(15, 23, 42, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.12)',
  },
  ageText: {
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
    paddingVertical: 11,
    borderRadius: BorderRadius.md,
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
  listButtonLight: {
    backgroundColor: 'rgba(15, 23, 42, 0.06)',
    borderColor: 'rgba(15, 23, 42, 0.12)',
  },
  listText: {
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
  infoButtonLight: {
    backgroundColor: 'rgba(15, 23, 42, 0.06)',
    borderColor: 'rgba(15, 23, 42, 0.12)',
  },
});
