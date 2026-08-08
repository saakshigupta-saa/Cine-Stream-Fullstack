import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_OMDB_BASE_URL,
});

// Search Movies
export const searchMovies = async (query = "Marvel", page = 1) => {
  try {
    const response = await API.get("/", {
      params: {
        apikey: import.meta.env.VITE_OMDB_API_KEY,
        s: query,
        page,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Search Movies Error:", error);
    throw error;
  }
};

// Get Single Movie Details
export const getMovieDetails = async (id) => {
  try {
    const response = await API.get("/", {
      params: {
        apikey: import.meta.env.VITE_OMDB_API_KEY,
        i: id,
        plot: "full",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Movie Details Error:", error);
    throw error;
  }
};