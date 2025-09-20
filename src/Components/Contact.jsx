import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import FooterLogoImg from '../Assets/logo.png';
import LastDog from '../Assets/LastDog.png';
import Last from '../Assets/Last.png';

function Contact() {
  const [activeNavLink, setActiveNavLink] = useState('Contact');
  const navigate = useNavigate();
  
  // ADD: Cart state and session management
  const [cartCount, setCartCount] = useState(0);
  const [sessionId, setSessionId] = useState(null);
  
  // ADD: Loading state for form submission
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Contact form state
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
  });

  const navItems = ['About', 'Service', 'Discovery', 'Shop', 'Contact'];

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init("MEQHl1iUb81aIUi_j"); // Replace with your EmailJS public key
  }, []);

  // ADD: Initialize session ID and fetch cart count
  useEffect(() => {
    const initializeSession = async () => {
      let storedSessionId = localStorage.getItem('pawpicks-session-id');
      
      if (!storedSessionId) {
        try {
          const response = await fetch('http://localhost:5000/api/cart/session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
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

  // ADD: Fetch cart count
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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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

  return (
    <div className="contact-page-root" style={{ minHeight: '100vh', background: 'white', display: 'flex', flexDirection: 'column' }}>
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
          </div>
        </div>
      </header>

      {/* Main Contact Content */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Contact Section */}
        <section style={{ flex: 1, padding: '2rem 0', background: 'white' }}>
          <div className="contact-root" style={{ background: 'transparent' }}>
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
                    required
                    disabled={isSubmitting}
                  />
                  <input
                    type="tel"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="contact-input"
                    required
                    disabled={isSubmitting}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="contact-input"
                    required
                    disabled={isSubmitting}
                  />
                  <div className="contact-btn-group">
                    <button 
                      type="submit" 
                      className="contact-submit-btn"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Submit'}
                    </button>
                    <button
                      type="button"
                      className="contact-refresh-btn"
                      onClick={handleRefresh}
                      disabled={isSubmitting}
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

            {/* Footer */}
            <footer className="contact-footer" style={{ marginTop: '3rem' }}>
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
          </div>
        </section>
      </main>
    </div>
  );
}

export default Contact;