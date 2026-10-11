import React, { useState } from "react";
import { Link } from "react-router-dom";
import { guests } from "../data/guests.js";
import { episodes } from "../data/episodes";
import { useAudio } from "../context/AudioContext";
import { Search } from "lucide-react";

export const Guests: React.FC = () => {
  const { playEpisode } = useAudio();
  const [searchTerm, setSearchTerm] = useState("");

  const spotlight = guests.find((g: any) => g.spotlight) || guests[0];

  const filteredGuests = guests.filter((g: any) => {
    const q = searchTerm.toLowerCase().trim();
    return (
      !q ||
      g.name.toLowerCase().includes(q) ||
      g.topic.toLowerCase().includes(q) ||
      g.location.toLowerCase().includes(q)
    );
  });

  const handlePlayGuest = (epId: string) => {
    const ep = episodes.find((e: any) => e.id === epId);
    if (ep) {
      playEpisode(ep);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-black">
      <section className="swiss-section" data-section="GUESTS">
        <div className="swiss-gutter">
          <span className="gutter-num">007</span>
          <span className="gutter-label">ROSTER</span>
        </div>

        <div className="view-header-strip">
          <span className="view-sub-label">007 // VOICES THAT SHAPED OUR SHOW</span>
          <h1 className="view-giant-headline">GUEST ROSTER.</h1>
          <p className="view-lead-copy">
            Psychologists, poets, caregivers, and executives sharing unfiltered truths about healing and resilience.
          </p>

          {/* Spotlight Guest Card */}
          {spotlight && (
            <div className="guest-spotlight-card-swiss">
              <div className="spotlight-top-strip">
                <span>★ GUEST SPOTLIGHT OF THE MONTH</span>
                <span>AW / 26 // EPISODE #{spotlight.epId.replace("ep-", "")}</span>
              </div>

              <div className="spotlight-content-grid">
                <div className="spotlight-photo-frame">
                  <img src={spotlight.avatar} alt={spotlight.name} className="spotlight-photo" />
                </div>

                <div className="spotlight-info-pane">
                  <span className="spotlight-cat-tag">{spotlight.topic.toUpperCase()}</span>
                  <h2 className="spotlight-fullname">{spotlight.name.toUpperCase()}</h2>
                  <p className="spotlight-role-loc">
                    {spotlight.role} • {spotlight.location}
                  </p>

                  <blockquote className="spotlight-quote-large">
                    “{spotlight.quote}”
                  </blockquote>

                  <div className="spotlight-actions">
                    <button
                      onClick={() => handlePlayGuest(spotlight.epId)}
                      className="btn-spotlight-listen"
                    >
                      ▶ LISTEN TO {spotlight.name.toUpperCase()}'S EPISODE
                    </button>
                    <Link to="/become-a-guest" className="link-editorial-arrow">
                      Apply to Be a Guest ↗
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Search Bar */}
          <div className="search-cell" style={{ margin: "32px 0 24px" }}>
            <Search className="w-5 h-5 opacity-60 mr-2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="SEARCH GUESTS BY NAME, FIELD OF WORK, OR TOPIC..."
              className="swiss-search-input"
            />
          </div>

          <div className="guests-swiss-columns">
            {filteredGuests.map((g: any, i: number) => (
              <div key={g.id} className="guest-swiss-entry">
                <div className="guest-idx-strip">
                  <span>0{i + 1}</span>
                  <span>{g.location.toUpperCase()}</span>
                </div>
                <div className="guest-portrait-box">
                  <img src={g.avatar} alt={g.name} className="guest-photo" />
                </div>
                <h3 className="guest-entry-name">{g.name.toUpperCase()}</h3>
                <span className="guest-entry-role">{g.role}</span>
                <p className="guest-entry-quote">“{g.quote}”</p>
                <button
                  onClick={() => handlePlayGuest(g.epId)}
                  className="btn-guest-ep"
                >
                  LISTEN: {g.epTitle} ⟶
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
