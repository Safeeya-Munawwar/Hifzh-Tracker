import {
  BookOpen,
  CheckCircle2,
  Flame,
  RotateCcw,
  Target,
} from "lucide-react";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import {
  getHifzhData,
  calculateStreak,
} from "../../../utils/hifzhStorage";

import { getGoals } from "../../../utils/goalStorage";


export default function DailyProgress() {

  const [progress, setProgress] = useState({
    ayahs: 0,
    surahs: 0,
    streak: 0,
    goalPercent: 0,
    revision: 0,
  });



  useEffect(() => {

    const loadData = () => {

      const data = getHifzhData();


      // Current memorized ayahs
      const ayahs =
        Object.values(data.progress || {})
          .reduce(
            (total, item) =>
              total + (item.completed?.length || 0),
            0
          );



      // Completed surahs
      const surahs =
        Object.values(data.progress || {})
          .filter(
            item =>
              item.history?.length > 0
          )
          .length;



      // Revision count
      const revision =
        Object.values(data.progress || {})
          .reduce(
            (total,item)=>
              total + (item.history?.length || 0),
            0
          );



      // Goals
      const goals = getGoals() || [];


      const completedGoals =
        goals.filter(
          goal => goal.completed
        ).length;


      const goalPercent =
        goals.length > 0
          ? Math.round(
              (completedGoals / goals.length) * 100
            )
          : 0;



      setProgress({

        ayahs,

        surahs,

        revision,

        streak: calculateStreak(data),

        goalPercent,

      });

    };


    loadData();


    window.addEventListener(
      "storage",
      loadData
    );


    return () =>
      window.removeEventListener(
        "storage",
        loadData
      );


  }, []);



  const progressItems = [

    {
      title:"New Memorization",
      value:`${progress.ayahs} Ayahs`,
      icon:BookOpen,
      completed:progress.ayahs > 0,
    },


    {
      title:"Revision Completed",
      value:`${progress.surahs} Surahs`,
      icon:RotateCcw,
      completed:progress.revision > 0,
    },


    {
      title:"Daily Goal",
      value:`${progress.goalPercent}%`,
      icon:Target,
      completed:progress.goalPercent === 100,
    },

  ];

  return (
    <section
      className="section-padding"
      style={{
        background: "var(--bg-secondary)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 grid gap-12 lg:grid-cols-2 items-center">
        {/* Content */}

        <motion.div
          initial={{
            opacity: 0,
            x: -30,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
          }}
        >
          <span
            className="
            inline-flex
            rounded-full
            px-4
            py-2
            text-sm
            font-semibold
            mb-5
            "
            style={{
              background: "var(--color-primary-light)",
              color: "var(--color-primary)",
            }}
          >
            Daily Progress
          </span>

          <h2
            className="section-title"
            style={{
              color: "var(--text-color)",
            }}
          >
            Stay Consistent With Your{" "}
            <span
              style={{
                color: "var(--color-primary)",
              }}
            >
              Hifzh Goals
            </span>
          </h2>

          <p
            className="
            mt-5
            max-w-xl
            leading-relaxed
            "
            style={{
              color: "var(--text-secondary)",
            }}
          >
            Monitor your daily memorization and revision activities. Small
            consistent steps create a strong Quran connection.
          </p>

          <div className="mt-8 flex items-center gap-3">
            <div
              className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-xl
              "
              style={{
                background: "var(--color-primary)",
                color: "white",
              }}
            >
              <Flame size={24} />
            </div>

            <div>
              <p className="text-sm theme-muted">Current Streak</p>

             <p className="text-xl font-bold">
  {progress.streak} Days
</p>
            </div>
          </div>
        </motion.div>

        {/* Progress Card */}

        <motion.div
          initial={{
            opacity: 0,
            x: 30,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
          }}
          className="
          theme-card
          rounded-3xl
          p-7
          "
        >
          {/* Header */}

          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-sm theme-muted">Today's Target</p>

              <h3
                className="
                text-2xl
                font-bold
                "
                style={{
                  fontFamily: "var(--font-heading)",
                }}
              >
                Memorization Goal
              </h3>
            </div>

            <div
              className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-xl
              "
              style={{
                background: "var(--color-primary-light)",
                color: "var(--color-primary)",
              }}
            >
              <Target />
            </div>
          </div>

          {/* Progress Circle */}

          <div className="mb-8">
            <div className="flex justify-between mb-3">
              <span className="theme-muted">Today's Completion</span>

              <span
                className="font-bold"
                style={{
                  color: "var(--color-primary)",
                }}
              >
               {progress.goalPercent}%
              </span>
            </div>

            <div
              className="
              h-3
              rounded-full
              overflow-hidden
              "
              style={{
                background: "var(--bg-secondary)",
              }}
            >
              <div
                className="
                h-full
                rounded-full
                "
                style={{
                  width:`${progress.goalPercent}%`,
                  background: "var(--color-primary)",
                }}
              />
            </div>
          </div>

          {/* Items */}

          <div className="space-y-4">
            {progressItems.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="
                  flex
                  items-center
                  justify-between
                  rounded-2xl
                  p-4
                  "
                  style={{
                    background: "var(--bg-secondary)",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-xl
                      "
                      style={{
                        background: "var(--color-primary-light)",
                        color: "var(--color-primary)",
                      }}
                    >
                      <Icon size={20} />
                    </div>

                    <div>
                      <p className="font-semibold">{item.title}</p>

                      <p className="text-sm theme-muted">{item.value}</p>
                    </div>
                  </div>

                  {item.completed && (
                    <CheckCircle2
                      size={22}
                      style={{
                        color: "var(--color-primary)",
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
