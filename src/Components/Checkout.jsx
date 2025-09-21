import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../Checkout.css';
import FooterLogoImg from '../Assets/logo.png';
import Last from '../Assets/Last.png';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const getInitials = (fullName = '') => {
  const parts = fullName.trim().split(/\s+/);
  const first = parts[0]?.[0] || '';
  const second = parts[1]?.[0] || '';
  return (first + second).toUpperCase();
};

const generateOrderId = () => {
  const ts = Date.now().toString(36).toUpperCase();
  const rnd = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `ORD-${ts}-${rnd}`;
};

// Create a stable snapshot of the summary to display on the Complete step
const snapshotSummary = (summary) => {
  try {
    // Avoid mutating original state
    const copy = JSON.parse(JSON.stringify(summary || {}));
    // Normalize numeric fields
    copy.subtotal = Number(copy.subtotal || 0);
    copy.total = Number(copy.total || 0);
    copy.totalItems = Number(copy.totalItems || 0);
    // Ensure basic product fields are present for display
    copy.items = (copy.items || []).map((it) => ({
      title: it.product?.title || it.title || 'Product',
      brand: it.product?.brand || it.brand || '',
      price: typeof it.price === 'number' ? it.price : (it.product?.price || 0),
      quantity: it.quantity || 0,
      selectedColor: it.selectedColor || '',
      selectedVariant: it.selectedVariant || ''
    }));
    return copy;
  } catch {
    return {
      items: [],
      subtotal: 0,
      shippingCost: 0,
      total: 0,
      totalItems: 0
    };
  }
};

