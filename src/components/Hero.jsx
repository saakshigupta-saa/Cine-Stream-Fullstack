import "../styles/Hero.css";

function Hero() {
  return (
    <section className="hero">

      <div className="hero-overlay">

        <div className="hero-content">

          <span className="hero-badge">
            ★ Featured Collection
          </span>

          <h1 className="hero-title">
            Unlimited Movies,
            <br />
            Endless Entertainment
          </h1>

          <p className="hero-description">
            Discover thousands of movies, explore trending collections,
            save your favorites, and enjoy a premium streaming experience
            inspired by modern entertainment platforms.
          </p>

          <div className="hero-buttons">

            <button className="play-btn">
              ▶ Explore Now
            </button>

            <button className="info-btn">
              Browse Movies
            </button>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;