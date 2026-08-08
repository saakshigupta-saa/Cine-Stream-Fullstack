import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaPlay } from "react-icons/fa";
import { FavoritesContext } from "../context/FavoritesContext";
import "../styles/MovieCard.css";

function MovieCard({ movie }) {

  const navigate = useNavigate();

  const {
    favorites,
    addFavorite,
    removeFavorite,
  } = useContext(FavoritesContext);

  const isFavorite = favorites.some(
    (fav) => fav.imdbID === movie.imdbID
  );

  function toggleFavorite(e) {

    e.stopPropagation();

    if (isFavorite) {

      removeFavorite(movie.imdbID);

    } else {

      addFavorite(movie);

    }

  }

  function openMovieDetails() {

    navigate(`/movie/${movie.imdbID}`);

  }

  return (

    <article
      className="movie-card"
      onClick={openMovieDetails}
    >

      <div className="movie-poster">

        <img
          src={
            movie.Poster !== "N/A"
              ? movie.Poster
              : "https://via.placeholder.com/300x450?text=No+Image"
          }
          alt={movie.Title}
          loading="lazy"
        />

        <div className="movie-overlay">

          <button
            type="button"
            className="play-btn"
          >

            <FaPlay />

            <span>Play</span>

          </button>

          <button
            type="button"
            className={`favorite-btn ${isFavorite ? "active" : ""}`}
            onClick={toggleFavorite}
          >

            <FaHeart />

          </button>

        </div>

      </div>

      <div className="movie-info">

        <h3 className="movie-title">

          {movie.Title}

        </h3>

        <div className="movie-meta">

          <span>{movie.Year}</span>

          <span>•</span>

          <span>{movie.Type}</span>

        </div>

      </div>

    </article>

  );

}

export default MovieCard;