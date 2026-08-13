import { Bell, X, AlertTriangle } from "lucide-react";

import { getReminders, clearReminder } from "../utils/reminderStorage";

import { useEffect, useState } from "react";

export default function ReminderPanel() {
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    setReminders(getReminders());
  }, []);

  const remove = (id) => {
    const updated = clearReminder(id);

    setReminders(updated);
  };

  if (reminders.length === 0) return null;

  return (
    <div className="theme-card rounded-3xl p-6 mb-8">
      <div className="flex items-center gap-3 mb-5">
        <div className="p-3 rounded-xl bg-yellow-100 text-yellow-700">
          <Bell />
        </div>

        <h2 className="font-bold text-xl text-green-900">Reminders</h2>
      </div>

      <div className="space-y-3">
        {reminders.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center bg-yellow-50 rounded-2xl p-4"
          >
            <div className="flex gap-3">
              <AlertTriangle className="text-yellow-600" />

              <div>
                <h3 className="font-semibold text-green-900">{item.title}</h3>

                <p className="text-sm text-slate-600">{item.message}</p>
              </div>
            </div>

            <button
              onClick={() => remove(item.id)}
              className="text-slate-500 hover:text-red-500"
            >
              <X size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
