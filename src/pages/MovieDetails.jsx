import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaHeart,
  FaPlay,
} from "react-icons/fa";

import { FavoritesContext } from "../context/FavoritesContext";
import { getMovieDetails } from "../api/omdb";
import { findMovieTrailer } from "../api/watchmode";

import "../styles/MovieDetails.css";

function MovieDetails() {
  const { imdbID } = useParams();
  const navigate = useNavigate();

  const {
    favorites,
    addToFavorites,
    removeFromFavorites,
  } = useContext(FavoritesContext);

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [trailerLoading, setTrailerLoading] = useState(false);

  useEffect(() => {
    fetchMovie();
  }, [imdbID]);

  async function fetchMovie() {
    setLoading(true);

    try {
      const data = await getMovieDetails(imdbID);
      setMovie(data);
    } catch (error) {
      console.error("Movie details error:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleTrailer() {
    if (!movie) return;

    setTrailerLoading(true);

    try {
      console.log("Searching trailer for:", movie.Title);

      const trailer = await findMovieTrailer(movie.Title);

      console.log("Trailer response:", trailer);

      if (trailer) {
        window.open(
          trailer,
          "_blank",
          "noopener,noreferrer"
        );
      } else {
        openYoutubeSearch();
      }
    } catch (error) {
      console.error("Trailer error:", error);

      openYoutubeSearch();
    } finally {
      setTrailerLoading(false);
    }
  }

  function openYoutubeSearch() {
    const query = `${movie.Title} Official Trailer`;

    window.open(
      `https://www.youtube.com/results?search_query=${encodeURIComponent(
        query
      )}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  if (loading) {
    return (
      <div className="movie-details loading">
        <h2>Loading Movie...</h2>
      </div>
    );
  }

  if (!movie || movie.Response === "False") {
    return (
      <div className="movie-details loading">
        <h2>Movie not found.</h2>

        <button
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft />
          Back
        </button>
      </div>
    );
  }

  const isFavorite = favorites.some(
    (fav) => fav.imdbID === movie.imdbID
  );

  function toggleFavorite() {
    if (isFavorite) {
      removeFromFavorites(movie.imdbID);
    } else {
      addToFavorites(movie);
    }
  }

  return (
    <section
      className="movie-details"
      style={{
        backgroundImage: `
          linear-gradient(
            to right,
            rgba(0,0,0,.96),
            rgba(0,0,0,.84),
            rgba(0,0,0,.55)
          ),
          url(${movie.Poster})
        `,
      }}
    >
      {/* Back Button */}

      <button
        className="back-btn"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft />
        Back
      </button>

      {/* Movie Content */}

      <div className="details-container">

        {/* Poster */}

        <img
          className="details-poster"
          src={
            movie.Poster !== "N/A"
              ? movie.Poster
              : "https://via.placeholder.com/300x450?text=No+Image"
          }
          alt={movie.Title}
        />

        {/* Information */}

        <div className="details-info">

          <h1>{movie.Title}</h1>

          <div className="details-meta">
            <span>
              ⭐ {movie.imdbRating}
            </span>

            <span>
              {movie.Year}
            </span>

            <span>
              {movie.Runtime}
            </span>

            <span>
              {movie.Rated}
            </span>
          </div>

          <p className="details-plot">
            {movie.Plot}
          </p>

          <div className="details-grid">

            <p>
              <strong>Genre:</strong>{" "}
              {movie.Genre}
            </p>

            <p>
              <strong>Director:</strong>{" "}
              {movie.Director}
            </p>

            <p>
              <strong>Actors:</strong>{" "}
              {movie.Actors}
            </p>

            <p>
              <strong>Released:</strong>{" "}
              {movie.Released}
            </p>

            <p>
              <strong>Language:</strong>{" "}
              {movie.Language}
            </p>

            <p>
              <strong>Awards:</strong>{" "}
              {movie.Awards}
            </p>

          </div>

          {/* Buttons */}

          <div className="details-buttons">

            <button
              className="play-button"
              onClick={handleTrailer}
              disabled={trailerLoading}
            >
              <FaPlay />

              {trailerLoading
                ? "Loading Trailer..."
                : "Watch Trailer"}
            </button>

            <button
              className={`favorite-button ${
                isFavorite ? "active" : ""
              }`}
              onClick={toggleFavorite}
            >
              <FaHeart />

              {isFavorite
                ? "Remove Favorite"
                : "Add Favorite"}
            </button>

          </div>

        </div>
      </div>
    </section>
  );
}

export default MovieDetails;