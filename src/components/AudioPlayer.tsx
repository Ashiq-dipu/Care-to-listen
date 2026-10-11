import React, { useState } from "react";
import { useAudio } from "../context/AudioContext";

function formatSeconds(sec: number): string {
  if (isNaN(sec) || sec < 0) return "00:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

export const AudioPlayer: React.FC = () => {
  const { currentEpisode, isPlaying, currentTime, duration, togglePlay, skip, seek } = useAudio();
  const [speed, setSpeed] = useState<number>(1);
  const [volume, setVolume] = useState<number>(0.85);

  if (!currentEpisode) return null;

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    seek(ratio * duration);
  };

  const handleSpeedToggle = () => {
    const speeds = [1, 1.25, 1.5, 2];
    const nextIdx = (speeds.indexOf(speed) + 1) % speeds.length;
    setSpeed(speeds[nextIdx]);
  };

  const guestObj = currentEpisode.guest && typeof currentEpisode.guest === "object" ? currentEpisode.guest : null;
  const guestName = (guestObj && guestObj.name) || (currentEpisode as any).guestName || "Guest Contributor";
  const avatarUrl = (guestObj && guestObj.avatar) || (currentEpisode as any).avatar || "/assets/hero_meaningful_listening.jpg";
  const epNumber = currentEpisode.number ? `Ep #${currentEpisode.number}` : "";

  return (
    <div id="global-player" className="global-player-bar" role="region" aria-label="Podcast Audio Player">
      <div className="player-inner-grid">
        {/* TRACK INFO */}
        <div className="player-track-info">
          <img
            id="player-cover"
            src={avatarUrl}
            alt={currentEpisode.title}
            className="player-thumb-img"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/assets/hero_meaningful_listening.jpg";
            }}
          />
          <div className="player-title-col">
            <div id="player-title" className="player-track-title" title={currentEpisode.title}>
              {currentEpisode.title}
            </div>
            <div id="player-guest" className="player-track-guest">
              {guestName} {epNumber && `• ${epNumber}`}
            </div>
          </div>
        </div>

        {/* CONTROLS & TIMELINE */}
        <div className="player-controls-col">
          <div className="player-buttons-row">
            <button
              id="player-skip-back"
              className="player-icon-btn"
              onClick={() => skip(-15)}
              aria-label="Rewind 15 seconds"
              title="Rewind 15s"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 4v6h6" />
                <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
              </svg>
            </button>

            <button
              id="player-toggle"
              className="btn btn-round player-play-toggle"
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause" : "Play"}
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              )}
            </button>

            <button
              id="player-skip-fwd"
              className="player-icon-btn"
              onClick={() => skip(30)}
              aria-label="Forward 30 seconds"
              title="Forward 30s"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M23 4v6h-6" />
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
              </svg>
            </button>

            <button
              id="player-speed-btn"
              className="speed-badge-btn"
              onClick={handleSpeedToggle}
              title="Playback speed"
            >
              {speed}x
            </button>
          </div>

          <div className="player-progress-row">
            <span id="player-current-time" className="time-stamp">
              {formatSeconds(currentTime)}
            </span>
            <div
              id="player-progress"
              className="progress-bar-track"
              onClick={handleProgressClick}
              role="progressbar"
              aria-valuenow={progressPercent}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                id="player-progress-fill"
                className="progress-fill"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span id="player-total-time" className="time-stamp">
              {formatSeconds(duration)}
            </span>
          </div>
        </div>

        {/* EXTRA ACTIONS */}
        <div className="player-extra-col">
          <div className="equalizer-anim-wrap" title="Audio Dynamics">
            <span className={`player-vis-bar ${isPlaying ? "animate-pulse" : ""}`} style={{ height: "40%" }} />
            <span className={`player-vis-bar ${isPlaying ? "animate-pulse" : ""}`} style={{ height: "80%" }} />
            <span className={`player-vis-bar ${isPlaying ? "animate-pulse" : ""}`} style={{ height: "100%" }} />
            <span className={`player-vis-bar ${isPlaying ? "animate-pulse" : ""}`} style={{ height: "60%" }} />
            <span className={`player-vis-bar ${isPlaying ? "animate-pulse" : ""}`} style={{ height: "30%" }} />
          </div>

          <div className="volume-control-wrap">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
            <input
              type="range"
              id="player-volume"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="volume-slider"
              title="Volume Slider"
            />
          </div>

          {currentEpisode.spotifyUrl && (
            <a
              href={currentEpisode.spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="speed-badge-btn"
              title="Open in Spotify"
              style={{ textDecoration: "none" }}
            >
              SPOTIFY ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
