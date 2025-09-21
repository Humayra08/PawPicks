 import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import doctorImg from "../Assets/doctor.png";
import doggosImg from "../Assets/doggos.png";
import dogImg from "../Assets/dog.png";
import doggoImg from "../Assets/doggo.png";
import doggyImg from "../Assets/doggy.png";
import FooterLogoImg from '../Assets/logo.png';
import LastDog from "../Assets/LastDog.png";
import Last from "../Assets/Last.png";

import img1 from "../Assets/1.png";
import img2 from "../Assets/2.png";
import img3 from "../Assets/3.png";
import img4 from "../Assets/4.png";
import img5 from "../Assets/5.png";
import img6 from "../Assets/6.png";

import '../ServicePage.css';

const getInitials = (fullName = '') => {
  const parts = fullName.trim().split(/\s+/);
  const first = parts[0]?.[0] || '';
  const second = parts[1]?.[0] || '';
  return (first + second).toUpperCase();
};


const serviceCards = [
  { title: "Physical checkup your pet", desc: "Regular physical checkups are essential for your pet’s health.", img: dogImg },
  { title: "Spa", desc: "Our pet spa offers a luxurious and relaxing experience for your furry friends.", img: doggoImg },
  { title: "Environmental Consulting", desc: "Advice for creating a healthy environment for your pets.", img: doggyImg },
];

const offerCards = [
  { num: 1, title: "Group Training", desc: "Our Group Training sessions help dogs learn commands in a social setting.", img: img1 },
  { num: 2, title: "Puppy Training", desc: "Focus on foundational skills like potty training and basic commands.", img: img2 },
  { num: 3, title: "Private Training", desc: "One-on-one attention with customized training plans.", img: img3 },
  { num: 4, title: "Specialty Program", desc: "Unique programs for agility training or behavior correction.", img: img4 },
  { num: 5, title: "Virtual Training", desc: "Train your pet remotely with expert guidance.", img: img5 },
  { num: 6, title: "Security Program", desc: "Focused on protection and safety for your pet.", img: img6 },
];



