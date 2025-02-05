interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  runtime?: number;
  homepage?: string;
  production_countries?: {
    iso_3166_1: string;
    name: string;
  }[];
  budget?: number;
  revenue?: number;
  production_companies?: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
}

interface Genre {
  id: number;
  name: string;
}
