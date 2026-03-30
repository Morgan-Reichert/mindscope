export interface TestResult {
  id: string;
  testId: string;
  testName: string;
  score: number;
  maxScore: number;
  severityLabel: string;
  severity: string;
  completedAt: string;
  answers: Record<string, number>;
}

/** User's saved medication list (global profile) */
export interface MedicationProfile {
  medications: string[]; // e.g. ["Sertraline 50mg", "Mélatonine 5mg"]
}

const MED_PROFILE_KEY = "mindscope_meds";

export function getMedicationProfile(): MedicationProfile {
  if (typeof window === "undefined") return { medications: [] };
  try { return JSON.parse(localStorage.getItem(MED_PROFILE_KEY) ?? '{"medications":[]}'); }
  catch { return { medications: [] }; }
}
export function saveMedicationProfile(profile: MedicationProfile): void {
  localStorage.setItem(MED_PROFILE_KEY, JSON.stringify(profile));
}

/** One mood snapshot — multiple allowed per day */
export interface MoodEntry {
  id: string;          // unique per entry
  datetime: string;    // full ISO-8601  YYYY-MM-DDTHH:mm:ss
  date: string;        // YYYY-MM-DD (derived, used for grouping)
  mood: number;        // 1-10
  sleep?: number;      // hours 0-12
  appetite?: number;   // 1-5
  energy?: number;     // 1-5
  note?: string;

  // Behaviours
  alcohol?: number;
  substances?: number;
  substanceNote?: string;
  riskBehavior?: boolean;
  riskNote?: string;

  // Medications
  medicationsTaken?: Record<string, boolean>; // medName → taken?
}

/** Entries for one calendar day (grouped) */
export interface DailyLog {
  date: string;
  entries: MoodEntry[]; // sorted by time ascending
}

// ─────────────────────────────────────────────────────────────────────────────

const RESULTS_KEY = "mindscope_results";
const MOOD_KEY    = "mindscope_mood_v2"; // v2 = multi-entry per day

function uid(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

// ─── Test Results ─────────────────────────────────────────────────────────────

export function saveResult(result: Omit<TestResult, "id">): TestResult {
  const all = getResults();
  const r   = { ...result, id: uid() };
  all.unshift(r);
  localStorage.setItem(RESULTS_KEY, JSON.stringify(all.slice(0, 50)));
  return r;
}
export function getResults(): TestResult[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(RESULTS_KEY) ?? "[]"); } catch { return []; }
}
export function getResultById(id: string): TestResult | undefined {
  return getResults().find((r) => r.id === id);
}
export function deleteResult(id: string): void {
  localStorage.setItem(RESULTS_KEY, JSON.stringify(getResults().filter((r) => r.id !== id)));
}
export function clearAllResults(): void {
  localStorage.removeItem(RESULTS_KEY);
}

// ─── Mood Entries ─────────────────────────────────────────────────────────────

/** Add or update a single entry (matched by id) */
export function saveMoodEntry(entry: Omit<MoodEntry, "id"> & { id?: string }): MoodEntry {
  const all = getAllMoodEntries();
  const complete: MoodEntry = { ...entry, id: entry.id ?? uid() };
  const idx = all.findIndex((e) => e.id === complete.id);
  if (idx >= 0) all[idx] = complete; else all.push(complete);
  // keep last 365 days, sorted ascending
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 365);
  const cutStr = cutoff.toISOString().split("T")[0];
  const trimmed = all
    .filter((e) => e.date >= cutStr)
    .sort((a, b) => a.datetime.localeCompare(b.datetime));
  localStorage.setItem(MOOD_KEY, JSON.stringify(trimmed));
  return complete;
}

export function deleteMoodEntry(id: string): void {
  localStorage.setItem(MOOD_KEY, JSON.stringify(getAllMoodEntries().filter((e) => e.id !== id)));
}

export function clearAllMood(): void {
  localStorage.removeItem(MOOD_KEY);
}

/** All entries, sorted oldest → newest */
export function getAllMoodEntries(): MoodEntry[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(MOOD_KEY) ?? "[]"); } catch { return []; }
}

/** Today's entries (may be multiple) */
export function getTodayEntries(): MoodEntry[] {
  const today = new Date().toISOString().split("T")[0];
  return getAllMoodEntries().filter((e) => e.date === today);
}

/** Entries in date range [start, end] inclusive */
export function getMoodEntriesRange(startDate: string, endDate: string): MoodEntry[] {
  return getAllMoodEntries().filter((e) => e.date >= startDate && e.date <= endDate);
}

/** Group all entries into DailyLog objects, newest day first */
export function getDailyLogs(): DailyLog[] {
  const all = getAllMoodEntries();
  const map  = new Map<string, MoodEntry[]>();
  for (const e of all) {
    if (!map.has(e.date)) map.set(e.date, []);
    map.get(e.date)!.push(e);
  }
  return Array.from(map.entries())
    .sort((x: [string, MoodEntry[]], y: [string, MoodEntry[]]) => y[0].localeCompare(x[0])) // newest first
    .map(([date, ents]) => ({ date, entries: ents.sort((a: MoodEntry, b: MoodEntry) => a.datetime.localeCompare(b.datetime)) }));
}

/** Group range entries into DailyLog objects (for report), oldest first */
export function getDailyLogsRange(startDate: string, endDate: string): DailyLog[] {
  const entries = getMoodEntriesRange(startDate, endDate);
  const map     = new Map<string, MoodEntry[]>();
  for (const e of entries) {
    if (!map.has(e.date)) map.set(e.date, []);
    map.get(e.date)!.push(e);
  }
  return Array.from(map.entries())
    .sort((x: [string, MoodEntry[]], y: [string, MoodEntry[]]) => x[0].localeCompare(y[0]))
    .map(([date, ents]) => ({ date, entries: ents.sort((a: MoodEntry, b: MoodEntry) => a.datetime.localeCompare(b.datetime)) }));
}

// ─── Legacy compat (old single-entry-per-day key) ─────────────────────────────
// Migrate old data transparently on first use
export function migrateLegacyMoodData(): void {
  if (typeof window === "undefined") return;
  const OLD_KEY = "mindscope_mood";
  const raw = localStorage.getItem(OLD_KEY);
  if (!raw) return;
  try {
    const old: Array<{ date: string; mood: number; note?: string; sleep?: number; appetite?: number; energy?: number }> = JSON.parse(raw);
    for (const o of old) {
      saveMoodEntry({ ...o, datetime: `${o.date}T12:00:00`, id: uid() });
    }
    localStorage.removeItem(OLD_KEY);
  } catch { /* ignore */ }
}
