import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { Image } from 'expo-image';
import { useVideoPlayer, VideoView } from 'expo-video';
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Maximize2,
  ArrowLeft,
  Sparkles,
  Sliders,
  Check,
} from 'lucide-react-native';
import { Movie, Episode } from '@/types';
import { StreamHubColors } from '@/constants';

interface MoviePlayerProps {
  movie: Movie;
  activeEpisode?: Episode | null;
  onBack: () => void;
  onUpgradeVip?: () => void;
  onVideoEnd?: () => void;
}

const SPEED_OPTIONS = [1.0, 1.25, 1.5, 2.0];
const QUALITY_OPTIONS = ['4K Ultra HD', '1080p Full HD', '720p HD'];

export function MoviePlayer({
  movie,
  activeEpisode,
  onBack,
  onUpgradeVip,
  onVideoEnd,
}: MoviePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [selectedQuality, setSelectedQuality] = useState('4K Ultra HD');
  const [showControls, setShowControls] = useState(true);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [showQualityMenu, setShowQualityMenu] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);

  const videoUri =
    activeEpisode?.videoUrl ||
    movie.videoUrl ||
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4';

  const player = useVideoPlayer(videoUri, (p) => {
    p.loop = false;
  });

  // Sync player events
  useEffect(() => {
    if (!player) return;

    const subscription = player.addListener('statusChange', (statusPayload: any) => {
      if (statusPayload?.status === 'idle') {
        setIsBuffering(false);
      } else if (statusPayload?.status === 'loading') {
        setIsBuffering(true);
      } else if (statusPayload?.status === 'readyToPlay') {
        setIsBuffering(false);
      } else if (statusPayload?.status === 'error') {
        setIsBuffering(false);
      }
    });

    const playSubscription = player.addListener('playToEnd', () => {
      setIsPlaying(false);
      if (onVideoEnd) onVideoEnd();
    });

    return () => {
      subscription?.remove();
      playSubscription?.remove();
    };
  }, [player, onVideoEnd]);

  // Handle speed change
  useEffect(() => {
    if (player) {
      try {
        player.playbackRate = playbackSpeed;
      } catch {
        // Safe fallback
      }
    }
  }, [playbackSpeed, player]);

  // Handle mute toggle
  useEffect(() => {
    if (player) {
      try {
        player.muted = isMuted;
      } catch {
        // Safe fallback
      }
    }
  }, [isMuted, player]);

  const handleStartPlay = () => {
    setHasStarted(true);
    setIsPlaying(true);
    try {
      player.play();
    } catch {
      // Safe fallback
    }
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      try {
        player.pause();
      } catch {}
      setIsPlaying(false);
    } else {
      try {
        player.play();
      } catch {}
      setIsPlaying(true);
    }
  };

  const handleSeek = (seconds: number) => {
    if (!player) return;
    try {
      const current = player.currentTime || 0;
      const target = Math.max(0, current + seconds);
      player.currentTime = target;
    } catch {}
  };

  const displayTitle = activeEpisode
    ? `${movie.title} - ${activeEpisode.title}`
    : movie.title;

  return (
    <View style={styles.container}>
      {/* Active Video Player */}
      {hasStarted ? (
        <View style={styles.videoWrapper}>
          <VideoView
            player={player}
            style={styles.videoView}
            contentFit="contain"
            nativeControls={false}
          />

          {/* Buffering Indicator */}
          {isBuffering && (
            <View style={styles.bufferingOverlay}>
              <ActivityIndicator size="large" color={StreamHubColors.primary} />
            </View>
          )}

          {/* Touch Area to Toggle Controls */}
          <TouchableOpacity
            activeOpacity={1}
            style={styles.touchArea}
            onPress={() => setShowControls((prev) => !prev)}
          >
            {showControls && (
              <View style={styles.controlsOverlay}>
                {/* Top Controls Bar */}
                <View style={styles.topBar}>
                  <TouchableOpacity
                    style={styles.iconCircleBtn}
                    onPress={onBack}
                    activeOpacity={0.8}
                  >
                    <ArrowLeft size={20} color="#FFFFFF" />
                  </TouchableOpacity>

                  <View style={styles.titleInfo}>
                    <Text style={styles.videoTitle} numberOfLines={1}>
                      {displayTitle}
                    </Text>
                    <View style={styles.badgesRow}>
                      <View style={styles.pillBadge}>
                        <Text style={styles.pillBadgeText}>{selectedQuality}</Text>
                      </View>
                      {movie.isPremium && (
                        <View style={styles.vipBadge}>
                          <Sparkles size={11} color="#000000" />
                          <Text style={styles.vipBadgeText}>VIP</Text>
                        </View>
                      )}
                    </View>
                  </View>

                  <View style={styles.topRightActions}>
                    <TouchableOpacity
                      style={styles.iconCircleBtn}
                      onPress={() => {
                        setShowQualityMenu((v) => !v);
                        setShowSpeedMenu(false);
                      }}
                    >
                      <Sliders size={18} color="#FFFFFF" />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.iconCircleBtn}
                      onPress={() => setIsMuted((m) => !m)}
                    >
                      {isMuted ? (
                        <VolumeX size={18} color="#EF4444" />
                      ) : (
                        <Volume2 size={18} color="#FFFFFF" />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Quality Switcher Menu */}
                {showQualityMenu && (
                  <View style={styles.popoverMenu}>
                    <Text style={styles.popoverHeader}>Chất lượng video</Text>
                    {QUALITY_OPTIONS.map((q) => (
                      <TouchableOpacity
                        key={q}
                        style={[
                          styles.popoverItem,
                          selectedQuality === q && styles.popoverItemActive,
                        ]}
                        onPress={() => {
                          setSelectedQuality(q);
                          setShowQualityMenu(false);
                        }}
                      >
                        <Text
                          style={[
                            styles.popoverItemText,
                            selectedQuality === q && styles.popoverItemTextActive,
                          ]}
                        >
                          {q}
                        </Text>
                        {selectedQuality === q && (
                          <Check size={16} color={StreamHubColors.primary} />
                        )}
                      </TouchableOpacity>
                    ))}
                  </View>
                )}

                {/* Speed Switcher Menu */}
                {showSpeedMenu && (
                  <View style={styles.popoverMenu}>
                    <Text style={styles.popoverHeader}>Tốc độ phát</Text>
                    {SPEED_OPTIONS.map((s) => (
                      <TouchableOpacity
                        key={s}
                        style={[
                          styles.popoverItem,
                          playbackSpeed === s && styles.popoverItemActive,
                        ]}
                        onPress={() => {
                          setPlaybackSpeed(s);
                          setShowSpeedMenu(false);
                        }}
                      >
                        <Text
                          style={[
                            styles.popoverItemText,
                            playbackSpeed === s && styles.popoverItemTextActive,
                          ]}
                        >
                          {s}x {s === 1.0 ? '(Chuẩn)' : ''}
                        </Text>
                        {playbackSpeed === s && (
                          <Check size={16} color={StreamHubColors.primary} />
                        )}
                      </TouchableOpacity>
                    ))}
                  </View>
                )}

                {/* Center Controls */}
                <View style={styles.centerControls}>
                  <TouchableOpacity
                    style={styles.seekBtn}
                    onPress={() => handleSeek(-10)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.seekIconContainer}>
                      <RotateCcw size={34} color="#FFFFFF" strokeWidth={1.8} />
                      <View style={styles.seekTextInsideWrapper}>
                        <Text style={styles.seekTextInside}>10</Text>
                      </View>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.playPauseLargeBtn}
                    onPress={handleTogglePlay}
                    activeOpacity={0.8}
                  >
                    {isPlaying ? (
                      <Pause size={22} color="#FFFFFF" fill="#FFFFFF" />
                    ) : (
                      <Play size={22} color="#FFFFFF" fill="#FFFFFF" style={styles.playCenterIconOffset} />
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.seekBtn}
                    onPress={() => handleSeek(10)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.seekIconContainer}>
                      <RotateCw size={34} color="#FFFFFF" strokeWidth={1.8} />
                      <View style={styles.seekTextInsideWrapper}>
                        <Text style={styles.seekTextInside}>10</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>

                {/* Bottom Bar */}
                <View style={styles.bottomBar}>
                  <TouchableOpacity
                    style={styles.speedPill}
                    onPress={() => {
                      setShowSpeedMenu((v) => !v);
                      setShowQualityMenu(false);
                    }}
                  >
                    <Text style={styles.speedPillText}>{playbackSpeed}x</Text>
                  </TouchableOpacity>

                  <View style={styles.liveIndicator}>
                    <View style={styles.liveDot} />
                    <Text style={styles.liveText}>StreamHub Player</Text>
                  </View>

                  <TouchableOpacity
                    style={styles.iconCircleBtn}
                    onPress={() => {
                      try {
                        // Native fullscreen
                      } catch {}
                    }}
                  >
                    <Maximize2 size={18} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
      ) : (
        /* Poster Preview Hero (Before Playing) */
        <View style={styles.posterHero}>
          <Image
            source={{ uri: movie.backdropUrl }}
            style={styles.posterImage}
            contentFit="cover"
            transition={300}
          />
          <View style={styles.gradientOverlay} />

          {/* Top Floating Back Button */}
          <TouchableOpacity
            style={styles.floatingBackBtn}
            onPress={onBack}
            activeOpacity={0.85}
          >
            <ArrowLeft size={22} color="#FFFFFF" />
          </TouchableOpacity>

          {/* Top Right Badges */}
          <View style={styles.topRightBadges}>
            {movie.isPremium && (
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.vipTag}
                onPress={onUpgradeVip}
              >
                <Sparkles size={12} color="#000000" />
                <Text style={styles.vipTagText}>VIP 4K</Text>
              </TouchableOpacity>
            )}
            <View style={styles.hdTag}>
              <Text style={styles.hdTagText}>HDR10+</Text>
            </View>
          </View>

          {/* Center Play Button */}
          <View style={styles.playButtonContainer}>
            <TouchableOpacity
              style={styles.glowingPlayBtn}
              onPress={handleStartPlay}
              activeOpacity={0.88}
            >
              <View style={styles.playIconWrapper}>
                <Play size={24} color="#FFFFFF" fill="#FFFFFF" />
              </View>
            </TouchableOpacity>
            <Text style={styles.tapToWatchText}>Chạm để bắt đầu xem</Text>
          </View>

          {/* Bottom Info on Hero */}
          <View style={styles.heroBottomRow}>
            <Text style={styles.audioSpecsText}>
              🔊 Dolby Atmos • {movie.language || 'Vietsub'}
            </Text>
            <Text style={styles.durationSpecText}>{movie.duration} phút</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#000000',
    overflow: 'hidden',
  },
  videoWrapper: {
    width: '100%',
    height: '100%',
    position: 'relative',
    backgroundColor: '#000000',
  },
  videoView: {
    width: '100%',
    height: '100%',
  },
  touchArea: {
    ...StyleSheet.absoluteFill,
  },
  bufferingOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  controlsOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'space-between',
    padding: 12,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  titleInfo: {
    flex: 1,
    marginHorizontal: 8,
  },
  videoTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  badgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 3,
  },
  pillBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  pillBadgeText: {
    color: '#CBD5E1',
    fontSize: 10,
    fontWeight: '600',
  },
  vipBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#FBBF24',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  vipBadgeText: {
    color: '#000000',
    fontSize: 10,
    fontWeight: '800',
  },
  topRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconCircleBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  centerControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 32,
  },
  playPauseLargeBtn: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: StreamHubColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: StreamHubColors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 6,
  },
  playCenterIconOffset: {
    marginLeft: 2,
  },
  seekBtn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  seekIconContainer: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  seekTextInsideWrapper: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  seekTextInside: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
    marginTop: 2,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  speedPill: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  speedPillText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
  },
  liveText: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '500',
  },
  popoverMenu: {
    position: 'absolute',
    top: 54,
    right: 14,
    backgroundColor: '#0D1326',
    borderRadius: 12,
    padding: 10,
    minWidth: 170,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    zIndex: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },
  popoverHeader: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  popoverItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  popoverItemActive: {
    backgroundColor: 'rgba(249, 115, 22, 0.15)',
  },
  popoverItemText: {
    color: '#CBD5E1',
    fontSize: 13,
    fontWeight: '500',
  },
  popoverItemTextActive: {
    color: StreamHubColors.primary,
    fontWeight: '700',
  },

  /* Poster Hero Styles */
  posterHero: {
    width: '100%',
    height: '100%',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  posterImage: {
    ...StyleSheet.absoluteFill,
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(5, 8, 22, 0.55)',
  },
  floatingBackBtn: {
    position: 'absolute',
    top: 14,
    left: 14,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(5, 8, 22, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    zIndex: 10,
  },
  topRightBadges: {
    position: 'absolute',
    top: 14,
    right: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    zIndex: 10,
  },
  vipTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FBBF24',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  vipTagText: {
    color: '#000000',
    fontSize: 11,
    fontWeight: '800',
  },
  hdTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backdropFilter: 'blur(10px)',
  },
  hdTagText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  playButtonContainer: {
    alignItems: 'center',
    gap: 12,
  },
  glowingPlayBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: StreamHubColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: StreamHubColors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.65,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  playIconWrapper: {
    marginLeft: 3,
  },
  tapToWatchText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.4,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  heroBottomRow: {
    position: 'absolute',
    bottom: 10,
    left: 14,
    right: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  audioSpecsText: {
    color: '#CBD5E1',
    fontSize: 11,
    fontWeight: '600',
  },
  durationSpecText: {
    color: '#CBD5E1',
    fontSize: 11,
    fontWeight: '600',
  },
});
