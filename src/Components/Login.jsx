import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FooterLogoImg from "../Assets/logo.png";

export default function Login() {
  const [activeNavLink, setActiveNavLink] = useState(""); // no main-nav item preselected
  const [headerVisible, setHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();

  const navItems = ["About", "Service", "Discovery", "Shop", "Contact"];

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      if (y > lastScrollY && y > 100) setHeaderVisible(false);
      else setHeaderVisible(true);
      setLastScrollY(y);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleNavClick = (linkName, e) => {
    e.preventDefault();
    setActiveNavLink(linkName);
  };

  const goToRegister = (e) => { e.preventDefault(); navigate("/register"); };
  const goToLogin = (e) => { e.preventDefault(); navigate("/login"); };

  return (
    <div className="login-page">
      <header className={`header ${headerVisible ? "visible" : "hidden"}`}>
        <div className="nav-container">
          <div className="logo" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <img src={FooterLogoImg} alt="Logo" className="navbar-logo-img" />
            <span className="navbar-logo-text">PawPicks</span>
          </div>

          <nav className="nav-menu">
            {navItems.map((item) => (
              <a
                key={item}
                href="#"
                className={`nav-link ${activeNavLink === item ? "active" : ""}`}
                onClick={(e) => handleNavClick(item, e)}
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="nav-actions">
            <button className="notification-btn" aria-label="Notifications">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2C10.5523 2 11 2.44772 11 3V4.1C13.2822 4.56329 15 6.58104 15 9V12.382L16.553 14.894C16.8056 15.2485 16.5437 15.75 16.118 15.75H3.88197C3.45626 15.75 3.19440 15.2485 3.44701 14.894L5 12.382V9C5 6.58104 6.71776 4.56329 9 4.1V3C9 2.44772 9.44772 2 10 2Z" fill="#9CA3AF" />
                <path d="M7.5 17.25C7.5 18.4926 8.50736 19.5 10 19.5C11.4926 19.5 12.5 18.4926 12.5 17.25H7.5Z" fill="#9CA3AF" />
              </svg>
            </button>

            <button className="cart-btn" aria-label="Cart">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M3 3H4.27924C4.70967 3 5.09181 3.28101 5.21799 3.69139L5.5 4.5M5.5 4.5L6.5 8.5H15.5L17 4.5H5.5ZM8 16.5C8.82843 16.5 9.5 15.8284 9.5 15C9.5 14.1716 8.82843 13.5 8 13.5C7.17157 13.5 6.5 14.1716 6.5 15C6.5 15.8284 7.17157 16.5 8 16.5ZM15 16.5C15.8284 16.5 16.5 15.8284 16.5 15C16.5 14.1716 15.8284 13.5 15 13.5C14.1716 13.5 14.5 14.1716 14.5 15C14.5 15.8284 14.1716 16.5 15 16.5Z" stroke="#9CA3AF" strokeWidth="1.5" fill="none" />
              </svg>
            </button>

            {/* auth items — Login is active on this page */}
            <button type="button" className="auth-link" onClick={goToRegister}>
              Register /
            </button>
            <button type="button" className="auth-link active" onClick={goToLogin}>
              Login
            </button>
          </div>
        </div>
      </header>

      {/* body remains blank for now */}
      <main style={{ minHeight: "100vh", background: "#ffffff" }} />
    </div>
  );
}
