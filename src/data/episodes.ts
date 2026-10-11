import initialEpisodes from "./episodes.json";

export interface Episode {
  id: string;
  number: string;
  title: string;
  category: string;
  duration: string;
  date: string;
  featured?: boolean;
  guest: {
    name: string;
    role: string;
    avatar: string;
    bio?: string;
  };
  summary: string;
  tags?: string[];
  spotifyUrl?: string;
  appleUrl?: string;
  youtubeId?: string;
  audioUrl?: string;
  takeaways?: string[];
  transcript?: Array<{ time: string; speaker: string; text: string }>;
}

export const DEFAULT_EPISODES: Episode[] = initialEpisodes as Episode[];
export const DEFAULT_CATEGORIES: string[] = [
  "All",
  "Mental Health",
  "Resilience",
  "Grief",
  "Relationships",
  "Identity",
  "Career"
];

function loadLocalEpisodes(): Episode[] {
  if (typeof window === "undefined") return [...DEFAULT_EPISODES];
  try {
    const raw = localStorage.getItem("care2listen_episodes");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    // fallback
  }
  return [...DEFAULT_EPISODES];
}

export const episodes: Episode[] = loadLocalEpisodes();
export const categories: string[] = [...DEFAULT_CATEGORIES];

function syncCategories() {
  episodes.forEach(ep => {
    if (ep.category && !categories.includes(ep.category)) {
      categories.push(ep.category);
    }
  });
}
syncCategories();

function saveToLocalStorage() {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("care2listen_episodes", JSON.stringify(episodes));
    } catch (e) {}
  }
}

export async function fetchEpisodesFromBackend(): Promise<Episode[]> {
  if (typeof window === "undefined" || !window.fetch) return episodes;

  try {
    const res = await fetch("/api/episodes");
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        episodes.splice(0, episodes.length, ...data);
        syncCategories();
        saveToLocalStorage();
        window.dispatchEvent(new CustomEvent("care2listen:episodes-updated", { detail: { episodes } }));
        return episodes;
      }
    }
  } catch (err) {
    // Using local / storage dataset
  }
  return episodes;
}

if (typeof window !== "undefined") {
  fetchEpisodesFromBackend();
}

export async function saveEpisode(episodeData: Partial<Episode> & { number: string; title: string }): Promise<Episode> {
  const cleanEp: Episode = {
    ...episodeData,
    id: episodeData.id || `ep-${episodeData.number || Date.now()}`,
    number: String(episodeData.number).trim(),
    title: episodeData.title || "Untitled",
    category: episodeData.category || "Mental Health",
    duration: episodeData.duration || "50 min",
    date: episodeData.date || new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
    guest: episodeData.guest || {
      name: "Guest",
      role: "Contributor",
      avatar: "/assets/hero_meaningful_listening.jpg"
    },
    summary: episodeData.summary || "",
    tags: episodeData.tags || [episodeData.category || "Mental Health"]
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
      saveToLocalStorage();
      window.dispatchEvent(new CustomEvent("care2listen:episodes-updated", { detail: { episodes } }));
      return saved;
    }
  } catch (err) {}

  // Local fallback
  const existingIdx = episodes.findIndex(e => e.id === cleanEp.id || String(e.number) === String(cleanEp.number));
  if (existingIdx !== -1) {
    episodes[existingIdx] = { ...episodes[existingIdx], ...cleanEp };
  } else {
    episodes.unshift(cleanEp);
  }
  syncCategories();
  saveToLocalStorage();
  window.dispatchEvent(new CustomEvent("care2listen:episodes-updated", { detail: { episodes } }));
  return cleanEp;
}

export async function deleteEpisode(episodeId: string): Promise<boolean> {
  try {
    const res = await fetch(`/api/episodes/${episodeId}`, { method: "DELETE" });
    if (res.ok) {
      const idx = episodes.findIndex(e => e.id === episodeId);
      if (idx !== -1) episodes.splice(idx, 1);
      saveToLocalStorage();
      window.dispatchEvent(new CustomEvent("care2listen:episodes-updated", { detail: { episodes } }));
      return true;
    }
  } catch (err) {}

  const idx = episodes.findIndex(e => e.id === episodeId);
  if (idx !== -1) {
    episodes.splice(idx, 1);
    saveToLocalStorage();
    window.dispatchEvent(new CustomEvent("care2listen:episodes-updated", { detail: { episodes } }));
    return true;
  }
  return false;
}

export async function resetToDefaultEpisodes(): Promise<boolean> {
  try {
    await fetch("/api/episodes/reset", { method: "POST" });
  } catch (e) {}
  episodes.splice(0, episodes.length, ...DEFAULT_EPISODES);
  categories.splice(0, categories.length, ...DEFAULT_CATEGORIES);
  syncCategories();
  saveToLocalStorage();
  window.dispatchEvent(new CustomEvent("care2listen:episodes-updated", { detail: { episodes } }));
  return true;
}

export function exportEpisodesJSON(): string {
  return JSON.stringify(episodes, null, 2);
}

export async function importEpisodesJSON(jsonString: string): Promise<{ success: boolean; count?: number; error?: string }> {
  try {
    const parsed = JSON.parse(jsonString);
    if (!Array.isArray(parsed)) throw new Error("JSON must be an array of episodes");
    episodes.splice(0, episodes.length, ...parsed);
    syncCategories();
    saveToLocalStorage();
    window.dispatchEvent(new CustomEvent("care2listen:episodes-updated", { detail: { episodes } }));
    return { success: true, count: parsed.length };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
