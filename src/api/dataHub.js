import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_DATA_HUB_BASE_URL,
});

export const getPosts = async () => {
  try {
    const response = await API.get("/posts");
    return response.data;
  } catch (error) {
    console.error("Data Hub API Error:", error);
    throw error;
  }
};

export const createPost = async (title, content) => {
  try {
    const response = await API.post("/posts", {
      title,
      content,
    });

    return response.data;
  } catch (error) {
    console.error("Create Post Error:", error);
    throw error;
  }
};