import "../styles/Hero.css";
import { FaPlay, FaInfoCircle } from "react-icons/fa";

function Hero() {

  return (

    <section className="hero">

      <div className="hero-overlay"></div>

      <div className="hero-content">

        <span className="hero-tag">
          NETFLIX ORIGINAL
        </span>

        <h1 className="hero-title">

          The Dark Knight

        </h1>

        <div className="hero-meta">

          <span>⭐ 9.0</span>

          <span>2008</span>

          <span>Action</span>

          <span>2h 32m</span>

        </div>

        <p className="hero-description">

          Batman faces his greatest challenge as the Joker unleashes chaos across Gotham City, forcing the Dark Knight to confront impossible choices between justice and sacrifice.

        </p>

        <div className="hero-buttons">

          <button className="play-button">

            <FaPlay />

            Play

          </button>

          <button className="info-button">

            <FaInfoCircle />

            More Info

          </button>

        </div>

      </div>

    </section>

  );

}

export default Hero;