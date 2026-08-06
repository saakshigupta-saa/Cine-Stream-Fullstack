import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_OMDB_BASE_URL,
});

export const searchMovies = async (query = "Marvel", page = 1) => {
  const response = await API.get("/", {
    params: {
      apikey: import.meta.env.VITE_OMDB_API_KEY,
      s: query,
      page,
    },
  });

  return response.data;
};

export const getMovieDetails = async (id) => {
  const response = await API.get("/", {
    params: {
      apikey: import.meta.env.VITE_OMDB_API_KEY,
      i: id,
    },
  });

  return response.data;
};