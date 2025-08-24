import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FooterLogoImg from '../Assets/logo.png';
import Last from '../Assets/Last.png';
import Poster from '../Assets/Poster.png';
import PosterBack from '../Assets/PosterBack.png';
import Food1 from '../Assets/Food1.png';
import Food2 from '../Assets/Food2.png';
import Food3 from '../Assets/Food3.png';
import Food4 from '../Assets/Food4.png';
import Food5 from '../Assets/Food5.png';
import Food6 from '../Assets/Food6.png';
import Food7 from '../Assets/Food7.png';
import Food8 from '../Assets/Food8.png';
import Frame from '../Assets/Frame.png';
import Toy1 from '../Assets/Toy1.png';
import Toy2 from '../Assets/Toy2.png';
import Toy3 from '../Assets/Toy3.png';
import Toy4 from '../Assets/Toy4.png';
import Toy5 from '../Assets/Toy5.png';
import Toy6 from '../Assets/Toy6.png';
import Toy7 from '../Assets/Toy7.png';
import Toy8 from '../Assets/Toy8.png';

const products = [
  {
    img: Food1,
    title: "FILLET ‘O’ LAKES - KIT CAT",
    rating: 5.0,
    sold: "1000+ Sold",
    price: "$100.00",
    highlight: true,
  },
  {
    img: Food2,
    title: "ENCORE - CAT FOOD",
    rating: 4.0,
    sold: "329 Sold",
    price: "$400.00",
    highlight: true,
  },
  {
    img: Food3,
    title: "ROYAL CANIN - CARE DIGEST",
    rating: 4.5,
    sold: "900 Sold",
    price: "$600.00",
    highlight: true,
  },
  {
    img: Food4,
    title: "WELLNESS - SIGNATURE...",
    rating: 3.0,
    sold: "12 Sold",
    price: "$200.00",
    highlight: true,
  },
  {
    img: Food5,
    title: "FRISKIES WITH CHICKEN...",
    rating: 5.0,
    sold: "1000+ Sold",
    price: "$400.00",
    highlight: true,
  },
  {
    img: Food6,
    title: "THÉRIE - THE FINESIT SE...",
    rating: 4.0,
    sold: "329 Sold",
    price: "$550.00",
    highlight: true,
  },
  {
    img: Food7,
    title: "NORTH PAW - GAIN FREE",
    rating: 4.5,
    sold: "900 Sold",
    price: "$140.00",
    highlight: true,
  },
  {
    img: Food8,
    title: "PEDIGREE - DOG FOOD",
    rating: 3.0,
    sold: "12 Sold",
    price: "$200.00",
    highlight: true,
  },
];

const toys = [
  {
    img: Toy1,
    title: "DOG TOYS TO MOUTH",
    rating: 5.0,
    sold: "1000+ Sold",
    price: "$320.00",
    highlight: true,
  },
  {
    img: Toy2,
    title: "BASKETBALL AND FOOTBALL TOY",
    rating: 4.0,
    sold: "329 Sold",
    price: "$300.00",
    highlight: true,
  },
  {
    img: Toy3,
    title: "BONE SHAPED PET TOYS",
    rating: 4.5,
    sold: "900 Sold",
    price: "$700.00",
    highlight: true,
  },
  {
    img: Toy4,
    title: "BALL FOR DOG",
    rating: 3.0,
    sold: "12 Sold",
    price: "$300.00",
    highlight: true,
  },
  {
    img: Toy5,
    title: "TAMAGOTCHI TOY DIGITAL",
    rating: 5.0,
    sold: "1000+ Sold",
    price: "$600.00",
    highlight: true,
  },
  {
    img: Toy6,
    title: "STUFFED ANIMALS & CUTE PET TOYS",
    rating: 4.0,
    sold: "329 Sold",
    price: "$700.00",
    highlight: true,
  },
  {
    img: Toy7,
    title: "MOSCOW AMAZON.COM TOY",
    rating: 4.5,
    sold: "900 Sold",
    price: "$800.00",
    highlight: true,
  },
  {
    img: Toy8,
    title: "DOG TOYS RAWHIDE PET TOY",
    rating: 3.0,
    sold: "12 Sold",
    price: "$190.00",
    highlight: true,
  },
];

