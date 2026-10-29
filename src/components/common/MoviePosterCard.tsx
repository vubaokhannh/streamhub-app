import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Image } from 'expo-image';
import { Star, Sparkles } from 'lucide-react-native';
import { Movie } from '@/types';
import { StreamHubColors, Typography, BorderRadius } from '@/constants/theme';

interface MoviePosterCardProps {
  movie: Movie;
  onPress?: (movie: Movie) => void;
  width?: number;
}

export function MoviePosterCard({
  movie,
  onPress,
  width = 118,
}: MoviePosterCardProps) {
  const height = Math.round(width * 1.5);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onPress?.(movie)}
      style={[styles.container, { width }]}
    >
      {/* Poster Image Container */}
      <View style={[styles.posterWrapper, { height }]}>
        <Image
          source={{ uri: movie.posterUrl || movie.backdropUrl }}
          style={styles.image}
          contentFit="cover"
          transition={250}
        />

        {/* Top Badges */}
        <View style={styles.badgeTopRight}>
          {movie.isPremium ? (
            <View style={styles.vipBadge}>
              <Sparkles size={8} color="#000000" />
              <Text style={styles.vipText}>VIP</Text>
            </View>
          ) : null}
        </View>

        {movie.totalEpisodes ? (
          <View style={styles.badgeTopLeft}>
            <Text style={styles.epText}>Tập {movie.totalEpisodes}</Text>
          </View>
        ) : null}

        {/* Bottom Rating Gradient */}
        <View style={styles.bottomShadow}>
          <View style={styles.ratingBox}>
            <Star size={9} color="#FBBF24" fill="#FBBF24" />
            <Text style={styles.ratingText}>{movie.rating.toFixed(1)}</Text>
          </View>
          {movie.language ? (
            <Text style={styles.langText}>{movie.language}</Text>
          ) : null}
        </View>
      </View>

      {/* Movie Title */}
      <Text style={styles.title} numberOfLines={1}>
        {movie.title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 5,
  },
  posterWrapper: {
    width: '100%',
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#0E1428',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  badgeTopRight: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  vipBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: StreamHubColors.vip,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 3,
  },
  vipText: {
    color: '#000000',
    fontSize: 8,
    fontWeight: Typography.weight.heavy,
  },
  badgeTopLeft: {
    position: 'absolute',
    top: 5,
    left: 5,
    backgroundColor: StreamHubColors.primary,
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 3,
  },
  epText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: Typography.weight.bold,
  },
  bottomShadow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 36,
    backgroundColor: 'rgba(5, 8, 22, 0.85)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 6,
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  ratingText: {
    color: '#FBBF24',
    fontSize: 9,
    fontWeight: Typography.weight.bold,
  },
  langText: {
    color: StreamHubColors.textSecondary,
    fontSize: 8,
    fontWeight: Typography.weight.medium,
  },
  title: {
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.semibold,
    color: '#FFFFFF',
  },
});
