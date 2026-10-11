import React, { useState } from "react";
import { Link } from "react-router-dom";
import { submitEpisodePitch } from "../data/submissions";
import { categories } from "../data/episodes";

const PITCH_AVATAR_PRESETS = [
  { name: "Dr. Elena (Clinical)", url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80" },
  { name: "Julian (Tech/Founder)", url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80" },
  { name: "Amara (Poet/Advocate)", url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80" },
  { name: "Kiran (Family Mediation)", url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80" },
  { name: "Hannah (Caregiver)", url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80" },
  { name: "Tariq (Recovery Counselor)", url: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80" }
];

export const RequestEpisode: React.FC = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Mental Health");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState(PITCH_AVATAR_PRESETS[0].url);
  const [bio, setBio] = useState("");
  const [summary, setSummary] = useState("");
  const [takeaway1, setTakeaway1] = useState("");
  const [takeaway2, setTakeaway2] = useState("");
  const [takeaway3, setTakeaway3] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !name || !email || !summary) {
      setErrorMessage("Please complete all required fields marked with *.");
      return;
    }

    setSubmitting(true);
    setErrorMessage("");

    const takeaways = [takeaway1, takeaway2, takeaway3].filter(Boolean);

    const res = await submitEpisodePitch({
      title,
      category,
      guestName: name,
      guestRole: role,
      guestEmail: email,
      guestAvatar: avatar,
      guestBio: bio,
      summary,
      takeaways
    });

    setSubmitting(false);
    if (res.success) {
      setSubmitted(true);
    } else {
      setErrorMessage("Submission failed. Please try again.");
    }
  };

  return (
    <section className="swiss-section request-episode-section" data-section="008">
      <div className="swiss-gutter">
        <span className="gutter-num">008</span>
        <span className="gutter-label">PROPOSAL</span>
      </div>

      <div className="view-header-strip">
        <div className="cms-top-breadcrumbs">
          <span className="view-sub-label">008 // GUEST BROADCAST APPLICATION</span>
          <span className="live-sync-indicator">
            <span className="rec-blink-dot" style={{ background: "var(--color-vermilion)" }}></span> SUBMISSIONS OPEN
          </span>
        </div>

        <div className="cms-headline-row">
          <div>
            <h1 className="view-giant-headline">REQUEST AN EPISODE.</h1>
            <p className="view-lead-copy">
              Have an unscripted story, clinical insight, or transformative human experience to share? Pitch a conversation to Care 2 Listen. Every submission enters our editorial review queue for host review.
            </p>
          </div>
          <div className="cms-primary-cta-group">
            <Link to="/episodes" className="btn-cms-secondary">
              BROWSE ARCHIVE ↗
            </Link>
          </div>
        </div>

        {/* FORM CONTAINER */}
        <div style={{ maxWidth: 920, margin: "32px 0", background: "#ffffff", border: "2px solid var(--border-black)", boxShadow: "6px 6px 0 var(--border-black)", padding: "36px 32px" }}>
          {submitted ? (
            <div style={{ padding: "32px 20px", textAlign: "center" }}>
              <span className="cms-status-pill approved" style={{ fontSize: "0.9rem", padding: "6px 14px" }}>
                ✓ PITCH SUBMITTED &amp; QUEUED
              </span>
              <h2 style={{ fontFamily: "var(--font-sub)", fontSize: "1.8rem", margin: "20px 0 10px" }}>
                THANK YOU FOR YOUR COURAGE, {name.toUpperCase()}.
              </h2>
              <p style={{ color: "#444", fontSize: "0.95rem", maxWidth: 600, margin: "0 auto 24px" }}>
                Your proposed conversation <strong>"{title}"</strong> has been logged to our studio editorial review board. We review every pitch within 48–72 hours.
              </p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
                <button
                  type="button"
                  className="btn-cms-primary"
                  onClick={() => {
                    setSubmitted(false);
                    setTitle("");
                    setSummary("");
                    setTakeaway1("");
                    setTakeaway2("");
                    setTakeaway3("");
                  }}
                >
                  SUBMIT ANOTHER PROPOSAL ⟶
                </button>
                <Link to="/episodes" className="btn-cms-secondary">
                  EXPLORE ARCHIVE ↗
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div style={{ borderBottom: "2px solid var(--border-black)", paddingBottom: 16, marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
                <div>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", fontWeight: 800, color: "var(--color-vermilion)", letterSpacing: "0.08em", display: "block" }}>
                    PROPOSAL SPECIFICATION
                  </span>
                  <h2 style={{ fontFamily: "var(--font-sub)", fontSize: "1.35rem", fontWeight: 800, margin: "4px 0 0", color: "#0d0d0d" }}>
                    SUBMIT GUEST &amp; EPISODE PROPOSAL
                  </h2>
                </div>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "#666", fontWeight: 600 }}>
                  AVERAGE REVIEW TIME: 48-72 HOURS
                </span>
              </div>

              {errorMessage && (
                <div style={{ background: "#fee2e2", border: "1px solid #f87171", color: "#991b1b", padding: "10px 14px", marginBottom: 16, fontFamily: "var(--font-mono)", fontSize: "0.78rem" }}>
                  ✕ {errorMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div className="cms-form-grid-2">
                  <div className="form-group">
                    <label className="form-label" htmlFor="req-title">
                      PROPOSED EPISODE TITLE / THEME <span className="req">*</span>
                    </label>
                    <input
                      type="text"
                      id="req-title"
                      required
                      className="form-input"
                      placeholder="e.g. Somatic Healing After Chronic Burnout"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="req-cat">
                      TOPIC CATEGORY <span className="req">*</span>
                    </label>
                    <select
                      id="req-cat"
                      required
                      className="form-input"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      {categories.filter((c) => c !== "All").map((c) => (
                        <option key={c} value={c}>{c.toUpperCase()}</option>
                      ))}
                      <option value="Philosophy">PHILOSOPHY</option>
                      <option value="Somatic">SOMATIC</option>
                      <option value="Identity">IDENTITY</option>
                    </select>
                  </div>
                </div>

                <div className="cms-form-grid-3">
                  <div className="form-group">
                    <label className="form-label" htmlFor="req-name">
                      YOUR FULL NAME <span className="req">*</span>
                    </label>
                    <input
                      type="text"
                      id="req-name"
                      required
                      className="form-input"
                      placeholder="e.g. Dr. Jordan Reed"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="req-role">
                      YOUR ROLE / CREDENTIALS <span className="req">*</span>
                    </label>
                    <input
                      type="text"
                      id="req-role"
                      required
                      className="form-input"
                      placeholder="e.g. Somatic Clinician & Author"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="req-email">
                      CONTACT EMAIL <span className="req">*</span>
                    </label>
                    <input
                      type="email"
                      id="req-email"
                      required
                      className="form-input"
                      placeholder="jordan@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                {/* Avatar selection */}
                <div className="form-group">
                  <label className="form-label" htmlFor="req-avatar">
                    PORTRAIT / HEADSHOT IMAGE URL
                  </label>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <input
                      type="url"
                      id="req-avatar"
                      className="form-input"
                      placeholder="https://images.unsplash.com/..."
                      value={avatar}
                      onChange={(e) => setAvatar(e.target.value)}
                    />
                    <div style={{ width: 50, height: 50, border: "1.5px solid var(--border-black)", background: "#111", flexShrink: 0, overflow: "hidden" }}>
                      <img src={avatar} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => { (e.target as HTMLImageElement).src = "/assets/hero_meaningful_listening.jpg"; }} />
                    </div>
                  </div>
                  <div style={{ marginTop: 8 }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "#666", fontWeight: 700 }}>
                      OR SELECT PRESET AVATAR:
                    </span>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 4 }}>
                      {PITCH_AVATAR_PRESETS.map((p) => (
                        <button
                          key={p.name}
                          type="button"
                          className="btn-preset-avatar"
                          onClick={() => setAvatar(p.url)}
                        >
                          {p.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="req-bio">
                    BRIEF GUEST BIO
                  </label>
                  <textarea
                    id="req-bio"
                    rows={2}
                    className="form-textarea"
                    placeholder="Brief 2-3 sentences about your clinical background, published work, or lived experience..."
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="req-summary">
                    CONVERSATION SUMMARY / WHY THIS MATTERS <span className="req">*</span>
                  </label>
                  <textarea
                    id="req-summary"
                    required
                    rows={4}
                    className="form-textarea"
                    placeholder="Describe the unscripted dialogue, core questions, and vulnerable truths you want to explore..."
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    KEY TAKEAWAYS FOR LISTENERS (1-3 BULLETS)
                  </label>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Takeaway 1: Core clinical insight or somatic regulation tool..."
                      value={takeaway1}
                      onChange={(e) => setTakeaway1(e.target.value)}
                    />
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Takeaway 2: Lived experience reflection prompt..."
                      value={takeaway2}
                      onChange={(e) => setTakeaway2(e.target.value)}
                    />
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Takeaway 3: Additional practice or insight (optional)..."
                      value={takeaway3}
                      onChange={(e) => setTakeaway3(e.target.value)}
                    />
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1.5px solid var(--border-black)", paddingTop: 20, flexWrap: "wrap", gap: 14 }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "#555" }}>
                    All accepted pitches enter the host studio approval queue.
                  </span>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-cms-primary"
                    style={{ padding: "12px 28px", fontSize: "0.82rem" }}
                  >
                    {submitting ? "SUBMITTING..." : "SUBMIT EPISODE PROPOSAL ⟶"}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
