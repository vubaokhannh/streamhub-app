import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import { Image } from 'expo-image';
import { Star, ThumbsUp, Send } from 'lucide-react-native';
import { MovieComment } from '@/types';
import { StreamHubColors, MOCK_MOVIE_COMMENTS } from '@/constants';
import { useTheme } from '@/hooks';

interface CommentsSectionProps {
  movieRating: number;
}

export function CommentsSection({ movieRating }: CommentsSectionProps) {
  const { theme } = useTheme();
  const [comments, setComments] = useState<MovieComment[]>(MOCK_MOVIE_COMMENTS);
  const [newCommentText, setNewCommentText] = useState('');

  const handleSendComment = () => {
    if (!newCommentText.trim()) return;

    const newComment: MovieComment = {
      id: `cm-${Date.now()}`,
      userName: 'Bạn (Người dùng)',
      avatarUrl:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      rating: 5,
      content: newCommentText.trim(),
      createdAt: 'Vừa xong',
      likesCount: 1,
      isLiked: true,
    };

    setComments((prev) => [newComment, ...prev]);
    setNewCommentText('');
    Keyboard.dismiss();
  };

  const handleToggleLike = (commentId: string) => {
    setComments((prev) =>
      prev.map((c) => {
        if (c.id === commentId) {
          const isLiked = !c.isLiked;
          return {
            ...c,
            isLiked,
            likesCount: isLiked ? c.likesCount + 1 : c.likesCount - 1,
          };
        }
        return c;
      })
    );
  };

  return (
    <View style={styles.container}>
      {/* Rating Overview Card */}
      <View
        style={[
          styles.overviewCard,
          { backgroundColor: theme.card, borderColor: theme.border },
        ]}
      >
        <View style={styles.scoreCol}>
          <Text style={[styles.bigScore, { color: theme.text }]}>
            {movieRating.toFixed(1)}
          </Text>
          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                size={14}
                color="#F59E0B"
                fill={s <= Math.round(movieRating) ? '#F59E0B' : 'transparent'}
              />
            ))}
          </View>
          <Text style={[styles.reviewsCountText, { color: theme.textMuted }]}>
            1.2k lượt đánh giá
          </Text>
        </View>

        <View style={styles.ratingBarsCol}>
          {[
            { star: 5, pct: '88%' },
            { star: 4, pct: '9%' },
            { star: 3, pct: '2%' },
            { star: 2, pct: '1%' },
            { star: 1, pct: '0%' },
          ].map((item) => (
            <View key={item.star} style={styles.barRow}>
              <Text style={[styles.barStarText, { color: theme.textMuted }]}>
                {item.star}★
              </Text>
              <View
                style={[styles.barTrack, { backgroundColor: theme.border }]}
              >
                <View
                  style={[
                    styles.barFill,
                    {
                      width: item.pct,
                      backgroundColor:
                        item.star >= 4
                          ? StreamHubColors.primary
                          : '#94A3B8',
                    },
                  ]}
                />
              </View>
              <Text style={[styles.barPctText, { color: theme.textMuted }]}>
                {item.pct}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Input New Comment */}
      <View
        style={[
          styles.inputContainer,
          { backgroundColor: theme.card, borderColor: theme.border },
        ]}
      >
        <TextInput
          style={[styles.textInput, { color: theme.text }]}
          placeholder="Viết nhận xét của bạn về phim..."
          placeholderTextColor={theme.textMuted}
          value={newCommentText}
          onChangeText={setNewCommentText}
          multiline
        />
        <TouchableOpacity
          style={[
            styles.sendBtn,
            newCommentText.trim() ? styles.sendBtnActive : null,
          ]}
          onPress={handleSendComment}
          disabled={!newCommentText.trim()}
        >
          <Send size={18} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Comments List */}
      <View style={styles.commentsList}>
        {comments.map((comment) => (
          <View
            key={comment.id}
            style={[
              styles.commentItem,
              { backgroundColor: theme.card, borderColor: theme.border },
            ]}
          >
            <View style={styles.commentHeader}>
              <Image
                source={{ uri: comment.avatarUrl }}
                style={styles.commentAvatar}
                contentFit="cover"
              />
              <View style={styles.commentUserMeta}>
                <Text style={[styles.commentUserName, { color: theme.text }]}>
                  {comment.userName}
                </Text>
                <View style={styles.commentSubMeta}>
                  <View style={styles.starsInline}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        size={11}
                        color="#F59E0B"
                        fill={s <= comment.rating ? '#F59E0B' : 'transparent'}
                      />
                    ))}
                  </View>
                  <Text style={[styles.commentTime, { color: theme.textMuted }]}>
                    • {comment.createdAt}
                  </Text>
                </View>
              </View>

              {/* Like Button */}
              <TouchableOpacity
                style={styles.likeBtn}
                onPress={() => handleToggleLike(comment.id)}
              >
                <ThumbsUp
                  size={15}
                  color={comment.isLiked ? StreamHubColors.primary : theme.textMuted}
                  fill={comment.isLiked ? StreamHubColors.primary : 'transparent'}
                />
                <Text
                  style={[
                    styles.likeCountText,
                    {
                      color: comment.isLiked
                        ? StreamHubColors.primary
                        : theme.textMuted,
                    },
                  ]}
                >
                  {comment.likesCount}
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={[styles.commentBody, { color: theme.textSecondary || theme.textMuted }]}>
              {comment.content}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 14,
  },
  overviewCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    gap: 16,
    alignItems: 'center',
  },
  scoreCol: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 80,
    gap: 4,
  },
  bigScore: {
    fontSize: 34,
    fontWeight: '900',
    letterSpacing: -1,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 2,
  },
  reviewsCountText: {
    fontSize: 11,
    fontWeight: '500',
  },
  ratingBarsCol: {
    flex: 1,
    gap: 4,
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  barStarText: {
    fontSize: 10,
    fontWeight: '600',
    width: 20,
  },
  barTrack: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 3,
  },
  barPctText: {
    fontSize: 10,
    fontWeight: '600',
    width: 28,
    textAlign: 'right',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 13,
    maxHeight: 70,
    paddingVertical: 6,
  },
  sendBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#64748B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtnActive: {
    backgroundColor: StreamHubColors.primary,
  },
  commentsList: {
    gap: 10,
  },
  commentItem: {
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    gap: 8,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  commentAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#1E293B',
  },
  commentUserMeta: {
    flex: 1,
  },
  commentUserName: {
    fontSize: 13,
    fontWeight: '700',
  },
  commentSubMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  starsInline: {
    flexDirection: 'row',
    gap: 2,
  },
  commentTime: {
    fontSize: 11,
  },
  likeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    padding: 6,
  },
  likeCountText: {
    fontSize: 12,
    fontWeight: '600',
  },
  commentBody: {
    fontSize: 13,
    lineHeight: 18,
  },
});
