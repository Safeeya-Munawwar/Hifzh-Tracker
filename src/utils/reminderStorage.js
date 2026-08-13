const KEY = "hifzh-reminders";

export const getReminders = () => {
  const data = localStorage.getItem(KEY);

  if (!data) {
    return [];
  }

  try {
    return JSON.parse(data);
  } catch (error) {
    console.error("Failed loading reminders", error);

    return [];
  }
};

export const saveReminders = (reminders) => {
  localStorage.setItem(KEY, JSON.stringify(reminders));
};

export const addReminder = (reminder) => {
  const reminders = getReminders();

  const exists = reminders.find(
    (item) => item.goalId === reminder.goalId && item.type === reminder.type
  );

  if (exists) {
    return reminders;
  }

  const updated = [
    ...reminders,

    {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      read: false,
      ...reminder,
    },
  ];

  saveReminders(updated);

  return updated;
};

export const markReminderRead = (id) => {
  const reminders = getReminders();

  const updated = reminders.map((item) =>
    item.id === id
      ? {
          ...item,
          read: true,
        }
      : item
  );

  saveReminders(updated);

  return updated;
};

export const clearReminder = (id) => {
  const reminders = getReminders();

  const updated = reminders.filter((item) => item.id !== id);

  saveReminders(updated);

  return updated;
};
