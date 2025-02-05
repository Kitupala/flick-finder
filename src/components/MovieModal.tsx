import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useEffect, useState } from "react";
import { config } from "../lib/config.ts";
import Spinner from "./Spinner.tsx";
import LabeledText from "./LabeledText.tsx";
import { IoMdCloseCircle } from "react-icons/io";
import { GoArrowUpRight } from "react-icons/go";
import {
  convertMinutesToHoursAndMinutes,
  convertDateToFormattedString,
  extractCountries,
  extractCompanies,
} from "../utils/helpers.ts";

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  id: number;
  genres: string[];
}

const MovieModal = ({ isOpen, setIsOpen, id, genres }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [movie, setMovie] = useState<Movie | null>(null);
  const {
    title,
    vote_average,
    poster_path,
    release_date,
    vote_count,
    overview,
    runtime,
    homepage,
    production_countries,
    budget,
    revenue,
    production_companies,
  } = movie || {};

  const fetchMovie = async (id: number) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const endpoint = `${config.apiBaseUrl}/movie/${id}`;
      const response = await fetch(endpoint, config.apiOptions);

      if (!response.ok) {
        throw new Error(`Error fetching movie: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.response === "false") {
        setErrorMessage(data.Error || "Failed to fetch movie.");
        setMovie(null);
        return;
      }
      setMovie(data);
    } catch (err) {
      console.error(`Error fetching movie: ${err}`);
      setErrorMessage("Error fetching movie. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovie(id);
  }, [id]);

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      transition
      className="fixed inset-0 flex w-screen items-center justify-center bg-black/80 p-4 transition duration-300 ease-out data-[closed]:opacity-0 z-50"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/90" />
      {isLoading ? (
        <Spinner text="Loading movie details..." />
      ) : errorMessage ? (
        <p className="text-red-500">{errorMessage}</p>
      ) : (
        <>
          <DialogPanel className="modal">
            <DialogTitle className="title">
              {title}

              <div className="rating">
                <img src="/star.svg" alt="Star icon" />
                <p>
                  {vote_average ? vote_average.toFixed(1) : "N/A"}
                  {vote_count && (
                    <span className="text-gray-100">
                      {vote_count < 1000
                        ? `(${vote_count})`
                        : `/10 (${(vote_count / 1000).toFixed(1)}K)`}
                    </span>
                  )}
                </p>
              </div>
            </DialogTitle>
            <Description className="details">
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <p>{release_date ? release_date.split("-")[0] : "N/A"}</p>
                  <span>•</span>
                  <p>{convertMinutesToHoursAndMinutes(runtime!)}</p>
                </div>
                <a href={homepage ? homepage : "/"}>
                  <button className="btn">
                    Visit Homepage <GoArrowUpRight />
                  </button>
                </a>
              </div>
            </Description>
            <div className="flex gap-10">
              <img
                src={
                  poster_path
                    ? `https://image.tmdb.org/t/p/w500/${poster_path}`
                    : "/no-movie.png"
                }
                alt={
                  title ? `${title} poster image` : "Movie poster not available"
                }
              />

              <div className="flex flex-col gap-4">
                <LabeledText label="Genres" genres={genres} />
                <LabeledText label="Overview" value={overview} />
                <LabeledText
                  label="Release date"
                  value={convertDateToFormattedString(release_date!)}
                />
                <LabeledText
                  label="Countries"
                  value={extractCountries(production_countries!).join(" • ")}
                />
                {budget! > 0 && (
                  <LabeledText
                    label="Budget"
                    value={`$ ${budget! / 1000000} million`}
                  />
                )}
                {revenue! > 0 && (
                  <LabeledText
                    label="Revenue"
                    value={`$ ${(revenue! / 1000000).toFixed(1)} million`}
                  />
                )}
                <LabeledText
                  label="Production Companies"
                  value={extractCompanies(production_companies!).join(" • ")}
                />
              </div>
            </div>
            <div className="absolute top-0 right-0 mt-3 mr-4 text-white">
              <button
                onClick={() => setIsOpen(false)}
                className="cursor-pointer"
              >
                <IoMdCloseCircle size={20} color="#221F3D" />
              </button>
            </div>
          </DialogPanel>
        </>
      )}
    </Dialog>
  );
};

export default MovieModal;
