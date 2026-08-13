import {
  Target,
  Plus,
  Trash2,
  CheckCircle,
  CalendarDays,
  Trophy,
  CircleCheck,
  Clock3,
  AlertTriangle,
} from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import {
  getGoals,
  addGoal,
  toggleGoalComplete,
  deleteGoal,
  updateGoals,
} from "../../utils/goalStorage";
import { getReminders, addReminder } from "../../utils/reminderStorage";
import ReminderPanel from "../../components/ReminderPanel";

export default function Goal() {
  const [goals, setGoals] = useState([]);
  const [goalName, setGoalName] = useState("");
  const [targetDate, setTargetDate] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const data = getGoals();
    setGoals(data);
    requestNotificationPermission();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      checkDeadlineNotification();
    }, 60000);
    return () => clearInterval(interval);
  }, [goals]);

  const requestNotificationPermission = async () => {
    if ("Notification" in window) {
      if (Notification.permission !== "granted") {
        await Notification.requestPermission();
      }
    }
  };

  const checkDeadlineNotification = () => {
    const now = Date.now();
    const updated = goals.map((goal) => {
      if (!goal.date || goal.completed) return goal;
      const deadline = new Date(goal.date).getTime();
      const hours = (deadline - now) / (1000 * 60 * 60);
      let message = "";
      if (hours <= 5 && hours > 3) message = "Your goal deadline is in 5 hours";
      else if (hours <= 3 && hours > 1)
        message = "Your goal deadline is in 3 hours";
      else if (hours <= 1 && hours > 0)
        message = "Your goal deadline is in 1 hour";
      else if (hours <= 0) message = "Your goal deadline has passed";
      if (message && goal.lastNotification !== message) {
        if (Notification.permission === "granted") {
          new Notification(goal.title, {
            body: message,
            icon: "/logo.png",
          });
        }
        return {
          ...goal,
          lastNotification: message,
        };
      }
      return goal;
    });
    setGoals(updated);
    updateGoals(updated);
  };

  const createGoal = () => {
    if (!goalName.trim()) return;
    const updated = addGoal({
      title: goalName.trim(),
      date: targetDate ? targetDate.toISOString() : "",
      completed: false,
      lastNotification: "",
    });
    setGoals(updated);
    setGoalName("");
    setTargetDate(null);
  };

  const completed = goals.filter((g) => g.completed);
  const active = goals.filter((g) => !g.completed);

  const filteredGoals = goals.filter((goal) => {
    const expired =
      goal.date && new Date(goal.date) < new Date() && !goal.completed;

    const matchesSearch = goal.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "all"
        ? true
        : filter === "active"
        ? !goal.completed && !expired
        : filter === "completed"
        ? goal.completed
        : filter === "expired"
        ? expired
        : true;

    return matchesSearch && matchesFilter;
  });

  const progress = goals.length
    ? Math.round((completed.length / goals.length) * 100)
    : 0;

  const checkGoalReminders = () => {
    const now = Date.now();

    goals.forEach((goal) => {
      if (!goal.date || goal.completed) return;

      const deadline = new Date(goal.date).getTime();

      const hours = (deadline - now) / (1000 * 60 * 60);

      let type = "";
      let message = "";

      if (hours <= 5 && hours > 3) {
        type = "5_hours";

        message = "Deadline in 5 hours";
      } else if (hours <= 3 && hours > 1) {
        type = "3_hours";

        message = "Deadline in 3 hours";
      } else if (hours <= 1 && hours > 0) {
        type = "1_hour";

        message = "Deadline in 1 hour";
      } else if (hours <= 0) {
        type = "expired";

        message = "Deadline expired";
      }

      if (type) {
        addReminder({
          goalId: goal.id,

          title: goal.title,

          message,

          type,
        });
      }
    });
  };

  useEffect(() => {
    checkGoalReminders();

    const timer = setInterval(checkGoalReminders, 60000);

    return () => clearInterval(timer);
  }, [goals]);

  return (
    <main className="min-h-screen bg-green-50/50 p-6 lg:p-10">
      <Header />
      <ReminderPanel />
      <section className="grid md:grid-cols-3 gap-5 mb-8">
        <StatCard icon={<Target />} title="Total Goals" value={goals.length} />

        <StatCard
          icon={<CircleCheck />}
          title="Completed"
          value={completed.length}
        />

        <StatCard icon={<Clock3 />} title="Progress" value={`${progress}%`} />
      </section>

      <section className="theme-card rounded-3xl p-6 mb-10">
        <h2 className="text-xl font-bold text-green-900 mb-5">
          Create New Goal
        </h2>

        <div className="grid lg:grid-cols-3 gap-4 items-start relative">
          <input
            value={goalName}
            onChange={(e) => setGoalName(e.target.value)}
            placeholder="Example: Memorize Juz Amma"
            className="theme-input rounded-xl px-4 py-3 w-full"
          />

          <DatePicker
            selected={targetDate}
            onChange={setTargetDate}
            minDate={new Date()}
            showTimeSelect
            timeIntervals={15}
            dateFormat="dd MMM yyyy • hh:mm aa"
            placeholderText="Select deadline"
            className="theme-input rounded-xl px-4 py-3 w-full cursor-pointer"
            popperPlacement="bottom-start"
            popperClassName="z-[9999]"
            portalId="root"
          />

          <button
            onClick={createGoal}
            className="btn-primary rounded-xl flex items-center justify-center gap-2 font-semibold h-[48px]"
          >
            <Plus size={20} />
            Add Goal
          </button>
        </div>
      </section>

      <section className="theme-card rounded-3xl p-6 mb-8">
        <div className="grid md:grid-cols-3 gap-4">
          {/* Search */}

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search goals..."
            className="theme-input rounded-xl px-4 py-3 w-full"
          />

          {/* Filter */}

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="theme-input rounded-xl px-4 py-3 w-full"
          >
            <option value="all">All Goals</option>

            <option value="active">Active</option>

            <option value="completed">Completed</option>

            <option value="expired">Expired</option>
          </select>

          <div className="flex items-center justify-center rounded-xl bg-green-50 text-green-700 font-semibold">
            {filteredGoals.length} Goals
          </div>
        </div>
      </section>

      <GoalSection
        title="My Goals"
        icon={<Target />}
        goals={filteredGoals}
        setGoals={setGoals}
      />
    </main>
  );
}

