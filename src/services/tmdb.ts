import {
  Movie,
  MovieDetails,
  GenreResponse,
  Credits,
  VideoResponse,
  PaginatedResponse,
} from '../types/tmdb';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

/**
 * Build a full TMDb image URL.
 * @param path - The image path from TMDb (e.g., "/abc123.jpg")
 * @param size - Image size (w200, w300, w500, w780, original)
 * @returns string or null
 */
export const getImageUrl = (path: string | null, size: string = 'w500'): string | null => {
  if (!path) return null;
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

/**
 * Generic fetch wrapper for TMDb API.
 */
const fetchFromTMDb = async <T>(endpoint: string, params: Record<string, string | number> = {}): Promise<T> => {
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.append('api_key', API_KEY);
  url.searchParams.append('language', 'en-US');

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, String(value));
  });

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`TMDb API Error: ${response.status} ${response.statusText}`);
  }
  return response.json() as Promise<T>;
};

// ── Trending ──────────────────────────────────────────
export const fetchTrending = (timeWindow: 'day' | 'week' = 'day', page: number = 1): Promise<PaginatedResponse<Movie>> =>
  fetchFromTMDb<PaginatedResponse<Movie>>(`/trending/movie/${timeWindow}`, { page });

// ── Popular ───────────────────────────────────────────
export const fetchPopular = (page: number = 1): Promise<PaginatedResponse<Movie>> =>
  fetchFromTMDb<PaginatedResponse<Movie>>('/movie/popular', { page });

// ── Top Rated ─────────────────────────────────────────
export const fetchTopRated = (page: number = 1): Promise<PaginatedResponse<Movie>> =>
  fetchFromTMDb<PaginatedResponse<Movie>>('/movie/top_rated', { page });

// ── Upcoming ──────────────────────────────────────────
export const fetchUpcoming = (page: number = 1): Promise<PaginatedResponse<Movie>> =>
  fetchFromTMDb<PaginatedResponse<Movie>>('/movie/upcoming', { page });

// ── Now Playing ───────────────────────────────────────
export const fetchNowPlaying = (page: number = 1): Promise<PaginatedResponse<Movie>> =>
  fetchFromTMDb<PaginatedResponse<Movie>>('/movie/now_playing', { page });

// ── Movie Details ─────────────────────────────────────
export const fetchMovieDetails = (movieId: string | number): Promise<MovieDetails> =>
  fetchFromTMDb<MovieDetails>(`/movie/${movieId}`, {
    append_to_response: 'videos,credits,similar,reviews',
  });

// ── Movie Credits ─────────────────────────────────────
export const fetchMovieCredits = (movieId: string | number): Promise<Credits> =>
  fetchFromTMDb<Credits>(`/movie/${movieId}/credits`);

// ── Similar Movies ────────────────────────────────────
export const fetchSimilarMovies = (movieId: string | number, page: number = 1): Promise<PaginatedResponse<Movie>> =>
  fetchFromTMDb<PaginatedResponse<Movie>>(`/movie/${movieId}/similar`, { page });

// ── Movie Videos ──────────────────────────────────────
export const fetchMovieVideos = (movieId: string | number): Promise<VideoResponse> =>
  fetchFromTMDb<VideoResponse>(`/movie/${movieId}/videos`);

// ── Search ────────────────────────────────────────────
export const searchMovies = (query: string, page: number = 1): Promise<PaginatedResponse<Movie>> =>
  fetchFromTMDb<PaginatedResponse<Movie>>('/search/movie', { query, page });

// ── Genres ────────────────────────────────────────────
export const fetchGenres = (): Promise<GenreResponse> =>
  fetchFromTMDb<GenreResponse>('/genre/movie/list');

// ── Discover by Genre ─────────────────────────────────
export const fetchMoviesByGenre = (genreId: string | number, page: number = 1): Promise<PaginatedResponse<Movie>> =>
  fetchFromTMDb<PaginatedResponse<Movie>>('/discover/movie', {
    with_genres: genreId,
    sort_by: 'popularity.desc',
    page,
  });
