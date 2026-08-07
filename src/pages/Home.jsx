import { useEffect, useRef, useState } from "react";
import { searchMovies } from "../api/omdb";
import MovieRow from "../components/MovieRow";
import useDebounce from "../hooks/useDebounce";
import "../styles/Home.css";

function Home({ searchTerm }) {

  const [movieRows, setMovieRows] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const loader = useRef(null);

  const debouncedSearch = useDebounce(searchTerm, 500);

  const categories = [
    { title: "Trending Now", query: "Marvel" },
{ title: "Marvel Universe", query: "Marvel" },
{ title: "Avengers Collection", query: "Avengers" },
{ title: "Batman Collection", query: "Batman" },
{ title: "Spider-Verse", query: "Spider-Man" },
{ title: "Star Wars", query: "Star Wars" },
{ title: "Wizarding World", query: "Harry Potter" },
{ title: "Disney Classics", query: "Disney" },
  ];

  useEffect(() => {

    if (debouncedSearch.trim()) {

      searchMovie();

      return;

    }

    fetchAllMovies();

  }, [debouncedSearch, page]);

  async function searchMovie() {

    setLoading(true);

    try {

      const data = await searchMovies(debouncedSearch);

      if (data.Response === "True") {

        setSearchResults(data.Search);

      } else {

        setSearchResults([]);

      }

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  }

  async function fetchAllMovies() {

    setLoading(true);

    try {

      const results = await Promise.all(

        categories.map(async (category) => {

          const data = await searchMovies(category.query, page);

          return {

            title: category.title,

            movies:

              data.Response === "True"

                ? data.Search

                : [],

          };

        })

      );

      if (page === 1) {

        setMovieRows(results);

      } else {

        setMovieRows((prevRows) =>

          prevRows.map((row, index) => ({

            ...row,

            movies: [

              ...row.movies,

              ...results[index].movies,

            ],

          }))

        );

      }

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  }

  useEffect(() => {

    if (debouncedSearch) return;

    const observer = new IntersectionObserver(

      (entries) => {

        if (entries[0].isIntersecting) {

          setPage((prev) => prev + 1);

        }

      },

      {

        rootMargin: "250px",

      }

    );

    const currentLoader = loader.current;

    if (currentLoader) {

      observer.observe(currentLoader);

    }

    return () => {

      if (currentLoader) {

        observer.unobserve(currentLoader);

      }

    };

  }, [debouncedSearch]);

  useEffect(() => {

    if (!debouncedSearch) {

      setPage(1);

    }

  }, [debouncedSearch]);

  return (

    <main className="home">

      {

        loading ? (

          <h2 className="loading-text">

            Loading...

          </h2>

        ) : debouncedSearch ? (

          <MovieRow

            title={`Search Results for "${debouncedSearch}"`}

            movies={searchResults}

          />

        ) : (

          movieRows.map((row) => (

            <MovieRow

              key={row.title}

              title={row.title}

              movies={row.movies}

            />

          ))

        )

      }

      {

        !debouncedSearch && (

          <div

            ref={loader}

            className="scroll-loader"

          >

            <div className="loading-spinner"></div>

          </div>

        )

      }

    </main>

  );

}

export default Home;