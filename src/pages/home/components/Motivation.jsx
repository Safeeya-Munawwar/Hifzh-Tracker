import { Heart, Quote, Sparkles, Star } from "lucide-react";
import { motion } from "framer-motion";

const reminders = [
  "Small steps every day create lifelong Quran connection.",
  "Consistency is the key to preserving your Hifzh.",
  "Every Ayah memorized is a beautiful achievement.",
];

export default function Motivation() {
  return (
    <section
      className="section-padding"
      style={{
        background: "var(--bg-secondary)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
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
          className="
          relative
          overflow-hidden
          rounded-3xl
          px-6
          py-12
          md:px-12
          "
          style={{
            background: "var(--color-primary)",
          }}
        >
          {/* Decorative */}
          <div
            className="
            absolute
            -right-20
            -top-20
            h-64
            w-64
            rounded-full
            blur-3xl
            opacity-20
            "
            style={{
              background: "white",
            }}
          />

          <div
            className="
            relative
            grid
            gap-10
            lg:grid-cols-2
            items-center
            "
          >
            {/* Text */}

            <div>
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
                  background: "rgba(255,255,255,.15)",
                  color: "white",
                }}
              >
                <Sparkles size={16} />
                Stay Inspired
              </div>

              <h2
                className="
                text-3xl
                md:text-4xl
                font-bold
                leading-tight
                text-white
                "
                style={{
                  fontFamily: "var(--font-heading)",
                }}
              >
                Your Hifzh Journey Is Built One Ayah At A Time
              </h2>

              <p
                className="
                mt-5
                max-w-xl
                leading-relaxed
                text-green-100
                "
              >
                Memorization is a journey of patience, dedication and
                consistency. Keep moving forward and celebrate every milestone.
              </p>

              <div
                className="
                mt-8
                flex
                items-center
                gap-3
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
                  "
                  style={{
                    background: "rgba(255,255,255,.15)",
                  }}
                >
                  <Heart size={24} className="fill-current" />
                </div>

                <div>
                  <p className="font-semibold text-white">Keep Going</p>

                  <p className="text-sm text-green-100">
                    Allah rewards every effort.
                  </p>
                </div>
              </div>
            </div>

            {/* Quote Card */}

            <div
              className="
              rounded-3xl
              p-7
              "
              style={{
                background: "rgba(255,255,255,.12)",
                border: "1px solid rgba(255,255,255,.2)",
              }}
            >
              <Quote size={38} className="text-white mb-5" />

              <h3
                className="
                text-xl
                font-semibold
                text-white
                leading-relaxed
                "
                style={{
                  fontFamily: "var(--font-heading)",
                }}
              >
                "The most beloved deeds to Allah are those that are consistent,
                even if they are small."
              </h3>

              <div className="mt-8 space-y-4">
                {reminders.map((item, index) => (
                  <div
                    key={item}
                    className="
                    flex
                    items-start
                    gap-3
                    text-sm
                    text-green-100
                    "
                  >
                    <Star size={17} className="mt-0.5" />

                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
