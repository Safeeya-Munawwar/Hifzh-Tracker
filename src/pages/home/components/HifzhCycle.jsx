import {
  Moon,
  Sunrise,
  Brain,
  RefreshCcw,
  Heart,
  Sparkles,
  Clock3,
} from "lucide-react";
import { motion } from "framer-motion";

const cycleSteps = [
  {
    time: "Night Before Bed",
    title: "Familiarize The Page",
    description:
      "Listen to the page while following with your finger 7 times. Don't memorize yet, simply become familiar with the page.",
    icon: Moon,
  },
  {
    time: "Morning",
    title: "Initial Learning",
    description:
      "Memorize each Ayah separately. Read 5 times looking, then attempt 3 times without looking. Focus on effort, not perfection.",
    icon: Sunrise,
  },
  {
    time: "Throughout The Day",
    title: "Reinforcement",
    description:
      "Use small moments to listen, look at the Mushaf and recall the page multiple times throughout your day.",
    icon: Brain,
  },
  {
    time: "After Asr",
    title: "Consolidation",
    description:
      "Connect the Ayahs together in order. Focus on flow, sequence and accuracy.",
    icon: RefreshCcw,
  },
  {
    time: "Maghrib & Isha",
    title: "Cement In Salah",
    description:
      "Recite your memorized page in Salah. Let your prayer strengthen your Hifzh with khushu and trust.",
    icon: Heart,
  },
  {
    time: "Tomorrow Morning",
    title: "Memory Recall",
    description:
      "Recite yesterday's page before opening the Mushaf. Then check and correct what you missed.",
    icon: Sparkles,
  },
];

export default function HifzhCycle() {
  return (
    <section
      className="section-padding overflow-hidden"
      style={{
        background: "var(--bg-color)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}

        <div className="text-center max-w-3xl mx-auto mb-16">
          <div
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
            <Clock3 size={16} />
            Daily Hifzh Routine
          </div>

          <h2
            className="section-title"
            style={{
              color: "var(--text-color)",
            }}
          >
            A 24-Hour{" "}
            <span
              style={{
                color: "var(--color-primary)",
              }}
            >
              Hifzh Life Cycle
            </span>
          </h2>

          <p
            className="
              mt-5
              section-subtitle
              mx-auto
              "
          >
            A simple daily flow to memorize a page of Quran while balancing a
            busy Muslim lifestyle.
          </p>
        </div>

        {/* Cycle */}

        <div
          className="
            relative
            grid
            gap-8
            md:grid-cols-2
            lg:grid-cols-3
            "
        >
          {cycleSteps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.title}
                initial={{
                  opacity: 0,
                  y: 30,
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
                  rounded-3xl
                  p-7
                  relative
                  "
              >
                {/* Number */}

                <div
                  className="
                    absolute
                    right-6
                    top-6
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    text-xs
                    font-bold
                    "
                  style={{
                    background: "var(--color-primary-light)",
                    color: "var(--color-primary)",
                  }}
                >
                  {index + 1}
                </div>

                {/* Icon */}

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
                    background: "var(--color-primary)",
                    color: "white",
                  }}
                >
                  <Icon size={26} />
                </div>

                <p
                  className="
                    text-sm
                    font-semibold
                    mb-2
                    "
                  style={{
                    color: "var(--color-primary)",
                  }}
                >
                  {step.time}
                </p>

                <h3
                  className="
                    text-xl
                    font-bold
                    mb-3
                    "
                  style={{
                    fontFamily: "var(--font-heading)",
                  }}
                >
                  {step.title}
                </h3>

                <p
                  className="
                    leading-relaxed
                    text-sm
                    "
                  style={{
                    color: "var(--text-secondary)",
                  }}
                >
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Quote */}

        <div
          className="
            mt-14
            text-center
            "
        >
          <p
            className="
              text-lg
              font-semibold
              "
            style={{
              color: "var(--color-primary)",
            }}
          >
            "Don't look for more time. Use the time you already have."
          </p>
        </div>
      </div>
    </section>
  );
}
