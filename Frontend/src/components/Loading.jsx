
import { Home } from "lucide-react";
import "./Loading.css";

function Loading({ message = "Finding your perfect stay..." }) {
  return (
    <div className="homenest-loading">
      <div className="loading-content">
        <div className="loading-logo">
          <Home size={38} strokeWidth={2.2} />
        </div>

        <h2 className="loading-title">
          Home<span>Nest</span>
        </h2>

        <div className="loading-spinner"></div>

        <p className="loading-message">{message}</p>

        <p className="loading-subtitle">
          Making your stay comfortable and easy.
        </p>

        <div className="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
}

export default Loading;