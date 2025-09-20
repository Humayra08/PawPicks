import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import FooterLogoImg from '../Assets/logo.png';
import Last from '../Assets/Last.png';

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

function Cart() {
  const [activeNavLink, setActiveNavLink] = useState('Shop');
  const navigate = useNavigate();
  
  const [cart, setCart] = useState({ items: [], totalAmount: 0, totalItems: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  const navItems = ['About', 'Service', 'Discovery', 'Shop', 'Contact'];

  useEffect(() => {
    const initializeCart = async () => {
      try {
        let storedSessionId = localStorage.getItem('pawpicks-session-id');
        
        if (!storedSessionId) {
          const response = await fetch('http://localhost:5000/api/cart/session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
          });
          
          if (response.ok) {
            const result = await response.json();
            storedSessionId = result.data.sessionId;
            localStorage.setItem('pawpicks-session-id', storedSessionId);
          }
        }
        
        if (storedSessionId) {
          setSessionId(storedSessionId);
          await fetchCart(storedSessionId);
        }
      } catch (error) {
        console.error('Error initializing cart:', error);
        setError('Failed to initialize cart');
        setLoading(false);
      }
    };

    initializeCart();
  }, []);

  const fetchCart = async (sessionId) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/cart/${sessionId}`);
      
      if (response.ok) {
        const result = await response.json();
        setCart(result.data);
      } else {
        throw new Error('Failed to fetch cart');
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      setError('Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, quantity, selectedColor = '', selectedVariant = '') => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/cart/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          productId,
          quantity,
          selectedColor,
          selectedVariant
        })
      });

      const result = await response.json();
      
      if (response.ok) {
        setCart(result.data);
      } else {
        setError(result.message);
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      setError('Failed to update quantity');
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (productId, selectedColor = '', selectedVariant = '') => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/cart/remove', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          productId,
          selectedColor,
          selectedVariant
        })
      });

      const result = await response.json();
      
      if (response.ok) {
        setCart(result.data);
      } else {
        setError(result.message);
      }
    } catch (error) {
      console.error('Error removing item:', error);
      setError('Failed to remove item');
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/cart/clear/${sessionId}`, {
        method: 'DELETE'
      });

      const result = await response.json();
      
      if (response.ok) {
        setCart(result.data);
      } else {
        setError(result.message);
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
      setError('Failed to clear cart');
    } finally {
      setLoading(false);
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

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(item.product._id, newQuantity, item.selectedColor, item.selectedVariant);
  };

  const handleRemoveItem = (item) => {
    removeItem(item.product._id, item.selectedColor, item.selectedVariant);
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your entire cart?')) {
      clearCart();
    }
  };

  const handleCheckout = () => {
    alert('Checkout functionality coming soon!');
  };

  if (loading && cart.items.length === 0) {
    return (
      <div className="cart-root" style={{ minHeight: '100vh', background: '#F6EDFF', display: 'flex', flexDirection: 'column' }}>
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
              <button className="cart-btn" aria-label="Cart" type="button">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M3 3H4.27924C4.70967 3 5.09181 3.28101 5.21799 3.69139L5.5 4.5M5.5 4.5L6.5 8.5H15.5L17 4.5H5.5ZM8 16.5C8.82843 16.5 9.5 15.8284 9.5 15C9.5 14.1716 8.82843 13.5 8 13.5C7.17157 13.5 6.5 14.1716 6.5 15C6.5 15.8284 7.17157 16.5 8 16.5ZM15 16.5C15.8284 16.5 16.5 15.8284 16.5 15C16.5 14.1716 15.8284 13.5 15 13.5C14.1716 13.5 14.5 14.1716 14.5 15C14.5 15.8284 14.1716 16.5 15 16.5Z" stroke="#9CA3AF" strokeWidth="1.5" fill="none" />
                </svg>
                {cart.totalItems > 0 && <span className="cart-count">{cart.totalItems}</span>}
              </button>
            </div>
          </div>
        </header>

        <main style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🛒</div>
            <div style={{ fontSize: '1.2rem', color: '#666' }}>Loading your cart...</div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="cart-root" style={{ minHeight: '100vh', background: '#F6EDFF', display: 'flex', flexDirection: 'column' }}>
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
            <button className="cart-btn" aria-label="Cart" type="button" style={{ position: 'relative' }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M3 3H4.27924C4.70967 3 5.09181 3.28101 5.21799 3.69139L5.5 4.5M5.5 4.5L6.5 8.5H15.5L17 4.5H5.5ZM8 16.5C8.82843 16.5 9.5 15.8284 9.5 15C9.5 14.1716 8.82843 13.5 8 13.5C7.17157 13.5 6.5 14.1716 6.5 15C6.5 15.8284 7.17157 16.5 8 16.5ZM15 16.5C15.8284 16.5 16.5 15.8284 16.5 15C16.5 14.1716 15.8284 13.5 15 13.5C14.1716 13.5 14.5 14.1716 14.5 15C14.5 15.8284 14.1716 16.5 15 16.5Z" stroke="#9CA3AF" strokeWidth="1.5" fill="none" />
              </svg>
              {cart.totalItems > 0 && (
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
                  {cart.totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <main style={{ flex: 1, padding: '2rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#421F72' }}>
            Your Cart ({cart.totalItems} {cart.totalItems === 1 ? 'item' : 'items'})
          </h1>
          {cart.items.length > 0 && (
            <button
              onClick={handleClearCart}
              disabled={loading}
              style={{
                background: '#dc2626',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '0.9rem',
                opacity: loading ? 0.7 : 1
              }}
            >
              Clear Cart
            </button>
          )}
        </div>

        {error && (
          <div style={{
            background: '#fee2e2',
            border: '1px solid #fecaca',
            color: '#dc2626',
            padding: '1rem',
            borderRadius: '6px',
            marginBottom: '1rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span>{error}</span>
            <button
              onClick={() => setError(null)}
              style={{
                background: 'none',
                border: 'none',
                color: '#dc2626',
                cursor: 'pointer',
                fontSize: '1.2rem'
              }}
            >
              ×
            </button>
          </div>
        )}

        {cart.items.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛒</div>
            <h2 style={{ color: '#6B7280', marginBottom: '1rem' }}>Your cart is empty</h2>
            <p style={{ color: '#9CA3AF', marginBottom: '2rem' }}>
              Add some amazing pet products to get started!
            </p>
            <button
              onClick={() => navigate('/shop')}
              style={{
                background: '#421F72',
                color: 'white',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '600'
              }}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
            <div style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {cart.items.map((item) => (
                  <div
                    key={`${item.product._id}-${item.selectedColor}-${item.selectedVariant}`}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '100px 1fr auto auto',
                      gap: '1rem',
                      alignItems: 'center',
                      padding: '1rem',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px'
                    }}
                  >
                    <img
                      src={getImageSrc(item.product.img)}
                      alt={item.product.title}
                      style={{
                        width: '100px',
                        height: '100px',
                        objectFit: 'cover',
                        borderRadius: '8px'
                      }}
                      onError={(e) => {
                        e.target.src = '/images/placeholder.png';
                      }}
                    />

                    <div>
                      <h3
                        style={{
                          fontSize: '1.1rem',
                          fontWeight: '600',
                          marginBottom: '0.5rem',
                          cursor: 'pointer',
                          color: '#421F72'
                        }}
                        onClick={() => navigate(`/product/${item.product.slug}`)}
                      >
                        {item.product.title}
                      </h3>
                      <p style={{ color: '#6B7280', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                        Brand: {item.product.brand}
                      </p>
                      {item.selectedColor && (
                        <p style={{ color: '#6B7280', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                          Color: {item.selectedColor}
                        </p>
                      )}
                      {item.selectedVariant && (
                        <p style={{ color: '#6B7280', fontSize: '0.9rem' }}>
                          Size: {item.selectedVariant}
                        </p>
                      )}
                      <p style={{ fontSize: '1.1rem', fontWeight: '600', color: '#421F72', marginTop: '0.5rem' }}>
                        ৳{item.price.toFixed(2)} each
                      </p>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <button
                        onClick={() => handleQuantityChange(item, item.quantity - 1)}
                        disabled={item.quantity <= 1 || loading}
                        style={{
                          background: item.quantity <= 1 ? '#F3F4F6' : '#421F72',
                          color: item.quantity <= 1 ? '#9CA3AF' : 'white',
                          border: 'none',
                          width: '32px',
                          height: '32px',
                          borderRadius: '6px',
                          cursor: item.quantity <= 1 || loading ? 'not-allowed' : 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        −
                      </button>
                      <span style={{
                        minWidth: '40px',
                        textAlign: 'center',
                        fontSize: '1rem',
                        fontWeight: '600'
                      }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item, item.quantity + 1)}
                        disabled={loading}
                        style={{
                          background: '#421F72',
                          color: 'white',
                          border: 'none',
                          width: '32px',
                          height: '32px',
                          borderRadius: '6px',
                          cursor: loading ? 'not-allowed' : 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        +
                      </button>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontSize: '1.2rem', fontWeight: '700', color: '#421F72', marginBottom: '0.5rem' }}>
                        ৳{(item.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => handleRemoveItem(item)}
                        disabled={loading}
                        style={{
                          background: '#dc2626',
                          color: 'white',
                          border: 'none',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '4px',
                          cursor: loading ? 'not-allowed' : 'pointer',
                          fontSize: '0.8rem'
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '1.5rem',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              height: 'fit-content',
              position: 'sticky',
              top: '2rem'
            }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem', color: '#421F72' }}>
                Order Summary
              </h2>

              <div style={{ borderBottom: '1px solid #E5E7EB', paddingBottom: '1rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ color: '#6B7280' }}>Items ({cart.totalItems})</span>
                  <span style={{ fontWeight: '600' }}>৳{cart.totalAmount.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ color: '#6B7280' }}>Shipping</span>
                  <span style={{ fontWeight: '600', color: '#10B981' }}>Free</span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: '700', color: '#421F72' }}>Total</span>
                <span style={{ fontSize: '1.2rem', fontWeight: '700', color: '#421F72' }}>
                  ৳{cart.totalAmount.toFixed(2)}
                </span>
              </div>

              <button
                onClick={handleCheckout}
                disabled={loading}
                style={{
                  width: '100%',
                  background: '#421F72',
                  color: 'white',
                  border: 'none',
                  padding: '1rem',
                  borderRadius: '8px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  marginBottom: '1rem',
                  opacity: loading ? 0.7 : 1
                }}
              >
                {loading ? 'Processing...' : 'Proceed to Checkout'}
              </button>

              <button
                onClick={() => navigate('/shop')}
                style={{
                  width: '100%',
                  background: 'transparent',
                  color: '#421F72',
                  border: '2px solid #421F72',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '600'
                }}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
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

export default Cart;