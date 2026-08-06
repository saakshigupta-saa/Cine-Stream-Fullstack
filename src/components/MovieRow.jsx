import "../styles/MovieRow.css";
import MovieCard from "./MovieCard";

function MovieRow({ title, movies }) {

  return (

    <section className="movie-row">

      <div className="row-header">

        <h2 className="row-title">

          {title}

        </h2>

        <button className="see-all">

          See All →

        </button>

      </div>

      <div className="row-posters">

        {

          movies.map((movie) => (

            <MovieCard

              key={movie.imdbID}

              movie={movie}

            />

          ))

        }

      </div>

    </section>

  );

}

export default MovieRow;