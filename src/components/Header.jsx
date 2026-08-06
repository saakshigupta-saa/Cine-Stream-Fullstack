import "../styles/Header.css";
import { FaSearch, FaHeart, FaUserCircle } from "react-icons/fa";

function Header() {
  return (
    <header className="header">

      <div className="logo">
        Cine<span>Stream</span>
      </div>

      <nav className="nav-links">

        <a href="#">Home</a>

        <a href="#">Movies</a>

        <a href="#">Favorites</a>

      </nav>

      <div className="header-icons">

        <FaSearch />

        <FaHeart />

        <FaUserCircle />

      </div>

    </header>
  );
}

export default Header;