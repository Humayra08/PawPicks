import React, { useState, useEffect } from 'react';
import petsImage from '../Assets/pets.png';
import FirstDog from '../Assets/FirstDog.png';
import OrangeCat from '../Assets/OrangeCat.png';
import FooterLogoImg from '../Assets/logo.png';
import LastDog from '../Assets/LastDog.png'; // <-- Import your image here

function WhatWeOffer() {
  return (
    <section className="offer-section">
      {/* TOP CENTERED TITLE */}
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
      {/* Centered pets image below the circles */}
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
        <div className="contact-footer">
          <div className="contact-footer-left">
            <div className="footer-logo">
              <img src={FooterLogoImg} alt="Footer Logo" className="footer-logo-img" />
            </div>
            <div className="footer-desc">
              Welcome to Cuddle & Care Pets! We provide quality pet products, grooming, and care advice for your furry friends.
            </div>
            <div className="footer-contact-icons">
              <span className="footer-contact-icon">
                <svg width="20" height="20" viewBox="0 0 20 20"><path d="M2.5 4.5A2.5 2.5 0 0 1 5 2h10a2.5 2.5 0 0 1 2.5 2.5v11A2.5 2.5 0 0 1 15 18H5a2.5 2.5 0 0 1-2.5-2.5v-11zm1.4 0h12.2a1.1 1.1 0 0 0-1.1-1.1H4.9a1.1 1.1 0 0 0-1.1 1.1zM10 10.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5.5 6.5h11a1.5 1.5 0 0 0 1.5-1.5V8.7a4.5 4.5 0 1 1-14 0v7.8a1.5 1.5 0 0 0 1.5 1.5z" fill="#5B259D"/></svg>
              </span>
              <span className="footer-contact-icon">
                <svg width="20" height="20" viewBox="0 0 20 20"><path d="M2.5 3.5A1.5 1.5 0 0 1 4 2h12a1.5 1.5 0 0 1 1.5 1.5v13A1.5 1.5 0 0 1 16 18H4a1.5 1.5 0 0 1-1.5-1.5v-13zm1.1 0h13.8a.4.4 0 0 0-.4-.4H4a.4.4 0 0 0-.4.4zm7.4 7.8c.8.7 2.2 2.3 4.5 2.3.8 0 1.5-.1 1.5-1.3V4.7a.7.7 0 0 0-.7-.7H4.7a.7.7 0 0 0-.7.7v7.1c0 1.2.7 1.3 1.5 1.3 2.3 0 3.7-1.6 4.5-2.3z" fill="#5B259D"/></svg>
              </span>
            </div>
          </div>
          <div className="contact-footer-center">
            <div className="footer-polaroid">
              <div className="footer-polaroid-frame">
                <img
                  src="https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=400&fit=crop"
                  alt="Dog"
                  className="footer-dog-img"
                />
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
        </div>
      </div>
    </section>
  );
}

function App() {
  const [activeNavLink, setActiveNavLink] = useState('About');
  const [headerVisible, setHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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
    setTimeout(() => {
      card.style.animation = '';
    }, 600);
  };
  const handleHeartClick = (e) => {
    const heart = e.currentTarget;
    heart.style.animation = 'heartBeat 0.8s ease';
    setTimeout(() => {
      heart.style.animation = 'float 3s ease-in-out infinite';
    }, 800);
  };
  const handlePawClick = (e) => {
    const paw = e.currentTarget;
    paw.style.animation = 'wiggle 0.5s ease';
    setTimeout(() => {
      paw.style.animation = '';
    }, 500);
  };

  const navItems = ['About', 'Service', 'Discovery', 'Shop', 'Contact'];

  return (
    <div className="pet-care-app">
      <style>{`
        @keyframes bounce {
          0%, 20%, 60%, 100% { transform: translateY(0) scale(1); }
          40% { transform: translateY(-10px) scale(1.1); }
          80% { transform: translateY(-5px) scale(1.05); }
        }
        @keyframes heartBeat {
          0% { transform: scale(1); }
          14% { transform: scale(1.3); }
          28% { transform: scale(1); }
          42% { transform: scale(1.3); }
          70% { transform: scale(1); }
        }
        @keyframes wiggle {
          0%, 7%, 14%, 21%, 28%, 35%, 42%, 49%, 56%, 63%, 70%, 77%, 84%, 91%, 98%, 100% { transform: rotate(0deg);}
          3.5%, 10.5%, 17.5%, 24.5%, 31.5%, 38.5%, 45.5%, 52.5%, 59.5%, 66.5%, 73.5%, 80.5%, 87.5%, 94.5% {transform: rotate(-3deg);}
        }
        .header { transition: transform 0.3s ease; transform: translateY(${headerVisible ? '0' : '-100%'});}
      `}</style>
      <header className="header">
        <div className="nav-container">
          <div className="logo">
            <div className="paw-logo" onClick={handlePawClick}>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="20" fill="#7C3AED" />
                <ellipse cx="20" cy="16" rx="4" ry="6" fill="white" />
                <ellipse cx="13" cy="22" rx="3" ry="4" fill="white" />
                <ellipse cx="27" cy="22" rx="3" ry="4" fill="white" />
                <ellipse cx="16" cy="28" rx="2.5" ry="3" fill="white" />
                <ellipse cx="24" cy="28" rx="2.5" ry="3" fill="white" />
              </svg>
            </div>
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
            <button className="notification-btn">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2C10.5523 2 11 2.44772 11 3V4.1C13.2822 4.56329 15 6.58104 15 9V12.382L16.553 14.894C16.8056 15.2485 16.5437 15.75 16.118 15.75H3.88197C3.45626 15.75 3.19440 15.2485 3.44701 14.894L5 12.382V9C5 6.58104 6.71776 4.56329 9 4.1V3C9 2.44772 9.44772 2 10 2Z" fill="#9CA3AF" />
                <path d="M7.5 17.25C7.5 18.4926 8.50736 19.5 10 19.5C11.4926 19.5 12.5 18.4926 12.5 17.25H7.5Z" fill="#9CA3AF" />
              </svg>
            </button>
            <button className="cart-btn">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M3 3H4.27924C4.70967 3 5.09181 3.28101 5.21799 3.69139L5.5 4.5M5.5 4.5L6.5 8.5H15.5L17 4.5H5.5ZM8 16.5C8.82843 16.5 9.5 15.8284 9.5 15C9.5 14.1716 8.82843 13.5 8 13.5C7.17157 13.5 6.5 14.1716 6.5 15C6.5 15.8284 7.17157 16.5 8 16.5ZM15 16.5C15.8284 16.5 16.5 15.8284 16.5 15C16.5 14.1716 15.8284 13.5 15 13.5C14.1716 13.5 14.5 14.1716 14.5 15C14.5 15.8284 14.1716 16.5 15 16.5Z" stroke="#9CA3AF" strokeWidth="1.5" fill="none" />
              </svg>
            </button>
            <div className="auth-link">Register /</div>
            <div className="auth-link">Login</div>
          </div>
        </div>
      </header>
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
                <img
                  src={FirstDog}
                  alt="Adorable puppy"
                  className="puppy-image"
                />
              </div>
              <div className="orange-cat">
                <img
                  src={OrangeCat}
                  alt="Orange cat"
                  className="cat-image"
                />
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
        {/* What We Offer Section */}
        <WhatWeOffer />

        {/* Contact and Footer Section */}
        <ContactSection />
      </main>
    </div>
  );
}

export default App;