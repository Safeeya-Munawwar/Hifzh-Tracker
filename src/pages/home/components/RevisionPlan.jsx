import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getReminders } from "../../../utils/reminderStorage";
import { getGoals } from "../../../utils/goalStorage";

export default function RevisionPlan() {
  const [revisionItems, setRevisionItems] = useState([]);

  useEffect(() => {
    const loadRevision = () => {
      const reminders = getReminders();
      const goals = getGoals();

      const items = reminders.map((reminder) => {
        const goal = goals.find((item) => item.id === reminder.goalId);

        return {
          day: new Date(reminder.createdAt).toLocaleDateString("en-US", {
            weekday: "long",
          }),

          title: goal?.title || "Quran Revision",

          ayahs: goal?.description || "Revision Task",

          status: reminder.read ? "Completed" : "Upcoming",
        };
      });

      setRevisionItems(items);
    };

    loadRevision();

    window.addEventListener("storage", loadRevision);

    return () => window.removeEventListener("storage", loadRevision);
  }, []);

  return (
    <section
      className="section-padding"
      style={{
        background: "var(--bg-color)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 grid gap-12 lg:grid-cols-2 items-center">
        {/* Left Content */}

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
            items-center
            gap-2
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
            <RotateCcw size={16} />
            Smart Revision
          </span>

          <h2
            className="section-title"
            style={{
              color: "var(--text-color)",
            }}
          >
            Keep Your Memorization{" "}
            <span
              style={{
                color: "var(--color-primary)",
              }}
            >
              Strong Forever
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
            Revision is the key to preserving your Hifzh. Plan, organize and
            complete your daily revision tasks easily.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div
              className="
              theme-card
              rounded-2xl
              p-5
              "
            >
              <CalendarDays
                className="mb-3"
                style={{
                  color: "var(--color-primary)",
                }}
              />

              <h4 className="font-bold">Organized Schedule</h4>

              <p className="mt-2 text-sm theme-muted">
                Never miss your revision plan.
              </p>
            </div>

            <div
              className="
              theme-card
              rounded-2xl
              p-5
              "
            >
              <Sparkles
                className="mb-3"
                style={{
                  color: "var(--color-primary)",
                }}
              />

              <h4 className="font-bold">Better Retention</h4>

              <p className="mt-2 text-sm theme-muted">
                Maintain memorized Surahs.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Revision Card */}

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
          <div className="flex items-center justify-between mb-7">
            <div>
              <p className="text-sm theme-muted">Revision Schedule</p>

              <h3
                className="
                text-2xl
                font-bold
                "
                style={{
                  fontFamily: "var(--font-heading)",
                }}
              >
                Upcoming Revision
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
              <Clock3 />
            </div>
          </div>

          <div className="space-y-4">
            {revisionItems.slice(0, 2).map((item, index) => (
              <div
                key={`${item.title}-${index}`}
                className="
                rounded-2xl
                p-5
                transition
                "
                style={{
                  background: "var(--bg-secondary)",
                }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p
                      className="
                      text-sm
                      font-semibold
                      "
                      style={{
                        color: "var(--color-primary)",
                      }}
                    >
                      {item.day}
                    </p>

                    <h4
                      className="
                      mt-1
                      font-bold
                      line-clamp-2
                      "
                    >
                      {item.title}
                    </h4>

                    <p className="text-sm theme-muted mt-1">{item.ayahs}</p>
                  </div>

                  <span
                    className="
                    rounded-full
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    "
                    style={{
                      background:
                        item.status === "Completed"
                          ? "var(--color-primary-light)"
                          : "white",

                      color: "var(--color-primary)",
                    }}
                  >
                    {item.status}
                  </span>
                </div>

                {item.status === "Completed" && (
                  <div className="flex items-center gap-2 mt-4 text-sm">
                    <CheckCircle2
                      size={17}
                      style={{
                        color: "var(--color-primary)",
                      }}
                    />
                    Revision completed successfully
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
