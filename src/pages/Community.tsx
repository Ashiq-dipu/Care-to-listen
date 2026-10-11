import React, { useState } from "react";
import { testimonials, socialFeed } from "../data/community.js";

export const Community: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes("@")) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-black">
      <section className="swiss-section" data-section="COMMUNITY">
        <div className="swiss-gutter">
          <span className="gutter-num">010</span>
          <span className="gutter-label">NETWORK</span>
        </div>

        <div className="view-header-strip">
          <span className="view-sub-label">010 // EMPATHY NETWORK</span>
          <h1 className="view-giant-headline">YOU'RE NOT JUST A LISTENER — YOU'RE FAMILY.</h1>
          <p className="view-lead-copy">
            Care 2 Listen is powered by an empathetic global network of over 50,000 listeners who believe in vulnerability without shame.
          </p>

          {/* Newsletter Card */}
          <div className="nl-swiss-card">
            <div className="nl-card-split">
              <div className="nl-left-info">
                <span className="section-idx">WEEKLY EMPATHY DIGEST</span>
                <h2 className="nl-heading">THE TUESDAY GROUNDING LETTER</h2>
                <p className="nl-text">
                  Join 34,000+ readers who receive our weekly reflection letter: episode deep-dives, book excerpts, mental health toolkits, and invitations to monthly community Zoom circles.
                </p>
              </div>
              <div className="nl-right-form">
                <form onSubmit={handleSubmit} className="swiss-form-inline">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="ENTER YOUR EMAIL..."
                    className="swiss-input"
                  />
                  <button type="submit" className="btn-editorial-pill">
                    {subscribed ? "SUBSCRIBED!" : "SUBSCRIBE ⟶"}
                  </button>
                </form>
                {subscribed && (
                  <span className="nl-feedback-text">
                    ✓ Welcome! Check your inbox for our latest reflection letter.
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="section-title-bar" style={{ marginTop: "48px" }}>
            <span className="section-idx">TESTIMONIALS</span>
            <h3 className="section-heading-sm">WHAT OUR LISTENERS SAY</h3>
          </div>

          <div className="reviews-swiss-grid">
            {testimonials.map((t: any, i: number) => (
              <div key={i} className="review-swiss-card">
                <div className="rev-header">
                  <span className="rev-stars">★★★★★</span>
                  <span className="rev-ep">{t.episodeMentioned}</span>
                </div>
                <p className="rev-quote">“{t.quote}”</p>
                <div className="rev-author-bar">
                  <img src={t.avatar} alt={t.author} className="rev-author-img" />
                  <div>
                    <strong>{t.author.toUpperCase()}</strong>
                    <span>
                      {t.role} • {t.city}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Social Media Feed Wall */}
          <div className="section-title-bar" style={{ marginTop: "50px" }}>
            <span className="section-idx">SOCIAL VOICES</span>
            <h3 className="section-heading-sm">CONVERSATIONS ACROSS THE WEB</h3>
          </div>

          <div className="social-cards-grid-swiss">
            {socialFeed.map((p: any, i: number) => (
              <div key={i} className="social-post-card-swiss">
                <div className="social-card-top">
                  <span className="social-handle-swiss">{p.handle}</span>
                  <span className="social-badge-tag">{p.badge}</span>
                </div>
                <p className="social-quote-swiss">{p.quote}</p>
                <div className="social-img-box">
                  <img src={p.image} alt="Social post" className="social-thumb" />
                </div>
                <div className="social-bottom-meta">
                  <span>❤️ {p.likes}</span>
                  <span>💬 {p.comments}</span>
                  <span style={{ marginLeft: "auto" }}>{p.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
