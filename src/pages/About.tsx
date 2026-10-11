import React from "react";

export const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F4F1EA] text-black">
      <section className="swiss-section" data-section="ABOUT">
        <div className="swiss-gutter">
          <span className="gutter-num">002</span>
          <span className="gutter-label">ORIGIN</span>
        </div>

        <div className="view-header-strip">
          <span className="view-sub-label">002 // OUR ORIGIN STORY</span>
          <h1 className="view-giant-headline">THE STORY BEHIND CARE 2 LISTEN.</h1>
          <p className="view-lead-copy">
            Care 2 Listen started with a simple conviction: people don't need advice — they need to be heard. In a world full of algorithmic noise, we wanted to build something quieter. Something honest.
          </p>

          {/* Manifesto Split Block */}
          <div className="about-manifesto-grid">
            <div className="manifesto-left-copy">
              <h2 className="manifesto-callout">
                “WHAT BEGAN AS A LATE-NIGHT CONVERSATION BETWEEN TWO FRIENDS HAS GROWN INTO A GLOBAL AUDIO SANCTUARY.”
              </h2>
              <p className="manifesto-p">
                We're not therapists giving clinical lectures. We're not influencers selling productivity hacks. We are listeners — and we believe that empathetic listening is one of the most powerful and neglected forms of care in the modern world.
              </p>
              <p className="manifesto-p">
                Every week, guests from all walks of life sit down at our microphones in Seattle and Brooklyn to share what people usually keep quiet: grief, ambiguous loss, sibling estrangement, chronic illness, career rebirth, and the messy, beautiful reality of being human.
              </p>
            </div>

            <div className="manifesto-right-media">
              <div className="manifesto-photo-frame">
                <span className="crosshair-mark top-left">+</span>
                <span className="crosshair-mark top-right">+</span>
                <img
                  src="/assets/hero_editorial_model.jpg"
                  alt="Care 2 Listen studio ethos"
                  className="manifesto-img"
                />
                <div className="manifesto-caption">AW / 26 — SEATTLE SOUNDSTAGE ARCHIVE</div>
              </div>
            </div>
          </div>

          {/* Timeline Section */}
          <div className="timeline-section-swiss">
            <div className="section-title-bar">
              <span className="section-idx">01 // TIMELINE</span>
              <h3 className="section-heading-sm">MILESTONES IN MINDFUL LISTENING</h3>
            </div>

            <div className="timeline-swiss-list">
              <div className="timeline-entry">
                <div className="t-year">2022</div>
                <div className="t-content">
                  <strong>THE BASEMENT RECORDINGS (SEATTLE)</strong>
                  <p>Maya Lin and Marcus Vance record Episode #001 on two borrowed Shure mics in a basement apartment in Seattle.</p>
                </div>
              </div>
              <div className="timeline-entry">
                <div className="t-year">2023</div>
                <div className="t-content">
                  <strong>10,000 MONTHLY LISTENERS</strong>
                  <p>Episode #24 on caregiver burnout sparks international resonance, establishing our permanent weekly broadcast format.</p>
                </div>
              </div>
              <div className="timeline-entry">
                <div className="t-year">2025</div>
                <div className="t-content">
                  <strong>BROADCAST STUDIO LAUNCH & 4K VIDEO</strong>
                  <p>Constructed our permanent acoustic soundstage in Seattle's Market District and expanded into full 4K multicam video.</p>
                </div>
              </div>
              <div className="timeline-entry current-entry">
                <div className="t-year">2026</div>
                <div className="t-content">
                  <strong>108+ EPISODES & 30+ COUNTRIES</strong>
                  <p>Surpassed 50,000 monthly listeners and launched our 24/7 crisis support resource directory.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="values-section-swiss">
            <div className="section-title-bar">
              <span className="section-idx">02 // ETHOS</span>
              <h3 className="section-heading-sm">OUR FOUR CORE VALUES</h3>
            </div>

            <div className="values-quad-grid">
              <div className="val-card">
                <span className="val-num">01</span>
                <h4>EMPATHY FIRST</h4>
                <p>Every guest is treated with reverence and deep hospitality. No interruptions, no judgment.</p>
              </div>
              <div className="val-card highlight-val">
                <span className="val-num">02</span>
                <h4>UNFILTERED HONESTY</h4>
                <p>No corporate scripts, no toxic positivity. We lean into the unresolved, authentic spaces of life.</p>
              </div>
              <div className="val-card">
                <span className="val-num">03</span>
                <h4>INCLUSIVE SPACE</h4>
                <p>All backgrounds, all stories welcome. Healing expands when diverse voices hold the mic.</p>
              </div>
              <div className="val-card">
                <span className="val-num">04</span>
                <h4>COMMUNITY OVER CONTENT</h4>
                <p>We are building enduring human relationships that extend far beyond podcast algorithms.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
