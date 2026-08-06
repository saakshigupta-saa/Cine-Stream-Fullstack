import { useEffect, useState } from "react";
import { searchMovies } from "../api/omdb";
import MovieRow from "../components/MovieRow";
import "../styles/Home.css";

function Home() {

  const [movieRows, setMovieRows] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchAllMovies();

  }, []);

  async function fetchAllMovies() {

    try {

      const categories = [

        {
          title: "🔥 Trending Now",
          query: "Marvel",
        },

        {
          title: "🦸 Avengers",
          query: "Avengers",
        },

        {
          title: "🦇 Batman",
          query: "Batman",
        },

        {
          title: "🕷 Spider-Man",
          query: "Spider-Man",
        },

        {
          title: "🚀 Star Wars",
          query: "Star Wars",
        },

        {
          title: "🏰 Harry Potter",
          query: "Harry Potter",
        },

        {
          title: "👑 Disney",
          query: "Disney",
        },

      ];

      const results = await Promise.all(

        categories.map(async (category) => {

          const data = await searchMovies(category.query);

          return {

            title: category.title,

            movies:
              data.Response === "True"
                ? data.Search
                : [],

          };

        })

      );

      setMovieRows(results);

    }

    catch (error) {

      console.log(error);

    }

    finally {

      setLoading(false);

    }

  }

  return (

    <main className="home">

      {

        loading

        ?

        <h2 className="loading-text">

          Loading Movies...

        </h2>

        :

        movieRows.map((row) => (

          <MovieRow

            key={row.title}

            title={row.title}

            movies={row.movies}

          />

        ))

      }

    </main>

  );

}

export default Home;