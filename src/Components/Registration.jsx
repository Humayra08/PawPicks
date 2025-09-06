// client/src/Components/Registration.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FooterLogoImg from "../Assets/logo.png";
import OrangeCat from "../Assets/OrangeCat.png";
import Last from "../Assets/Last.png";
import axios from 'axios';

const COUNTRY_CODES = [
  { code: "IN", name: "India", dial: "+91" },
  { code: "CN", name: "China", dial: "+86" },
  { code: "BD", name: "Bangladesh", dial: "+880" },
  { code: "PK", name: "Pakistan", dial: "+92" },
  { code: "ID", name: "Indonesia", dial: "+62" },
];

export default function Registration() {
  const [activeNavLink, setActiveNavLink] = useState("");
  const [headerVisible, setHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [formIn, setFormIn] = useState(false);
  const [submitting, setSubmitting] = useState(false);          // NEW
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
  };

  const goToRegister = (e) => { e.preventDefault(); navigate("/register"); };
  const goToLogin = (e) => { e.preventDefault(); navigate("/login"); };

  // form state
  const [form, setForm] = useState({
    fullname: "",
    phone: "",
    password: "",
    repassword: "",
  });

  const [dialCode, setDialCode] = useState("+880");

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    // Basic validation
    const fullName = form.fullname.trim();
    const phoneRaw = form.phone.trim();
    const password = form.password;
    const rePassword = form.repassword;

    if (!fullName || !phoneRaw || !password || !rePassword) {
      alert("Please fill all fields.");
      return;
    }
    if (password !== rePassword) {
      alert("Passwords do not match.");
      return;
    }

    // Normalize phone (remove spaces, leading zeros etc. if needed)
    const normalizedPhone = phoneRaw.replace(/\s+/g, "");
    const phoneWithCode = `${dialCode}${normalizedPhone}`;

    try {
      setSubmitting(true);

      // If you added "proxy": "http://localhost:5000" in client/package.json, use relative URL:
      // POST /api/users/register
      const { data } = await axios.post(`/api/users/register`, {
        fullName,
        phoneNumber: phoneWithCode,
        password,
        rePassword,
      });

      console.log("Registration successful:", data);
      alert("Registration successful! Please log in.");
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error?.response?.data || error.message);
      const msg =
        error?.response?.data?.message ||
        (error?.response?.status === 0 ? "Server unreachable" : "Registration failed. Please try again.");
      alert(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="registration-page">
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

            {/* Register is active on this page */}
            <button type="button" className="auth-link active" onClick={goToRegister}>
              Register /
            </button>
            <button type="button" className="auth-link" onClick={goToLogin}>
              Login
            </button>
          </div>
        </div>
      </header>

      {/* BODY */}
      <main className="register-root">
        <div className="register-container">
          <section className={`register-form-card ${formIn ? "slide-in-right" : ""}`}>
            <div className="register-head">
              <div className="register-title">REGISTER</div>
              <span className="register-paw">🐾</span>
            </div>

            <form className="register-form" onSubmit={handleSubmit}>
              {/* Full name */}
              <label className="register-label">Full name</label>
              <input
                className="register-input"
                type="text"
                name="fullname"
                placeholder="Your full name"
                value={form.fullname}
                onChange={onChange}
              />

              {/* Phone number */}
              <label className="register-label">Phone number</label>
              <div className="register-input input-with-prefix select-dial">
                <select
                  className="dial-select"
                  value={dialCode}
                  onChange={(e) => setDialCode(e.target.value)}
                  aria-label="Country dial code"
                >
                  {COUNTRY_CODES.map((c) => (
                    <option key={c.code} value={c.dial}>
                      {c.dial} {c.name}
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  name="phone"
                  placeholder="938772416"
                  value={form.phone}
                  onChange={onChange}
                />
              </div>

              {/* Passwords */}
              <label className="register-label">Password</label>
              <input
                className="register-input"
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={onChange}
              />

              <label className="register-label">Re-password</label>
              <input
                className="register-input"
                type="password"
                name="repassword"
                placeholder="Re-password"
                value={form.repassword}
                onChange={onChange}
              />

              <div className="register-stepper">
                <span className="dot active" />
                <span className="dot" />
              </div>

              <button className="register-primary-btn" type="submit" disabled={submitting}>
                {submitting ? "Submitting..." : "Submit"}
              </button>

              <div className="register-muted">
                Already have an account?{" "}
                <button type="button" className="register-link" onClick={goToLogin}>
                  Login Here
                </button>
              </div>

              <div className="register-or">
                <span className="register-or-line" />
                <span className="register-or-text">Or</span>
                <span className="register-or-line" />
              </div>

              <button type="button" className="register-social-btn">
                <span>🔍</span> <span>Sign Up With Google</span>
              </button>

              <button type="button" className="register-social-btn">
                <span>💼</span> <span>Sign Up With Linkedin</span>
              </button>
            </form>
          </section>

          <aside className="register-visual">
            <h2 className="register-right-title">
              BECOME A MEMBER TODAY<br />
              AND HELP PROTECT<br />
              ANIMALS!
            </h2>

            <div className="register-visual-center">
              <img src={OrangeCat} alt="Cute pets" className="register-hero-img" />
            </div>

            {/* Translucent info card */}
            <div className="register-benefit-card">
              <div className="benefit-title">
                Member Benefits: Exclusive Discounts, Rewards
              </div>
              <p className="benefit-text">
                <strong>Exclusive Discounts:</strong> Enjoy special pricing on pet food, toys, and accessories.
              </p>
              <p className="benefit-text">
                <strong>Early Access:</strong> Be the first to know about new products and promotions.
              </p>
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
  );
}
