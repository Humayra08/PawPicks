import React, { useState } from 'react';
import doctorImg from "../Assets/doctor.png";
import doggosImg from "../Assets/doggos.png";
import dogImg from "../Assets/dog.png";
import doggoImg from "../Assets/doggo.png";
import doggyImg from "../Assets/doggy.png";
import FooterLogoImg from '../Assets/logo.png';
import LastDog from '../Assets/LastDog.png';
import Last from '../Assets/Last.png';
import '../ServicePage.css';

function ServicePage() {
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
    <div className="service-page">
      <div className="service-main">
        {/* --- Original Service Hero Section --- */}
        <div className="service-hero-row">
          <div className="service-hero-left">
            <div className="service-title-left">LOVE AND ATTENTION</div>
            <div className="service-title-green-left">FOR YOUR FURRY FRIENDS</div>
            <div className="service-desc-left">
              Welcome to our pet care service,<br />
              where your pets receive top-notch care and endless love
            </div>
          </div>
          <div className="service-hero-right">
            <div className="service-circles-bg">
              <svg viewBox="0 0 600 400" width="600" height="400">
                <circle cx="370" cy="220" r="160" stroke="#CBAFF9" strokeWidth="8" fill="none" />
                <circle cx="370" cy="220" r="110" stroke="#EAD8FC" strokeWidth="5" fill="none" />
                <circle cx="370" cy="220" r="60" stroke="#EAD8FC" strokeWidth="3" fill="none" />
              </svg>
            </div>
            <img
              src={doggosImg}
              alt="Group of Dogs and Cats"
              className="service-doggos-img-right"
            />
            <div className="doctor-card-middle-right">
              <img src={doctorImg} alt="Doctor Jane" className="doctor-pic" />
              <div className="doctor-info">
                <span className="doctor-name">dr.Jane</span>
                <span className="doctor-rating">1k+ ★</span>
              </div>
            </div>
          </div>
        </div>

        {/* --- Contact Section --- */}
        <section className="contact-root">
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

          {/* --- Footer --- */}
          <div className="contact-footer">
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
                  <img
                    src={Last}
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
        </section>
      </div>
    </div>
  );
}

export default ServicePage;
