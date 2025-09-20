import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'; 
import FooterLogoImg from "../Assets/logo.png";
import FirstDog from "../Assets/FirstDog.png";
import avatar1 from "../Assets/avatar1.png";
import avatar2 from "../Assets/avatar2.png";
import avatar3 from "../Assets/avatar3.png";
import Last from "../Assets/Last.png";

export default function Login() {
  const [activeNavLink, setActiveNavLink] = useState("");
  const [headerVisible, setHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [formIn, setFormIn] = useState(false);

  const navigate = useNavigate();
  const navItems = ["About", "Service", "Discovery", "Shop", "Contact"];

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setHeaderVisible(!(y > lastScrollY && y > 100));
      setLastScrollY(y);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const id = requestAnimationFrame(() => setFormIn(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const handleNavClick = (linkName, e) => {
    e.preventDefault();
    setActiveNavLink(linkName);
     if (linkName === "About") navigate("/");
    else if (linkName === "Service") navigate("/services");
    else if (linkName === "Shop") navigate("/shop");
    else if (linkName === "Contact") navigate("/contact");
    else if (linkName === "Discovery") navigate("/discovery");
  };

  const goToRegister = (e) => { e.preventDefault(); navigate("/register"); };
  const goToLogin = (e) => { e.preventDefault(); navigate("/login"); };

  const [form, setForm] = useState({
    fullname: "",
    password: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // If you added "proxy" in client/package.json, this relative URL avoids CORS
      const { data } = await axios.post(`/api/users/login`, {
        fullName: form.fullname,   // backend expects "fullName"
        password: form.password,
      });

      // Save JWT + basic user info to localStorage
      localStorage.setItem("jwt", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          _id: data._id,
          fullName: data.fullName,
          phoneNumber: data.phoneNumber || "",
          email: data.email || "",
          avatarUrl: data.avatarUrl || "",
        })
      );

      // Set default Authorization header for future axios requests
      axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

      // Go to Profile after successful login
      navigate("/profile");
    } catch (error) {
      console.error("Login failed:", error?.response?.data || error.message);
      alert(error?.response?.data?.message || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login-page">
      {/* NAVBAR */}
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

            <button type="button" className="auth-link" onClick={goToRegister}>
              Register /
            </button>
            <button type="button" className="auth-link active" onClick={goToLogin}>
              Login
            </button>
          </div>
        </div>
      </header>

      {/* BODY: two columns */}
      <main className="login-root">
        <div className="login-container">
          {/* LEFT: form card — slides from left to right on mount */}
          <section className={`login-form-card ${formIn ? "slide-in-right" : ""}`}>
            <div className="login-head">
              <div>
                <div className="login-title-line1">WELCOME TO</div>
                <div className="login-title-line2">PET PARADISE</div>
              </div>
              <span className="login-paw">🐾</span>
            </div>

            <p className="login-desc">
              We offer expert pet training, high-quality food, and everything
              your pet needs to stay happy and healthy.
            </p>

            <form className="login-form" onSubmit={handleSubmit}>
              <label className="login-label">Full Name</label>
              <input
                className="login-input"
                type="text"
                name="fullname"
                placeholder="Nguyen Thien Phu"
                value={form.fullname}
                onChange={onChange}
              />

              <label className="login-label">Password</label>
              <input
                className="login-input"
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={onChange}
              />

              <button className="login-primary-btn" type="submit">
                Log In
              </button>

              <div className="login-muted">
                Don’t have an account?
                <button type="button" className="login-link" onClick={goToRegister}>
                  Register here
                </button>
              </div>
            </form>
          </section>

          {/* RIGHT: teal box + dog + community card */}
          <aside className="login-visual center-dog">
            <h2 className="login-right-title">
              HEALTHY PETS BRING JOY<br />AND ENRICH YOUR LIFE.
            </h2>

            <img src={FirstDog} alt="Puppy" className="login-dog" />

            <div className="login-community-card">
              <div className="community-content">
                <div className="community-text">
                  <div className="community-title">
                    Join Our Online Pet Care & Protection Community
                  </div>
                  <p className="community-desc">
                    Join our online animal protection community today and share your knowledge and
                    experience to help care for and protect pets everywhere!
                  </p>

                  <div className="community-badge-row">
                    <div className="community-avatars">
                      <img className="community-avatar" src={avatar1} alt="member 1" />
                      <img className="community-avatar" src={avatar2} alt="member 2" />
                      <img className="community-avatar" src={avatar3} alt="member 3" />
                    </div>
                    <div className="community-badge-text">
                      <div className="community-badge-title">
                        JOIN WITH 100K+<br />PEOPLES ON THE WORLD !
                      </div>
                      <div className="community-badge-caption">
                        Let meet some new friend on community
                      </div>
                    </div>
                  </div>
                </div>

                <button type="button" className="community-cta">Join Now</button>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <footer className="contact-footer">
        <div className="contact-footer-left">
          <div className="footer-logo">
            <img src={FooterLogoImg} alt="Footer Logo" className="footer-logo-img" />
          </div>
          <div className="footer-desc">
            Welcome to Cuddle & Care Pets! We provide quality pet products,
            grooming, and care advice for your furry friends.
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
  );
}
