import { BookOpen, CheckCircle2, Flame, Target } from "lucide-react";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { getHifzhData, calculateStreak } from "../../../utils/hifzhStorage";

import { getGoals } from "../../../utils/goalStorage";

export default function Stats() {
  const [stats, setStats] = useState({
    surahs: 0,
    ayahs: 0,
    goals: 0,
    streak: 0,
  });

  useEffect(() => {
    const loadStats = () => {
      const data = getHifzhData();

      // Count memorized ayahs
      const totalAyahs = Object.values(data.progress || {}).reduce(
        (total, item) => total + (item.completed?.length || 0),
        0
      );

      // Count completed surahs
      const completedSurahs = Object.values(data.progress || {}).filter(
        (item) => item.history?.length > 0
      ).length;

      const goals = getGoals()?.filter((goal) => !goal.completed).length || 0;

      setStats({
        surahs: completedSurahs,

        ayahs: totalAyahs,

        goals,

        streak: calculateStreak(data),
      });
    };

    loadStats();

    window.addEventListener("storage", loadStats);

    return () => window.removeEventListener("storage", loadStats);
  }, []);

  const statsData = [
    {
      title: stats.surahs,
      label: "Surahs Completed",
      icon: BookOpen,
      description: "Track your memorization progress",
    },

    {
      title: stats.ayahs,
      label: "Ayahs Memorized",
      icon: CheckCircle2,
      description: "Every verse you complete",
    },

    {
      title: stats.goals,
      label: "Active Goals",
      icon: Target,
      description: "Stay focused daily",
    },

    {
      title: `${stats.streak}`,
      label: "Day Streak",
      icon: Flame,
      description: "Maintain consistency",
    },
  ];

  return (
    <section
      className="section-padding"
      style={{
        background: "var(--bg-secondary)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2
            className="section-title"
            style={{
              color: "var(--text-color)",
            }}
          >
            Everything You Need For Your{" "}
            <span
              style={{
                color: "var(--color-primary)",
              }}
            >
              Hifzh Journey
            </span>
          </h2>

          <p className="mt-4 section-subtitle mx-auto">
            A simple and organized way to memorize, revise and track your Quran
            progress.
          </p>
        </div>

        <div
          className="
          grid
          gap-6
          sm:grid-cols-2
          lg:grid-cols-4
          "
        >
          {statsData.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.label}
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: index * 0.1,
                }}
                className="
                theme-card-hover
                rounded-2xl
                p-6
                "
              >
                <div
                  className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-xl
                  mb-5
                  "
                  style={{
                    background: "var(--color-primary-light)",
                    color: "var(--color-primary)",
                  }}
                >
                  <Icon size={24} />
                </div>

                <h3
                  className="
                  text-3xl
                  font-bold
                  mb-1
                  "
                  style={{
                    fontFamily: "var(--font-heading)",
                  }}
                >
                  {item.title}
                </h3>

                <p
                  className="font-semibold"
                  style={{
                    color: "var(--text-color)",
                  }}
                >
                  {item.label}
                </p>

                <p
                  className="
                  mt-2
                  text-sm
                  "
                  style={{
                    color: "var(--text-secondary)",
                  }}
                >
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
