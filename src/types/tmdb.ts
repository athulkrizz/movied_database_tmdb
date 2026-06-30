export interface Movie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids?: number[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface GenreResponse {
  genres: Genre[];
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  credit_id: string;
  order: number;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  credit_id: string;
}

export interface Credits {
  cast: CastMember[];
  crew: CrewMember[];
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
}

export interface VideoResponse {
  results: Video[];
}

export interface Review {
  id: string;
  author: string;
  content: string;
  url: string;
  created_at: string;
}

export interface ReviewResponse {
  results: Review[];
}

export interface MovieDetails extends Movie {
  tagline: string | null;
  runtime: number | null;
  budget: number;
  revenue: number;
  original_language: string;
  genres: Genre[];
  videos?: VideoResponse;
  credits?: Credits;
  similar?: {
    results: Movie[];
  };
  reviews?: ReviewResponse;
}

export interface PaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}
