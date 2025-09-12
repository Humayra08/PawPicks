import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import FooterLogoImg from '../Assets/logo.png';
import Last from '../Assets/Last.png';
import Poster from '../Assets/Poster.png';
import Frame from '../Assets/Frame.png';

import Food1 from '../Assets/Food1.png';
import Food2 from '../Assets/Food2.png';
import Food3 from '../Assets/Food3.png';
import Food4 from '../Assets/Food4.png';
import Food5 from '../Assets/Food5.png';
import Food6 from '../Assets/Food6.png';
import Food7 from '../Assets/Food7.png';
import Food8 from '../Assets/Food8.png';
import Toy1 from '../Assets/Toy1.png';
import Toy2 from '../Assets/Toy2.png';
import Toy3 from '../Assets/Toy3.png';
import Toy4 from '../Assets/Toy4.png';
import Toy5 from '../Assets/Toy5.png';
import Toy6 from '../Assets/Toy6.png';
import Toy7 from '../Assets/Toy7.png';
import Toy8 from '../Assets/Toy8.png';

function Shop() {
  const navigate = useNavigate();
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const imageMap = {
    'Food1.png': Food1,
    'Food2.png': Food2,
    'Food3.png': Food3,
    'Food4.png': Food4,
    'Food5.png': Food5,
    'Food6.png': Food6,
    'Food7.png': Food7,
    'Food8.png': Food8,
    'Toy1.png': Toy1,
    'Toy2.png': Toy2,
    'Toy3.png': Toy3,
    'Toy4.png': Toy4,
    'Toy5.png': Toy5,
    'Toy6.png': Toy6,
    'Toy7.png': Toy7,
    'Toy8.png': Toy8,
  };
  
  const getImageSrc = (imageName) => {
    return imageMap[imageName] || '/images/placeholder.png';
  };
  
  const foodProducts = useMemo(() => products.filter(p => p.type === 'food'), [products]);
  const toyProducts = useMemo(() => products.filter(p => p.type === 'toy'), [products]);

  const [favorites, setFavorites] = useState([]);
  const [activeNavLink, setActiveNavLink] = useState('Shop');
  const [cartCount, setCartCount] = useState(0);

  const navItems = ['About', 'Service', 'Discovery', 'Shop', 'Contact'];

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔄 Fetching products from API...');
      const response = await fetch('http://localhost:5000/api/products');
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      console.log('✅ API Response:', result);
      
      if (result.success && result.data) {
        setProducts(result.data);
        console.log(` Loaded ${result.data.length} products`);
        console.log(` Food products: ${result.data.filter(p => p.type === 'food').length}`);
        console.log(` Toy products: ${result.data.filter(p => p.type === 'toy').length}`);
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (err) {
      console.error('❌ Error fetching products:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      setFavorites(Array(products.length).fill(false));
    }
  }, [products.length]);

  const handleNavClick = (linkName, e) => {
    e.preventDefault();
    setActiveNavLink(linkName);
    if (linkName === 'About') navigate('/');
    else if (linkName === 'Service') navigate('/services');
    else if (linkName === 'Shop') navigate('/shop');
  };

  const goToLogin = () => navigate('/login');
  const goToRegister = () => navigate('/register');

  const handleFavClick = (idx) => {
    setFavorites(f => {
      const copy = [...f];
      copy[idx] = !copy[idx];
      return copy;
    });
  };

  const addToCart = (product) => {
    setCartCount(c => c + 1);
    console.log('Add to cart:', product.title);
  };

  const openProduct = (product) => {
    navigate(`/product/${product.slug}`);
  };

  const renderCard = (product, idx, offset = 0) => {
    const globalIndex = idx + offset;
    return (
      <div className="shop-product-card" key={product._id || product.slug}>
        <button
          className="shop-product-fav"
          aria-label="Favorite"
          onClick={() => handleFavClick(globalIndex)}
          type="button"
        >
          <span style={{
            color: favorites[globalIndex] ? '#F43F5E' : '#D1D5DB',
            fontSize: '1.4rem',
            transition: 'color .13s'
          }}>♡</span>
        </button>

        <div
          className="shop-product-img-wrap clickable"
          onClick={() => openProduct(product)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && openProduct(product)}
        >
          <img 
            src={getImageSrc(product.img)} 
            alt={product.title} 
            className="shop-product-img" 
            onError={(e) => {
              console.log(`Failed to load image: ${product.img}`);
              e.target.src = '/images/placeholder.png';
            }}
          />
        </div>

        <div className="shop-product-details">
          <div
            className="shop-product-title"
            onClick={() => openProduct(product)}
            style={{ cursor: 'pointer' }}
          >
            {product.title}
          </div>
          <div className="shop-product-meta">
            <span className="shop-product-rating">
              <span style={{ color: '#FACC15', fontSize: '1.1rem', marginRight: '3px' }}>★</span>
              {product.rating?.toFixed(1) || '0.0'}
            </span>
            <span className="shop-product-sold">{product.sold || 0} Sold</span>
          </div>
          <div className="shop-product-prices">
            <span className="shop-product-price">৳{product.price?.toFixed(2) || '0.00'}</span>
          </div>
          <div className="shop-product-actions">
            <button className="shop-product-buy" onClick={() => openProduct(product)}>View</button>
            <button
              className="shop-product-cart"
              aria-label="Add to cart"
              onClick={() => addToCart(product)}
              type="button"
            >
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
  };

  if (loading) {
    return (
      <div className="pet-care-app">
        <header className="header">
          <div className="nav-container">
            <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img src={FooterLogoImg} alt="Logo" className="navbar-logo-img" />
              <span className="navbar-logo-text">PawPicks</span>
            </div>
            <nav className="nav-menu">
              {navItems.map(item => (
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
              <button className="cart-btn" aria-label="Cart" type="button" onClick={() => navigate('/cart')}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M3 3H4.27924C4.70967 3 5.09181 3.28101 5.21799 3.69139L5.5 4.5M5.5 4.5L6.5 8.5H15.5L17 4.5H5.5ZM8 16.5C8.82843 16.5 9.5 15.8284 9.5 15C9.5 14.1716 8.82843 13.5 8 13.5C7.17157 13.5 6.5 14.1716 6.5 15C6.5 15.8284 7.17157 16.5 8 16.5ZM15 16.5C15.8284 16.5 16.5 15.8284 16.5 15C16.5 14.1716 15.8284 13.5 15 13.5C14.1716 13.5 14.5 14.1716 14.5 15C14.5 15.8284 14.1716 16.5 15 16.5Z" stroke="#9CA3AF" strokeWidth="1.5" fill="none" />
                </svg>
                {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
              </button>
              <button type="button" className="auth-link" onClick={goToRegister} style={{ background: 'none', border: 0, padding: 0, cursor: 'pointer' }}>
                Register /
              </button>
              <button type="button" className="auth-link" onClick={goToLogin} style={{ background: 'none', border: 0, padding: 0, cursor: 'pointer' }}>
                Login
              </button>
            </div>
          </div>
        </header>

        <main className="main" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🐾</div>
            <div style={{ fontSize: '1.2rem', color: '#666' }}>Loading PawPicks products...</div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pet-care-app">
        <header className="header">
          <div className="nav-container">
            <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img src={FooterLogoImg} alt="Logo" className="navbar-logo-img" />
              <span className="navbar-logo-text">PawPicks</span>
            </div>
            <nav className="nav-menu">
              {navItems.map(item => (
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
              <button className="cart-btn" aria-label="Cart" type="button" onClick={() => navigate('/cart')}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M3 3H4.27924C4.70967 3 5.09181 3.28101 5.21799 3.69139L5.5 4.5M5.5 4.5L6.5 8.5H15.5L17 4.5H5.5ZM8 16.5C8.82843 16.5 9.5 15.8284 9.5 15C9.5 14.1716 8.82843 13.5 8 13.5C7.17157 13.5 6.5 14.1716 6.5 15C6.5 15.8284 7.17157 16.5 8 16.5ZM15 16.5C15.8284 16.5 16.5 15.8284 16.5 15C16.5 14.1716 15.8284 13.5 15 13.5C14.1716 13.5 14.5 14.1716 14.5 15C14.5 15.8284 14.1716 16.5 15 16.5Z" stroke="#9CA3AF" strokeWidth="1.5" fill="none" />
                </svg>
                {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
              </button>
              <button type="button" className="auth-link" onClick={goToRegister} style={{ background: 'none', border: 0, padding: 0, cursor: 'pointer' }}>
                Register /
              </button>
              <button type="button" className="auth-link" onClick={goToLogin} style={{ background: 'none', border: 0, padding: 0, cursor: 'pointer' }}>
                Login
              </button>
            </div>
          </div>
        </header>

        <main className="main" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>❌</div>
            <div style={{ fontSize: '1.2rem', color: '#dc2626', marginBottom: '1rem' }}>
              Failed to load products
            </div>
            <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
              {error}
            </div>
            <button 
              onClick={fetchProducts}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#421F72',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Try Again
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="pet-care-app">
      <header className="header">
        <div className="nav-container">
          <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src={FooterLogoImg} alt="Logo" className="navbar-logo-img" />
            <span className="navbar-logo-text">PawPicks</span>
          </div>
          <nav className="nav-menu">
            {navItems.map(item => (
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
            <button className="cart-btn" aria-label="Cart" type="button" onClick={() => navigate('/cart')}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M3 3H4.27924C4.70967 3 5.09181 3.28101 5.21799 3.69139L5.5 4.5M5.5 4.5L6.5 8.5H15.5L17 4.5H5.5ZM8 16.5C8.82843 16.5 9.5 15.8284 9.5 15C9.5 14.1716 8.82843 13.5 8 13.5C7.17157 13.5 6.5 14.1716 6.5 15C6.5 15.8284 7.17157 16.5 8 16.5ZM15 16.5C15.8284 16.5 16.5 15.8284 16.5 15C16.5 14.1716 15.8284 13.5 15 13.5C14.1716 13.5 14.5 14.1716 14.5 15C14.5 15.8284 14.1716 16.5 15 16.5Z" stroke="#9CA3AF" strokeWidth="1.5" fill="none" />
              </svg>
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </button>
            <button type="button" className="auth-link" onClick={goToRegister} style={{ background: 'none', border: 0, padding: 0, cursor: 'pointer' }}>
              Register /
            </button>
            <button type="button" className="auth-link" onClick={goToLogin} style={{ background: 'none', border: 0, padding: 0, cursor: 'pointer' }}>
              Login
            </button>
          </div>
        </div>
      </header>

      <main className="main">
        <section className="shop-poster-section">
          <div className="shop-nutrition">
            <h2 className="shop-nutrition-title">
              TAILORED NUTRITION <span className="shop-nutrition-paw" role="img" aria-label="paw">🐾</span>
            </h2>
            <p className="shop-nutrition-subtitle">FOR YOUR PET'S HEALTH</p>
            <div className="shop-nutrition-cards">
              <div className="shop-nutrition-card">
                <div className="shop-nutrition-icon" role="img" aria-label="bone">🦴</div>
                <div className="shop-nutrition-label">Nutrition And Health</div>
                <div className="shop-nutrition-desc">Proper nutrition supports growth, energy, and well-being.</div>
              </div>
              <div className="shop-nutrition-card">
                <div className="shop-nutrition-icon" role="img" aria-label="salad">🥗</div>
                <div className="shop-nutrition-label">Custom Diets</div>
                <div className="shop-nutrition-desc">Tailoring diet ensures essential nutrients.</div>
              </div>
              <div className="shop-nutrition-card">
                <div className="shop-nutrition-icon" role="img" aria-label="stethoscope">🩺</div>
                <div className="shop-nutrition-label">Expert Guidance</div>
                <div className="shop-nutrition-desc">Professional advice keeps pets thriving.</div>
              </div>
            </div>
          </div>

          <div className="shop-poster-main-wrap">
            <img src={Poster} alt="Pet nutrition poster" className="shop-poster-main" style={{ height: "540px" }} />
          </div>

          <section className="shop-products-section" id="food">
            <h2 className="shop-products-title center">
              PET FOOD <span className="shop-products-paw" role="img" aria-label="paw">🐾</span>
            </h2>
            <div className="shop-products-grid">
              {foodProducts.length > 0 ? (
                foodProducts.map((p, i) => renderCard(p, i))
              ) : (
                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem' }}>
                  <div style={{ fontSize: '1.1rem', color: '#666' }}>No food products available</div>
                </div>
              )}
            </div>
            <div className="shop-products-frame">
              <img src={Frame} alt="Frame" className="shop-frame-img" />
            </div>
          </section>

          <section className="shop-products-section" id="toy">
            <h2 className="shop-products-title center" style={{ marginTop: 42 }}>
              PET TOY <span className="shop-products-paw" role="img" aria-label="paw">🐾</span>
            </h2>
            <div className="shop-products-grid">
              {toyProducts.length > 0 ? (
                toyProducts.map((p, i) => renderCard(p, i, foodProducts.length))
              ) : (
                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem' }}>
                  <div style={{ fontSize: '1.1rem', color: '#666' }}>No toy products available</div>
                </div>
              )}
            </div>
          </section>
        </section>
      </main>

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
              <img src={Last} alt="Happy Pet" className="footer-dog-img" />
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

export default Shop;