function GoalSection({ title, icon, goals, setGoals }) {
  return (
    <section className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 rounded-xl bg-green-100 text-green-700">
          {icon}
        </div>

        <h2 className="text-xl font-bold text-green-950">{title}</h2>

        <span className="text-sm text-slate-500">({goals.length})</span>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {goals.length === 0 ? (
          <div className="theme-card rounded-3xl p-10 text-center text-slate-500 col-span-full">
            <p className="font-medium">No goals available</p>

            <p className="text-sm mt-2">
              Start your Quran memorization journey today.
            </p>
          </div>
        ) : (
          goals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onComplete={() => setGoals(toggleGoalComplete(goal.id))}
              onDelete={() => setGoals(deleteGoal(goal.id))}
            />
          ))
        )}
      </div>
    </section>
  );
}

function GoalCard({ goal, onComplete, onDelete }) {
  const expired =
    goal.date && new Date(goal.date) < new Date() && !goal.completed;

  const status = goal.completed
    ? {
        text: "Completed",
        style: "bg-green-100 text-green-700",
      }
    : expired
    ? {
        text: "Expired",
        style: "bg-red-100 text-red-700",
      }
    : {
        text: "In Progress",
        style: "bg-blue-100 text-blue-700",
      };

  return (
    <div className="theme-card-hover rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1">
      {/* Header */}

      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <h3 className="font-bold text-lg text-green-950 line-clamp-2">
              {goal.title}
            </h3>
          </div>

          <span
            className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${status.style}`}
          >
            {status.text}
          </span>
        </div>

        <button
          onClick={onDelete}
          className="p-2 rounded-xl text-red-500 hover:bg-red-50 transition"
          title="Delete goal"
        >
          <Trash2 size={18} />
        </button>
      </div>

      {/* Deadline */}

      <div className="mt-5 rounded-2xl bg-green-50 p-4">
        <div className="flex items-center gap-2 text-sm text-green-800">
          <CalendarDays size={16} />

          <span className="font-medium">Deadline</span>
        </div>

        <p className="text-sm text-slate-600 mt-2">
          {goal.date
            ? new Date(goal.date).toLocaleString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })
            : "No deadline"}
        </p>
      </div>

      {/* Expired Warning */}

      {expired && (
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-red-600 text-sm">
          <AlertTriangle size={16} />
          Deadline has passed
        </div>
      )}

      {/* Action */}

      <button
        onClick={onComplete}
        disabled={goal.completed}
        className={`mt-6 w-full rounded-xl py-3 flex justify-center items-center gap-2 font-semibold transition
  
  ${
    goal.completed
      ? "bg-green-100 text-green-700 cursor-default"
      : "btn-primary hover:scale-[1.02]"
  }
  
  `}
      >
        <CheckCircle size={19} />

        {goal.completed ? "Completed" : "Mark Complete"}
      </button>
    </div>
  );
}

function Header() {
  return (
    <section className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 lg:p-8 border border-green-100 shadow-sm mb-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
        <div>
          <h1 className="flex items-center gap-2.5 text-2xl sm:text-3xl font-bold text-green-900">
            <Target size={30} />
            Hifzh Goals
          </h1>

          <p className="text-sm sm:text-base text-slate-500 mt-2">
            Build your Quran memorization journey
          </p>
        </div>
      </div>
    </section>
  );
}

function StatCard({ icon, title, value }) {
  return (
    <div className="theme-card rounded-3xl p-5 flex items-center gap-4">
      <div className="p-3 rounded-2xl bg-green-100 text-green-700">{icon}</div>

      <div>
        <p className="text-sm text-slate-500">{title}</p>

        <h3 className="text-2xl font-bold text-green-950">{value}</h3>
      </div>
    </div>
  );
}
