/**
 * Care 2 Listen — Guest Submissions Client API
 * Synchronizes episode requests & approval status with the disk-persisted backend.
 */
import initialSubmissionsData from "./submissions.json";

export let submissions = [...initialSubmissionsData];

export async function fetchSubmissions() {
  try {
    const res = await fetch("/api/submissions");
    if (res.ok) {
      const data = await res.json();
      submissions = data;
      return submissions;
    }
  } catch (err) {
    console.warn("[Submissions] Backend /api/submissions unavailable, using in-memory store.");
  }
  return submissions;
}

export async function submitEpisodePitch(pitchData) {
  const payload = {
    ...pitchData,
    id: `sub-${Date.now()}`,
    status: "pending",
    submittedAt: new Date().toISOString()
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
      window.dispatchEvent(new CustomEvent("care2listen:submissions-updated"));
      return { success: true, submission: saved };
    }
  } catch (err) {
    console.warn("[Submissions] POST failed, saving locally:", err);
  }

  // Fallback
  submissions.unshift(payload);
  window.dispatchEvent(new CustomEvent("care2listen:submissions-updated"));
  return { success: true, submission: payload };
}

export async function setSubmissionStatus(id, newStatus) {
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
      window.dispatchEvent(new CustomEvent("care2listen:submissions-updated"));
      return { success: true, submission: updated };
    }
  } catch (err) {
    console.warn("[Submissions] PATCH failed, updating locally:", err);
  }

  const idx = submissions.findIndex(s => s.id === id);
  if (idx !== -1) {
    submissions[idx].status = newStatus;
    window.dispatchEvent(new CustomEvent("care2listen:submissions-updated"));
    return { success: true, submission: submissions[idx] };
  }
  return { success: false, error: "Not found" };
}

export async function deleteSubmission(id) {
  try {
    const res = await fetch(`/api/submissions/${id}`, { method: "DELETE" });
    if (res.ok) {
      submissions = submissions.filter(s => s.id !== id);
      window.dispatchEvent(new CustomEvent("care2listen:submissions-updated"));
      return { success: true };
    }
  } catch (err) {
    console.warn("[Submissions] DELETE failed, updating locally:", err);
  }

  submissions = submissions.filter(s => s.id !== id);
  window.dispatchEvent(new CustomEvent("care2listen:submissions-updated"));
  return { success: true };
}

// Initial fetch on app start
fetchSubmissions().catch(() => {});
