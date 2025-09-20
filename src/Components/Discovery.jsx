import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// shared assets
import FooterLogoImg from '../Assets/logo.png';
import Last from '../Assets/Last.png';

// discovery images (07–15)
import Img07 from '../Assets/07.png';
import Img08 from '../Assets/08.png';
import Img09 from '../Assets/09.png';
import Img10 from '../Assets/10.png';
import Img11 from '../Assets/11.png';
import Img12 from '../Assets/12.png';
import Img13 from '../Assets/13.png';
import Img14 from '../Assets/14.png';
import Img15 from '../Assets/15.png';

import '../Discovery.css';

function Discovery() {
  const [activeNavLink, setActiveNavLink] = useState('Discovery');
  const navigate = useNavigate();

  // cart session + count (unchanged)
  const [cartCount, setCartCount] = useState(0);
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    const initializeSession = async () => {
      let storedSessionId = localStorage.getItem('pawpicks-session-id');

      if (!storedSessionId) {
        try {
          const response = await fetch('http://localhost:5000/api/cart/session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
          });
          if (response.ok) {
            const result = await response.json();
            storedSessionId = result.data.sessionId;
            localStorage.setItem('pawpicks-session-id', storedSessionId);
          }
        } catch (err) {
          console.error('Error generating session:', err);
        }
      }

      if (storedSessionId) {
        setSessionId(storedSessionId);
        fetchCartCount(storedSessionId);
      }
    };

    initializeSession();
  }, []);

  const fetchCartCount = async (sid) => {
    try {
      const res = await fetch(`http://localhost:5000/api/cart/${sid}`);
      if (res.ok) {
        const result = await res.json();
        setCartCount(result.data.totalItems || 0);
      }
    } catch (err) {
      console.error('Error fetching cart count:', err);
    }
  };

  // navbar items + navigation (unchanged)
  const navItems = ['About', 'Service', 'Discovery', 'Shop', 'Contact'];
  const handleNavClick = (linkName, e) => {
    e.preventDefault();
    setActiveNavLink(linkName);

    if (linkName === 'About') navigate('/');
    else if (linkName === 'Service') navigate('/services');
    else if (linkName === 'Discovery') navigate('/discovery');
    else if (linkName === 'Shop') navigate('/shop');
    else if (linkName === 'Contact') navigate('/contact');
  };

  // --- Tabs + Cards data ---
  const tabs = ['Dogs', 'Cats', 'Hamsters', 'Birds'];
  const [activeTab, setActiveTab] = useState('Dogs');
  const [favorites, setFavorites] = useState(() => new Set());

  const DATA = {
    Dogs: [
      {
        id: 'dog-chi',
        name: 'CHIHUAHUA DOG',
        country: 'Mexico',
        img: Img07,
        info: { difficulty: 55, ferocious: 20, space: 35, groups: 60 },
        desc:
          'Chihuahuas are tiny dogs known for their large eyes and ears. They are lively, loyal, and often bond closely with their owners. Despite their small size, Chihuahuas can...',
      },
      {
        id: 'dog-dach',
        name: 'DACHSHUND DOG',
        country: 'Germany',
        img: Img08,
        info: { difficulty: 60, ferocious: 35, space: 40, groups: 55 },
        desc:
          'Dachshunds, also known as "wiener dogs," have long bodies and short legs. Originally bred for hunting, they are brave and energetic. Dachshunds come in vari...',
      },
      {
        id: 'dog-poodle',
        name: 'POODLE DOG',
        country: 'West India',
        img: Img09,
        info: { difficulty: 45, ferocious: 25, space: 30, groups: 65 },
        desc:
          'Poodles are highly intelligent and versatile dogs, often recognized for their curly coats. They come in three sizes: standard, miniature, and toy. Poodles a...',
      },
      {
        id: 'dog-pug',
        name: 'PUG DOG',
        country: 'Mexico',
        img: Img10,
        info: { difficulty: 50, ferocious: 15, space: 25, groups: 55 },
        desc:
          'Pugs are small, sturdy dogs with distinctive wrinkled faces and curly tails. They are known for their playful and friendly nature. Pugs are social dogs tha...',
      },
    ],
    Cats: [
      {
        id: 'cat-brit',
        name: 'BRITISH SHORTHAIR',
        country: 'UK',
        img: Img11,
        info: { difficulty: 35, ferocious: 15, space: 25, groups: 40 },
        desc:
          'Plush-coated, calm and affectionate—British Shorthairs are wonderful companions that adapt well to apartments...',
      },
      {
        id: 'cat-beng',
        name: 'BENGAL CAT',
        country: 'USA',
        img: Img12,
        info: { difficulty: 55, ferocious: 30, space: 35, groups: 45 },
        desc:
          'Active, curious and strikingly patterned, the Bengal thrives with enrichment and interactive play...',
      },
      {
        id: 'cat-siam',
        name: 'SIAMESE CAT',
        country: 'Thailand',
        img: Img13,
        info: { difficulty: 45, ferocious: 20, space: 30, groups: 50 },
        desc:
          'Vocal and people-oriented, Siamese cats love attention and form tight bonds with their families...',
      },
      {
        id: 'cat-pers',
        name: 'PERSIAN CAT',
        country: 'Iran',
        img: Img14,
        info: { difficulty: 60, ferocious: 10, space: 25, groups: 35 },
        desc:
          'Graceful and gentle with a long, luxurious coat—Persians prefer calm environments and regular grooming...',
      },
    ],
    Hamsters: [
      {
        id: 'ham-syr',
        name: 'SYRIAN HAMSTER',
        country: 'Syria',
        img: Img15,
        info: { difficulty: 30, ferocious: 10, space: 20, groups: 20 },
        desc:
          'Solitary and easy for beginners, Syrian hamsters are adorable night owls with big personalities...',
      },
      {
        id: 'ham-dwarf',
        name: 'DWARF HAMSTER',
        country: 'Mongolia',
        img: Img11,
        info: { difficulty: 40, ferocious: 15, space: 15, groups: 25 },
        desc:
          'Tiny, quick and social in pairs—dwarf hamsters love tunnels and wheels for endless exploring...',
      },
      {
        id: 'ham-robo',
        name: 'ROBOROVSKI',
        country: 'China',
        img: Img12,
        info: { difficulty: 45, ferocious: 10, space: 20, groups: 30 },
        desc:
          'The smallest and fastest hamsters—best watched rather than handled, with lots of enrichment...',
      },
      {
        id: 'ham-camp',
        name: 'CAMPBELL’S',
        country: 'Russia',
        img: Img13,
        info: { difficulty: 40, ferocious: 15, space: 20, groups: 25 },
        desc:
          'Curious little burrowers; give them deep bedding and hideouts to mimic their natural habitat...',
      },
    ],
    Birds: [
      {
        id: 'brd-bud',
        name: 'BUDGERIGAR',
        country: 'Australia',
        img: Img14,
        info: { difficulty: 35, ferocious: 5, space: 30, groups: 70 },
        desc:
          'Chirpy and social, budgies learn tricks and mimic sounds—great for first-time bird keepers...',
      },
      {
        id: 'brd-cock',
        name: 'COCKATIEL',
        country: 'Australia',
        img: Img15,
        info: { difficulty: 40, ferocious: 10, space: 35, groups: 60 },
        desc:
          'Affectionate and expressive crest—cockatiels enjoy gentle training and daily interaction...',
      },
      {
        id: 'brd-love',
        name: 'LOVE BIRD',
        country: 'Africa',
        img: Img07,
        info: { difficulty: 45, ferocious: 10, space: 30, groups: 65 },
        desc:
          'Colorful, pair-bonding parrots that thrive on companionship and foraging toys...',
      },
      {
        id: 'brd-monk',
        name: 'MONK PARAKEET',
        country: 'South America',
        img: Img08,
        info: { difficulty: 50, ferocious: 15, space: 40, groups: 55 },
        desc:
          'Chatty and clever flock birds—provide large cages and lots of chew-friendly enrichment...',
      },
    ],
  };

  const list = DATA[activeTab];

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="new-discovery-page-root">
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

            {/* Cart button with count and navigation */}
            <button className="cart-btn" aria-label="Cart" type="button" onClick={() => navigate('/cart')} style={{ position: 'relative' }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M3 3H4.27924C4.70967 3 5.09181 3.28101 5.21799 3.69139L5.5 4.5M5.5 4.5L6.5 8.5H15.5L17 4.5H5.5ZM8 16.5C8.82843 16.5 9.5 15.8284 9.5 15C9.5 14.1716 8.82843 13.5 8 13.5C7.17157 13.5 6.5 14.1716 6.5 15C6.5 15.8284 7.17157 16.5 8 16.5ZM15 16.5C15.8284 16.5 16.5 15.8284 16.5 15C16.5 14.1716 15.8284 13.5 15 13.5C14.1716 13.5 14.5 14.1716 14.5 15C14.5 15.8284 14.1716 16.5 15 16.5Z" stroke="#9CA3AF" strokeWidth="1.5" fill="none" />
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

            <button type="button" className="auth-link" onClick={() => navigate('/register')} style={{ background: 'none', border: 0, padding: 0, cursor: 'pointer' }}>
              Register /
            </button>
            <button type="button" className="auth-link" onClick={() => navigate('/login')} style={{ background: 'none', border: 0, padding: 0, cursor: 'pointer' }}>
              Login
            </button>
          </div>
        </div>
      </header>

      {/* ------------------- NEW CONTENT SECTIONS ------------------- */}
      <main className="new-discovery-main">
        {/* HERO */}
        <section className="new-discovery-hero container">
          <div className="new-hero-text">
            <h1>Discover, Learn &amp; Love Your Pet</h1>
            <p>
              Tips, trends, and expert insights to keep tails wagging and whiskers purring.
              Explore curated guides, inspiring stories, and product spotlights—made for pet parents.
            </p>
            <div className="new-hero-actions">
              <button className="new-btn-primary" onClick={() => navigate('/shop')}>Explore Shop</button>
              <button
                className="new-btn-ghost"
                onClick={() => window.scrollTo({ top: document.body.scrollHeight / 3, behavior: 'smooth' })}
              >
                See Highlights
              </button>
            </div>
          </div>
          <div className="new-hero-media">
            <img src={Img07} alt="Discovery hero" />
            <div className="new-hero-badge">New • Editor’s Picks</div>
          </div>
        </section>

        {/* HIGHLIGHTS */}
        <section className="new-discovery-highlights container">
          <div className="new-highlight-card">
            <img src={Img08} alt="Nutrition" />
            <div className="new-highlight-content">
              <h3>Nutrition Guides</h3>
              <p>Balanced diets, portion tips, and ingredient breakdowns for every life stage.</p>
              <span className="new-learn-more">Learn more →</span>
            </div>
          </div>
          <div className="new-highlight-card">
            <img src={Img09} alt="Training" />
            <div className="new-highlight-content">
              <h3>Training &amp; Behavior</h3>
              <p>Basic commands to advanced enrichment—make learning fun and positive.</p>
              <span className="new-learn-more">Learn more →</span>
            </div>
          </div>
          <div className="new-highlight-card">
            <img src={Img10} alt="Wellness" />
            <div className="new-highlight-content">
              <h3>Wellness &amp; Care</h3>
              <p>Vet-approved routines, grooming checklists, and seasonal care reminders.</p>
              <span className="new-learn-more">Learn more →</span>
            </div>
          </div>
        </section>

        {/* BROWSE BY SPECIES (title + tabs + cards) */}
        <section className="new-discovery-content container">
          <div className="new-disc-title-row">
            <h1>DISCOVERY</h1>
            <span className="new-disc-paw">🐾</span>
          </div>

          <div className="new-disc-tabs">
            {tabs.map((t) => (
              <button
                key={t}
                className={`new-disc-tab ${activeTab === t ? 'active' : ''}`}
                onClick={() => setActiveTab(t)}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="new-disc-grid">
            {list.map((pet) => (
              <article className="new-pet-card" key={pet.id}>
                <div className="new-pet-image-wrap">
                  <img src={pet.img} alt={pet.name} className="new-pet-image" />
                  <button
                    className="new-heart-btn"
                    aria-label="favorite"
                    onClick={() => toggleFavorite(pet.id)}
                    title={favorites.has(pet.id) ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill={favorites.has(pet.id) ? '#e11d48' : 'none'} stroke="#e11d48" strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                  </button>
                </div>

                <h3 className="new-pet-name">{pet.name}</h3>

                <div className="new-pet-country">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7z" stroke="#6b7280" strokeWidth="2" />
                    <circle cx="12" cy="9" r="2" fill="#6b7280" />
                  </svg>
                  <span>{pet.country}</span>
                </div>

                <div className="new-pet-section-title">Information</div>

                <div className="new-pet-bars">
                  <div className="new-bar-row">
                    <span>Difficulty in raising</span>
                    <div className="new-bar"><span style={{ width: `${pet.info.difficulty}%` }} /></div>
                  </div>
                  <div className="new-bar-row">
                    <span>Ferocious</span>
                    <div className="new-bar"><span style={{ width: `${pet.info.ferocious}%` }} /></div>
                  </div>
                  <div className="new-bar-row">
                    <span>Space</span>
                    <div className="new-bar"><span style={{ width: `${pet.info.space}%` }} /></div>
                  </div>
                  <div className="new-bar-row">
                    <span>Groups</span>
                    <div className="new-bar"><span style={{ width: `${pet.info.groups}%` }} /></div>
                  </div>
                </div>

                <div className="new-pet-section-title" style={{ marginTop: 10 }}>Description</div>
                <p className="new-pet-desc">{pet.desc}</p>

                <button className="new-learn-btn" onClick={() => alert('Learn more')}>
                  Learn More
                </button>
              </article>
            ))}
          </div>
        </section>

        {/* ARTICLES */}
        <section className="new-discovery-articles container">
          <div className="new-articles-head">
            <h2>Latest Reads</h2>
            <button className="new-btn-ghost" onClick={() => alert('Load more…')}>View All</button>
          </div>

          <div className="new-article-grid">
            <article className="new-article-card">
              <img src={Img09} alt="Article 1" />
              <div className="new-article-content">
                <div className="new-article-meta">Training • 6 min</div>
                <h3>How to Build a Daily Enrichment Routine</h3>
                <p>Simple activities that boost confidence and reduce unwanted behaviors.</p>
                <button className="new-text-link" onClick={() => alert('Open article')}>Read more →</button>
              </div>
            </article>

            <article className="new-article-card">
              <img src={Img12} alt="Article 2" />
              <div className="new-article-content">
                <div className="new-article-meta">Nutrition • 4 min</div>
                <h3>Decoding Labels: What to Look For</h3>
                <p>From proteins to fillers—learn to choose better food with confidence.</p>
                <button className="new-text-link" onClick={() => alert('Open article')}>Read more →</button>
              </div>
            </article>

            <article className="new-article-card">
              <img src={Img14} alt="Article 3" />
              <div className="new-article-content">
                <div className="new-article-meta">Wellness • 5 min</div>
                <h3>Seasonal Grooming Checklist</h3>
                <p>Keep coats shiny and paws protected with these quick seasonal tips.</p>
                <button className="new-text-link" onClick={() => alert('Open article')}>Read more →</button>
              </div>
            </article>
          </div>
        </section>

        {/* NEWSLETTER / CTA */}
        <section className="new-discovery-cta container">
          <div className="new-cta-card">
            <div className="new-cta-text">
              <h2>Get fresh tips weekly</h2>
              <p>Join 100k+ pet parents who get bite-size tips, trends, and exclusive offers.</p>
              <form
                className="new-cta-form"
                onSubmit={(e) => { e.preventDefault(); alert('Subscribed!'); }}
              >
                <input type="email" placeholder="Enter your email" required />
                <button className="new-btn-primary">Subscribe</button>
              </form>
            </div>
            <div className="new-cta-media">
              <img src={Img13} alt="Newsletter visual" />
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER (unchanged) */}
      <footer className="contact-footer">
        <div className="contact-footer-left">
          <div className="footer-logo">
            <img src={FooterLogoImg} alt="Footer Logo" className="footer-logo-img" />
          </div>
          <div className="footer-desc">
            Welcome to Cuddle &amp; Care Pets! We provide quality pet products, grooming,
            and care advice for your furry friends.
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

export default Discovery;
