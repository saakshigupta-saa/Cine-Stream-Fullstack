import { Link, NavLink } from "react-router-dom";
import { FaHeart, FaFilm } from "react-icons/fa";

import "../styles/Header.css";

function Header() {
  return (
    <header className="header">

      <div className="header-inner">

        {/* LOGO */}

        <Link to="/" className="logo">
          <span className="logo-icon">
            <FaFilm />
          </span>

          <span className="logo-text">
            Cine<span>Stream</span>
          </span>
        </Link>

        {/* NAVIGATION */}

        <nav className="nav">

          <NavLink
            to="/"
            className={({ isActive }) =>
              `nav-link ${
                isActive ? "active" : ""
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              `nav-link ${
                isActive ? "active" : ""
              }`
            }
          >
            <FaHeart />

            <span>
              Favorites
            </span>
          </NavLink>

        </nav>

      </div>

    </header>
  );
}

export default Header;