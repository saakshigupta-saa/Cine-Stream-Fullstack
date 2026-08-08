import { useEffect, useRef, useState } from "react";

import { searchMovies } from "../api/omdb";
import MovieRow from "../components/MovieRow";
import useDebounce from "../hooks/useDebounce";

import "../styles/Home.css";

function Home({ searchTerm }) {
  const [movieRows, setMovieRows] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loader = useRef(null);

  const debouncedSearch = useDebounce(searchTerm, 500);

  const categories = [
    {
      title: "Trending Now",
      query: "Marvel",
    },
    {
      title: "Marvel Universe",
      query: "Marvel",
    },
    {
      title: "Avengers Collection",
      query: "Avengers",
    },
    {
      title: "Batman Collection",
      query: "Batman",
    },
    {
      title: "Spider-Verse",
      query: "Spider-Man",
    },
    {
      title: "Star Wars",
      query: "Star Wars",
    },
    {
      title: "Wizarding World",
      query: "Harry Potter",
    },
    {
      title: "Disney Classics",
      query: "Disney",
    },
  ];

  /*
  =========================
  SEARCH
  =========================
  */

  useEffect(() => {
    if (!debouncedSearch.trim()) {
      setSearchResults([]);
      setSearchLoading(false);
      return;
    }

    searchMovie();
  }, [debouncedSearch]);

  async function searchMovie() {
    setSearchLoading(true);

    try {
      const data = await searchMovies(
        debouncedSearch,
        1
      );

      if (data.Response === "True") {
        setSearchResults(data.Search || []);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Search error:", error);

      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  }

  /*
  =========================
  CATEGORY MOVIES
  =========================
  */

  useEffect(() => {
    if (debouncedSearch.trim()) {
      return;
    }

    fetchAllMovies();
  }, [page, debouncedSearch]);

  async function fetchAllMovies() {
    if (!hasMore && page !== 1) {
      return;
    }

    setLoading(true);

    try {
      const results = await Promise.all(
        categories.map(async (category) => {
          const data = await searchMovies(
            category.query,
            page
          );

          return {
            title: category.title,

            movies:
              data.Response === "True"
                ? data.Search || []
                : [],
          };
        })
      );

      const hasResults = results.some(
        (row) => row.movies.length > 0
      );

      if (!hasResults) {
        setHasMore(false);
        return;
      }

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
      console.error(
        "Movie loading error:",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  /*
  =========================
  RESET PAGINATION
  =========================
  */

  useEffect(() => {
    if (!debouncedSearch.trim()) {
      setPage(1);
      setHasMore(true);
    }
  }, [debouncedSearch]);

  /*
  =========================
  INFINITE SCROLL
  =========================
  */

  useEffect(() => {
    if (debouncedSearch.trim()) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          !loading &&
          hasMore
        ) {
          setPage((prev) => prev + 1);
        }
      },
      {
        rootMargin: "300px",
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
  }, [
    debouncedSearch,
    loading,
    hasMore,
  ]);

  /*
  =========================
  SEARCH STATE
  =========================
  */

  const showSearch =
    debouncedSearch.trim().length > 0;

  /*
  =========================
  RENDER
  =========================
  */

  return (
    <main className="home">

      {/* =====================
          SEARCH RESULTS
      ===================== */}

      {showSearch ? (
        <section className="search-results-section">

          {searchLoading ? (
            <div className="home-loading">

              <div className="loading-spinner"></div>

              <p>
                Searching for movies...
              </p>

            </div>
          ) : searchResults.length > 0 ? (

            <MovieRow
              title={`Search Results for "${debouncedSearch}"`}
              movies={searchResults}
            />

          ) : (

            <div className="empty-search">

              <div className="empty-search-icon">
                🔍
              </div>

              <h2>
                No movies found
              </h2>

              <p>
                We couldn't find anything for{" "}
                <strong>
                  "{debouncedSearch}"
                </strong>
              </p>

              <span>
                Try another movie title or keyword.
              </span>

            </div>
          )}

        </section>
      ) : (

        <>
          {/* =====================
              CATEGORY ROWS
          ===================== */}

          {movieRows.map((row) => (
            <MovieRow
              key={row.title}
              title={row.title}
              movies={row.movies}
            />
          ))}

          {/* =====================
              INITIAL LOADING
          ===================== */}

          {loading &&
            movieRows.length === 0 && (
              <div className="home-loading">

                <div className="loading-spinner"></div>

                <p>
                  Loading movies...
                </p>

              </div>
            )}

          {/* =====================
              INFINITE SCROLL
          ===================== */}

          {hasMore && (
            <div
              ref={loader}
              className="scroll-loader"
            >

              {loading ? (
                <>
                  <div className="loading-spinner"></div>

                  <span>
                    Loading more movies...
                  </span>
                </>
              ) : (
                <span>
                  Scroll for more
                </span>
              )}

            </div>
          )}

          {!hasMore && (
            <div className="end-message">
              You've reached the end 🎬
            </div>
          )}

        </>
      )}

    </main>
  );
}

export default Home;