function Shop() {
  const [activeNavLink, setActiveNavLink] = useState('Shop');
  // combine favorites for both food and toy sections
  const [favorites, setFavorites] = useState(
    Array(products.length + toys.length).fill(false)
  );
  const navigate = useNavigate();

  const navItems = ['About', 'Service', 'Discovery', 'Shop', 'Contact'];

  const handleNavClick = (linkName, e) => {
    e.preventDefault();
    setActiveNavLink(linkName);
    if (linkName === "About") navigate("/");
    else if (linkName === "Service") navigate("/services");
    else if (linkName === "Shop") navigate("/shop");
  };

  const goToLogin = (e) => { e?.preventDefault?.(); navigate('/login'); };
  const goToRegister = (e) => { e?.preventDefault?.(); navigate('/register'); };

  const handleFavClick = idx => {
    setFavorites(favs => {
      const updated = [...favs];
      updated[idx] = !updated[idx];
      return updated;
    });
  };

  const renderProductCard = (product, idx, offset = 0) => (
    <div className="shop-product-card" key={product.title}>
      <button
        className="shop-product-fav"
        aria-label="Favorite"
        onClick={() => handleFavClick(idx + offset)}
        type="button"
      >
        <span style={{
          color: favorites[idx + offset] ? '#F43F5E' : '#D1D5DB',
          fontSize: '1.4rem',
          transition: 'color .13s'
        }}>♡</span>
      </button>
      <div className="shop-product-img-wrap">
        <img src={product.img} alt={product.title} className="shop-product-img" />
      </div>
      <div className={`shop-product-details${product.highlight ? " highlight" : ""}`}>
        <div className="shop-product-title">{product.title}</div>
        <div className="shop-product-meta">
          <span className="shop-product-rating">
            <span style={{ color: '#FACC15', fontSize: '1.1rem', marginRight: '3px' }}>★</span>
            {product.rating}
          </span>
          <span className="shop-product-sold">{product.sold}</span>
        </div>
        <div className="shop-product-prices">
          <span className="shop-product-price">{product.price}</span>
        </div>
        <div className="shop-product-actions">
          <button className="shop-product-buy">Buy Now</button>
          <button className="shop-product-cart" aria-label="Add to cart">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M6 6h15l-1.5 9h-13z" stroke="#421F72" strokeWidth="1.5" fill="none"/>
              <circle cx="9" cy="20" r="1" fill="#421F72"/>
              <circle cx="18" cy="20" r="1" fill="#421F72"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="pet-care-app">
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
            <button className="notification-btn" aria-label="Notifications" />
            <button className="cart-btn" aria-label="Cart" />
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

      {/* SHOP PAGE POSTER DESIGN */}
      <main className="main">
        <section className="shop-poster-section">
          {/* Nutrition Section */}
          <div className="shop-nutrition">
            <h2 className="shop-nutrition-title">
              TAILORED NUTRITION <span className="shop-nutrition-paw">🐾</span>
            </h2>
            <p className="shop-nutrition-subtitle">
              FOR YOUR PET'S HEALTH
            </p>
            <div className="shop-nutrition-cards">
              <div className="shop-nutrition-card">
                <div className="shop-nutrition-icon">🦴</div>
                <div className="shop-nutrition-label">Nutrition And Health</div>
                <div className="shop-nutrition-desc">
                  Proper nutrition is key to your pet’s health, supporting growth, energy, and overall well-being.
                </div>
              </div>
              <div className="shop-nutrition-card">
                <div className="shop-nutrition-icon">🥗</div>
                <div className="shop-nutrition-label">Custom Diets</div>
                <div className="shop-nutrition-desc">
                  Each pet has unique dietary needs. Tailoring their diet ensures they get essential nutrients.
                </div>
              </div>
              <div className="shop-nutrition-card">
                <div className="shop-nutrition-icon">🩺</div>
                <div className="shop-nutrition-label">Expert Guidance</div>
                <div className="shop-nutrition-desc">
                  Professional advice is crucial for managing your pet’s diet, ensuring they stay healthy and thrive.
                </div>
              </div>
            </div>
          </div>
          {/* Poster Main Image */}
          <div className="shop-poster-main-wrap">
            <img src={Poster} alt="Poster" className="shop-poster-main" />
            <div className="shop-poster-pets-wrap">
              <img src={PosterBack} alt="Pets Poster" className="shop-poster-pets" />
            </div>
          </div>

          {/* --- PET FOOD GRID --- */}
          <section className="shop-products-section">
            <h2 className="shop-products-title center">
              PET FOOD <span className="shop-products-paw">🐾</span>
            </h2>
            <div className="shop-products-grid">
              {products.map((product, idx) => renderProductCard(product, idx))}
            </div>
            <div className="shop-products-frame">
              <img src={Frame} alt="Frame" className="shop-frame-img" />
            </div>
          </section>

          {/* --- PET TOY GRID --- */}
          <section className="shop-products-section">
            <h2 className="shop-products-title center" style={{ marginTop: '42px' }}>
              PET TOY <span className="shop-products-paw">🐾</span>
            </h2>
            <div className="shop-products-grid">
              {toys.map((toy, idx) => renderProductCard(toy, idx, products.length))}
            </div>
          </section>
        </section>
      </main>

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

export default Shop;