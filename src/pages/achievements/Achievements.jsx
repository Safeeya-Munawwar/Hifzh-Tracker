import {
  Trophy,
  Star,
  Lock,
  CheckCircle,
  BookOpen,
  Flame,
  Target,
  Award,
  Brain,
  Sparkles,
  Medal,
} from "lucide-react";

import { useEffect, useState } from "react";

import { getHifzhData } from "../../utils/hifzhStorage";
import { getGoals } from "../../utils/goalStorage";
import { updateAchievements } from "../../utils/achievementStorage";

export default function Achievements() {
  const [achievements, setAchievements] = useState([]);

  const [stats, setStats] = useState({
    totalAyahs: 0,
    completedSurahs: 0,
    totalGoals: 0,
    completedGoals: 0,
    streak: 0,
  });

  useEffect(() => {
    loadAchievements();
  }, []);

  const loadAchievements = () => {
    const hifzh = getHifzhData();

    const goals = getGoals();

    let totalAyahs = 0;

    let completedSurahs = 0;

    Object.values(hifzh.progress || {}).forEach((item) => {
      // Count completed history
      if (item.history?.length) {
        completedSurahs++;

        item.history.forEach((record) => {
          totalAyahs += record.ayahs || 0;
        });
      }
    });

    const completedGoals = goals.filter((goal) => goal.completed).length;

    const userStats = {
      totalAyahs,

      completedSurahs,

      totalGoals: goals.length,

      completedGoals,

      streak: hifzh.statistics?.streak || 0,
    };

    setStats(userStats);

    const generated = generateAchievements(userStats);

    const saved = updateAchievements(generated);

    setAchievements(saved);
  };

  return (
    <main className="min-h-screen bg-green-50/50 p-6 lg:p-10">
      <div
        className="
          max-w-7xl
          mx-auto
          px-6
        "
      >
        {/* HEADER */}
        <section className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 lg:p-8 border border-green-100 shadow-sm mb-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
            <div>
              <h1 className="flex items-center gap-2.5 text-2xl sm:text-3xl font-bold text-green-900">
                <Trophy size={30} />
                Achievements
              </h1>

              <p className="text-sm sm:text-base text-slate-500 mt-2">
                Track your Quran memorization milestones
              </p>
            </div>
          </div>
        </section>

        {/* STATISTICS */}

        <section
          className="
            grid
            sm:grid-cols-2
            lg:grid-cols-5
            gap-5
            mb-10
          "
        >
          <StatCard
            icon={<BookOpen />}
            title="Surahs"
            value={stats.completedSurahs}
          />

          <StatCard icon={<Brain />} title="Ayahs" value={stats.totalAyahs} />

          <StatCard
            icon={<Target />}
            title="Goals"
            value={stats.completedGoals}
          />

          <StatCard
            icon={<Flame />}
            title="Streak"
            value={`${stats.streak} days`}
          />

          <StatCard
            icon={<Award />}
            title="Total Goals"
            value={stats.totalGoals}
          />
        </section>

        {/* ACHIEVEMENT LIST */}

        <section
          className="
            grid
            md:grid-cols-2
            xl:grid-cols-3
            gap-6
          "
        >
          {achievements.map((item) => (
            <AchievementCard key={item.id} achievement={item} />
          ))}
        </section>
      </div>
    </main>
  );
}

