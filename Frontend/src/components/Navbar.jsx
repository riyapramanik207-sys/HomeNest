import { Link, NavLink } from "react-router-dom";
export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold text-success fs-3" to="/">
          <img
            src="/logo.png"
            alt=""
            width="36"
            height="36"
            className="me-2"
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />
          HomeNest
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#homeNestMenu"
          aria-controls="homeNestMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="homeNestMenu">
          <div className="navbar-nav ms-auto align-items-lg-center gap-lg-3">
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
            <NavLink className="nav-link" to="/listings">
              Find PG
            </NavLink>
            <NavLink className="nav-link" to="/owner/register">
              List Your PG
            </NavLink>
            <NavLink className="nav-link" to="/login">
              Login
            </NavLink>
            <Link className="btn btn-success rounded-pill px-4" to="/register">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}



