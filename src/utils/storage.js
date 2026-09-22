// LocalStorage Persistence for CYBER31 Campaign Progress,
// with optional best-effort Supabase cloud sync layered on top (see supabaseClient.js).

import { supabase, isCloudSyncEnabled } from './supabaseClient';

const STORAGE_KEYS = {
  COMPLETED: 'cyber31_completed_missions',
  STREAK: 'cyber31_streak',
  ACHIEVEMENTS: 'cyber31_achievements',
  LAST_ACTIVE: 'cyber31_last_active_date',
  DEVICE_ID: 'cyber31_device_id',
};

const getDeviceId = () => {
  try {
    let id = localStorage.getItem(STORAGE_KEYS.DEVICE_ID);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(STORAGE_KEYS.DEVICE_ID, id);
    }
    return id;
  } catch (e) {
    return null;
  }
};

// Fire-and-forget: never blocks or throws into the caller. Local storage
// remains the source of truth the UI reads from; this just mirrors it.
const syncToCloud = (completedDays, streak) => {
  if (!isCloudSyncEnabled()) return;
  const deviceId = getDeviceId();
  if (!deviceId) return;
  supabase
    .from('cyber31_progress')
    .upsert({
      device_id: deviceId,
      completed_days: completedDays,
      streak,
      updated_at: new Date().toISOString(),
    })
    .then(({ error }) => {
      if (error) console.warn('CYBER31 cloud sync failed:', error.message);
    });
};

// Pulls this device's cloud progress (if any) and merges it into local
// storage, taking the union of completed days. Call once on app init.
export const syncFromCloud = async () => {
  if (!isCloudSyncEnabled()) return null;
  const deviceId = getDeviceId();
  if (!deviceId) return null;

  try {
    const { data, error } = await supabase
      .from('cyber31_progress')
      .select('completed_days, streak')
      .eq('device_id', deviceId)
      .maybeSingle();

    if (error || !data) return null;

    const local = new Set(getCompletedMissions());
    const merged = Array.from(new Set([...local, ...(data.completed_days || [])])).sort(
      (a, b) => a - b
    );
    const mergedStreak = Math.max(getStreak(), data.streak || 0);

    localStorage.setItem(STORAGE_KEYS.COMPLETED, JSON.stringify(merged));
    localStorage.setItem(STORAGE_KEYS.STREAK, String(mergedStreak));

    return merged;
  } catch (e) {
    console.warn('CYBER31 cloud sync fetch failed:', e);
    return null;
  }
};

export const getCompletedMissions = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.COMPLETED);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
};

export const isMissionCompleted = (day) => {
  const completed = getCompletedMissions();
  return completed.includes(Number(day));
};

export const saveMissionCompletion = (day) => {
  try {
    const completed = new Set(getCompletedMissions());
    completed.add(Number(day));
    const updated = Array.from(completed).sort((a, b) => a - b);
    localStorage.setItem(STORAGE_KEYS.COMPLETED, JSON.stringify(updated));

    // Update streak
    const currentStreak = getStreak();
    const nextStreak = currentStreak + 1;
    localStorage.setItem(STORAGE_KEYS.STREAK, String(nextStreak));
    localStorage.setItem(STORAGE_KEYS.LAST_ACTIVE, new Date().toISOString());

    syncToCloud(updated, nextStreak);
    return updated;
  } catch (e) {
    console.error('Failed to save mission completion', e);
    return [];
  }
};

export const getStreak = () => {
  try {
    const streak = localStorage.getItem(STORAGE_KEYS.STREAK);
    return streak ? parseInt(streak, 10) : 6; // Default motivational starting streak
  } catch (e) {
    return 6;
  }
};

export const getSecurityLevel = () => {
  const completed = getCompletedMissions();
  return Math.round((completed.length / 31) * 100);
};

export const unlockAllMissions = () => {
  const allDays = Array.from({ length: 31 }, (_, i) => i + 1);
  localStorage.setItem(STORAGE_KEYS.COMPLETED, JSON.stringify(allDays));
  localStorage.setItem(STORAGE_KEYS.STREAK, '31');
  syncToCloud(allDays, 31);
  return allDays;
};

export const resetProgress = () => {
  localStorage.removeItem(STORAGE_KEYS.COMPLETED);
  localStorage.setItem(STORAGE_KEYS.STREAK, '1');
  localStorage.removeItem(STORAGE_KEYS.ACHIEVEMENTS);
  syncToCloud([], 1);
  return [];
};
