import React, { useState } from 'react';
import doctorImg from "../Assets/doctor.png";
import doggosImg from "../Assets/doggos.png";
import dogImg from "../Assets/dog.png";
import doggoImg from "../Assets/doggo.png";
import doggyImg from "../Assets/doggy.png";
import FooterLogoImg from '../Assets/logo.png';
import LastDog from '../Assets/LastDog.png';
import Last from '../Assets/Last.png';

import img1 from "../Assets/1.png";
import img2 from "../Assets/2.png";
import img3 from "../Assets/3.png";
import img4 from "../Assets/4.png";
import img5 from "../Assets/5.png";
import img6 from "../Assets/6.png";

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
      {/* --- Service Section --- */}
      <div className="service-main">
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

        <div className="service-cards-row">
          <div className="service-card">
            <div className="service-card-title">Physical checkup your pet</div>
            <div className="service-card-desc">
              Regular physical checkups are essential for your pet’s health.
            </div>
            <button className="service-card-btn">Read More</button>
            <img src={dogImg} alt="German Shepherd" className="service-card-img" />
          </div>
          <div className="service-card">
            <div className="service-card-title">Spa</div>
            <div className="service-card-desc">
              Our pet spa offers a luxurious and relaxing experience for your furry friends. We provide a range of spa treatments.
            </div>
            <button className="service-card-btn">Read More</button>
            <img src={doggoImg} alt="Beagle" className="service-card-img" />
          </div>
          <div className="service-card">
            <div className="service-card-title">Environmental Consulting</div>
            <div className="service-card-desc">
              Environmental consulting involves advice for creating a healthy environment for your pets.
            </div>
            <button className="service-card-btn">Read More</button>
            <img src={doggyImg} alt="Consulting Dog" className="service-card-img" />
          </div>
        </div>
      </div>
      {/* --- WHAT WE OFFER Section --- */}
      <section className="offer-root">
        <h2 className="offer-title">
          WHAT WE OFFER <span className="paw-icon">🐾</span>
        </h2>
        <p className="offer-desc">
          At our pet care center, we offer a comprehensive range of services to keep your pets happy and healthy. 
          From grooming and bathing to ensure their look and feel their best, to veterinary check-ups and vaccinations 
          for their health and safety, we cover all your pet’s needs. We also provide specialized training programs to 
          help with behavior and obedience, as well as luxurious boarding facilities for when you’re away. 
          Our dedicated team is passionate about providing the highest level of care and love for your furry friends, 
          treating them as if they were our own.
        </p>

        {/* --- Service Rows --- */}
        <div className="offer-row">
          <div className="offer-text">
            <h3><span className="offer-number">1</span> Group Training</h3>
            <p>Our Group Training sessions help dogs learn commands in a social setting. 
               These classes teach obedience and good manners, while allowing pets and owners to connect.</p>
          </div>
          <div className="offer-img">
            <img src={img1} alt="Group Training" />
          </div>
        </div>

        <div className="offer-row reverse">
          <div className="offer-text">
            <h3><span className="offer-number">2</span> Puppy Training</h3>
            <p>Our Puppy Training classes focus on foundational skills like potty training and basic commands. 
               It’s crucial for developing well-behaved dogs and provides support for new owners.</p>
          </div>
          <div className="offer-img">
            <img src={img2} alt="Puppy Training" />
          </div>
        </div>

        <div className="offer-row">
          <div className="offer-text">
            <h3><span className="offer-number">3</span> Private Training</h3>
            <p>One-on-one attention with customized training plans tailored to your pet’s needs. 
               Perfect for pets requiring focused guidance and special care.</p>
          </div>
          <div className="offer-img">
            <img src={img3} alt="Private Training" />
          </div>
        </div>

        <div className="offer-row reverse">
          <div className="offer-text">
            <h3><span className="offer-number">4</span> Specialty Program</h3>
            <p>Unique programs designed for specific pet needs, from agility training to behavior correction, 
               ensuring pets grow with confidence and balance.</p>
          </div>
          <div className="offer-img">
            <img src={img4} alt="Specialty Program" />
          </div>
        </div>

        <div className="offer-row">
          <div className="offer-text">
            <h3><span className="offer-number">5</span> Virtual Training</h3>
            <p>Train your pet remotely with expert guidance. 
               Convenient, effective, and tailored for pet owners who want flexibility without losing quality.</p>
          </div>
          <div className="offer-img">
            <img src={img5} alt="Virtual Training" />
          </div>
        </div>

        <div className="offer-row reverse">
          <div className="offer-text">
            <h3><span className="offer-number">6</span> Security Program</h3>
            <p>Professional training programs focused on protection and safety, 
               ensuring your pet is disciplined and ready to safeguard your home and loved ones.</p>
          </div>
          <div className="offer-img">
            <img src={img6} alt="Security Program" />
          </div>
        </div>
      </section>


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
        </div>
      </section>
    </div>
  );
}

export default ServicePage;
