const KEY = "hifzh-achievements";

/**
 * Get saved achievements
 */
export const getAchievements = () => {
  const data = localStorage.getItem(KEY);

  if (!data) {
    return [];
  }

  try {
    return JSON.parse(data);
  } catch (error) {
    console.error("Failed to load achievements:", error);

    return [];
  }
};

/**
 * Save achievements
 */
export const saveAchievements = (achievements) => {
  localStorage.setItem(KEY, JSON.stringify(achievements));

  return achievements;
};

/**
 * Update achievements
 *
 * Keeps unlocked date history
 */
export const updateAchievements = (newAchievements) => {
  const oldAchievements = getAchievements();

  const updated = newAchievements.map((item) => {
    const old = oldAchievements.find((a) => a.id === item.id);

    if (item.unlocked && !old?.unlocked) {
      return {
        ...item,

        unlockedAt: new Date().toISOString(),
      };
    }

    return {
      ...item,

      unlockedAt: old?.unlockedAt || null,
    };
  });

  saveAchievements(updated);

  return updated;
};

/**
 * Reset achievements
 */
export const clearAchievements = () => {
  localStorage.removeItem(KEY);
};
