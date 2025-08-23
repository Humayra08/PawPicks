import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import petsImage from '../Assets/pets.png';
import FirstDog from '../Assets/FirstDog.png';
import OrangeCat from '../Assets/OrangeCat.png';
import FooterLogoImg from '../Assets/logo.png';
import LastDog from '../Assets/LastDog.png';
import Last from '../Assets/Last.png';

function WhatWeOffer() {
  return (
    <section className="offer-section">
      <div className="offer-title-top">
        WHAT WE OFFER
        <span className="offer-icon">
          <svg width="32" height="21" viewBox="0 0 28 18" fill="none">
            <ellipse cx="14" cy="9" rx="6" ry="6" fill="#D6B4FA" />
            <ellipse cx="23" cy="9" rx="2" ry="1" fill="#EAD8FC" />
            <ellipse cx="19" cy="2" rx="1.5" ry="1" fill="#EAD8FC" />
            <ellipse cx="19" cy="16" rx="1.5" ry="1" fill="#EAD8FC" />
            <ellipse cx="9" cy="2" rx="1.5" ry="1" fill="#EAD8FC" />
            <ellipse cx="9" cy="16" rx="1.5" ry="1" fill="#EAD8FC" />
            <ellipse cx="5" cy="9" rx="2" ry="1" fill="#EAD8FC" />
          </svg>
        </span>
      </div>
      <div className="offer-circles">
        <div className="circle circle1"></div>
        <div className="circle circle2"></div>
        <div className="circle circle3"></div>
      </div>
      <div className="offer-pets-image">
        <img src={petsImage} alt="pets" className="pets-image" />
      </div>
    </section>
  );
}

function ContactSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleRefresh = () => {
    setFormData({
      fullName: "",
      phoneNumber: "",
      email: "",
    });
  };

  return (
    <section>
      <div className="contact-root">
        <div className="contact-main">
          <div className="contact-left">
            <h2 className="contact-title">
              CONTACT WITH US <span className="paw-icon">🐾</span>
            </h2>
            <form className="contact-form" onSubmit={handleSubmit}>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleInputChange}
                className="contact-input"
              />
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="contact-input"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="contact-input"
              />
              <div className="contact-btn-group">
                <button type="submit" className="contact-submit-btn">
                  Submit
                </button>
                <button
                  type="button"
                  className="contact-refresh-btn"
                  onClick={handleRefresh}
                >
                  Refresh
                </button>
              </div>
            </form>
          </div>
          <div className="contact-right">
            <div className="circle-image-wrapper">
              <div className="contact-circle">
                <div className="contact-circle-inner"></div>
              </div>
              <img src={LastDog} alt="Dog and Cat" className="circle-main-image" />
            </div>
          </div>
        </div>
        {/* Light purple footer is placed here, directly below contact-main */}
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
                  <li>About</li>
                  <li>Service</li>
                  <li>Discovery</li>
                  <li>Shop</li>
                  <li>Contact</li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}

