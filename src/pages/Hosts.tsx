import React from "react";
import { hosts } from "../data/hosts";
import { episodes } from "../data/episodes";
import { useAudio } from "../context/AudioContext";

export const Hosts: React.FC = () => {
  const { playEpisode } = useAudio();

  const handlePlayFav = (epNumber: string) => {
    const ep = episodes.find((e) => e.number === String(epNumber) || e.number === `#${epNumber}`);
    if (ep) playEpisode(ep);
  };

  return (
    <section className="swiss-section" data-section="HOSTS">
      <div className="swiss-gutter">
        <span className="gutter-num">004</span>
        <span className="gutter-label">VOICES</span>
      </div>

      <div className="view-header-strip">
        <span className="view-sub-label">004 // MEET THE CO-HOSTS</span>
        <h1 className="view-giant-headline">MEET THE VOICES BEHIND THE MIC.</h1>
        <p className="view-lead-copy">
          Maya Lin and Marcus Vance bring clinical depth, investigative rigor, and deep human hospitality to the studio.
        </p>

        <div className="hosts-deep-grid">
          {hosts.map((h, idx) => (
            <div key={h.id || idx} className="host-profile-block">
              <div className="host-profile-header">
                <span className="host-num">0{idx + 1} // {h.pronouns.toUpperCase()}</span>
                <span className="host-location-spec">SEATTLE SOUNDSTAGE // 2026</span>
              </div>

              <div className="host-profile-split">
                <div className="host-photo-col">
                  <div className="host-frame">
                    <img src={h.avatar} alt={h.name} className="host-img-portrait" />
                    <span className="crosshair-mark top-right">+</span>
                  </div>
                </div>

                <div className="host-bio-col">
                  <h2 className="host-fullname">{h.name.toUpperCase()}</h2>
                  <span className="host-title-role">{h.title}</span>

                  <blockquote className="host-credo-quote">
                    “{h.quote}”
                  </blockquote>

                  <p className="host-full-bio-text">{h.bio}</p>

                  <div className="host-fav-episode-card">
                    <div className="fav-tag">FAVORITE EPISODE PICK</div>
                    <div className="fav-ep-title">
                      EP #{h.favoriteEpisode.epNumber} — “{h.favoriteEpisode.title}”
                    </div>
                    <p className="fav-reason">{h.favoriteEpisode.reason}</p>
                    <button
                      className="btn-play-fav"
                      onClick={() => handlePlayFav(h.favoriteEpisode.epNumber)}
                    >
                      ▶ PLAY EPISODE #{h.favoriteEpisode.epNumber}
                    </button>
                  </div>

                  <div className="host-trivia-section">
                    <h4 className="trivia-title">BEHIND THE SCENES RITUALS</h4>
                    <ul className="trivia-ul">
                      {h.funFacts.map((f, fIdx) => (
                        <li key={fIdx}>
                          <span className="bullet-cross">+</span> {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
