import React, { useState } from "react";
import { videoData } from "../data/videos.js";

export const Videos: React.FC = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const categories = ["All", "Full Episodes", "Clips & Highlights", "Behind The Scenes"];

  const filteredVideos = videoData.filter(
    (v: any) => activeTab === "All" || v.category === activeTab
  );

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-black">
      <section className="swiss-section" data-section="VIDEOS">
        <div className="swiss-gutter">
          <span className="gutter-num">006</span>
          <span className="gutter-label">STUDIO FEED</span>
        </div>

        <div className="view-header-strip">
          <span className="view-sub-label">006 // 4K VIDEO CHANNEL</span>
          <h1 className="view-giant-headline">WATCH CARE 2 LISTEN.</h1>
          <p className="view-lead-copy">
            Broadcast-grade 4K multicam video feeds, intimate soundstage interviews, and behind-the-scenes diaries.
          </p>

          {/* Studio Statistics Ribbon */}
          <div className="video-stats-ribbon">
            <div className="v-stat-cell">
              <span className="v-stat-val">52.4K</span>
              <span className="v-stat-lbl">SUBSCRIBERS</span>
            </div>
            <div className="v-stat-cell">
              <span className="v-stat-val">1.4M+</span>
              <span className="v-stat-lbl">LIFETIME VIEWS</span>
            </div>
            <div className="v-stat-cell">
              <span className="v-stat-val">4K UHD</span>
              <span className="v-stat-lbl">PRODUCTION</span>
            </div>
            <div className="v-stat-action-cell">
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-subscribe-yt"
              >
                SUBSCRIBE ON YOUTUBE ↗
              </a>
            </div>
          </div>

          {/* Video Category Pills */}
          <div className="filter-pills-row" style={{ margin: "24px 0" }}>
            {categories.map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`filter-pill-btn ${activeTab === t ? "active" : ""}`}
              >
                {t.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Videos Grid */}
          <div className="videos-swiss-grid">
            {filteredVideos.map((v: any) => (
              <div key={v.id} className="video-swiss-card">
                <div className="video-thumb-container">
                  <img src={v.thumbnail} alt={v.title} className="v-thumb" />
                  <span className="v-duration">{v.duration}</span>
                  <span className="v-cat-badge">{v.category.toUpperCase()}</span>
                  <button
                    onClick={() => setActiveVideoId(v.youtubeId)}
                    className="v-play-center"
                    aria-label={`Play ${v.title}`}
                  >
                    ▶
                  </button>
                </div>
                <div className="video-info-box">
                  <span className="v-views">
                    {v.views} • {v.date.toUpperCase()}
                  </span>
                  <h3 className="v-title">{v.title}</h3>
                  <p className="v-description">{v.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {activeVideoId && (
        <div className="modal-wrapper">
          <div className="modal-backdrop" onClick={() => setActiveVideoId(null)} />
          <div className="modal-card video-modal-card">
            <button
              className="modal-close-btn"
              onClick={() => setActiveVideoId(null)}
            >
              &times;
            </button>
            <div className="video-frame-wrap">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeVideoId}?autoplay=1&rel=0`}
                title="Care 2 Listen Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
