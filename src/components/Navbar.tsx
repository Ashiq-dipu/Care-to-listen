import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timeStr, setTimeStr] = useState("13:42");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: "America/Los_Angeles"
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  const isActive = (path: string) => location.pathname === path;
  const isAboutActive = ["/about", "/mission", "/resources"].includes(location.pathname);
  const isEpisodesActive = ["/episodes"].includes(location.pathname);

  return (
    <>
      <header className="swiss-nav" id="main-nav">
        <div className="swiss-nav-cell brand-cell">
          <Link to="/" className="brand-anchor">
            <span className="brand-title-bold">CARE/LISTEN</span>
            <span className="brand-descriptor">
              INDEPENDENT<br />PODCAST PRACTICE
            </span>
          </Link>
        </div>

        <nav className="swiss-nav-links" aria-label="Main Navigation">
          <div className="swiss-nav-cell link-cell">
            <Link to="/" className={`nav-link ${isActive("/") ? "active" : ""}`}>
              Home
            </Link>
          </div>

          {/* EPISODES DROPDOWN */}
          <div className="swiss-nav-cell link-cell nav-dropdown-cell">
            <Link to="/episodes" className={`nav-link nav-dropdown-trigger ${isEpisodesActive ? "active" : ""}`}>
              Episodes <span className="nav-arrow">▾</span>
            </Link>
            <div className="nav-dropdown-menu">
              <Link to="/episodes" className="dropdown-item">
                All Episodes Archive
              </Link>
              <Link to="/admin" className="dropdown-item dropdown-item-accent">
                + Add Episode (Admin) ↗
              </Link>
            </div>
          </div>

          <div className="swiss-nav-cell link-cell">
            <Link to="/hosts" className={`nav-link ${isActive("/hosts") ? "active" : ""}`}>
              Hosts
            </Link>
          </div>

          <div className="swiss-nav-cell link-cell">
            <Link to="/guests" className={`nav-link ${isActive("/guests") ? "active" : ""}`}>
              Guests
            </Link>
          </div>

          <div className="swiss-nav-cell link-cell">
            <Link to="/videos" className={`nav-link ${isActive("/videos") ? "active" : ""}`}>
              Videos
            </Link>
          </div>

          {/* ABOUT DROPDOWN */}
          <div className="swiss-nav-cell link-cell nav-dropdown-cell">
            <Link to="/about" className={`nav-link nav-dropdown-trigger ${isAboutActive ? "active" : ""}`}>
              About <span className="nav-arrow">▾</span>
            </Link>
            <div className="nav-dropdown-menu">
              <Link to="/about" className="dropdown-item">
                Our Story &amp; Ethos
              </Link>
              <Link to="/mission" className="dropdown-item">
                Mission &amp; 4 Pillars
              </Link>
              <Link to="/resources" className="dropdown-item">
                Crisis Resources
              </Link>
            </div>
          </div>

          <div className="swiss-nav-cell link-cell">
            <Link to="/community" className={`nav-link ${isActive("/community") ? "active" : ""}`}>
              Community
            </Link>
          </div>

          <div className="swiss-nav-cell link-cell">
            <Link to="/contact" className={`nav-link ${isActive("/contact") ? "active" : ""}`}>
              Contact
            </Link>
          </div>
        </nav>

        <div className="swiss-nav-cell clock-cell">
          <span className="clock-display">
            SEATTLE / <span>{timeStr}</span> LOCAL
          </span>
        </div>

        <div className="swiss-nav-cell cta-cell">
          <Link to="/become-a-guest" className="swiss-nav-cta">
            Apply to Be a Guest ↗
          </Link>
          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open Navigation Menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="mobile-drawer" style={{ display: "block" }}>
          <div className="drawer-backdrop" onClick={() => setMobileMenuOpen(false)}></div>
          <div className="drawer-panel">
            <div>
              <div className="drawer-header">
                <div className="brand-wrap">
                  <span className="brand-title">CARE 2 LISTEN</span>
                </div>
                <button
                  className="modal-close-btn"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close Menu"
                >
                  &times;
                </button>
              </div>

              <ul className="drawer-links">
                <li>
                  <Link to="/" className="drawer-link" onClick={() => setMobileMenuOpen(false)}>
                    Home
                  </Link>
                </li>

                <li className="drawer-sub-group">
                  <span className="drawer-sub-header">EPISODES</span>
                  <Link to="/episodes" className="drawer-link" onClick={() => setMobileMenuOpen(false)}>
                    All Episodes Archive
                  </Link>
                  <Link
                    to="/admin"
                    className="drawer-link"
                    style={{ color: "var(--color-vermilion)", fontWeight: 700 }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    + Add Episode (Admin) ↗
                  </Link>
                </li>

                <li>
                  <Link to="/hosts" className="drawer-link" onClick={() => setMobileMenuOpen(false)}>
                    Hosts
                  </Link>
                </li>
                <li>
                  <Link to="/guests" className="drawer-link" onClick={() => setMobileMenuOpen(false)}>
                    Guests
                  </Link>
                </li>
                <li>
                  <Link to="/videos" className="drawer-link" onClick={() => setMobileMenuOpen(false)}>
                    Videos
                  </Link>
                </li>

                <li className="drawer-sub-group">
                  <span className="drawer-sub-header">ABOUT &amp; PHILOSOPHY</span>
                  <Link to="/about" className="drawer-link" onClick={() => setMobileMenuOpen(false)}>
                    Our Story &amp; Ethos
                  </Link>
                  <Link to="/mission" className="drawer-link" onClick={() => setMobileMenuOpen(false)}>
                    Mission &amp; 4 Pillars
                  </Link>
                  <Link to="/resources" className="drawer-link" onClick={() => setMobileMenuOpen(false)}>
                    Crisis Resources
                  </Link>
                </li>

                <li>
                  <Link to="/community" className="drawer-link" onClick={() => setMobileMenuOpen(false)}>
                    Community &amp; Reviews
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="drawer-link" onClick={() => setMobileMenuOpen(false)}>
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    to="/request-episode"
                    className="drawer-link"
                    style={{ color: "var(--color-vermilion)", fontWeight: 700 }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    + Request an Episode
                  </Link>
                </li>
              </ul>
            </div>

            <div className="drawer-footer">
              <Link
                to="/become-a-guest"
                className="btn btn-primary"
                style={{ width: "100%", textAlign: "center", display: "block" }}
                onClick={() => setMobileMenuOpen(false)}
              >
                Apply to Be a Guest →
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
