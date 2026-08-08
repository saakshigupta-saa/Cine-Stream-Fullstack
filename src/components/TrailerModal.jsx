import { FaTimes, FaYoutube } from "react-icons/fa";

import "../styles/TrailerModal.css";

function TrailerModal({ trailerUrl, onClose }) {
  if (!trailerUrl) return null;

  return (
    <div
      className="trailer-backdrop"
      onClick={onClose}
    >
      <div
        className="trailer-modal"
        onClick={(e) => e.stopPropagation()}
      >

        <div className="trailer-header">

          <div className="trailer-title">
            <FaYoutube />
            <span>Official Trailer</span>
          </div>

          <button
            type="button"
            className="trailer-close"
            onClick={onClose}
            aria-label="Close trailer"
          >
            <FaTimes />
          </button>

        </div>

        <div className="trailer-content">

          <iframe
            src={trailerUrl}
            title="Movie Trailer"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />

        </div>

      </div>
    </div>
  );
}

export default TrailerModal;