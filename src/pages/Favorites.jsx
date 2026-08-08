import { useContext } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaArrowLeft } from "react-icons/fa";

import { FavoritesContext } from "../context/FavoritesContext";
import MovieRow from "../components/MovieRow";

import "../styles/Favorites.css";

function Favorites() {
  const { favorites } = useContext(FavoritesContext);

  return (
    <main className="favorites-page">

      {/* HEADER */}

      <section className="favorites-header">

        <div className="favorites-heading">

          <span className="favorites-label">
            MY COLLECTION
          </span>

          <h1 className="favorites-title">
            My Favorites
          </h1>

          <p className="favorites-subtitle">
            {favorites.length}{" "}
            {favorites.length === 1
              ? "movie"
              : "movies"}{" "}
            saved to your collection
          </p>

        </div>

        <div className="favorites-count">
          <FaHeart />

          <span>
            {favorites.length}
          </span>
        </div>

      </section>

      {/* EMPTY STATE */}

      {favorites.length === 0 ? (
        <section className="favorites-empty">

          <div className="empty-heart">
            <FaHeart />
          </div>

          <h2>
            Your collection is empty
          </h2>

          <p>
            Start exploring movies and add
            your favorites here.
          </p>

          <Link
            to="/"
            className="browse-movies-btn"
          >
            <FaArrowLeft />
            Browse Movies
          </Link>

        </section>
      ) : (

        /* MOVIES */

        <section className="favorites-content">

          <div className="favorites-section-heading">
            <h2>
              Saved Movies
            </h2>

            <span>
              {favorites.length} titles
            </span>
          </div>

          <MovieRow
            title=""
            movies={favorites}
          />

        </section>

      )}

    </main>
  );
}

export default Favorites;