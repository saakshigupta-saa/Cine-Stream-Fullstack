import { Link } from "react-router-dom";
import { FaPlay, FaInfoCircle } from "react-icons/fa";

import "../styles/Hero.css";

function Hero() {
  return (
    <section className="hero">

      <div className="hero-background"></div>

      <div className="hero-overlay"></div>

      <div className="hero-content">

        <span className="hero-badge">
          CINESTREAM ORIGINAL
        </span>

        <h1 className="hero-title">
          Discover Your
          <span> Next Favorite Movie</span>
        </h1>

        <p className="hero-description">
          Explore thousands of movies and TV shows,
          discover what's trending, and build your
          personal collection of favorites.
        </p>

        <div className="hero-buttons">

          <Link
            to="/"
            className="hero-primary-btn"
          >
            <FaPlay />
            Explore Movies
          </Link>

          <Link
            to="/favorites"
            className="hero-secondary-btn"
          >
            <FaInfoCircle />
            My Favorites
          </Link>

        </div>

        <div className="hero-stats">

          <div className="hero-stat">
            <strong>10K+</strong>
            <span>Movies</span>
          </div>

          <div className="hero-divider"></div>

          <div className="hero-stat">
            <strong>50+</strong>
            <span>Genres</span>
          </div>

          <div className="hero-divider"></div>

          <div className="hero-stat">
            <strong>24/7</strong>
            <span>Discover</span>
          </div>

        </div>

      </div>

      <div className="hero-scroll">
        <span>Scroll to explore</span>
        <div className="scroll-line"></div>
      </div>

    </section>
  );
}

export default Hero;