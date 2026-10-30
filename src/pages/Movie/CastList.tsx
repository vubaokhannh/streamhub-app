import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
} from 'react-native';
import { Image } from 'expo-image';
import { MovieCast } from '@/types';
import { useTheme } from '@/hooks';

interface CastListProps {
  castMembers?: MovieCast[];
  director?: string;
  genres: string[];
}

export function CastList({
  castMembers,
  director,
  genres,
}: CastListProps) {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      {/* Genres Chips */}
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Thể Loại
        </Text>
      </View>
      <View style={styles.genresRow}>
        {genres.map((g) => (
          <View
            key={g}
            style={[
              styles.genreChip,
              { backgroundColor: theme.card, borderColor: theme.border },
            ]}
          >
            <Text style={[styles.genreChipText, { color: theme.textSecondary || theme.textMuted }]}>
              {g}
            </Text>
          </View>
        ))}
      </View>

      {/* Director */}
      {director && (
        <View style={styles.directorBox}>
          <Text style={[styles.directorLabel, { color: theme.textMuted }]}>
            Đạo diễn:
          </Text>
          <Text style={[styles.directorName, { color: theme.text }]}>
            {director}
          </Text>
        </View>
      )}

      {/* Cast Members */}
      {castMembers && castMembers.length > 0 && (
        <>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Diễn Viên Chính
            </Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.castScroll}
          >
            {castMembers.map((member) => (
              <View key={member.id} style={styles.castCard}>
                <Image
                  source={{ uri: member.avatarUrl }}
                  style={[styles.castAvatar, { borderColor: theme.border }]}
                  contentFit="cover"
                  transition={200}
                />
                <Text
                  style={[styles.castName, { color: theme.text }]}
                  numberOfLines={1}
                >
                  {member.name}
                </Text>
                <Text
                  style={[styles.castRole, { color: theme.textMuted }]}
                  numberOfLines={1}
                >
                  {member.character}
                </Text>
              </View>
            ))}
          </ScrollView>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 14,
  },
  sectionHeader: {
    marginBottom: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  genresRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  genreChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
  },
  genreChipText: {
    fontSize: 12,
    fontWeight: '600',
  },
  directorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 4,
  },
  directorLabel: {
    fontSize: 13,
    fontWeight: '500',
  },
  directorName: {
    fontSize: 14,
    fontWeight: '700',
  },
  castScroll: {
    flexDirection: 'row',
    gap: 14,
    paddingVertical: 4,
  },
  castCard: {
    alignItems: 'center',
    width: 82,
    gap: 4,
  },
  castAvatar: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 1.5,
    backgroundColor: '#1E293B',
  },
  castName: {
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
  },
  castRole: {
    fontSize: 11,
    textAlign: 'center',
  },
});
