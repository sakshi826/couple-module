import { sql } from '@/lib/db';
import i18n from "../i18n";

export interface SelfCareEntry {
  date: string; // ISO date string YYYY-MM-DD
  didSelfCare: boolean | null;
  activities: string[];
  duration: string;
  preventionReasons: string[];
  helpfulType: string;
  mood: string;
  moodEmoji: string;
}

export const ACTIVITIES = [
  "Deep Conversation", "Shared Meal", "Intimacy / Physical Touch", "Shared Activity / Hobby",
  "Active Listening / Check-In", "Word of Appreciation", "Small Surprise / Gift", "Outdoor Walk / Outing",
  "Doing Chores Together", "Quiet Quality Time",
];

export const DURATIONS = [
  "< 10 minutes", "10–30 minutes", "30–60 minutes", "1+ hour",
];

export const PREVENTION_REASONS = [
  "Busy work schedule", "Low energy / Fatigue", "Unresolved conflict", "Distractions (phones/TV)",
  "Kids / Family obligations", "Stress / Overwhelm", "Misaligned schedules",
];

export const HELPFUL_TYPES = [
  "A brief phone check-in", "Cooking together", "Shared physical affection",
  "An evening walk", "Uninterrupted quiet time",
];

export const MOODS = [
  { emoji: "🥰", label: "Very Close" },
  { emoji: "😊", label: "Connected" },
  { emoji: "😐", label: "Neutral / Normal" },
  { emoji: "😔", label: "Distant" },
  { emoji: "😢", label: "Lonely / Disconnected" },
];

export const POSITIVE_STATEMENTS = [
  "Investing in your connection is the heart of a strong relationship. ❤️",
  "A shared moment of care strengthens your bond. Well done. 🤝",
  "Every small connection check-in builds lasting emotional safety. 🌱",
  "You prioritized your partnership today. That matters. ✨",
  "Fostering intimacy today is the best thing you did for your couple. 🍃",
];

export const SUPPORTIVE_STATEMENTS = [
  "It's okay. Tomorrow offers a new opportunity to reach out. Be gentle with yourselves. 🤍",
  "Misalignments happen. It's the overall direction of care that matters. 🕊️",
  "Even a small acknowledgment later today can bridge the gap. 💛",
  "Resting separately is okay too. Give each other grace. 🌸",
  "Noticing the disconnect is the first brave step toward reconnection. 🌷",
];

/**
 * Converts a Date object to a local ISO string (YYYY-MM-DD)
 * correctly handling the user's local timezone.
 */
export function toLocalIsoDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
export async function fetchEntries(userId: string): Promise<SelfCareEntry[]> {
  try {
    const rows = await sql`
      SELECT * FROM selfcare_entries 
      WHERE user_id = ${userId} 
      ORDER BY date DESC
    `;

    if (!rows || !Array.isArray(rows)) return [];

    return rows.map(r => {
      // Postgres DATE objects might be interpreted at midnight UTC by the driver.
      // We force it to local interpretation to avoid day-shifting.
      const d = new Date(r.date);
      return {
        date: toLocalIsoDate(d),
        didSelfCare: r.did_self_care,
        activities: r.activities || [],
        duration: r.duration || "",
        preventionReasons: r.prevention_reasons || [],
        helpfulType: r.helpful_type || "",
        mood: r.mood || "",
        moodEmoji: r.mood_emoji || "",
      };
    });
  } catch (err) {
    console.error('Error fetching entries:', err);
    return [];
  }
}

export async function saveEntryToDb(userId: string, entry: SelfCareEntry) {
  try {
    await sql`
      INSERT INTO selfcare_entries (
        user_id, date, did_self_care, activities, duration, 
        prevention_reasons, helpful_type, mood, mood_emoji
      )
      VALUES (
        ${userId}, ${entry.date}, ${entry.didSelfCare}, ${JSON.stringify(entry.activities)}, ${entry.duration},
        ${JSON.stringify(entry.preventionReasons)}, ${entry.helpfulType}, ${entry.mood}, ${entry.moodEmoji}
      )
      ON CONFLICT (user_id, date) DO UPDATE SET
        did_self_care = EXCLUDED.did_self_care,
        activities = EXCLUDED.activities,
        duration = EXCLUDED.duration,
        prevention_reasons = EXCLUDED.prevention_reasons,
        helpful_type = EXCLUDED.helpful_type,
        mood = EXCLUDED.mood,
        mood_emoji = EXCLUDED.mood_emoji
    `;
  } catch (err) {
    console.error('Error saving entry:', err);
    throw err;
  }
}

export async function fetchLast7Days(userId: string): Promise<SelfCareEntry[]> {
  const entries = await fetchEntries(userId);
  const today = new Date();
  const days: SelfCareEntry[] = [];

  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = toLocalIsoDate(d);
    const found = entries.find((e) => e.date === dateStr);
    if (found) days.push(found);
  }
  return days;
}

export function formatDateShort(dateStr: string): string {
  // Use T00:00:00 to ensure the date is interpreted as the start of the day in LOCAL time
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString(i18n.language, { weekday: "short", month: "short", day: "numeric" });
}
