import initialSubmissionsData from "./submissions.json";

export interface EpisodeSubmission {
  id: string;
  status: "pending" | "approved" | "declined";
  submittedAt: string;
  title: string;
  category: string;
  guestName: string;
  guestRole: string;
  guestEmail: string;
  guestAvatar?: string;
  guestBio?: string;
  summary: string;
  takeaways?: string[];
}

function normalizeSubmission(raw: any): EpisodeSubmission {
  return {
    id: raw.id || `sub-${Date.now()}`,
    status: raw.status || "pending",
    submittedAt: raw.submittedAt || new Date().toISOString(),
    title: raw.title || "Untitled Pitch",
    category: raw.category || "General",
    guestName: raw.guestName || raw.guest?.name || "Anonymous",
    guestRole: raw.guestRole || raw.guest?.role || "Storyteller",
    guestEmail: raw.guestEmail || raw.guest?.email || "",
    guestAvatar: raw.guestAvatar || raw.guest?.avatar,
    guestBio: raw.guestBio || raw.guest?.bio,
    summary: raw.summary || "",
    takeaways: raw.takeaways || []
  };
}

function loadLocalSubmissions(): EpisodeSubmission[] {
  if (typeof window === "undefined") {
    return (initialSubmissionsData as any[]).map(normalizeSubmission);
  }
  try {
    const raw = localStorage.getItem("care2listen_submissions");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map(normalizeSubmission);
      }
    }
  } catch (e) {}
  return (initialSubmissionsData as any[]).map(normalizeSubmission);
}

export const submissions: EpisodeSubmission[] = loadLocalSubmissions();

function saveToLocalStorage() {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("care2listen_submissions", JSON.stringify(submissions));
    } catch (e) {}
  }
}

export async function fetchSubmissions(): Promise<EpisodeSubmission[]> {
  try {
    const res = await fetch("/api/submissions");
    if (res.ok) {
      const data = await res.json();
      submissions.splice(0, submissions.length, ...data);
      saveToLocalStorage();
      return submissions;
    }
  } catch (err) {}
  return submissions;
}

export async function submitEpisodePitch(pitchData: Partial<EpisodeSubmission>): Promise<{ success: boolean; submission: EpisodeSubmission }> {
  const payload: EpisodeSubmission = {
    id: `sub-${Date.now()}`,
    status: "pending",
    submittedAt: new Date().toISOString(),
    title: pitchData.title || "Untitled Proposal",
    category: pitchData.category || "Mental Health",
    guestName: pitchData.guestName || "Anonymous",
    guestRole: pitchData.guestRole || "Contributor",
    guestEmail: pitchData.guestEmail || "",
    guestAvatar: pitchData.guestAvatar || "/assets/hero_meaningful_listening.jpg",
    guestBio: pitchData.guestBio || "",
    summary: pitchData.summary || "",
    takeaways: pitchData.takeaways || []
  };

  try {
    const res = await fetch("/api/submissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      const saved = await res.json();
      submissions.unshift(saved);
      saveToLocalStorage();
      window.dispatchEvent(new CustomEvent("care2listen:submissions-updated"));
      return { success: true, submission: saved };
    }
  } catch (err) {}

  submissions.unshift(payload);
  saveToLocalStorage();
  window.dispatchEvent(new CustomEvent("care2listen:submissions-updated"));
  return { success: true, submission: payload };
}

export async function setSubmissionStatus(id: string, newStatus: "pending" | "approved" | "declined"): Promise<{ success: boolean; submission?: EpisodeSubmission }> {
  try {
    const res = await fetch(`/api/submissions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus })
    });
    if (res.ok) {
      const updated = await res.json();
      const idx = submissions.findIndex(s => s.id === id);
      if (idx !== -1) submissions[idx] = updated;
      saveToLocalStorage();
      window.dispatchEvent(new CustomEvent("care2listen:submissions-updated"));
      return { success: true, submission: updated };
    }
  } catch (err) {}

  const idx = submissions.findIndex(s => s.id === id);
  if (idx !== -1) {
    submissions[idx].status = newStatus;
    saveToLocalStorage();
    window.dispatchEvent(new CustomEvent("care2listen:submissions-updated"));
    return { success: true, submission: submissions[idx] };
  }
  return { success: false };
}

export async function deleteSubmission(id: string): Promise<{ success: boolean }> {
  try {
    const res = await fetch(`/api/submissions/${id}`, { method: "DELETE" });
    if (res.ok) {
      const idx = submissions.findIndex(s => s.id === id);
      if (idx !== -1) submissions.splice(idx, 1);
      saveToLocalStorage();
      window.dispatchEvent(new CustomEvent("care2listen:submissions-updated"));
      return { success: true };
    }
  } catch (err) {}

  const idx = submissions.findIndex(s => s.id === id);
  if (idx !== -1) submissions.splice(idx, 1);
  saveToLocalStorage();
  window.dispatchEvent(new CustomEvent("care2listen:submissions-updated"));
  return { success: true };
}