function ServicePage() {
  const [formData, setFormData] = useState({ fullName: "", phoneNumber: "", email: "" });
  const [activeNavLink, setActiveNavLink] = useState('Service');
  const [headerVisible, setHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false); // For form submission loading state

  const navigate = useNavigate();

  // Add session and cart management
  const [cartCount, setCartCount] = useState(0);
  const [sessionId, setSessionId] = useState(null);

   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [user, setUser] = useState(null);
   const [showProfileDropdown, setShowProfileDropdown] = useState(false);

    useEffect(() => {
    const checkAuth = () => {
      const jwt = localStorage.getItem('jwt');
      const userData = localStorage.getItem('user');
      
      if (jwt && userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setIsLoggedIn(true);
          setUser(parsedUser);
        } catch (error) {
          console.error('Error parsing user data:', error);
          localStorage.removeItem('jwt');
          localStorage.removeItem('user');
          setIsLoggedIn(false);
          setUser(null);
        }
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    };

    checkAuth();
  }, []);

    const handleLogout = () => {
      localStorage.removeItem('jwt');
      localStorage.removeItem('user');
      setIsLoggedIn(false);
      setUser(null);
      setShowProfileDropdown(false);
      navigate('/');
    };
  
    const goToProfile = () => {
      setShowProfileDropdown(false);
      navigate('/profile');
    };
  
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (showProfileDropdown && !event.target.closest('.profile-dropdown-container')) {
          setShowProfileDropdown(false);
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showProfileDropdown]);


  useEffect(() => {
    const initializeSession = async () => {
      let storedSessionId = localStorage.getItem('pawpicks-session-id');
      if (!storedSessionId) {
        try {
          const response = await fetch('http://localhost:5000/api/cart/session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
          });
          if (response.ok) {
            const result = await response.json();
            storedSessionId = result.data.sessionId;
            localStorage.setItem('pawpicks-session-id', storedSessionId);
          }
        } catch (error) {
          console.error('Error generating session:', error);
        }
      }
      if (storedSessionId) {
        setSessionId(storedSessionId);
        fetchCartCount(storedSessionId);
      }
    };
    initializeSession();
  }, []);

  const fetchCartCount = async (sessionId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/cart/${sessionId}`);
      if (response.ok) {
        const result = await response.json();
        setCartCount(result.data.totalItems || 0);
      }
    } catch (error) {
      console.error('Error fetching cart count:', error);
    }
  };

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

  const handleNavClick = (linkName, e) => {
    e.preventDefault();
    setActiveNavLink(linkName);
    if (linkName === "About") navigate("/");
    else if (linkName === "Service") navigate("/services");
    else if (linkName === "Shop") navigate("/shop");
    else if (linkName === "Contact") navigate("/contact");
    else if (linkName === "Discovery") navigate("/discovery");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const templateParams = {
        to_email: 'musketeerst687175@gmail.com',
        from_name: formData.fullName,
        from_email: formData.email,
        phone_number: formData.phoneNumber,
        message: `New contact form submission from ${formData.fullName}`,
      };

      const result = await emailjs.send(
        'service_zy8luuq',
        'template_egv16ue',
        templateParams
      );
      console.log('Email sent successfully:', result);
      alert("Thank you for contacting us! We'll get back to you soon.");

      setFormData({
        fullName: "",
        phoneNumber: "",
        email: "",
      });
    } catch (error) {
      console.error('Error sending email:', error);
      alert("Sorry, there was an error sending your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRefresh = () => {
    setFormData({
      fullName: "",
      phoneNumber: "",
      email: "",
    });
  };

  const navItems = ['About', 'Service', 'Discovery', 'Shop', 'Contact'];

  return (
    <div className="service-page">
      <style>{`
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
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2C10.5523 2 11 2.44772 11 3V4.1C13.2822 4.56329 15 6.58104 15 9V12.382L16.553 14.894C16.8056 15.2485 16.5437 15.75 16.118 15.75H3.88197C3.45626 15.75 3.19440 15.2485 3.44701 14.894L5 12.382V9C5 6.58104 6.71776 4.56329 9 4.1V3C9 2.44772 9.44772 2 10 2Z" fill="#9CA3AF" />
                <path d="M7.5 17.25C7.5 18.4926 8.50736 19.5 10 19.5C11.4926 19.5 12.5 18.4926 12.5 17.25H7.5Z" fill="#9CA3AF" />
              </svg>
            </button>
            {/* Cart button with count and navigation */}
            <button className="cart-btn" aria-label="Cart" type="button" onClick={() => navigate('/cart')} style={{ position: 'relative' }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M3 3H4.27924C4.70967 3 5.09181 3.28101 5.21799 3.69139L5.5 4.5M5.5 4.5L6.5 8.5H15.5L17 4.5H5.5ZM8 16.5C8.82843 16.5 9.5 15.8284 9.5 15C9.5 14.1716 8.82843 13.5 8 13.5C7.17157 13.5 6.5 14.1716 6.5 15C6.5 15.8284 7.17157 16.5 8 16.5ZM15 16.5C15.8284 16.5 16.5 15.8284 16.5 15C16.5 14.1716 15.8284 13.5 15 13.5C14.1716 13.5 14.5 14.1716 14.5 15C14.5 15.8284 14.1716 16.5 15 16.5Z" stroke="#9CA3AF" strokeWidth="1.5" fill="none" />
              </svg>
              {cartCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  background: '#dc2626',
                  color: 'white',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 'bold'
                }}>
                  {cartCount}
                </span>
              )}
            </button>
            {isLoggedIn && user ? (
              <div className="profile-dropdown-container">
                <div 
                  className="nav-profile-avatar"
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  title={user.fullName}
                >
                  {user.avatarUrl ? (
                    <img src={user.avatarUrl} alt="Profile" />
                  ) : (
                    getInitials(user.fullName)
                  )}
                </div>
                
                <div className={`profile-dropdown ${showProfileDropdown ? 'show' : ''}`}>
                  <div className="dropdown-header">
                    <p className="dropdown-user-name">{user.fullName}</p>
                    <p className="dropdown-user-email">{user.email || user.phoneNumber}</p>
                  </div>
                  <ul className="dropdown-menu">
                    <li>
                      <button className="dropdown-item" onClick={goToProfile}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        View Profile
                      </button>
                    </li>
                    <li>
                      <button className="dropdown-item logout" onClick={handleLogout}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                          <polyline points="16,17 21,12 16,7"></polyline>
                          <line x1="21" y1="12" x2="9" y2="12"></line>
                        </svg>
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <>
                <button
                  type="button"
                  className="auth-link"
                  onClick={() => navigate('/register')}
                  style={{ background: 'none', border: 0, padding: 0, cursor: 'pointer' }}
                >
                  Register /
                </button>
                <button
                  type="button"
                  className="auth-link"
                  onClick={() => navigate('/login')}
                  style={{ background: 'none', border: 0, padding: 0, cursor: 'pointer' }}
                >
                  Login
                </button>
              </>
            )}
    
          </div>
        </div>
      </header>

      {/* Service Cards */}
      <div className="service-main">
        <div className="service-hero-row">
          <div className="service-hero-left">
            <div className="service-title-left">LOVE AND ATTENTION</div>
            <div className="service-title-green-left">FOR YOUR FURRY FRIENDS</div>
            <div className="service-desc-left">
              Welcome to our pet care service,<br />where your pets receive top-notch care and endless love
            </div>
          </div>
          <div className="service-hero-right">
            <img src={doggosImg} alt="Group of Dogs" className="service-doggos-img-right" />
            <div className="doctor-card-middle-right">
              <img src={doctorImg} alt="Doctor Jane" className="doctor-pic" />
              <div className="doctor-info">
                <span className="doctor-name">Dr. Jane</span>
                <span className="doctor-rating">1k+ ★</span>
              </div>
            </div>
          </div>
        </div>

        {/* Service Cards */}
        <div className="service-cards-row">
          {serviceCards.map(({ title, desc, img }, idx) => (
            <div key={idx} className="service-card">
              <div className="service-card-title">{title}</div>
              <div className="service-card-desc">{desc}</div>
              <button className="service-card-btn">Read More</button>
              <img src={img} alt={title} className="service-card-img" />
            </div>
          ))}
        </div>
      </div>

      {/* What We Offer */}
      <section className="offer-root">
        <h2 className="offer-title">WHAT WE OFFER <span className="paw-icon">🐾</span></h2>
        <p className="offer-desc">
          At our pet care center, we offer a comprehensive range of services to keep your pets happy and healthy.
          From grooming and bathing to ensure their look and feel their best, to veterinary check-ups and vaccinations
          for their health and safety, we cover all your pet’s needs. We also provide specialized training programs to
          help with behavior and obedience, as well as luxurious boarding facilities for when you’re away.
          Our dedicated team is passionate about providing the highest level of care and love for your furry friends,
          treating them as if they were our own.
        </p>

        {offerCards.map(({ num, title, desc, img }, idx) => (
          <div key={idx} className={`offer-row ${idx % 2 !== 0 ? "reverse" : ""}`}>
            <div className="offer-text">
              <h3><span className="offer-number">{num}</span> {title}</h3>
              <p>{desc}</p>
            </div>
            <div className="offer-img">
              <img src={img} alt={title} />
            </div>
          </div>
        ))}
      </section>

      {/* Contact Form */}
      <section className="contact-root">
        <div className="contact-main">
          <div className="contact-left">
            <h2 className="contact-title">CONTACT WITH US <span className="paw-icon">🐾</span></h2>
            <form className="contact-form" onSubmit={handleSubmit}>
              {["fullName", "phoneNumber", "email"].map((field, idx) => (
                <input
                  key={idx}
                  type={field === "email" ? "email" : field === "phoneNumber" ? "tel" : "text"}
                  name={field}
                  placeholder={field.replace(/([A-Z])/g, " $1")}
                  value={formData[field]}
                  onChange={handleInputChange}
                  className="contact-input"
                />
              ))}
              <div className="contact-btn-group">
                <button type="submit" className="contact-submit-btn">Submit</button>
                <button type="button" className="contact-refresh-btn" onClick={handleRefresh}>Refresh</button>
              </div>
            </form>
          </div>

          <div className="contact-right">
            <div className="circle-image-wrapper">
              <div className="contact-circle"><div className="contact-circle-inner"></div></div>
              <img src={LastDog} alt="Dog and Cat" className="circle-main-image" />
            </div>
          </div>
        </div>

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
                  <li onClick={() => navigate('/discovery')}>Discovery</li>
                  <li onClick={() => navigate('/contact')}>Contact</li>
                  <li onClick={() => navigate('/shop')}>Shop</li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </section>
    </div>
  );
}

export default ServicePage;