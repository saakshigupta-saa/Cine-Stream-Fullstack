import { FaSearch, FaTimes } from "react-icons/fa";

import "../styles/SearchBar.css";

function SearchBar({
  searchTerm,
  setSearchTerm,
}) {
  function handleClear() {
    setSearchTerm("");
  }

  return (
    <div className="search-bar">

      <FaSearch className="search-icon" />

      <input
        type="text"
        value={searchTerm}
        onChange={(e) =>
          setSearchTerm(e.target.value)
        }
        placeholder="Search movies, series..."
        aria-label="Search movies"
      />

      {searchTerm && (
        <button
          type="button"
          className="search-clear"
          onClick={handleClear}
          aria-label="Clear search"
        >
          <FaTimes />
        </button>
      )}

    </div>
  );
}

export default SearchBar;