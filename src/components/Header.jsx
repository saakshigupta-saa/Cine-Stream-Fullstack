import { NavLink } from "react-router-dom";
import { FaSearch, FaHeart, FaUserCircle } from "react-icons/fa";
import "../styles/Header.css";

function Header() {

  return (

    <header className="header">

     <NavLink to="/" className="logo">
  Cine<span>Stream</span>
</NavLink>

      <nav className="nav-links">

        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "active-link" : ""
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            isActive ? "active-link" : ""
          }
        >
          Favorites
        </NavLink>

      </nav>

      <div className="header-icons">

        <FaSearch className="header-icon" />

        <FaHeart className="header-icon" />

        <FaUserCircle className="header-icon profile-icon" />

      </div>

    </header>

  );

}

export default Header;