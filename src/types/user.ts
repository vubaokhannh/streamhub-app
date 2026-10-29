/**
 * User, Profile & Account types
 */
import { Movie } from './movie';
import { Plan } from './plan';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  phone?: string;
  createdAt: string;
  isVip: boolean;
  vipPlanName?: string;
  vipExpiresAt?: string;
  plan?: Plan;
}

export interface WatchHistoryItem {
  id: string;
  movie: Movie;
  progressPercent: number; // 0 to 100
  lastWatchedAt: string;
  currentEpisode?: number;
}

export interface UserDevice {
  id: string;
  deviceName: string;
  deviceType: 'phone' | 'tablet' | 'tv' | 'web';
  lastActive: string;
  isCurrentDevice: boolean;
}
