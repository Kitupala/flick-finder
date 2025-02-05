import { useState } from "react";
import MovieModal from "./MovieModal.tsx";

const MovieCard = ({ movie, genres }: { movie: Movie; genres: string[] }) => {
  const { title, vote_average, poster_path, release_date, id } = movie;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <li className="movie-card" onClick={() => setIsOpen(true)}>
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
            <p className="genre">{genres.slice(0, 1).toString()}</p>

            <span>•</span>
            <p className="year">
              {release_date ? release_date.split("-")[0] : "N/A"}
            </p>
          </div>
        </div>
      </li>

      {isOpen && (
        <MovieModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          id={id}
          genres={genres}
        />
      )}
    </>
  );
};

export default MovieCard;
