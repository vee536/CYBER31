// LocalStorage Persistence for CYBER31 Campaign Progress,
// with optional best-effort Supabase cloud sync layered on top (see supabaseClient.js).
//
// Two sync identities are supported:
//  - Anonymous: keyed by a random `device_id` generated on first visit.
//  - Authenticated: keyed by the signed-in user's `user_id` (see authClient.js).
// localStorage is always the source of truth the UI reads from; cloud sync
// is fire-and-forget and never blocks or throws into the caller.

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

// Fire-and-forget upsert. When `userId` is set, the row is keyed by the
// account; otherwise it's keyed by this device's anonymous id.
const syncToCloud = (completedDays, streak, userId = null) => {
  if (!isCloudSyncEnabled()) return;

  const row = {
    completed_days: completedDays,
    streak,
    updated_at: new Date().toISOString(),
  };

  let query;
  if (userId) {
    row.user_id = userId;
    query = supabase.from('cyber31_progress').upsert(row, { onConflict: 'user_id' });
  } else {
    const deviceId = getDeviceId();
    if (!deviceId) return;
    row.device_id = deviceId;
    query = supabase.from('cyber31_progress').upsert(row, { onConflict: 'device_id' });
  }

  query.then(({ error }) => {
    if (error) console.warn('CYBER31 cloud sync failed:', error.message);
  });
};

// Pulls this identity's cloud progress (if any) and merges it into local
// storage, taking the union of completed days. Call on app init and again
// whenever the signed-in user changes.
export const syncFromCloud = async (userId = null) => {
  if (!isCloudSyncEnabled()) return null;

  try {
    let queryResult;
    if (userId) {
      queryResult = await supabase
        .from('cyber31_progress')
        .select('completed_days, streak')
        .eq('user_id', userId)
        .maybeSingle();
    } else {
      const deviceId = getDeviceId();
      if (!deviceId) return null;
      queryResult = await supabase
        .from('cyber31_progress')
        .select('completed_days, streak')
        .eq('device_id', deviceId)
        .maybeSingle();
    }

    const { data, error } = queryResult;
    if (error || !data) return null;

    const local = new Set(getCompletedMissions());
    const merged = Array.from(new Set([...local, ...(data.completed_days || [])])).sort(
      (a, b) => a - b
    );
    const mergedStreak = Math.max(getStreak(), data.streak || 0);

    localStorage.setItem(STORAGE_KEYS.COMPLETED, JSON.stringify(merged));
    localStorage.setItem(STORAGE_KEYS.STREAK, String(mergedStreak));

    // Keep the cloud row consistent with the merged result (covers the case
    // where local had progress the cloud row didn't have yet).
    syncToCloud(merged, mergedStreak, userId);

    return merged;
  } catch (e) {
    console.warn('CYBER31 cloud sync fetch failed:', e);
    return null;
  }
};

// Called once, right after a visitor creates an account (or signs in for
// the first time on this device): attaches this device's local progress to
// their new user_id row, unioned with whatever that account already has in
// the cloud (e.g. from signing up previously on another device).
export const migrateAnonymousProgressToUser = async (userId) => {
  if (!isCloudSyncEnabled() || !userId) return getCompletedMissions();

  // Merge in any progress the account already has from elsewhere...
  await syncFromCloud(userId);

  // ...then push the result up under this account explicitly. syncFromCloud
  // only writes back when it found an existing row to merge with, so a
  // brand-new account (no cloud row yet) would otherwise keep its progress
  // local-only until the next mission completion — leaving it invisible if
  // the user logs in on a second device before then.
  const finalDays = getCompletedMissions();
  const finalStreak = getStreak();
  syncToCloud(finalDays, finalStreak, userId);
  return finalDays;
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

export const saveMissionCompletion = (day, userId = null) => {
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

    syncToCloud(updated, nextStreak, userId);
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

export const unlockAllMissions = (userId = null) => {
  const allDays = Array.from({ length: 31 }, (_, i) => i + 1);
  localStorage.setItem(STORAGE_KEYS.COMPLETED, JSON.stringify(allDays));
  localStorage.setItem(STORAGE_KEYS.STREAK, '31');
  syncToCloud(allDays, 31, userId);
  return allDays;
};

export const resetProgress = (userId = null) => {
  localStorage.removeItem(STORAGE_KEYS.COMPLETED);
  localStorage.setItem(STORAGE_KEYS.STREAK, '1');
  localStorage.removeItem(STORAGE_KEYS.ACHIEVEMENTS);
  syncToCloud([], 1, userId);
  return [];
};
