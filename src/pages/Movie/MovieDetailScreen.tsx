import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Sparkles, Film, Users, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react-native';
import { Movie, Episode } from '@/types';
import { getMovieById, ALL_MOVIES, StreamHubColors } from '@/constants';
import { useTheme } from '@/hooks';
import { MoviePlayer } from './MoviePlayer';
import { MovieActionsBar } from './MovieActionsBar';
import { EpisodesRail } from './EpisodesRail';
import { CastList } from './CastList';
import { CommentsSection } from './CommentsSection';
import { MovieRail } from '@/components';

type DetailTabKey = 'episodes' | 'cast' | 'comments';

export function MovieDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { theme, isDark } = useTheme();

  const movie: Movie = getMovieById(id);
  const similarMovies = ALL_MOVIES.filter((m) => m.id !== movie.id);

  const [activeTab, setActiveTab] = useState<DetailTabKey>('episodes');
  const [activeEpisode, setActiveEpisode] = useState<Episode | null>(null);
  const [isDescExpanded, setIsDescExpanded] = useState(false);

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  };

  const handleUpgradeVip = () => {
    router.push('/vip' as any);
  };

  const handleMoviePress = (targetMovie: Movie) => {
    router.push({
      pathname: '/movie/[id]',
      params: { id: targetMovie.id },
    } as any);
  };

  const handleSelectEpisode = (episode: Episode) => {
    setActiveEpisode(episode);
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.background }]}
    >
      <StatusBar style={isDark ? 'light' : 'dark'} />

      {/* 1. Main Media Video Player / Hero */}
      <MoviePlayer
        movie={movie}
        activeEpisode={activeEpisode}
        onBack={handleBack}
        onUpgradeVip={handleUpgradeVip}
      />

      {/* 2. Scrollable Details Body */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Title & Metadata Section */}
        <View style={styles.headerSection}>
          <Text style={[styles.mainTitle, { color: theme.text }]}>
            {movie.title}
          </Text>

          {movie.originalTitle && (
            <Text style={[styles.originalTitle, { color: theme.textMuted }]}>
              {movie.originalTitle}
            </Text>
          )}

          {/* Badges / Chips Row */}
          <View style={styles.metaRow}>
            <View style={styles.matchBadge}>
              <Text style={styles.matchBadgeText}>⭐ 98% Phù hợp</Text>
            </View>

            <View style={[styles.metaPill, { borderColor: theme.border }]}>
              <Text style={[styles.metaPillText, { color: theme.textSecondary || theme.textMuted }]}>
                {movie.year}
              </Text>
            </View>

            <View style={[styles.metaPill, { borderColor: theme.border }]}>
              <Text style={[styles.metaPillText, { color: theme.textSecondary || theme.textMuted }]}>
                {movie.ageRating}
              </Text>
            </View>

            <View style={[styles.metaPill, { borderColor: theme.border }]}>
              <Text style={[styles.metaPillText, { color: theme.textSecondary || theme.textMuted }]}>
                {movie.duration} phút
              </Text>
            </View>

            <View style={styles.qualityPill}>
              <Text style={styles.qualityPillText}>4K HDR</Text>
            </View>
          </View>

          {/* Audio specifications */}
          <View style={styles.techSpecsRow}>
            <Text style={[styles.techSpecText, { color: theme.textMuted }]}>
              Âm thanh: Dolby Atmos 5.1 • Phụ đề: {movie.language || 'Vietsub'}
            </Text>
          </View>
        </View>

        {/* Action Buttons (Play, List, Download, Rate, Share) */}
        <MovieActionsBar
          movie={movie}
          onPlayPress={() => {
            // Can trigger top player or focus
          }}
          onUpgradeVipPress={handleUpgradeVip}
        />

        {/* VIP Premium Promotional Callout */}
        {movie.isPremium && (
          <TouchableOpacity
            style={styles.vipCallout}
            activeOpacity={0.88}
            onPress={handleUpgradeVip}
          >
            <View style={styles.vipCalloutIcon}>
              <Sparkles size={20} color="#000000" />
            </View>
            <View style={styles.vipCalloutTextCol}>
              <Text style={styles.vipCalloutTitle}>
                Nội Dung Dành Cho Hội Viên VIP
              </Text>
              <Text style={styles.vipCalloutDesc}>
                Xem trọn vẹn chất lượng 4K UHD, không quảng cáo chỉ từ 59.000đ
              </Text>
            </View>
            <View style={styles.vipCalloutBtn}>
              <Text style={styles.vipCalloutBtnText}>Nâng Cấp</Text>
            </View>
          </TouchableOpacity>
        )}

        {/* Synopsis / Description with Expand toggle */}
        <View style={styles.synopsisContainer}>
          <Text
            style={[styles.synopsisText, { color: theme.textSecondary || theme.textMuted }]}
            numberOfLines={isDescExpanded ? undefined : 3}
          >
            {movie.description}
          </Text>
          {movie.description.length > 120 && (
            <TouchableOpacity
              onPress={() => setIsDescExpanded((v) => !v)}
              style={styles.expandToggle}
            >
              <Text style={styles.expandToggleText}>
                {isDescExpanded ? 'Thu gọn' : 'Xem thêm'}
              </Text>
              {isDescExpanded ? (
                <ChevronUp size={14} color={StreamHubColors.primary} />
              ) : (
                <ChevronDown size={14} color={StreamHubColors.primary} />
              )}
            </TouchableOpacity>
          )}
        </View>

        {/* Tabs Bar: Tập phim | Diễn viên & Chi tiết | Bình luận */}
        <View style={[styles.tabBar, { borderBottomColor: theme.border }]}>
          <TouchableOpacity
            style={[
              styles.tabItem,
              activeTab === 'episodes' && styles.tabItemActive,
            ]}
            onPress={() => setActiveTab('episodes')}
          >
            <Film
              size={16}
              color={
                activeTab === 'episodes'
                  ? StreamHubColors.primary
                  : theme.textMuted
              }
            />
            <Text
              style={[
                styles.tabItemText,
                {
                  color:
                    activeTab === 'episodes'
                      ? StreamHubColors.primary
                      : theme.textMuted,
                  fontWeight: activeTab === 'episodes' ? '700' : '500',
                },
              ]}
            >
              {movie.movieType === 'SERIES' ? 'Tập Phim' : 'Phiên Bản'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabItem,
              activeTab === 'cast' && styles.tabItemActive,
            ]}
            onPress={() => setActiveTab('cast')}
          >
            <Users
              size={16}
              color={
                activeTab === 'cast'
                  ? StreamHubColors.primary
                  : theme.textMuted
              }
            />
            <Text
              style={[
                styles.tabItemText,
                {
                  color:
                    activeTab === 'cast'
                      ? StreamHubColors.primary
                      : theme.textMuted,
                  fontWeight: activeTab === 'cast' ? '700' : '500',
                },
              ]}
            >
              Diễn Viên
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabItem,
              activeTab === 'comments' && styles.tabItemActive,
            ]}
            onPress={() => setActiveTab('comments')}
          >
            <MessageSquare
              size={16}
              color={
                activeTab === 'comments'
                  ? StreamHubColors.primary
                  : theme.textMuted
              }
            />
            <Text
              style={[
                styles.tabItemText,
                {
                  color:
                    activeTab === 'comments'
                      ? StreamHubColors.primary
                      : theme.textMuted,
                  fontWeight: activeTab === 'comments' ? '700' : '500',
                },
              ]}
            >
              Bình Luận
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content Display */}
        {activeTab === 'episodes' && (
          <EpisodesRail
            movie={movie}
            activeEpisode={activeEpisode}
            onSelectEpisode={handleSelectEpisode}
          />
        )}

        {activeTab === 'cast' && (
          <CastList
            castMembers={movie.castMembers}
            director={movie.director}
            genres={movie.genres}
          />
        )}

        {activeTab === 'comments' && (
          <CommentsSection movieRating={movie.rating} />
        )}

        {/* Similar / Recommended Content (Reusing shared MovieRail component) */}
        <View style={styles.similarRailWrapper}>
          <MovieRail
            title="Nội Dung Tương Tự"
            movies={similarMovies}
            onMoviePress={handleMoviePress}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  similarRailWrapper: {
    marginTop: 16,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  headerSection: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 6,
    gap: 6,
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  originalTitle: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 4,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  matchBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  matchBadgeText: {
    color: '#10B981',
    fontSize: 11,
    fontWeight: '700',
  },
  metaPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
  },
  metaPillText: {
    fontSize: 11,
    fontWeight: '600',
  },
  qualityPill: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },
  qualityPillText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
  techSpecsRow: {
    marginTop: 4,
  },
  techSpecText: {
    fontSize: 12,
    fontWeight: '500',
  },

  /* VIP Callout Banner */
  vipCallout: {
    marginHorizontal: 16,
    marginVertical: 6,
    backgroundColor: 'rgba(251, 191, 36, 0.12)',
    borderRadius: 14,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: 'rgba(251, 191, 36, 0.3)',
  },
  vipCalloutIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FBBF24',
    alignItems: 'center',
    justifyContent: 'center',
  },
  vipCalloutTextCol: {
    flex: 1,
    gap: 2,
  },
  vipCalloutTitle: {
    color: '#FBBF24',
    fontSize: 13,
    fontWeight: '700',
  },
  vipCalloutDesc: {
    color: '#CBD5E1',
    fontSize: 11,
    lineHeight: 15,
  },
  vipCalloutBtn: {
    backgroundColor: '#FBBF24',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  vipCalloutBtnText: {
    color: '#000000',
    fontSize: 12,
    fontWeight: '800',
  },

  /* Synopsis */
  synopsisContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  synopsisText: {
    fontSize: 13,
    lineHeight: 20,
  },
  expandToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  expandToggleText: {
    color: StreamHubColors.primary,
    fontSize: 12,
    fontWeight: '700',
  },

  /* Tab Bar */
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    marginTop: 10,
    paddingHorizontal: 16,
  },
  tabItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 12,
    marginRight: 20,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabItemActive: {
    borderBottomColor: StreamHubColors.primary,
  },
  tabItemText: {
    fontSize: 13,
  },
});
