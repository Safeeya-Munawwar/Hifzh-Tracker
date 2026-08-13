import { BookOpen, CheckCircle2, RefreshCcw, Trophy } from "lucide-react";
import { motion } from "framer-motion";

const journeySteps = [
  {
    number: "01",
    title: "Start Memorization",
    description:
      "Choose Surahs and begin memorizing Ayahs with a clear daily target.",
    icon: BookOpen,
  },
  {
    number: "02",
    title: "Track Progress",
    description:
      "Mark completed Ayahs and monitor your memorization progress easily.",
    icon: CheckCircle2,
  },
  {
    number: "03",
    title: "Revise Regularly",
    description:
      "Strengthen your Hifzh with planned revision and daily practice.",
    icon: RefreshCcw,
  },
  {
    number: "04",
    title: "Achieve Milestones",
    description:
      "Celebrate completed Surahs and build your lifelong Quran habit.",
    icon: Trophy,
  },
];

export default function MemorizationJourney() {
  return (
    <section
      className="section-padding"
      style={{
        background: "var(--bg-secondary)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}

        <div className="max-w-3xl mx-auto text-center mb-14">
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
            Your Journey
          </span>

          <h2
            className="section-title"
            style={{
              color: "var(--text-color)",
            }}
          >
            A Simple Path To Complete Your{" "}
            <span
              style={{
                color: "var(--color-primary)",
              }}
            >
              Hifzh Journey
            </span>
          </h2>

          <p
            className="
            mt-5
            section-subtitle
            mx-auto
            "
          >
            Follow a structured process to memorize, revise and preserve the
            Quran with consistency.
          </p>
        </div>

        {/* Journey Cards */}

        <div
          className="
          grid
          gap-6
          md:grid-cols-2
          lg:grid-cols-4
          "
        >
          {journeySteps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.number}
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
                  delay: index * 0.12,
                }}
                className="
                theme-card-hover
                rounded-3xl
                p-6
                relative
                "
              >
                {/* Number */}

                <span
                  className="
                  absolute
                  top-5
                  right-5
                  text-sm
                  font-bold
                  "
                  style={{
                    color: "var(--color-primary-border)",
                  }}
                >
                  {step.number}
                </span>

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

        {/* Bottom Journey Line */}

        <div
          className="
          mt-14
          hidden
          lg:flex
          items-center
          justify-center
          gap-4
          "
        >
          {journeySteps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div
                className="
                h-3
                w-3
                rounded-full
                "
                style={{
                  background: "var(--color-primary)",
                }}
              />

              {index !== journeySteps.length - 1 && (
                <div
                  className="
                  h-px
                  w-24
                  "
                  style={{
                    background: "var(--color-primary-border)",
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
