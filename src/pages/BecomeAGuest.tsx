import React, { useState } from "react";
import { guestFaqs } from "../data/community.js";

export const BecomeAGuest: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    occupation: "",
    links: "",
    topic: "",
    story: "",
    comfort: "open",
    format: "studio-seattle",
    consent: false,
  });

  const wordCount = formData.story.trim() ? formData.story.trim().split(/\s+/).length : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.topic || !formData.story || !formData.consent) {
      alert("Please fill in all required fields and accept the consent check.");
      return;
    }
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      location: "",
      occupation: "",
      links: "",
      topic: "",
      story: "",
      comfort: "open",
      format: "studio-seattle",
      consent: false,
    });
  };

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-black">
      <section className="swiss-section" data-section="GUEST_APP">
        <div className="swiss-gutter">
          <span className="gutter-num">008</span>
          <span className="gutter-label">CASTING</span>
        </div>

        <div className="view-header-strip">
          <span className="view-sub-label">008 // CASTING & COMMUNITY STORIES</span>
          <h1 className="view-giant-headline">HAVE A STORY? WE WANT TO HEAR IT.</h1>
          <p className="view-lead-copy">
            Care 2 Listen exists because of real people who refuse to stay silent about what truly matters. If you have lived through trauma, overcome burnout, re-evaluated relationships, or navigated an untold personal journey, our studio is your safe space.
          </p>

          {/* 3 Guidelines Cards */}
          <div className="guidelines-card-grid">
            <div className="guideline-card">
              <span className="guideline-num">01</span>
              <h4 className="guideline-title">RADICAL AUTHENTICITY</h4>
              <p className="guideline-text">
                No corporate scripts or performative optimism. We value honest, grounded lived experiences over polished pitches.
              </p>
            </div>
            <div className="guideline-card">
              <span className="guideline-num">02</span>
              <h4 className="guideline-title">DIGNITY FIRST</h4>
              <p className="guideline-text">
                You maintain complete agency over your narrative. We never sensationalize pain or probe beyond your boundaries.
              </p>
            </div>
            <div className="guideline-card">
              <span className="guideline-num">03</span>
              <h4 className="guideline-title">PRACTICAL HEALING</h4>
              <p className="guideline-text">
                We connect personal struggles to broader insights and practical resources that empower our global community.
              </p>
            </div>
          </div>

          <div className="guest-content-split">
            {/* Application Form Card */}
            <div className="form-wrapper-card">
              <div className="form-header">
                <h3 className="form-title">GUEST APPLICATION FORM</h3>
                <p className="form-subtitle">
                  Fields marked with an asterisk (<span className="req">*</span>) are mandatory.
                </p>
              </div>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="application-form">
                  <div className="form-grid-2">
                    <div className="form-group">
                      <label className="form-label">
                        FULL NAME <span className="req">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Dr. Maya Patel"
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        EMAIL ADDRESS <span className="req">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@domain.com"
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-grid-2">
                    <div className="form-group">
                      <label className="form-label">PHONE NUMBER (OPTIONAL)</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">LOCATION (CITY, COUNTRY)</label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="e.g. London, UK or Austin, TX"
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-grid-2">
                    <div className="form-group">
                      <label className="form-label">OCCUPATION / FIELD OF EXPERTISE</label>
                      <input
                        type="text"
                        value={formData.occupation}
                        onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                        placeholder="e.g. Somatic Therapist, Artist, Caregiver"
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">SOCIAL MEDIA OR WEBSITE LINKS</label>
                      <input
                        type="url"
                        value={formData.links}
                        onChange={(e) => setFormData({ ...formData, links: e.target.value })}
                        placeholder="https://instagram.com/yourhandle"
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      TOPIC OR CORE THEME <span className="req">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.topic}
                      onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                      placeholder="e.g. Recovering identity after caregiving burnout"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <div className="label-with-counter">
                      <label className="form-label">
                        BRIEF SUMMARY OF YOUR STORY <span className="req">*</span>
                      </label>
                      <span className="word-counter">{wordCount} / 300 words</span>
                    </div>
                    <textarea
                      rows={5}
                      required
                      value={formData.story}
                      onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                      placeholder="Tell us what you lived through, what you learned, and the message you wish to share..."
                      className="form-textarea"
                    />
                  </div>

                  <div className="form-grid-2">
                    <div className="form-group">
                      <label className="form-label">COMFORT LEVEL ON SENSITIVE TOPICS</label>
                      <select
                        value={formData.comfort}
                        onChange={(e) => setFormData({ ...formData, comfort: e.target.value })}
                        className="form-select"
                      >
                        <option value="open">Fully open to discuss any dimension</option>
                        <option value="some-boundaries">Open with specific agreed boundaries</option>
                        <option value="anonymous">Prefer identity/name to be disguised</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">RECORDING PREFERENCE</label>
                      <select
                        value={formData.format}
                        onChange={(e) => setFormData({ ...formData, format: e.target.value })}
                        className="form-select"
                      >
                        <option value="studio-seattle">In-Person (Seattle Studio)</option>
                        <option value="studio-brooklyn">In-Person (Brooklyn Studio)</option>
                        <option value="remote-video">Remote High-Def Video (Riverside)</option>
                        <option value="audio-only">Audio-Only (Voice Call / Studio Feed)</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-checkbox-group">
                    <label className="checkbox-container">
                      <input
                        type="checkbox"
                        required
                        checked={formData.consent}
                        onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                      />
                      <span className="checkbox-label">
                        I consent to being contacted by the Care 2 Listen editorial team regarding this application. <span className="req">*</span>
                      </span>
                    </label>
                  </div>

                  <div className="form-submit-row">
                    <button
                      type="submit"
                      className="btn-editorial-pill"
                      style={{ fontSize: "0.9rem", padding: "12px 24px" }}
                    >
                      SUBMIT GUEST APPLICATION ⟶
                    </button>
                  </div>
                </form>
              ) : (
                <div className="form-success-card">
                  <div className="success-icon-wrap">✓</div>
                  <h3 className="success-title">APPLICATION RECEIVED.</h3>
                  <p className="success-text">
                    Thank you for trusting us with your story. Marcus, Maya, and our editorial committee review every submission with intentional care. We will reach out via email within 5 business days.
                  </p>
                  <button onClick={handleReset} className="btn-swiss-notes">
                    SUBMIT ANOTHER STORY
                  </button>
                </div>
              )}
            </div>

            {/* FAQ Accordion Sidebar */}
            <div className="faq-sidebar">
              <div className="faq-card-sticky">
                <div className="faq-header">
                  <span className="section-idx">HELP & PROCESS</span>
                  <h3 className="faq-title">FREQUENTLY ASKED QUESTIONS</h3>
                </div>

                <div className="accordion-list">
                  {guestFaqs.map((faq: any, idx: number) => {
                    const isOpen = openFaq === idx;
                    return (
                      <div key={idx} className="accordion-item">
                        <button
                          type="button"
                          onClick={() => setOpenFaq(isOpen ? null : idx)}
                          className="accordion-trigger"
                          aria-expanded={isOpen}
                        >
                          <span className="accordion-q">{faq.q}</span>
                          <span className="accordion-icon">{isOpen ? "−" : "+"}</span>
                        </button>
                        {isOpen && (
                          <div className="accordion-panel open">
                            <p className="accordion-text">{faq.a}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
