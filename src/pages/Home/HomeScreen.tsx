import React, { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { MainLayout, BottomTabKey } from '@/layouts';
import {
  CategoryPills,
  HomeHero,
  MovieRail,
  TopRankingRail,
  SeriesBackdropRail,
  VipBannerCard,
} from '@/components';
import {
  HERO_MOVIES,
  RECOMMENDED_MOVIES,
  SERIES_MOVIES,
  VIP_PLANS,
} from '@/constants';
import { apiService } from '@/services';
import { Movie } from '@/types';

export function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [activeTab, setActiveTab] = useState<BottomTabKey>('home');

  // React Query to fetch real-time movies when backend is running
  const { data: remoteMovies } = useQuery({
    queryKey: ['landingMovies'],
    queryFn: async () => {
      const res = await apiService.get<Movie[]>('/movies');
      return res.data && res.data.length > 0 ? res.data : null;
    },
    staleTime: 1000 * 60 * 5,
  });

  const featuredMovie =
    remoteMovies && remoteMovies.length > 0 ? remoteMovies[0] : HERO_MOVIES[0];

  const topRankingList = [
    featuredMovie,
    ...RECOMMENDED_MOVIES,
    ...SERIES_MOVIES,
  ];

  const moviesList =
    remoteMovies && remoteMovies.length > 1 ? remoteMovies : RECOMMENDED_MOVIES;

  const seriesList = SERIES_MOVIES;

  const handlePlayMovie = (movie: Movie) => {
    router.push({
      pathname: '/movie/[id]',
      params: { id: movie.id },
    } as any);
  };

  const handleAddList = (movie: Movie) => {
    Alert.alert(
      '✅ Đã thêm vào danh sách',
      `"${movie.title}" đã được lưu vào Danh sách xem sau của bạn.`
    );
  };

  const handleMovieInfo = (movie: Movie) => {
    router.push({
      pathname: '/movie/[id]',
      params: { id: movie.id },
    } as any);
  };

  const handleUpgradeVip = () => {
    const popularPlan = VIP_PLANS.find((p) => p.isPopular) || VIP_PLANS[0];
    Alert.alert(
      '👑 Nâng Cấp StreamHub VIP',
      `Gói đề xuất: ${popularPlan.name}\nGiá: ${popularPlan.price.toLocaleString(
        'vi-VN'
      )}đ / ${popularPlan.durationDays} ngày\n\n• Xem trọn kho phim không giới hạn\n• Không quảng cáo làm phiền\n• Độ phân giải 4K Ultra HD\n• Âm thanh Dolby Atmos`,
      [
        { text: 'Để sau', style: 'cancel' },
        {
          text: 'Đăng Ký Ngay',
          onPress: () => router.push('/vip' as any),
        },
      ]
    );
  };

  const handleSearch = () => {
    router.push('/explore' as any);
  };

  const handleNotification = () => {
    Alert.alert('🔔 Thông báo', 'Bạn không có thông báo mới nào.');
  };

  const router = useRouter();

  const handleTabChange = (tab: BottomTabKey) => {
    setActiveTab(tab);
    if (tab === 'explore') {
      router.push('/explore' as any);
    } else if (tab === 'profile') {
      router.push('/profile');
    } else if (tab === 'vip') {
      router.push('/vip' as any);
    }
  };

  return (
    <MainLayout
      activeTab={activeTab}
      onTabChange={handleTabChange}
      headerProps={{
        onSearchPress: handleSearch,
        onNotificationPress: handleNotification,
        bottomSlot: (
          <CategoryPills
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        ),
      }}
    >
      {/* Main Content Area */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* 1. Hero Card */}
        <HomeHero
          movie={featuredMovie}
          onPlayPress={handlePlayMovie}
          onAddListPress={handleAddList}
          onInfoPress={handleMovieInfo}
        />

        {/* 2. Compact VIP Subscription Banner */}
        <VipBannerCard onUpgradePress={handleUpgradeVip} />

        {/* 3. Top 10 Ranking Rail with Oversized Numbers */}
        <TopRankingRail
          movies={topRankingList}
          onMoviePress={handlePlayMovie}
        />

        {/* 4. Phim Điện Ảnh Chiếu Rạp (Vertical 2:3 Posters) */}
        <MovieRail
          title="Phim Điện Ảnh Chiếu Rạp"
          movies={moviesList}
          onMoviePress={handlePlayMovie}
          onViewMore={() => Alert.alert('Xem thêm', 'Mở danh mục Phim điện ảnh.')}
        />

        {/* 5. Phim Bộ Hot Đang Cập Nhật (16:9 Backdrop Cards) */}
        <SeriesBackdropRail
          title="Phim Bộ Hot Đang Cập Nhật"
          movies={seriesList}
          onMoviePress={handlePlayMovie}
        />

        {/* 6. Phim Mới Đề Cử Cho Bạn (Vertical 2:3 Posters) */}
        <MovieRail
          title="Đề Cử Dành Riêng Cho Bạn"
          movies={HERO_MOVIES}
          onMoviePress={handlePlayMovie}
          onViewMore={() => Alert.alert('Xem thêm', 'Mở danh mục Đề cử.')}
        />
      </ScrollView>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 24,
    gap: 6,
  },
});
