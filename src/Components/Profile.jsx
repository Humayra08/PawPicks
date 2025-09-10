
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import FooterLogoImg from "../Assets/logo.png";
import Last from "../Assets/Last.png";

// Utility to get initials
const getInitials = (fullName = '') => {
  const parts = fullName.trim().split(/\s+/);
  const first = parts[0]?.[0] || '';
  const second = parts[1]?.[0] || '';
  return (first + second).toUpperCase();
};

export default function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    avatarUrl: '',
  });

  const [edit, setEdit] = useState({
    fullName: false,
    phoneNumber: false,
    email: false,
  });

  const [loading, setLoading] = useState(true);
  const [avatarUploading, setAvatarUploading] = useState(false);

  const jwt = localStorage.getItem('jwt');

  // Fetch profile on mount
  useEffect(() => {
    if (!jwt) {
      navigate('/login');
      return;
    }
    (async () => {
      try {
        const { data } = await axios.get('/api/users/profile', {
          headers: { Authorization: `Bearer ${jwt}` },
        });
        setUser({
          fullName: data.fullName || '',
          phoneNumber: data.phoneNumber || '',
          email: data.email || '',
          avatarUrl: data.avatarUrl || '',
        });
      } catch (err) {
        console.error('Failed to load profile', err?.response?.data || err.message);
        alert('Failed to load profile. Please login again.');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    })();
  }, [jwt, navigate]);

  const toggleEdit = (field) => setEdit((e) => ({ ...e, [field]: !e[field] }));

  const saveProfile = async () => {
    try {
      const { data } = await axios.put(
        '/api/users/profile',
        {
          fullName: user.fullName,
          phoneNumber: user.phoneNumber,
          email: user.email,
        },
        { headers: { Authorization: `Bearer ${jwt}` } }
      );
      // update local user and localStorage
      const updated = data.user;
      setUser((u) => ({ ...u, ...updated }));
      localStorage.setItem('user', JSON.stringify(updated));
      alert('Profile saved');
      setEdit({ fullName: false, phoneNumber: false, email: false });
    } catch (err) {
      console.error('Update failed', err?.response?.data || err.message);
      alert(err?.response?.data?.message || 'Failed to update profile');
    }
  };

  const onAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const form = new FormData();
    form.append('avatar', file);

    try {
      setAvatarUploading(true);
      const { data } = await axios.post('/api/users/profile/avatar', form, {
        headers: {
          Authorization: `Bearer ${jwt}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setUser((u) => ({ ...u, avatarUrl: data.avatarUrl }));
      const saved = JSON.parse(localStorage.getItem('user') || '{}');
      localStorage.setItem('user', JSON.stringify({ ...saved, avatarUrl: data.avatarUrl }));
    } catch (err) {
      console.error('Avatar upload failed', err?.response?.data || err.message);
      alert(err?.response?.data?.message || 'Failed to upload avatar');
    } finally {
      setAvatarUploading(false);
      e.target.value = ''; // reset
    }
  };

  const logout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Navbar avatar/initials
  const navUser = JSON.parse(localStorage.getItem('user') || '{}');
  const avatarBadge = navUser?.avatarUrl ? (
    <img src={navUser.avatarUrl} alt="avatar" className="nav-avatar-img" />
  ) : (
    <div className="nav-avatar-initials">{getInitials(navUser?.fullName)}</div>
  );

  if (loading) return <div style={{ padding: 24 }}>Loading...</div>;

  return (
    <div className="profile-page">
      {/* NAVBAR (same structure, add right avatar) */}
      <header className="header">
        <div className="nav-container">
          <div className="logo" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <img src={FooterLogoImg} alt="Logo" className="navbar-logo-img" />
            <span className="navbar-logo-text">PawPicks</span>
          </div>

          <nav className="nav-menu">
            <Link className="nav-link" to="/">About</Link>
            <Link className="nav-link" to="/services">Service</Link>
            <a className="nav-link" href="#">Discovery</a>
            <Link className="nav-link" to="/shop">Shop</Link>
            <a className="nav-link" href="#footer">Contact</a>
          </nav>

          <div className="nav-actions">
            <div className="nav-user-badge" title={user.fullName}>
              {avatarBadge}
            </div>
            <button className="auth-link" onClick={logout}>Logout</button>
          </div>
        </div>
      </header>

      {/* BODY */}
      <main className="profile-root">
        <div className="profile-container">
          {/* Left: sidebar */}
          <aside className="profile-sidebar">
            <div className="profile-avatar-wrap">
              {user.avatarUrl ? (
                <img src={user.avatarUrl} alt="User avatar" className="profile-avatar" />
              ) : (
                <div className="profile-initials">{getInitials(user.fullName)}</div>
              )}

              <label className="profile-upload-btn">
                {avatarUploading ? 'Uploading...' : 'Upload Photo'}
                <input
                  type="file"
                  accept="image/*"
                  onChange={onAvatarChange}
                  style={{ display: 'none' }}
                />
              </label>
            </div>

            <div className="profile-menu">
              <button className="profile-menu-item active">My Information</button>
              <button className="profile-menu-item">Orders</button>
              <button className="profile-menu-item">Wishlist</button>
              <button className="profile-menu-item">Settings</button>
            </div>
          </aside>

          {/* Right: info card */}
          <section className="profile-card">
            <div className="profile-card-header">
              <h2>My Information</h2>
              <button className="profile-save-btn" onClick={saveProfile}>Save Changes</button>
            </div>

            {/* full name */}
            <div className="profile-row">
              <div className="profile-label">Full Name</div>
              <div className="profile-value">
                {edit.fullName ? (
                  <input
                    type="text"
                    value={user.fullName}
                    onChange={(e) => setUser((u) => ({ ...u, fullName: e.target.value }))}
                    className="profile-input"
                  />
                ) : (
                  <span>{user.fullName}</span>
                )}
              </div>
              <button className="profile-edit-btn" onClick={() => toggleEdit('fullName')}>
                {edit.fullName ? 'Done' : 'Edit'}
              </button>
            </div>

            {/* phone */}
            <div className="profile-row">
              <div className="profile-label">Contact Number</div>
              <div className="profile-value">
                {edit.phoneNumber ? (
                  <input
                    type="text"
                    value={user.phoneNumber}
                    onChange={(e) => setUser((u) => ({ ...u, phoneNumber: e.target.value }))}
                    className="profile-input"
                  />
                ) : (
                  <span>{user.phoneNumber}</span>
                )}
              </div>
              <button className="profile-edit-btn" onClick={() => toggleEdit('phoneNumber')}>
                {edit.phoneNumber ? 'Done' : 'Edit'}
              </button>
            </div>

            {/* email */}
            <div className="profile-row">
              <div className="profile-label">Email</div>
              <div className="profile-value">
                {edit.email ? (
                  <input
                    type="email"
                    value={user.email}
                    onChange={(e) => setUser((u) => ({ ...u, email: e.target.value }))}
                    className="profile-input"
                    placeholder="Add email"
                  />
                ) : (
                  <span>{user.email || 'Add email'}</span>
                )}
              </div>
              <button className="profile-edit-btn" onClick={() => toggleEdit('email')}>
                {edit.email ? 'Done' : 'Edit'}
              </button>
            </div>
          </section>
        </div>
      </main>

      {/* FOOTER like homepage */}
      <footer id="footer" className="contact-footer">
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
