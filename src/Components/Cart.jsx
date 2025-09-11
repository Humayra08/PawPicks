import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import FooterLogoImg from '../Assets/logo.png';
import Last from '../Assets/Last.png';

function Cart() {
  const [activeNavLink, setActiveNavLink] = useState('Shop');
  const navigate = useNavigate();

  const navItems = ['About', 'Service', 'Discovery', 'Shop', 'Contact'];

  const handleNavClick = (linkName, e) => {
    e.preventDefault();
    setActiveNavLink(linkName);
    if (linkName === "About") navigate("/");
    else if (linkName === "Service") navigate("/services");
    else if (linkName === "Shop") navigate("/shop");
  };

  return (
    <div className="cart-root" style={{ minHeight: '100vh', background: '#F6EDFF', display: 'flex', flexDirection: 'column' }}>
      {/* Navbar */}
      <header className="header">
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
                className={`nav-link ${activeNavLink === item ? 'active' : ''}`}
                onClick={(e) => handleNavClick(item, e)}
              >
                {item}
              </a>
            ))}
          </nav>
          <div className="nav-actions">
            <button className="notification-btn" aria-label="Notifications" type="button">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M10 2C10.5523 2 11 2.44772 11 3V4.1C13.2822 4.56329 15 6.58104 15 9V12.382L16.553 14.894C16.8056 15.2485 16.5437 15.75 16.118 15.75H3.88197C3.45626 15.75 3.19440 15.2485 3.44701 14.894L5 12.382V9C5 6.58104 6.71776 4.56329 9 4.1V3C9 2.44772 9.44772 2 10 2Z" fill="#9CA3AF" />
                <path d="M7.5 17.25C7.5 18.4926 8.50736 19.5 10 19.5C11.4926 19.5 12.5 18.4926 12.5 17.25H7.5Z" fill="#9CA3AF" />
              </svg>
            </button>
            <button className="cart-btn" aria-label="Cart" type="button">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M3 3H4.27924C4.70967 3 5.09181 3.28101 5.21799 3.69139L5.5 4.5M5.5 4.5L6.5 8.5H15.5L17 4.5H5.5ZM8 16.5C8.82843 16.5 9.5 15.8284 9.5 15C9.5 14.1716 8.82843 13.5 8 13.5C7.17157 13.5 6.5 14.1716 6.5 15C6.5 15.8284 7.17157 16.5 8 16.5ZM15 16.5C15.8284 16.5 16.5 15.8284 16.5 15C16.5 14.1716 15.8284 13.5 15 13.5C14.1716 13.5 14.5 14.1716 14.5 15C14.5 15.8284 14.1716 16.5 15 16.5Z" stroke="#9CA3AF" strokeWidth="1.5" fill="none" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main area (empty, just colored) */}
      <main style={{ flex: 1 }}></main>

      {/* Footer */}
      <footer className="contact-footer">
        <div className="contact-footer-left">
          <div className="footer-logo">
            <img src={FooterLogoImg} alt="Footer Logo" className="footer-logo-img" />
          </div>
          <div className="footer-desc">
            Welcome to Cuddle & Care Pets! We provide quality pet products, grooming, and care advice for your furry friends.
          </div>
        </div>
        <div className="contact-footer-center">
          <div className="footer-polaroid">
            <div className="footer-polaroid-frame">
              <img src={Last} alt="Dog" className="footer-dog-img" />
            </div>
            <div className="footer-polaroid-dash"></div>
          </div>
        </div>
        <div className="contact-footer-right">
          <div className="footer-cols">
            <div className="footer-col">
              <div className="footer-col-title">Website</div>
              <ul>
                <li onClick={() => navigate('/')}>About</li>
                <li onClick={() => navigate('/services')}>Service</li>
                <li>Discovery</li>
                <li onClick={() => navigate('/shop')}>Shop</li>
                <li>Contact</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Cart;