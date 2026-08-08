import axios from "axios";

const WATCHMODE = axios.create({
  baseURL: "https://api.watchmode.com/v1",
});

export async function findMovieTrailer(title) {
  try {
    // 1. Search for the movie
    const searchResponse = await WATCHMODE.get(
      "/autocomplete-search/",
      {
        params: {
          apiKey: import.meta.env.VITE_WATCHMODE_API_KEY,
          search_value: title,
        },
      }
    );

    const results = searchResponse.data?.results || [];

    // Find a movie rather than a TV show
    const movie = results.find(
      (item) =>
        item.type === "movie" ||
        item.type === "movie" ||
        item.result_type === "title"
    );

    if (!movie) {
      console.log("Movie not found on Watchmode");
      return null;
    }

    console.log("Watchmode movie:", movie);

    // 2. Get movie details
    const detailsResponse = await WATCHMODE.get(
      `/title/${movie.id}/details/`,
      {
        params: {
          apiKey: import.meta.env.VITE_WATCHMODE_API_KEY,
        },
      }
    );

    const details = detailsResponse.data;

    console.log("Watchmode details:", details);

    // 3. Look for trailer
    if (details.trailer) {
      return details.trailer;
    }

    if (details.trailer_url) {
      return details.trailer_url;
    }

    return null;

  } catch (error) {
    console.error(
      "Watchmode error:",
      error.response?.data || error.message
    );

    return null;
  }
}