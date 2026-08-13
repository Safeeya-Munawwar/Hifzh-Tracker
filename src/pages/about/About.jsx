import {
  BookOpen,
  Heart,
  Target,
  RefreshCcw,
  Sparkles,
  Code2,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const values = [
  {
    title: "Memorize With Purpose",
    description:
      "A structured approach to help Quran learners build consistent memorization habits.",
    icon: BookOpen,
  },
  {
    title: "Stay Consistent",
    description:
      "Track daily progress, goals and revision to maintain your Hifzh journey.",
    icon: Target,
  },
  {
    title: "Preserve Your Hifzh",
    description:
      "Revision planning helps keep memorized portions strong over time.",
    icon: RefreshCcw,
  },
];

const features = [
  "Quran memorization tracking",
  "Daily goals and progress",
  "Revision management",
  "Achievement milestones",
  "Personal Hifzh journey history",
];

export default function About() {
  return (
    <main>
      {/* HERO */}

      <section
        className="
        section-padding
        "
        style={{
          background: "var(--bg-secondary)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
          >
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
              mb-6
              "
              style={{
                background: "var(--color-primary-light)",

                color: "var(--color-primary)",
              }}
            >
              <Sparkles size={16} />
              About Hifzh Tracker
            </div>

            <h1
              className="
              text-4xl
              md:text-5xl
              font-bold
              "
              style={{
                fontFamily: "var(--font-heading)",

                color: "var(--text-color)",
              }}
            >
              A Companion For Your{" "}
              <span
                style={{
                  color: "var(--color-primary)",
                }}
              >
                Quran Memorization Journey
              </span>
            </h1>

            <p
              className="
              max-w-3xl
              mx-auto
              mt-6
              text-lg
              leading-relaxed
              "
              style={{
                color: "var(--text-secondary)",
              }}
            >
              Hifzh Tracker is designed to help Quran learners organize
              memorization, revision and daily goals through a simple and
              peaceful experience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* PURPOSE */}

      <section
        className="
        section-padding
        "
        style={{
          background: "var(--bg-color)",
        }}
      >
        <div
          className="
          max-w-7xl
          mx-auto
          px-6
          grid
          lg:grid-cols-2
          gap-12
          items-center
          "
        >
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
            <h2
              className="
              section-title
              "
            >
              Helping Muslims Build A{" "}
              <span
                style={{
                  color: "var(--color-primary)",
                }}
              >
                Lifelong Quran Connection
              </span>
            </h2>

            <p
              className="
              mt-5
              leading-relaxed
              "
              style={{
                color: "var(--text-secondary)",
              }}
            >
              Memorizing the Quran is a beautiful journey that requires
              patience, consistency and revision. Hifzh Tracker was created to
              make this journey easier by bringing organization and motivation
              into daily practice.
            </p>

            <p
              className="
              mt-4
              leading-relaxed
              "
              style={{
                color: "var(--text-secondary)",
              }}
            >
              The goal is simple: help learners focus on progress, not pressure.
            </p>
          </motion.div>

          <motion.div
            className="
            theme-card
            rounded-3xl
            p-8
            "
            initial={{
              opacity: 0,
              scale: 0.95,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{
              once: true,
            }}
          >
            <Heart
              size={40}
              style={{
                color: "var(--color-primary)",
              }}
            />

            <h3
              className="
              text-2xl
              font-bold
              mt-5
              "
            >
              Our Vision
            </h3>

            <p
              className="
              mt-4
              leading-relaxed
              theme-muted
              "
            >
              To create a simple digital companion that encourages consistency,
              reflection and love for the Quran.
            </p>
          </motion.div>
        </div>
      </section>

      {/* VALUES */}

      <section
        className="
        section-padding
        "
        style={{
          background: "var(--bg-secondary)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="section-title">
              Built Around A Meaningful{" "}
              <span
                style={{
                  color: "var(--color-primary)",
                }}
              >
                Hifzh Process
              </span>
            </h2>
          </div>

          <div
            className="
            grid
            md:grid-cols-3
            gap-6
            "
          >
            {values.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="
                  theme-card-hover
                  rounded-3xl
                  p-7
                  "
                >
                  <div
                    className="
                    h-14
                    w-14
                    rounded-2xl
                    flex
                    items-center
                    justify-center
                    "
                    style={{
                      background: "var(--color-primary-light)",

                      color: "var(--color-primary)",
                    }}
                  >
                    <Icon />
                  </div>

                  <h3
                    className="
                    text-xl
                    font-bold
                    mt-6
                    "
                  >
                    {item.title}
                  </h3>

                  <p
                    className="
                    mt-3
                    theme-muted
                    leading-relaxed
                    "
                  >
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURES */}

      <section
        className="
        section-padding
        "
      >
        <div
          className="
          max-w-7xl
          mx-auto
          px-6
          "
        >
          <div
            className="
            theme-card
            rounded-3xl
            p-8
            md:p-12
            "
          >
            <h2
              className="
              text-3xl
              font-bold
              "
            >
              What Hifzh Tracker Provides
            </h2>

            <div
              className="
              mt-8
              grid
              sm:grid-cols-2
              gap-4
              "
            >
              {features.map((feature) => (
                <div
                  key={feature}
                  className="
                  flex
                  items-center
                  gap-3
                  "
                >
                  <CheckCircle2
                    size={20}
                    style={{
                      color: "var(--color-primary)",
                    }}
                  />

                  {feature}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DEVELOPER */}

      <section
        className="
        section-padding
        "
        style={{
          background: "var(--bg-secondary)",
        }}
      >
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Code2
            className="mx-auto"
            size={42}
            style={{
              color: "var(--color-primary)",
            }}
          />

          <h2
            className="
            text-3xl
            font-bold
            mt-5
            "
          >
            A Personal Project With A Purpose
          </h2>

          <p
            className="
            mt-4
            theme-muted
            leading-relaxed
            "
          >
            Hifzh Tracker is created as a modern application project combining
            technology with a meaningful goal: supporting Quran learners in
            their memorization journey.
          </p>
        </div>
      </section>

      {/* CTA */}

      <section
        className="
        py-16
        "
      >
        <div
          className="
          max-w-4xl
          mx-auto
          px-6
          text-center
          "
        >
          <h2
            className="
            text-3xl
            font-bold
            "
          >
            Start Your Hifzh Journey Today
          </h2>

          <Link
            to="/quran-tracker"
            className="
            btn-primary
            inline-flex
            mt-6
            rounded-xl
            px-7
            py-3
            font-semibold
            "
          >
            Open Quran Tracker
          </Link>
        </div>
      </section>
    </main>
  );
}
