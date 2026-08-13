import {
  MessageCircle,
  Mail,
  Lightbulb,
  Code2,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";

const contactOptions = [
  {
    title: "App Feedback",
    description:
      "Share your experience, suggestions and ideas to improve Hifzh Tracker.",
    icon: MessageCircle,
  },
  {
    title: "Feature Requests",
    description:
      "Have an idea that can make Quran memorization easier? I would love to hear it.",
    icon: Lightbulb,
  },
  {
    title: "Development Projects",
    description:
      "Need a modern website or application for your idea or business?",
    icon: Code2,
  },
];

export default function Contact() {
  const phone = import.meta.env.VITE_APP_NUMBER?.replace(/\D/g, "");
  const email = import.meta.env.VITE_APP_EMAIL;

  const whatsappMessage = `
السلام عليكم ورحمة الله وبركاته

I would like to contact you regarding Hifzh Tracker.
`;

  const openWhatsApp = () => {
    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(whatsappMessage)}`,
      "_blank"
    );
  };

  const openEmail = () => {
    window.location.href = `mailto:${email}?subject=Hifzh Tracker Inquiry`;
  };

  return (
    <main>
      {/* Hero */}

      <section
        className="section-padding"
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
            <span
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
              style={{
                background: "var(--color-primary-light)",

                color: "var(--color-primary)",
              }}
            >
              <MessageCircle size={16} />
              Contact & Support
            </span>

            <h1
              className="mt-6 text-4xl md:text-5xl font-bold"
              style={{
                fontFamily: "var(--font-heading)",
              }}
            >
              Let's Connect For Your{" "}
              <span
                style={{
                  color: "var(--color-primary)",
                }}
              >
                Hifzh Journey
              </span>
            </h1>

            <p
              className="max-w-2xl mx-auto mt-5 text-lg leading-relaxed"
              style={{
                color: "var(--text-secondary)",
              }}
            >
              Have feedback, suggestions, questions or want to discuss a
              project? Feel free to reach out.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Cards */}

      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6">
            {contactOptions.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
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
                  className="theme-card-hover rounded-3xl p-7"
                >
                  <div
                    className="h-14 w-14 rounded-2xl flex items-center justify-center"
                    style={{
                      background: "var(--color-primary-light)",

                      color: "var(--color-primary)",
                    }}
                  >
                    <Icon size={26} />
                  </div>

                  <h3 className="mt-6 text-xl font-bold">{item.title}</h3>

                  <p className="mt-3 leading-relaxed theme-muted">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact CTA */}

      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            whileHover={{
              y: -5,
            }}
            className="rounded-3xl p-8 md:p-12 text-center"
            style={{
              background: "var(--color-primary)",
            }}
          >
            <Mail className="mx-auto text-white" size={42} />

            <h2 className="mt-5 text-3xl font-bold text-white">Get In Touch</h2>

            <p className="mt-4 text-green-100 leading-relaxed">
              Send feedback, report issues or discuss your next website and
              application idea.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <button
                onClick={openWhatsApp}
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold transition hover:-translate-y-1"
                style={{
                  color: "var(--color-primary)",
                }}
              >
                WhatsApp
                <ArrowRight size={18} />
              </button>

              <button
                onClick={openEmail}
                className="inline-flex items-center gap-2 rounded-xl border border-white/40 px-6 py-3 font-semibold text-white transition hover:-translate-y-1"
              >
                Email
                <Mail size={18} />
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
