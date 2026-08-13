const KEY = "hifzh-goals";

/**
 * Get all goals
 */
export const getGoals = () => {
  const data = localStorage.getItem(KEY);

  if (!data) {
    return [];
  }

  try {
    const goals = JSON.parse(data);

    // Migration for old goals
    return goals.map((goal) => ({
      ...goal,
      lastNotification: goal.lastNotification || "",
      completed: goal.completed || false,
    }));
  } catch (error) {
    console.error("Failed to parse goals:", error);

    return [];
  }
};

/**
 * Save goals
 */
export const saveGoals = (goals) => {
  localStorage.setItem(KEY, JSON.stringify(goals));
};

/**
 * Update all goals
 */
export const updateGoals = (goals) => {
  saveGoals(goals);

  return goals;
};

/**
 * Add new goal
 */
export const addGoal = (goal) => {
  const goals = getGoals();

  const updatedGoals = [
    ...goals,

    {
      id: Date.now(),

      createdAt: new Date().toISOString(),

      completed: false,

      completedAt: null,

      lastNotification: "",

      ...goal,
    },
  ];

  saveGoals(updatedGoals);

  return updatedGoals;
};

/**
 * Update single goal
 */
export const updateGoal = (id, updates) => {
  const goals = getGoals();

  const updatedGoals = goals.map((goal) =>
    goal.id === id
      ? {
          ...goal,

          ...updates,
        }
      : goal
  );

  saveGoals(updatedGoals);

  return updatedGoals;
};

/**
 * Toggle completed status
 */
export const toggleGoalComplete = (id) => {
  const goals = getGoals();

  const updatedGoals = goals.map((goal) => {
    if (goal.id !== id) return goal;

    const completed = !goal.completed;

    return {
      ...goal,

      completed,

      completedAt: completed ? new Date().toISOString() : null,
    };
  });

  saveGoals(updatedGoals);

  return updatedGoals;
};

/**
 * Delete goal
 */
export const deleteGoal = (id) => {
  const goals = getGoals();

  const updatedGoals = goals.filter((goal) => goal.id !== id);

  saveGoals(updatedGoals);

  return updatedGoals;
};

/**
 * Clear all goals
 */
export const clearGoals = () => {
  localStorage.removeItem(KEY);
};
