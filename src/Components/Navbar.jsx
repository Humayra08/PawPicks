import React from "react";
import { Link, useNavigate } from "react-router-dom";
import FooterLogoImg from "../Assets/logo.png";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="nav-container">
        {/* Logo */}
        <div className="logo" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <img src={FooterLogoImg} alt="Logo" className="navbar-logo-img" />
          <span className="navbar-logo-text">PawPicks</span>
        </div>

        {/* Navigation */}
        <nav className="nav-menu">
          <Link to="/" className="nav-link">About</Link>   {/* ✅ goes HomePage */}
          <Link to="/services" className="nav-link">Service</Link> {/* ✅ goes ServicePage */}
          <a href="#" className="nav-link">Discovery</a>
          <a href="#" className="nav-link">Shop</a>
          <a href="#" className="nav-link">Contact</a>
        </nav>

        {/* Auth Actions */}
        <div className="nav-actions">
          <button className="auth-link" onClick={() => navigate("/register")}>
            Register /
          </button>
          <button className="auth-link" onClick={() => navigate("/login")}>
            Login
          </button>
        </div>
      </div>
    </header>
  );
}
