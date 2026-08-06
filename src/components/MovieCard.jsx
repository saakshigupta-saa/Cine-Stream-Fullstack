import "../styles/MovieCard.css";
import { FaHeart } from "react-icons/fa";

function MovieCard({ movie }) {
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

        <button className="favorite-btn">
          <FaHeart />
        </button>

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