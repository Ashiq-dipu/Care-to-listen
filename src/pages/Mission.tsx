import React from "react";

export const Mission: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F4F1EA] text-black">
      <section className="swiss-section" data-section="MISSION">
        <div className="swiss-gutter">
          <span className="gutter-num">003</span>
          <span className="gutter-label">PURPOSE</span>
        </div>

        <div className="view-header-strip">
          <span className="view-sub-label">003 // OUR NORTH STAR</span>
          <h1 className="view-giant-headline">OUR MISSION.</h1>

          {/* Big Mission Statement */}
          <div className="mission-statement-card">
            <p className="mission-giant-quote">
              “TO CREATE A SAFE SPACE WHERE PEOPLE FEEL TRULY HEARD — AND TO REMIND THE WORLD THAT LISTENING IS ONE OF THE MOST POWERFUL FORMS OF CARE.”
            </p>
          </div>

          {/* Impact Stats Grid */}
          <div className="impact-stats-grid">
            <div className="impact-stat-box">
              <span className="stat-giant-num">108+</span>
              <span className="stat-unit-lbl">EPISODES RELEASED</span>
            </div>
            <div className="impact-stat-box highlight-stat">
              <span className="stat-giant-num">50K+</span>
              <span className="stat-unit-lbl">MONTHLY LISTENERS</span>
            </div>
            <div className="impact-stat-box">
              <span className="stat-giant-num">30+</span>
              <span className="stat-unit-lbl">COUNTRIES REACHED</span>
            </div>
            <div className="impact-stat-box">
              <span className="stat-giant-num">100%</span>
              <span className="stat-unit-lbl">LISTENER SUPPORTED</span>
            </div>
          </div>

          {/* The 4 Mission Pillars */}
          <div className="pillars-section-swiss">
            <div className="section-title-bar">
              <span className="section-idx">PILLARS // 04</span>
              <h3 className="section-heading-sm">FOUR PILLARS GUIDING EVERY RECORDING</h3>
            </div>

            <div className="pillars-quad-grid">
              <div className="pillar-box">
                <span className="p-index">01</span>
                <h3 className="p-title">BREAK THE STIGMA</h3>
                <p className="p-desc">
                  Normalize open, honest dialogues around mental health, depression, loss, and trauma without sensationalism or shame.
                </p>
              </div>
              <div className="pillar-box">
                <span className="p-index">02</span>
                <h3 className="p-title">AMPLIFY UNHEARD VOICES</h3>
                <p className="p-desc">
                  Provide a high-production broadcast platform for caregivers, survivors, and neurodivergent storytellers who are often overlooked.
                </p>
              </div>
              <div className="pillar-box">
                <span className="p-index">03</span>
                <h3 className="p-title">BUILD GENUINE COMMUNITY</h3>
                <p className="p-desc">
                  Transform isolated digital listeners into an active, compassionate network rooted in mutual empathy and vulnerability.
                </p>
              </div>
              <div className="pillar-box">
                <span className="p-index">04</span>
                <h3 className="p-title">PRACTICAL EMPOWERMENT</h3>
                <p className="p-desc">
                  Anchor personal stories in practical, certified mental health resources, vetted literature, and verified crisis helplines.
                </p>
              </div>
            </div>
          </div>

          {/* Ethical Pledge Banner */}
          <div className="ethical-pledge-banner">
            <h4 className="pledge-title">THE CARE 2 LISTEN ETHICAL BROADCAST PLEDGE</h4>
            <p className="pledge-text">
              We pledge to never exploit personal trauma for viral engagement. Every guest maintains editorial agency over their story, receives a pre-broadcast preview cut, and can pause or redact sensitive audio without hesitation.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
