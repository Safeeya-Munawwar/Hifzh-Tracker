import {
  BookOpenCheck,
  CalendarCheck,
  ChartNoAxesCombined,
  BellRing,
  Trophy,
  Repeat2,
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    title: "Quran Memorization Tracker",
    description:
      "Track every Surah and Ayah with a simple progress system designed for your Hifzh journey.",
    icon: BookOpenCheck,
  },
  {
    title: "Daily Hifzh Goals",
    description:
      "Create personal memorization targets and build a consistent Quran learning habit.",
    icon: CalendarCheck,
  },
  {
    title: "Revision Management",
    description:
      "Organize your revision schedule and keep previously memorized Surahs strong.",
    icon: Repeat2,
  },
  {
    title: "Progress Analytics",
    description:
      "View your memorization progress, completed Surahs and learning milestones.",
    icon: ChartNoAxesCombined,
  },
  {
    title: "Smart Reminders",
    description:
      "Stay connected with your goals through helpful daily reminders.",
    icon: BellRing,
  },
  {
    title: "Achievements",
    description:
      "Celebrate your consistency with milestones and achievement rewards.",
    icon: Trophy,
  },
];

export default function Features() {
  return (
    <section
      className="section-padding"
      style={{
        background: "var(--bg-color)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}

        <div className="text-center max-w-3xl mx-auto mb-14">
          <span
            className="
            inline-flex
            items-center
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
            Powerful Features
          </span>

          <h2
            className="section-title"
            style={{
              color: "var(--text-color)",
            }}
          >
            Everything To Support Your{" "}
            <span
              style={{
                color: "var(--color-primary)",
              }}
            >
              Quran Journey
            </span>
          </h2>

          <p
            className="
            mt-5
            section-subtitle
            mx-auto
            "
          >
            Designed to help you memorize, revise and maintain the Quran with
            consistency and focus.
          </p>
        </div>

        {/* Feature Cards */}

        <div
          className="
          grid
          gap-6
          sm:grid-cols-2
          lg:grid-cols-3
          "
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
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
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                className="
                theme-card-hover
                rounded-2xl
                p-7
                "
              >
                <div
                  className="
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  mb-6
                  "
                  style={{
                    background: "var(--color-primary-light)",

                    color: "var(--color-primary)",
                  }}
                >
                  <Icon size={28} />
                </div>

                <h3
                  className="
                  text-xl
                  font-bold
                  mb-3
                  "
                  style={{
                    fontFamily: "var(--font-heading)",

                    color: "var(--text-color)",
                  }}
                >
                  {feature.title}
                </h3>

                <p
                  className="
                  leading-relaxed
                  "
                  style={{
                    color: "var(--text-secondary)",
                  }}
                >
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
