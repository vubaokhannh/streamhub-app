import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { Image } from 'expo-image';
import { Sparkles, Star } from 'lucide-react-native';
import { Movie } from '@/types';
import { StreamHubColors, Spacing, Typography, BorderRadius } from '@/constants/theme';
import { useTheme } from '@/hooks';

interface TopRankingRailProps {
  movies: Movie[];
  onMoviePress?: (movie: Movie) => void;
}

export function TopRankingRail({ movies, onMoviePress }: TopRankingRailProps) {
  const { theme, isDark } = useTheme();
  const { width: windowWidth } = useWindowDimensions();

  // Cơ chế tính toán linh hoạt: cardWidth = Math.ceil((windowWidth - paddingHorizontal - 2 * gap) / 3)
  // Đảm bảo vừa vặn đúng 3 card trên màn hình, card thứ 4 hoàn toàn không bị ló ra
  const paddingHorizontal = Spacing.md * 2;
  const gap = Spacing.md;
  const cardWidth = Math.ceil((windowWidth - paddingHorizontal - 2 * gap) / 3);
  const cardHeight = Math.round(cardWidth * 1.5);

  if (!movies || movies.length === 0) return null;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.accentBar} />
        <Text style={[styles.title, { color: theme.text }]}>Top Thịnh Hành Hôm Nay</Text>
      </View>

      {/* Horizontal Rail */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollList}
      >
        {movies.slice(0, 10).map((movie, index) => {
          return (
            <TouchableOpacity
              key={`${movie.id}-top-${index}`}
              activeOpacity={0.82}
              onPress={() => onMoviePress?.(movie)}
              style={[styles.cardItem, { width: cardWidth, height: cardHeight }]}
            >
              {/* Poster Card */}
              <View
                style={[
                  styles.poster,
                  {
                    backgroundColor: theme.card,
                    borderColor: theme.border,
                  },
                  !isDark && styles.posterLight,
                ]}
              >
                <Image
                  source={{ uri: movie.posterUrl || movie.backdropUrl }}
                  style={styles.image}
                  contentFit="cover"
                  transition={250}
                />

                {/* VIP Tag */}
                {movie.isPremium ? (
                  <View style={styles.vipBadge}>
                    <Sparkles size={8} color="#000000" />
                    <Text style={styles.vipText}>VIP</Text>
                  </View>
                ) : null}

                {/* Rating Badge at Bottom */}
                <View style={styles.ratingBadge}>
                  <Star size={10} color="#FBBF24" fill="#FBBF24" />
                  <Text style={styles.ratingText}>{movie.rating.toFixed(1)}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.xs + 2,
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
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  scrollList: {
    paddingHorizontal: Spacing.md,
    gap: Spacing.md,
  },
  cardItem: {},
  poster: {
    width: '100%',
    height: '100%',
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    borderWidth: 1,
    position: 'relative',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 4,
  },
  posterLight: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  vipBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
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
  ratingBadge: {
    position: 'absolute',
    bottom: 6,
    left: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: 'rgba(0, 0, 0, 0.68)',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  ratingText: {
    color: '#FBBF24',
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.bold,
  },
});
