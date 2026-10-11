import React, { useState, useEffect, useRef } from "react";
import { Episode, episodes, categories } from "../data/episodes";
import { useAudio } from "../context/AudioContext";
import gsap from "gsap";

export const Episodes: React.FC = () => {
  const { playEpisode } = useAudio();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEpForModal, setSelectedEpForModal] = useState<Episode | null>(null);

  // Floating hover preview state
  const [hoveredEp, setHoveredEp] = useState<Episode | null>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!previewRef.current || !hoveredEp) return;
      const cardWidth = 260;
      const cardHeight = 235;

      let x = e.clientX + 24;
      if (x + cardWidth > window.innerWidth - 20) {
        x = e.clientX - cardWidth - 24;
      }
      let y = e.clientY - Math.round(cardHeight / 2);
      if (y < 70) y = 70;
      if (y + cardHeight > window.innerHeight - 90) {
        y = window.innerHeight - cardHeight - 90;
      }

      gsap.to(previewRef.current, {
        x,
        y,
        duration: 0.25,
        ease: "power2.out"
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [hoveredEp]);

  const filteredEpisodes = episodes.filter((ep) => {
    const matchCat = selectedCategory === "All" || ep.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchSearch =
      !q ||
      ep.title.toLowerCase().includes(q) ||
      ep.guest.name.toLowerCase().includes(q) ||
      ep.number.includes(q) ||
      ep.tags?.some((t) => t.toLowerCase().includes(q));
    return matchCat && matchSearch;
  });

  return (
    <>
      <section className="swiss-section episodes-swiss-section" data-section="ARCHIVE">
        <div className="swiss-gutter">
          <span className="gutter-num">002</span>
          <span className="gutter-label">CATALOGUE</span>
        </div>

        <div className="view-header-strip">
          <div className="view-top-meta">
            <span className="view-sub-label">002 // BROADCAST ARCHIVE</span>
            <span className="view-counter">{filteredEpisodes.length} EPISODES</span>
          </div>

          <div className="view-headline-row">
            <div>
              <h1 className="view-giant-headline">SELECTED WORK.</h1>
              <p className="view-lead-copy">
                Unscripted conversations navigating ambiguous loss, creative identity, somatic resilience, and the human condition.
              </p>
            </div>
          </div>

          {/* TOPIC FILTER PILLS & SEARCH */}
          <div className="ep-controls-bar">
            <div className="ep-cat-pills">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`swiss-pill ${selectedCategory === cat ? "active" : ""}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat.toUpperCase()}
                </button>
              ))}
            </div>

            <div className="ep-search-wrap">
              <input
                type="text"
                placeholder="SEARCH ARCHIVE..."
                className="swiss-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* EPISODES TABLE */}
          <div className="episodes-table-wrapper">
            <div className="ep-table-header">
              <div className="ep-col-num">NUMBER</div>
              <div className="ep-col-title">TITLE / GUEST</div>
              <div className="ep-col-cat">TOPIC</div>
              <div className="ep-col-dur">DURATION</div>
              <div className="ep-col-actions">ACTIONS</div>
            </div>

            <div className="ep-table-body">
              {filteredEpisodes.length === 0 ? (
                <div className="empty-state-swiss">
                  <h3>NO EPISODES FOUND</h3>
                  <p>Try searching for a different keyword or topic filter.</p>
                </div>
              ) : (
                filteredEpisodes.map((ep) => (
                  <div
                    key={ep.id}
                    className="ep-table-row cursor-pointer"
                    onMouseEnter={() => setHoveredEp(ep)}
                    onMouseLeave={() => setHoveredEp(null)}
                  >
                    <div className="ep-col-num">
                      <span className="ep-num-pill">#{ep.number}</span>
                    </div>

                    <div className="ep-col-title">
                      <h3 className="ep-row-title">{ep.title}</h3>
                      <span className="ep-row-guest">
                        <strong>{ep.guest.name}</strong> — {ep.guest.role}
                      </span>
                    </div>

                    <div className="ep-col-cat">
                      <span className="swiss-pill">{ep.category.toUpperCase()}</span>
                    </div>

                    <div className="ep-col-dur">
                      <span className="meta-dur">{ep.duration}</span>
                      <span className="meta-date">{ep.date}</span>
                    </div>

                    <div className="ep-col-actions" onClick={(e) => e.stopPropagation()}>
                      <button
                        className="btn-swiss-play"
                        onClick={() => playEpisode(ep)}
                        title="Play episode"
                      >
                        ▶ PLAY
                      </button>
                      <button
                        className="btn-swiss-notes"
                        onClick={() => setSelectedEpForModal(ep)}
                        title="View show notes & transcript"
                      >
                        NOTES ↗
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FLOATING HOVER PREVIEW CARD */}
      <div
        id="ep-hover-preview"
        ref={previewRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 9999,
          opacity: hoveredEp ? 1 : 0,
          transform: hoveredEp ? "scale(1)" : "scale(0.85)",
          transition: "opacity 0.2s ease, transform 0.2s ease"
        }}
      >
        {hoveredEp && (
          <div className="ep-hover-preview-card">
            <img
              src={hoveredEp.guest.avatar || "/assets/hero_meaningful_listening.jpg"}
              alt={hoveredEp.guest.name}
              className="ep-preview-card-img"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/assets/hero_meaningful_listening.jpg";
              }}
            />
            <div className="ep-preview-card-content">
              <span className="ep-preview-badge">EP // #{hoveredEp.number} • {hoveredEp.category}</span>
              <h4 className="ep-preview-guest">{hoveredEp.guest.name}</h4>
              <span className="ep-preview-role">{hoveredEp.guest.role}</span>
            </div>
          </div>
        )}
      </div>

      {/* SHOW NOTES MODAL */}
      {selectedEpForModal && (
        <div className="modal-wrapper" role="dialog" aria-modal="true">
          <div className="modal-backdrop" onClick={() => setSelectedEpForModal(null)}></div>
          <div className="modal-card">
            <div className="modal-header">
              <div>
                <span className="modal-tag">EPISODE #{selectedEpForModal.number} // ARCHIVE</span>
                <h2 className="modal-title">{selectedEpForModal.title}</h2>
              </div>
              <button
                className="modal-close-btn"
                onClick={() => setSelectedEpForModal(null)}
              >
                &times;
              </button>
            </div>

            <div className="modal-body">
              <div className="modal-guest-box">
                <img
                  src={selectedEpForModal.guest.avatar}
                  alt={selectedEpForModal.guest.name}
                  className="modal-guest-avatar"
                />
                <div>
                  <h3>{selectedEpForModal.guest.name}</h3>
                  <p className="modal-guest-role">{selectedEpForModal.guest.role}</p>
                  {selectedEpForModal.guest.bio && <p className="modal-guest-bio">{selectedEpForModal.guest.bio}</p>}
                </div>
              </div>

              <div className="modal-section">
                <h4>CONVERSATION SUMMARY</h4>
                <p>{selectedEpForModal.summary}</p>
              </div>

              {selectedEpForModal.takeaways && selectedEpForModal.takeaways.length > 0 && (
                <div className="modal-section">
                  <h4>KEY TAKEAWAYS</h4>
                  <ul className="modal-takeaways-list">
                    {selectedEpForModal.takeaways.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedEpForModal.transcript && selectedEpForModal.transcript.length > 0 && (
                <div className="modal-section">
                  <h4>DIALOGUE TRANSCRIPT HIGHLIGHTS</h4>
                  <div className="modal-transcript-flow">
                    {selectedEpForModal.transcript.map((line, i) => (
                      <div key={i} className="transcript-block">
                        <span className="t-time">{line.time}</span>
                        <strong className="t-speaker">{line.speaker}:</strong>
                        <span className="t-text">{line.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="modal-footer-actions">
                <button
                  className="btn-cms-primary"
                  onClick={() => {
                    playEpisode(selectedEpForModal);
                    setSelectedEpForModal(null);
                  }}
                >
                  ▶ LISTEN TO SESSION
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
