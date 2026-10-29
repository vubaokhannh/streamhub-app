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
  isPremium?: boolean;
  isRecommended?: boolean;
  totalEpisodes?: number;
  language?: string;
  videoUrl?: string;
  seasons?: Season[];
}
