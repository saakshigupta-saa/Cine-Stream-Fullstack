import { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";
import MovieRow from "../components/MovieRow";

function Favorites() {

  const { favorites } = useContext(FavoritesContext);

  return (

    <main>

      <MovieRow
        title="❤️ My Favorites"
        movies={favorites}
      />

    </main>

  );

}

export default Favorites;