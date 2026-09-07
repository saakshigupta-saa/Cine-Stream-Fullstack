import { useEffect, useRef, useState } from "react";

import { searchMovies } from "../api/omdb";
import { getPosts, createPost } from "../api/dataHub";
import MovieRow from "../components/MovieRow";
import MoodMatcher from "../components/MoodMatcher";
import useDebounce from "../hooks/useDebounce";

import "../styles/Home.css";

function Home({ searchTerm }) {
  const [movieRows, setMovieRows] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [postsError, setPostsError] = useState("");
  const [postTitle, setPostTitle] = useState("");
const [postContent, setPostContent] = useState("");
const [postSubmitting, setPostSubmitting] = useState(false);

  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [moodMovie, setMoodMovie] = useState(null);

  const loader = useRef(null);

  const debouncedSearch = useDebounce(searchTerm, 500);
  const handleCreatePost = async (event) => {
  event.preventDefault();

  if (!postTitle.trim() || !postContent.trim()) {
    return;
  }

  try {
    setPostSubmitting(true);

    const response = await createPost(postTitle, postContent);

    setPosts((currentPosts) => [response.post, ...currentPosts]);

    setPostTitle("");
    setPostContent("");
  } catch (error) {
    console.error("Post creation error:", error);
  } finally {
    setPostSubmitting(false);
  }
};

  // =========================
  // DATA HUB POSTS
  // =========================

  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (error) {
        console.error("Posts loading error:", error);
        setPostsError("Unable to load posts.");
      } finally {
        setPostsLoading(false);
      }
    }

    loadPosts();
  }, []);

  // =========================
  // MOVIE CATEGORIES
  // =========================

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

  // =========================
  // SEARCH
  // =========================

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

  // =========================
  // CATEGORY MOVIES
  // =========================

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

  // =========================
  // RESET PAGINATION
  // =========================

  useEffect(() => {
    if (!debouncedSearch.trim()) {
      setPage(1);
      setHasMore(true);
    }
  }, [debouncedSearch]);

  // =========================
  // INFINITE SCROLL
  // =========================

  useEffect(() => {
    if (debouncedSearch.trim()) {
      return;
    }

    const observer =
      new IntersectionObserver(
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

  // =========================
  // SEARCH STATE
  // =========================

  const showSearch =
    debouncedSearch.trim().length > 0;

  // =========================
  // MOOD MATCHER
  // =========================

  function handleMoodMovie({
    title,
    movie,
  }) {
    console.log(
      "Mood movie:",
      title,
      movie
    );

    setMoodMovie(movie);
  }

  // =========================
  // RENDER
  // =========================

  return (
    <main className="home">

      {/* =====================
          DATA HUB POSTS
      ===================== */}

      {!showSearch && (
        <section className="data-hub-posts">
          <h2>Latest Posts</h2>

<form onSubmit={handleCreatePost} className="create-post-form">
  <input
    type="text"
    placeholder="Post title"
    value={postTitle}
    onChange={(event) => setPostTitle(event.target.value)}
  />

  <textarea
    placeholder="Write your post..."
    value={postContent}
    onChange={(event) => setPostContent(event.target.value)}
  />

  <button type="submit" disabled={postSubmitting}>
    {postSubmitting ? "Creating..." : "Create Post"}
  </button>
</form>


          {postsLoading ? (
            <p>Loading posts...</p>
          ) : postsError ? (
            <p>{postsError}</p>
          ) : posts.length > 0 ? (
            posts.map((post) => (
              <article key={post._id}>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
              </article>
            ))
          ) : (
            <p>No posts available.</p>
          )}
        </section>
      )}

      {/* =====================
          AI MOOD MATCHER
      ===================== */}

      {!showSearch && (
        <MoodMatcher
          onMovieFound={handleMoodMovie}
        />
      )}

      {/* =====================
          MOOD MATCH RESULT
      ===================== */}

      {!showSearch &&
        moodMovie && (
          <MovieRow
            title="✨ Your Mood Match"
            movies={[moodMovie]}
          />
        )}

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
                Try another movie title or
                keyword.
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

          {/* =====================
              END MESSAGE
          ===================== */}

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