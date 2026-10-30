/**
 * Movie, Series & Video content types
 */

export type MovieType = 'MOVIE' | 'SERIES' | 'CARTOON';

export type AgeRating = 'P' | 'K' | 'T13' | 'T16' | 'T18' | string;

export interface Episode {
  id: string;
  episodeNumber: number;
  title: string;
  duration: number; // in minutes
  videoUrl: string;
  thumbnailUrl?: string;
}

export interface Season {
  id: string;
  seasonNumber: number;
  title: string;
  episodes: Episode[];
}

export interface MovieCast {
  id: string;
  name: string;
  character: string;
  avatarUrl: string;
}

export interface MovieComment {
  id: string;
  userName: string;
  avatarUrl: string;
  rating: number;
  content: string;
  createdAt: string;
  likesCount: number;
  isLiked?: boolean;
}

export interface Movie {
  id: string;
  title: string;
  originalTitle?: string;
  slug: string;
  description: string;
  backdropUrl: string;
  posterUrl: string;
  rating: number;
  year: number;
  duration: number; // in minutes
  ageRating: AgeRating;
  movieType?: MovieType;
  genres: string[];
  director?: string;
  cast?: string[];
  castMembers?: MovieCast[];
  isPremium?: boolean;
  isRecommended?: boolean;
  totalEpisodes?: number;
  language?: string;
  videoUrl?: string;
  seasons?: Season[];
}

