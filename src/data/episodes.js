import initialEpisodes from "./episodes.json";

export const DEFAULT_EPISODES = initialEpisodes;
export const DEFAULT_CATEGORIES = [
  "All",
  "Mental Health",
  "Resilience",
  "Grief",
  "Relationships",
  "Identity",
  "Career"
];

// In-memory exported arrays (same reference retained across app)
export const episodes = [...DEFAULT_EPISODES];
export const categories = [...DEFAULT_CATEGORIES];

function syncCategories() {
  episodes.forEach(ep => {
    if (ep.category && !categories.includes(ep.category)) {
      categories.push(ep.category);
    }
  });
}
syncCategories();

/**
 * Loads real-time episode list from backend server REST API
 */
export async function fetchEpisodesFromBackend() {
  if (typeof window === "undefined" || !window.fetch) return episodes;

  try {
    const res = await fetch("/api/episodes");
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        episodes.splice(0, episodes.length, ...data);
        syncCategories();
        window.dispatchEvent(new CustomEvent("care2listen:episodes-updated", { detail: { episodes } }));
        return episodes;
      }
    }
  } catch (err) {
    console.warn("[Backend Client] Failed to fetch /api/episodes, using local dataset:", err);
  }
  return episodes;
}

// Automatically sync on initial script load
if (typeof window !== "undefined") {
  fetchEpisodesFromBackend();
}

/**
 * Saves or updates an episode by sending HTTP POST to backend server
 */
export async function saveEpisode(episodeData) {
  const cleanEp = {
    ...episodeData,
    id: episodeData.id || `ep-${episodeData.number || Date.now()}`,
    number: String(episodeData.number).trim()
  };

  try {
    const res = await fetch("/api/episodes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cleanEp)
    });

    if (res.ok) {
      const saved = await res.json();
      const existingIdx = episodes.findIndex(e => e.id === saved.id || String(e.number) === String(saved.number));
      if (existingIdx !== -1) {
        episodes[existingIdx] = { ...episodes[existingIdx], ...saved };
      } else {
        episodes.unshift(saved);
      }
      syncCategories();
      window.dispatchEvent(new CustomEvent("care2listen:episodes-updated", { detail: { episodes } }));
      return saved;
    }
  } catch (err) {
    console.error("[Backend Client] Save failed:", err);
  }

  // Local fallback
  const existingIdx = episodes.findIndex(e => e.id === cleanEp.id || String(e.number) === String(cleanEp.number));
  if (existingIdx !== -1) {
    episodes[existingIdx] = { ...episodes[existingIdx], ...cleanEp };
  } else {
    episodes.unshift(cleanEp);
  }
  syncCategories();
  window.dispatchEvent(new CustomEvent("care2listen:episodes-updated", { detail: { episodes } }));
  return cleanEp;
}

/**
 * Deletes an episode by sending HTTP DELETE to backend server
 */
export async function deleteEpisode(episodeId) {
  try {
    const res = await fetch(`/api/episodes/${episodeId}`, {
      method: "DELETE"
    });

    if (res.ok) {
      const idx = episodes.findIndex(e => e.id === episodeId || String(e.number) === String(episodeId));
      if (idx !== -1) {
        episodes.splice(idx, 1);
        syncCategories();
        window.dispatchEvent(new CustomEvent("care2listen:episodes-updated", { detail: { episodes } }));
        return true;
      }
    }
  } catch (err) {
    console.error("[Backend Client] Delete failed:", err);
  }

  // Local fallback
  const idx = episodes.findIndex(e => e.id === episodeId || String(e.number) === String(episodeId));
  if (idx !== -1) {
    episodes.splice(idx, 1);
    syncCategories();
    window.dispatchEvent(new CustomEvent("care2listen:episodes-updated", { detail: { episodes } }));
    return true;
  }
  return false;
}

/**
 * Resets database back to default factory demo episodes
 */
export async function resetToDefaultEpisodes() {
  try {
    await fetch("/api/episodes/import", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(DEFAULT_EPISODES)
    });
  } catch (err) {
    console.warn("Reset to default on server failed:", err);
  }

  episodes.splice(0, episodes.length, ...JSON.parse(JSON.stringify(DEFAULT_EPISODES)));
  categories.splice(0, categories.length, ...DEFAULT_CATEGORIES);
  window.dispatchEvent(new CustomEvent("care2listen:episodes-updated", { detail: { episodes } }));
}

/**
 * Imports episode list via JSON payload
 */
export async function importEpisodesJSON(jsonString) {
  try {
    const data = JSON.parse(jsonString);
    if (Array.isArray(data) && data.length > 0) {
      await fetch("/api/episodes/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      episodes.splice(0, episodes.length, ...data);
      syncCategories();
      window.dispatchEvent(new CustomEvent("care2listen:episodes-updated", { detail: { episodes } }));
      return { success: true, count: data.length };
    }
    return { success: false, error: "JSON must be a non-empty array of episodes." };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

export function exportEpisodesJSON() {
  return JSON.stringify(episodes, null, 2);
}
