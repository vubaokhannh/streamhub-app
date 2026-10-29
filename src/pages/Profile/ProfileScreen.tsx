import React, { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MainLayout, BottomTabKey } from '@/layouts';
import {
  ProfileHeroCard,
  ProfileStats,
  WatchHistoryRail,
  ProfileSettingsSection,
  MovieRail,
} from '@/components';
import {
  MOCK_USER,
  MOCK_WATCH_HISTORY,
  MOCK_DEVICES,
  RECOMMENDED_MOVIES,
} from '@/constants';
import { WatchHistoryItem, Movie } from '@/types';

export function ProfileScreen() {
  const router = useRouter();
  const [user] = useState(MOCK_USER);
  const [devices] = useState(MOCK_DEVICES);
  const [watchHistory] = useState(MOCK_WATCH_HISTORY);
  const [watchlist] = useState(RECOMMENDED_MOVIES.slice(0, 4));

  const handleEditAvatar = () => {
    Alert.alert('📸 Ảnh đại diện', 'Chọn ảnh đại diện mới từ thư viện ảnh hoặc máy ảnh.');
  };

  const handleManageSubscription = () => {
    Alert.alert(
      '⭐ Quản Lý Gói Cước',
      `Gói hiện tại: ${user.vipPlanName}\nThời hạn đến: ${user.vipExpiresAt}\n\n• Phát đồng thời 4 thiết bị\n• Chất lượng 4K HDR & Dolby Atmos`,
      [
        { text: 'Đóng', style: 'cancel' },
        { text: 'Gia Hạn Gói', onPress: () => router.push('/vip' as any) },
      ]
    );
  };

  const handlePlayHistoryItem = (item: WatchHistoryItem) => {
    Alert.alert(
      '▶️ Tiếp tục xem: ' + item.movie.title,
      `Đã xem: ${item.progressPercent}%\n${item.currentEpisode ? 'Tập ' + item.currentEpisode + '\n' : ''}Chất lượng: 4K Ultra HD`
    );
  };

  const handlePlayWatchlistMovie = (movie: Movie) => {
    Alert.alert('🎬 ' + movie.title, `Mở phim từ Danh sách yêu thích của bạn.`);
  };

  const handleLogout = () => {
    Alert.alert(
      'Đăng Xuất',
      'Bạn có chắc chắn muốn đăng xuất khỏi tài khoản StreamHub trên thiết bị này?',
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Đăng Xuất',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Đã đăng xuất', 'Hẹn gặp lại bạn trên StreamHub!');
            router.push('/');
          },
        },
      ]
    );
  };

  const handleHelp = () => {
    Alert.alert('❓ Hỗ trợ', 'Mở Trung tâm trợ giúp & các câu hỏi thường gặp.');
  };

  const handleTerms = () => {
    Alert.alert('📄 Điều khoản', 'Điều khoản dịch vụ và chính sách bảo mật StreamHub.');
  };

  const handleTabChange = (tab: BottomTabKey) => {
    if (tab === 'home') {
      router.push('/');
    } else if (tab === 'vip') {
      router.push('/vip' as any);
    } else if (tab !== 'profile') {
      Alert.alert('Chuyển tab', `Đang mở màn hình "${tab}".`);
    }
  };

  return (
    <MainLayout
      activeTab="profile"
      onTabChange={handleTabChange}
      headerProps={{
        title: 'Tài Khoản Của Tôi',
        showLogo: false,
        showBackButton: true,
        onBackPress: () => {
          if (router.canGoBack()) {
            router.back();
          } else {
            router.push('/');
          }
        },
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* 1. User Avatar, Name, Email & VIP Membership Card */}
        <ProfileHeroCard
          user={user}
          onEditAvatar={handleEditAvatar}
          onManageSubscription={handleManageSubscription}
        />

        {/* 2. Quick Stat Counters */}
        <ProfileStats
          watchlistCount={watchlist.length}
          watchHours={34}
          activeDevicesCount={devices.length}
          maxDevices={4}
          onDevicesPress={() => router.push('/devices-setting')}
        />

        {/* 3. Continue Watching / History */}
        <WatchHistoryRail
          items={watchHistory}
          onPlayPress={handlePlayHistoryItem}
        />

        {/* 4. Watchlist */}
        <MovieRail
          title="Phim Yêu Thích Của Tôi"
          movies={watchlist}
          onMoviePress={handlePlayWatchlistMovie}
          onViewMore={() => Alert.alert('Xem tất cả', 'Mở toàn bộ danh sách yêu thích.')}
        />

        {/* 5. Settings, Preferences & Logout */}
        <ProfileSettingsSection
          onLogout={handleLogout}
          onHelpPress={handleHelp}
          onTermsPress={handleTerms}
        />
      </ScrollView>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingVertical: 12,
    gap: 16,
  },
});
