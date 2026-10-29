import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { Movie } from '@/types';
import { MoviePosterCard } from '@/components/common/MoviePosterCard';
import { StreamHubColors, Spacing, Typography } from '@/constants/theme';

interface MovieRailProps {
  title: string;
  movies: Movie[];
  onMoviePress?: (movie: Movie) => void;
  onViewMore?: () => void;
}

export function MovieRail({
  title,
  movies,
  onMoviePress,
  onViewMore,
}: MovieRailProps) {
  if (!movies || movies.length === 0) return null;

  return (
    <View style={styles.container}>
      {/* Rail Header */}
      <View style={styles.header}>
        <View style={styles.titleWrapper}>
          <View style={styles.accentBar} />
          <Text style={styles.title}>{title}</Text>
        </View>

        {onViewMore ? (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onViewMore}
            style={styles.moreButton}
          >
            <Text style={styles.moreText}>Xem thêm</Text>
            <ChevronRight size={13} color={StreamHubColors.primary} />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Horizontal Cards Scroll */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollList}
      >
        {movies.map((movie) => (
          <MoviePosterCard
            key={movie.id}
            movie={movie}
            onPress={onMoviePress}
          />
        ))}
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
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
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
  moreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  moreText: {
    color: StreamHubColors.primary,
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.semibold,
  },
  scrollList: {
    paddingHorizontal: Spacing.md,
    gap: 10,
  },
});
