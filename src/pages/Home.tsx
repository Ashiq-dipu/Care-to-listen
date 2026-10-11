import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { episodes } from "../data/episodes";
import { useAudio } from "../context/AudioContext";

export const Home: React.FC = () => {
  const { playEpisode } = useAudio();
  const latestEp = episodes[0] || { number: "108", title: "Latest Episode" };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const listeningImg = document.querySelector(".hero-img-listening") as HTMLElement | null;
      const studioImg = document.querySelector(".hero-img-studio") as HTMLElement | null;
      const tag = document.querySelector("#hero-studio-tag") as HTMLElement | null;

      if (listeningImg && studioImg) {
        if (scrollY > 120) {
          listeningImg.style.opacity = "0";
          studioImg.style.opacity = "1";
          if (tag) tag.textContent = "AW / 26 — SOUNDSTAGE B";
        } else {
          listeningImg.style.opacity = "1";
          studioImg.style.opacity = "0";
          if (tag) tag.textContent = "AW / 26 — STUDIO 01";
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* SECTION 001: HERO SECTION WITH SCROLL-DRIVEN IMAGE SWITCH */}
      <section className="swiss-section hero-swiss-section" data-section="001">
        <div className="swiss-gutter">
          <span className="gutter-num">001</span>
          <span className="gutter-dash">-001</span>
        </div>

        <div className="swiss-hero-grid">
          <div className="hero-left-col">
            <div className="hero-title-group">
              <h1 className="hero-giant-title">
                STORIES<br />
                MADE<br />
                <span className="text-vermilion">HEALING.</span>
              </h1>

              <div className="hero-dash-rule">
                <span className="dash-text">-001</span>
                <span className="dash-line"></span>
              </div>
            </div>

            <div className="hero-lead-group">
              <p className="hero-editorial-bio">
                An independent audio sanctuary shaping honest conversations, digital experiences, and visual culture.
              </p>

              <div className="hero-meta-block">
                <span className="meta-label">SELECTED WORK / 2026</span>
                <span className="meta-tags">SOMATIC · GRIEF · IDENTITY · HUMAN CONDITION</span>
              </div>

              <div className="hero-actions-row">
                <Link to="/episodes" className="link-editorial-arrow">
                  View Selected Work ↘
                </Link>
                <button
                  onClick={() => episodes[0] && playEpisode(episodes[0])}
                  className="btn-editorial-pill"
                >
                  <span className="play-triangle">▶</span>
                  <span>Listen to Latest (Ep #{latestEp.number})</span>
                </button>
              </div>
            </div>
          </div>

          <div className="hero-right-cover">
            <div className="collage-top-bar">
              <span className="crosshair-mark">+</span>
              <span className="studio-tag" id="hero-studio-tag">
                AW / 26 — STUDIO 01
              </span>
              <span className="crosshair-mark right-mark">+</span>
            </div>

            <div className="hero-cover-visual">
              <div className="hero-cover-img-wrap">
                <img
                  src="/assets/hero_meaningful_listening.jpg"
                  alt="Care 2 Listen empathetic dialogue"
                  className="hero-cover-img hero-img-listening"
                  style={{ transition: "opacity 0.25s ease" }}
                />
                <img
                  src="/assets/hero_studio_wide.jpg"
                  alt="Care 2 Listen studio soundstage"
                  className="hero-cover-img hero-img-studio"
                  style={{ opacity: 0, transition: "opacity 0.25s ease" }}
                />
              </div>
              <div className="hero-yellow-strip"></div>

              <div className="hero-cover-coords">
                <span className="coord-text">
                  47.6062° N<br />122.3321° W
                </span>
                <span className="crosshair-mark">+</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 002: MANIFESTO & PROCESS */}
      <section className="swiss-section manifesto-swiss-section" data-section="002">
        <div className="swiss-gutter">
          <span className="gutter-num">002</span>
        </div>

        <div className="manifesto-inner-grid">
          <div className="manifesto-headline-col">
            <h2 className="manifesto-giant-headline">
              WE CREATE IDENTITIES /<br />
              DIGITAL EXPERIENCES /<br />
              VISUAL CULTURE /<br />
              HONEST CONVERSATIONS.
            </h2>
          </div>

          <div className="manifesto-desc-col">
            <p className="manifesto-desc-text">
              Care 2 Listen operates as a weekly sonic laboratory exploring grief, healing, trauma, and identity. We believe listening is an intentional craft — stripping away corporate gloss to reveal raw human truths.
            </p>
            <Link to="/about" className="link-editorial-arrow" style={{ marginTop: 20, display: "inline-block" }}>
              Our Complete Philosophy ↗
            </Link>
          </div>

          <div className="manifesto-process-bar">
            <div className="process-col">
              <span className="p-step-num">01 / INTAKE</span>
              <p className="p-step-desc">Identifying unresolved narratives through confidential community submissions.</p>
            </div>
            <div className="process-col">
              <span className="p-step-num">02 / DIALOGUE</span>
              <p className="p-step-desc">Unscripted studio sessions in Seattle and Brooklyn with zero corporate filters.</p>
            </div>
            <div className="process-col">
              <span className="p-step-num">03 / HARMONY</span>
              <p className="p-step-desc">Binaural spatial mastering designed for intimate headphone contemplation.</p>
            </div>
            <div className="process-col">
              <span className="p-step-num">04 / DISPATCH</span>
              <p className="p-step-desc">Weekly worldwide broadcast accompanied by clinical toolkits and crisis support.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 003: 4 EDITORIAL VERTICAL COLUMNS */}
      <section className="swiss-section columns-swiss-section" data-section="003">
        <div className="swiss-gutter">
          <span className="gutter-num">003</span>
        </div>

        <div className="columns-quad-grid">
          {/* COL 01: ARCHIVE */}
          <div className="quad-col col-archive">
            <div className="col-head">
              <span className="col-idx">01</span>
              <span className="col-label">ARCHIVE // {episodes.length} EPS</span>
            </div>
            <div className="col-media-frame">
              <img src="/assets/card_01_arch.jpg" alt="Episode Archive" className="col-img" />
            </div>
            <div className="col-content">
              <h3 className="col-title">DEEP CATALOGUE</h3>
              <p className="col-copy">Over 108 recorded hours spanning ambiguous loss, somatic regulation, and creative resurrection.</p>
              <Link to="/episodes" className="col-action-link">Explore Episodes ⟶</Link>
            </div>
          </div>

          {/* COL 02: GUESTS (COBALT BLUE CARD) */}
          <div className="quad-col col-blue">
            <div className="col-head">
              <span className="col-idx">02</span>
              <span className="col-label">VOICES // 2026</span>
            </div>
            <div className="col-media-frame">
              <img src="/assets/card_02_aura.jpg" alt="Guests spotlight" className="col-img" />
            </div>
            <div className="col-content">
              <h3 className="col-title text-white">GUEST ROSTER</h3>
              <p className="col-copy text-white-dim">Psychologists, poets, somatic healers, and everyday people with extraordinary courage.</p>
              <Link to="/guests" className="col-action-link link-white">Meet The Guests ⟶</Link>
            </div>
          </div>

          {/* COL 03: MISSION (VERMILION RED CARD) */}
          <div className="quad-col col-vermilion">
            <div className="col-head">
              <span className="col-idx">03</span>
              <span className="col-label">PLEDGE // 24/7</span>
            </div>
            <div className="col-media-frame">
              <img src="/assets/card_03_cutout.jpg" alt="Our Mission" className="col-img" />
            </div>
            <div className="col-content">
              <h3 className="col-title text-white">ETHICAL CARE</h3>
              <p className="col-copy text-white-dim">A radical pledge to never sensationalize trauma or exploit human vulnerability for algorithms.</p>
              <Link to="/mission" className="col-action-link link-white">Read Our Mission ⟶</Link>
            </div>
          </div>

          {/* COL 04: STUDIO/HOSTS (ACID YELLOW CARD) */}
          <div className="quad-col col-hosts">
            <div className="col-head">
              <span className="col-idx">04</span>
              <span className="col-label">SOUNDSTAGE</span>
            </div>
            <div className="col-media-frame">
              <img src="/assets/card_04_zine.jpg" alt="Soundstage & Hosts" className="col-img" />
            </div>
            <div className="col-content">
              <h3 className="col-title">THE HOSTS</h3>
              <p className="col-copy">Maya Lin and Marcus Vance bring clinical nuance and investigative warmth to the broadcast desk.</p>
              <Link to="/hosts" className="col-action-link">Meet Hosts ⟶</Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 004: FULL-BLEED SLOGAN STRIP */}
      <section className="swiss-section banner-swiss-section" data-section="004">
        <div className="swiss-gutter dark-gutter">
          <span className="gutter-num" style={{ color: "#fff" }}>004</span>
        </div>

        <div className="banner-slogan-wrap">
          <div className="banner-slogan-top">
            <span className="banner-giant-text">
              LISTEN ─ HEAL ─ GROW ─ CARE 2 LISTEN ─ LISTEN ─ HEAL ─ GROW
            </span>
          </div>
          <div className="banner-sub-meta">
            <span>BROADCAST SOUNDSTAGE // SEATTLE WA 98101</span>
            <span>DUMBO BROOKLYN 11201</span>
            <span>{episodes.length} EPISODES RELEASED // 24/7 CRISIS SUPPORT</span>
          </div>
        </div>
      </section>

      {/* SECTION 005: CALL TO ACTION */}
      <section className="swiss-section cta-swiss-section" data-section="005">
        <div className="swiss-gutter">
          <span className="gutter-num">005</span>
        </div>

        <div className="cta-inner-grid">
          <div className="cta-portrait-col">
            <span className="crosshair-mark">+</span>
            <img src="/assets/card_05_bw.jpg" alt="Studio Soundstage Portrait" className="cta-bw-img" />
            <div className="portrait-caption">STUDIO DESK // 2026</div>
          </div>

          <div className="cta-lead-col">
            <span className="cta-mini-label">HAVE A STORY TO SHARE?</span>
            <h2 className="cta-headline">
              LET'S BUILD<br />
              SOMETHING<br />
              EXTRAORDINARY<br />
              TOGETHER.
            </h2>
            <Link to="/become-a-guest" className="link-start-project">
              Apply to Be a Guest on Care 2 Listen ↗
            </Link>
          </div>

          <div className="cta-info-col">
            <div className="info-block">
              <span className="info-lbl">SEATTLE STUDIO (PRIMARY)</span>
              <p className="info-val">Pike Place Soundstage<br />Seattle, WA 98101</p>
            </div>

            <div className="info-block">
              <span className="info-lbl">BROOKLYN SOUNDSTAGE</span>
              <p className="info-val">DUMBO Water Street<br />Brooklyn, NY 11201</p>
            </div>

            <div className="info-block">
              <span className="info-lbl">COMMUNITY PROPOSALS</span>
              <p className="info-val">
                <Link to="/request-episode" style={{ textDecoration: "underline", color: "var(--color-vermilion)" }}>
                  Pitch an Episode to Curators ↗
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
