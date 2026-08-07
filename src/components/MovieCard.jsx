import { useContext } from "react";
import { FaHeart, FaPlay } from "react-icons/fa";
import { FavoritesContext } from "../context/FavoritesContext";
import "../styles/MovieCard.css";

function MovieCard({ movie }) {

  const {
    favorites,
    addToFavorites,
    removeFromFavorites,
  } = useContext(FavoritesContext);

  const isFavorite = favorites.some(
    (fav) => fav.imdbID === movie.imdbID
  );

  const toggleFavorite = (e) => {

    e.stopPropagation();

    if (isFavorite) {

      removeFromFavorites(movie.imdbID);

    } else {

      addToFavorites(movie);

    }

  };

  return (

    <article className="movie-card">

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