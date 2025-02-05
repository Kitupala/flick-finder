import "./App.css";
import { useEffect, useState } from "react";
import { useDebounce } from "react-use";
import Spinner from "./components/Spinner.tsx";
import Search from "./components/Search.tsx";
import MovieCard from "./components/MovieCard.tsx";
import { getTrendingMovies, updateSearchCount } from "./appwrite.ts";
import { Models } from "appwrite";
import { config } from "./lib/config.ts";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [trendingMovies, setTrendingMovies] = useState<
    Models.Document[] | undefined
  >([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  useDebounce(
    () => {
      setDebouncedSearchTerm(searchTerm);
    },
    1000,
    [searchTerm],
  );

  const fetchGenres = async () => {
    try {
      const endpoint = `${config.apiBaseUrl}/genre/movie/list?language=en`;
      const response = await fetch(endpoint, config.apiOptions);

      if (!response.ok) {
        throw new Error(`Error fetching genres: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.response === "false") {
        setGenres([]);
        return;
      }

      setGenres(data.genres || []);
    } catch (err) {
      console.error(`Error fetching genres: ${err}`);
    }
  };

  const fetchMovies = async (query = "") => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const endpoint = query
        ? `${config.apiBaseUrl}/search/movie?query=${encodeURIComponent(query)}`
        : `${config.apiBaseUrl}/discover/movie?&sort_by=popularity.desc`;
      const response = await fetch(endpoint, config.apiOptions);

      if (!response.ok) {
        throw new Error(`Error fetching movies: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.response === "false") {
        setErrorMessage(data.Error || "Failed to fetch movies.");
        setMovieList([]);
        return;
      }
      setMovieList(data.results || []);

      if (query && data.results.length > 0) {
        await updateSearchCount(searchTerm, data.results[0]);
      }
    } catch (err) {
      console.error(`Error fetching movies: ${err}`);
      setErrorMessage("Error fetching movies. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();

      setTrendingMovies(movies);
    } catch (err) {
      console.error(`Error fetching trending movies: ${err}`);
    }
  };

  const getMovieGenres = (genreIds: number[]) =>
    genreIds.map(
      (id) => genres.find((genre) => genre.id === id)?.name || "N/A",
    );

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  useEffect(() => {
    loadTrendingMovies();
    fetchGenres();
  }, []);

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="/hero.png" alt="Hero banner" />
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy
            Without the Hassle
          </h1>

          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        {trendingMovies!.length > 0 && (
          <section className="trending">
            <h2>Trending</h2>

            <ul>
              {trendingMovies?.map((movie, index) => (
                <li key={movie.$id}>
                  <span>{index + 1}</span>
                  <img src={movie.poster_url} alt={movie.title} />
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="all-movies">
          <h2>All Movies</h2>
          {isLoading ? (
            <Spinner text="Loading movies..." />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  genres={getMovieGenres(movie.genre_ids)}
                />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;
