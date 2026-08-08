import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaHeart,
  FaPlay,
} from "react-icons/fa";

import { FavoritesContext } from "../context/FavoritesContext";
import { getMovieDetails } from "../api/omdb";

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
  const [error, setError] = useState("");

  // =========================
  // FETCH MOVIE DETAILS
  // =========================

  useEffect(() => {
    fetchMovie();
  }, [imdbID]);

  async function fetchMovie() {
    setLoading(true);
    setError("");
    setMovie(null);

    try {
      const data = await getMovieDetails(imdbID);

      console.log("Movie Details:", data);

      if (data.Response === "False") {
        setError(data.Error || "Movie not found.");
        return;
      }

      setMovie(data);
    } catch (err) {
      console.error("Movie details error:", err);

      setError(
        "Unable to load movie details. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="movie-details loading">
        <h2>Loading Movie...</h2>
      </div>
    );
  }

  // =========================
  // ERROR
  // =========================

  if (error || !movie) {
    return (
      <div className="movie-details error-state">
        <h2>{error || "Movie not found."}</h2>

        <button
          type="button"
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft />
          Back
        </button>
      </div>
    );
  }

  // =========================
  // FAVORITE
  // =========================

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

  // =========================
  // WATCH TRAILER
  // =========================

  function watchTrailer() {
  const query = `"${movie.Title}" Official Trailer`;

  const youtubeSearchUrl =
    `https://www.youtube.com/results?search_query=${encodeURIComponent(
      query
    )}`;

  window.open(
    youtubeSearchUrl,
    "_blank",
    "noopener,noreferrer"
  );
}
  // =========================
  // POSTER
  // =========================

  const poster =
    movie.Poster && movie.Poster !== "N/A"
      ? movie.Poster
      : "https://via.placeholder.com/500x750?text=No+Image";

  // =========================
  // UI
  // =========================

  return (
    <section
      className="movie-details"
      style={{
        backgroundImage: `
          linear-gradient(
            to right,
            rgba(0, 0, 0, 0.96),
            rgba(0, 0, 0, 0.85),
            rgba(0, 0, 0, 0.55)
          ),
          url("${poster}")
        `,
      }}
    >

      {/* BACK BUTTON */}

      <button
        type="button"
        className="back-btn"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft />
        Back
      </button>

      {/* CONTENT */}

      <div className="details-container">

        {/* POSTER */}

        <div className="details-poster-wrapper">
          <img
            className="details-poster"
            src={poster}
            alt={movie.Title}
          />
        </div>

        {/* INFORMATION */}

        <div className="details-info">

          <span className="details-type">
            {movie.Type?.toUpperCase()}
          </span>

          <h1>{movie.Title}</h1>

          {/* META */}

          <div className="details-meta">

            <span>
              ⭐ {movie.imdbRating || "N/A"}
            </span>

            <span>
              {movie.Year}
            </span>

            <span>
              {movie.Runtime || "N/A"}
            </span>

            <span>
              {movie.Rated || "N/A"}
            </span>

          </div>

          {/* PLOT */}

          <p className="details-plot">
            {movie.Plot && movie.Plot !== "N/A"
              ? movie.Plot
              : "No plot information available."}
          </p>

          {/* DETAILS */}

          <div className="details-grid">

            <p>
              <strong>Genre</strong>
              <span>{movie.Genre || "N/A"}</span>
            </p>

            <p>
              <strong>Director</strong>
              <span>{movie.Director || "N/A"}</span>
            </p>

            <p>
              <strong>Actors</strong>
              <span>{movie.Actors || "N/A"}</span>
            </p>

            <p>
              <strong>Released</strong>
              <span>{movie.Released || "N/A"}</span>
            </p>

            <p>
              <strong>Language</strong>
              <span>{movie.Language || "N/A"}</span>
            </p>

            <p>
              <strong>Awards</strong>
              <span>{movie.Awards || "N/A"}</span>
            </p>

          </div>

          {/* BUTTONS */}

          <div className="details-buttons">

            {/* WATCH TRAILER */}

            <button
              type="button"
              className="play-button"
              onClick={watchTrailer}
            >
              <FaPlay />
              Watch Trailer
            </button>

            {/* FAVORITE */}

            <button
              type="button"
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