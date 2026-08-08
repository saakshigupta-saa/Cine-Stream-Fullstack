import { useRef } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

import MovieCard from "./MovieCard";
import "../styles/MovieRow.css";

function MovieRow({ title, movies }) {
  const sliderRef = useRef(null);

  function scrollLeft() {
    if (!sliderRef.current) return;

    sliderRef.current.scrollBy({
      left: -900,
      behavior: "smooth",
    });
  }

  function scrollRight() {
    if (!sliderRef.current) return;

    sliderRef.current.scrollBy({
      left: 900,
      behavior: "smooth",
    });
  }

  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <section className="movie-row">

      {/* Row Header */}

      <div className="row-header">

        <h2 className="row-title">
          {title}
        </h2>

        <span className="row-count">
          {movies.length} movies
        </span>

      </div>

      {/* Slider */}

      <div className="slider-container">

        <button
          type="button"
          className="slider-btn left"
          onClick={scrollLeft}
          aria-label="Previous movies"
        >
          <FaChevronLeft />
        </button>

        <div
          className="row-posters"
          ref={sliderRef}
        >
          {movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
            />
          ))}
        </div>

        <button
          type="button"
          className="slider-btn right"
          onClick={scrollRight}
          aria-label="Next movies"
        >
          <FaChevronRight />
        </button>

      </div>

    </section>
  );
}

export default MovieRow;