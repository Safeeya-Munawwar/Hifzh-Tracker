import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Flame,
  Target,
} from "lucide-react";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { getHifzhData, calculateStreak } from "../../../utils/hifzhStorage";
import { surahs } from "../../../data/surahs";

export default function Hero() {
  const [hifzhData, setHifzhData] = useState(null);

  useEffect(() => {
    const data = getHifzhData();
    setHifzhData(data);

    // Update when localStorage changes
    const handleUpdate = () => {
      setHifzhData(getHifzhData());
    };

    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  const data = hifzhData || {
    progress: {},
    statistics: {
      totalAyahsCompleted: 0,
      totalSurahsCompleted: 0,
      streak: 0,
    },
  };

  const currentStreak = calculateStreak(data);

  // Find active surah
  const activeSurah = Object.keys(data.progress)
    .map((id) => surahs.find((surah) => surah.id === Number(id)))
    .find(Boolean);

  const activeProgress = activeSurah
    ? Math.round(
        ((data.progress[activeSurah.id]?.completed?.length || 0) /
          activeSurah.ayahs) *
          100
      )
    : 0;

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "var(--bg-color)" }}
    >
      <div
        className="absolute -top-32 -right-32 h-96 w-96 rounded-full blur-3xl opacity-40"
        style={{ background: "var(--color-primary-light)" }}
      />

      <div className="max-w-7xl mx-auto px-6 py-8 lg:py-12 grid items-center gap-12 lg:grid-cols-2">
        {/* CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold mb-6"
            style={{
              background: "var(--color-primary-light)",
              color: "var(--color-primary)",
            }}
          >
            <BookOpen size={17} />
            Quran Memorization Companion
          </div>

          <h1
            className="text-4xl leading-tight font-bold sm:text-5xl lg:text-6xl"
            style={{
              color: "var(--text-color)",
              fontFamily: "var(--font-heading)",
            }}
          >
            Build Your{" "}
            <span style={{ color: "var(--color-primary)" }}>Hifzh Journey</span>{" "}
            With Consistency
          </h1>

          <p
            className="mt-6 max-w-xl text-lg leading-relaxed"
            style={{
              color: "var(--text-secondary)",
            }}
          >
            Track Quran memorization, manage revision schedules and achieve your
            daily goals with a simple and peaceful Hifzh tracker.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/quran-tracker"
              className="btn-primary flex items-center gap-2 rounded-xl px-6 py-3 font-semibold shadow-lg"
            >
              Start Memorizing
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/goal"
              className="btn-outline rounded-xl px-6 py-3 font-semibold"
            >
              Set Your Goal
            </Link>
          </div>
        </motion.div>

        {/* LIVE PREVIEW */}
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.95,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.6,
          }}
          className="relative"
        >
          <div className="theme-card rounded-3xl p-6 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <div>
                <p className="text-sm theme-muted">Today's Progress</p>

                <h2 className="text-2xl font-bold">Hifzh Goal</h2>
              </div>

              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl"
                style={{
                  background: "var(--color-primary-light)",
                  color: "var(--color-primary)",
                }}
              >
                <Target />
              </div>
            </div>

            {/* ACTIVE SURAH */}

            <div className="mb-6">
              <div className="flex justify-between mb-2 text-sm">
                <span className="theme-muted">
                  {activeSurah ? activeSurah.name : "No Surah Started"}
                </span>

                <span
                  className="font-semibold"
                  style={{
                    color: "var(--color-primary)",
                  }}
                >
                  {activeProgress}%
                </span>
              </div>

              <div
                className="h-3 rounded-full overflow-hidden"
                style={{
                  background: "var(--bg-secondary)",
                }}
              >
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${activeProgress}%`,
                    background: "var(--color-primary)",
                  }}
                />
              </div>
            </div>

            {/* STATISTICS */}

            <div className="space-y-4">
              <div
                className="flex items-center justify-between rounded-xl p-4"
                style={{
                  background: "var(--bg-secondary)",
                }}
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2
                    size={22}
                    style={{
                      color: "var(--color-primary)",
                    }}
                  />

                  <span>Ayahs Memorized</span>
                </div>

                <b>
                  {Object.values(data.progress || {}).reduce(
                    (total, item) => total + (item.completed?.length || 0),
                    0
                  )}
                </b>
              </div>

              <div
                className="flex items-center justify-between rounded-xl p-4"
                style={{
                  background: "var(--bg-secondary)",
                }}
              >
                <div className="flex items-center gap-3">
                  <Flame
                    size={22}
                    style={{
                      color: "var(--color-primary)",
                    }}
                  />

                  <span>Current Streak</span>
                </div>

                <b>{currentStreak} Days</b>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
