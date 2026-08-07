import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "../styles/MovieRow.css";
import MovieCard from "./MovieCard";

function MovieRow({ title, movies }) {

  const sliderRef = useRef(null);

  function scrollLeft() {

    sliderRef.current.scrollBy({

      left: -900,

      behavior: "smooth",

    });

  }

  function scrollRight() {

    sliderRef.current.scrollBy({

      left: 900,

      behavior: "smooth",

    });

  }

  return (

    <section className="movie-row">

      <div className="row-header">

        <h2 className="row-title">

          {title}

        </h2>

      </div>

      <div className="slider-container">

        <button
          className="slider-btn left"
          onClick={scrollLeft}
        >

          <FaChevronLeft />

        </button>

        <div
          className="row-posters"
          ref={sliderRef}
        >

          {movies.length > 0 ? (

            movies.map((movie) => (

              <MovieCard

                key={movie.imdbID}

                movie={movie}

              />

            ))

          ) : (

            <div className="empty-state">

              <h3>No Movies Found</h3>

            </div>

          )}

        </div>

        <button
          className="slider-btn right"
          onClick={scrollRight}
        >

          <FaChevronRight />

        </button>

      </div>

    </section>

  );

}

export default MovieRow;