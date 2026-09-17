// LocalStorage Persistence for CYBER31 Campaign Progress

const STORAGE_KEYS = {
  COMPLETED: 'cyber31_completed_missions',
  STREAK: 'cyber31_streak',
  ACHIEVEMENTS: 'cyber31_achievements',
  LAST_ACTIVE: 'cyber31_last_active_date',
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
    localStorage.setItem(STORAGE_KEYS.STREAK, String(currentStreak + 1));
    localStorage.setItem(STORAGE_KEYS.LAST_ACTIVE, new Date().toISOString());

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
  return allDays;
};

export const resetProgress = () => {
  localStorage.removeItem(STORAGE_KEYS.COMPLETED);
  localStorage.setItem(STORAGE_KEYS.STREAK, '1');
  localStorage.removeItem(STORAGE_KEYS.ACHIEVEMENTS);
  return [];
};
