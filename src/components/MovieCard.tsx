const MovieCard = ({ movie, genres }: { movie: Movie; genres: Genre[] }) => {
  const { title, vote_average, poster_path, release_date } = movie;

  const getGenres = (genreIds: number[]): string =>
    genreIds
      .map((id) => genres.find((genre) => genre.id === id)?.name || "N/A")
      .slice(0, 1)
      .toString();

  return (
    <li className="movie-card hover:transform hover:scale-102 transition duration-300">
      <img
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500/${poster_path}`
            : "/no-movie.png"
        }
        alt={`${title} poster image`}
      />
      <div className="mt-4">
        <h3>{title}</h3>
        <div className="content">
          <div className="rating">
            <img src="/star.svg" alt="Star icon" />
            <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
          </div>

          <span>•</span>
          <p className="genre">{getGenres(movie.genre_ids)}</p>

          <span>•</span>
          <p className="year">
            {release_date ? release_date.split("-")[0] : "N/A"}
          </p>
        </div>
      </div>
    </li>
  );
};

export default MovieCard;
