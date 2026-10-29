import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Image } from 'expo-image';
import { Movie } from '@/types';
import { StreamHubColors, Spacing, Typography, BorderRadius } from '@/constants/theme';

interface TopRankingRailProps {
  movies: Movie[];
  onMoviePress?: (movie: Movie) => void;
}

export function TopRankingRail({ movies, onMoviePress }: TopRankingRailProps) {
  if (!movies || movies.length === 0) return null;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.accentBar} />
        <Text style={styles.title}>Top Thịnh Hành Hôm Nay</Text>
      </View>

      {/* Horizontal Rail */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollList}
      >
        {movies.slice(0, 10).map((movie, index) => {
          const rank = index + 1;
          return (
            <TouchableOpacity
              key={movie.id}
              activeOpacity={0.8}
              onPress={() => onMoviePress?.(movie)}
              style={styles.cardItem}
            >
              {/* Oversized Rank Number */}
              <View style={styles.rankWrapper}>
                <Text style={styles.rankText}>{rank}</Text>
              </View>

              {/* Poster Card */}
              <View style={styles.poster}>
                <Image
                  source={{ uri: movie.posterUrl || movie.backdropUrl }}
                  style={styles.image}
                  contentFit="cover"
                  transition={250}
                />
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
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  scrollList: {
    paddingHorizontal: Spacing.md,
    gap: Spacing.sm,
  },
  cardItem: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: 140,
    height: 165,
    position: 'relative',
  },
  rankWrapper: {
    position: 'absolute',
    left: -6,
    bottom: -14,
    zIndex: 1,
  },
  rankText: {
    fontSize: 82,
    fontWeight: Typography.weight.heavy,
    color: 'rgba(255, 255, 255, 0.12)',
    fontFamily: 'monospace',
    letterSpacing: -6,
  },
  poster: {
    width: 110,
    height: 155,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    marginLeft: 26,
    backgroundColor: '#0E1428',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    zIndex: 2,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
