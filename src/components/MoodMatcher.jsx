import { useState } from "react";
import { searchMovies } from "../api/omdb";
import "../styles/MoodMatcher.css";

function MoodMatcher({ onMovieFound }) {
  const [mood, setMood] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function findMovie() {
    if (!mood.trim()) {
      setError("Tell me how you're feeling first.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

      if (!apiKey) {
        throw new Error("Gemini API key is missing.");
      }

      const prompt = `
You are a movie recommendation assistant.

The user says:
"${mood}"

Recommend ONE movie that matches the user's mood and request.

Return ONLY the movie title.
Do not include quotes.
Do not include explanations.
Do not include the year.
`;

      // =========================
      // GEMINI REQUEST
      // =========================

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: prompt,
                  },
                ],
              },
            ],
          }),
        }
      );

      if (!response.ok) {
  const errorData = await response.json().catch(() => null);

  console.error("Gemini API error:", errorData);

  throw new Error(
    errorData?.error?.message ||
      `Gemini request failed (${response.status}).`
  );
}

      const data = await response.json();

      // =========================
      // GET MOVIE TITLE
      // =========================

      const movieTitle =
        data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

      if (!movieTitle) {
        throw new Error(
          "Gemini did not return a movie title."
        );
      }

      console.log(
        "Gemini recommendation:",
        movieTitle
      );

      // =========================
      // SEARCH OMDB
      // =========================

      const movieData = await searchMovies(
        movieTitle,
        1
      );

      if (
        movieData.Response !== "True" ||
        !movieData.Search ||
        movieData.Search.length === 0
      ) {
        throw new Error(
          `Couldn't find "${movieTitle}" in OMDb.`
        );
      }

      // =========================
      // SEND MOVIE TO HOME
      // =========================

      onMovieFound({
        title: movieTitle,
        movie: movieData.Search[0],
      });

    } catch (err) {
      console.error(
        "Mood Matcher error:",
        err
      );

      setError(
        err.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  // =========================
  // FORM SUBMIT
  // =========================

  function handleSubmit(event) {
    event.preventDefault();
    findMovie();
  }

  // =========================
  // UI
  // =========================

  return (
    <section className="mood-matcher">

      <div className="mood-matcher-header">

        <h2>
          🎬 Find Your Perfect Movie
        </h2>

        <p>
          Tell us how you're feeling and we'll
          find something you'll love.
        </p>

      </div>

      <form
        className="mood-input-wrapper"
        onSubmit={handleSubmit}
      >

        <input
          type="text"
          className="mood-input"
          value={mood}
          onChange={(event) =>
            setMood(event.target.value)
          }
          placeholder="I'm feeling sad but want an action movie..."
          disabled={loading}
        />

        <button
          type="submit"
          className="mood-button"
          disabled={loading}
        >
          {loading
            ? "Finding..."
            : "Find Movie"}
        </button>

      </form>

      {error && (
        <p className="mood-error">
          {error}
        </p>
      )}

    </section>
  );
}

export default MoodMatcher;