function AchievementCard({ achievement }) {
  const remaining = Math.max(achievement.target - achievement.current, 0);

  return (
    <div
      className={`
        rounded-3xl
        p-6
        border
        transition-all
        duration-300
  
        ${
          achievement.unlocked
            ? "bg-white border-green-100 shadow-sm hover:-translate-y-1"
            : "bg-slate-100 border-slate-200"
        }
        `}
    >
      {/* Top */}

      <div
        className="
          flex
          justify-between
          items-start
        "
      >
        <div
          className={`
            p-4
            rounded-2xl
  
            ${
              achievement.unlocked
                ? "bg-green-100 text-green-700"
                : "bg-slate-200 text-slate-400"
            }
            `}
        >
          {achievement.unlocked ? achievement.icon : <Lock size={28} />}
        </div>

        {achievement.unlocked && (
          <CheckCircle size={24} className="text-green-600" />
        )}
      </div>

      {/* Title */}

      <h3
        className="
          mt-5
          text-lg
          font-bold
          text-green-950
        "
      >
        {achievement.title}
      </h3>

      <p
        className="
          text-sm
          text-slate-500
          mt-2
        "
      >
        {achievement.description}
      </p>

      {/* Category */}

      <span
        className="
          inline-flex
          mt-4
          px-3
          py-1
          rounded-full
          text-xs
          font-semibold
          bg-green-50
          text-green-700
        "
      >
        {achievement.category}
      </span>

      {/* Progress */}

      <div className="mt-5">
        <div
          className="
            h-3
            bg-green-100
            rounded-full
            overflow-hidden
          "
        >
          <div
            className="
              h-full
              bg-green-600
              rounded-full
              transition-all
            "
            style={{
              width: `${achievement.progress}%`,
            }}
          />
        </div>

        <div
          className="
            flex
            justify-between
            text-xs
            text-slate-500
            mt-2
          "
        >
          <span>
            {achievement.current} / {achievement.target}
          </span>

          <span>{Math.round(achievement.progress)}%</span>
        </div>
      </div>

      {/* Requirement */}

      {!achievement.unlocked && remaining > 0 && (
        <div
          className="
            mt-4
            rounded-xl
            bg-yellow-50
            px-4
            py-3
            text-sm
            text-yellow-700
            "
        >
          <Medal size={16} className="inline mr-2" />
          {remaining} more to unlock
        </div>
      )}

      {/* Unlock */}

      {achievement.unlocked && (
        <div
          className="
            mt-4
            flex
            items-center
            gap-2
            text-sm
            text-green-600
            "
        >
          <CheckCircle size={16} />
          Achievement unlocked 
        </div>
      )}
    </div>
  );
}

function StatCard({ icon, title, value }) {
  return (
    <div
      className="
        theme-card
        rounded-3xl
        p-5
        flex
        items-center
        gap-4
      "
    >
      <div
        className="
          p-3
          rounded-2xl
          bg-green-100
          text-green-700
        "
      >
        {icon}
      </div>

      <div>
        <p
          className="
            text-sm
            text-slate-500
          "
        >
          {title}
        </p>

        <h3
          className="
            text-2xl
            font-bold
            text-green-950
          "
        >
          {value}
        </h3>
      </div>
    </div>
  );
}

function generateAchievements(stats) {
  return [
    {
      id: 1,
      title: "First Ayah",
      description: "Complete your first Quran Ayah",
      category: "Hifzh",

      icon: <BookOpen size={28} />,

      unlocked: stats.totalAyahs >= 1,

      current: stats.totalAyahs,

      target: 1,

      progress: Math.min((stats.totalAyahs / 1) * 100, 100),
    },

    {
      id: 2,
      title: "First Goal",
      description: "Complete your first memorization goal",
      category: "Goals",

      icon: <Target size={28} />,

      unlocked: stats.completedGoals >= 1,

      current: stats.completedGoals,

      target: 1,

      progress: Math.min((stats.completedGoals / 1) * 100, 100),
    },

    {
      id: 3,
      title: "Surah Starter",
      description: "Complete your first Surah",
      category: "Quran",

      icon: <BookOpen size={28} />,

      unlocked: stats.completedSurahs >= 1,

      current: stats.completedSurahs,

      target: 1,

      progress: Math.min((stats.completedSurahs / 1) * 100, 100),
    },

    {
      id: 4,
      title: "Ayah Explorer",
      description: "Memorize 100 Ayahs",
      category: "Hifzh",

      icon: <Star size={28} />,

      unlocked: stats.totalAyahs >= 100,

      current: stats.totalAyahs,

      target: 100,

      progress: Math.min((stats.totalAyahs / 100) * 100, 100),
    },

    {
      id: 5,
      title: "Surah Collector",
      description: "Complete 5 Surahs",
      category: "Quran",

      icon: <Award size={28} />,

      unlocked: stats.completedSurahs >= 5,

      current: stats.completedSurahs,

      target: 5,

      progress: Math.min((stats.completedSurahs / 5) * 100, 100),
    },

    {
      id: 6,
      title: "Consistency Master",
      description: "Maintain a 7 day learning streak",
      category: "Daily",

      icon: <Flame size={28} />,

      unlocked: stats.streak >= 7,

      current: stats.streak,

      target: 7,

      progress: Math.min((stats.streak / 7) * 100, 100),
    },

    {
      id: 7,
      title: "Goal Champion",
      description: "Complete 50 Hifzh goals",
      category: "Goals",

      icon: <Trophy size={28} />,

      unlocked: stats.completedGoals >= 50,

      current: stats.completedGoals,

      target: 50,

      progress: Math.min((stats.completedGoals / 50) * 100, 100),
    },
  ];
}
