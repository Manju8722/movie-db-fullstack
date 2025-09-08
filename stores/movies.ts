export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

// types/movie.ts
export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  name: string;
  origin_country: string;
  logo_path?: string | null;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1?: string;
  name?: string;
}

export interface MovieDetails {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: unknown | null;
  budget: number;
  genres: Genre[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: ProductionCompany[];
  release_date: string;
  revenue: string | number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string | null;
  title: string;
  vote_average: number;
  vote_count: number;
  account_states: {
    favorite: boolean;
    rated: boolean;
    watchlist: boolean;
  };
}

export const useMoviesStore = defineStore("movies", {
  state: () => ({
    movies: null as MoviesResponse | null,
    favourites: null as MoviesResponse | null,
    searchedMovie: null as MoviesResponse | null,
    isSearchingMovielist: false as Boolean,
    isSearchingFavourite: false as Boolean,
    isSearchingSearchedMovie: false as Boolean,
    isSearchingMovieByMovieId: false as Boolean,
  }),
  getters: {
    listMovies: (state) => state.movies,
    favouriteMovies: (state) => state.favourites,
    getSearchedMovie: (state) => state.searchedMovie,
  },
  actions: {
    async getAllMovies() {
      try {
        this.isSearchingMovielist = true;
        const httpResponse = await useHttpFetch<MoviesResponse>(
          "/api/movies/list",
          "GET"
        );

        const { data, status, error } = httpResponse;

        if (status.value === "success" && !error.value) {
          if (data.value) {
            this.movies = data.value;
          } else {
            console.warn("⚠️ API returned no data");
          }
        } else {
          console.error("❌ Error while fetching:", error.value);
        }
      } catch (err) {
        console.error("🚨 Exception caught:", err);
      } finally {
        this.isSearchingMovielist = false;
      }
    },
    async getMovieById(id: number) {
      try {
        this.isSearchingMovieByMovieId = true;
        const httpResponse = await useHttpFetch<MovieDetails>(
          `/api/movies/${id}`,
          "GET"
        );
        const { data, status, error } = httpResponse;

        if (status.value === "success" && !error.value) {
          if (data.value) {
            return data.value;
          } else {
            console.warn("⚠️ API returned no data");
            return null;
          }
        } else {
          console.error("❌ Error while fetching:", error.value);
          return null;
        }
      } catch (err) {
        console.error("🚨 Exception caught:", err);
      } finally {
        this.isSearchingMovieByMovieId = false;
      }
    },
    async favMovieByMediaId(media_id: number, favorite: boolean) {
      try {
        const httpResponse = await useHttpFetch<MovieDetails>(
          `/api/movies/favourite`,
          "POST",
          { body: { media_id, favorite } }
        );
        const { data, status, error } = httpResponse;
      } catch (err) {
        console.error("🚨 Exception caught:", err);
      }
    },
    async getAllFavoriteMovies() {
      try {
        this.isSearchingFavourite = true;

        const httpResponse = await useHttpFetch<MoviesResponse>(
          "/api/movies/favourite",
          "GET"
        );

        const { data, status, error } = httpResponse;

        if (status.value === "success" && !error.value) {
          if (data.value) {
            this.favourites = data.value;
          } else {
            console.warn("⚠️ API returned no data");
          }
        } else {
          console.error("❌ Error while fetching:", error.value);
        }
      } catch (err) {
        console.error("🚨 Exception caught:", err);
      } finally {
        this.isSearchingFavourite = false;
      }
    },
    async searchMovie(query: string, with_genres?: string, year?: string) {
      try {
        this.isSearchingSearchedMovie = true;
        const httpResponse = await useHttpFetch<MoviesResponse>(
          `/api/movies/search?query=${query}&with_genres=${with_genres}&year=${year}`,
          "GET"
        );
        const { data, status, error } = httpResponse;

        if (status.value === "success" && !error.value) {
          if (data.value) {
            this.searchedMovie = data.value;
            console.log(
              "🚀 ~ searchMovie ~ this.searchedMovie:",
              this.searchedMovie
            );
          } else {
            console.warn("⚠️ API returned no data");
          }
        } else {
          console.error("❌ Error while fetching:", error.value);
        }
      } catch (err) {
        console.error("🚨 Exception caught:", err);
      } finally {
        this.isSearchingSearchedMovie = false;
      }
    },
  },
});
