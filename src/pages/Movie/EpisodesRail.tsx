import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Image } from 'expo-image';
import { Play, CheckCircle2, Sparkles } from 'lucide-react-native';
import { Movie, Season, Episode } from '@/types';
import { StreamHubColors } from '@/constants';
import { useTheme } from '@/hooks';

interface EpisodesRailProps {
  movie: Movie;
  activeEpisode: Episode | null;
  onSelectEpisode: (episode: Episode) => void;
}

export function EpisodesRail({
  movie,
  activeEpisode,
  onSelectEpisode,
}: EpisodesRailProps) {
  const { theme } = useTheme();
  const seasons: Season[] = movie.seasons || [];

  const [selectedSeasonId, setSelectedSeasonId] = useState<string>(
    seasons.length > 0 ? seasons[0].id : ''
  );

  const currentSeason =
    seasons.find((s) => s.id === selectedSeasonId) || seasons[0];
  const episodes = currentSeason ? currentSeason.episodes : [];

  // Fallback for standalone movie without seasons
  if (seasons.length === 0 || episodes.length === 0) {
    return (
      <View style={styles.standaloneContainer}>
        <View
          style={[
            styles.standaloneCard,
            { backgroundColor: theme.card, borderColor: theme.border },
          ]}
        >
          <View style={styles.standaloneBadge}>
            <Sparkles size={14} color="#FBBF24" />
            <Text style={styles.standaloneBadgeText}>Bản Chiếu Rạp 4K UHD</Text>
          </View>
          <Text style={[styles.standaloneTitle, { color: theme.text }]}>
            Phiên bản đầy đủ (Director's Cut)
          </Text>
          <Text style={[styles.standaloneDesc, { color: theme.textMuted }]}>
            Bản dựng hoàn chỉnh với thời lượng {movie.duration} phút, độ phân giải 4K HDR10+ và âm thanh vòm Dolby Atmos đa kênh.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Season Picker Selector */}
      {seasons.length > 1 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.seasonsScroll}
        >
          {seasons.map((season) => {
            const isSelected = season.id === currentSeason.id;
            return (
              <TouchableOpacity
                key={season.id}
                onPress={() => setSelectedSeasonId(season.id)}
                style={[
                  styles.seasonPill,
                  {
                    backgroundColor: isSelected
                      ? StreamHubColors.primary
                      : theme.card,
                    borderColor: isSelected
                      ? StreamHubColors.primary
                      : theme.border,
                  },
                ]}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.seasonPillText,
                    {
                      color: isSelected ? '#FFFFFF' : theme.text,
                      fontWeight: isSelected ? '700' : '500',
                    },
                  ]}
                >
                  {season.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}

      {/* Episodes List */}
      <View style={styles.episodesList}>
        {episodes.map((ep) => {
          const isCurrent = activeEpisode?.id === ep.id;
          return (
            <TouchableOpacity
              key={ep.id}
              style={[
                styles.episodeCard,
                {
                  backgroundColor: theme.card,
                  borderColor: isCurrent
                    ? StreamHubColors.primary
                    : theme.border,
                },
                isCurrent && styles.episodeCardActive,
              ]}
              onPress={() => onSelectEpisode(ep)}
              activeOpacity={0.85}
            >
              {/* Thumbnail Container */}
              <View style={styles.thumbWrapper}>
                <Image
                  source={{ uri: ep.thumbnailUrl || movie.backdropUrl }}
                  style={styles.thumbImg}
                  contentFit="cover"
                  transition={200}
                />
                <View style={styles.thumbOverlay}>
                  <View
                    style={[
                      styles.playMiniCircle,
                      isCurrent && { backgroundColor: StreamHubColors.primary },
                    ]}
                  >
                    <Play size={14} color="#FFFFFF" fill="#FFFFFF" />
                  </View>
                </View>
                <View style={styles.durationPill}>
                  <Text style={styles.durationPillText}>{ep.duration}m</Text>
                </View>
              </View>

              {/* Episode Info */}
              <View style={styles.epInfo}>
                <View style={styles.epHeaderRow}>
                  <Text
                    style={[
                      styles.epTitle,
                      { color: isCurrent ? StreamHubColors.primary : theme.text },
                    ]}
                    numberOfLines={1}
                  >
                    {ep.title}
                  </Text>
                  {isCurrent && (
                    <CheckCircle2 size={16} color={StreamHubColors.primary} />
                  )}
                </View>
                <Text
                  style={[styles.epDesc, { color: theme.textMuted }]}
                  numberOfLines={2}
                >
                  {movie.description}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 12,
  },
  seasonsScroll: {
    flexDirection: 'row',
    gap: 10,
    paddingVertical: 4,
  },
  seasonPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  seasonPillText: {
    fontSize: 13,
  },
  episodesList: {
    gap: 12,
  },
  episodeCard: {
    flexDirection: 'row',
    borderRadius: 14,
    padding: 10,
    borderWidth: 1,
    gap: 12,
    alignItems: 'center',
  },
  episodeCardActive: {
    backgroundColor: 'rgba(249, 115, 22, 0.08)',
  },
  thumbWrapper: {
    width: 110,
    height: 68,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#000000',
  },
  thumbImg: {
    width: '100%',
    height: '100%',
  },
  thumbOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playMiniCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  durationPill: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 4,
  },
  durationPillText: {
    color: '#CBD5E1',
    fontSize: 9,
    fontWeight: '700',
  },
  epInfo: {
    flex: 1,
    justifyContent: 'center',
    gap: 4,
  },
  epHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 6,
  },
  epTitle: {
    fontSize: 14,
    fontWeight: '700',
    flex: 1,
  },
  epDesc: {
    fontSize: 12,
    lineHeight: 16,
  },

  /* Standalone movie card */
  standaloneContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  standaloneCard: {
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    gap: 8,
  },
  standaloneBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(251, 191, 36, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  standaloneBadgeText: {
    color: '#FBBF24',
    fontSize: 12,
    fontWeight: '700',
  },
  standaloneTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  standaloneDesc: {
    fontSize: 13,
    lineHeight: 18,
  },
});
