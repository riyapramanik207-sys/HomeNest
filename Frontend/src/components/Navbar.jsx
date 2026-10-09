
import React, { useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      {/* Logo */}
      <a href="/" className="navbar-logo" onClick={closeMenu}>
        <span className="logo-icon">🏡</span>
        <span>
          Home<span className="logo-highlight">Nest</span>
        </span>
      </a>

      {/* Mobile Menu Button */}
      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      {/* Navigation Links */}
      <div className={`navbar-links ${menuOpen ? "active" : ""}`}>
        <a href="/" onClick={closeMenu}>Home</a>
        <a href="/listings" onClick={closeMenu}>Find Properties</a>
        <a href="/about" onClick={closeMenu}>About Us</a>
        <a href="/contact" onClick={closeMenu}>Contact</a>

        <div className="navbar-buttons">
          <a
            href="/login"
            className="login-btn"
            onClick={closeMenu}
          >
            Login
          </a>

          <a
            href="/register"
            className="register-btn"
            onClick={closeMenu}
          >
            Register
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;


