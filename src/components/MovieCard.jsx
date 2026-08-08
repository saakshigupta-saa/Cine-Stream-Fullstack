import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHeart,
  FaPlay,
  FaStar,
  FaInfoCircle,
} from "react-icons/fa";

import { FavoritesContext } from "../context/FavoritesContext";

import "../styles/MovieCard.css";

function MovieCard({ movie }) {
  const navigate = useNavigate();

  const {
    favorites,
    addToFavorites,
    removeFromFavorites,
  } = useContext(FavoritesContext);

  const isFavorite = favorites.some(
    (fav) => fav.imdbID === movie.imdbID
  );

  const poster =
    movie.Poster && movie.Poster !== "N/A"
      ? movie.Poster
      : "https://via.placeholder.com/300x450?text=No+Poster";

  function handleDetails() {
    navigate(`/movie/${movie.imdbID}`);
  }

  function toggleFavorite(e) {
    e.stopPropagation();

    if (isFavorite) {
      removeFromFavorites(movie.imdbID);
    } else {
      addToFavorites(movie);
    }
  }

  return (
    <article className="movie-card">

      {/* POSTER */}

      <div className="movie-poster">

        <img
          src={poster}
          alt={movie.Title}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src =
              "https://via.placeholder.com/300x450?text=No+Poster";
          }}
        />

        {/* RATING */}

        {movie.imdbRating &&
          movie.imdbRating !== "N/A" && (
            <div className="movie-rating">
              <FaStar />
              <span>{movie.imdbRating}</span>
            </div>
          )}

        {/* FAVORITE */}

        <button
          type="button"
          className={`favorite-btn ${
            isFavorite ? "active" : ""
          }`}
          onClick={toggleFavorite}
          aria-label={
            isFavorite
              ? "Remove from favorites"
              : "Add to favorites"
          }
        >
          <FaHeart />
        </button>

        {/* HOVER OVERLAY */}

        <div className="movie-overlay">

          <button
            type="button"
            className="play-btn"
            onClick={handleDetails}
          >
            <FaPlay />
            View Details
          </button>

        </div>

      </div>

      {/* MOVIE INFORMATION */}

      <div className="movie-info">

        <h3
          className="movie-title"
          title={movie.Title}
        >
          {movie.Title}
        </h3>

        <div className="movie-meta">

          <span>
            {movie.Year}
          </span>

          <span className="meta-dot">
            •
          </span>

          <span>
            {movie.Type || "Movie"}
          </span>

        </div>

      </div>

    </article>
  );
}

export default MovieCard;