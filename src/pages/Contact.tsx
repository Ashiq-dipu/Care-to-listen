import React, { useState } from "react";

export const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "General Inquiry & Listener Note",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({
      name: "",
      email: "",
      category: "General Inquiry & Listener Note",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-black">
      <section className="swiss-section" data-section="CONTACT">
        <div className="swiss-gutter">
          <span className="gutter-num">011</span>
          <span className="gutter-label">STUDIO</span>
        </div>

        <div className="view-header-strip">
          <span className="view-sub-label">011 // PRODUCTION & PRESS</span>
          <h1 className="view-giant-headline">GET IN TOUCH.</h1>
          <p className="view-lead-copy">
            Whether you have feedback on an episode, a press inquiry, sponsorship proposal, or a guest suggestion, reach out directly.
          </p>

          <div className="contact-swiss-grid">
            <form onSubmit={handleSubmit} className="swiss-form" style={{ padding: "40px" }}>
              <div className="form-group">
                <label className="form-label">YOUR FULL NAME *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Alex Mercer"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">EMAIL ADDRESS *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alex@domain.com"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">SUBJECT / INQUIRY CATEGORY *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="form-select"
                >
                  <option>General Inquiry & Listener Note</option>
                  <option>Press & Media Coverage</option>
                  <option>Sponsorship & Brand Partnership</option>
                  <option>Guest Booking Question</option>
                  <option>Audio / Website Technical Issue</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">YOUR MESSAGE *</label>
                <textarea
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="What's on your mind?..."
                  className="form-textarea"
                />
              </div>

              <button
                type="submit"
                className="btn-editorial-pill"
                style={{ fontSize: "0.9rem", padding: "12px 24px", marginTop: "10px" }}
              >
                {submitted ? "SENT!" : "SEND MESSAGE ⟶"}
              </button>

              {submitted && (
                <span className="contact-feedback-msg" style={{ display: "block", marginTop: "12px" }}>
                  ✓ Thank you! Your message was sent to Maya and Marcus.
                </span>
              )}
            </form>

            <div className="contact-info-panel">
              <h3 className="info-panel-title">STUDIO LOCATIONS</h3>
              <div className="studio-loc-box">
                <strong>SEATTLE SOUNDSTAGE (PRIMARY)</strong>
                <p>Pike Place Market District, Seattle, WA</p>
              </div>

              <div className="studio-loc-box">
                <strong>BROOKLYN SOUNDSTAGE (SECONDARY)</strong>
                <p>DUMBO Waterfront, Brooklyn, NY</p>
              </div>

              <div className="info-rule" />

              <div className="contact-meta-row">
                <span className="c-lbl">DIRECT EMAIL:</span>
                <a href="mailto:hello@care2listen.com" className="c-val">
                  HELLO@CARE2LISTEN.COM
                </a>
              </div>

              <div className="contact-meta-row">
                <span className="c-lbl">PRESS & MEDIA:</span>
                <a href="mailto:press@care2listen.com" className="c-val">
                  PRESS@CARE2LISTEN.COM
                </a>
              </div>

              <div className="contact-meta-row">
                <span className="c-lbl">TELEPHONE:</span>
                <span className="c-val">+1 206 555 0192</span>
              </div>

              <div className="contact-meta-row">
                <span className="c-lbl">RESPONSE TIME:</span>
                <span className="c-val" style={{ color: "var(--color-vermilion)" }}>
                  UNDER 48 HOURS (EST)
                </span>
              </div>

              <div className="info-rule" />

              <div className="social-tags-row">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
                  INSTAGRAM
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-link">
                  YOUTUBE
                </a>
                <a href="https://open.spotify.com" target="_blank" rel="noopener noreferrer" className="social-link">
                  SPOTIFY
                </a>
                <a href="https://podcasts.apple.com" target="_blank" rel="noopener noreferrer" className="social-link">
                  APPLE
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
