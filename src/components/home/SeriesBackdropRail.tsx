import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Image } from 'expo-image';
import { Play, Sparkles } from 'lucide-react-native';
import { Movie } from '@/types';
import { StreamHubColors, Spacing, Typography, BorderRadius } from '@/constants/theme';
import { useTheme } from '@/hooks';

interface SeriesBackdropRailProps {
  title: string;
  movies: Movie[];
  onMoviePress?: (movie: Movie) => void;
}

export function SeriesBackdropRail({
  title,
  movies,
  onMoviePress,
}: SeriesBackdropRailProps) {
  const { theme, isDark } = useTheme();

  if (!movies || movies.length === 0) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.accentBar} />
        <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollList}
      >
        {movies.map((movie) => (
          <TouchableOpacity
            key={movie.id}
            activeOpacity={0.8}
            onPress={() => onMoviePress?.(movie)}
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
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: movie.backdropUrl || movie.posterUrl }}
                style={styles.image}
                contentFit="cover"
                transition={250}
              />
              <View style={styles.overlay} />

              {/* Play Badge */}
              <View style={styles.playBadge}>
                <Play size={12} color="#FFFFFF" fill="#FFFFFF" style={{ marginLeft: 2 }} />
              </View>

              {/* Episode count tag */}
              {movie.totalEpisodes ? (
                <View style={styles.epTag}>
                  <Text style={styles.epText}>Tập {movie.totalEpisodes}</Text>
                </View>
              ) : null}

              {/* VIP tag */}
              {movie.isPremium ? (
                <View style={styles.vipTag}>
                  <Sparkles size={8} color="#000000" />
                  <Text style={styles.vipText}>VIP</Text>
                </View>
              ) : null}
            </View>

            {/* Bottom Title & Year */}
            <View style={styles.info}>
              <Text style={[styles.movieTitle, { color: theme.text }]} numberOfLines={1}>
                {movie.title}
              </Text>
              <Text style={[styles.subText, { color: theme.textMuted }]}>
                {movie.genres.slice(0, 2).join(' • ')}
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
    gap: Spacing.sm + 2,
  },
  card: {
    width: 190,
    borderRadius: BorderRadius.md,
    backgroundColor: StreamHubColors.card,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: 108,
    position: 'relative',
    backgroundColor: '#0E1428',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  playBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: StreamHubColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: StreamHubColors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 3,
  },
  epTag: {
    position: 'absolute',
    top: 6,
    left: 6,
    backgroundColor: 'rgba(5, 8, 22, 0.85)',
    borderColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  epText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: Typography.weight.bold,
  },
  vipTag: {
    position: 'absolute',
    top: 6,
    right: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: StreamHubColors.vip,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
  },
  vipText: {
    color: '#000000',
    fontSize: 8,
    fontWeight: Typography.weight.heavy,
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