function Checkout() {
  const [step, setStep] = useState(1);
  const [activeNavLink, setActiveNavLink] = useState('Shop');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [orderSummary, setOrderSummary] = useState({
    items: [],
    subtotal: 0,
    shippingCost: 0,
    total: 0,
    totalItems: 0,
  });
  const [finalSummary, setFinalSummary] = useState(null); // Used only for rendering after confirmation
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    email: '',
    address: '',
    contactNumber: '',
  });
  const [orderId, setOrderId] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [sessionId, setSessionId] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const navItems = ['About', 'Service', 'Discovery', 'Shop', 'Contact'];

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  // Prevent hydration from overriding the finalSummary after confirmation
  const isFinalizedRef = useRef(false);

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

  // Clear cart on the server after order confirmation (does not change finalSummary)
  const clearCartAfterOrder = async () => {
    try {
      if (!sessionId) return;
      await axios.delete(`${API_BASE}/api/cart/clear/${sessionId}`);
      setCartCount(0);
    } catch (err) {
      console.error('Error clearing cart after order:', err);
    }
  };

  // If user returns from login with stored checkout intent, auto-complete the order
  useEffect(() => {
    const intentStr = sessionStorage.getItem('checkoutIntent');
    if (isLoggedIn && intentStr) {
      try {
        const intent = JSON.parse(intentStr);
        if (intent?.shippingInfo) setShippingInfo(intent.shippingInfo);
        if (intent?.paymentMethod) setPaymentMethod(intent.paymentMethod);

        // Use the saved order snapshot to render confirmation, independent of current cart contents
        if (intent?.orderSnapshot) {
          const snap = snapshotSummary(intent.orderSnapshot);
          setFinalSummary(snap);
          isFinalizedRef.current = true;
          const fakeId = generateOrderId();
          setOrderId(fakeId);
          setStep(3);
          window.scrollTo({ top: 0, behavior: 'smooth' });
          // Clear the cart on the backend now that the order is "confirmed"
          clearCartAfterOrder();
        }
      } catch {
        // If parsing fails, discard the intent
      } finally {
        sessionStorage.removeItem('checkoutIntent');
      }
    }
  }, [isLoggedIn]);

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

  // Initialize session if no session exists
  useEffect(() => {
    const initializeSession = async () => {
      let storedSessionId = localStorage.getItem('pawpicks-session-id');

      if (!storedSessionId) {
        try {
          const response = await axios.post(`${API_BASE}/api/cart/session`, {}, {
            headers: { 'Content-Type': 'application/json' },
          });

          if (response.data.success) {
            storedSessionId = response.data.data.sessionId;
            localStorage.setItem('pawpicks-session-id', storedSessionId);
          }
        } catch (error) {
          console.error('Error generating session:', error);
        }
      }

      if (storedSessionId) {
        setSessionId(storedSessionId);
        fetchCartCount(storedSessionId);
        if (!location.state?.cart) {
          await hydrateOrderFromCart(storedSessionId);
        }
      }
    };

    const hydrateOrderFromCart = async (sid) => {
      try {
        const { data } = await axios.get(`${API_BASE}/api/cart/${sid}`);
        if (data?.success && data?.data) {
          const cart = data.data;
          const items = Array.isArray(cart.items) ? cart.items : [];

          const subtotal = items.reduce((sum, it) => {
            const unitPrice = typeof it.price === 'number' ? it.price : (it.product?.price || 0);
            return sum + unitPrice * (it.quantity || 0);
          }, 0);

          const totalItems = items.reduce((sum, it) => sum + (it.quantity || 0), 0);

          // Do not override the final summary if order is already finalized
          if (!isFinalizedRef.current) {
            setOrderSummary({
              items,
              subtotal,
              shippingCost: 0,
              total: subtotal,
              totalItems,
            });
          }
        }
      } catch (err) {
        console.error('Error hydrating order from cart:', err);
      }
    };

    const fetchCartCount = async (sid) => {
      try {
        const response = await axios.get(`${API_BASE}/api/cart/${sid}`);
        if (response.data.success) {
          const items = response.data.data?.items || [];
          const count = items.reduce((sum, it) => sum + (it.quantity || 0), 0);
          setCartCount(count);
        }
      } catch (error) {
        console.error('Error fetching cart count:', error);
      }
    };

    initializeSession();
  }, [location.state]);

  // Initialize cart data from location state (if provided)
  useEffect(() => {
    if (location.state?.cart && !isFinalizedRef.current) {
      const cart = location.state.cart;
      const items = cart.items || [];
      const subtotal =
        typeof cart.totalAmount === 'number'
          ? cart.totalAmount
          : items.reduce((sum, it) => sum + (it.price || 0) * (it.quantity || 0), 0);
      const totalItems =
        typeof cart.totalItems === 'number'
          ? cart.totalItems
          : items.reduce((sum, it) => sum + (it.quantity || 0), 0);

      setOrderSummary({
        items,
        subtotal,
        shippingCost: 0,
        total: subtotal,
        totalItems,
      });
    }
  }, [location.state]);

  const handleNavClick = (linkName, e) => {
    e.preventDefault();
    setActiveNavLink(linkName);
    if (linkName === 'About') navigate('/');
    else if (linkName === 'Service') navigate('/services');
    else if (linkName === 'Shop') navigate('/shop');
    else if (linkName === 'Contact') navigate('/contact');
    else if (linkName === 'Discovery') navigate('/discovery');
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleContinueToShipping = () => {
    if (!paymentMethod) {
      alert('Please choose a payment option');
      return;
    }
    setStep(2);
  };

  const handleShippingInfoChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // If not logged in, redirect to login then complete after login using snapshot
  const handleSubmitOrder = async () => {
    if (!paymentMethod) {
      alert('Please choose a payment option');
      setStep(1);
      return;
    }

    if (!shippingInfo.fullName || !shippingInfo.email || !shippingInfo.address || !shippingInfo.contactNumber) {
      alert('Please fill in all required fields');
      return;
    }

    if (!isLoggedIn) {
      // Persist intent including a snapshot of the current summary
      const snap = snapshotSummary(orderSummary);
      sessionStorage.setItem(
        'checkoutIntent',
        JSON.stringify({
          paymentMethod,
          shippingInfo,
          orderSnapshot: snap,
        })
      );
      navigate('/login', { state: { from: '/checkout' } });
      return;
    }

    // Logged-in flow: finalize with current snapshot, then clear cart
    const snap = snapshotSummary(orderSummary);
    setFinalSummary(snap);
    isFinalizedRef.current = true;

    const fakeId = generateOrderId();
    setOrderId(fakeId);
    setStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    clearCartAfterOrder();
  };

  // Choose which summary to display (finalSummary after confirmation, otherwise live orderSummary)
  const summaryToRender = step === 3 && finalSummary ? finalSummary : orderSummary;

  return (
    <div className="checkout-root">
      {/* Navbar */}
      <header className="header">
        <div className="nav-container">
          <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
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
                <path
                  d="M10 2C10.5523 2 11 2.44772 11 3V4.1C13.2822 4.56329 15 6.58104 15 9V12.382L16.553 14.894C16.8056 15.2485 16.5437 15.75 16.118 15.75H3.88197C3.45626 15.75 3.19440 15.2485 3.44701 14.894L5 12.382V9C5 6.58104 6.71776 4.56329 9 4.1V3C9 2.44772 9.44772 2 10 2Z"
                  fill="#9CA3AF"
                />
                <path
                  d="M7.5 17.25C7.5 18.4926 8.50736 19.5 10 19.5C11.4926 19.5 12.5 18.4926 12.5 17.25H7.5Z"
                  fill="#9CA3AF"
                />
              </svg>
            </button>
            <button
              className="cart-btn"
              aria-label="Cart"
              type="button"
              onClick={() => navigate('/cart')}
              style={{ position: 'relative' }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M3 3H4.27924C4.70967 3 5.09181 3.28101 5.21799 3.69139L5.5 4.5M5.5 4.5L6.5 8.5H15.5L17 4.5H5.5ZM8 16.5C8.82843 16.5 9.5 15.8284 9.5 15C9.5 14.1716 8.82843 13.5 8 13.5C7.17157 13.5 6.5 14.1716 6.5 15C6.5 15.8284 7.17157 16.5 8 16.5ZM15 16.5C15.8284 16.5 16.5 15.8284 16.5 15C16.5 14.1716 15.8284 13.5 15 13.5C14.1716 13.5 14.5 14.1716 14.5 15C14.5 15.8284 14.1716 16.5 15 16.5Z"
                  stroke="#9CA3AF"
                  strokeWidth="1.5"
                  fill="none"
                />
              </svg>
              {cartCount > 0 && (
                <span
                  style={{
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
                    fontWeight: 'bold',
                  }}
                >
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

      <main className="checkout-container">
        <div className="checkout-steps">
          <div className={`step ${step >= 1 ? 'active' : ''}`}>Select Payment</div>
          <div className={`step ${step >= 2 ? 'active' : ''}`}>Shipping Information</div>
          <div className={`step ${step === 3 ? 'active' : ''}`}>Complete</div>
        </div>
        <div className="checkout-content">
          <div className="checkout-main">
            {step === 1 && (
              <div className="payment-selection">
                <h2>Select Payment Method</h2>
                <div
                  className={`payment-option ${paymentMethod === 'cod' ? 'selected' : ''}`}
                  onClick={() => handlePaymentMethodChange('cod')}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handlePaymentMethodChange('cod')}
                >
                  <input
                    type="radio"
                    id="cod"
                    name="payment"
                    checked={paymentMethod === 'cod'}
                    onChange={() => handlePaymentMethodChange('cod')}
                  />
                  <label htmlFor="cod">Cash on Delivery</label>
                </div>
                <button onClick={handleContinueToShipping} className="next-btn" disabled={!paymentMethod}>
                  Continue
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="shipping-info">
                <h2>Shipping Information</h2>
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="form-group">
                    <label>Full Name*</label>
                    <input
                      type="text"
                      name="fullName"
                      value={shippingInfo.fullName}
                      onChange={handleShippingInfoChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address*</label>
                    <input
                      type="email"
                      name="email"
                      value={shippingInfo.email}
                      onChange={handleShippingInfoChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Delivery Address*</label>
                    <input
                      type="text"
                      name="address"
                      value={shippingInfo.address}
                      onChange={handleShippingInfoChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Contact Number*</label>
                    <input
                      type="tel"
                      name="contactNumber"
                      value={shippingInfo.contactNumber}
                      onChange={handleShippingInfoChange}
                      required
                    />
                  </div>
                  <button onClick={handleSubmitOrder} className="submit-btn">
                    Place Order
                  </button>
                </form>
              </div>
            )}

            {step === 3 && (
              <div className="order-confirmation">
                <div className="success-icon">✓</div>
                <h2>Order Placed Successfully!</h2>
                <p>Thank you for your purchase. Your order is now being processed.</p>
                <div className="order-details">
                  <h3>Order ID: {orderId}</h3>
                  <div className="shipping-details">
                    <h4>Shipping Information:</h4>
                    <p>{shippingInfo.fullName}</p>
                    <p>{shippingInfo.address}</p>
                    <p>{shippingInfo.contactNumber}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Order Summary */}
          <div className="order-summary">
            <h2>Order Summary</h2>
            <div className="order-items">
              {summaryToRender.items.map((item, index) => {
                const title = item.title || item.product?.title || 'Product';
                const brand = item.brand || item.product?.brand || '';
                const price = typeof item.price === 'number' ? item.price : (item.product?.price || 0);
                return (
                  <div key={index} className="order-item">
                    <div className="item-details">
                      <h3>{title}</h3>
                      {brand && <p>Brand: {brand}</p>}
                      {item.selectedColor && <p>Color: {item.selectedColor}</p>}
                      {item.selectedVariant && <p>Size: {item.selectedVariant}</p>}
                      <p>Quantity: {item.quantity}</p>
                    </div>
                    <div className="order-item-price">৳{(price * (item.quantity || 0)).toFixed(2)}</div>
                  </div>
                );
              })}
            </div>
            <div className="order-total">
              <div className="summary-row">
                <span className="summary-label">Items ({summaryToRender.totalItems})</span>
                <span className="summary-value">৳{Number(summaryToRender.subtotal || 0).toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Shipping</span>
                <span className="summary-value free">{summaryToRender.shippingCost}</span>
              </div>
              <div className="summary-row total">
                <span className="summary-label">Total</span>
                <span className="summary-value">৳{Number(summaryToRender.total || 0).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
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
                <li onClick={() => navigate('/shop')}>Shop</li>
                <li onClick={() => navigate('/contact')}>Contact</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Checkout;