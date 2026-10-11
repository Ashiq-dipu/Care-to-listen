import React, { useState } from "react";
import { crisisResources, recommendedBooks, recommendedApps } from "../data/resources.js";

export const Resources: React.FC = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (contact: string, idx: number) => {
    navigator.clipboard?.writeText(contact);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-black">
      <section className="swiss-section" data-section="RESOURCES">
        <div className="swiss-gutter">
          <span className="gutter-num">009</span>
          <span className="gutter-label">DIRECTORY</span>
        </div>

        <div className="view-header-strip">
          <span className="view-sub-label">009 // CRISIS & SUPPORT DIRECTORY</span>
          <h1 className="view-giant-headline">TOOLS & SUPPORT BEYOND THE PODCAST.</h1>
          <p className="view-lead-copy">
            Listening creates space, but certified clinical support saves lives. Explore verified emergency crisis helplines, curated reading lists, and digital wellness tools.
          </p>

          {/* Clinical Alert Strip */}
          <div className="crisis-alert-strip">
            ⚠️ <strong>IMPORTANT CLINICAL NOTICE:</strong> Care 2 Listen is an educational and storytelling platform, not a substitute for licensed psychological or psychiatric therapy. If you or someone you know is in active distress, connect directly with the free 24/7 emergency resources below.
          </div>

          {/* Crisis Hotlines Grid */}
          <div className="section-title-bar" style={{ marginTop: "36px" }}>
            <span className="section-idx">HOTLINES // 24/7</span>
            <h3 className="section-heading-sm">FREE EMERGENCY CRISIS HELPLINES</h3>
          </div>

          <div className="crisis-swiss-grid">
            {crisisResources.map((c: any, i: number) => (
              <div key={i} className="crisis-swiss-cell">
                <div className="crisis-cell-header">
                  <span className="crisis-badge">{c.badge}</span>
                  <span className="crisis-region-tag">{c.region}</span>
                </div>
                <h3 className="crisis-cell-name">{c.name}</h3>
                <p className="crisis-cell-desc">{c.desc}</p>
                <div className="crisis-dial-row">
                  <span className="dial-code">{c.contact}</span>
                  <button
                    onClick={() => handleCopy(c.contact, i)}
                    className="btn-copy-dial"
                  >
                    {copiedIndex === i ? "COPIED!" : "COPY NUMBER ↗"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Recommended Books */}
          <div className="section-title-bar" style={{ marginTop: "50px" }}>
            <span className="section-idx">LITERATURE // CURATED</span>
            <h3 className="section-heading-sm">BOOKS CURATED BY HOSTS & GUESTS</h3>
          </div>

          <div className="books-grid-swiss">
            {recommendedBooks.map((b: any, i: number) => (
              <div key={i} className="book-card-swiss">
                <span className="book-tag-pill">{b.tag.toUpperCase()}</span>
                <h3 className="book-title-swiss">{b.title}</h3>
                <p className="book-author-swiss">BY {b.author.toUpperCase()}</p>
                <span className="book-cat-tag">{b.category.toUpperCase()}</span>
                <p className="book-desc-swiss">{b.desc}</p>
              </div>
            ))}
          </div>

          {/* Recommended Apps */}
          <div className="section-title-bar" style={{ marginTop: "50px" }}>
            <span className="section-idx">DIGITAL TOOLS // WELLNESS</span>
            <h3 className="section-heading-sm">RECOMMENDED APPS & DIRECTORIES</h3>
          </div>

          <div className="apps-grid-swiss">
            {recommendedApps.map((a: any, i: number) => (
              <div key={i} className="app-card-swiss">
                <div className="app-card-top">
                  <h4 className="app-name-swiss">{a.name.toUpperCase()}</h4>
                  <span className="app-cat-label">{a.type.toUpperCase()}</span>
                </div>
                <p className="app-desc-swiss">{a.desc}</p>
                <a
                  href={`https://google.com/search?q=${encodeURIComponent(a.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-editorial-arrow"
                >
                  EXPLORE ↗
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