function HomePage() {
  const [activeNavLink, setActiveNavLink] = useState('About');
  const [headerVisible, setHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navigate = useNavigate();
  const goToLogin = (e) => { e?.preventDefault?.(); navigate('/login'); };
  const goToRegister = (e) => { e?.preventDefault?.(); navigate('/register'); };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHeaderVisible(false);
      } else {
        setHeaderVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const animateProgressBars = () => {
      const progressBars = document.querySelectorAll('.progress-fill');
      progressBars.forEach((bar, index) => {
        setTimeout(() => {
          bar.style.width = '0%';
          bar.style.transition = 'width 2s ease';
          setTimeout(() => {
            bar.style.width = '75%';
          }, 100);
        }, index * 200);
      });
    };
    setTimeout(animateProgressBars, 1000);
    console.log('Pet Care Website loaded successfully! 🐾');
  }, []);

  const handleNavClick = (linkName, e) => {
    e.preventDefault();
    setActiveNavLink(linkName);
    if (linkName === "About") {
      navigate("/");
    } else if (linkName === "Service") {
      navigate("/services");
    } else if (linkName === "Shop") {
      navigate("/shop");
    }
  };

  const handleCardMouseEnter = (e) => {
    const card = e.currentTarget;
    card.style.transform = 'translateY(-5px) scale(1.05)';
    card.style.transition = 'all 0.3s ease';
  };
  const handleCardMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = 'translateY(0) scale(1)';
  };
  const handleCardClick = (e) => {
    const card = e.currentTarget;
    card.style.animation = 'bounce 0.6s ease';
    setTimeout(() => { card.style.animation = ''; }, 600);
  };
  const handleHeartClick = (e) => {
    const heart = e.currentTarget;
    heart.style.animation = 'heartBeat 0.8s ease';
    setTimeout(() => { heart.style.animation = 'float 3s ease-in-out infinite'; }, 800);
  };

  const navItems = ['About', 'Service', 'Discovery', 'Shop', 'Contact'];

  return (
    <div className="pet-care-app">
      <style>{`
        @keyframes bounce { 0%,20%,60%,100%{transform:translateY(0) scale(1);}40%{transform:translateY(-10px) scale(1.1);}80%{transform:translateY(-5px) scale(1.05);} }
        @keyframes heartBeat { 0%{transform:scale(1);}14%{transform:scale(1.3);}28%{transform:scale(1);}42%{transform:scale(1.3);}70%{transform:scale(1);} }
        @keyframes wiggle { 0%,7%,14%,21%,28%,35%,42%,49%,56%,63%,70%,77%,84%,91%,98%,100%{transform:rotate(0deg);}3.5%,10.5%,17.5%,24.5%,31.5%,38.5%,45.5%,52.5%,59.5%,66.5%,73.5%,80.5%,87.5%,94.5%{transform:rotate(-3deg);} }
        .header { transition: transform 0.3s ease; transform: translateY(${headerVisible ? '0' : '-100%'}); }
      `}</style>

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
            <button className="notification-btn" aria-label="Notifications">
              {/* ... SVG ... */}
            </button>
            <button className="cart-btn" aria-label="Cart">
              {/* ... SVG ... */}
            </button>
            <button
              type="button"
              className="auth-link"
              onClick={goToRegister}
              style={{ background: 'none', border: 0, padding: 0, cursor: 'pointer' }}
            >
              Register /
            </button>
            <button
              type="button"
              className="auth-link"
              onClick={goToLogin}
              style={{ background: 'none', border: 0, padding: 0, cursor: 'pointer' }}
            >
              Login
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main">
        <div className="hero-section">
          <div className="hero-content">
            <div className="hero-text">
              <p className="welcome-text">Welcome to the paw-some world of pet care!</p>
              <h1 className="hero-title">
                SHOP TREATS, GET TIPS, FIND FURRY FRIENDS, AND CONNECT WITH RESCUE TEAMS
              </h1>
              <p className="hero-subtitle">— ALL IN ONE TAIL-WAGGING PLACE.</p>
            </div>
            <div className="hero-visual">
              <div className="background-circles">
                <div className="purple-circle"></div>
                <div className="dashed-circle"></div>
              </div>
              <div className="main-pet-image">
                <img src={FirstDog} alt="Adorable puppy" className="puppy-image" />
              </div>
              <div className="orange-cat">
                <img src={OrangeCat} alt="Orange cat" className="cat-image" />
              </div>
              <div
                className="pet-card tiny-card"
                onMouseEnter={handleCardMouseEnter}
                onMouseLeave={handleCardMouseLeave}
                onClick={handleCardClick}
              >
                <div className="pet-card-content">
                  <div className="pet-info">
                    <h3>Tiny</h3>
                    <div className="rating">1k+ ★</div>
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=40&h=40&fit=crop&crop=face"
                    alt="Tiny"
                    className="pet-avatar"
                  />
                </div>
                <div className="progress-bar">
                  <div className="progress-fill"></div>
                </div>
              </div>
              <div
                className="pet-card mark-card"
                onMouseEnter={handleCardMouseEnter}
                onMouseLeave={handleCardMouseLeave}
                onClick={handleCardClick}
              >
                <div className="pet-card-content">
                  <div className="pet-info">
                    <h3>Mark</h3>
                    <div className="rating">1k+ ★</div>
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=40&h=40&fit=crop&crop=face"
                    alt="Mark"
                    className="pet-avatar"
                  />
                </div>
                <div className="progress-bar">
                  <div className="progress-fill"></div>
                </div>
              </div>
              <div className="floating-heart" onClick={handleHeartClick}>
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                  <circle cx="15" cy="15" r="15" fill="#EF4444" />
                  <path d="M15 21.5C15 21.5 8.5 17.5 8.5 13.5C8.5 11.5 10 10 12 10C13.5 10 15 11 15 11S16.5 10 18 10C20 10 21.5 11.5 21.5 13.5C21.5 17.5 15 21.5 15 21.5Z" fill="white" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <WhatWeOffer />
        <ContactSection />
      </main>
    </div>
  );
}

export default HomePage;