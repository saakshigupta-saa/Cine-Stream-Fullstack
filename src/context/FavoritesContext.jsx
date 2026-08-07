import { createContext, useEffect, useState } from "react";

export const FavoritesContext = createContext();

function FavoritesProvider({ children }) {

  const [favorites, setFavorites] = useState(() => {

    const saved = localStorage.getItem("favorites");

    return saved ? JSON.parse(saved) : [];

  });

  useEffect(() => {

    localStorage.setItem(
      "favorites",
      JSON.stringify(favorites)
    );

  }, [favorites]);

  function addToFavorites(movie) {

    if (
      favorites.some(
        (item) => item.imdbID === movie.imdbID
      )
    ) return;

    setFavorites((prev) => [...prev, movie]);

  }

  function removeFromFavorites(id) {

    setFavorites((prev) =>
      prev.filter(
        (movie) => movie.imdbID !== id
      )
    );

  }

  function isFavorite(id) {

    return favorites.some(
      (movie) => movie.imdbID === id
    );

  }

  return (

    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
      }}
    >

      {children}

    </FavoritesContext.Provider>

  );

}

export default FavoritesProvider;