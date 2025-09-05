// src/Components/Profile.jsx
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FooterLogoImg from "../Assets/logo.png";
import Last from "../Assets/Last.png";

function getInitials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase() || "")
    .join("");
}

export default function Profile() {
  const navigate = useNavigate();

  // Header/nav state (kept consistent with your pages)
  const [activeNavLink, setActiveNavLink] = useState("About");
  const [headerVisible, setHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setHeaderVisible(!(y > lastScrollY && y > 100));
      setLastScrollY(y);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navItems = ["About", "Service", "Discovery", "Shop", "Contact"];
  const handleNavClick = (linkName, e) => {
    e.preventDefault();
    setActiveNavLink(linkName);
    if (linkName === "About") navigate("/");
    if (linkName === "Service") navigate("/services");
    if (linkName === "Shop") navigate("/shop");
  };

  const jwt = localStorage.getItem("jwt");
  const cachedUser = useMemo(() => {
    try { return JSON.parse(localStorage.getItem("user") || "null"); }
    catch { return null; }
  }, []);

  // Profile state
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [profile, setProfile] = useState({
    fullName: cachedUser?.fullName || "",
    phoneNumber: cachedUser?.phoneNumber || "",
    email: "",             // initially blank until set
    avatarUrl: "",         // initially blank until set
  });

  // Editing controls
  const [editField, setEditField] = useState(null);
  const [draft, setDraft] = useState("");

  // Fetch profile on mount
  useEffect(() => {
    if (!jwt) {
      navigate("/login");
      return;
    }
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/profile", {
          headers: { Authorization: `Bearer ${jwt}` },
        });
        setProfile({
          fullName: res.data.fullName || "",
          phoneNumber: res.data.phoneNumber || "",
          email: res.data.email || "",
          avatarUrl: res.data.avatarUrl || "",
        });
      } catch (err) {
        console.error(err);
        if (err?.response?.status === 401) navigate("/login");
        else setError(err?.response?.data?.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [jwt, navigate]);

  const startEdit = (field) => {
    setEditField(field);
    setDraft(profile[field] || "");
  };
  const cancelEdit = () => {
    setEditField(null);
    setDraft("");
  };
  const saveEdit = async () => {
    if (!editField) return;
    try {
      setSaving(true);
      const updates = { [editField]: draft };
      const res = await axios.put("http://localhost:5000/api/users/profile", updates, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      setProfile({
        fullName: res.data.fullName || "",
        phoneNumber: res.data.phoneNumber || "",
        email: res.data.email || "",
        avatarUrl: res.data.avatarUrl || "",
      });
      // also refresh localStorage basic info for initials/avatar in headers elsewhere
      const basic = { _id: res.data._id, fullName: res.data.fullName, phoneNumber: res.data.phoneNumber };
      localStorage.setItem("user", JSON.stringify(basic));
      cancelEdit();
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const initials = useMemo(() => getInitials(profile.fullName), [profile.fullName]);

  return (
    <div className="profile-page">
      {/* NAVBAR (same layout as your pages) */}
      <header className={`header ${headerVisible ? "visible" : "hidden"}`}>
        <div className="nav-container">
          <div className="logo" style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }} onClick={() => navigate("/")}>
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
            {/* show avatar (image or initials) when logged in */}
            {jwt ? (
              <button
                className="nav-avatar-btn"
                aria-label="Profile"
                onClick={() => navigate("/profile")}
                title={profile.fullName || "Profile"}
              >
                {profile?.avatarUrl ? (
                  <img className="nav-avatar-img" src={profile.avatarUrl} alt="avatar" />
                ) : (
                  <span className="nav-avatar-initials">{initials || "U"}</span>
                )}
              </button>
            ) : (
              <>
                <button className="auth-link" onClick={() => navigate("/register")}>Register /</button>
                <button className="auth-link" onClick={() => navigate("/login")}>Login</button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* BODY */}
      <main className="profile-root">
        <div className="profile-container">
          {/* Sidebar (like your demo image) */}
          <aside className="profile-sidebar">
            <div className="sidebar-title">Account</div>
            <button className="sidebar-item active">
              <span>👤</span>
              <span>Profile</span>
            </button>
            <button className="sidebar-item">
              <span>🛒</span>
              <span>My Orders</span>
            </button>
            <button className="sidebar-item">
              <span>🔔</span>
              <span>Notifications</span>
            </button>
            <button className="sidebar-item">
              <span>⬇️</span>
              <span>Downloads</span>
            </button>
          </aside>

          {/* Main card */}
          <section className="profile-main">
            <div className="profile-card">
              <div className="profile-card-head">
                <div className="profile-avatar-stack">
                  {profile?.avatarUrl ? (
                    <img className="profile-avatar-img" src={profile.avatarUrl} alt="avatar" />
                  ) : (
                    <div className="profile-avatar-circle">{initials || "U"}</div>
                  )}
                  <button className="profile-change-photo" onClick={() => startEdit("avatarUrl")}>
                    Change Photo
                  </button>
                </div>
                <div className="profile-head-right">
                  <div className="profile-name">{profile.fullName || "Your Name"}</div>
                  <div className="profile-sub">{profile.email ? profile.email : "Add email"}</div>
                </div>
              </div>

              {loading ? (
                <div className="profile-loading">Loading profile…</div>
              ) : error ? (
                <div className="profile-error">{error}</div>
              ) : (
                <>
                  {/* Full Name */}
                  <div className="profile-row">
                    <div className="field-label">Full Name</div>
                    <div className="field-value">
                      {editField === "fullName" ? (
                        <input
                          className="profile-input"
                          value={draft}
                          onChange={(e) => setDraft(e.target.value)}
                        />
                      ) : (
                        <span>{profile.fullName || "—"}</span>
                      )}
                    </div>
                    <button className="edit-btn" onClick={() => startEdit("fullName")} title="Edit name">✏️</button>
                  </div>

                  {/* Phone Number */}
                  <div className="profile-row">
                    <div className="field-label">Phone Number</div>
                    <div className="field-value">
                      {editField === "phoneNumber" ? (
                        <input
                          className="profile-input"
                          value={draft}
                          onChange={(e) => setDraft(e.target.value)}
                        />
                      ) : (
                        <span>{profile.phoneNumber || "—"}</span>
                      )}
                    </div>
                    <button className="edit-btn" onClick={() => startEdit("phoneNumber")} title="Edit phone">✏️</button>
                  </div>

                  {/* Email */}
                  <div className="profile-row">
                    <div className="field-label">Email</div>
                    <div className="field-value">
                      {editField === "email" ? (
                        <input
                          className="profile-input"
                          value={draft}
                          onChange={(e) => setDraft(e.target.value)}
                          placeholder="name@example.com"
                        />
                      ) : (
                        <span className={`${!profile.email ? "muted" : ""}`}>
                          {profile.email || "Add email"}
                        </span>
                      )}
                    </div>
                    <button className="edit-btn" onClick={() => startEdit("email")} title="Edit email">✏️</button>
                  </div>

                  {/* Avatar URL */}
                  <div className="profile-row">
                    <div className="field-label">Profile Photo</div>
                    <div className="field-value">
                      {editField === "avatarUrl" ? (
                        <input
                          className="profile-input"
                          value={draft}
                          onChange={(e) => setDraft(e.target.value)}
                          placeholder="Paste image URL (https://…)"
                        />
                      ) : (
                        <span className={`${!profile.avatarUrl ? "muted" : ""}`}>
                          {profile.avatarUrl || "No photo set"}
                        </span>
                      )}
                    </div>
                    <button className="edit-btn" onClick={() => startEdit("avatarUrl")} title="Edit photo URL">✏️</button>
                  </div>

                  {/* Save/Cancel */}
                  {editField && (
                    <div className="profile-actions">
                      <button className="save-btn" disabled={saving} onClick={saveEdit}>
                        {saving ? "Saving…" : "Save"}
                      </button>
                      <button className="cancel-btn" disabled={saving} onClick={cancelEdit}>Cancel</button>
                    </div>
                  )}
                </>
              )}
            </div>
          </section>
        </div>
      </main>

      {/* FOOTER (exactly same style as Homepage) */}
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
