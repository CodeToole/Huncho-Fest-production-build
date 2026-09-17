/* eslint-disable @next/next/no-img-element */
export function Hero() {
  return (
    <section id="hero" className="hero-section">
      {/* Ambient background video loop */}
      <div className="hero-bg-media">
        <video
          className="hero-bg-video"
          autoPlay
          loop
          muted
          playsInline
          src="/hero-bg.mov"
        />
        <div className="hero-bg-overlay" />
      </div>

      {/* Main Two-Column Hero Container */}
      <div className="hero-container">
        <div className="hero-grid">
          {/* Left Column: Text & Event Details */}
          <div className="hero-content">
            {/* Kicker */}
            <div className="hero-kicker">
              <span className="kicker-dot" />
              <span className="kicker-text">NMBG JAY PRESENTS</span>
            </div>

            {/* Main Heading */}
            <h1 className="hero-title">HUNCHO FEST</h1>

            {/* Subtitle */}
            <p className="hero-subtitle">THE UNDERGROUND BLOCK PARTY</p>

            {/* Event Details Badges */}
            <div className="hero-details-row">
              {/* Date Badge */}
              <div className="detail-badge highlight-acid">
                <svg
                  className="badge-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                  <line x1="16" x2="16" y1="2" y2="6" />
                  <line x1="8" x2="8" y1="2" y2="6" />
                  <line x1="3" x2="21" y1="10" y2="10" />
                </svg>
                October 10, 2026 (10/10/26)
              </div>

              {/* Time Badge */}
              <div className="detail-badge highlight-acid">
                <svg
                  className="badge-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                3 PM – TIL
              </div>

              {/* Price Badge */}
              <div className="detail-badge highlight-gold">
                <svg
                  className="badge-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="12" x2="12" y1="2" y2="22" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
                $10 Entry
              </div>

              {/* Location Link Badge */}
              <a
                href="https://maps.google.com/?q=350+N+Broad+St,+Mobile,+AL+36603"
                target="_blank"
                rel="noopener noreferrer"
                className="detail-badge link-badge"
              >
                <svg
                  className="badge-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                350 N Broad St, Mobile, AL 36603
              </a>
            </div>

            {/* Feature Highlights */}
            <div className="hero-features-label">EVENT HIGHLIGHTS</div>
            <div className="hero-features-row">
              <span className="feature-tag">Free Performance Giveaways</span>
              <span className="feature-tag">Live Music</span>
              <span className="feature-tag">Artist Panel</span>
              <span className="feature-tag">Local Vendors</span>
            </div>

            {/* Action CTAs */}
            <div className="hero-actions">
              <a
                href="https://instagram.com/nmbgjay"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-btn cta-instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
                DM @nmbgjay to Sign Up
              </a>
            </div>
          </div>

          {/* Right Column: Promotional Flyer Showcase */}
          <div className="hero-flyer-col">
            <div className="flyer-card">
              <img
                src="/flyer.jpg"
                className="flyer-image"
                alt="NMBG Jay Presents: Huncho Fest - The Underground Block Party Official Flyer"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
