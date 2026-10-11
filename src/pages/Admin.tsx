import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Episode,
  episodes,
  categories,
  saveEpisode,
  deleteEpisode,
  resetToDefaultEpisodes,
  exportEpisodesJSON,
  importEpisodesJSON
} from "../data/episodes";
import {
  EpisodeSubmission,
  submissions,
  setSubmissionStatus,
  deleteSubmission
} from "../data/submissions";
import { useAudio } from "../context/AudioContext";

const AVATAR_PRESETS = [
  { name: "Elena (Somatic / Clinical)", url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80" },
  { name: "Julian (Founder / Tech)", url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80" },
  { name: "Amara (Advocate / Poet)", url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80" },
  { name: "Kiran & David (Family)", url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80" },
  { name: "Hannah (Caregiver)", url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80" },
  { name: "Tariq (Recovery Counselor)", url: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80" }
];

export const Admin: React.FC = () => {
  const { playEpisode } = useAudio();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem("care2listen_admin_auth") === "true";
  });
  const [passcode, setPasscode] = useState("");
  const [showPasscode, setShowPasscode] = useState(false);
  const [authError, setAuthError] = useState(false);

  const [activeTab, setActiveTab] = useState<"episodes" | "submissions">("episodes");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCat, setSelectedCat] = useState("All");
  const [subFilter, setSubFilter] = useState<"all" | "pending" | "approved" | "declined">("all");

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Editor Modal state
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingEp, setEditingEp] = useState<Partial<Episode> | null>(null);
  const [originSubId, setOriginSubId] = useState<string | null>(null);

  // Form Fields
  const [formNum, setFormNum] = useState("");
  const [formTitle, setFormTitle] = useState("");
  const [formCat, setFormCat] = useState("Mental Health");
  const [formDur, setFormDur] = useState("50 min");
  const [formDate, setFormDate] = useState("");
  const [formGuestName, setFormGuestName] = useState("");
  const [formGuestRole, setFormGuestRole] = useState("");
  const [formGuestAvatar, setFormGuestAvatar] = useState(AVATAR_PRESETS[0].url);
  const [formGuestBio, setFormGuestBio] = useState("");
  const [formSummary, setFormSummary] = useState("");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const val = passcode.trim().toLowerCase();
    if (val === "admin2026" || val === "admin" || val === "c2ladmin") {
      sessionStorage.setItem("care2listen_admin_auth", "true");
      setIsAuthenticated(true);
      setAuthError(false);
      showToast("✓ Administrator authenticated. Welcome to Studio CMS.");
    } else {
      setAuthError(true);
      showToast("✕ Access denied: Incorrect passcode.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("care2listen_admin_auth");
    setIsAuthenticated(false);
    showToast("🔒 Admin session locked.");
  };

  const openEditor = (epToEdit: Episode | null = null, fromSubId: string | null = null) => {
    setOriginSubId(fromSubId);
    if (epToEdit) {
      setEditingEp(epToEdit);
      setFormNum(epToEdit.number);
      setFormTitle(epToEdit.title);
      setFormCat(epToEdit.category || "Mental Health");
      setFormDur(epToEdit.duration || "50 min");
      setFormDate(epToEdit.date || "");
      setFormGuestName(epToEdit.guest.name);
      setFormGuestRole(epToEdit.guest.role);
      setFormGuestAvatar(epToEdit.guest.avatar);
      setFormGuestBio(epToEdit.guest.bio || "");
      setFormSummary(epToEdit.summary || "");
    } else {
      const nextNum = String(Math.max(...episodes.map(e => parseInt(e.number, 10) || 0), 100) + 1);
      setEditingEp(null);
      setFormNum(nextNum);
      setFormTitle("");
      setFormCat("Mental Health");
      setFormDur("52 min");
      setFormDate(new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }));
      setFormGuestName("");
      setFormGuestRole("");
      setFormGuestAvatar(AVATAR_PRESETS[0].url);
      setFormGuestBio("");
      setFormSummary("");
    }
    setIsEditorOpen(true);
  };

  const handleSaveEpisode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formNum || !formTitle || !formGuestName) {
      showToast("✕ Please enter all required fields.");
      return;
    }

    const payload: Episode = {
      id: editingEp?.id || `ep-${formNum}`,
      number: formNum,
      title: formTitle,
      category: formCat,
      duration: formDur,
      date: formDate,
      guest: {
        name: formGuestName,
        role: formGuestRole || "Guest",
        avatar: formGuestAvatar,
        bio: formGuestBio
      },
      summary: formSummary,
      tags: [formCat, "Broadcast"]
    };

    await saveEpisode(payload);

    if (originSubId) {
      await setSubmissionStatus(originSubId, "approved");
      setOriginSubId(null);
    }

    setIsEditorOpen(false);
    showToast(`✓ Episode #${formNum} saved to archive!`);
  };

  const handleApproveSubmission = async (sub: EpisodeSubmission) => {
    const nextNum = String(Math.max(...episodes.map(e => parseInt(e.number, 10) || 0), 100) + 1);
    const newEp: Episode = {
      id: `ep-${nextNum}`,
      number: nextNum,
      title: sub.title || `Special Session with ${sub.guestName}`,
      category: sub.category || "Mental Health",
      duration: "48 min",
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
      guest: {
        name: sub.guestName,
        role: sub.guestRole || "Guest Contributor",
        avatar: sub.guestAvatar || AVATAR_PRESETS[0].url,
        bio: sub.guestBio || ""
      },
      summary: sub.summary || "",
      tags: [sub.category || "Mental Health", "Community"],
      takeaways: sub.takeaways || []
    };

    await saveEpisode(newEp);
    await setSubmissionStatus(sub.id, "approved");
    showToast(`✓ Proposal from ${sub.guestName} approved & published as Episode #${nextNum}!`);
  };

  const pendingCount = submissions.filter(s => s.status === "pending").length;

  if (!isAuthenticated) {
    return (
      <section className="swiss-section admin-gate-section" data-section="AUTH">
        <div className="swiss-gutter">
          <span className="gutter-num">000</span>
          <span className="gutter-label">SECURITY</span>
        </div>

        <div className="admin-gate-wrapper">
          <div className="admin-gate-grid">
            {/* CARD 1: ADMIN LOGIN */}
            <div className="admin-gate-card">
              <div className="admin-gate-top">
                <span className="admin-security-tag">
                  <span className="rec-blink-dot" style={{ background: "var(--color-vermilion)" }}></span> RESTRICTED CONSOLE // ADMIN ONLY
                </span>
                <span className="admin-sys-time">SYS/AUTH 2026</span>
              </div>

              <div className="admin-gate-headline-area">
                <h1 className="admin-gate-title">STUDIO ARCHIVE GATE.</h1>
                <p className="admin-gate-desc">
                  Administrative authorization is required to access the broadcast studio, publish new episodes, and approve guest submissions.
                </p>
              </div>

              <form onSubmit={handleLogin} className="admin-gate-form">
                <div className="form-group" style={{ marginBottom: 14 }}>
                  <label htmlFor="admin-passcode" className="form-label" style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", fontWeight: 700, marginBottom: 6, display: "block" }}>
                    ADMINISTRATOR PASSCODE *
                  </label>
                  <div className="passcode-input-wrap">
                    <input
                      type={showPasscode ? "text" : "password"}
                      id="admin-passcode"
                      className="form-input form-input-mono"
                      placeholder="ENTER PASSCODE..."
                      required
                      value={passcode}
                      onChange={(e) => setPasscode(e.target.value)}
                      style={{ border: "1px solid var(--border-black)", padding: "12px 14px", fontFamily: "var(--font-mono)", fontSize: "0.95rem" }}
                    />
                    <button
                      type="button"
                      className="btn-toggle-eye"
                      onClick={() => setShowPasscode(!showPasscode)}
                    >
                      {showPasscode ? "HIDE" : "SHOW"}
                    </button>
                  </div>
                </div>

                {authError && (
                  <div className="admin-error-box">
                    <span className="error-icon">✕</span> ACCESS DENIED: Invalid administrator passcode.
                  </div>
                )}

                <div className="admin-gate-actions">
                  <button type="submit" className="btn-cms-primary" style={{ width: "100%", justifyContent: "center" }}>
                    UNLOCK STUDIO CONSOLE ⟶
                  </button>
                  <Link to="/episodes" className="btn-cms-secondary" style={{ width: "100%", textAlign: "center", justifyContent: "center", textDecoration: "none" }}>
                    RETURN TO PUBLIC EPISODES ↗
                  </Link>
                </div>
              </form>

              <div className="admin-gate-hint-box">
                <span className="hint-label">DEFAULT ACCESS CREDENTIAL:</span>
                <span className="hint-code">admin2026</span>
                <span className="hint-sub">(Or "admin")</span>
              </div>
            </div>

            {/* CARD 2: VISITOR / GUEST EPISODE PITCH CARD */}
            <div className="admin-gate-card admin-gate-guest-card">
              <div className="admin-gate-top">
                <span className="admin-security-tag" style={{ color: "var(--color-vermilion)" }}>
                  <span className="rec-blink-dot" style={{ background: "var(--color-vermilion)" }}></span> VISITOR / GUEST ACCESS // OPEN PORTAL
                </span>
                <span className="admin-sys-time">OPEN CALL 2026</span>
              </div>

              <div className="admin-gate-headline-area">
                <h2 className="admin-gate-title">REQUEST AN EPISODE.</h2>
                <p className="admin-gate-desc">
                  Are you a researcher, survivor, clinician, or thinker with an unscripted story? Submit your episode proposal directly to our editorial curatorial board.
                </p>
              </div>

              <ul className="guest-card-points">
                <li>
                  <strong>01 // Direct Editorial Pitch:</strong>
                  <span>Submit episode synopsis, custom narrative angle, and somatic takeaways.</span>
                </li>
                <li>
                  <strong>02 // Curatorial Review:</strong>
                  <span>Our editorial team reviews all submissions directly within the Studio Approval Queue.</span>
                </li>
                <li>
                  <strong>03 // Broadcast Release:</strong>
                  <span>Approved episodes are instantly converted into full archive releases and published.</span>
                </li>
              </ul>

              <div className="admin-gate-actions" style={{ marginTop: "auto" }}>
                <Link
                  to="/request-episode"
                  className="btn-cms-primary"
                  style={{ width: "100%", justifyContent: "center", textDecoration: "none", textAlign: "center" }}
                >
                  + REQUEST / PITCH AN EPISODE ⟶
                </Link>
                <Link
                  to="/become-a-guest"
                  className="btn-cms-secondary"
                  style={{ width: "100%", justifyContent: "center", textDecoration: "none", textAlign: "center" }}
                >
                  GUEST PARTICIPATION INFO ↗
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Filtered views
  const filteredEpisodes = episodes.filter((ep) => {
    const matchCat = selectedCat === "All" || ep.category === selectedCat;
    const q = searchQuery.toLowerCase().trim();
    const matchSearch =
      !q ||
      ep.title.toLowerCase().includes(q) ||
      ep.guest.name.toLowerCase().includes(q) ||
      ep.number.includes(q);
    return matchCat && matchSearch;
  });

  const filteredSubs = submissions.filter((s) => {
    if (subFilter === "all") return true;
    return s.status === subFilter;
  });

  return (
    <>
      <section className="swiss-section cms-dashboard-section" data-section="CMS">
        <div className="swiss-gutter">
          <span className="gutter-num">007</span>
          <span className="gutter-label">STUDIO CMS</span>
        </div>

        <div className="view-header-strip cms-header-strip">
          <div className="cms-top-breadcrumbs">
            <span className="view-sub-label">007 // BROADCAST MANAGEMENT STUDIO</span>
            <div className="admin-auth-status-cluster">
              <span className="live-sync-indicator"><span className="rec-blink-dot"></span> LIVE SYNC ACTIVE</span>
              <span className="admin-badge-active"><span className="auth-dot"></span> ADMIN: AUTHORIZED</span>
              <button onClick={handleLogout} className="btn-admin-lock" title="Lock admin console">
                LOCK CONSOLE ✕
              </button>
            </div>
          </div>

          <div className="cms-headline-row">
            <div>
              <h1 className="view-giant-headline">EPISODES STUDIO.</h1>
              <p className="view-lead-copy">
                Manage published episodes, curate guest audio pitches, review unscripted session proposals, and publish directly to the live archive.
              </p>
            </div>
            <div className="cms-primary-cta-group">
              <button onClick={() => openEditor(null)} className="btn-cms-primary">
                <span className="plus-sign">+</span> PUBLISH NEW EPISODE
              </button>
              <Link to="/episodes" className="btn-cms-secondary">
                VIEW ARCHIVE ↗
              </Link>
            </div>
          </div>

          {/* VIEW SWITCHER */}
          <div className="cms-view-switcher-bar">
            <button
              className={`cms-view-tab-btn ${activeTab === "episodes" ? "active" : ""}`}
              onClick={() => setActiveTab("episodes")}
            >
              01 // EPISODES ARCHIVE ({episodes.length})
            </button>
            <button
              className={`cms-view-tab-btn ${activeTab === "submissions" ? "active" : ""}`}
              onClick={() => setActiveTab("submissions")}
            >
              02 // GUEST SUBMISSION APPROVALS
              <span className="cms-sub-badge-count" style={{ background: pendingCount === 0 ? "#166534" : "var(--color-vermilion)" }}>
                {pendingCount} PENDING
              </span>
            </button>
          </div>

          {/* TAB 1: EPISODES ARCHIVE */}
          {activeTab === "episodes" && (
            <div>
              <div className="cms-stats-grid">
                <div className="cms-stat-box">
                  <span className="cms-stat-num">{episodes.length}</span>
                  <span className="cms-stat-lbl">TOTAL EPISODES</span>
                </div>
                <div className="cms-stat-box">
                  <span className="cms-stat-num">108h 40m</span>
                  <span className="cms-stat-lbl">TOTAL AUDIO ARCHIVE</span>
                </div>
                <div className="cms-stat-box">
                  <span className="cms-stat-num">{categories.length - 1}</span>
                  <span className="cms-stat-lbl">ACTIVE TOPICS</span>
                </div>
                <div className="cms-stat-box highlight-stat">
                  <span className="cms-stat-num">{episodes.filter(e => e.featured).length}</span>
                  <span className="cms-stat-lbl">FEATURED STORIES</span>
                </div>
              </div>

              <div className="cms-toolbar">
                <div className="cms-search-box">
                  <span className="search-icon">🔍</span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="SEARCH EPISODES BY TITLE, GUEST..."
                    className="swiss-search-input"
                  />
                </div>

                <div className="cms-toolbar-actions">
                  <div className="sort-select-box">
                    <label className="sort-lbl">TOPIC:</label>
                    <select
                      className="swiss-select"
                      value={selectedCat}
                      onChange={(e) => setSelectedCat(e.target.value)}
                    >
                      {categories.map((c) => (
                        <option key={c} value={c}>{c.toUpperCase()}</option>
                      ))}
                    </select>
                  </div>

                  <button
                    className="btn-swiss-notes"
                    onClick={() => {
                      const dataStr = exportEpisodesJSON();
                      const blob = new Blob([dataStr], { type: "application/json" });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.href = url;
                      a.download = `care2listen-episodes-${new Date().toISOString().slice(0, 10)}.json`;
                      a.click();
                      showToast("✓ Backup JSON downloaded!");
                    }}
                  >
                    EXPORT JSON ↓
                  </button>

                  <button
                    className="btn-cms-danger"
                    onClick={async () => {
                      if (confirm("Reset archive to factory demo episodes?")) {
                        await resetToDefaultEpisodes();
                        showToast("↺ Restored factory demo episodes.");
                      }
                    }}
                  >
                    RESET DEFAULTS ↺
                  </button>
                </div>
              </div>

              <div className="cms-table-wrapper">
                <div className="cms-table">
                  <div className="cms-table-head">
                    <div className="cms-cell-idx">INDEX</div>
                    <div className="cms-cell-thumb">ARTWORK</div>
                    <div className="cms-cell-title">EPISODE / GUEST INFORMATION</div>
                    <div className="cms-cell-cat">TOPIC</div>
                    <div className="cms-cell-meta">DURATION / DATE</div>
                    <div className="cms-cell-act">ACTIONS</div>
                  </div>

                  <div className="cms-table-rows">
                    {filteredEpisodes.map((ep) => (
                      <div key={ep.id} className="cms-row">
                        <div className="cms-cell-idx">
                          <span className="cms-idx-pill">EP // {ep.number}</span>
                        </div>
                        <div className="cms-cell-thumb">
                          <div className="cms-thumb-box">
                            <img src={ep.guest?.avatar} alt={ep.guest?.name} className="cms-thumb-img" />
                          </div>
                        </div>
                        <div className="cms-cell-title">
                          <strong className="cms-ep-title">{ep.title}</strong>
                          <span className="cms-guest-line">
                            <strong>{ep.guest?.name}</strong> — {ep.guest?.role}
                          </span>
                        </div>
                        <div className="cms-cell-cat">
                          <span className="swiss-pill">{ep.category.toUpperCase()}</span>
                        </div>
                        <div className="cms-cell-meta">
                          <span className="meta-dur">{ep.duration}</span>
                          <span className="meta-date">{ep.date}</span>
                        </div>
                        <div className="cms-cell-act">
                          <button className="btn-cms-edit" onClick={() => openEditor(ep)}>
                            EDIT ✎
                          </button>
                          <button className="btn-swiss-play" onClick={() => playEpisode(ep)}>
                            ▶
                          </button>
                          <button
                            className="btn-cms-del"
                            onClick={async () => {
                              if (confirm(`Delete episode #${ep.number}?`)) {
                                await deleteEpisode(ep.id);
                                showToast(`✓ Episode #${ep.number} removed.`);
                              }
                            }}
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: GUEST SUBMISSION APPROVALS */}
          {activeTab === "submissions" && (
            <div>
              <div className="cms-toolbar" style={{ marginBottom: 24 }}>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", fontWeight: 700, color: "#555" }}>
                    FILTER STATUS:
                  </span>
                  <button
                    className={`btn-swiss-notes ${subFilter === "all" ? "active" : ""}`}
                    onClick={() => setSubFilter("all")}
                    style={subFilter === "all" ? { background: "#0d0d0d", color: "#fff" } : {}}
                  >
                    ALL ({submissions.length})
                  </button>
                  <button
                    className={`btn-swiss-notes ${subFilter === "pending" ? "active" : ""}`}
                    onClick={() => setSubFilter("pending")}
                    style={subFilter === "pending" ? { background: "#0d0d0d", color: "#fff" } : {}}
                  >
                    PENDING ({pendingCount})
                  </button>
                  <button
                    className={`btn-swiss-notes ${subFilter === "approved" ? "active" : ""}`}
                    onClick={() => setSubFilter("approved")}
                    style={subFilter === "approved" ? { background: "#0d0d0d", color: "#fff" } : {}}
                  >
                    APPROVED ({submissions.filter(s => s.status === "approved").length})
                  </button>
                  <button
                    className={`btn-swiss-notes ${subFilter === "declined" ? "active" : ""}`}
                    onClick={() => setSubFilter("declined")}
                    style={subFilter === "declined" ? { background: "#0d0d0d", color: "#fff" } : {}}
                  >
                    DECLINED ({submissions.filter(s => s.status === "declined").length})
                  </button>
                </div>

                <div className="cms-toolbar-actions">
                  <Link to="/request-episode" className="btn-swiss-notes" target="_blank">
                    OPEN VISITOR FORM ↗
                  </Link>
                </div>
              </div>

              {filteredSubs.length === 0 ? (
                <div className="empty-state-swiss">
                  <h3>NO SUBMISSIONS IN QUEUE</h3>
                  <p>There are no guest proposals matching status "{subFilter.toUpperCase()}".</p>
                </div>
              ) : (
                filteredSubs.map((sub) => (
                  <div key={sub.id} className="cms-queue-card">
                    <div className="cms-queue-card-top">
                      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                        <span className={`cms-status-pill ${sub.status}`}>{sub.status}</span>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "#777" }}>
                          ID: {sub.id}
                        </span>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "#777" }}>
                          SUBMITTED: {new Date(sub.submittedAt).toLocaleDateString()}
                        </span>
                      </div>
                      <span className="swiss-pill">{sub.category.toUpperCase()}</span>
                    </div>

                    <div className="cms-queue-body">
                      <img
                        src={sub.guestAvatar || "/assets/hero_meaningful_listening.jpg"}
                        alt={sub.guestName}
                        className="cms-queue-avatar"
                        onError={(e) => { (e.target as HTMLImageElement).src = "/assets/hero_meaningful_listening.jpg"; }}
                      />

                      <div className="cms-queue-content">
                        <h3>{sub.title}</h3>
                        <div className="cms-queue-guest-meta">
                          GUEST: <strong>{sub.guestName}</strong> — <span>{sub.guestRole}</span>
                          {sub.guestEmail && (
                            <> · <a href={`mailto:${sub.guestEmail}`} style={{ textDecoration: "underline", color: "inherit" }}>{sub.guestEmail}</a></>
                          )}
                        </div>
                        {sub.guestBio && (
                          <p style={{ fontSize: "0.82rem", color: "#555", marginBottom: 8 }}>
                            <strong>Bio:</strong> {sub.guestBio}
                          </p>
                        )}
                        <div className="cms-queue-summary">
                          <strong>Pitch Summary:</strong> {sub.summary}
                        </div>
                        {sub.takeaways && sub.takeaways.length > 0 && (
                          <div className="cms-queue-takeaways-box">
                            <div className="cms-queue-takeaways-title">PROPOSED LISTENER TAKEAWAYS:</div>
                            <ul className="cms-queue-takeaways-list">
                              {sub.takeaways.map((t, idx) => (
                                <li key={idx}>{t}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      <div className="cms-queue-actions">
                        {sub.status !== "approved" ? (
                          <button
                            type="button"
                            className="btn-approve-publish"
                            onClick={() => handleApproveSubmission(sub)}
                          >
                            ✓ APPROVE &amp; PUBLISH
                          </button>
                        ) : (
                          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "#166534", fontWeight: 700, textAlign: "center", padding: 6, background: "#eef8ee", border: "1px solid #4ade80" }}>
                            ✓ PUBLISHED TO ARCHIVE
                          </div>
                        )}

                        <button
                          type="button"
                          className="btn-review-edit"
                          onClick={() => {
                            const nextNum = String(Math.max(...episodes.map(e => parseInt(e.number, 10) || 0), 100) + 1);
                            const prefilled: Episode = {
                              id: `ep-${nextNum}`,
                              number: nextNum,
                              title: sub.title,
                              category: sub.category,
                              duration: "50 min",
                              date: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
                              guest: {
                                name: sub.guestName,
                                role: sub.guestRole,
                                avatar: sub.guestAvatar || AVATAR_PRESETS[0].url,
                                bio: sub.guestBio
                              },
                              summary: sub.summary,
                              tags: [sub.category]
                            };
                            openEditor(prefilled, sub.id);
                          }}
                        >
                          ✎ REVIEW &amp; EDIT
                        </button>

                        {sub.status === "pending" && (
                          <button
                            type="button"
                            className="btn-cms-secondary"
                            style={{ fontSize: "0.7rem", justifyContent: "center", padding: 6 }}
                            onClick={async () => {
                              if (confirm(`Decline proposal from ${sub.guestName}?`)) {
                                await setSubmissionStatus(sub.id, "declined");
                                showToast("Proposal marked as declined.");
                              }
                            }}
                          >
                            ✕ DECLINE PITCH
                          </button>
                        )}

                        <button
                          type="button"
                          className="btn-cms-del"
                          style={{ alignSelf: "flex-end" }}
                          title="Delete submission"
                          onClick={async () => {
                            if (confirm("Permanently delete this proposal?")) {
                              await deleteSubmission(sub.id);
                              showToast("Submission removed.");
                            }
                          }}
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </section>

      {/* EPISODE EDITOR MODAL */}
      {isEditorOpen && (
        <div className="modal-wrapper" role="dialog" aria-modal="true">
          <div className="modal-backdrop" onClick={() => setIsEditorOpen(false)}></div>
          <div className="modal-card cms-modal-card">
            <div className="cms-modal-header">
              <div>
                <span className="cms-modal-tag">007 // EPISODE EDITOR</span>
                <h2 className="cms-modal-title">
                  {editingEp ? `EDIT EPISODE #${formNum}` : "NEW EPISODE ARCHIVE ENTRY"}
                </h2>
              </div>
              <button className="modal-close-btn" onClick={() => setIsEditorOpen(false)}>&times;</button>
            </div>

            <form onSubmit={handleSaveEpisode} className="cms-form-scrollable">
              <div className="cms-form-grid-3">
                <div className="form-group">
                  <label className="form-label">EPISODE NUMBER *</label>
                  <input
                    type="number"
                    required
                    className="form-input"
                    value={formNum}
                    onChange={(e) => setFormNum(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">TOPIC / CATEGORY *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={formCat}
                    onChange={(e) => setFormCat(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">DURATION *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={formDur}
                    onChange={(e) => setFormDur(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">EPISODE TITLE / HEADLINE *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                />
              </div>

              <div className="cms-form-grid-2">
                <div className="form-group">
                  <label className="form-label">GUEST FULL NAME *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={formGuestName}
                    onChange={(e) => setFormGuestName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">GUEST ROLE / CREDENTIALS *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={formGuestRole}
                    onChange={(e) => setFormGuestRole(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">GUEST AVATAR URL</label>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <input
                    type="url"
                    className="form-input"
                    value={formGuestAvatar}
                    onChange={(e) => setFormGuestAvatar(e.target.value)}
                  />
                  <img src={formGuestAvatar} alt="Thumb" style={{ width: 44, height: 44, objectFit: "cover", border: "1px solid #111" }} />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">CONVERSATION SUMMARY</label>
                <textarea
                  rows={3}
                  className="form-textarea"
                  value={formSummary}
                  onChange={(e) => setFormSummary(e.target.value)}
                />
              </div>

              <div className="cms-form-bottom-actions">
                <button type="button" className="btn-swiss-notes" onClick={() => setIsEditorOpen(false)}>
                  CANCEL
                </button>
                <button type="submit" className="btn-cms-primary">
                  ✓ SAVE &amp; PUBLISH TO ARCHIVE
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="cms-toast show success">
          {toastMessage}
        </div>
      )}
    </>
  );
};
