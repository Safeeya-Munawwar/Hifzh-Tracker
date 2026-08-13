const KEY = "hifzh-management";

const defaultData = {
  cycles: [],

  progress: {},

  statistics: {
    totalAyahsCompleted: 0,
    totalSurahsCompleted: 0,
    streak: 0,
  },
};

// GET DATA
export const getHifzhData = () => {
  const data = localStorage.getItem(KEY);

  if (!data) {
    return defaultData;
  }

  const parsed = JSON.parse(data);

  return {
    ...defaultData,

    ...parsed,

    statistics: {
      ...defaultData.statistics,
      ...(parsed.statistics || {}),
    },
  };
};

// SAVE DATA
export const saveHifzhData = (data) => {
  localStorage.setItem(KEY, JSON.stringify(data));
};

// CREATE MEMORIZATION CYCLE
export const createCycle = (type) => {
  const data = getHifzhData();

  const cycle = {
    id: Date.now(),

    type,

    startedAt: new Date().toISOString(),

    completedSurahs: [],
  };

  data.cycles.push(cycle);

  saveHifzhData(data);

  return cycle;
};

export const calculateStreak = (data) => {
  const dates = [];

  Object.values(data.progress || {}).forEach((surah) => {
    surah.history?.forEach((item) => {
      dates.push(new Date(item.date).toISOString().split("T")[0]);
    });
  });

  const uniqueDates = [...new Set(dates)].sort().reverse();

  if (uniqueDates.length === 0) {
    return 0;
  }

  let streak = 1;

  for (let i = 0; i < uniqueDates.length - 1; i++) {
    const current = new Date(uniqueDates[i]);

    const previous = new Date(uniqueDates[i + 1]);

    const difference = (current - previous) / (1000 * 60 * 60 * 24);

    if (difference === 1) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
};
