import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Share,
  Alert,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {
  Play,
  Plus,
  Check,
  Download,
  Share2,
  Star,
  CheckCircle2,
  X,
} from 'lucide-react-native';
import { Movie } from '@/types';
import { StreamHubColors } from '@/constants';
import { useTheme } from '@/hooks';

interface MovieActionsBarProps {
  movie: Movie;
  onPlayPress: () => void;
  onUpgradeVipPress?: () => void;
}

export function MovieActionsBar({
  movie,
  onPlayPress,
  onUpgradeVipPress,
}: MovieActionsBarProps) {
  const { theme } = useTheme();
  const [isSaved, setIsSaved] = useState(false);
  const [downloadState, setDownloadState] = useState<'idle' | 'downloading' | 'downloaded'>('idle');
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [userRating, setUserRating] = useState(5);
  const [hasRated, setHasRated] = useState(false);

  const handleToggleSave = () => {
    setIsSaved((prev) => {
      const next = !prev;
      Alert.alert(
        next ? '✅ Đã thêm vào Danh sách' : 'ℹ️ Đã xóa khỏi Danh sách',
        next
          ? `"${movie.title}" đã được lưu vào Danh sách xem sau.`
          : `Đã xóa "${movie.title}" khỏi Danh sách xem sau.`
      );
      return next;
    });
  };

  const handleDownload = () => {
    if (downloadState === 'downloaded') {
      Alert.alert('📥 Tải xuống ngoại tuyến', `"${movie.title}" đã có sẵn trong máy của bạn.`);
      return;
    }
    if (downloadState === 'downloading') return;

    setDownloadState('downloading');
    setDownloadProgress(20);

    const timer1 = setTimeout(() => setDownloadProgress(55), 700);
    const timer2 = setTimeout(() => setDownloadProgress(90), 1400);
    const timer3 = setTimeout(() => {
      setDownloadState('downloaded');
      setDownloadProgress(100);
      Alert.alert('✅ Tải xuống hoàn tất', `Phim "${movie.title}" đã tải về máy với chất lượng 1080p Full HD.`);
    }, 2000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  };

  const handleShare = async () => {
    try {
      await Share.share({
        title: movie.title,
        message: `Đang xem phim cực hay "${movie.title}" (${movie.year}) trên StreamHub! Cùng xem ngay nhé: https://streamhub.vn/watch/${movie.slug}`,
      });
    } catch {
      // Ignore cancel
    }
  };

  const handleSubmitRating = () => {
    setHasRated(true);
    setShowRatingModal(false);
    Alert.alert(
      '⭐ Cảm ơn bạn!',
      `Bạn đã đánh giá ${userRating}/5 sao cho phim "${movie.title}". Đánh giá của bạn đã được ghi nhận.`
    );
  };

  return (
    <View style={styles.container}>
      {/* Primary Action Button: Phát Phim */}
      <TouchableOpacity
        style={styles.mainPlayButton}
        onPress={onPlayPress}
        activeOpacity={0.88}
      >
        <Play size={20} color="#FFFFFF" fill="#FFFFFF" />
        <Text style={styles.mainPlayButtonText}>Xem Phim Ngay</Text>
      </TouchableOpacity>

      {/* Secondary Actions Row */}
      <View style={styles.actionsRow}>
        {/* 1. Add to My List */}
        <TouchableOpacity
          style={styles.actionItem}
          onPress={handleToggleSave}
          activeOpacity={0.7}
        >
          <View
            style={[
              styles.actionIconCircle,
              { backgroundColor: theme.card, borderColor: theme.border },
              isSaved && styles.actionIconCircleActive,
            ]}
          >
            {isSaved ? (
              <Check size={20} color="#10B981" />
            ) : (
              <Plus size={20} color={theme.text} />
            )}
          </View>
          <Text style={[styles.actionLabel, { color: theme.textMuted }]}>
            {isSaved ? 'Đã Lưu' : 'Danh Sách'}
          </Text>
        </TouchableOpacity>

        {/* 2. Download Offline */}
        <TouchableOpacity
          style={styles.actionItem}
          onPress={handleDownload}
          activeOpacity={0.7}
        >
          <View
            style={[
              styles.actionIconCircle,
              { backgroundColor: theme.card, borderColor: theme.border },
              downloadState === 'downloaded' && styles.actionIconCircleSuccess,
            ]}
          >
            {downloadState === 'downloading' ? (
              <ActivityIndicator size="small" color={StreamHubColors.primary} />
            ) : downloadState === 'downloaded' ? (
              <CheckCircle2 size={20} color="#10B981" />
            ) : (
              <Download size={20} color={theme.text} />
            )}
          </View>
          <Text style={[styles.actionLabel, { color: theme.textMuted }]}>
            {downloadState === 'downloading'
              ? `${downloadProgress}%`
              : downloadState === 'downloaded'
              ? 'Đã Tải'
              : 'Tải Về'}
          </Text>
        </TouchableOpacity>

        {/* 3. Rating */}
        <TouchableOpacity
          style={styles.actionItem}
          onPress={() => setShowRatingModal(true)}
          activeOpacity={0.7}
        >
          <View
            style={[
              styles.actionIconCircle,
              { backgroundColor: theme.card, borderColor: theme.border },
              hasRated && styles.actionIconCircleWarning,
            ]}
          >
            <Star
              size={20}
              color={hasRated ? '#F59E0B' : theme.text}
              fill={hasRated ? '#F59E0B' : 'transparent'}
            />
          </View>
          <Text style={[styles.actionLabel, { color: theme.textMuted }]}>
            {hasRated ? `${userRating} ⭐` : 'Đánh Giá'}
          </Text>
        </TouchableOpacity>

        {/* 4. Share */}
        <TouchableOpacity
          style={styles.actionItem}
          onPress={handleShare}
          activeOpacity={0.7}
        >
          <View
            style={[
              styles.actionIconCircle,
              { backgroundColor: theme.card, borderColor: theme.border },
            ]}
          >
            <Share2 size={20} color={theme.text} />
          </View>
          <Text style={[styles.actionLabel, { color: theme.textMuted }]}>
            Chia Sẻ
          </Text>
        </TouchableOpacity>
      </View>

      {/* Interactive Rating Modal */}
      <Modal
        visible={showRatingModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowRatingModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalCard,
              { backgroundColor: theme.card, borderColor: theme.border },
            ]}
          >
            <TouchableOpacity
              style={styles.modalCloseBtn}
              onPress={() => setShowRatingModal(false)}
            >
              <X size={18} color={theme.textMuted} />
            </TouchableOpacity>

            <Text style={[styles.modalTitle, { color: theme.text }]}>
              Đánh giá phim
            </Text>
            <Text style={[styles.modalSub, { color: theme.textMuted }]}>
              {movie.title}
            </Text>

            {/* Stars Row */}
            <View style={styles.starsRow}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity
                  key={star}
                  onPress={() => setUserRating(star)}
                  style={styles.starTouch}
                >
                  <Star
                    size={36}
                    color="#F59E0B"
                    fill={star <= userRating ? '#F59E0B' : 'transparent'}
                  />
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.ratingScoreText}>
              {userRating === 5
                ? 'Tuyệt đỉnh điện ảnh! 🌟'
                : userRating === 4
                ? 'Rất đáng xem! 👍'
                : userRating === 3
                ? 'Xem ổn định 👌'
                : 'Chưa như kỳ vọng'}
            </Text>

            <TouchableOpacity
              style={styles.submitRatingBtn}
              onPress={handleSubmitRating}
              activeOpacity={0.88}
            >
              <Text style={styles.submitRatingBtnText}>Gửi Đánh Giá</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 16,
  },
  mainPlayButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: StreamHubColors.primary,
    paddingVertical: 14,
    borderRadius: 14,
    gap: 10,
    shadowColor: StreamHubColors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.45,
    shadowRadius: 10,
    elevation: 6,
  },
  mainPlayButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 4,
  },
  actionItem: {
    alignItems: 'center',
    gap: 6,
    minWidth: 64,
  },
  actionIconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  actionIconCircleActive: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderColor: '#10B981',
  },
  actionIconCircleSuccess: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderColor: '#10B981',
  },
  actionIconCircleWarning: {
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    borderColor: '#F59E0B',
  },
  actionLabel: {
    fontSize: 12,
    fontWeight: '600',
  },

  /* Rating Modal */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalCard: {
    width: '100%',
    maxWidth: 340,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    position: 'relative',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 10,
  },
  modalCloseBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 4,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  modalSub: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 20,
    textAlign: 'center',
  },
  starsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 16,
  },
  starTouch: {
    padding: 4,
  },
  ratingScoreText: {
    color: '#F59E0B',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 24,
  },
  submitRatingBtn: {
    width: '100%',
    backgroundColor: StreamHubColors.primary,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitRatingBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
