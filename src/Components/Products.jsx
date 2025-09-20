import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import FooterLogoImg from '../Assets/logo.png';
import Last from '../Assets/Last.png';
import Poster from '../Assets/Poster.png';

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

function Products() {
  const { slug } = useParams(); 
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [activeNavLink, setActiveNavLink] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [detailTab, setDetailTab] = useState('description');

 
  const [cartCount, setCartCount] = useState(0);
  const [sessionId, setSessionId] = useState(null);

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

  const fetchProduct = async (productId) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log(`🔄 Fetching product with ID: ${productId}`);
      
      const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Product not found');
        }
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      console.log('Product API Response:', result);
      
      if (result.success && result.data) {
        setProduct(result.data);
        console.log(`Loaded product: ${result.data.title}`);
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (err) {
      console.error(' Error fetching product:', err);
      setError(err.message);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slug) {
      fetchProduct(slug);
    }
  }, [slug]);

  useEffect(() => {
    if (product) {
      setSelectedColor(product.defaultColor || product.colors?.[0] || '');
      setQuantity(1);
      setDetailTab('description');
    }
  }, [product]);

  const navItems = ['About', 'Service', 'Discovery', 'Shop', 'Contact'];

  const handleNavClick = (link, e) => {
    e.preventDefault();
    setActiveNavLink(link);
     if (link === "About") navigate("/");
    else if (link === "Service") navigate("/services");
    else if (link === "Shop") navigate("/shop");
    else if (link === "Contact") navigate("/contact");
    else if (link === "Discovery") navigate("/discovery");
  };

  const addToCart = async () => {
    if (!product || !sessionId) {
      console.error('No product or session ID available');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          productId: product._id,
          quantity: quantity,
          selectedColor: selectedColor,
          selectedVariant: product.defaultVariant || ''
        })
      });

      const result = await response.json();
      
      if (response.ok) {
        console.log('Added to cart:', product.title);
        setCartCount(result.data.totalItems);
        
        const button = document.querySelector('.add-cart-btn');
        if (button) {
          const originalHTML = button.innerHTML;
          button.innerHTML = '<span style="color: #10B981;">✓</span>';
          button.style.backgroundColor = '#D1FAE5';
          setTimeout(() => {
            button.innerHTML = originalHTML;
            button.style.backgroundColor = '';
          }, 1000);
        }
      } else {
        console.error('Failed to add to cart:', result.message);
        alert(`Failed to add to cart: ${result.message}`);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add item to cart. Please try again.');
    }
  };

  const buyNow = async () => {
    if (!product) return;
    
    await addToCart();
    
    setTimeout(() => {
      navigate('/cart');
    }, 500);
  };

  const priceFormatted = product ? `৳${product.price?.toFixed(2) || '0.00'}` : '';

  if (loading) {
    return (
      <div className="product-page-root">
        <header className="header">
          <div className="nav-container">
            <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
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
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 2C10.5523 2 11 2.44772 11 3V4.1C13.2822 4.56329 15 6.58104 15 9V12.382L16.553 14.894C16.8056 15.2485 16.5437 15.75 16.118 15.75H3.882C3.456 15.75 3.194 15.248 3.447 14.894L5 12.382V9C5 6.581 6.718 4.563 9 4.1V3C9 2.448 9.448 2 10 2Z" fill="#9CA3AF" />
                  <path d="M7.5 17.25C7.5 18.493 8.507 19.5 10 19.5C11.493 19.5 12.5 18.493 12.5 17.25H7.5Z" fill="#9CA3AF" />
                </svg>
              </button>
              <button className="cart-btn" aria-label="Cart" type="button" onClick={() => navigate('/cart')} style={{ position: 'relative' }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M3 3H4.279C4.71 3 5.092 3.281 5.218 3.691L5.5 4.5M5.5 4.5L6.5 8.5H15.5L17 4.5H5.5ZM8 16.5C8.828 16.5 9.5 15.828 9.5 15C9.5 14.172 8.828 13.5 8 13.5C7.172 13.5 6.5 14.172 6.5 15C6.5 15.828 7.172 16.5 8 16.5ZM15 16.5C15.828 16.5 16.5 15.828 16.5 15C16.5 14.172 15.828 13.5 15 13.5C14.172 13.5 14.5 14.172 14.5 15C14.5 15.828 14.172 16.5 15 16.5Z" stroke="#9CA3AF" strokeWidth="1.5" fill="none" />
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
            </div>
          </div>
        </header>

        <div className="product-hero-poster">
          <img src={Poster} alt="Poster" className="product-hero-main" style={{ height: "540px" }} />
        </div>

        <main className="product-detail-wrapper" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🐾</div>
            <div style={{ fontSize: '1.2rem', color: '#666' }}>Loading product details...</div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-page-root">
        <header className="header">
          <div className="nav-container">
            <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
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
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 2C10.5523 2 11 2.44772 11 3V4.1C13.2822 4.56329 15 6.58104 15 9V12.382L16.553 14.894C16.8056 15.2485 16.5437 15.75 16.118 15.75H3.882C3.456 15.75 3.194 15.248 3.447 14.894L5 12.382V9C5 6.581 6.718 4.563 9 4.1V3C9 2.448 9.448 2 10 2Z" fill="#9CA3AF" />
                  <path d="M7.5 17.25C7.5 18.493 8.507 19.5 10 19.5C11.493 19.5 12.5 18.493 12.5 17.25H7.5Z" fill="#9CA3AF" />
                </svg>
              </button>
              <button className="cart-btn" aria-label="Cart" type="button" onClick={() => navigate('/cart')} style={{ position: 'relative' }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M3 3H4.279C4.71 3 5.092 3.281 5.218 3.691L5.5 4.5M5.5 4.5L6.5 8.5H15.5L17 4.5H5.5ZM8 16.5C8.828 16.5 9.5 15.828 9.5 15C9.5 14.172 8.828 13.5 8 13.5C7.172 13.5 6.5 14.172 6.5 15C6.5 15.828 7.172 16.5 8 16.5ZM15 16.5C15.828 16.5 16.5 15.828 16.5 15C16.5 14.172 15.828 13.5 15 13.5C14.172 13.5 14.5 14.172 14.5 15C14.5 15.828 14.172 16.5 15 16.5Z" stroke="#9CA3AF" strokeWidth="1.5" fill="none" />
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
            </div>
          </div>
        </header>

        <div className="product-hero-poster">
          <img src={Poster} alt="Poster" className="product-hero-main" style={{ height: "540px" }} />
        </div>

        <main className="product-detail-wrapper">
          <div className="product-breadcrumb">
            <span className="crumb-link" onClick={() => navigate('/shop')}>Shop</span>
            <span className="crumb-sep">›</span>
            <span className="crumb-current">Error</span>
          </div>

          <div style={{ padding: '40px 0 120px', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>❌</div>
            <h2 style={{ color: '#dc2626', marginBottom: '1rem' }}>Failed to load product</h2>
            <p style={{ color: '#6B7280', marginBottom: '1.5rem' }}>{error}</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button
                onClick={() => fetchProduct(slug)}
                style={{
                  background: '#421F72', color: '#fff', border: 'none',
                  padding: '12px 22px', borderRadius: 6, cursor: 'pointer'
                }}
              >
                Try Again
              </button>
              <button
                onClick={() => navigate('/shop')}
                style={{
                  background: '#6B7280', color: '#fff', border: 'none',
                  padding: '12px 22px', borderRadius: 6, cursor: 'pointer'
                }}
              >
                Back to Shop
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="product-page-root">
      <header className="header">
        <div className="nav-container">
          <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
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
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2C10.5523 2 11 2.44772 11 3V4.1C13.2822 4.56329 15 6.58104 15 9V12.382L16.553 14.894C16.8056 15.2485 16.5437 15.75 16.118 15.75H3.882C3.456 15.75 3.194 15.248 3.447 14.894L5 12.382V9C5 6.581 6.718 4.563 9 4.1V3C9 2.448 9.448 2 10 2Z" fill="#9CA3AF" />
                <path d="M7.5 17.25C7.5 18.493 8.507 19.5 10 19.5C11.493 19.5 12.5 18.493 12.5 17.25H7.5Z" fill="#9CA3AF" />
              </svg>
            </button>
            <button className="cart-btn" aria-label="Cart" type="button" onClick={() => navigate('/cart')} style={{ position: 'relative' }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M3 3H4.279C4.71 3 5.092 3.281 5.218 3.691L5.5 4.5M5.5 4.5L6.5 8.5H15.5L17 4.5H5.5ZM8 16.5C8.828 16.5 9.5 15.828 9.5 15C9.5 14.172 8.828 13.5 8 13.5C7.172 13.5 6.5 14.172 6.5 15C6.5 15.828 7.172 16.5 8 16.5ZM15 16.5C15.828 16.5 16.5 15.828 16.5 15C16.5 14.172 15.828 13.5 15 13.5C14.172 13.5 14.5 14.172 14.5 15C14.5 15.828 14.172 16.5 15 16.5Z" stroke="#9CA3AF" strokeWidth="1.5" fill="none" />
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
          </div>
        </div>
      </header>

      <div className="product-hero-poster">
        <img src={Poster} alt="Poster" className="product-hero-main" style={{ height: "540px" }} />
      </div>

      <main className="product-detail-wrapper">
        <div className="product-breadcrumb">
          <span className="crumb-link" onClick={() => navigate('/shop')}>Shop</span>
          <span className="crumb-sep">›</span>
          <span
            className="crumb-link"
            onClick={() => navigate('/shop#' + (product.type === 'food' ? 'food' : 'toy'))}
          >
            {product.category}
          </span>
          <span className="crumb-sep">›</span>
          <span className="crumb-current">{product.title}</span>
        </div>

        <div className="product-top-grid">
          <div className="product-image-box">
            <img 
              src={getImageSrc(product.img)} 
              alt={product.title} 
              className="product-image-main"
              onError={(e) => {
                console.log(`Failed to load image: ${product.img}`);
                e.target.src = '/images/placeholder.png';
              }}
            />
          </div>
          <div className="product-info-panel">
            <h1 className="product-title">{product.title}</h1>
            <div className="product-rating-line">
              <span className="stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} style={{ color: i < Math.round(product.rating || 0) ? '#FACC15' : '#E5E7EB' }}>★</span>
                ))}
              </span>
              <span className="rating-value">({(product.rating || 0).toFixed(1)})</span>
            </div>
            <div className="product-price">{priceFormatted}</div>

            {product.colors?.length > 0 && (
              <div className="product-option-block">
                <div className="option-label">Color:</div>
                <div className="option-values">
                  {product.colors.map(c => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setSelectedColor(c)}
                      className={`chip ${selectedColor === c ? 'active' : ''}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="product-option-block">
              <div className="option-label">Quantity:</div>
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={e => setQuantity(Math.max(1, Number(e.target.value)))}
                className="chip"
                style={{ width: '80px', textAlign: 'center', fontWeight: '600' }}
              />
            </div>

            <div className="product-sold">{product.sold || 0} Sold</div>

            <div className="product-action-row">
              <button className="buy-now-btn" type="button" onClick={buyNow}>Buy now</button>
              <button className="add-cart-btn" type="button" onClick={addToCart}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M3 3H4.3l1.6 6h8.7l1.4-4H5.9" stroke="#421F72" strokeWidth="1.4" fill="none" />
                  <circle cx="8.5" cy="16.2" r="1" fill="#421F72" />
                  <circle cx="13.9" cy="16.2" r="1" fill="#421F72" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="product-detail-tabs-wrapper">
          <div className="product-detail-bar">
            <span>Product Detail</span>
          </div>
          <div className="product-detail-lower">
            <div className="product-left-menu">
              <button
                className={`left-menu-btn ${detailTab === 'description' ? 'active' : ''}`}
                onClick={() => setDetailTab('description')}
              >
                Product description
              </button>
              <button
                className={`left-menu-btn ${detailTab === 'benefits' ? 'active' : ''}`}
                onClick={() => setDetailTab('benefits')}
              >
                Benefits
              </button>
              {product.nutrition && (
                <div className="nutrition-box">
                  <h4>Nutrition</h4>
                  <ul className="nutrition-list">
                    {product.nutrition.map(n => (
                      <li key={n.label}>
                        <span>{n.label}</span><span>{n.value}%</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="product-detail-content">
              <table className="basic-info-table">
                <tbody>
                  <tr><th>Category</th><td>{product.category}</td></tr>
                  <tr><th>Remaining Quantity</th><td>{product.stock || 'N/A'}</td></tr>
                  <tr><th>Brand</th><td>{product.brand}</td></tr>
                  <tr><th>Selected Color</th><td>{selectedColor || 'None'}</td></tr>
                  <tr><th>Quantity</th><td>{quantity}</td></tr>
                </tbody>
              </table>

              {detailTab === 'description' && (
                <div className="description-block">
                  <h3>Product description</h3>
                  <p>
                    {product.description?.split('\n').map((line, i) => (
                      <span key={i}>{line}<br /></span>
                    )) || 'No description available.'}
                  </p>
                </div>
              )}

              {detailTab === 'benefits' && (
                <div className="benefits-block">
                  <h3>Benefits</h3>
                  <ul>
                    {product.benefits?.map((b, i) => <li key={i}>{b}</li>) || <li>No benefits listed.</li>}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
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

export default Products;