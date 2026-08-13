import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { useFloatingButtons } from "./FloatingButtonContext";

export default function WhatsAppFAB() {
  const context = useFloatingButtons();

  const phone = import.meta.env.VITE_APP_WHATSAPP_NUMBER?.replace(/\D/g, "");

  if (!context || !phone) return null;

  const { isWhatsAppOpen, setIsWhatsAppOpen, scrollY } = context;

  const isScrolled = scrollY > 240;

  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "السلام عليكم ورحمة الله وبركاته";

    if (hour < 18) return "السلام عليكم ورحمة الله وبركاته";

    return "السلام عليكم ورحمة الله وبركاته";
  };

  const openWhatsApp = (message) => {
    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  const messages = {
    feedback: `${getGreeting()}
  
  I would like to share feedback or suggestions about Hifzh Tracker.`,

    support: `${getGreeting()}
  
  I need help regarding the Hifzh Tracker app.`,

    project: `${getGreeting()}
  
  I am interested in creating a modern website or application. I would like to discuss my project requirements.`,
  };

  const primary = "var(--color-primary)";

  const border = "var(--color-primary-border)";

  return (
    <div
      className={`
      fixed
      right-6
      z-50
      flex
      flex-col
      items-end
      gap-3
      transition-all
      duration-500
      ${isScrolled ? "bottom-34 xl:bottom-23" : "bottom-20 xl:bottom-6"}
      `}
    >
      {/* CONTACT CARD */}

      {isWhatsAppOpen && (
        <div
          className="
          w-80
          rounded-3xl
          overflow-hidden
          shadow-2xl
          border
          "
          style={{
            background: "var(--bg-color)",

            borderColor: border,
          }}
        >
          {/* HEADER */}

          <div
            className="
            p-5
            text-white
            "
            style={{
              background: `linear-gradient(
                135deg,
                ${primary},
                #22c55e
                )`,
            }}
          >
            <div
              className="
              flex
              justify-between
              items-start
              "
            >
              <div>
                <h3
                  className="
                  text-lg
                  font-bold
                  "
                >
                  Hifz Journey
                </h3>

                <p
                  className="
                  text-xs
                  opacity-90
                  "
                >
                  Quran Memorization Companion
                </p>
              </div>

              <button
                onClick={() => setIsWhatsAppOpen(false)}
                className="
                text-white/80
                hover:text-white
                "
              >
                ✕
              </button>
            </div>
          </div>

          {/* BODY */}

          <div
            className="
            p-5
            space-y-3
            "
          >
            
            <p className="text-sm theme-muted">
  Have feedback, need support, or want a modern website/app for your idea?
  Feel free to contact me.
</p>

            <button
              onClick={() => openWhatsApp(messages.feedback)}
              className="
              w-full
              rounded-xl
              py-3
              text-white
              font-semibold
              transition
              hover:scale-[1.02]
              "
              style={{
                background: primary,
              }}
            >
              Send Feedback
            </button>

            <button
              onClick={() => openWhatsApp(messages.support)}
              className="
              w-full
              rounded-xl
              py-3
              font-semibold
              border
              transition
              "
              style={{
                borderColor: primary,

                color: primary,
              }}
            >
              App Support
            </button>

            <button
              onClick={() => openWhatsApp(messages.project)}
              className="
  w-full
  rounded-xl
  py-3
  font-semibold
  border
  transition
  "
              style={{
                borderColor: primary,
                color: primary,
              }}
            >
              Build a Website / App
            </button>
          </div>
        </div>
      )}

      {/* FLOATING BUTTON */}

      <button
        onClick={() => setIsWhatsAppOpen(!isWhatsAppOpen)}
        className="
        relative
        w-14
        h-14
        rounded-full
        flex
        items-center
        justify-center
        shadow-xl
        hover:scale-110
        active:scale-95
        transition
        "
        style={{
          background: "linear-gradient(135deg,#25d366,#128c7e)",
        }}
      >
        <span
          className="
          absolute
          inset-0
          rounded-full
          bg-green-400
          opacity-30
          blur-lg
          animate-pulse
          "
        />

        <FaWhatsapp
          className="
          text-white
          text-2xl
          relative
          z-10
          "
        />
      </button>
    </div>
  );
}
