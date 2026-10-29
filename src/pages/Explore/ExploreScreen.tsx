import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  useWindowDimensions,
  Modal,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  Search,
  X,
  Star,
  Play,
  Plus,
  Check,
  Crown,
  Sparkles,
  Flame,
  Tv,
  Film,
  Compass,
  Share2,
  Heart,
  Skull,
  Award,
  Clapperboard,
  SlidersHorizontal,
} from 'lucide-react-native';
import { StreamHubColors, Typography, BorderRadius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks';
import { MainLayout } from '@/layouts';
import { MoviePosterCard, SectionHeader } from '@/components';
import {
  HERO_MOVIES,
  RECOMMENDED_MOVIES,
  SERIES_MOVIES,
} from '@/constants/mockData';
import { Movie } from '@/types';

// Extended list of movies for Explore Page
const ALL_EXPLORE_MOVIES: Movie[] = [
  ...HERO_MOVIES,
  ...RECOMMENDED_MOVIES,
  ...SERIES_MOVIES,
  {
    id: 'exp-1',
    title: 'Furiosa: Câu Chuyện Từ Mad Max',
    originalTitle: 'Furiosa: A Mad Max Saga',
    slug: 'furiosa-a-mad-max-saga',
    description: 'Nguồn gốc của nữ chiến binh Furiosa khi cô bị bắt khỏi Vùng Xanh và rơi vào tay Lãnh chúa Dementus.',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/wNAhuOZ3Zf84jCI5TeTVlYkfMN0.jpg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/iADOJ8Zymht2JPMoy3R7xUMZ51f.jpg',
    rating: 4.8,
    year: 2024,
    duration: 148,
    ageRating: 'T18',
    movieType: 'MOVIE',
    genres: ['Hành động', 'Khoa học viễn tưởng', 'Phiêu lưu'],
    director: 'George Miller',
    isPremium: true,
    language: 'Vietsub',
  },
  {
    id: 'exp-2',
    title: 'Gia Đình Điệp Viên: Code White',
    originalTitle: 'SPY x FAMILY CODE: White',
    slug: 'spy-x-family-code-white',
    description: 'Chuyến đi nghỉ mát của gia đình Forger bất ngờ biến thành nhiệm vụ giải cứu hòa bình thế giới kịch tính.',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/oBIQ5iqIQSA5KM84QYqc4x29TXw.jpg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/nxxScbZ37i2e5d7BwS82e7Uq8sR.jpg',
    rating: 4.9,
    year: 2024,
    duration: 110,
    ageRating: 'T13',
    movieType: 'CARTOON',
    genres: ['Hoạt hình', 'Hài hước', 'Hành động'],
    isPremium: false,
    language: 'Lồng tiếng',
  },
  {
    id: 'exp-3',
    title: 'Godzilla x Kong: Đế Chế Mới',
    originalTitle: 'Godzilla x Kong: The New Empire',
    slug: 'godzilla-x-kong',
    description: 'Hai quái thú huyền thoại hợp lực đối đầu một mối hiểm họa khổng lồ đe dọa sự diệt vong của loài người.',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/xOMo8BRK7PfcJv9JCnx7s520QIq.jpg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/tMefBSflR6PGQLv7WvFPpKLZkyk.jpg',
    rating: 4.6,
    year: 2024,
    duration: 115,
    ageRating: 'T13',
    movieType: 'MOVIE',
    genres: ['Hành động', 'Khoa học viễn tưởng'],
    isPremium: true,
    language: 'Thuyết minh',
  },
  {
    id: 'exp-4',
    title: 'Vùng Đất Câm Lặng: Ngày Một',
    originalTitle: 'A Quiet Place: Day One',
    slug: 'a-quiet-place-day-one',
    description: 'Trải nghiệm ngày đầu tiên thế giới chìm vào câm lặng khi lũ quái vật săn mồi bằng âm thanh đổ bộ New York.',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/2RVcJbWFmICRDsEjRI8zL39izIn.jpg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/hU1Q9YVzdYwh89696Q404G7wRzZ.jpg',
    rating: 4.7,
    year: 2024,
    duration: 100,
    ageRating: 'T16',
    movieType: 'MOVIE',
    genres: ['Kinh dị', 'Khoa học viễn tưởng', 'Kịch tính'],
    isPremium: true,
    language: 'Vietsub',
  },
  {
    id: 'exp-5',
    title: 'Lật Mặt 7: Một Điều Ước',
    originalTitle: 'Face Off 7: One Wish',
    slug: 'lat-mat-7',
    description: 'Câu chuyện gia đình xúc động lấy đi nước mắt hàng triệu khán giả về tình mẫu tử thiêng liêng của bà Hai.',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/s16H6tpK2utvwDtzZ8Qy4qm5Emw.jpg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg',
    rating: 4.9,
    year: 2024,
    duration: 138,
    ageRating: 'T13',
    movieType: 'MOVIE',
    genres: ['Chính kịch', 'Gia đình', 'Tâm lý'],
    director: 'Lý Hải',
    isPremium: false,
    language: 'Tiếng Việt',
  },
  {
    id: 'exp-6',
    title: 'Joker: Điên Có Đôi',
    originalTitle: 'Joker: Folie à Deux',
    slug: 'joker-folie-a-deux',
    description: 'Arthur Fleck bị giam giữ tại Arkham chờ ngày xét xử và bất ngờ tìm thấy tình yêu đích thực cùng âm nhạc.',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/uDgy6hyPd82kOHh6I95FLtLnj6p.jpg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/if8QiqCI7WAGImKcJCfzp6VTyKA.jpg',
    rating: 4.5,
    year: 2024,
    duration: 138,
    ageRating: 'T18',
    movieType: 'MOVIE',
    genres: ['Chính kịch', 'Tội phạm', 'Âm nhạc'],
    director: 'Todd Phillips',
    isPremium: true,
    language: 'Vietsub',
  },
];

// Rich Genre Hub Cards (Spotify/Netflix category tiles)
const EXPLORE_HUBS = [
  { id: 'hub-act', name: 'Hành Động Bom Tấn', genreKey: 'Hành động', icon: Flame, color: '#EF4444', gradientBg: '#991B1B' },
  { id: 'hub-sci', name: 'Khoa Học Viễn Tưởng', genreKey: 'Khoa học viễn tưởng', icon: Sparkles, color: '#3B82F6', gradientBg: '#1E40AF' },
  { id: 'hub-ani', name: 'Anime & Hoạt Hình', genreKey: 'Hoạt hình', icon: Compass, color: '#10B981', gradientBg: '#065F46' },
  { id: 'hub-ser', name: 'Phim Bộ Độc Quyền', genreKey: 'Phim bộ', icon: Tv, color: '#8B5CF6', gradientBg: '#5B21B6' },
  { id: 'hub-hor', name: 'Kinh Dị & Gay Cấn', genreKey: 'Kinh dị', icon: Skull, color: '#F43F5E', gradientBg: '#9F1239' },
  { id: 'hub-dra', name: 'Chính Kịch & Tâm Lý', genreKey: 'Chính kịch', icon: Award, color: '#F59E0B', gradientBg: '#B45309' },
  { id: 'hub-rom', name: 'Tình Cảm Lãng Mạn', genreKey: 'Tình cảm', icon: Heart, color: '#EC4899', gradientBg: '#9D174D' },
  { id: 'hub-cin', name: 'Chiếu Rạp Mới Nhất', genreKey: 'Tất cả', icon: Clapperboard, color: '#06B6D4', gradientBg: '#0E7490' },
];

const QUICK_SEARCH_TAGS = ['Dune 2', 'Arcane', 'Deadpool', 'Stranger Things', 'Lật Mặt 7', '4K HDR'];

export function ExploreScreen() {
  const router = useRouter();
  const { theme, isDark } = useTheme();
  const { width: windowWidth } = useWindowDimensions();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('Tất cả');
  const [filterVipOnly, setFilterVipOnly] = useState(false);
  const [filterHighRating, setFilterHighRating] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [savedMovieIds, setSavedMovieIds] = useState<string[]>(['hero-1', 'rec-2']);

  // Exactly 3 cards across the screen in Grid view
  const gridCardWidth = Math.floor((windowWidth - Spacing.md * 2 - 16) / 3);

  // Filter movies by search query, genre, VIP, and rating
  const filteredMovies = useMemo(() => {
    return ALL_EXPLORE_MOVIES.filter((movie) => {
      const matchSearch =
        searchQuery.trim() === '' ||
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (movie.originalTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
        movie.genres.some((g) => g.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchGenre =
        selectedGenre === 'Tất cả' ||
        movie.genres.includes(selectedGenre) ||
        (selectedGenre === 'Phim bộ' && movie.movieType === 'SERIES');

      const matchVip = !filterVipOnly || movie.isPremium;
      const matchRating = !filterHighRating || movie.rating >= 4.8;

      return matchSearch && matchGenre && matchVip && matchRating;
    });
  }, [searchQuery, selectedGenre, filterVipOnly, filterHighRating]);

  const toggleSaveMovie = (movieId: string) => {
    setSavedMovieIds((prev) =>
      prev.includes(movieId) ? prev.filter((id) => id !== movieId) : [...prev, movieId]
    );
  };

  const isFilteringOrSearching =
    searchQuery.trim().length > 0 ||
    selectedGenre !== 'Tất cả' ||
    filterVipOnly ||
    filterHighRating;

  return (
    <MainLayout
      activeTab="explore"
      onTabChange={(tab) => {
        if (tab === 'home') router.push('/');
        else if (tab === 'vip') router.push('/vip' as any);
        else if (tab === 'profile') router.push('/profile');
      }}
      headerProps={{
        title: 'Khám Phá & Tìm Kiếm',
        showLogo: true,
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ========================================================================= */}
        {/* 1. COMPACT SEARCH BAR & TRENDING TAGS                                     */}
        {/* ========================================================================= */}
        <View style={styles.searchSection}>
          <View
            style={[
              styles.searchBar,
              {
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : '#F1F5F9',
                borderColor: theme.border,
              },
            ]}
          >
            <Search size={18} color={theme.textMuted} />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Tìm kiếm phim, anime, diễn viên..."
              placeholderTextColor={theme.textMuted}
              style={[styles.searchInput, { color: theme.text }]}
              returnKeyType="search"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity
                onPress={() => setSearchQuery('')}
                style={styles.clearBtn}
                accessibilityLabel="Xóa tìm kiếm"
              >
                <X size={16} color={theme.textMuted} />
              </TouchableOpacity>
            )}
          </View>

          {/* Quick Trending Keyword Tags */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.trendingTagsScroll}
          >
            <View style={styles.trendingTagLabel}>
              <Flame size={12} color="#EF4444" fill="#EF4444" />
              <Text style={[styles.trendingTagLabelText, { color: theme.textMuted }]}>
                Hot:
              </Text>
            </View>
            {QUICK_SEARCH_TAGS.map((tag) => (
              <TouchableOpacity
                key={tag}
                activeOpacity={0.75}
                onPress={() => setSearchQuery(tag)}
                style={[
                  styles.quickTagChip,
                  {
                    backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#F1F5F9',
                    borderColor: theme.border,
                  },
                ]}
              >
                <Text style={[styles.quickTagText, { color: theme.text }]}>
                  {tag}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Quick Filter Matrix Buttons */}
          <View style={styles.filterPillsRow}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setFilterVipOnly(!filterVipOnly)}
              style={[
                styles.filterPill,
                {
                  backgroundColor: filterVipOnly
                    ? '#F59E0B'
                    : isDark
                    ? 'rgba(245, 158, 11, 0.12)'
                    : 'rgba(245, 158, 11, 0.08)',
                  borderColor: filterVipOnly ? '#F59E0B' : 'rgba(245, 158, 11, 0.3)',
                },
              ]}
            >
              <Crown
                size={12}
                color={filterVipOnly ? '#000000' : '#F59E0B'}
                fill={filterVipOnly ? '#000000' : 'none'}
              />
              <Text
                style={[
                  styles.filterPillText,
                  { color: filterVipOnly ? '#000000' : '#F59E0B' },
                ]}
              >
                Chỉ Phim VIP
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setFilterHighRating(!filterHighRating)}
              style={[
                styles.filterPill,
                {
                  backgroundColor: filterHighRating
                    ? StreamHubColors.primary
                    : isDark
                    ? 'rgba(255, 255, 255, 0.05)'
                    : '#F1F5F9',
                  borderColor: filterHighRating ? StreamHubColors.primary : theme.border,
                },
              ]}
            >
              <Star
                size={12}
                color={filterHighRating ? '#FFFFFF' : '#F59E0B'}
                fill={filterHighRating ? '#FFFFFF' : '#F59E0B'}
              />
              <Text
                style={[
                  styles.filterPillText,
                  { color: filterHighRating ? '#FFFFFF' : theme.text },
                ]}
              >
                Đánh giá cao (★ 4.8+)
              </Text>
            </TouchableOpacity>

            {isFilteringOrSearching && (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  setSearchQuery('');
                  setSelectedGenre('Tất cả');
                  setFilterVipOnly(false);
                  setFilterHighRating(false);
                }}
                style={[styles.resetFilterBtn, { borderColor: theme.border }]}
              >
                <X size={12} color={theme.textMuted} />
                <Text style={[styles.resetFilterText, { color: theme.textMuted }]}>
                  Đặt lại
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* ========================================================================= */}
        {/* 2. CATEGORY HUBS (Trung Tâm Thể Loại Đa Sắc Màu - Spotify Style)          */}
        {/* ========================================================================= */}
        {!isFilteringOrSearching && (
          <View style={styles.sectionBlock}>
            <SectionHeader
              title="Khám Phá Theo Chủ Đề"
              subtitle="Chọn danh mục bạn muốn thưởng thức hôm nay"
            />
            <View style={styles.hubsGrid}>
              {EXPLORE_HUBS.map((hub) => {
                const IconComponent = hub.icon;
                return (
                  <TouchableOpacity
                    key={hub.id}
                    activeOpacity={0.85}
                    onPress={() => setSelectedGenre(hub.genreKey)}
                    style={[
                      styles.hubCard,
                      {
                        backgroundColor: isDark ? '#111827' : '#FFFFFF',
                        borderColor: theme.border,
                      },
                    ]}
                  >
                    <View
                      style={[
                        styles.hubIconCircle,
                        { backgroundColor: `${hub.color}18` },
                      ]}
                    >
                      <IconComponent size={22} color={hub.color} />
                    </View>
                    <Text
                      style={[styles.hubCardName, { color: theme.text }]}
                      numberOfLines={1}
                    >
                      {hub.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

        {/* ========================================================================= */}
        {/* 3. 3-COLUMN MOVIE GRID (Hiển thị trọn vẹn 3 card trên màn hình)          */}
        {/* ========================================================================= */}
        <View style={styles.sectionBlock}>
          <SectionHeader
            title={
              isFilteringOrSearching
                ? searchQuery.trim()
                  ? `Kết quả cho "${searchQuery}"`
                  : `Danh mục: ${selectedGenre}`
                : 'Kho Phim Thịnh Hành'
            }
            subtitle={`${filteredMovies.length} phim sẵn sàng phát`}
          />

          {filteredMovies.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Film size={44} color={theme.textMuted} />
              <Text style={[styles.emptyTitle, { color: theme.text }]}>
                Không tìm thấy phim phù hợp
              </Text>
              <Text style={[styles.emptySub, { color: theme.textMuted }]}>
                Hãy thử tìm kiếm với tên phim khác hoặc bấm "Đặt lại" bộ lọc.
              </Text>
            </View>
          ) : (
            <View style={styles.moviesGrid}>
              {filteredMovies.map((movie) => (
                <MoviePosterCard
                  key={movie.id}
                  movie={movie}
                  width={gridCardWidth}
                  onPress={setSelectedMovie}
                />
              ))}
            </View>
          )}
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>

      {/* ========================================================================= */}
      {/* 4. INTERACTIVE MOVIE DETAIL MODAL                                         */}
      {/* ========================================================================= */}
      <Modal
        visible={!!selectedMovie}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedMovie(null)}
      >
        {selectedMovie && (
          <View style={styles.modalBackdrop}>
            <View
              style={[
                styles.modalCard,
                { backgroundColor: isDark ? '#0A0F1D' : '#FFFFFF' },
              ]}
            >
              {/* Close Button */}
              <TouchableOpacity
                onPress={() => setSelectedMovie(null)}
                style={styles.modalCloseBtn}
                accessibilityLabel="Đóng chi tiết"
              >
                <X size={20} color="#FFFFFF" />
              </TouchableOpacity>

              {/* Backdrop Image Header */}
              <View style={styles.modalImageContainer}>
                <Image
                  source={{ uri: selectedMovie.backdropUrl }}
                  style={styles.modalBackdropImage}
                  resizeMode="cover"
                />
                <View style={styles.modalImageOverlay} />

                {selectedMovie.isPremium && (
                  <View style={styles.modalVipTag}>
                    <Crown size={12} color="#000000" fill="#000000" />
                    <Text style={styles.modalVipTagText}>STREAMHUB VIP</Text>
                  </View>
                )}
              </View>

              {/* Modal Details Body */}
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.modalBody}
              >
                <Text style={[styles.modalTitle, { color: theme.text }]}>
                  {selectedMovie.title}
                </Text>
                <Text style={[styles.modalOriginalTitle, { color: theme.textMuted }]}>
                  {selectedMovie.originalTitle}
                </Text>

                {/* Metadata Row */}
                <View style={styles.modalMetaRow}>
                  <View style={styles.modalRatingBox}>
                    <Star size={13} color="#F59E0B" fill="#F59E0B" />
                    <Text style={styles.modalRatingText}>
                      {selectedMovie.rating}
                    </Text>
                  </View>

                  <Text style={[styles.modalMetaText, { color: theme.textMuted }]}>
                    {selectedMovie.year}
                  </Text>

                  <View style={styles.ageBadge}>
                    <Text style={styles.ageBadgeText}>
                      {selectedMovie.ageRating}
                    </Text>
                  </View>

                  <Text style={[styles.modalMetaText, { color: theme.textMuted }]}>
                    {selectedMovie.duration} phút
                  </Text>

                  <Text
                    style={[
                      styles.modalMetaText,
                      { color: StreamHubColors.primary, fontWeight: '700' },
                    ]}
                  >
                    4K HDR
                  </Text>
                </View>

                {/* Action CTA Buttons */}
                <View style={styles.modalActionsRow}>
                  <TouchableOpacity
                    activeOpacity={0.88}
                    onPress={() => setSelectedMovie(null)}
                    style={styles.modalPlayBtn}
                  >
                    <Play size={18} color="#FFFFFF" fill="#FFFFFF" />
                    <Text style={styles.modalPlayBtnText}>Phát Phim</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => toggleSaveMovie(selectedMovie.id)}
                    style={[
                      styles.modalSecondaryBtn,
                      { borderColor: theme.border },
                    ]}
                  >
                    {savedMovieIds.includes(selectedMovie.id) ? (
                      <Check size={20} color="#10B981" />
                    ) : (
                      <Plus size={20} color={theme.text} />
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {}}
                    style={[
                      styles.modalSecondaryBtn,
                      { borderColor: theme.border },
                    ]}
                  >
                    <Share2 size={18} color={theme.text} />
                  </TouchableOpacity>
                </View>

                {/* Synopsis */}
                <Text style={[styles.modalSynopsis, { color: theme.text }]}>
                  {selectedMovie.description}
                </Text>

                {/* Genres & Details */}
                <View style={styles.modalDetailsList}>
                  <View style={styles.modalDetailRow}>
                    <Text style={[styles.modalDetailLabel, { color: theme.textMuted }]}>
                      Thể loại:
                    </Text>
                    <Text style={[styles.modalDetailValue, { color: theme.text }]}>
                      {selectedMovie.genres.join(', ')}
                    </Text>
                  </View>

                  {selectedMovie.director && (
                    <View style={styles.modalDetailRow}>
                      <Text style={[styles.modalDetailLabel, { color: theme.textMuted }]}>
                        Đạo diễn:
                      </Text>
                      <Text style={[styles.modalDetailValue, { color: theme.text }]}>
                        {selectedMovie.director}
                      </Text>
                    </View>
                  )}

                  <View style={styles.modalDetailRow}>
                    <Text style={[styles.modalDetailLabel, { color: theme.textMuted }]}>
                      Âm thanh & Phụ đề:
                    </Text>
                    <Text style={[styles.modalDetailValue, { color: theme.text }]}>
                      Dolby Atmos • {selectedMovie.language}
                    </Text>
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
        )}
      </Modal>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 100,
    gap: Spacing.md,
  },

  /* Search & Trending */
  searchSection: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.xs,
    gap: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    height: 46,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    paddingHorizontal: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    fontWeight: Typography.weight.medium,
  },
  clearBtn: {
    padding: 4,
  },
  trendingTagsScroll: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 2,
  },
  trendingTagLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginRight: 2,
  },
  trendingTagLabelText: {
    fontSize: 11,
    fontWeight: Typography.weight.bold,
  },
  quickTagChip: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
  },
  quickTagText: {
    fontSize: 11,
    fontWeight: Typography.weight.medium,
  },
  filterPillsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
    paddingTop: 2,
  },
  filterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
  },
  filterPillText: {
    fontSize: 11.5,
    fontWeight: Typography.weight.bold,
  },
  resetFilterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
  },
  resetFilterText: {
    fontSize: 11,
    fontWeight: Typography.weight.medium,
  },

  /* Section Block */
  sectionBlock: {
    paddingHorizontal: Spacing.md,
    gap: 8,
  },

  /* Category Hubs Grid (Spotify style) */
  hubsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  hubCard: {
    width: '48.5%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
  },
  hubIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hubCardName: {
    fontSize: 12.5,
    fontWeight: Typography.weight.bold,
    flex: 1,
  },

  /* 3-Column Movie Grid */
  moviesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    gap: 8,
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: Typography.weight.bold,
  },
  emptySub: {
    fontSize: 12,
    textAlign: 'center',
    maxWidth: 260,
  },

  /* Modal Details */
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    maxHeight: '88%',
    overflow: 'hidden',
  },
  modalCloseBtn: {
    position: 'absolute',
    top: 14,
    right: 14,
    zIndex: 10,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalImageContainer: {
    height: 200,
    width: '100%',
    position: 'relative',
  },
  modalBackdropImage: {
    width: '100%',
    height: '100%',
  },
  modalImageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },
  modalVipTag: {
    position: 'absolute',
    bottom: 12,
    left: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#F59E0B',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  modalVipTagText: {
    color: '#000000',
    fontSize: 10,
    fontWeight: Typography.weight.heavy,
  },
  modalBody: {
    padding: 16,
    gap: 12,
    paddingBottom: 40,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: Typography.weight.bold,
  },
  modalOriginalTitle: {
    fontSize: 13,
    marginTop: -8,
  },
  modalMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  modalRatingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  modalRatingText: {
    fontSize: 13,
    color: '#F59E0B',
    fontWeight: Typography.weight.bold,
  },
  modalMetaText: {
    fontSize: 12,
  },
  ageBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  ageBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: Typography.weight.bold,
  },
  modalActionsRow: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: 4,
  },
  modalPlayBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: StreamHubColors.primary,
    height: 44,
    borderRadius: BorderRadius.md,
  },
  modalPlayBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: Typography.weight.bold,
  },
  modalSecondaryBtn: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalSynopsis: {
    fontSize: 13,
    lineHeight: 20,
  },
  modalDetailsList: {
    gap: 6,
    paddingTop: 4,
  },
  modalDetailRow: {
    flexDirection: 'row',
    gap: 6,
  },
  modalDetailLabel: {
    fontSize: 12,
    width: 120,
  },
  modalDetailValue: {
    fontSize: 12,
    flex: 1,
    fontWeight: Typography.weight.medium,
  },
});
